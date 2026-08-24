/* MATH LAB — question engine: item bank init, Elo, checking, sessions */
(function () {

  /* ---- bank init: stable ids + default difficulty ratings ---- */
  const DEFAULT_D = { l1: 1120, l2: 1260, l3: 1360, boss: 1480 };

  /* merge AI-forged questions (created via the mentor's question forge) into the bank */
  let forged = {};
  try { forged = JSON.parse(localStorage.getItem('mathlab.forge.v1')) || {}; } catch (e) {}

  Object.keys(window.NODES).forEach(nid => {
    const levels = window.NODES[nid].levels || {};
    Object.keys(levels).forEach(l => {
      const extra = forged[nid + '.' + l];
      if (Array.isArray(extra)) {
        extra.forEach(q => { q.source = 'forged'; levels[l].questions.push(q); });
      }
      (levels[l].questions || []).forEach((q, i) => {
        q._id = (q.source === 'forged' ? 'forge.' : '') + nid + '.' + l + '.' + i;
        if (!q.d) q.d = (DEFAULT_D[l] || 1260) + (q.source === 'forged' ? 40 : 0);
      });
    });
  });

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ---- Elo ---- */
  const Elo = {
    expected(student, item) { return 1 / (1 + Math.pow(10, (item - student) / 400)); },
    itemRating(q) {
      const s = window.State.get();
      return (s.items && s.items[q._id] != null) ? s.items[q._id] : q.d;
    },
    update(trackId, q, correct) {
      const s = window.State.get();
      const st = (s.ratings && s.ratings[trackId] != null) ? s.ratings[trackId] : 1200;
      const item = Elo.itemRating(q);
      const e = Elo.expected(st, item);
      const score = correct ? 1 : 0;
      window.State.setRatings(trackId, Math.round(st + 32 * (score - e)), q._id, Math.round(item + 16 * (e - score)));
    }
  };

  /* ---- boolean expression checker (the "expression forge") ---- */
  function checkBoolExpr(exprRaw, q) {
    const expr = String(exprRaw || '').trim();
    if (!expr) return { valid: false, msg: 'Type an expression first.' };
    if (expr.length > 120) return { valid: false, msg: 'Keep it under 120 characters.' };

    const cleaned = expr.replace(/\btrue\b|\bfalse\b/g, '');
    const varPattern = q.vars.join('');
    const re = new RegExp('^[' + varPattern + '!&|^()=\\s<>]*$');
    if (!re.test(cleaned)) {
      return { valid: false, msg: 'Only the variables ' + q.vars.join(', ') + ', boolean operators (&& || ! === !==), and parentheses are allowed.' };
    }
    if (q.forbid) {
      for (const bad of q.forbid) {
        if (expr.replace(/\s+/g, '').includes(bad)) {
          return { valid: false, msg: 'The pattern "' + bad + '" is banned for this challenge — find the equivalent wiring without it.' };
        }
      }
    }

    let fn, target;
    try {
      fn = new Function(...q.vars, '"use strict"; return Boolean(' + expr + ');');
      target = new Function(...q.vars, '"use strict"; return Boolean(' + q.target + ');');
    } catch (e) {
      return { valid: false, msg: 'That does not parse as a JS expression — check your parentheses and operators.' };
    }

    const n = q.vars.length;
    for (let mask = 0; mask < (1 << n); mask++) {
      const args = q.vars.map((_, i) => Boolean(mask & (1 << i)));
      let got, want;
      try { got = fn(...args); want = target(...args); }
      catch (e) { return { valid: false, msg: 'Your expression threw an error while evaluating — check the syntax.' }; }
      if (got !== want) {
        const row = q.vars.map((v, i) => v + ' = ' + (args[i] ? 'true' : 'false')).join(', ');
        return {
          valid: true, correct: false,
          msg: 'Truth tables diverge. Counterexample row: ' + row + ' — the target gives ' + want + ', yours gives ' + got + '.'
        };
      }
    }
    return { valid: true, correct: true, msg: 'Verified equivalent on all ' + (1 << n) + ' input rows.' };
  }

  function normalizeInput(s) {
    return String(s || '').trim().toLowerCase().replace(/\s+/g, '');
  }

  /* ---- shared per-question instance + answer checking ---- */
  function makeInstance(q, node) {
    const inst = { q: q, node: node || null, hintsUsed: 0, result: null };
    if (q.type === 'mcq') {
      inst.options = shuffle(q.options.map((o, i) => ({ o: o, orig: i })));
    }
    if (q.type === 'order') {
      let pool;
      do { pool = shuffle(q.steps.map((s, i) => ({ s: s, orig: i }))); }
      while (q.steps.length > 1 && pool.every((p, i) => p.orig === i));
      inst.pool = pool;
      inst.seq = [];
    }
    return inst;
  }

  /* evaluates payload against inst; returns verdict or {invalid} — no side effects */
  function checkAnswer(inst, payload) {
    const q = inst.q;
    let correct = false, detail = '', mis = null;

    if (q.type === 'mcq') {
      const picked = inst.options[payload.optionIndex].o;
      correct = !!picked.ok;
      detail = picked.why || '';
      mis = correct ? null : (picked.mis || null);
      inst.picked = payload.optionIndex;
    } else if (q.type === 'input') {
      const norm = normalizeInput(payload.text);
      correct = q.accept.some(a => normalizeInput(a) === norm);
      detail = q.why || '';
      inst.entered = payload.text;
    } else if (q.type === 'boolExpr') {
      const res = checkBoolExpr(payload.text, q);
      if (!res.valid) return { invalid: true, msg: res.msg };
      correct = res.correct;
      detail = correct ? (q.why || '') : res.msg;
      inst.entered = payload.text;
    } else if (q.type === 'order') {
      correct = payload.sequence.length === q.steps.length &&
        payload.sequence.every((origIdx, i) => origIdx === i);
      detail = q.why || '';
    }

    inst.result = correct;
    return {
      correct: correct,
      detail: detail,
      mis: mis,
      edge: q.edge || null,
      correctText: q.type === 'mcq' ? q.options.find(o => o.ok).t : null
    };
  }

  /* ================= LEVEL SESSION ================= */
  function Session(nodeId, level) {
    const node = window.NODES[nodeId];
    const lv = node.levels[level];
    this.kind = 'level';
    this.nodeId = nodeId;
    this.level = level;
    this.node = node;
    this.trackId = node.trackId;
    this.questions = shuffle(lv.questions).map(q => makeInstance(q, node));
    this.idx = 0;
    this.passNeed = lv.passNeed || this.questions.length;
    this.levelXP = level === 'boss' ? window.XP_RULES.boss : window.XP_RULES[level];
    this.xpEarned = 0;
    this.ratingBefore = window.State.rating(this.trackId);
  }

  Session.prototype.current = function () { return this.questions[this.idx]; };
  Session.prototype.total = function () { return this.questions.length; };
  Session.prototype.correctCount = function () {
    return this.questions.filter(i => i.result === true).length;
  };

  Session.prototype.useHint = function () {
    const inst = this.current();
    const hints = inst.q.hints || [];
    if (inst.hintsUsed < hints.length) inst.hintsUsed += 1;
  };

  Session.prototype.answer = function (payload) {
    const inst = this.current();
    const v = checkAnswer(inst, payload);
    if (v.invalid) return v;

    const mult = window.HINT_MULT[Math.min(inst.hintsUsed, window.HINT_MULT.length - 1)];
    if (v.correct) this.xpEarned += (this.levelXP / this.total()) * mult;
    window.State.recordAttempt(this.nodeId, v.correct, v.mis);
    Elo.update(this.trackId, inst.q, v.correct);
    return v;
  };

  Session.prototype.next = function () {
    this.idx += 1;
    return this.idx < this.questions.length;
  };

  Session.prototype.finish = function () {
    const correct = this.correctCount();
    const passed = correct >= this.passNeed;
    const xp = passed ? Math.max(1, Math.round(this.xpEarned)) : Math.round(this.xpEarned * 0.3);
    if (passed) {
      window.State.completeLevel(this.nodeId, this.level, xp, null);
    } else if (xp > 0) {
      window.State.addXP(xp);
    }
    return {
      passed: passed, correct: correct, total: this.total(), xp: xp, passNeed: this.passNeed,
      ratingBefore: this.ratingBefore, ratingAfter: window.State.rating(this.trackId)
    };
  };

  /* ================= BOOT SESSION (spaced-repetition review) ================= */
  const BOOT_PER_NODE = 2;
  const BOOT_MAX_Q = 10;
  const BOOT_XP_RECHARGE = 8;
  const BOOT_XP_SLIP = 2;

  function BootSession() {
    this.kind = 'boot';
    this.nodeIds = window.State.dueNodes();
    this.idx = 0;
    this.xpEarned = 0;
    const insts = [];

    this.nodeIds.forEach(nid => {
      const node = window.NODES[nid];
      const student = window.State.rating(node.trackId);
      const pool = (node.levels.l2 ? node.levels.l2.questions : [])
        .concat(node.levels.l3 ? node.levels.l3.questions : []);
      /* flow-zone pick: the questions whose expected success sits closest to 75% */
      const scored = pool.map(q => ({
        q: q,
        gap: Math.abs(Elo.expected(student, Elo.itemRating(q)) - 0.75)
      }));
      scored.sort((a, b) => a.gap - b.gap);
      scored.slice(0, BOOT_PER_NODE).forEach(x => insts.push(makeInstance(x.q, node)));
    });

    this.questions = shuffle(insts).slice(0, BOOT_MAX_Q);
  }

  BootSession.prototype.current = Session.prototype.current;
  BootSession.prototype.total = Session.prototype.total;
  BootSession.prototype.correctCount = Session.prototype.correctCount;
  BootSession.prototype.useHint = Session.prototype.useHint;
  BootSession.prototype.next = Session.prototype.next;

  BootSession.prototype.answer = function (payload) {
    const inst = this.current();
    const v = checkAnswer(inst, payload);
    if (v.invalid) return v;
    window.State.recordAttempt(inst.node.id, v.correct, v.mis);
    Elo.update(inst.node.trackId, inst.q, v.correct);
    return v;
  };

  BootSession.prototype.finish = function () {
    /* group results per node: recharge needs every check verified */
    const byNode = {};
    this.questions.forEach(inst => {
      const id = inst.node.id;
      if (!byNode[id]) byNode[id] = { node: inst.node, correct: 0, total: 0 };
      byNode[id].total += 1;
      if (inst.result === true) byNode[id].correct += 1;
    });

    let xp = 0;
    const results = Object.keys(byNode).map(id => {
      const r = byNode[id];
      const success = r.correct === r.total;
      const outcome = window.State.applyReviewResult(id, success);
      xp += success ? BOOT_XP_RECHARGE : (r.correct > 0 ? BOOT_XP_SLIP : 0);
      return { node: r.node, correct: r.correct, total: r.total, success: success, mastered: outcome.mastered, intervalDays: outcome.intervalDays };
    });

    if (xp > 0) window.State.addXP(xp);
    else window.State.tickStreak();
    return {
      kind: 'boot', results: results, xp: xp,
      recharged: results.filter(r => r.success).length,
      slipped: results.filter(r => !r.success).length
    };
  };

  window.Engine = { Session: Session, BootSession: BootSession, Elo: Elo, shuffle: shuffle, checkBoolExpr: checkBoolExpr };
})();
