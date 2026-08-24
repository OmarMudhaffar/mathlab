/* MATH LAB — interactive widgets (P4)
   Shared canvas core + per-track catalog. All colors pulled from CSS vars. */
(function () {

  /* ---------- shared helpers ---------- */
  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#888';
  }
  const PALETTE = () => ({
    ink: cssVar('--ink'), soft: cssVar('--ink-soft'), faint: cssVar('--ink-faint'),
    line: cssVar('--line-strong'), accent: cssVar('--accent'), power: cssVar('--power'),
    ok: cssVar('--ok'), bad: cssVar('--bad'),
    disc: cssVar('--t-disc'), lin: cssVar('--t-lin'), calc: cssVar('--t-calc'), prob: cssVar('--t-prob')
  });

  function mkCanvas(parent, w, h) {
    const dpr = window.devicePixelRatio || 1;
    const cv = document.createElement('canvas');
    cv.width = w * dpr; cv.height = h * dpr;
    cv.style.width = '100%'; cv.style.maxWidth = w + 'px'; cv.style.display = 'block';
    parent.appendChild(cv);
    const ctx = cv.getContext('2d');
    ctx.scale(dpr, dpr);
    return { cv, ctx, W: w, H: h };
  }

  function mapper(W, H, xmin, xmax, ymin, ymax, pad) {
    pad = pad || 26;
    const sx = (W - 2 * pad) / (xmax - xmin), sy = (H - 2 * pad) / (ymax - ymin);
    return {
      px: x => pad + (x - xmin) * sx,
      py: y => H - pad - (y - ymin) * sy,
      ix: px => xmin + (px - pad) / sx,
      iy: py => ymin + (H - pad - py) / sy
    };
  }

  function pointerPos(cv, e) {
    const r = cv.getBoundingClientRect();
    const scale = cv.clientWidth ? (parseFloat(cv.style.maxWidth) || cv.clientWidth) / cv.clientWidth : 1;
    return { x: (e.clientX - r.left) * scale, y: (e.clientY - r.top) * scale };
  }

  function arrow(ctx, x1, y1, x2, y2, color, width) {
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width || 2.5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const a = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(a - 0.4), y2 - 10 * Math.sin(a - 0.4));
    ctx.lineTo(x2 - 10 * Math.cos(a + 0.4), y2 - 10 * Math.sin(a + 0.4));
    ctx.closePath(); ctx.fill();
  }

  function shell(container, label, ctrlHtml) {
    container.innerHTML =
      '<div class="wshell">' +
        '<div class="wctrl"><span class="mono-label">' + label + '</span>' + (ctrlHtml || '') + '</div>' +
        '<div class="wbody"></div>' +
        '<p class="wstat"></p>' +
      '</div>';
    return {
      ctrl: container.querySelector('.wctrl'),
      body: container.querySelector('.wbody'),
      stat: container.querySelector('.wstat')
    };
  }

  /* ================= TRACK 1: truth lab (gate bench) ================= */
  const GATES = {
    AND: { arity: 2, sym: '∧', fn: (a, b) => a && b },
    OR:  { arity: 2, sym: '∨', fn: (a, b) => a || b },
    XOR: { arity: 2, sym: '⊕', fn: (a, b) => a !== b },
    NOT: { arity: 1, sym: '¬', fn: (a) => !a }
  };

  function truthlab(container) {
    let gate = 'AND', a = false, b = false;
    function tf(v) { return v ? '<span class="T">T</span>' : '<span class="F">F</span>'; }
    function render() {
      const g = GATES[gate];
      const out = g.arity === 1 ? g.fn(a) : g.fn(a, b);
      let rowsHtml = '';
      if (g.arity === 1) {
        [true, false].forEach(va => {
          rowsHtml += '<tr class="' + (va === a ? 'now' : '') + '"><td>' + tf(va) + '</td><td>' + tf(g.fn(va)) + '</td></tr>';
        });
      } else {
        [[true, true], [true, false], [false, true], [false, false]].forEach(([va, vb]) => {
          rowsHtml += '<tr class="' + (va === a && vb === b ? 'now' : '') + '"><td>' + tf(va) + '</td><td>' + tf(vb) + '</td><td>' + tf(g.fn(va, vb)) + '</td></tr>';
        });
      }
      const headHtml = g.arity === 1
        ? '<tr><th>p</th><th>¬p</th></tr>'
        : '<tr><th>p</th><th>q</th><th>p ' + g.sym + ' q</th></tr>';
      container.innerHTML =
        '<div class="truthlab">' +
          '<div class="tl-head"><span class="mono-label">Gate bench</span>' +
            '<select aria-label="Choose gate">' +
              Object.keys(GATES).map(k => '<option value="' + k + '"' + (k === gate ? ' selected' : '') + '>' + k + ' (' + GATES[k].sym + ')</option>').join('') +
            '</select></div>' +
          '<div class="tl-circuit">' +
            '<button type="button" class="tl-switch ' + (a ? 'on' : '') + '" data-sw="a"><span class="lever"></span>p ' + (a ? 'ON' : 'OFF') + '</button>' +
            (g.arity === 2 ? '<button type="button" class="tl-switch ' + (b ? 'on' : '') + '" data-sw="b"><span class="lever"></span>q ' + (b ? 'ON' : 'OFF') + '</button>' : '') +
            '<span class="tl-wire">──</span><span class="tl-gate">' + gate + '</span><span class="tl-wire">──</span>' +
            '<span class="tl-lamp ' + (out ? 'lit' : '') + '"></span>' +
          '</div>' +
          '<div class="tbl-scroll"><table class="tt">' + headHtml + rowsHtml + '</table></div>' +
        '</div>';
      container.querySelector('select').addEventListener('change', e => { gate = e.target.value; render(); });
      container.querySelectorAll('.tl-switch').forEach(btn => {
        btn.addEventListener('click', () => { if (btn.dataset.sw === 'a') a = !a; else b = !b; render(); });
      });
    }
    render();
  }

  /* ================= TRACK 3: vector lab ================= */
  function vectorlab(container) {
    const P = PALETTE();
    const s = shell(container, 'vector bench — drag the arrowheads');
    const { cv, ctx, W, H } = mkCanvas(s.body, 520, 360);
    const m = mapper(W, H, -1.5, 6.5, -1.5, 4.5);
    let u = { x: 2, y: 1 }, v = { x: 1, y: 2 }, drag = null;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = P.line; ctx.lineWidth = 1;
      for (let x = -1; x <= 6; x++) { ctx.beginPath(); ctx.moveTo(m.px(x), m.py(-1.5)); ctx.lineTo(m.px(x), m.py(4.5)); ctx.globalAlpha = x === 0 ? 0.8 : 0.25; ctx.stroke(); }
      for (let y = -1; y <= 4; y++) { ctx.beginPath(); ctx.moveTo(m.px(-1.5), m.py(y)); ctx.lineTo(m.px(6.5), m.py(y)); ctx.globalAlpha = y === 0 ? 0.8 : 0.25; ctx.stroke(); }
      ctx.globalAlpha = 1;
      const sum = { x: u.x + v.x, y: u.y + v.y };
      /* parallelogram */
      ctx.setLineDash([5, 5]); ctx.strokeStyle = P.faint; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(m.px(u.x), m.py(u.y)); ctx.lineTo(m.px(sum.x), m.py(sum.y)); ctx.lineTo(m.px(v.x), m.py(v.y)); ctx.stroke();
      ctx.setLineDash([]);
      arrow(ctx, m.px(0), m.py(0), m.px(u.x), m.py(u.y), P.accent);
      arrow(ctx, m.px(0), m.py(0), m.px(v.x), m.py(v.y), P.disc);
      arrow(ctx, m.px(0), m.py(0), m.px(sum.x), m.py(sum.y), P.power, 3);
      ctx.font = '13px IBM Plex Mono, monospace';
      ctx.fillStyle = P.accent; ctx.fillText('u', m.px(u.x) + 8, m.py(u.y) - 6);
      ctx.fillStyle = P.disc; ctx.fillText('v', m.px(v.x) + 8, m.py(v.y) - 6);
      ctx.fillStyle = P.power; ctx.fillText('u+v', m.px(sum.x) + 8, m.py(sum.y) - 6);
      s.stat.textContent = 'u = (' + u.x + ', ' + u.y + ')   v = (' + v.x + ', ' + v.y + ')   u+v = (' + sum.x + ', ' + sum.y + ') — the diagonal of the parallelogram';
    }
    function near(p, w) { const dx = m.px(w.x) - p.x, dy = m.py(w.y) - p.y; return dx * dx + dy * dy < 300; }
    cv.addEventListener('pointerdown', e => {
      const p = pointerPos(cv, e);
      drag = near(p, u) ? u : near(p, v) ? v : null;
      if (drag) cv.setPointerCapture(e.pointerId);
    });
    cv.addEventListener('pointermove', e => {
      if (!drag) return;
      const p = pointerPos(cv, e);
      drag.x = Math.round(m.ix(p.x) * 2) / 2; drag.y = Math.round(m.iy(p.y) * 2) / 2;
      draw();
    });
    cv.addEventListener('pointerup', () => { drag = null; });
    draw();
  }

  /* ================= TRACK 3: matrix playground ================= */
  function matrixlab(container) {
    const P = PALETTE();
    const s = shell(container, 'matrix playground — drag î and ĵ, the plane follows',
      '<button data-m="1,0,0,1">identity</button>' +
      '<button data-m="0.71,0.71,-0.71,0.71">rotate 45°</button>' +
      '<button data-m="2,0,0,2">scale ×2</button>' +
      '<button data-m="1,0,1,1">shear</button>' +
      '<button data-m="-1,0,0,1">reflect</button>');
    const { cv, ctx, W, H } = mkCanvas(s.body, 520, 420);
    const m = mapper(W, H, -4, 4, -3.2, 3.2);
    let I = { x: 1, y: 0 }, J = { x: 0, y: 1 }, drag = null;

    function T(x, y) { return { x: x * I.x + y * J.x, y: x * I.y + y * J.y }; }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      /* static faint grid */
      ctx.lineWidth = 1; ctx.strokeStyle = P.line; ctx.globalAlpha = 0.18;
      for (let x = -4; x <= 4; x++) { ctx.beginPath(); ctx.moveTo(m.px(x), 0); ctx.lineTo(m.px(x), H); ctx.stroke(); }
      for (let y = -3; y <= 3; y++) { ctx.beginPath(); ctx.moveTo(0, m.py(y)); ctx.lineTo(W, m.py(y)); ctx.stroke(); }
      /* transformed grid */
      ctx.globalAlpha = 0.55; ctx.strokeStyle = P.lin;
      for (let c = -4; c <= 4; c++) {
        ctx.beginPath();
        for (let t = -4; t <= 4; t += 0.25) { const p = T(c, t); const px = m.px(p.x), py = m.py(p.y); t === -4 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }
        ctx.stroke();
        ctx.beginPath();
        for (let t = -4; t <= 4; t += 0.25) { const p = T(t, c); const px = m.px(p.x), py = m.py(p.y); t === -4 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      /* unit square image */
      const sq = [T(0, 0), T(1, 0), T(1, 1), T(0, 1)];
      ctx.fillStyle = P.power; ctx.globalAlpha = 0.18;
      ctx.beginPath(); sq.forEach((p, i) => i ? ctx.lineTo(m.px(p.x), m.py(p.y)) : ctx.moveTo(m.px(p.x), m.py(p.y))); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1;
      arrow(ctx, m.px(0), m.py(0), m.px(I.x), m.py(I.y), P.power, 3);
      arrow(ctx, m.px(0), m.py(0), m.px(J.x), m.py(J.y), P.disc, 3);
      ctx.font = '13px IBM Plex Mono, monospace';
      ctx.fillStyle = P.power; ctx.fillText('î', m.px(I.x) + 8, m.py(I.y) - 6);
      ctx.fillStyle = P.disc; ctx.fillText('ĵ', m.px(J.x) + 8, m.py(J.y) - 6);
      const det = I.x * J.y - J.x * I.y;
      s.stat.innerHTML = 'A = [ ' + I.x.toFixed(2) + '  ' + J.x.toFixed(2) + ' ; ' + I.y.toFixed(2) + '  ' + J.y.toFixed(2) + ' ]' +
        '   det = <b style="color:' + (Math.abs(det) < 0.05 ? P.bad : P.power) + '">' + det.toFixed(2) + '</b>' +
        (Math.abs(det) < 0.05 ? ' — the plane collapsed! (singular)' : det < 0 ? ' — orientation flipped' : ' — area scale factor');
    }
    function near(p, w) { const dx = m.px(w.x) - p.x, dy = m.py(w.y) - p.y; return dx * dx + dy * dy < 300; }
    cv.addEventListener('pointerdown', e => {
      const p = pointerPos(cv, e);
      drag = near(p, I) ? I : near(p, J) ? J : null;
      if (drag) cv.setPointerCapture(e.pointerId);
    });
    cv.addEventListener('pointermove', e => {
      if (!drag) return;
      const p = pointerPos(cv, e);
      drag.x = Math.round(m.ix(p.x) * 4) / 4; drag.y = Math.round(m.iy(p.y) * 4) / 4;
      draw();
    });
    cv.addEventListener('pointerup', () => { drag = null; });
    s.ctrl.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const v = b.dataset.m.split(',').map(Number);
      I = { x: v[0], y: v[1] }; J = { x: v[2], y: v[3] }; draw();
    }));
    draw();
  }

  /* ================= TRACK 2: graph sandbox ================= */
  function graphlab(container) {
    const P = PALETTE();
    const s = shell(container, 'graph sandbox — drag nodes · click two nodes to toggle an edge',
      '<button data-run="bfs">BFS from A</button><button data-run="dfs">DFS from A</button><button data-run="reset">reset</button>');
    const { cv, ctx, W, H } = mkCanvas(s.body, 520, 330);
    const nodes = 'ABCDEF'.split('').map((id, i) => ({
      id, x: 90 + (i % 3) * 170, y: 80 + Math.floor(i / 3) * 160
    }));
    let edges = [['A','B'],['A','C'],['B','D'],['C','D'],['D','E'],['E','F']];
    let drag = null, pendingEdge = null, order = [], shown = 0, mode = null, moved = false;

    function adj(id) {
      return edges.filter(e => e.includes(id)).map(e => e[0] === id ? e[1] : e[0]).sort();
    }
    function runBFS() {
      const seen = ['A'], queue = ['A'], out = [];
      while (queue.length) { const cur = queue.shift(); out.push(cur); adj(cur).forEach(nb => { if (!seen.includes(nb)) { seen.push(nb); queue.push(nb); } }); }
      return out;
    }
    function runDFS() {
      const seen = [], out = [];
      (function go(id) { if (seen.includes(id)) return; seen.push(id); out.push(id); adj(id).forEach(go); })('A');
      return out;
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1.6;
      edges.forEach(e => {
        const a = nodes.find(n => n.id === e[0]), b = nodes.find(n => n.id === e[1]);
        const litA = order.slice(0, shown).includes(e[0]), litB = order.slice(0, shown).includes(e[1]);
        ctx.strokeStyle = (litA && litB) ? P.power : P.line;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });
      nodes.forEach(n => {
        const visitIdx = order.slice(0, shown).indexOf(n.id);
        const lit = visitIdx >= 0;
        ctx.beginPath(); ctx.arc(n.x, n.y, 18, 0, 7);
        ctx.fillStyle = lit ? P.power : (pendingEdge === n.id ? P.accent : cssVar('--surface-2'));
        ctx.fill();
        ctx.strokeStyle = lit ? P.power : P.accent; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = lit ? '#111' : P.ink;
        ctx.font = 'bold 13px IBM Plex Mono, monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(n.id, n.x, n.y);
        if (lit) { ctx.fillStyle = P.soft; ctx.font = '10px IBM Plex Mono, monospace'; ctx.fillText(String(visitIdx + 1), n.x, n.y - 27); }
      });
      const visitTxt = mode ? mode.toUpperCase() + ' order: ' + order.slice(0, shown).join(' → ') + (shown < order.length ? '  (click ' + mode.toUpperCase() + ' again to step)' : '  ✓ done') : '';
      s.stat.textContent = visitTxt || ('|V| = 6   |E| = ' + edges.length + '   Σdeg = ' + 2 * edges.length + ' (handshake: always 2|E|)');
    }
    function hit(p) { return nodes.find(n => (n.x - p.x) ** 2 + (n.y - p.y) ** 2 < 400); }
    cv.addEventListener('pointerdown', e => {
      const n = hit(pointerPos(cv, e));
      if (n) { drag = n; moved = false; cv.setPointerCapture(e.pointerId); }
    });
    cv.addEventListener('pointermove', e => {
      if (!drag) return;
      const p = pointerPos(cv, e);
      if (Math.abs(p.x - drag.x) > 4 || Math.abs(p.y - drag.y) > 4) moved = true;
      drag.x = Math.max(24, Math.min(W - 24, p.x)); drag.y = Math.max(24, Math.min(H - 24, p.y));
      draw();
    });
    cv.addEventListener('pointerup', () => {
      if (drag && !moved) {
        if (pendingEdge && pendingEdge !== drag.id) {
          const key = [pendingEdge, drag.id].sort();
          const idx = edges.findIndex(e => e[0] === key[0] && e[1] === key[1]);
          if (idx >= 0) edges.splice(idx, 1); else edges.push(key);
          pendingEdge = null; mode = null; order = []; shown = 0;
        } else pendingEdge = (pendingEdge === drag.id) ? null : drag.id;
      }
      drag = null; draw();
    });
    s.ctrl.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const r = b.dataset.run;
      if (r === 'reset') { mode = null; order = []; shown = 0; }
      else if (mode === r && shown < order.length) shown += 1;
      else { mode = r; order = r === 'bfs' ? runBFS() : runDFS(); shown = 1; }
      pendingEdge = null; draw();
    }));
    draw();
  }

  /* ================= TRACK 2: big-O race ================= */
  function bigorace(container) {
    const P = PALETTE();
    const s = shell(container, 'the big-O race — slide n and watch who explodes',
      '<input type="range" min="4" max="60" value="16" id="bo-n"><span class="wval" id="bo-nv">n = 16</span>');
    const { ctx, W, H } = mkCanvas(s.body, 520, 320);
    const fns = [
      { f: n => Math.log2(n), label: 'log n', color: P.ok },
      { f: n => n, label: 'n', color: P.accent },
      { f: n => n * Math.log2(n), label: 'n log n', color: P.disc },
      { f: n => n * n, label: 'n²', color: P.lin },
      { f: n => Math.pow(2, n), label: '2ⁿ', color: P.bad }
    ];
    function draw(N) {
      ctx.clearRect(0, 0, W, H);
      const ymax = N * N * 1.15;
      const m = mapper(W, H, 0, N, 0, ymax);
      ctx.strokeStyle = P.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(m.px(0), m.py(0)); ctx.lineTo(m.px(N), m.py(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(m.px(0), m.py(0)); ctx.lineTo(m.px(0), m.py(ymax)); ctx.stroke();
      fns.forEach(fn => {
        ctx.strokeStyle = fn.color; ctx.lineWidth = 2.2; ctx.beginPath();
        let started = false, clipped = false;
        for (let n = 1; n <= N; n += 0.25) {
          const y = fn.f(n);
          if (y > ymax) { clipped = true; break; }
          started ? ctx.lineTo(m.px(n), m.py(y)) : ctx.moveTo(m.px(n), m.py(y)); started = true;
        }
        ctx.stroke();
        ctx.font = '12px IBM Plex Mono, monospace'; ctx.fillStyle = fn.color; ctx.textAlign = 'left';
        const lastN = clipped ? null : N;
        if (lastN) ctx.fillText(fn.label, m.px(lastN) - 48, m.py(fn.f(lastN)) - 6);
        else ctx.fillText(fn.label + ' ↑ off the chart', 60, 30 + fns.indexOf(fn) * 16);
      });
      const ops = fns.map(fn => fn.label + ': ' + (fn.f(N) > 1e9 ? '≈' + fn.f(N).toExponential(1) : Math.round(fn.f(N)).toLocaleString()));
      s.stat.textContent = 'operations at n = ' + N + ' → ' + ops.join('   ');
    }
    const slider = s.ctrl.querySelector('#bo-n'), val = s.ctrl.querySelector('#bo-nv');
    slider.addEventListener('input', () => { val.textContent = 'n = ' + slider.value; draw(Number(slider.value)); });
    draw(16);
  }

  /* ================= TRACK 4: growth lab ================= */
  function growthlab(container) {
    const P = PALETTE();
    const s = shell(container, 'growth lab — exponential vs polynomial vs log',
      '<label class="wcheck"><input type="checkbox" id="gl-log"> log-scale y</label>');
    const { ctx, W, H } = mkCanvas(s.body, 520, 320);
    const fns = [
      { f: x => Math.pow(2, x), label: '2ˣ', color: P.power },
      { f: x => x * x, label: 'x²', color: P.lin },
      { f: x => Math.log2(x), label: 'log₂x', color: P.ok }
    ];
    function draw(logY) {
      ctx.clearRect(0, 0, W, H);
      const xmax = 20;
      const ymax = logY ? Math.log10(Math.pow(2, xmax)) : 420;
      const ymin = logY ? -1 : -8;
      const m = mapper(W, H, 0, xmax, ymin, ymax);
      ctx.strokeStyle = P.line;
      ctx.beginPath(); ctx.moveTo(m.px(0), m.py(0)); ctx.lineTo(m.px(xmax), m.py(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(m.px(0), m.py(ymin)); ctx.lineTo(m.px(0), m.py(ymax)); ctx.stroke();
      fns.forEach(fn => {
        ctx.strokeStyle = fn.color; ctx.lineWidth = 2.2; ctx.beginPath();
        let started = false;
        for (let x = 0.15; x <= xmax; x += 0.1) {
          let y = fn.f(x);
          if (logY) { if (y <= 0) continue; y = Math.log10(y); }
          if (y > ymax) break;
          started ? ctx.lineTo(m.px(x), m.py(y)) : ctx.moveTo(m.px(x), m.py(y)); started = true;
        }
        ctx.stroke();
      });
      ctx.font = '12px IBM Plex Mono, monospace';
      fns.forEach((fn, i) => { ctx.fillStyle = fn.color; ctx.fillText(fn.label, 50 + i * 70, 24); });
      s.stat.textContent = logY
        ? 'log scale: 2ˣ becomes a straight line — exponentials are linear in log-space. That is why algorithm plots use log axes.'
        : 'linear scale: 2ˣ leaves everything behind by x ≈ 9. Toggle log-scale to tame it.';
    }
    s.ctrl.querySelector('#gl-log').addEventListener('change', e => draw(e.target.checked));
    draw(false);
  }

  /* ================= TRACK 4: tangent tracer ================= */
  function tangent(container) {
    const P = PALETTE();
    const s = shell(container, 'tangent tracer — f(x) = x² · shrink h and watch the secant become the tangent',
      '<input type="range" min="-20" max="20" value="10" id="tg-x"><span class="wval" id="tg-xv">x₀ = 1.0</span>' +
      '<input type="range" min="1" max="100" value="80" id="tg-h"><span class="wval" id="tg-hv">h = 1.60</span>');
    const { ctx, W, H } = mkCanvas(s.body, 520, 320);
    const m = mapper(W, H, -3.4, 3.4, -1.5, 9.5);
    function f(x) { return x * x; }
    function draw(x0, h) {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = P.line;
      ctx.beginPath(); ctx.moveTo(m.px(-3.4), m.py(0)); ctx.lineTo(m.px(3.4), m.py(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(m.px(0), m.py(-1.5)); ctx.lineTo(m.px(0), m.py(9.5)); ctx.stroke();
      ctx.strokeStyle = P.accent; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let x = -3.2; x <= 3.2; x += 0.05) { x === -3.2 ? ctx.moveTo(m.px(x), m.py(f(x))) : ctx.lineTo(m.px(x), m.py(f(x))); }
      ctx.stroke();
      /* true tangent (dashed) */
      const slopeT = 2 * x0;
      ctx.setLineDash([5, 5]); ctx.strokeStyle = P.faint; ctx.lineWidth = 1.6; ctx.beginPath();
      ctx.moveTo(m.px(x0 - 2.4), m.py(f(x0) - slopeT * 2.4)); ctx.lineTo(m.px(x0 + 2.4), m.py(f(x0) + slopeT * 2.4)); ctx.stroke();
      ctx.setLineDash([]);
      /* secant */
      const slopeS = (f(x0 + h) - f(x0)) / h;
      ctx.strokeStyle = P.power; ctx.lineWidth = 2.2; ctx.beginPath();
      ctx.moveTo(m.px(x0 - 2.4), m.py(f(x0) - slopeS * 2.4)); ctx.lineTo(m.px(x0 + 2.4), m.py(f(x0) + slopeS * 2.4)); ctx.stroke();
      [x0, x0 + h].forEach(x => {
        ctx.beginPath(); ctx.arc(m.px(x), m.py(f(x)), 5, 0, 7); ctx.fillStyle = P.power; ctx.fill();
      });
      s.stat.innerHTML = 'secant slope = (f(x₀+h) − f(x₀)) / h = <b style="color:' + P.power + '">' + slopeS.toFixed(3) + '</b>' +
        '   →   true derivative 2x₀ = <b>' + slopeT.toFixed(2) + '</b>' +
        (h <= 0.05 ? '   — the secant has all but merged with the tangent ✓' : '');
    }
    const xs = s.ctrl.querySelector('#tg-x'), hs = s.ctrl.querySelector('#tg-h');
    const xv = s.ctrl.querySelector('#tg-xv'), hv = s.ctrl.querySelector('#tg-hv');
    function upd() {
      const x0 = Number(xs.value) / 10;
      const h = Math.max(0.01, Math.pow(Number(hs.value) / 100, 2) * 2.5);
      xv.textContent = 'x₀ = ' + x0.toFixed(1); hv.textContent = 'h = ' + h.toFixed(2);
      draw(x0, h);
    }
    xs.addEventListener('input', upd); hs.addEventListener('input', upd);
    upd();
  }

  /* ================= TRACK 4: gradient descent simulator ================= */
  function descent(container) {
    const P = PALETTE();
    const s = shell(container, 'descent simulator — f(x) = x², update: x ← x − α·2x',
      '<input type="range" min="1" max="120" value="15" id="gd-a"><span class="wval" id="gd-av">α = 0.15</span>' +
      '<button id="gd-step">STEP</button><button id="gd-run">RUN ×10</button><button id="gd-reset">reset</button>');
    const { ctx, W, H } = mkCanvas(s.body, 520, 300);
    const m = mapper(W, H, -4.2, 4.2, -1.5, 11);
    let x = 3.5, steps = 0, trail = [3.5];

    function f(v) { return v * v; }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = P.line;
      ctx.beginPath(); ctx.moveTo(m.px(-4.2), m.py(0)); ctx.lineTo(m.px(4.2), m.py(0)); ctx.stroke();
      ctx.strokeStyle = P.accent; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let v = -3.4; v <= 3.4; v += 0.05) { v === -3.4 ? ctx.moveTo(m.px(v), m.py(f(v))) : ctx.lineTo(m.px(v), m.py(f(v))); }
      ctx.stroke(); ctx.lineWidth = 1;
      /* trail */
      trail.forEach((t, i) => {
        ctx.beginPath(); ctx.arc(m.px(t), m.py(f(t)), 4, 0, 7);
        ctx.fillStyle = P.faint; ctx.globalAlpha = 0.25 + 0.5 * (i / trail.length); ctx.fill();
      });
      ctx.globalAlpha = 1;
      /* ball */
      ctx.beginPath(); ctx.arc(m.px(x), m.py(f(x)), 8, 0, 7);
      ctx.fillStyle = P.power; ctx.fill();
      const g = 2 * x;
      s.stat.innerHTML = 'step ' + steps + ':  x = <b>' + x.toFixed(4) + '</b>   slope f′ = ' + g.toFixed(3) +
        (Math.abs(x) > 4.5 ? '  — <b style="color:' + P.bad + '">diverging! α too big</b>'
          : Math.abs(g) < 0.01 ? '  — <b style="color:' + P.ok + '">flat: arrived ✓</b>' : '');
    }
    function alpha() { return Number(s.ctrl.querySelector('#gd-a').value) / 100; }
    function step() {
      x = x - alpha() * 2 * x;
      x = Math.max(-1e6, Math.min(1e6, x));
      steps += 1; trail.push(Math.max(-4.2, Math.min(4.2, x)));
      if (trail.length > 40) trail.shift();
      draw();
    }
    s.ctrl.querySelector('#gd-a').addEventListener('input', () => {
      s.ctrl.querySelector('#gd-av').textContent = 'α = ' + alpha().toFixed(2);
    });
    s.ctrl.querySelector('#gd-step').addEventListener('click', step);
    s.ctrl.querySelector('#gd-run').addEventListener('click', () => { for (let i = 0; i < 10; i++) step(); });
    s.ctrl.querySelector('#gd-reset').addEventListener('click', () => { x = 3.5; steps = 0; trail = [3.5]; draw(); });
    draw();
  }

  /* ================= TRACK 4: riemann stacker ================= */
  function riemann(container) {
    const P = PALETTE();
    const s = shell(container, 'riemann stacker — area under x² on [0, 2]',
      '<input type="range" min="1" max="60" value="6" id="rm-n"><span class="wval" id="rm-nv">n = 6</span>');
    const { ctx, W, H } = mkCanvas(s.body, 520, 300);
    const m = mapper(W, H, -0.3, 2.4, -0.5, 4.4);
    function f(x) { return x * x; }
    function draw(n) {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = P.line;
      ctx.beginPath(); ctx.moveTo(m.px(-0.3), m.py(0)); ctx.lineTo(m.px(2.4), m.py(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(m.px(0), m.py(-0.5)); ctx.lineTo(m.px(0), m.py(4.4)); ctx.stroke();
      const w = 2 / n; let sum = 0;
      for (let i = 0; i < n; i++) {
        const x = i * w, y = f(x); sum += y * w;
        ctx.fillStyle = P.calc; ctx.globalAlpha = 0.4;
        ctx.fillRect(m.px(x), m.py(y), m.px(x + w) - m.px(x), m.py(0) - m.py(y));
        ctx.globalAlpha = 1; ctx.strokeStyle = P.calc;
        ctx.strokeRect(m.px(x), m.py(y), m.px(x + w) - m.px(x), m.py(0) - m.py(y));
      }
      ctx.strokeStyle = P.accent; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let x = 0; x <= 2.2; x += 0.02) { x === 0 ? ctx.moveTo(m.px(x), m.py(f(x))) : ctx.lineTo(m.px(x), m.py(f(x))); }
      ctx.stroke(); ctx.lineWidth = 1;
      const exact = 8 / 3;
      s.stat.innerHTML = 'left sum (' + n + ' rectangles) = <b style="color:' + P.power + '">' + sum.toFixed(4) + '</b>' +
        '   →   exact ∫₀² x² dx = 8/3 ≈ ' + exact.toFixed(4) +
        '   gap: ' + (exact - sum).toFixed(4);
    }
    const sl = s.ctrl.querySelector('#rm-n'), nv = s.ctrl.querySelector('#rm-nv');
    sl.addEventListener('input', () => { nv.textContent = 'n = ' + sl.value; draw(Number(sl.value)); });
    draw(6);
  }

  /* ================= TRACK 2: euclid step-tracer ================= */
  function eucstep(container) {
    const s = shell(container, 'euclid step-tracer — gcd by repeated remainder',
      '<input type="number" id="eu-a" value="48" min="1" max="9999"><input type="number" id="eu-b" value="18" min="1" max="9999"><button id="eu-go">TRACE</button>');
    function run() {
      let a = Math.abs(Number(container.querySelector('#eu-a').value)) || 48;
      let b = Math.abs(Number(container.querySelector('#eu-b').value)) || 18;
      if (b > a) { const t = a; a = b; b = t; }
      let rows = '', steps = 0;
      while (b > 0 && steps < 30) {
        const q = Math.floor(a / b), r = a % b;
        rows += '<tr' + (r === 0 ? ' class="now"' : '') + '><td>' + a + '</td><td>= ' + q + ' × ' + b + ' + <b>' + r + '</b></td></tr>';
        a = b; b = r; steps += 1;
      }
      s.body.innerHTML = '<div class="tbl-scroll"><table class="tt"><tr><th>a</th><th>a = q·b + r</th></tr>' + rows + '</table></div>';
      s.stat.textContent = 'gcd = ' + a + ' — the last non-zero remainder. ' + steps + ' steps; each remainder < half of two steps ago, so Euclid is O(log n).';
    }
    container.querySelector('#eu-go').addEventListener('click', run);
    run();
  }

  /* ================= TRACK 2: pascal explorer ================= */
  function pascal(container) {
    const s = shell(container, 'pascal explorer — every cell is C(n, k), every cell is the sum of its two parents');
    let html = '<div class="pascal">';
    const rows = 9;
    let prev = [1];
    for (let n = 0; n < rows; n++) {
      const row = [];
      for (let k = 0; k <= n; k++) {
        row.push(k === 0 || k === n ? 1 : prev[k - 1] + prev[k]);
      }
      html += '<div class="p-row">' + row.map((v, k) =>
        '<span class="p-cell" title="C(' + n + ',' + k + ') = ' + v + '">' + v + '</span>').join('') + '</div>';
      prev = row;
    }
    html += '</div>';
    s.body.innerHTML = html;
    s.stat.textContent = 'hover a cell for its C(n,k). Row n sums to 2ⁿ — the power set count, again.';
  }

  /* ================= TRACK 5: dice lab ================= */
  function dicelab(container) {
    const P = PALETTE();
    const s = shell(container, 'dice lab — two dice, sum tallies vs theory',
      '<button data-n="100">roll ×100</button><button data-n="1000">roll ×1000</button><button data-n="0">reset</button>');
    const { ctx, W, H } = mkCanvas(s.body, 520, 260);
    let counts = new Array(13).fill(0), total = 0;
    const theory = [0,0,1,2,3,4,5,6,5,4,3,2,1].map(v => v / 36);
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const m = mapper(W, H, 1.4, 12.6, 0, 0.24);
      for (let sVal = 2; sVal <= 12; sVal++) {
        const p = total ? counts[sVal] / total : 0;
        const x = m.px(sVal) - 16;
        ctx.fillStyle = P.prob; ctx.globalAlpha = 0.55;
        ctx.fillRect(x, m.py(p), 32, m.py(0) - m.py(p));
        ctx.globalAlpha = 1;
        /* theory marker */
        ctx.strokeStyle = P.power; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x, m.py(theory[sVal])); ctx.lineTo(x + 32, m.py(theory[sVal])); ctx.stroke();
        ctx.fillStyle = P.soft; ctx.font = '11px IBM Plex Mono, monospace'; ctx.textAlign = 'center';
        ctx.fillText(String(sVal), m.px(sVal), H - 8);
      }
      s.stat.textContent = total
        ? total + ' rolls — bars are your data, amber lines are theory (7 peaks at 6/36). More rolls → bars hug the lines: the law of large numbers, live.'
        : 'roll to begin — which sum should dominate, and why? (count the ways to make each)';
    }
    s.ctrl.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const n = Number(b.dataset.n);
      if (!n) { counts = new Array(13).fill(0); total = 0; }
      else for (let i = 0; i < n; i++) {
        const sVal = (1 + Math.floor(Math.random() * 6)) + (1 + Math.floor(Math.random() * 6));
        counts[sVal] += 1; total += 1;
      }
      draw();
    }));
    draw();
  }

  /* ================= TRACK 5: monte carlo π ================= */
  function montecarlo(container) {
    const P = PALETTE();
    const s = shell(container, 'monte carlo π — throw darts at a square, count the circle',
      '<button data-n="500">throw ×500</button><button data-n="5000">throw ×5000</button><button data-n="0">reset</button>');
    const { cv, ctx, W, H } = mkCanvas(s.body, 300, 300);
    cv.style.maxWidth = '300px';
    let inC = 0, total = 0;
    function frame() {
      ctx.strokeStyle = P.line; ctx.strokeRect(10, 10, 280, 280);
      ctx.beginPath(); ctx.arc(150, 150, 140, 0, 7); ctx.strokeStyle = P.accent; ctx.stroke();
    }
    function throwN(n) {
      for (let i = 0; i < n; i++) {
        const x = Math.random() * 2 - 1, y = Math.random() * 2 - 1;
        const inside = x * x + y * y <= 1;
        if (inside) inC += 1;
        total += 1;
        ctx.fillStyle = inside ? P.ok : P.bad; ctx.globalAlpha = 0.6;
        ctx.fillRect(150 + x * 140 - 1, 150 + y * 140 - 1, 2, 2);
      }
      ctx.globalAlpha = 1;
      const est = total ? (4 * inC / total) : 0;
      s.stat.innerHTML = total
        ? total.toLocaleString() + ' darts — π ≈ 4 · (in/total) = <b style="color:' + P.power + '">' + est.toFixed(4) + '</b> (true: 3.14159…). Error shrinks like 1/√n — slow but unstoppable.'
        : 'circle area / square area = π/4 — so darts estimate π. Throw!';
    }
    s.ctrl.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const n = Number(b.dataset.n);
      if (!n) { inC = 0; total = 0; ctx.clearRect(0, 0, W, H); frame(); throwN(0); }
      else throwN(n);
    }));
    frame(); throwN(0);
  }

  window.Widgets = {
    mount(name, container) {
      const reg = {
        truthlab, vectorlab, matrixlab, graphlab, bigorace,
        growthlab, tangent, riemann, descent, eucstep, pascal, dicelab, montecarlo
      };
      if (reg[name]) reg[name](container);
    }
  };
})();
