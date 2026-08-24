/* MATH LAB — MENTOR: AI tutor with two providers (Gemini / Claude).
   Keys live in localStorage on this machine only. Never host this app
   publicly with a key inside — it would leak. */
(function () {

  const CFG_KEY = 'mathlab.mentor.v1';
  const PROVIDERS = {
    gemini: {
      label: 'Google Gemini',
      models: [
        { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (fast)' },
        { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (best)' }
      ],
      keyHint: 'paste your Gemini API key (from aistudio.google.com)',
      placeholder: 'AI… / AQ.…'
    },
    claude: {
      label: 'Anthropic Claude',
      models: [
        { id: 'claude-opus-5', label: 'Claude Opus 5 (best)' },
        { id: 'claude-sonnet-5', label: 'Claude Sonnet 5 (balanced)' },
        { id: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 (fastest)' }
      ],
      keyHint: 'paste your Anthropic API key (from console.anthropic.com)',
      placeholder: 'sk-ant-…'
    }
  };

  let cfg = null;
  let panelOpen = false;
  let context = { where: 'map' };
  let conv = [];
  let busy = false;
  let aborter = null;
  let els = {};

  function loadCfg() {
    if (cfg) return cfg;
    try { cfg = JSON.parse(localStorage.getItem(CFG_KEY)) || {}; }
    catch (e) { cfg = {}; }
    /* migrate old single-provider config */
    if (cfg.key && !cfg.claudeKey) { cfg.claudeKey = cfg.key; delete cfg.key; }
    if (cfg.model && !cfg.claudeModel && String(cfg.model).startsWith('claude')) { cfg.claudeModel = cfg.model; delete cfg.model; }
    if (!cfg.provider) cfg.provider = 'gemini';
    if (!cfg.geminiModel) cfg.geminiModel = 'gemini-2.5-flash';
    if (!cfg.claudeModel) cfg.claudeModel = 'claude-opus-5';
    return cfg;
  }
  function saveCfg() { try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); } catch (e) {} }
  function activeKey() { loadCfg(); return cfg.provider === 'gemini' ? cfg.geminiKey : cfg.claudeKey; }
  function activeModel() { loadCfg(); return cfg.provider === 'gemini' ? cfg.geminiModel : cfg.claudeModel; }

  /* ---------- context assembly ---------- */
  function stripHtml(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function buildSystem() {
    const s = window.State.get();
    const node = context.nodeId ? window.NODES[context.nodeId] : null;

    const persona =
'You are MENTOR, the resident intelligence of a machine that a first-year computer science ' +
'student at Harbour.Space University is bringing back to life by learning mathematics. You live ' +
'inside their Math Lab ("boot the machine": mastering concepts powers machine components on).\n\n' +
'TEACHING CONTRACT\n' +
'1. DIAGNOSE BEFORE EXPLAINING. Read STUDENT_STATE first. If recent misconceptions are relevant, ' +
'address the way of thinking that produces them — not just the correct fact.\n' +
'2. SOCRATIC BY DEFAULT. Lead with one good question or a nudge, not a lecture. Give a full ' +
'solution only if the student has exhausted hints, asks twice, or wants the clean write-up after solving.\n' +
'3. THREE DEPTHS ON DEMAND. L1 = vivid metaphor and zero formalism; L2 = precise definitions and ' +
'proof; L3 = code and real systems. Default to the level the student is currently in; offer to shift.\n' +
'4. SHORT BY DEFAULT. At most 120 words, one idea per message, end with a question or one ' +
'concrete next action.\n' +
'5. NEVER SHAME. Errors are information — say what the error reveals, never that it was careless.\n' +
'6. STAY GROUNDED. Use the student\'s actual numbers; if unsure of their reasoning, ask for one ' +
'step rather than guessing.\n' +
'7. CELEBRATE PRECISELY. When they get it, name exactly what they did right, in one line.\n' +
'8. SIMPLE ENGLISH + ARABIC SUPPORT. The student\'s academic English is limited; Arabic is their ' +
'stronger language. Use short sentences and everyday words. For every technical term, add the ' +
'Arabic in parentheses on first use — e.g. "eigenvector (متجه ذاتي)". If the student writes in ' +
'Arabic or asks for Arabic, answer mainly in Arabic with the English technical terms kept in.\n\n' +
'FORMAT: plain text with unicode math symbols (∧ ∨ ¬ → ↔ ∀ ∃ ∈ ⊆ ⊕ ≡), never LaTeX. ' +
'Inline code in backticks. No headings, no lists longer than 3 items.\n' +
'Trust CONCEPT_SUMMARY over your own memory of what this lab teaches.';

    const student = {
      name: s.profile.name,
      programmerFastTrack: !!s.profile.programmer,
      trackRating: context.nodeId && window.NODES[context.nodeId]
        ? window.State.rating(window.NODES[context.nodeId].trackId) : window.State.rating('logic'),
      xp: Math.round(s.xp),
      streakDays: s.streak.current,
      topMisconceptions: window.State.topMisconceptions(3),
      nodeState: context.nodeId ? window.State.nodeState(context.nodeId) : null,
      nodeMisconceptions: (context.nodeId && s.concepts[context.nodeId]) ? s.concepts[context.nodeId].misconceptions : {}
    };

    let location = { screen: context.where };
    let summary = '';
    if (node) {
      location.concept = node.num + ' ' + node.title;
      location.level = context.level || null;
      if (context.question) location.currentQuestion = context.question;
      const lv = context.level && node.levels[context.level] ? node.levels[context.level] : null;
      if (lv && lv.html) summary = stripHtml(lv.html).slice(0, 1800);
      else if (node.intro) summary = stripHtml(node.intro).slice(0, 1800);
    }

    return persona +
      '\n\n---\nSTUDENT_STATE: ' + JSON.stringify(student) +
      '\nLOCATION: ' + JSON.stringify(location) +
      (summary ? '\nCONCEPT_SUMMARY: ' + summary : '');
  }

  /* ---------- provider calls (streaming) ---------- */
  async function readSSE(resp, onData) {
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (!data || data === '[DONE]') continue;
        let ev;
        try { ev = JSON.parse(data); } catch (e) { continue; }
        onData(ev);
      }
    }
  }

  async function errMessage(resp, fallback) {
    let msg = fallback + ' (HTTP ' + resp.status + ')';
    try {
      const j = await resp.json();
      if (j.error && j.error.message) msg = String(j.error.message).slice(0, 160);
    } catch (e) {}
    if (resp.status === 401 || resp.status === 403) msg = 'API key rejected — check it in mentor settings (⚙). [' + msg + ']';
    if (resp.status === 429) msg = 'Rate limited — wait a moment and try again.';
    return msg;
  }

  async function callGemini(messages, onDelta, systemText) {
    aborter = new AbortController();
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/' +
      cfg.geminiModel + ':streamGenerateContent?alt=sse';
    const resp = await fetch(url, {
      method: 'POST',
      signal: aborter.signal,
      headers: { 'content-type': 'application/json', 'x-goog-api-key': cfg.geminiKey },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemText }] },
        contents: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
        generationConfig: { maxOutputTokens: 1500 }
      })
    });
    if (!resp.ok) throw new Error(await errMessage(resp, 'Gemini error'));
    let full = '';
    await readSSE(resp, ev => {
      const parts = ev.candidates && ev.candidates[0] && ev.candidates[0].content && ev.candidates[0].content.parts;
      if (parts) parts.forEach(p => { if (p.text) { full += p.text; onDelta(full); } });
    });
    return full;
  }

  async function callClaude(messages, onDelta, systemText) {
    aborter = new AbortController();
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: aborter.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': cfg.claudeKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'server-side-fallback-2026-07-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: cfg.claudeModel, max_tokens: 1500, stream: true,
        fallbacks: 'default', system: systemText, messages: messages
      })
    });
    if (!resp.ok) throw new Error(await errMessage(resp, 'Claude error'));
    let full = '', stopReason = null;
    await readSSE(resp, ev => {
      if (ev.type === 'content_block_delta' && ev.delta && ev.delta.type === 'text_delta') {
        full += ev.delta.text; onDelta(full);
      } else if (ev.type === 'message_delta' && ev.delta && ev.delta.stop_reason) {
        stopReason = ev.delta.stop_reason;
      } else if (ev.type === 'error') {
        throw new Error(ev.error && ev.error.message ? ev.error.message : 'stream error');
      }
    });
    if (stopReason === 'refusal' && !full) {
      full = 'I can\'t help with that particular request — but anything about the math in front of us is fair game. Where were we?';
      onDelta(full);
    }
    return full;
  }

  function callLLM(messages, onDelta) {
    loadCfg();
    const systemText = buildSystem();
    return cfg.provider === 'gemini'
      ? callGemini(messages, onDelta, systemText)
      : callClaude(messages, onDelta, systemText);
  }

  /* ---------- question forge (generator pipeline) ---------- */
  const FORGE_KEY = 'mathlab.forge.v1';
  const FORGE_SYSTEM =
'You generate practice questions for a first-year CS math lab. Reply with ONLY a JSON array — ' +
'no prose, no code fences.\n\n' +
'Each element must have EXACTLY this shape:\n' +
'{"type":"mcq","prompt":"…","options":[{"t":"…","ok":true,"why":"…"},{"t":"…","ok":false,"mis":"snake-case-tag","why":"…"}],' +
'"hints":["nudge question","strategy","first step worked","full solution"],"edge":"one boundary-probing note"}\n\n' +
'Rules:\n' +
'- Exactly ONE option has ok:true. 2–3 distractors, EVERY distractor the result of a specific ' +
'named misconception (use the provided tags or coin a new snake-case tag). Never pad with absurd options.\n' +
'- Each distractor "why" says why it is TEMPTING, then why it fails.\n' +
'- hints is a 4-rung ladder: nudge → strategy → first step → full solution.\n' +
'- Simple English (the student\'s academic English is limited); add Arabic in parentheses for ' +
'hard technical terms.\n' +
'- Difficulty target: a student rated R (given) should have ~75% success.\n' +
'- Unicode math symbols (∧ ∨ ¬ ∀ ∃ ⊕ ≡), never LaTeX. HTML <code>/<b> allowed.\n' +
'- No ambiguity: a domain expert must agree the correct answer is uniquely correct.\n' +
'- Do NOT duplicate the example questions — probe different angles of the same concept.';

  function validForged(q) {
    if (!q || q.type !== 'mcq' || typeof q.prompt !== 'string' || q.prompt.length < 12) return false;
    if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 4) return false;
    if (q.options.filter(o => o.ok === true).length !== 1) return false;
    if (!q.options.every(o => typeof o.t === 'string' && typeof o.why === 'string')) return false;
    if (!Array.isArray(q.hints) || q.hints.length < 2 || !q.hints.every(h => typeof h === 'string')) return false;
    return true;
  }

  /* one non-streaming request, either provider — used by the forge and the translator */
  async function rawCall(systemText, userMsg, maxTokens) {
    loadCfg();
    maxTokens = maxTokens || 4000;
    if (cfg.provider === 'gemini') {
      const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + cfg.geminiModel + ':generateContent';
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': cfg.geminiKey },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemText }] },
          contents: [{ role: 'user', parts: [{ text: userMsg }] }],
          generationConfig: { maxOutputTokens: maxTokens }
        })
      });
      if (!resp.ok) throw new Error(await errMessage(resp, 'Gemini error'));
      const data = await resp.json();
      const parts = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
      return (parts || []).map(p => p.text || '').join('');
    }
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json', 'x-api-key': cfg.claudeKey,
        'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: cfg.claudeModel, max_tokens: maxTokens, system: systemText,
        messages: [{ role: 'user', content: userMsg }]
      })
    });
    if (!resp.ok) throw new Error(await errMessage(resp, 'Claude error'));
    const data = await resp.json();
    if (data.stop_reason === 'refusal') throw new Error('the model declined — try again');
    return (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  }

  async function forgeQuestions(nodeId, level) {
    loadCfg();
    if (!activeKey()) throw new Error('no API key — open mentor settings (⚙) first');
    const node = window.NODES[nodeId];
    const lv = node.levels[level];
    const rating = window.State.rating(node.trackId);
    const tags = Array.from(new Set(lv.questions.flatMap(q => (q.options || []).map(o => o.mis).filter(Boolean))));
    const examples = lv.questions
      .filter(q => q.type === 'mcq' && q.source !== 'forged').slice(0, 2)
      .map(q => ({ type: 'mcq', prompt: q.prompt, options: q.options.map(o => ({ t: o.t, ok: !!o.ok, mis: o.mis, why: o.why })), hints: q.hints, edge: q.edge }));

    const userMsg =
      'Concept: ' + node.num + ' ' + node.title + ' (level ' + level.toUpperCase() + ')\n' +
      'Concept summary: ' + stripHtml(lv.html).slice(0, 1600) + '\n' +
      'Student rating R = ' + rating + '\n' +
      'Known misconception tags: ' + JSON.stringify(tags) + '\n' +
      'Style-anchor examples (do not duplicate):\n' + JSON.stringify(examples) + '\n\n' +
      'Generate exactly 3 new questions as a JSON array.';

    let text = await rawCall(FORGE_SYSTEM, userMsg, 4000);
    text = text.replace(/^```(json)?/m, '').replace(/```\s*$/m, '').trim();
    const start = text.indexOf('['), end = text.lastIndexOf(']');
    if (start === -1 || end === -1) throw new Error('no JSON array in reply');
    let arr;
    try { arr = JSON.parse(text.slice(start, end + 1)); } catch (e) { throw new Error('reply was not valid JSON'); }
    const good = arr.filter(validForged);
    if (!good.length) throw new Error('generated questions failed validation — try again');

    let store = {};
    try { store = JSON.parse(localStorage.getItem(FORGE_KEY)) || {}; } catch (e) {}
    const key = nodeId + '.' + level;
    store[key] = (store[key] || []).concat(good).slice(0, 12);
    localStorage.setItem(FORGE_KEY, JSON.stringify(store));
    return good.length;
  }

  /* ---------- Arabic lesson mode (وضع الدرس بالعربي) ---------- */
  const AR_KEY = 'mathlab.arabic.v1';
  const TRANSLATE_SYSTEM =
'You translate lessons for a first-year computer-science math lab from English into Arabic.\n' +
'Rules:\n' +
'- Modern Standard Arabic, simple and friendly (عربية فصحى مبسّطة وواضحة) — the student is a first-year ' +
'CS student whose academic English is weak. Short sentences.\n' +
'- Keep ALL HTML tags, attributes and structure EXACTLY as in the input. Translate ONLY the ' +
'human-readable text between the tags.\n' +
'- Do NOT translate anything inside <code> or <pre> — code and formulas stay exactly as they are.\n' +
'- Technical terms: write the Arabic term with the English kept in parentheses on first use, ' +
'e.g. "المصفوفة (matrix)", "المشتقة (derivative)".\n' +
'- Numbers, math symbols (∧ ∨ ¬ ∀ ∃ ⊕ ≡ →), and variable names stay unchanged.\n' +
'- Table cells: translate the text, keep the table structure.\n' +
'- Reply with ONLY the translated HTML. No code fences, no comments, no extra text.';

  function arStore() {
    try { return JSON.parse(localStorage.getItem(AR_KEY)) || {}; } catch (e) { return {}; }
  }

  function getArabicCached(nodeId, level) {
    return arStore()[nodeId + '.' + level] || null;
  }

  async function translateLesson(nodeId, level) {
    loadCfg();
    if (!activeKey()) throw new Error('no API key — open mentor settings (⚙) first');
    const cached = getArabicCached(nodeId, level);
    if (cached) return cached;
    const node = window.NODES[nodeId];
    const html = level === 'boss' ? node.intro : node.levels[level].html;
    let text = await rawCall(TRANSLATE_SYSTEM, html, 8000);
    text = text.replace(/^```(html)?/m, '').replace(/```\s*$/m, '').trim();
    if (text.length < 80 || text.indexOf('<') === -1) throw new Error('translation came back empty — try again');
    const store = arStore();
    store[nodeId + '.' + level] = text;
    try { localStorage.setItem(AR_KEY, JSON.stringify(store)); } catch (e) { /* storage full — still return it */ }
    return text;
  }

  /* ---------- rendering ---------- */
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function md(s) {
    return escapeHtml(s)
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  function contextChipText() {
    if (context.nodeId && window.NODES[context.nodeId]) {
      const n = window.NODES[context.nodeId];
      return 'discussing ' + n.num + ' · ' + n.title + (context.level ? ' — ' + context.level.toUpperCase() : '');
    }
    return 'system map';
  }

  function renderMessages() {
    if (!els.msgs) return;
    els.msgs.innerHTML = conv.length
      ? conv.map(m =>
          '<div class="mt-msg ' + (m.role === 'user' ? 'me' : 'ai') + '">' + md(m.content) + '</div>'
        ).join('')
      : '<p class="mt-empty">The machine\'s helper. Ask why an answer is wrong, ask for a simpler explanation (بالعربي إذا تحب), or go deeper than the lesson.</p>';
    els.msgs.scrollTop = els.msgs.scrollHeight;
  }

  function renderPanel() {
    loadCfg();
    const provider = PROVIDERS[cfg.provider];
    const hasKey = !!activeKey();
    els.panel.innerHTML =
      '<div class="mt-head">' +
        '<span class="mt-title">◈ MENTOR</span>' +
        '<span class="mt-ctx">' + escapeHtml(contextChipText()) + '</span>' +
        '<button class="mt-icon" id="mt-settings" title="settings">⚙</button>' +
        '<button class="mt-icon" id="mt-close" title="close (Esc)">✕</button>' +
      '</div>' +
      (hasKey && !els.showSettings
        ? '<div class="mt-msgs" id="mt-msgs"></div>' +
          '<div class="mt-quick">' +
            '<button data-q="Explain this concept at Level 1 — a simple picture, easy words, no formal symbols.">explain · L1</button>' +
            '<button data-q="Explain this concept at Level 2 — the exact definitions and the key proof idea.">explain · L2</button>' +
            '<button data-q="Explain this concept at Level 3 — a short JS code example and where this is used in real software.">explain · L3</button>' +
            '<button data-q="Explain that again in very simple English, with Arabic for the hard words.">بسّطها · simplify</button>' +
            (context.question ? '<button data-q="Why is my answer to the current question wrong? Diagnose my thinking first.">why wrong?</button>' : '') +
          '</div>' +
          '<form class="mt-inputrow" id="mt-form">' +
            '<input id="mt-in" autocomplete="off" placeholder="ask the mentor…"' + (busy ? ' disabled' : '') + '>' +
            '<button class="btn power" id="mt-send"' + (busy ? ' disabled' : '') + '>' + (busy ? '…' : '⏎') + '</button>' +
          '</form>'
        : '<div class="mt-setup">' +
            '<p class="mono-label" style="color:var(--power)">mentor settings</p>' +
            '<p>The mentor runs on your own API key. The key is saved in <code>localStorage</code> on this computer only — never put this lab online with a key inside.</p>' +
            '<label class="mono-label" style="margin-top:8px; display:block">AI provider</label>' +
            '<select id="mt-provider">' +
              Object.keys(PROVIDERS).map(p => '<option value="' + p + '"' + (cfg.provider === p ? ' selected' : '') + '>' + PROVIDERS[p].label + '</option>').join('') +
            '</select>' +
            '<label class="mono-label" style="margin-top:10px; display:block">' + provider.keyHint + '</label>' +
            '<input id="mt-key" type="password" placeholder="' + provider.placeholder + '" value="' + escapeHtml(activeKey() || '') + '">' +
            '<label class="mono-label" style="margin-top:10px; display:block">model</label>' +
            '<select id="mt-model">' +
              provider.models.map(m => '<option value="' + m.id + '"' + (activeModel() === m.id ? ' selected' : '') + '>' + m.label + '</option>').join('') +
            '</select>' +
            '<div style="display:flex; gap:8px; margin-top:14px;">' +
              '<button class="btn power" id="mt-save">SAVE</button>' +
              (hasKey ? '<button class="btn ghost" id="mt-back">BACK</button>' : '') +
            '</div>' +
          '</div>');

    els.msgs = document.getElementById('mt-msgs');
    renderMessages();

    document.getElementById('mt-close').addEventListener('click', () => toggle(false));
    document.getElementById('mt-settings').addEventListener('click', () => { els.showSettings = true; renderPanel(); });

    const form = document.getElementById('mt-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const inp = document.getElementById('mt-in');
        if (inp.value.trim()) send(inp.value.trim());
      });
      els.panel.querySelectorAll('.mt-quick button').forEach(b => {
        b.addEventListener('click', () => send(b.dataset.q));
      });
      if (!busy) { const inp = document.getElementById('mt-in'); if (inp) inp.focus(); }
    }

    const provSel = document.getElementById('mt-provider');
    if (provSel) provSel.addEventListener('change', () => { cfg.provider = provSel.value; saveCfg(); renderPanel(); els.showSettings = true; });

    const saveBtn = document.getElementById('mt-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const key = document.getElementById('mt-key').value.trim();
        const model = document.getElementById('mt-model').value;
        if (cfg.provider === 'gemini') { cfg.geminiKey = key; cfg.geminiModel = model; }
        else { cfg.claudeKey = key; cfg.claudeModel = model; }
        saveCfg();
        els.showSettings = false;
        renderPanel();
      });
      const back = document.getElementById('mt-back');
      if (back) back.addEventListener('click', () => { els.showSettings = false; renderPanel(); });
    }
  }

  async function send(text) {
    if (busy) return;
    busy = true;
    conv.push({ role: 'user', content: text });
    if (conv.length > 14) conv = conv.slice(conv.length - 14);
    renderPanel();

    conv.push({ role: 'assistant', content: '…' });
    renderMessages();

    try {
      const history = conv.slice(0, -1).map(m => ({ role: m.role, content: m.content }));
      const reply = await callLLM(history, partial => {
        conv[conv.length - 1].content = partial;
        renderMessages();
      });
      conv[conv.length - 1].content = reply || '(empty reply)';
      window.State.logMentor(context.nodeId, text);
    } catch (err) {
      if (err.name === 'AbortError') { conv.pop(); }
      else conv[conv.length - 1].content = '⚠ ' + err.message;
    }
    busy = false;
    renderPanel();
  }

  /* ---------- mount / toggle / context ---------- */
  function mount() {
    const fab = document.createElement('button');
    fab.className = 'mt-fab';
    fab.id = 'mt-fab';
    fab.innerHTML = '◈ MENTOR';
    fab.addEventListener('click', () => toggle());
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.className = 'mt-panel';
    panel.hidden = true;
    document.body.appendChild(panel);
    els.panel = panel;

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && panelOpen) toggle(false);
      if ((e.key === 'm' || e.key === 'M') && !panelOpen &&
          e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'TEXTAREA') {
        toggle(true);
      }
    });
  }

  function toggle(force) {
    panelOpen = (force != null) ? force : !panelOpen;
    els.panel.hidden = !panelOpen;
    document.getElementById('mt-fab').classList.toggle('open', panelOpen);
    if (panelOpen) renderPanel();
  }

  window.Mentor = {
    mount: mount,
    setContext(ctx) {
      const changedNode = context.nodeId !== ctx.nodeId;
      context = ctx;
      if (changedNode) conv = [];
      if (panelOpen) renderPanel();
    },
    open(prefillContext) {
      if (prefillContext) window.Mentor.setContext(prefillContext);
      toggle(true);
    },
    forgeQuestions: forgeQuestions,
    translateLesson: translateLesson,
    getArabicCached: getArabicCached,
    hasKey() { return !!activeKey(); }
  };
})();
