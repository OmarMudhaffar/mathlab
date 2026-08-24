/* MATH LAB — progress store (localStorage, schema v1 + lazy migrations) */
(function () {
  const KEY = 'mathlab.progress.v1';
  const STATES = ['locked', 'available', 'discovered', 'understood', 'applied', 'mastered'];
  const INTERVALS = [1, 3, 7, 14, 30]; /* days between retention checks */
  const DAY = 86400000;
  const MASTERY_CHECKS = 3;
  let cache = null;

  function todayStr(offsetDays) {
    const d = new Date();
    if (offsetDays) d.setDate(d.getDate() + offsetDays);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function blank(name) {
    return {
      schemaVersion: 1,
      profile: { name: name || 'Student', createdAt: todayStr(), programmer: false },
      xp: 0,
      streak: { current: 0, best: 0, lastBootDate: null },
      ratings: { logic: 1200 },  /* per-track student Elo */
      items: {},                 /* questionId -> drifted item Elo */
      concepts: {},              /* id -> { state, attempts, correct, misconceptions,
                                            intervalDays, lastReview, nextReview, retention } */
      components: {},
      log: []
    };
  }

  function migrate(s) {
    if (!s.ratings) s.ratings = { logic: 1200 };
    if (!s.items) s.items = {};
    const now = Date.now();
    Object.keys(s.concepts || {}).forEach(id => {
      const r = s.concepts[id];
      if (!r.misconceptions) r.misconceptions = {};
      if ((r.state === 'applied' || r.state === 'mastered') && !r.nextReview) {
        r.intervalDays = 1; r.lastReview = now; r.nextReview = now + DAY; r.retention = 0;
      }
    });
    return s;
  }

  function load() {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { cache = migrate(JSON.parse(raw)); return cache; }
    } catch (e) { /* corrupted or unavailable — start fresh */ }
    return null;
  }

  function save() {
    if (!cache) return;
    try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) { /* storage unavailable */ }
  }

  const State = {
    exists() { return !!load(); },
    get() { return load(); },

    create(name, opts) {
      cache = blank(name);
      if (opts && opts.programmer) {
        cache.profile.programmer = true;
        cache.concepts['logic.props'] = { state: 'applied', attempts: 0, correct: 0, fastTracked: true, misconceptions: {} };
        cache.concepts['logic.demorgan'] = { state: 'discovered', attempts: 0, correct: 0, fastTracked: true, misconceptions: {} };
        migrate(cache); /* seeds review schedule for the fast-tracked applied node */
      }
      save();
      return cache;
    },

    wipe() { cache = null; try { localStorage.removeItem(KEY); } catch (e) {} },

    /* ---- concept records ---- */
    conceptRec(id) {
      const s = load();
      if (!s.concepts[id]) s.concepts[id] = { state: 'locked', attempts: 0, correct: 0, misconceptions: {} };
      return s.concepts[id];
    },

    nodeState(id) {
      const s = load();
      const rec = s.concepts[id];
      const stored = rec ? rec.state : 'locked';
      if (stored !== 'locked') return stored;
      return State.isUnlocked(id) ? 'available' : 'locked';
    },

    trackUnlocked(track) {
      if (!track || !track.live) return false;
      return !track.unlockedBy || State.isPowered(track.unlockedBy);
    },

    isUnlocked(id) {
      const node = window.NODES[id];
      if (!node) return false;
      const track = window.TRACKS.find(t => t.id === node.trackId);
      if (!State.trackUnlocked(track)) return false;
      if (node.boss) {
        return track.nodeIds.every(nid => State.rank(State.nodeState(nid)) >= State.rank('applied'));
      }
      const idx = track.nodeIds.indexOf(id);
      if (idx <= 0) return true;
      const prev = track.nodeIds[idx - 1];
      return State.rank(State.nodeState(prev)) >= State.rank('understood');
    },

    rank(st) { return STATES.indexOf(st); },

    completeLevel(nodeId, level, xpEarned, stats) {
      const s = load();
      const rec = State.conceptRec(nodeId);
      const target = level === 'l1' ? 'discovered' : level === 'l2' ? 'understood' : 'applied';
      if (level !== 'boss' && State.rank(target) > State.rank(rec.state === 'locked' ? 'available' : rec.state)) {
        rec.state = target;
        if (target === 'applied') {
          const now = Date.now();
          rec.intervalDays = 1; rec.lastReview = now; rec.nextReview = now + DAY; rec.retention = 0;
        }
      }
      s.xp += xpEarned;
      State.tickStreak();
      s.log.push({ ts: Date.now(), nodeId: nodeId, level: level, xp: xpEarned });
      save();
    },

    addXP(amount) {
      const s = load();
      s.xp += amount;
      State.tickStreak();
      save();
    },

    logMentor(nodeId, question) {
      const s = load();
      s.log.push({ ts: Date.now(), mentor: true, nodeId: nodeId || null, q: String(question).slice(0, 90) });
      if (s.log.length > 200) s.log = s.log.slice(-200);
      save();
    },

    recordAttempt(nodeId, correct, misTag) {
      const rec = State.conceptRec(nodeId);
      rec.attempts += 1;
      if (correct) rec.correct += 1;
      if (misTag) rec.misconceptions[misTag] = (rec.misconceptions[misTag] || 0) + 1;
      save();
    },

    /* ---- Elo ---- */
    rating(trackId) {
      const s = load();
      return (s.ratings[trackId] != null) ? s.ratings[trackId] : 1200;
    },
    setRatings(trackId, studentRating, questionId, itemRating) {
      const s = load();
      s.ratings[trackId] = studentRating;
      s.items[questionId] = itemRating;
      save();
    },

    /* ---- spaced repetition ---- */
    charge(id) {
      const rec = load().concepts[id];
      if (!rec || (rec.state !== 'applied' && rec.state !== 'mastered')) return null;
      if (!rec.nextReview) return 1;
      const total = rec.nextReview - rec.lastReview;
      if (total <= 0) return 0;
      return Math.max(0, Math.min(1, 1 - (Date.now() - rec.lastReview) / total));
    },

    isDue(id) {
      const rec = load().concepts[id];
      return !!(rec && (rec.state === 'applied' || rec.state === 'mastered') &&
        rec.nextReview && Date.now() >= rec.nextReview);
    },

    dueNodes() {
      const ids = [];
      window.TRACKS.forEach(t => {
        if (State.trackUnlocked(t)) t.nodeIds.forEach(id => { if (State.isDue(id)) ids.push(id); });
      });
      return ids;
    },

    applyReviewResult(id, success) {
      const rec = State.conceptRec(id);
      const now = Date.now();
      let mastered = false;
      if (success) {
        const idx = INTERVALS.indexOf(rec.intervalDays);
        rec.intervalDays = idx === -1 ? INTERVALS[0]
          : INTERVALS[Math.min(idx + 1, INTERVALS.length - 1)];
        rec.retention = (rec.retention || 0) + 1;
        if (rec.retention >= MASTERY_CHECKS && rec.state === 'applied') {
          rec.state = 'mastered';
          mastered = true;
        }
      } else {
        rec.intervalDays = 1; /* charge collapses gently: back to a short interval, nothing lost */
      }
      rec.lastReview = now;
      rec.nextReview = now + rec.intervalDays * DAY;
      save();
      return { mastered: mastered, intervalDays: rec.intervalDays, retention: rec.retention || 0 };
    },

    /* ---- streak / components / progress ---- */
    tickStreak() {
      const s = load();
      const today = todayStr();
      if (s.streak.lastBootDate === today) return;
      s.streak.current = (s.streak.lastBootDate === todayStr(-1)) ? s.streak.current + 1 : 1;
      s.streak.best = Math.max(s.streak.best, s.streak.current);
      s.streak.lastBootDate = today;
      save();
    },

    powerComponent(trackId) {
      const s = load();
      s.components[trackId] = { powered: true };
      save();
    },
    isPowered(trackId) {
      const s = load();
      return !!(s.components[trackId] && s.components[trackId].powered);
    },

    trackProgress(trackId) {
      const track = window.TRACKS.find(t => t.id === trackId);
      if (!track || !track.nodeIds.length) return 0;
      let pts = 0;
      track.nodeIds.forEach(id => {
        const st = State.nodeState(id);
        if (st === 'discovered') pts += 1 / 3;
        else if (st === 'understood') pts += 2 / 3;
        else if (st === 'applied' || st === 'mastered') pts += 1;
      });
      return pts / track.nodeIds.length;
    },

    topMisconceptions(limit) {
      const s = load();
      const tally = {};
      Object.keys(s.concepts).forEach(cid => {
        const m = s.concepts[cid].misconceptions || {};
        Object.keys(m).forEach(tag => { tally[tag] = (tally[tag] || 0) + m[tag]; });
      });
      return Object.keys(tally).map(tag => ({ tag: tag, count: tally[tag] }))
        .sort((a, b) => b.count - a.count).slice(0, limit || 3);
    },

    recommend() {
      for (const track of window.TRACKS) {
        if (!State.trackUnlocked(track)) continue;
        for (const id of track.nodeIds) {
          const st = State.nodeState(id);
          if (st === 'locked') continue;
          if (st !== 'applied' && st !== 'mastered') {
            return { id: id, level: st === 'available' ? 'l1' : st === 'discovered' ? 'l2' : 'l3' };
          }
        }
        if (!State.isPowered(track.id) && State.isUnlocked(track.bossId)) {
          return { id: track.bossId, level: 'boss' };
        }
      }
      return null;
    }
  };

  /* ---- backup & restore: everything except API keys ---- */
  const BACKUP_KEYS = [
    'mathlab.progress.v1', 'mathlab.notes.v1', 'mathlab.forge.v1',
    'mathlab.arabic.v1', 'mathlab.lang', 'mathlab.theme'
  ];

  State.exportBackup = function () {
    const data = { _mathlab: 1, exportedAt: new Date().toISOString() };
    BACKUP_KEYS.forEach(k => {
      try { const v = localStorage.getItem(k); if (v != null) data[k] = v; } catch (e) {}
    });
    const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mathlab-backup-' + todayStr() + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  State.importBackup = function (jsonText) {
    let data;
    try { data = JSON.parse(jsonText); } catch (e) { throw new Error('not a valid backup file'); }
    if (!data || data._mathlab !== 1) throw new Error('not a Math Lab backup file');
    let restored = 0;
    BACKUP_KEYS.forEach(k => {
      if (typeof data[k] === 'string') { try { localStorage.setItem(k, data[k]); restored += 1; } catch (e) {} }
    });
    if (!restored) throw new Error('backup file was empty');
    cache = null; /* force reload of progress from the restored data */
    return restored;
  };

  window.State = State;

  /* dev helper: simulate the passage of time (charge decay, streaks).
     usage in the console:  DEV.travel(3)  — three days pass, then reload. */
  window.DEV = {
    travel(days) {
      const s = load();
      if (!s) return 'no profile';
      const ms = days * DAY;
      Object.keys(s.concepts).forEach(id => {
        const r = s.concepts[id];
        if (r.lastReview) r.lastReview -= ms;
        if (r.nextReview) r.nextReview -= ms;
      });
      if (s.streak.lastBootDate) {
        const d = new Date(s.streak.lastBootDate + 'T12:00:00');
        d.setDate(d.getDate() - days);
        s.streak.lastBootDate = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      }
      save();
      return days + ' day(s) passed — refresh or navigate to see decay.';
    }
  };
})();
