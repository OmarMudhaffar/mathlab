/* MATH LAB — equation generators (مولّد المعادلات)
   Each family generates unlimited fresh exercises with:
   prompt · accepted answers · step-by-step solution · code version · where-used note. */
(function () {

  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const TF = b => (b ? 'T' : 'F');
  const gcd2 = (a, b) => (b === 0 ? a : gcd2(b, a % b));
  function frac(n, d) { const g = gcd2(n, d); return (n / g) + '/' + (d / g); }

  window.GENERATORS = [

    /* ================= TRACK 1 · LOGIC ================= */
    {
      id: 'logic-eval', nodeId: 'logic.props', trackId: 'logic',
      title: 'Evaluate a proposition', titleAr: 'احسب قيمة قضية',
      gen() {
        const p = Math.random() < 0.5, q = Math.random() < 0.5, r = Math.random() < 0.5;
        const t = pick([
          { txt: '¬(p ∧ q) ∨ r', fn: () => !(p && q) || r, js: '!(p && q) || r',
            steps: () => ['p ∧ q = ' + TF(p && q), '¬(p ∧ q) = ' + TF(!(p && q)), TF(!(p && q)) + ' ∨ r = ' + TF(!(p && q) || r)] },
          { txt: '(p ∨ q) ∧ ¬r', fn: () => (p || q) && !r, js: '(p || q) && !r',
            steps: () => ['p ∨ q = ' + TF(p || q), '¬r = ' + TF(!r), TF(p || q) + ' ∧ ' + TF(!r) + ' = ' + TF((p || q) && !r)] },
          { txt: '¬p ∨ (q ∧ r)', fn: () => !p || (q && r), js: '!p || (q && r)',
            steps: () => ['¬p = ' + TF(!p), 'q ∧ r = ' + TF(q && r), TF(!p) + ' ∨ ' + TF(q && r) + ' = ' + TF(!p || (q && r))] },
          { txt: '(p ⊕ q) ∧ (q ∨ r)', fn: () => (p !== q) && (q || r), js: '(p !== q) && (q || r)',
            steps: () => ['p ⊕ q = ' + TF(p !== q) + ' (exactly one true?)', 'q ∨ r = ' + TF(q || r), TF(p !== q) + ' ∧ ' + TF(q || r) + ' = ' + TF((p !== q) && (q || r))] }
        ]);
        const val = t.fn();
        return {
          prompt: 'p = <b>' + TF(p) + '</b>, q = <b>' + TF(q) + '</b>, r = <b>' + TF(r) + '</b>.<br>Evaluate: <code>' + t.txt + '</code> — answer T or F.',
          accept: [TF(val), val ? 'true' : 'false'],
          steps: ['Substitute the values: p = ' + TF(p) + ', q = ' + TF(q) + ', r = ' + TF(r)].concat(t.steps()).concat(['Answer: ' + TF(val)]),
          code: 'const p = ' + p + ', q = ' + q + ', r = ' + r + ';\nconst result = ' + t.js + ';   // ' + val,
          usage: 'This is exactly how every if-condition in code is evaluated — inner parts first, outward. Debugging a wrong if means redoing these steps.'
        };
      }
    },
    {
      id: 'truthtable-rows', nodeId: 'logic.props', trackId: 'logic',
      title: 'Truth table size', titleAr: 'حجم جدول الصدق',
      gen() {
        const n = ri(3, 8);
        return {
          prompt: 'A compound proposition uses <b>' + n + '</b> variables. How many rows does its full truth table need?',
          accept: [String(1 << n)], value: 1 << n, tol: 0,
          steps: ['Each variable has 2 possible values (T / F)', 'Each new variable DOUBLES the number of combinations (product rule)', 'Rows = 2^' + n + ' = ' + (1 << n)],
          code: 'const rows = 2 ** ' + n + ';        // ' + (1 << n) + '\n// or with bits:  1 << ' + n,
          usage: 'This 2ⁿ growth is why testing every input combination becomes impossible fast — and why SAT solvers exist.'
        };
      }
    },
    {
      id: 'powerset-count', nodeId: 'logic.sets', trackId: 'logic',
      title: 'Count the subsets', titleAr: 'عدد المجموعات الجزئية',
      gen() {
        const n = ri(3, 9);
        return {
          prompt: 'A set has <b>' + n + '</b> elements. How many subsets does it have (including ∅ and the set itself)?',
          accept: [String(1 << n)], value: 1 << n, tol: 0,
          steps: ['Each element makes one independent choice: IN or OUT', n + ' elements → 2 × 2 × … (' + n + ' times)', '|P(S)| = 2^' + n + ' = ' + (1 << n)],
          code: '// every mask 0..' + ((1 << n) - 1) + ' is one subset of ' + n + ' flags:\nfor (let mask = 0; mask < (1 << ' + n + '); mask++) { /* one subset */ }',
          usage: 'Feature-flag configurations, bitmask states, test-case explosion — all powers of two from this formula.'
        };
      }
    },

    /* ================= TRACK 2 · DISCRETE ================= */
    {
      id: 'product-rule', nodeId: 'disc.counting', trackId: 'discrete',
      title: 'Product rule count', titleAr: 'قاعدة الضرب',
      gen() {
        const a = ri(2, 6), b = ri(2, 6), c = ri(2, 4);
        const items = pick([['shirts', 'pants', 'pairs of shoes'], ['browsers', 'OS versions', 'languages'], ['starters', 'mains', 'desserts']]);
        const total = a * b * c;
        return {
          prompt: 'You have <b>' + a + ' ' + items[0] + '</b>, <b>' + b + ' ' + items[1] + '</b>, and <b>' + c + ' ' + items[2] + '</b>. How many complete combinations?',
          accept: [String(total)], value: total, tol: 0,
          steps: ['Three independent choices in sequence — the product rule (قاعدة الضرب)', 'Total = ' + a + ' × ' + b + ' × ' + c, '= ' + (a * b) + ' × ' + c + ' = ' + total],
          code: 'let count = 0;\nfor (const x of A)        // ×' + a + '\n  for (const y of B)      // ×' + b + '\n    for (const z of C)    // ×' + c + '\n      count++;            // ' + total,
          usage: 'Test matrices, config spaces, password counting. Nested loops multiply — that is also why they cost O(n·m·k).'
        };
      }
    },
    {
      id: 'ncr', nodeId: 'disc.combinations', trackId: 'discrete',
      title: 'Combinations C(n,k)', titleAr: 'التوافيق',
      gen() {
        const n = ri(5, 10), k = ri(2, Math.min(4, n - 2));
        let num = 1, den = 1, numParts = [], denParts = [];
        for (let i = 0; i < k; i++) { num *= (n - i); numParts.push(n - i); den *= (i + 1); denParts.push(i + 1); }
        const C = num / den;
        return {
          prompt: 'A team of <b>' + n + '</b> people — how many different groups of <b>' + k + '</b> can you choose? (order does not matter)  C(' + n + ',' + k + ') = ?',
          accept: [String(C)], value: C, tol: 0,
          steps: ['Order does not matter → combination (توفيقة)', 'C(' + n + ',' + k + ') = (' + numParts.join('·') + ') / ' + k + '!', '= ' + num + ' / ' + den, '= ' + C],
          code: 'function nCr(n, k) {\n  let r = 1;\n  for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1);\n  return r;\n}\nnCr(' + n + ', ' + k + ')   // ' + C,
          usage: 'All-pairs comparisons, lottery odds, binomial probabilities (Track 5), network links — C(n,2) alone runs half of computer science.'
        };
      }
    },
    {
      id: 'npr', nodeId: 'disc.combinations', trackId: 'discrete',
      title: 'Permutations P(n,k)', titleAr: 'التباديل',
      gen() {
        const n = ri(5, 9), k = ri(2, 3);
        let P = 1, parts = [];
        for (let i = 0; i < k; i++) { P *= (n - i); parts.push(n - i); }
        return {
          prompt: '<b>' + n + '</b> runners — how many ways to fill the podium (' + (k === 2 ? 'gold, silver' : 'gold, silver, bronze') + ')?  P(' + n + ',' + k + ') = ?',
          accept: [String(P)], value: P, tol: 0,
          steps: ['Medals differ → order matters → permutation (تبديلة)', 'Each medal consumes a runner: ' + parts.join(' choices × ') + ' choices', 'P(' + n + ',' + k + ') = ' + parts.join('·') + ' = ' + P],
          code: 'let p = 1;\nfor (let i = 0; i < ' + k + '; i++) p *= (' + n + ' - i);   // ' + P,
          usage: 'Rankings, ordered picks, PIN codes without repeats — whenever positions are distinguishable.'
        };
      }
    },
    {
      id: 'gcd-euclid', nodeId: 'disc.numtheory', trackId: 'discrete',
      title: 'gcd by Euclid', titleAr: 'القاسم المشترك الأكبر',
      gen() {
        const g = ri(2, 14);
        let a = g * ri(4, 15), b = g * ri(2, 9);
        if (a === b) a += g;
        if (b > a) { const t = a; a = b; b = t; }
        const steps = []; let x = a, y = b;
        while (y > 0) {
          const q = Math.floor(x / y), r = x % y;
          steps.push(x + ' = ' + q + '·' + y + ' + ' + r + '   →  gcd(' + x + ',' + y + ') = gcd(' + y + ',' + r + ')');
          x = y; y = r;
        }
        return {
          prompt: 'Compute <b>gcd(' + a + ', ' + b + ')</b> using Euclid\'s algorithm.',
          accept: [String(x)], value: x, tol: 0,
          steps: steps.concat(['Last non-zero remainder → gcd = ' + x]),
          code: 'const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);\ngcd(' + a + ', ' + b + ')   // ' + x,
          usage: 'Reducing fractions, aspect ratios (1920:1080 → 16:9), RSA key checks. Runs in O(log n) — 2300 years old and still in production.'
        };
      }
    },
    {
      id: 'mod-arith', nodeId: 'disc.modular', trackId: 'discrete',
      title: 'Modular arithmetic', titleAr: 'حساب الباقي',
      gen() {
        const m = ri(5, 12);
        const sub = pick(['add', 'mul', 'neg']);
        if (sub === 'add') {
          const a = ri(10, 60), b = ri(10, 60), ans = (a + b) % m;
          return {
            prompt: 'Compute <b>(' + a + ' + ' + b + ') mod ' + m + '</b>',
            accept: [String(ans)], value: ans, tol: 0,
            steps: [a + ' + ' + b + ' = ' + (a + b), (a + b) + ' = ' + Math.floor((a + b) / m) + '·' + m + ' + ' + ans, 'Answer: ' + ans + ' (always in 0…' + (m - 1) + ')'],
            code: 'const r = (' + a + ' + ' + b + ') % ' + m + ';   // ' + ans,
            usage: 'Hash buckets, ring buffers, clock arithmetic — mod keeps values inside a fixed range.'
          };
        }
        if (sub === 'mul') {
          const a = ri(8, 30), b = ri(8, 30), ans = (a * b) % m;
          return {
            prompt: 'Compute <b>(' + a + ' · ' + b + ') mod ' + m + '</b> — reduce early to keep numbers small!',
            accept: [String(ans)], value: ans, tol: 0,
            steps: ['Reduce first (legal!): ' + a + ' mod ' + m + ' = ' + (a % m) + ',  ' + b + ' mod ' + m + ' = ' + (b % m), (a % m) + ' · ' + (b % m) + ' = ' + ((a % m) * (b % m)), ((a % m) * (b % m)) + ' mod ' + m + ' = ' + ans],
            code: 'const r = ((' + a + ' % ' + m + ') * (' + b + ' % ' + m + ')) % ' + m + ';   // ' + ans,
            usage: 'Reduce-as-you-go is how RSA computes powers of 600-digit numbers without ever growing them.'
          };
        }
        const a = ri(3, 30); const amod = a % m; const ans = amod === 0 ? 0 : m - amod;
        return {
          prompt: 'Compute <b>(−' + a + ') mod ' + m + '</b> — the MATHEMATICAL answer (in 0…' + (m - 1) + ').',
          accept: [String(ans)], value: ans, tol: 0,
          steps: [a + ' mod ' + m + ' = ' + amod, '(−' + a + ') mod ' + m + ' = ' + m + ' − ' + amod + ' = ' + ans + (amod === 0 ? ' (a multiple — stays 0)' : ''), 'Careful: JavaScript % gives −' + amod + ' here, NOT ' + ans + '!'],
          code: '// JS trap:  -' + a + ' % ' + m + '  === ' + (-a % m) + '   ✗\nconst r = ((-' + a + ' % ' + m + ') + ' + m + ') % ' + m + ';   // ' + ans + '  ✓',
          usage: 'Stepping backward in a ring buffer, date math, negative offsets — the ((x%m)+m)%m armor prevents a classic bug.'
        };
      }
    },
    {
      id: 'graph-count', nodeId: 'disc.graphs1', trackId: 'discrete',
      title: 'Graph counting', titleAr: 'عدّ في المخططات',
      gen() {
        const sub = pick(['kn', 'tree', 'handshake']);
        if (sub === 'kn') {
          const n = ri(4, 12), e = n * (n - 1) / 2;
          return {
            prompt: 'The complete graph K<sub>' + n + '</sub> (every pair of ' + n + ' vertices connected). How many edges?',
            accept: [String(e)], value: e, tol: 0,
            steps: ['Every pair of vertices gets one edge', 'Edges = C(' + n + ',2) = ' + n + '·' + (n - 1) + '/2', '= ' + (n * (n - 1)) + '/2 = ' + e],
            code: 'const edges = ' + n + ' * (' + n + ' - 1) / 2;   // ' + e,
            usage: 'Full-mesh network cabling, all-pairs comparisons — the quadratic cost of connecting everything to everything.'
          };
        }
        if (sub === 'tree') {
          const n = ri(5, 60);
          return {
            prompt: 'A tree (شجرة) has <b>' + n + '</b> vertices. Exactly how many edges?',
            accept: [String(n - 1)], value: n - 1, tol: 0,
            steps: ['Tree = connected + no cycles', 'Every tree on n vertices has exactly n − 1 edges', n + ' − 1 = ' + (n - 1)],
            code: 'const edges = ' + n + ' - 1;   // ' + (n - 1) + '\n// also a validity check: connected && edges === n-1  ⟺  tree',
            usage: 'File systems, JSON documents, org charts. One edge less → disconnected; one more → a cycle appears.'
          };
        }
        const e = ri(5, 25);
        return {
          prompt: 'A graph has <b>' + e + '</b> edges. What is the SUM of all vertex degrees (Σ deg)?',
          accept: [String(2 * e)], value: 2 * e, tol: 0,
          steps: ['Handshake theorem: every edge touches exactly 2 vertices', 'Σ deg = 2·|E| = 2·' + e + ' = ' + (2 * e), '(So the sum of degrees is ALWAYS even)'],
          code: 'const degSum = Object.values(graph).flat().length;  // counts each edge twice → ' + (2 * e),
          usage: 'Instant data validation: a reported degree list with an odd sum is impossible — no network needed to check.'
        };
      }
    },
    {
      id: 'last-digit', nodeId: 'disc.modular', trackId: 'discrete',
      title: 'Last digit of a power', titleAr: 'آخر رقم في قوة كبيرة',
      gen() {
        const cycles = { 2: [2, 4, 8, 6], 3: [3, 9, 7, 1], 7: [7, 9, 3, 1], 8: [8, 4, 2, 6] };
        const a = pick([2, 3, 7, 8]), b = ri(5, 60);
        const cyc = cycles[a], pos = (b - 1) % 4, ans = cyc[pos];
        return {
          prompt: 'What is the <b>last digit</b> of ' + a + '<sup>' + b + '</sup>? (Use the mod-10 cycle — do NOT compute the power!)',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Last digits of ' + a + '¹, ' + a + '², ' + a + '³, ' + a + '⁴: ' + cyc.join(', ') + ' — then it repeats (period 4)', 'Position of exponent ' + b + ' in the cycle: (' + b + ' − 1) mod 4 = ' + pos + ' → position ' + (pos + 1), 'Last digit = ' + ans],
          code: 'const cycle = [' + cyc.join(', ') + '];\nconst last = cycle[(' + b + ' - 1) % 4];   // ' + ans,
          usage: 'Powers cycle mod anything (pigeonhole!). This bookkeeping is the baby version of the fast modular exponentiation inside RSA.'
        };
      }
    },

    /* ================= TRACK 3 · LINEAR ALGEBRA ================= */
    {
      id: 'vec-add', nodeId: 'la.vectors', trackId: 'linear-algebra',
      title: 'Vector arithmetic', titleAr: 'جمع المتجهات',
      gen() {
        const a = ri(-5, 6), b = ri(-5, 6), c = ri(-5, 6), d = ri(-5, 6);
        const k = ri(2, 3);
        const sub = pick(['add', 'scale']);
        if (sub === 'add') {
          return {
            prompt: '(' + a + ', ' + b + ') + (' + c + ', ' + d + ') = ?  — answer like "x,y"',
            accept: [(a + c) + ',' + (b + d)],
            steps: ['Add each axis independently (componentwise)', 'x: ' + a + ' + ' + c + ' = ' + (a + c), 'y: ' + b + ' + ' + d + ' = ' + (b + d), 'Result: (' + (a + c) + ', ' + (b + d) + ')'],
            code: 'const add = (u, v) => u.map((x, i) => x + v[i]);\nadd([' + a + ', ' + b + '], [' + c + ', ' + d + '])   // [' + (a + c) + ', ' + (b + d) + ']',
            usage: 'The game-loop line pos = pos + vel·dt is exactly this, 60 times a second.'
          };
        }
        return {
          prompt: k + ' · (' + a + ', ' + b + ') = ?  — answer like "x,y"',
          accept: [(k * a) + ',' + (k * b)],
          steps: ['Scalar multiplication: multiply EACH component', 'x: ' + k + '·' + a + ' = ' + (k * a), 'y: ' + k + '·' + b + ' = ' + (k * b), 'Result: (' + (k * a) + ', ' + (k * b) + ') — same direction, ' + k + '× the length'],
          code: 'const scale = (c, v) => v.map(x => c * x);\nscale(' + k + ', [' + a + ', ' + b + '])   // [' + (k * a) + ', ' + (k * b) + ']',
          usage: 'Speed multipliers, zoom factors, normalizing directions — scalars resize arrows.'
        };
      }
    },
    {
      id: 'dot-product', nodeId: 'la.dot', trackId: 'linear-algebra',
      title: 'Dot product', titleAr: 'الضرب القياسي',
      gen() {
        const a = ri(-4, 5), b = ri(-4, 5), c = ri(-4, 5), d = ri(-4, 5);
        const ans = a * c + b * d;
        return {
          prompt: '(' + a + ', ' + b + ') · (' + c + ', ' + d + ') = ?',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Multiply matching components, then add', a + '·' + c + ' = ' + (a * c) + ',   ' + b + '·' + d + ' = ' + (b * d), (a * c) + ' + ' + (b * d) + ' = ' + ans, ans === 0 ? 'Zero → the vectors are PERPENDICULAR (متعامدان)!' : (ans > 0 ? 'Positive → pointing the same-ish way' : 'Negative → pointing against each other')],
          code: 'const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);\ndot([' + a + ', ' + b + '], [' + c + ', ' + d + '])   // ' + ans,
          usage: 'Cosine similarity in search/AI, game lighting (brightness = n·l), "is the enemy in front of me?" — one multiply-add answers alignment.'
        };
      }
    },
    {
      id: 'mat-vec', nodeId: 'la.transform', trackId: 'linear-algebra',
      title: 'Matrix × vector', titleAr: 'مصفوفة × متجه',
      gen() {
        const a = ri(-3, 3), b = ri(-3, 3), c = ri(-3, 3), d = ri(-3, 3);
        const x = ri(-3, 4), y = ri(-3, 4);
        const rx = a * x + b * y, ry = c * x + d * y;
        return {
          prompt: 'A = [' + a + ' ' + b + '; ' + c + ' ' + d + '] (rows). Compute A·(' + x + ', ' + y + ') — answer like "x,y"',
          accept: [rx + ',' + ry],
          steps: ['Columns are the destinations of î and ĵ: col₁ = (' + a + ',' + c + '), col₂ = (' + b + ',' + d + ')', 'A·v = x·col₁ + y·col₂ = ' + x + '·(' + a + ',' + c + ') + ' + y + '·(' + b + ',' + d + ')', 'x-part: ' + x + '·' + a + ' + ' + y + '·' + b + ' = ' + rx, 'y-part: ' + x + '·' + c + ' + ' + y + '·' + d + ' = ' + ry, 'Result: (' + rx + ', ' + ry + ')'],
          code: 'const apply = ([a,b,c,d], [x,y]) => [a*x + b*y, c*x + d*y];\napply([' + a + ',' + b + ',' + c + ',' + d + '], [' + x + ',' + y + '])   // [' + rx + ', ' + ry + ']',
          usage: 'Every sprite rotation, every CSS transform, every neural-net layer: output = W·input. This multiply IS computer graphics.'
        };
      }
    },
    {
      id: 'det-2x2', nodeId: 'la.determinant', trackId: 'linear-algebra',
      title: 'Determinant 2×2', titleAr: 'المحدد',
      gen() {
        let a = ri(-4, 5), b = ri(-4, 5), c = ri(-4, 5), d = ri(-4, 5);
        if (Math.random() < 0.22) { const k = ri(2, 3); b = k * a; d = k * c; } /* sometimes singular */
        const det = a * d - b * c;
        return {
          prompt: 'det [' + a + ' ' + b + '; ' + c + ' ' + d + '] = ?',
          accept: [String(det)], value: det, tol: 0,
          steps: ['det = ad − bc', '= (' + a + ')(' + d + ') − (' + b + ')(' + c + ')', '= ' + (a * d) + ' − ' + (b * c) + ' = ' + det,
            det === 0 ? '⚠ det = 0: the matrix COLLAPSES the plane — not invertible (منفردة)!' : 'Areas scale by |' + det + '|' + (det < 0 ? ', and orientation FLIPS (mirror)' : '')],
          code: 'const det = (a, b, c, d) => a * d - b * c;\ndet(' + a + ', ' + b + ', ' + c + ', ' + d + ')   // ' + det,
          usage: 'Invertibility check before solving, triangle winding in graphics (backface culling), collinearity tests — one number, three jobs.'
        };
      }
    },
    {
      id: 'matmul-entry', nodeId: 'la.matmul', trackId: 'linear-algebra',
      title: 'Matrix product entry', titleAr: 'ضرب المصفوفات',
      gen() {
        const A = [ri(-3, 3), ri(-3, 3), ri(-3, 3), ri(-3, 3)];
        const B = [ri(-3, 3), ri(-3, 3), ri(-3, 3), ri(-3, 3)];
        const i = ri(1, 2), j = ri(1, 2);
        const rowA = i === 1 ? [A[0], A[1]] : [A[2], A[3]];
        const colB = j === 1 ? [B[0], B[2]] : [B[1], B[3]];
        const ans = rowA[0] * colB[0] + rowA[1] * colB[1];
        return {
          prompt: 'A = [' + A[0] + ' ' + A[1] + '; ' + A[2] + ' ' + A[3] + '],  B = [' + B[0] + ' ' + B[1] + '; ' + B[2] + ' ' + B[3] + '].<br>Entry (row ' + i + ', col ' + j + ') of A·B = ?',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Entry (i,j) = row i of A · column j of B (a dot product!)', 'Row ' + i + ' of A: (' + rowA.join(', ') + ')', 'Column ' + j + ' of B: (' + colB.join(', ') + ')', rowA[0] + '·' + colB[0] + ' + ' + rowA[1] + '·' + colB[1] + ' = ' + ans],
          code: '// (AB)[i][j] = dot(rowA_i, colB_j)\nconst entry = ' + rowA[0] + '*' + colB[0] + ' + ' + rowA[1] + '*' + colB[1] + ';   // ' + ans,
          usage: 'Composing transforms (MVP matrices in 3D engines), counting graph paths (A² entries!), chaining neural layers.'
        };
      }
    },
    {
      id: 'solve-2x2', nodeId: 'la.systems', trackId: 'linear-algebra',
      title: 'Solve a 2×2 system', titleAr: 'حل نظام معادلات',
      gen() {
        const x0 = ri(-4, 5), y0 = ri(-4, 5);
        const b = ri(2, 4), c = ri(2, 3);
        let d = ri(-3, 4); if (d === c * b) d += 1;
        const e = x0 + b * y0, f = c * x0 + d * y0;
        const coefY = d - c * b, rhs = f - c * e;
        return {
          prompt: 'Solve the system:<br><code>x + ' + b + 'y = ' + e + '</code><br><code>' + c + 'x + ' + d + 'y = ' + f + '</code><br>Answer like "x,y".',
          accept: [x0 + ',' + y0],
          steps: ['Eliminate x: R2 := R2 − ' + c + '·R1', '(' + d + ' − ' + c + '·' + b + ')y = ' + f + ' − ' + c + '·' + e + '  →  ' + coefY + 'y = ' + rhs, 'y = ' + rhs + '/' + coefY + ' = ' + y0, 'Back-substitute: x = ' + e + ' − ' + b + '·' + y0 + ' = ' + x0, 'Check in eq2: ' + c + '·' + x0 + ' + ' + d + '·' + y0 + ' = ' + f + ' ✓'],
          code: '// or just: np.linalg.solve(A, b) — which runs THIS elimination\nconst y = (' + f + ' - ' + c + '*' + e + ') / (' + d + ' - ' + c + '*' + b + ');   // ' + y0 + '\nconst x = ' + e + ' - ' + b + ' * y;                    // ' + x0,
          usage: 'Physics constraints, circuit analysis, fitting a line through two points — "find values satisfying all facts" is this, at every scale.'
        };
      }
    },

    /* ================= TRACK 4 · CALCULUS ================= */
    {
      id: 'log2-of', nodeId: 'calc.growth', trackId: 'calculus',
      title: 'Logarithm (which power?)', titleAr: 'اللوغاريتم',
      gen() {
        const k = ri(4, 12);
        return {
          prompt: 'log₂(' + (1 << k) + ') = ?  (in other words: how many times can you cut ' + (1 << k) + ' in half?)',
          accept: [String(k)], value: k, tol: 0,
          steps: ['The log asks: 2 to WHICH power gives ' + (1 << k) + '?', '2^' + k + ' = ' + (1 << k), 'log₂(' + (1 << k) + ') = ' + k],
          code: 'Math.log2(' + (1 << k) + ')   // ' + k + '\n// = worst-case steps of binary search on ' + (1 << k) + ' items',
          usage: 'Binary search steps, balanced-tree depth, bits needed for N values — logs answer "how many halvings/doublings?"'
        };
      }
    },
    {
      id: 'deriv-power', nodeId: 'calc.derivative', trackId: 'calculus',
      title: 'Derivative at a point', titleAr: 'المشتقة عند نقطة',
      gen() {
        const cf = ri(1, 4), n = ri(2, 4), x0 = ri(1, 3) * pick([1, -1]);
        const ans = cf * n * Math.pow(x0, n - 1);
        const pow = ['', '', '²', '³', '⁴'];
        return {
          prompt: 'f(x) = ' + (cf === 1 ? '' : cf) + 'x' + pow[n] + '.  Compute the slope f′(' + x0 + ').',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Power rule: bring the power down, lower it by one', 'f′(x) = ' + cf + '·' + n + '·x' + (n - 1 > 1 ? pow[n - 1] : '') + ' = ' + (cf * n) + 'x' + (n - 1 > 1 ? pow[n - 1] : ''), 'f′(' + x0 + ') = ' + (cf * n) + '·(' + x0 + ')' + (n - 1 > 1 ? pow[n - 1] : '') + ' = ' + ans, ans > 0 ? 'Positive slope → f is CLIMBING at x = ' + x0 : (ans < 0 ? 'Negative slope → f is FALLING at x = ' + x0 : 'Zero slope → flat (critical point!)')],
          code: '// numeric check with the h-trick:\nconst f = x => ' + cf + ' * x ** ' + n + ';\nconst h = 1e-6;\n(f(' + x0 + ' + h) - f(' + x0 + ' - h)) / (2 * h)   // ≈ ' + ans,
          usage: 'Sensitivity: "if I nudge x, how much does f move?" — pricing, error propagation, and the atom of ML gradients.'
        };
      }
    },
    {
      id: 'deriv-poly', nodeId: 'calc.derivative', trackId: 'calculus',
      title: 'Polynomial derivative', titleAr: 'مشتقة كثيرة حدود',
      gen() {
        const a = ri(1, 3), b = ri(-5, 5), c = ri(-9, 9), x0 = ri(-3, 3);
        const ans = 2 * a * x0 + b;
        return {
          prompt: 'f(x) = ' + a + 'x² ' + (b >= 0 ? '+ ' + b : '− ' + (-b)) + 'x ' + (c >= 0 ? '+ ' + c : '− ' + (-c)) + '.  Compute f′(' + x0 + ').',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Differentiate term by term', a + 'x² → ' + (2 * a) + 'x,   ' + b + 'x → ' + b + ',   constant ' + c + ' → 0', 'f′(x) = ' + (2 * a) + 'x ' + (b >= 0 ? '+ ' + b : '− ' + (-b)), 'f′(' + x0 + ') = ' + (2 * a) + '·(' + x0 + ') ' + (b >= 0 ? '+ ' + b : '− ' + (-b)) + ' = ' + ans],
          code: 'const df = x => ' + (2 * a) + ' * x + ' + b + ';\ndf(' + x0 + ')   // ' + ans,
          usage: 'The constant vanishing = shifting a curve up/down never changes its steepness. Slopes are shape, not height.'
        };
      }
    },
    {
      id: 'critical-point', nodeId: 'calc.optimization', trackId: 'calculus',
      title: 'Find the critical point', titleAr: 'النقطة الحرجة',
      gen() {
        const a = ri(1, 3) * pick([1, -1]), k = pick([-3, -2, -1, 1, 2, 3]);
        const b = -2 * a * k, c = ri(-5, 9);
        const kind = a > 0 ? 'minimum (bottom of a valley ∪)' : 'maximum (top of a hill ∩)';
        return {
          prompt: 'f(x) = ' + a + 'x² ' + (b >= 0 ? '+ ' + b : '− ' + (-b)) + 'x ' + (c >= 0 ? '+ ' + c : '− ' + (-c)) + '.  At which x is f′(x) = 0?',
          accept: [String(k)], value: k, tol: 0,
          steps: ['f′(x) = ' + (2 * a) + 'x ' + (b >= 0 ? '+ ' + b : '− ' + (-b)), 'Set to zero: ' + (2 * a) + 'x = ' + (-b), 'x = ' + (-b) + '/' + (2 * a) + ' = ' + k, 'f″ = ' + (2 * a) + ' ' + (a > 0 ? '> 0' : '< 0') + ' → this is a ' + kind],
          code: '// closed form for quadratics: x* = -b / (2a)\nconst xStar = -(' + b + ') / (2 * ' + a + ');   // ' + k,
          usage: 'Best price, best batch size, minimum cost — optimization = find the flat point, then check which kind.'
        };
      }
    },
    {
      id: 'integral-poly', nodeId: 'calc.integration', trackId: 'calculus',
      title: 'Definite integral', titleAr: 'التكامل المحدود',
      gen() {
        const sub = pick(['lin', 'sq']);
        if (sub === 'lin') {
          const b = ri(2, 6), ans = b * b;
          return {
            prompt: '∫₀' + '<sup>' + b + '</sup> 2x dx = ?',
            accept: [String(ans)], value: ans, tol: 0,
            steps: ['Antiderivative (دالة أصلية): F(x) = x²  (check: F′ = 2x ✓)', 'FTC: F(' + b + ') − F(0)', '= ' + b + '² − 0 = ' + ans],
            code: '// numeric check (Riemann rectangles):\nlet s = 0, n = 1e5, w = ' + b + '/n;\nfor (let i = 0; i < n; i++) s += 2*(i+0.5)*w * w;   // ≈ ' + ans,
            usage: 'Distance from a speed curve, total requests from a rate chart — accumulate a rate, get a total.'
          };
        }
        const b = ri(2, 4), ans = b * b * b;
        return {
          prompt: '∫₀' + '<sup>' + b + '</sup> 3x² dx = ?',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Antiderivative: F(x) = x³  (check: F′ = 3x² ✓)', 'FTC: F(' + b + ') − F(0)', '= ' + b + '³ − 0 = ' + ans],
          code: 'const F = x => x ** 3;\nF(' + b + ') - F(0)   // ' + ans,
          usage: 'The FTC trade: infinite summing → one subtraction. Find F with F′ = f, evaluate twice, done.'
        };
      }
    },
    {
      id: 'geo-series', nodeId: 'calc.series', trackId: 'calculus',
      title: 'Geometric series sum', titleAr: 'مجموع متسلسلة هندسية',
      gen() {
        const t = pick([
          { r: '1/2', rv: 0.5, mult: 1 }, { r: '1/3', rv: 1 / 3, mult: 2 }, { r: '1/4', rv: 0.25, mult: 3 }
        ]);
        const a = t.mult * ri(1, 4) * (t.r === '1/2' ? 1 : 1);
        const S = a / (1 - t.rv);
        const Sdisp = Math.round(S * 100) / 100;
        return {
          prompt: 'Sum the infinite series:  ' + a + ' + ' + a + '·(' + t.r + ') + ' + a + '·(' + t.r + ')² + …  = ?',
          accept: [String(Sdisp)], value: S, tol: 0.01,
          steps: ['Geometric series with first term a = ' + a + ', ratio r = ' + t.r + '  (|r| < 1 → converges ✓)', 'S = a / (1 − r)', '= ' + a + ' / (1 − ' + t.r + ') = ' + a + ' / ' + (Math.round((1 - t.rv) * 100) / 100), '= ' + Sdisp],
          code: '// verify by partial sums:\nlet s = 0, term = ' + a + ';\nfor (let i = 0; i < 50; i++) { s += term; term *= ' + t.rv.toFixed(4) + '; }   // → ' + Sdisp,
          usage: 'Bouncing balls, retry backoff totals, array-doubling cost (amortized O(1)!), feedback loops — repeated-fraction processes sum to a/(1−r).'
        };
      }
    },
    {
      id: 'descent-step', nodeId: 'calc.descent', trackId: 'calculus',
      title: 'Gradient descent step', titleAr: 'خطوة النزول بالتدرج',
      gen() {
        const alpha = pick([0.1, 0.2, 0.25]), x0 = ri(2, 5) * pick([1, -1]);
        const x1 = Math.round((1 - 2 * alpha) * x0 * 100) / 100;
        return {
          prompt: 'f(x) = x²  (so f′(x) = 2x). One gradient-descent step from x = ' + x0 + ' with learning rate α = ' + alpha + ':<br><code>x ← x − α·f′(x)</code>  = ?',
          accept: [String(x1)], value: x1, tol: 0.01,
          steps: ['f′(' + x0 + ') = 2·' + x0 + ' = ' + (2 * x0), 'Step: x = ' + x0 + ' − ' + alpha + '·' + (2 * x0), '= ' + x0 + ' − ' + (Math.round(alpha * 2 * x0 * 100) / 100) + ' = ' + x1, 'Closer to the minimum at 0 ✓ (each step multiplies distance by ' + (1 - 2 * alpha) + ')'],
          code: 'let x = ' + x0 + ';\nx = x - ' + alpha + ' * (2 * x);   // ' + x1 + '\n// repeat until |2x| is tiny → arrived at the flat point',
          usage: 'This one line, in a million dimensions, is how every neural network trains. The α decides converge / zigzag / explode.'
        };
      }
    },

    /* ================= TRACK 5 · PROBABILITY ================= */
    {
      id: 'dice-prob', nodeId: 'prob.samplespaces', trackId: 'probability',
      title: 'Two-dice probability', titleAr: 'احتمال النرد',
      gen() {
        const s = ri(2, 12), count = 6 - Math.abs(s - 7);
        return {
          prompt: 'Two fair dice. P(sum = ' + s + ') = ?  (fraction like "a/36" or decimal)',
          accept: [count + '/36', frac(count, 36)], value: count / 36, tol: 0.005,
          steps: ['Sample space: 6 × 6 = 36 equally likely pairs', 'Pairs summing to ' + s + ': ' + count + ' way' + (count > 1 ? 's' : ''), 'P = ' + count + '/36' + (frac(count, 36) !== count + '/36' ? ' = ' + frac(count, 36) : '') + ' ≈ ' + (count / 36).toFixed(3)],
          code: 'let hit = 0;\nfor (let a = 1; a <= 6; a++)\n  for (let b = 1; b <= 6; b++)\n    if (a + b === ' + s + ') hit++;\nhit / 36   // ' + (count / 36).toFixed(4),
          usage: 'Probability = counting the ways, divided by all ways. When the space is small — enumerate, don\'t simulate.'
        };
      }
    },
    {
      id: 'at-least-one', nodeId: 'prob.samplespaces', trackId: 'probability',
      title: 'At least one (complement)', titleAr: 'واحد على الأقل',
      gen() {
        const n = ri(2, 4);
        const pNone = Math.pow(5 / 6, n), ans = 1 - pNone;
        return {
          prompt: 'Roll a die <b>' + n + '</b> times. P(at least one six) = ?  (decimal, 2–3 digits)',
          accept: [], value: ans, tol: 0.01,
          steps: ['"At least one" → use the COMPLEMENT trick', 'P(no six in one roll) = 5/6', 'P(no six in ' + n + ' rolls) = (5/6)^' + n + ' ≈ ' + pNone.toFixed(3) + '  (independence → multiply)', 'P(at least one) = 1 − ' + pNone.toFixed(3) + ' ≈ ' + ans.toFixed(3)],
          code: 'const p = 1 - (5/6) ** ' + n + ';   // ' + ans.toFixed(4),
          usage: '"At least one server fails", "at least one retry succeeds" — 1 − P(none) turns many cases into one subtraction.'
        };
      }
    },
    {
      id: 'expected-value', nodeId: 'prob.expectation', trackId: 'probability',
      title: 'Expected value', titleAr: 'القيمة المتوقعة',
      gen() {
        const v1 = ri(1, 5), v2 = ri(6, 10), v3 = ri(12, 20);
        const probs = pick([[0.5, 0.3, 0.2], [0.6, 0.3, 0.1], [0.4, 0.4, 0.2]]);
        const E = Math.round((v1 * probs[0] + v2 * probs[1] + v3 * probs[2]) * 100) / 100;
        return {
          prompt: 'A game pays: <b>' + v1 + '</b> coins (p = ' + probs[0] + '), <b>' + v2 + '</b> coins (p = ' + probs[1] + '), <b>' + v3 + '</b> coins (p = ' + probs[2] + ').<br>E[payout] = ?',
          accept: [String(E)], value: E, tol: 0.01,
          steps: ['E = Σ (value × probability)', v1 + '·' + probs[0] + ' = ' + (v1 * probs[0]).toFixed(2) + ',   ' + v2 + '·' + probs[1] + ' = ' + (v2 * probs[1]).toFixed(2) + ',   ' + v3 + '·' + probs[2] + ' = ' + (v3 * probs[2]).toFixed(2), 'E = ' + (v1 * probs[0]).toFixed(2) + ' + ' + (v2 * probs[1]).toFixed(2) + ' + ' + (v3 * probs[2]).toFixed(2) + ' = ' + E, 'Playing many times, you earn ≈ ' + E + ' per play (law of large numbers)'],
          code: 'const E = ' + v1 + '*' + probs[0] + ' + ' + v2 + '*' + probs[1] + ' + ' + v3 + '*' + probs[2] + ';   // ' + E,
          usage: 'Pricing lottery tickets, insurance, ads (CPM), game economies — E[X] is the price tag of uncertainty.'
        };
      }
    },
    {
      id: 'all-heads', nodeId: 'prob.randomvars', trackId: 'probability',
      title: 'Independent events multiply', titleAr: 'ضرب الأحداث المستقلة',
      gen() {
        const n = ri(2, 5);
        return {
          prompt: 'Flip <b>' + n + '</b> fair coins. P(ALL heads) = ?  (fraction or decimal)',
          accept: ['1/' + (1 << n)], value: 1 / (1 << n), tol: 0.005,
          steps: ['The flips are independent (مستقلة) → probabilities MULTIPLY', 'P = (1/2)^' + n, '= 1/' + (1 << n) + ' ≈ ' + (1 / (1 << n)).toFixed(4)],
          code: 'const p = 0.5 ** ' + n + ';   // ' + (1 / (1 << n)).toFixed(4),
          usage: '"All 5 checks pass", "all replicas healthy" — chains of independent events shrink exponentially. (And if they share a cause, multiplying is ILLEGAL — 5.3!)'
        };
      }
    },
    {
      id: 'binom-mean', nodeId: 'prob.distributions', trackId: 'probability',
      title: 'Binomial expectation', titleAr: 'متوسط ذات الحدين',
      gen() {
        const n = ri(2, 20) * 10, p = pick([0.05, 0.1, 0.2, 0.5]);
        const E = Math.round(n * p * 100) / 100;
        return {
          prompt: '<b>' + n + '</b> independent requests, each fails with p = ' + p + '. Expected number of failures = ?',
          accept: [String(E)], value: E, tol: 0.01,
          steps: ['Count of successes over n tries → Binomial(n, p)', 'E = n·p  (indicator trick: each try contributes p)', '= ' + n + ' × ' + p + ' = ' + E],
          code: 'const expectedFailures = ' + n + ' * ' + p + ';   // ' + E,
          usage: 'Capacity planning in one multiplication: expected errors, expected conversions, expected flaky tests today.'
        };
      }
    }
  ];

  /* families grouped by node, for the node-view DRILL button */
  window.GENERATORS.byNode = {};
  window.GENERATORS.forEach(g => {
    (window.GENERATORS.byNode[g.nodeId] = window.GENERATORS.byNode[g.nodeId] || []).push(g);
  });
  window.GENERATORS.byId = {};
  window.GENERATORS.forEach(g => { window.GENERATORS.byId[g.id] = g; });

  /* tolerant answer checking: strings, fractions, decimals */
  window.GENERATORS.check = function (ex, raw) {
    const norm = s => String(s).toLowerCase().replace(/[\s()]/g, '').replace(',', ',');
    const r = norm(raw);
    if (ex.accept && ex.accept.some(a => norm(a) === r)) return true;
    if (ex.value != null) {
      let v = NaN;
      const t = String(raw).trim().replace(',', '.');
      const fm = t.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
      if (fm) v = parseFloat(fm[1]) / parseFloat(fm[2]);
      else v = parseFloat(t);
      if (!isNaN(v)) return Math.abs(v - ex.value) <= (ex.tol != null ? Math.max(ex.tol, 1e-9) : 0.01);
    }
    return false;
  };
})();
