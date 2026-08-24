/* MATH LAB — screens: onboarding, map, node, arena, boot sequence */
(function () {

  const LEVEL_TITLES = { l1: 'Blueprint', l2: 'Schematic', l3: 'Fabrication' };
  const STATE_LABELS = {
    locked: 'offline', available: 'ready', discovered: 'discovered',
    understood: 'understood', applied: 'applied', mastered: 'mastered'
  };
  const DAY = 86400000;

  let keyHandler = null;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function topbarHtml() {
    const s = window.State.get();
    return (
      '<div class="topbar">' +
        '<button class="wordmark" data-go="#/" title="prepared by Omar :)">MATH<span class="lab">LAB</span></button>' +
        '<span class="mono-label">boot the machine</span>' +
        '<span class="spacer"></span>' +
        '<button class="stat-chip chip-btn" data-go="#/laws" title="The Manual — laws & formulas (المرجع)">📖 <b>MANUAL</b></button>' +
        '<button class="stat-chip chip-btn" data-go="#/notes" title="Notebook (دفتر الملاحظات)">📝 <b>NOTES</b></button>' +
        '<button class="stat-chip chip-btn" id="theme-toggle" title="light / dark (فاتح / غامق)">' +
          (document.documentElement.dataset.theme === 'light' ? '🌙' : '☀️') + '</button>' +
        '<span class="stat-chip">XP <b class="pw">' + Math.round(s.xp) + '</b></span>' +
        '<span class="stat-chip">STREAK <b>' + s.streak.current + 'd</b></span>' +
        '<span class="trace"></span>' +
      '</div>'
    );
  }

  function bindNav(rootEl) {
    rootEl.querySelectorAll('[data-go]').forEach(el => {
      el.addEventListener('click', () => window.App.go(el.dataset.go));
    });
  }

  function sockClass(st, boss) {
    return 'msock s-' + st + (boss ? ' s-boss' : '');
  }

  /* Arabic helpers are OPT-IN: English-only by default, toggle in the map footer */
  function arOn() {
    try { return localStorage.getItem('mathlab.ar') === 'on'; } catch (e) { return false; }
  }

  /* remove embedded Arabic from content strings when Arabic help is off */
  function stripAr(s) {
    if (arOn()) return s;
    return String(s)
      .replace(/\s*\([^()]*[؀-ۿ][^()]*\)/g, '')                       /* (arabic…) glosses */
      .replace(/[؀-ۿ][؀-ۿ\s،؛؟!٪ـ—–-]*[؀-ۿ]|[؀-ۿ]/g, '') /* arabic runs */
      .replace(/\s*·\s*(<\/|<br|$)/gm, '$1')                                    /* dangling " · " separators */
      .replace(/\s+([.,!?،])/g, '$1');
  }

  /* add Arabic glosses to highlighted technical terms (only when Arabic help is on) */
  function glossify(container) {
    if (!window.GLOSSARY || !arOn()) return;
    container.querySelectorAll('.term').forEach(el => {
      if (el.querySelector('.term-ar')) return;
      let key = el.textContent.trim().toLowerCase().replace(/’/g, "'");
      let g = window.GLOSSARY[key];
      if (!g && key.endsWith('s')) g = window.GLOSSARY[key.slice(0, -1)];
      if (!g && key.startsWith('the ')) g = window.GLOSSARY[key.slice(4)];
      if (!g) return;
      const ar = document.createElement('span');
      ar.className = 'term-ar';
      ar.textContent = ' (' + g.ar + ')';
      ar.title = g.en;
      el.appendChild(ar);
    });
  }

  /* ---- Arabic lesson mode: translate-on-demand toggle, cached per lesson ---- */
  function wireArToggle(nodeId, levelKey, origHtml) {
    const btn = document.getElementById('ar-toggle');
    const contentEl = document.getElementById('lesson-content');
    if (!btn || !contentEl) return;
    let showingAr = false;

    async function showAr() {
      let html = window.Mentor.getArabicCached(nodeId, levelKey);
      if (!html) {
        if (!window.Mentor.hasKey()) {
          btn.textContent = '⚠ needs API key (⚙)';
          setTimeout(() => { btn.textContent = '🌐 عربي'; }, 2500);
          return;
        }
        btn.disabled = true;
        btn.textContent = '…جارٍ الترجمة';
        try {
          html = await window.Mentor.translateLesson(nodeId, levelKey);
        } catch (err) {
          btn.disabled = false;
          btn.textContent = '⚠ ' + err.message.slice(0, 32);
          setTimeout(() => { btn.textContent = '🌐 عربي'; }, 3500);
          return;
        }
        btn.disabled = false;
      }
      contentEl.innerHTML = html;
      contentEl.classList.add('ar-content');
      showingAr = true;
      btn.textContent = '🌐 English';
      try { localStorage.setItem('mathlab.lang', 'ar'); } catch (e) {}
    }

    function showEn() {
      contentEl.innerHTML = origHtml;
      contentEl.classList.remove('ar-content');
      glossify(contentEl);
      showingAr = false;
      btn.textContent = '🌐 عربي';
      try { localStorage.setItem('mathlab.lang', 'en'); } catch (e) {}
    }

    btn.addEventListener('click', () => { showingAr ? showEn() : showAr(); });

    /* Arabic mode is sticky: if the student chose it, every lesson opens in Arabic */
    let pref = null;
    try { pref = localStorage.getItem('mathlab.lang'); } catch (e) {}
    if (pref === 'ar') showAr();
  }

  /* ================= ONBOARDING ================= */
  function onboarding(root) {
    root.innerHTML =
      '<div class="onboard boot-in">' +
        '<p class="sys">' +
          '&gt; POWER BUS ............ <span class="ok">OK</span><br>' +
          '&gt; MEMORY BANKS ......... <span class="ok">OK</span><br>' +
          '&gt; GATEWORK ............. <span class="warn">DARK</span><br>' +
          '&gt; LATTICE / RENDER / OPTIMIZER / ORACLE ... <span class="warn">DARK</span><br>' +
          '&gt; CAUSE: MATHEMATICAL SUBSTRATE MISSING<br>' +
          '&gt; SYSTEM ARCHITECT ..... <span class="ok">OMAR :)</span>' +
        '</p>' +
        '<h1>This machine is dead.<br><em>You</em> are the power source.</h1>' +
        '<p class="pitch">Every concept you master routes energy through the schematic. Master a track, defeat its integration test, and a component comes online — upgrading the lab you are standing in.</p>' +
        '<form id="ob-form">' +
          '<input id="ob-name" type="text" maxlength="24" placeholder="operator name" autocomplete="off" required>' +
        '</form>' +
        '<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;">' +
          '<button class="btn power" id="ob-prog" type="button">I&rsquo;m a programmer — skip the basics</button>' +
          '<button class="btn ghost" id="ob-full" type="button">Full calibration from zero</button>' +
        '</div>' +
        '<p class="sys" style="margin-top:18px">&gt; programmer fast-track: node 1.1 (conditions, &amp;&amp;/||/!, short-circuit) marked complete;<br>&gt; you begin at 1.2 SCHEMATIC — rewriting proofs and the material you don&rsquo;t already ship daily.</p>' +
      '</div>';

    function start(programmer) {
      const name = document.getElementById('ob-name').value.trim() || 'Operator';
      window.State.create(name, { programmer: programmer });
      window.App.go('#/');
      window.App.refresh();
    }
    document.getElementById('ob-prog').addEventListener('click', () => start(true));
    document.getElementById('ob-full').addEventListener('click', () => start(false));
    /* Enter must NOT silently pick a path — the user chooses with a click */
    document.getElementById('ob-form').addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('ob-prog').focus();
    });
  }

  /* ================= SYSTEM MAP ================= */
  const PROPHECIES = [
    'the oracle whispers: today, an edge case reveals itself.',
    'the oracle whispers: a proof you feared is shorter than you think.',
    'the oracle whispers: the bug is in the boundary. it usually is.',
    'the oracle whispers: recharge before midnight; entropy never sleeps.',
    'the oracle whispers: the contrapositive knows the way out.',
    'the oracle whispers: count it twice — once forward, once by pairing.',
    'the oracle whispers: your matrix composes right-to-left. always has.',
    'the oracle whispers: expected value is not a promise. plan anyway.'
  ];

  function trackRowsHtml(track) {
    const powered = window.State.isPowered(track.id);
    let rowsHtml = '';
    track.nodeIds.concat([track.bossId]).forEach(id => {
      const n = window.NODES[id];
      if (!n) return;
      let st = window.State.nodeState(id);
      if (n.boss && powered) st = 'applied';
      const locked = st === 'locked';
      const charge = n.boss ? null : window.State.charge(id);
      const isDue = !n.boss && window.State.isDue(id);
      const sockStyle = (charge != null) ? ' style="opacity:' + (0.35 + 0.65 * charge).toFixed(2) + '"' : '';
      let label = n.boss
        ? (powered ? 'online' : locked ? 'requires all applied' : 'ready')
        : STATE_LABELS[st];
      let labelCls = 's-' + st;
      if (isDue) { label = 'draining'; labelCls = 's-draining'; }
      else if (charge != null && charge < 1) { label = STATE_LABELS[st] + ' · ' + Math.round(charge * 100) + '%'; }
      rowsHtml +=
        '<button class="node-row" ' + (locked ? 'disabled' : 'data-go="#/node/' + id + '"') + '>' +
          '<span class="' + sockClass(st, n.boss) + '"' + sockStyle + '></span>' +
          '<span class="num">' + n.num + '</span>' +
          '<span><span class="n-title">' + esc(n.title) + '</span>' +
          '<span class="payoff">' + esc(n.payoff) + '</span></span>' +
          '<span class="st-label ' + labelCls + '">' + label + '</span>' +
        '</button>';
    });
    return rowsHtml;
  }

  function map(root) {
    const s = window.State.get();
    const rec = window.State.recommend();
    const due = window.State.dueNodes();
    const allPowered = window.TRACKS.every(t => window.State.isPowered(t.id));

    let compsHtml = '';
    window.TRACKS.forEach(t => {
      const unlocked = window.State.trackUnlocked(t);
      const on = window.State.isPowered(t.id);
      const tPct = on ? '100%' : unlocked ? Math.round(window.State.trackProgress(t.id) * 100) + '%' : 'LOCKED';
      compsHtml +=
        '<div class="comp-card ' + (unlocked ? '' : 'offline') + (on ? ' online' : '') + '" style="--tc: var(' + t.colorVar + ')">' +
          '<div class="comp-top">' +
            '<span class="socket"></span>' +
            '<span class="comp-glyph" aria-hidden="true">' + (t.glyph || '') + '</span>' +
            '<span class="pct">' + tPct + '</span>' +
          '</div>' +
          '<h3>' + t.component + '</h3>' +
          '<p class="sub">' + t.componentSub + ' · ' + t.title + '</p>' +
        '</div>';
    });

    let bootHtml = '';
    if (due.length) {
      bootHtml =
        '<div class="next-up">' +
          '<span class="mono-label">boot sequence</span>' +
          '<p class="lead"><b>' + due.length + ' node' + (due.length > 1 ? 's' : '') + ' draining charge</b> — retention check, ~' + Math.max(2, Math.round(due.length * 1.5)) + ' min</p>' +
          '<button class="btn power" data-go="#/boot">RUN BOOT SEQUENCE</button>' +
        '</div>';
    }

    let nextHtml = '';
    if (rec) {
      const rn = window.NODES[rec.id];
      const lvlName = rec.level === 'boss' ? 'BOSS' : LEVEL_TITLES[rec.level].toUpperCase();
      nextHtml =
        '<div class="next-up' + (due.length ? ' quiet' : '') + '">' +
          '<span class="mono-label">next: energize</span>' +
          '<p class="lead"><b>' + rn.num + ' · ' + esc(rn.title) + '</b> — ' + lvlName + '</p>' +
          '<button class="btn ' + (due.length ? 'ghost' : 'power') + '" data-go="#/node/' + rn.id + '">ENTER NODE</button>' +
        '</div>';
    } else if (allPowered && !due.length) {
      nextHtml =
        '<div class="next-up"><span class="mono-label" style="color:var(--power)">full boot achieved</span>' +
        '<p class="lead">Every component is online and holding charge. The machine is yours — keep it powered.</p></div>';
    }

    let panelsHtml = '';
    window.TRACKS.forEach((t, ti) => {
      const unlocked = window.State.trackUnlocked(t);
      const rating = window.State.rating(t.id);
      if (unlocked) {
        panelsHtml +=
          '<div class="track-panel" style="--tc: var(' + t.colorVar + ')">' +
            '<div class="panel-head"><span class="chip"></span><h2>Track ' + (ti + 1) + ' — ' + t.title + '</h2>' +
            '<span class="mono-label">rating ' + rating + ' · ' + Math.round(window.State.trackProgress(t.id) * 100) + '% energized</span></div>' +
            trackRowsHtml(t) +
          '</div>';
      } else {
        const src = window.TRACKS.find(x => x.id === t.unlockedBy);
        panelsHtml +=
          '<div class="track-panel locked" style="--tc: var(' + t.colorVar + ')">' +
            '<div class="panel-head"><span class="chip"></span><h2>Track ' + (ti + 1) + ' — ' + t.title + '</h2>' +
            '<span class="mono-label">' + t.nodeIds.length + ' nodes sealed</span></div>' +
            '<p class="locked-note">⌁ Power the <b>' + (src ? src.component : '?') + '</b> to open this track.</p>' +
          '</div>';
      }
    });

    const oracleFoot = window.State.isPowered('probability')
      ? '<span class="hand" style="color:var(--t-prob)">' + PROPHECIES[Math.floor(Date.now() / DAY) % PROPHECIES.length] + '</span>'
      : '<span class="mono-label">math lab · your study machine</span>';

    root.innerHTML =
      topbarHtml() +
      '<div class="boot-in">' +
      '<h1 class="screen-title">System schematic</h1>' +
      '<p class="screen-sub">Operator: <b>' + esc(s.profile.name) + '</b> · ' +
        (s.profile.programmer
          ? '<button class="wipe" id="prog-toggle" style="color:var(--power)" title="turn OFF: study 1.1 and 1.2 from zero (keeps your progress)">programmer fast-track ✕</button>'
          : '<button class="wipe" id="prog-toggle" title="turn ON: skip the basics of 1.1 (conditions, &&, ||)">enable programmer fast-track</button>') +
      '</p>' +
      '<div class="machine-grid">' + compsHtml + '</div>' +
      bootHtml + nextHtml +
      panelsHtml +
      '<div class="next-up quiet">' +
        '<span class="mono-label">study tools</span>' +
        '<p class="lead"><b>∞ Gym</b> — endless equations · <b>📖 Manual</b> — every law in one place</p>' +
        '<button class="btn ghost" data-go="#/laws" style="margin-left:auto">📖 MANUAL</button>' +
        '<button class="btn ghost" data-go="#/gym" style="margin-left:0">∞ GYM</button>' +
      '</div>' +
      quoteCard('daily') + /* fresh quote on every visit */
      '<p class="signature hand">— prepared by Omar :)</p>' +
      '<div class="map-foot">' +
        oracleFoot +
        '<button class="wipe" id="ar-pref-btn" style="color:var(--accent)" title="show Arabic word helps next to English">' + (arOn() ? 'عربي: ON' : 'arabic help: OFF') + '</button>' +
        '<button class="wipe" id="backup-btn" style="color:var(--ok)" title="download everything: progress, notes, translations">⬇ backup</button>' +
        '<button class="wipe" id="restore-btn" title="restore from a backup file">⬆ restore</button>' +
        '<input type="file" id="restore-file" accept=".json,application/json" hidden>' +
        '<button class="wipe" id="wipe-btn">wipe progress</button>' +
      '</div>' +
      '</div>';

    bindNav(root);
    window.Mentor.setContext({ where: 'map' });
    document.getElementById('prog-toggle').addEventListener('click', () => {
      const on = window.State.get().profile.programmer;
      const msg = on
        ? 'Turn OFF fast-track? Lessons 1.1 and 1.2 open for full study from zero. Your other progress is kept.'
        : 'Turn ON fast-track? Lesson 1.1 (conditions, &&, ||, short-circuit) will be marked complete.';
      if (confirm(msg)) { window.State.setProgrammer(!on); window.App.refresh(); }
    });
    document.getElementById('ar-pref-btn').addEventListener('click', () => {
      try { localStorage.setItem('mathlab.ar', arOn() ? 'off' : 'on'); } catch (e) {}
      window.App.refresh();
    });
    document.getElementById('backup-btn').addEventListener('click', () => window.State.exportBackup());
    const restoreInput = document.getElementById('restore-file');
    document.getElementById('restore-btn').addEventListener('click', () => restoreInput.click());
    restoreInput.addEventListener('change', () => {
      const file = restoreInput.files[0];
      if (!file) return;
      if (!confirm('Restore from "' + file.name + '"? This REPLACES current progress and notes.')) { restoreInput.value = ''; return; }
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const n = window.State.importBackup(reader.result);
          alert('Restored ' + n + ' data sets ✓ (API keys are never in backups — re-enter in ⚙ if needed)');
          location.reload();
        } catch (err) { alert('Restore failed: ' + err.message); }
      };
      reader.readAsText(file);
    });
    document.getElementById('wipe-btn').addEventListener('click', () => {
      if (confirm('Wipe all progress and start over?')) {
        window.State.wipe();
        window.App.go('#/');
        window.App.refresh();
      }
    });
  }

  /* ================= NODE VIEW ================= */
  function node(root, nodeId, tabParam) {
    const n = window.NODES[nodeId];
    const st = window.State.nodeState(nodeId);
    if (st === 'locked') { window.App.go('#/'); return; }
    const rec = window.State.get().concepts[nodeId];

    if (n.boss) { bossView(root, n); return; }

    const defaultTab = st === 'available' ? 'l1' : st === 'discovered' ? 'l2' : 'l3';
    const tab = ['l1', 'l2', 'l3'].includes(tabParam) ? tabParam : defaultTab;
    const lv = n.levels[tab];
    const rank = window.State.rank(st);

    const cleared = {
      l1: rank >= window.State.rank('discovered'),
      l2: rank >= window.State.rank('understood'),
      l3: rank >= window.State.rank('applied')
    };
    const gated = { l1: false, l2: !cleared.l1, l3: !cleared.l2 };

    let tabsHtml = '';
    ['l1', 'l2', 'l3'].forEach(t => {
      tabsHtml +=
        '<button class="tab ' + (t === tab ? 'active' : '') + '" data-go="#/node/' + nodeId + '/' + t + '">' +
          t.toUpperCase() + ' ' + LEVEL_TITLES[t] + (cleared[t] ? ' <span class="tick">✓</span>' : '') +
        '</button>';
    });
    tabsHtml += '<span class="tab-spacer"></span><button class="tab lang-toggle" id="ar-toggle">🌐 عربي</button>';

    let action;
    const qCount = lv.questions.length;
    const passNeed = lv.passNeed || qCount;
    const target = tab === 'l1' ? 'DISCOVERED' : tab === 'l2' ? 'UNDERSTOOD' : 'APPLIED';
    if (gated[tab]) {
      const need = tab === 'l2' ? 'L1 checkpoint' : 'L2 question set';
      action =
        '<p class="status">Reading is open — but the quiz unlocks after the ' + need + '. One rung at a time.</p>';
    } else {
      const label = tab === 'l1' ? 'START CHECKPOINT' : tab === 'l2' ? 'START QUESTION SET' : 'START FABRICATION';
      const fams = (window.GENERATORS && window.GENERATORS.byNode[nodeId]) || [];
      const drillBtn = fams.length
        ? '<button class="btn ghost" data-go="#/drill/' + fams[0].id + '" title="endless practice equations with solutions">∞ DRILL</button>'
        : '';
      const forgeBtn = drillBtn + ((window.Mentor.hasKey() && (tab === 'l2' || tab === 'l3'))
        ? '<button class="btn ghost" id="forge-btn" title="AI-generate 3 more questions for this level">⚒ FORGE +3</button>'
        : '');
      action =
        '<p class="status" id="level-status">' +
          (cleared[tab]
            ? '<span class="done">Cleared ✓</span> — rerun anytime for practice.'
            : qCount + ' items · pass ' + passNeed + ' → <b>' + target + '</b>') +
        '</p>' +
        forgeBtn +
        '<button class="btn ' + (cleared[tab] ? 'ghost' : 'power') + '" data-go="#/arena/' + nodeId + '/' + tab + '">' +
          (cleared[tab] ? 'RERUN' : label) + '</button>';
    }

    const fastNote = (rec && rec.fastTracked && tab === 'l1')
      ? '<div class="callout"><p><span class="mono-label" style="color:var(--power)">fast-track</span> This level was marked from your programmer profile — the material below stays available as reference.</p></div>'
      : '';

    /* charge / retention meta for applied+ nodes */
    let chargeMeta = '';
    const charge = window.State.charge(nodeId);
    if (charge != null && rec && rec.nextReview) {
      const daysLeft = Math.max(0, Math.ceil((rec.nextReview - Date.now()) / DAY));
      chargeMeta = '<span class="mono-label" style="color:var(--power)">charge ' + Math.round(charge * 100) + '% · ' +
        (window.State.isDue(nodeId) ? 'review due now' : 'review in ' + daysLeft + 'd') +
        ' · retention ' + (rec.retention || 0) + '/3</span>';
    }

    root.innerHTML =
      topbarHtml() +
      '<div class="boot-in">' +
      '<button class="crumb" data-go="#/">← system schematic</button>' +
      '<div class="node-head">' +
        '<span class="' + sockClass(st, false) + '"></span>' +
        '<h1>' + n.num + ' · ' + esc(n.title) + '</h1>' +
      '</div>' +
      '<div class="node-meta">' +
        '<span class="mono-label">~' + n.minutes + ' min</span>' +
        '<span class="mono-label">unlocks: ' + esc(n.payoff) + '</span>' +
        '<span class="mono-label st-label s-' + st + '">' + STATE_LABELS[st] + '</span>' +
        chargeMeta +
      '</div>' +
      '<div class="tabs">' + tabsHtml + '</div>' +
      '<div class="tab-body">' +
        fastNote +
        '<div id="lesson-content">' + stripAr(lv.html) + '</div>' +
        (lv.widget ? '<div id="widget-mount"></div>' : '') +
        '<div class="level-action">' + action + '</div>' +
      '</div>' +
      (function () {
        const existing = window.Notes.forNode(nodeId);
        return '<details class="node-notes"' + (existing && existing.body ? ' open' : '') + '>' +
          '<summary>📝 My notes on this lesson' + (arOn() ? ' · ملاحظاتي' : '') + '</summary>' +
          '<textarea id="node-note" placeholder="quick notes while studying — autosaves…">' + esc(existing ? existing.body : '') + '</textarea>' +
        '</details>';
      })() +
      '</div>';

    bindNav(root);
    glossify(root);
    wireArToggle(nodeId, tab, stripAr(lv.html));
    window.Mentor.setContext({ where: 'node', nodeId: nodeId, level: tab });
    if (lv.widget) window.Widgets.mount(lv.widget, document.getElementById('widget-mount'));

    /* per-lesson quick notes, autosaved into the notebook */
    const noteArea = document.getElementById('node-note');
    if (noteArea) {
      let noteTimer = null;
      noteArea.addEventListener('input', () => {
        clearTimeout(noteTimer);
        noteTimer = setTimeout(() => {
          let page = window.Notes.forNode(nodeId);
          if (!page) page = window.Notes.create(n.num + ' · ' + n.title, nodeId);
          window.Notes.update(page.id, { body: noteArea.value });
        }, 400);
      });
    }

    const forgeEl = document.getElementById('forge-btn');
    if (forgeEl) {
      forgeEl.addEventListener('click', async () => {
        forgeEl.disabled = true;
        forgeEl.textContent = '⚒ FORGING…';
        const statusEl = document.getElementById('level-status');
        try {
          const added = await window.Mentor.forgeQuestions(nodeId, tab);
          statusEl.innerHTML = '<span class="done">+' + added + ' forged into the bank ✓</span> — reload to deal them into runs.';
          forgeEl.textContent = '⚒ FORGED — RELOAD';
          forgeEl.disabled = false;
          forgeEl.addEventListener('click', () => location.reload(), { once: true });
        } catch (err) {
          statusEl.innerHTML = '<span style="color:var(--bad)">forge failed: ' + esc(err.message) + '</span>';
          forgeEl.textContent = '⚒ FORGE +3';
          forgeEl.disabled = false;
        }
      });
    }
  }

  function bossView(root, n) {
    const lv = n.levels.boss;
    const powered = window.State.isPowered(n.trackId);
    root.innerHTML =
      topbarHtml() +
      '<div class="boot-in">' +
      '<button class="crumb" data-go="#/">← system schematic</button>' +
      '<div class="node-head">' +
        '<span class="' + sockClass(powered ? 'applied' : 'available', true) + '"></span>' +
        '<h1>' + esc(n.title) + '</h1>' +
      '</div>' +
      '<div class="tabs" style="margin-top:14px;"><span class="tab-spacer"></span><button class="tab lang-toggle" id="ar-toggle">🌐 عربي</button></div>' +
      '<div class="tab-body">' +
        '<div id="lesson-content">' + stripAr(n.intro) + '</div>' +
        '<div class="level-action">' +
          (powered
            ? '<p class="status"><span class="done">GATEWORK ONLINE ✓</span> — rerun the integration test anytime.</p>'
            : '<p class="status">' + lv.questions.length + ' challenges · pass ' + lv.passNeed + ' → <b>POWER ON</b></p>') +
          '<button class="btn power" data-go="#/arena/' + n.id + '/boss">' + (powered ? 'RERUN TEST' : 'BEGIN INTEGRATION TEST') + '</button>' +
        '</div>' +
      '</div>' +
      '</div>';
    bindNav(root);
    glossify(root);
    wireArToggle(n.id, 'boss', stripAr(n.intro));
    window.Mentor.setContext({ where: 'node', nodeId: n.id, level: 'boss' });
  }

  function textify(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  }

  /* ================= NOTEBOOK (دفتر الملاحظات) ================= */
  function mdLite(s) {
    return esc(s)
      .replace(/^### (.*)$/gm, '<b class="nt-h3">$1</b>')
      .replace(/^## (.*)$/gm, '<b class="nt-h2">$1</b>')
      .replace(/^# (.*)$/gm, '<b class="nt-h1">$1</b>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^- (.*)$/gm, '&nbsp;&nbsp;• $1')
      .replace(/\n/g, '<br>');
  }

  function notesList(root) {
    const pages = window.Notes.list();
    root.innerHTML = topbarHtml() + '<div class="boot-in">' +
      '<button class="crumb" data-go="#/">← system schematic</button>' +
      '<h1 class="screen-title">Notebook' + (arOn() ? ' · دفتر الملاحظات' : '') + '</h1>' +
      '<p class="screen-sub">Lecture notes, ideas, anything — autosaved on this computer. Use it live in class: one click, start typing.</p>' +
      '<div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:18px;">' +
        '<button class="btn power" id="note-new">+ NEW PAGE</button>' +
        (pages.length ? '<button class="btn ghost" id="note-export">⬇ EXPORT .md</button>' : '') +
        '<input class="free-input" id="note-search" placeholder="search notes…" style="flex:1; min-width:180px; margin:0;">' +
      '</div>' +
      (pages.length
        ? '<div id="note-cards">' + pages.map(p => {
            const n = p.nodeId && window.NODES[p.nodeId];
            return '<button class="note-card" data-go="#/notes/' + p.id + '" data-search="' + esc((p.title + ' ' + p.body).toLowerCase()) + '">' +
              '<b>' + esc(p.title) + '</b>' +
              (n ? '<span class="note-tag">lesson ' + n.num + '</span>' : '') +
              '<span class="note-snippet">' + esc(p.body.slice(0, 90) || '(empty)') + '</span>' +
              '<span class="note-date">' + new Date(p.updatedAt).toLocaleString() + '</span>' +
            '</button>';
          }).join('') + '</div>'
        : '<p class="mt-empty" style="text-align:left">No pages yet — press + NEW PAGE. In a lecture: new page, type the course name, go.</p>') +
      '</div>';
    bindNav(root);
    document.getElementById('note-new').addEventListener('click', () => {
      const p = window.Notes.create('Lecture — ' + new Date().toLocaleDateString());
      window.App.go('#/notes/' + p.id);
    });
    const exp = document.getElementById('note-export');
    if (exp) exp.addEventListener('click', () => window.Notes.exportMd());
    const search = document.getElementById('note-search');
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      root.querySelectorAll('.note-card').forEach(c => { c.hidden = q && !c.dataset.search.includes(q); });
    });
    window.Mentor.setContext({ where: 'notebook' });
  }

  function noteEdit(root, id) {
    const p = window.Notes.get(id);
    if (!p) { window.App.go('#/notes'); return; }
    let viewing = false, saveTimer = null;

    function render() {
      const n = p.nodeId && window.NODES[p.nodeId];
      root.innerHTML = topbarHtml() + '<div>' +
        '<button class="crumb" data-go="#/notes">← notebook</button>' +
        '<input class="note-title" id="nt-title" value="' + esc(p.title) + '" maxlength="80">' +
        '<div class="note-meta">' +
          '<span class="mono-label" id="nt-saved">saved · ' + new Date(p.updatedAt).toLocaleTimeString() + '</span>' +
          (n ? '<a class="mono-label" href="#/node/' + p.nodeId + '" style="color:var(--accent)">→ lesson ' + n.num + '</a>' : '') +
          '<button class="btn ghost" id="nt-view" style="padding:5px 12px; font-size:12px;">' + (viewing ? '✎ EDIT' : '👁 VIEW') + '</button>' +
          '<button class="btn ghost" id="nt-del" style="padding:5px 12px; font-size:12px; color:var(--bad);">DELETE</button>' +
        '</div>' +
        (viewing
          ? '<div class="note-preview">' + (mdLite(p.body) || '<span class="mono-label">empty page</span>') + '</div>'
          : '<textarea class="note-body" id="nt-body" placeholder="type… autosaves as you write (supports **bold**, `code`, # headers, - lists)' + (arOn() ? '\nاكتب ملاحظاتك هنا — يُحفظ تلقائياً' : '') + '">' + esc(p.body) + '</textarea>') +
        '</div>';
      bindNav(root);

      document.getElementById('nt-view').addEventListener('click', () => { viewing = !viewing; render(); });
      document.getElementById('nt-del').addEventListener('click', () => {
        if (confirm('Delete this page? This cannot be undone.')) { window.Notes.remove(p.id); window.App.go('#/notes'); }
      });
      const title = document.getElementById('nt-title');
      title.addEventListener('input', () => queueSave({ title: title.value }));
      const body = document.getElementById('nt-body');
      if (body) {
        if (!viewing) body.focus();
        body.addEventListener('input', () => queueSave({ body: body.value }));
      }
    }

    function queueSave(fields) {
      Object.assign(p, fields);
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        window.Notes.update(p.id, fields);
        const el = document.getElementById('nt-saved');
        if (el) el.textContent = 'saved · ' + new Date().toLocaleTimeString();
      }, 400);
    }

    render();
    window.Mentor.setContext({ where: 'notebook', nodeId: p.nodeId || undefined });
  }

  /* ================= THE MANUAL (المرجع — laws & fixed values) ================= */
  function manual(root) {
    let html = topbarHtml() + '<div class="boot-in">' +
      '<button class="crumb" data-go="#/">← system schematic</button>' +
      '<h1 class="screen-title">The Manual' + (arOn() ? ' · المرجع' : '') + '</h1>' +
      '<p class="screen-sub">Every common law, formula, and fixed value in one place — with a link to the lesson that teaches it. Your exam cheat-sheet, built in.</p>' +
      '<input class="free-input ref-search" id="ref-search" placeholder="search… (try: cos, bayes, gcd)" autocomplete="off">';

    window.REFERENCE.forEach((sec, si) => {
      html += '<div class="track-panel ref-sec" style="--tc: var(' + sec.color + ')" data-sec="' + si + '">' +
        '<div class="panel-head"><span class="chip"></span><h2>' + esc(sec.section) + '</h2>' +
        (arOn() ? '<span class="mono-label">' + esc(sec.sectionAr) + '</span>' : '') + '</div>' +
        (sec.note ? '<p class="ref-note">' + esc(sec.note) + '</p>' : '') +
        '<div class="tbl-scroll"><table class="ref-table">' +
        sec.items.map(it =>
          '<tr class="ref-row" data-search="' + esc((it.name + ' ' + it.ar + ' ' + it.f + ' ' + it.note).toLowerCase()) + '">' +
            '<td class="ref-f">' + it.f + '</td>' +
            '<td class="ref-name"><b>' + esc(it.name) + '</b> ' + (arOn() ? '<span class="ref-ar">' + esc(it.ar) + '</span>' : '') +
              '<span class="payoff">' + it.note + '</span></td>' +
            '<td class="ref-link-cell">' + (it.nodeId && window.NODES[it.nodeId]
              ? '<a href="#/node/' + it.nodeId + '">→ ' + window.NODES[it.nodeId].num + '</a>' : '') + '</td>' +
          '</tr>').join('') +
        '</table></div></div>';
    });
    html += '</div>';
    root.innerHTML = html;
    bindNav(root);

    const search = document.getElementById('ref-search');
    search.focus();
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      root.querySelectorAll('.ref-sec').forEach(sec => {
        let visible = 0;
        sec.querySelectorAll('.ref-row').forEach(row => {
          const hit = !q || row.dataset.search.includes(q);
          row.hidden = !hit;
          if (hit) visible += 1;
        });
        sec.hidden = visible === 0;
      });
    });
    window.Mentor.setContext({ where: 'manual' });
  }

  /* ================= PRACTICE GYM (صالة التمارين) ================= */
  function gym(root) {
    let html = topbarHtml() + '<div class="boot-in">' +
      '<button class="crumb" data-go="#/">← system schematic</button>' +
      '<h1 class="screen-title">Practice Gym' + (arOn() ? ' · صالة التمارين' : '') + '</h1>' +
      '<p class="screen-sub">Endless fresh equations — every one comes with a step-by-step solution, a code version, a 💡 trick, and where it is used. +3 XP per correct answer.</p>';

    function cardsHtml(fams) {
      return '<div class="gym-grid">' +
        fams.map(g =>
          '<button class="gym-card" data-go="#/drill/' + g.id + '">' +
            '<b>' + esc(g.title) +
            (g.tier === 'advanced' ? ' <i class="gym-tier adv">ADV</i>' : '') +
            '</b>' + (arOn() ? '<span>' + esc(g.titleAr) + '</span>' : '') +
          '</button>').join('') +
        '</div>';
    }

    const basics = window.GENERATORS.filter(g => g.trackId === 'basics');
    if (basics.length) {
      html += '<div class="track-panel" style="--tc: var(--power)">' +
        '<div class="panel-head"><span class="chip"></span><h2>School Basics — be FAST at these</h2>' +
        '<span class="mono-label">' + (arOn() ? 'أساسيات — السرعة هنا هي الهدف' : 'speed is the goal') + '</span></div>' +
        cardsHtml(basics) + '</div>';
    }
    window.TRACKS.forEach(t => {
      const fams = window.GENERATORS.filter(g => g.trackId === t.id)
        .sort((a, b) => (a.tier === 'advanced' ? 1 : 0) - (b.tier === 'advanced' ? 1 : 0));
      if (!fams.length) return;
      html += '<div class="track-panel" style="--tc: var(' + t.colorVar + ')">' +
        '<div class="panel-head"><span class="chip"></span><h2>' + t.title + '</h2>' +
        '<span class="mono-label">' + fams.length + ' machine' + (fams.length > 1 ? 's' : '') + '</span></div>' +
        cardsHtml(fams) + '</div>';
    });
    html += '</div>';
    root.innerHTML = html;
    bindNav(root);
    window.Mentor.setContext({ where: 'gym' });
  }

  /* ================= DRILL (endless practice on one family) ================= */
  function drill(root, genId) {
    const fam = window.GENERATORS.byId[genId];
    if (!fam) { window.App.go('#/gym'); return; }
    const siblings = (fam.nodeId && window.GENERATORS.byNode[fam.nodeId]) || [fam];
    let ex = fam.gen();
    let attempted = 0, correct = 0, xpTotal = 0;
    let answered = false, revealed = false, counted = false;

    function solutionHtml(e, title) {
      return '<div class="sol-panel">' +
        (title ? '<p class="mono-label" style="color:var(--accent)">' + title + '</p>' +
          '<p class="q-prompt" style="font-size:15px">' + stripAr(e.prompt) + '</p>' : '') +
        '<p class="sol-answer">Answer: <b>' + (e.accept && e.accept.length ? esc(e.accept[0]) : String(Math.round(e.value * 1000) / 1000)) + '</b></p>' +
        '<p class="mono-label" style="color:var(--power)">step by step' + (arOn() ? ' · الحل خطوة بخطوة' : '') + '</p>' +
        '<ol class="sol-steps">' + e.steps.map(s => '<li>' + stripAr(s) + '</li>').join('') + '</ol>' +
        '<p class="mono-label">💻 in code' + (arOn() ? ' · بالكود' : '') + '</p>' +
        '<pre><code>' + esc(e.code) + '</code></pre>' +
        (e.tip ? '<p class="sol-tip">' + stripAr(e.tip) + '</p>' : '') +
        '<p class="sol-usage">🌍 ' + stripAr(e.usage) + '</p>' +
      '</div>';
    }

    function render() {
      root.innerHTML = topbarHtml() +
        '<div class="arena">' +
        '<div class="arena-top">' +
          '<button class="crumb" style="margin:0" data-go="#/gym">← gym</button>' +
          '<span class="mono-label">∞ ' + esc(fam.title) + (arOn() ? ' · ' + esc(fam.titleAr) : '') + '</span>' +
          '<span class="mono-label" style="margin-left:auto">' + correct + '/' + attempted + ' · +' + xpTotal + ' XP</span>' +
        '</div>' +
        '<div class="q-card">' +
          '<p class="q-prompt">' + stripAr(ex.prompt) + '</p>' +
          '<input class="free-input" id="drill-in" autocomplete="off" spellcheck="false" placeholder="answer… (fractions like 3/4 are OK)">' +
          '<div id="drill-verdict"></div>' +
          '<div id="drill-sol"></div>' +
          '<div class="q-actions">' +
            '<button class="btn" id="drill-submit">SUBMIT ⏎</button>' +
            '<button class="btn ghost" id="drill-solution">📖 SOLUTION' + (arOn() ? ' · الحل' : '') + '</button>' +
            '<button class="btn ghost" id="drill-example">🧪 EXAMPLE' + (arOn() ? ' · مثال' : '') + '</button>' +
            '<button class="btn ghost" id="drill-next">NEXT →</button>' +
          '</div>' +
          (siblings.length > 1
            ? '<p class="order-hint-line" style="margin-top:12px">same topic: ' +
              siblings.filter(s => s.id !== fam.id).map(s => '<a href="#/drill/' + s.id + '">' + esc(s.title) + '</a>').join(' · ') + '</p>'
            : '') +
        '</div>' +
        '</div>';

      bindNav(root);
      const inp = document.getElementById('drill-in');
      inp.focus();
      document.getElementById('drill-submit').addEventListener('click', submit);
      document.getElementById('drill-next').addEventListener('click', next);
      document.getElementById('drill-solution').addEventListener('click', () => {
        revealed = true;
        document.getElementById('drill-sol').innerHTML = solutionHtml(ex, null);
      });
      document.getElementById('drill-example').addEventListener('click', () => {
        const e2 = fam.gen();
        document.getElementById('drill-sol').innerHTML = solutionHtml(e2, 'worked example' + (arOn() ? ' · مثال محلول' : ''));
      });
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); answered ? next() : submit(); }
      });
      window.Mentor.setContext({
        where: 'drill', nodeId: fam.nodeId || undefined, level: 'l2',
        question: { prompt: textify(ex.prompt), hintsUsed: 0 }
      });
    }

    function submit() {
      const inp = document.getElementById('drill-in');
      if (!inp || inp.value.trim() === '') return;
      const ok = window.GENERATORS.check(ex, inp.value);
      if (!counted) { attempted += 1; counted = true; }
      const v = document.getElementById('drill-verdict');
      if (ok) {
        if (!answered) {
          if (!revealed) { xpTotal += 3; window.State.addXP(3); correct += 1; }
          if (fam.nodeId) window.State.recordAttempt(fam.nodeId, true, null);
        }
        answered = true;
        v.innerHTML = '<div class="verdict ok"><p class="v-head">✓ VERIFIED' + (revealed ? ' (no XP — solution was shown)' : ' · +3 XP') + '</p></div>';
        document.getElementById('drill-sol').innerHTML = solutionHtml(ex, null);
        const top = root.querySelector('.arena-top .mono-label:last-child');
        if (top) top.textContent = correct + '/' + attempted + ' · +' + xpTotal + ' XP';
      } else {
        if (fam.nodeId) window.State.recordAttempt(fam.nodeId, false, null);
        v.innerHTML = '<div class="verdict bad"><p class="v-head">✗ NOT YET</p><p>Try again — or press 📖 SOLUTION to see the steps.</p></div>';
      }
    }

    function next() {
      ex = fam.gen();
      answered = false; revealed = false; counted = false;
      render();
    }

    keyHandler = function (e) {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'Enter') { e.preventDefault(); answered ? next() : submit(); }
    };
    document.addEventListener('keydown', keyHandler);

    render();
  }

  /* ================= ARENA (shared runner) ================= */
  function arena(root, nodeId, level) {
    const n = window.NODES[nodeId];
    if (!n.levels[level]) { window.App.go('#/node/' + nodeId); return; }
    const session = new window.Engine.Session(nodeId, level);
    runArena(root, session, {
      backHash: '#/node/' + nodeId,
      header: level === 'boss' ? 'INTEGRATION TEST' : n.num + ' · ' + LEVEL_TITLES[level].toUpperCase(),
      finish: function (res) {
        if (level === 'boss' && res.passed) {
          window.State.powerComponent(n.trackId);
          const track = window.TRACKS.find(t => t.id === n.trackId);
          ceremony(root, track);
          return;
        }
        levelSummary(root, session, res);
      }
    });
  }

  function boot(root) {
    if (!window.State.dueNodes().length) { window.App.go('#/'); return; }
    const session = new window.Engine.BootSession();
    runArena(root, session, {
      backHash: '#/',
      header: 'BOOT SEQUENCE · RETENTION CHECK',
      finish: function (res) { bootSummary(root, res); }
    });
  }

  function runArena(root, session, opts) {
    let phase = 'answer'; /* answer | verdict | done */
    let picked = null;

    function dotsHtml() {
      return session.questions.map((inst, i) => {
        let cls = 'dot';
        if (inst.result === true) cls += ' hit';
        else if (inst.result === false) cls += ' miss';
        else if (i === session.idx) cls += ' now';
        return '<span class="' + cls + '"></span>';
      }).join('');
    }

    function questionBodyHtml(inst) {
      const q = inst.q;
      if (q.type === 'mcq') {
        return inst.options.map((op, i) =>
          '<button class="opt' + (picked === i ? ' picked' : '') + '" data-opt="' + i + '">' +
            '<span class="key">' + (i + 1) + '</span><span>' + op.o.t + '</span>' +
          '</button>').join('');
      }
      if (q.type === 'input') {
        return '<input class="free-input" id="free-in" autocomplete="off" placeholder="' + esc(q.placeholder || 'answer…') + '">';
      }
      if (q.type === 'boolExpr') {
        return '<input class="free-input" id="free-in" autocomplete="off" spellcheck="false" placeholder="' + esc(q.placeholder || 'expression…') + '">' +
          '<p class="order-hint-line">forge check: your expression is verified against the full truth table (' + (1 << q.vars.length) + ' rows)</p>';
      }
      if (q.type === 'order') {
        const seqHtml = inst.seq.map((p, i) =>
          '<button class="order-step" data-seq="' + i + '"><span class="idx">' + (i + 1) + '</span>' + esc(p.s) + '</button>').join('');
        const poolHtml = inst.pool.map((p, i) =>
          '<button class="order-step" data-pool="' + i + '">' + esc(p.s) + '</button>').join('');
        return '<div class="order-seq">' + (seqHtml || '<p class="order-hint-line">click the steps below in proof order — click a placed step to take it back</p>') + '</div>' +
          '<div class="order-pool">' + poolHtml + '</div>';
      }
      return '';
    }

    function render() {
      const inst = session.current();
      const shownHints = (inst.q.hints || []).slice(0, inst.hintsUsed);
      const hintsLeft = (inst.q.hints || []).length - inst.hintsUsed;
      const mult = window.HINT_MULT[Math.min(inst.hintsUsed, window.HINT_MULT.length - 1)];
      const srcChip = (session.kind === 'boot' && inst.node)
        ? '<p class="q-src">recharging <b>' + inst.node.num + ' · ' + esc(inst.node.title) + '</b></p>'
        : '';

      root.innerHTML =
        topbarHtml() +
        '<div class="arena">' +
        '<div class="arena-top">' +
          '<button class="crumb" style="margin:0" data-go="' + opts.backHash + '">← abort run</button>' +
          '<span class="mono-label">' + opts.header + '</span>' +
          '<span class="dots">' + dotsHtml() + '</span>' +
        '</div>' +
        '<div class="q-card">' +
          srcChip +
          '<p class="q-prompt">' + inst.q.prompt + '</p>' +
          '<div id="q-body">' + questionBodyHtml(inst) + '</div>' +
          shownHints.map((h, i) =>
            '<div class="hint-box"><span class="rung">HINT ' + (i + 1) + '/' + inst.q.hints.length + '</span><p>' + h + '</p></div>').join('') +
          '<div id="verdict-slot"></div>' +
          '<div class="q-actions">' +
            '<button class="btn" id="submit-btn" disabled>SUBMIT ⏎</button>' +
            (hintsLeft > 0 ? '<button class="btn ghost" id="hint-btn">HINT (H) · ' + hintsLeft + ' left</button>' : '') +
            (hintsLeft > 0 ? '<button class="btn ghost" id="sol-all-btn" title="show the full solution ladder">📖 SOLUTION</button>' : '') +
            '<span class="hint-note">xp ×' + mult.toFixed(1) + (inst.hintsUsed ? ' (hints used: ' + inst.hintsUsed + ')' : '') + '</span>' +
          '</div>' +
        '</div>' +
        '</div>';

      bindNav(root);
      wire(inst);
      window.Mentor.setContext({
        where: 'arena',
        nodeId: inst.node ? inst.node.id : session.nodeId,
        level: session.level || 'l2',
        question: { prompt: textify(inst.q.prompt), answered: false, hintsUsed: inst.hintsUsed }
      });
    }

    function wire(inst) {
      const q = inst.q;
      const submitBtn = document.getElementById('submit-btn');

      if (q.type === 'mcq') {
        root.querySelectorAll('[data-opt]').forEach(btn => {
          btn.addEventListener('click', () => {
            picked = Number(btn.dataset.opt);
            root.querySelectorAll('[data-opt]').forEach(b => b.classList.toggle('picked', Number(b.dataset.opt) === picked));
            submitBtn.disabled = false;
          });
        });
      } else if (q.type === 'input' || q.type === 'boolExpr') {
        const inp = document.getElementById('free-in');
        inp.focus();
        inp.addEventListener('input', () => { submitBtn.disabled = inp.value.trim() === ''; });
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
      } else if (q.type === 'order') {
        root.querySelectorAll('[data-pool]').forEach(btn => {
          btn.addEventListener('click', () => {
            inst.seq.push(inst.pool.splice(Number(btn.dataset.pool), 1)[0]);
            render();
          });
        });
        root.querySelectorAll('[data-seq]').forEach(btn => {
          btn.addEventListener('click', () => {
            inst.pool.push(inst.seq.splice(Number(btn.dataset.seq), 1)[0]);
            render();
          });
        });
        submitBtn.disabled = inst.pool.length !== 0;
      }

      const hintBtn = document.getElementById('hint-btn');
      if (hintBtn) hintBtn.addEventListener('click', () => { session.useHint(); render(); });
      const solBtn = document.getElementById('sol-all-btn');
      if (solBtn) solBtn.addEventListener('click', () => {
        const inst2 = session.current();
        inst2.hintsUsed = (inst2.q.hints || []).length; /* reveal the whole ladder, incl. the full solution */
        render();
      });
      submitBtn.addEventListener('click', submit);
    }

    function submit() {
      if (phase !== 'answer') return;
      const inst = session.current();
      const q = inst.q;
      let payload;
      if (q.type === 'mcq') {
        if (picked === null) return;
        payload = { optionIndex: picked };
      } else if (q.type === 'input' || q.type === 'boolExpr') {
        const inp = document.getElementById('free-in');
        if (!inp || inp.value.trim() === '') return;
        payload = { text: inp.value };
      } else if (q.type === 'order') {
        if (inst.pool.length !== 0) return;
        payload = { sequence: inst.seq.map(p => p.orig) };
      }

      const v = session.answer(payload);
      if (v.invalid) {
        document.getElementById('verdict-slot').innerHTML =
          '<div class="verdict bad"><p class="v-head">FORGE REJECTED INPUT</p><p>' + esc(v.msg) + '</p></div>';
        return;
      }
      phase = 'verdict';
      showVerdict(v, inst);
    }

    function showVerdict(v, inst) {
      /* freeze the answer area */
      root.querySelectorAll('[data-pool], [data-seq]').forEach(b => { b.disabled = true; });
      const fin = document.getElementById('free-in');
      if (fin) fin.disabled = true;
      if (inst.q.type === 'mcq') {
        root.querySelectorAll('[data-opt]').forEach(b => {
          const i = Number(b.dataset.opt);
          b.disabled = true;
          if (inst.options[i].o.ok) b.classList.add('reveal-ok');
          else if (i === inst.picked) b.classList.add('reveal-bad');
        });
      }
      const slot = document.getElementById('verdict-slot');
      slot.innerHTML =
        '<div class="verdict ' + (v.correct ? 'ok' : 'bad') + '">' +
          '<p class="v-head">' + (v.correct ? '✓ VERIFIED' : '✗ FAULT DETECTED') + '</p>' +
          (v.correct ? '' : (v.correctText ? '<p><b>Correct:</b> ' + v.correctText + '</p>' : '')) +
          (v.detail ? '<p>' + v.detail + '</p>' : '') +
          (v.mis ? '<p class="mis">[misconception: ' + v.mis + ']</p>' : '') +
          (v.edge ? '<p class="edge"><b>Edge case —</b> ' + v.edge + '</p>' : '') +
          (!v.correct ? '<button class="btn ghost" id="ask-mentor" style="margin-top:10px">◈ ASK MENTOR ABOUT THIS</button>' : '') +
        '</div>';

      /* hand the full question story to the mentor */
      const yourAnswer = inst.q.type === 'mcq' ? textify(inst.options[inst.picked].o.t)
        : (inst.entered != null ? inst.entered : '(step ordering)');
      window.Mentor.setContext({
        where: 'arena',
        nodeId: inst.node ? inst.node.id : session.nodeId,
        level: session.level || 'l2',
        question: {
          prompt: textify(inst.q.prompt),
          yourAnswer: yourAnswer,
          wasCorrect: v.correct,
          correctAnswer: v.correctText ? textify(v.correctText) : null,
          misconception: v.mis || null,
          hintsUsed: inst.hintsUsed
        }
      });
      const askBtn = document.getElementById('ask-mentor');
      if (askBtn) askBtn.addEventListener('click', () => window.Mentor.open());

      const submitBtn = document.getElementById('submit-btn');
      submitBtn.disabled = false;
      submitBtn.textContent = (session.idx + 1 < session.total()) ? 'CONTINUE ⏎' : 'FINISH RUN ⏎';
      submitBtn.replaceWith(submitBtn.cloneNode(true));
      document.getElementById('submit-btn').addEventListener('click', advance);
      const hb = document.getElementById('hint-btn');
      if (hb) hb.disabled = true;
      slot.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function advance() {
      if (phase !== 'verdict') return;
      picked = null;
      phase = 'answer';
      if (session.next()) render();
      else { phase = 'done'; opts.finish(session.finish()); }
    }

    keyHandler = function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (e.key === 'Enter') {
        e.preventDefault();
        if (phase === 'answer') submit();
        else if (phase === 'verdict') advance();
      } else if (e.key === 'h' || e.key === 'H') {
        const hb = document.getElementById('hint-btn');
        if (hb && !hb.disabled && phase === 'answer') { session.useHint(); render(); }
      } else if (/^[1-9]$/.test(e.key) && phase === 'answer') {
        const idx = Number(e.key) - 1;
        const btns = root.querySelectorAll('[data-opt]');
        if (btns[idx]) btns[idx].click();
      }
    };
    document.addEventListener('keydown', keyHandler);

    render();
  }

  /* ---- quotes: reactive motivation ---- */
  function quoteCard(pool, seeded) {
    const list = (window.QUOTES && window.QUOTES[pool]) || [];
    if (!list.length) return '';
    const q = seeded
      ? list[Math.floor(Date.now() / DAY) % list.length]
      : list[Math.floor(Math.random() * list.length)];
    return (
      '<blockquote class="quote-card">' +
        '<p class="q-text">“' + esc(q.t) + '”</p>' +
        (arOn() ? '<p class="q-ar">' + esc(q.ar) + '</p>' : '') +
        '<p class="q-author">— ' + esc(q.a) + '</p>' +
      '</blockquote>'
    );
  }

  /* ---- summaries & ceremony ---- */
  function ratingLine(res) {
    if (res.ratingBefore == null || res.ratingBefore === res.ratingAfter) return '';
    const up = res.ratingAfter > res.ratingBefore;
    return ' · rating ' + res.ratingBefore + ' <span style="color:var(--' + (up ? 'ok' : 'bad') + ')">' + (up ? '↗' : '↘') + '</span> ' + res.ratingAfter;
  }

  function levelSummary(root, session, res) {
    const nodeId = session.nodeId, level = session.level;
    const target = level === 'l1' ? 'DISCOVERED' : level === 'l2' ? 'UNDERSTOOD' : 'APPLIED';
    const nextRec = window.State.recommend();
    root.innerHTML =
      topbarHtml() +
      '<div class="arena">' +
      '<div class="summary-card ' + (res.passed ? '' : 'fail') + ' boot-in">' +
        '<span class="mono-label">' + (res.passed ? 'run complete' : 'run incomplete') + '</span>' +
        '<h2>' + (res.passed ? 'Node energized → ' + target : 'The machine flags instability') + '</h2>' +
        '<div class="big-xp">+' + res.xp + ' XP</div>' +
        '<p class="acc">' + res.correct + ' / ' + res.total + ' verified · needed ' + res.passNeed + ratingLine(res) + '</p>' +
        (res.passed
          ? (level === 'l3' ? '<p class="note">Charge is full — this node starts draining tomorrow. Recharge it in the daily Boot Sequence to work toward MASTERED (3 retention checks).</p>' : '')
          : '<p class="note">No penalty — review the faults above in your head, skim the level again if you like, and rerun. The pass bar stays where it is.</p>') +
        quoteCard(res.passed ? 'win' : 'lose') +
        '<div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">' +
          (res.passed
            ? (nextRec
                ? '<button class="btn power" data-go="#/node/' + nextRec.id + '">NEXT: ' + esc(window.NODES[nextRec.id].num + ' ' + window.NODES[nextRec.id].title) + '</button>'
                : '') +
              '<button class="btn ghost" data-go="#/">SYSTEM MAP</button>'
            : '<button class="btn power" data-go="#/arena/' + nodeId + '/' + level + '">RERUN</button>' +
              '<button class="btn ghost" data-go="#/node/' + nodeId + '">REVIEW LEVEL</button>') +
        '</div>' +
      '</div>' +
      '</div>';
    bindNav(root);
  }

  function bootSummary(root, res) {
    const allGood = res.slipped === 0;
    const rowsHtml = res.results.map(r =>
      '<div class="boot-row ' + (r.success ? 'ok' : 'slip') + '">' +
        '<span class="num">' + r.node.num + '</span>' +
        '<span class="n-title">' + esc(r.node.title) + '</span>' +
        '<span class="verdict-txt">' +
          (r.mastered ? '★ MASTERED'
            : r.success ? '✓ recharged · next check in ' + r.intervalDays + 'd'
            : '✗ slipped · back to 1d') +
        '</span>' +
      '</div>').join('');

    root.innerHTML =
      topbarHtml() +
      '<div class="arena">' +
      '<div class="summary-card boot-in">' +
        '<span class="mono-label">boot sequence complete</span>' +
        '<h2>' + (allGood ? 'All systems recharged' : res.recharged + ' recharged · ' + res.slipped + ' slipped') + '</h2>' +
        '<div class="big-xp">+' + res.xp + ' XP</div>' +
        '<p class="acc">streak +1 day' + ratingLine(res) + '</p>' +
        '<div class="boot-rows">' + rowsHtml + '</div>' +
        quoteCard(allGood ? 'win' : 'lose') +
        '<div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:20px;">' +
          '<button class="btn power" data-go="#/">SYSTEM MAP</button>' +
        '</div>' +
      '</div>' +
      '</div>';
    bindNav(root);
  }

  const CEREMONY_COPY = {
    'logic': 'Control unit energized. The circuit trace above the wordmark now runs live — your logic keeps it lit. The Lattice, Render Engine and Optimizer are now open.',
    'discrete': 'Data &amp; network layer energized. The schematic shows its wiring now — node chains link visibly down every track. The Oracle stirs: Probability is open.',
    'linear-algebra': 'Graphics layer energized. The machine gains depth — components tilt in 3D under your cursor. Every transform you now compose is one the lab itself performs.',
    'calculus': 'Tuning layer energized. Watch the lab move — every animation just inherited the easing curves you earned by understanding how change accumulates.',
    'probability': 'Randomness layer energized. The Oracle now speaks: a seeded prophecy waits on the schematic each day.'
  };

  function ceremony(rootEl, track) {
    const allPowered = window.TRACKS.every(t => window.State.isPowered(t.id));
    const fullBoot = allPowered && track.id === 'probability';
    rootEl.innerHTML = topbarHtml() +
      '<div class="ceremony">' +
        '<div class="box">' +
          '<div class="socket-big"></div>' +
          '<span class="mono-label">' + (fullBoot ? 'all components online' : 'component online') + '</span>' +
          '<h2>' + (fullBoot ? 'THE MACHINE — FULL BOOT' : track.component + ' — POWERED') + '</h2>' +
          '<p>' + (CEREMONY_COPY[track.id] || 'Component energized.') +
            (fullBoot ? '<br><br><b>Every light on this board is something you understand.</b> Keep the charge alive — the machine runs on memory as much as insight.' : '') + '</p>' +
          (fullBoot ? '<p class="signature hand" style="text-align:center">— prepared by Omar :)</p>' : '') +
          quoteCard('boss') +
          '<button class="btn power" data-go="#/">RETURN TO THE MACHINE</button>' +
        '</div>' +
      '</div>';
    document.body.classList.add(track.cssClass);
    bindNav(rootEl);
  }

  window.Views = {
    onboarding: onboarding,
    map: map,
    node: node,
    arena: arena,
    boot: boot,
    gym: gym,
    drill: drill,
    manual: manual,
    notesList: notesList,
    noteEdit: noteEdit,
    teardown() {
      if (keyHandler) { document.removeEventListener('keydown', keyHandler); keyHandler = null; }
    }
  };
})();
