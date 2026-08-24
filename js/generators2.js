/* MATH LAB — generator wave 2: school BASICS (be fast!) + ADVANCED multi-step.
   Every family here carries a 💡 tip — the exam trick for that exercise type. */
(function () {
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const gcd2 = (a, b) => (b === 0 ? Math.abs(a) : gcd2(b, a % b));
  function frac(n, d) { const g = gcd2(Math.abs(n), Math.abs(d)) || 1; return (n / g) + '/' + (d / g); }

  const WAVE2 = [

    /* ================= BASICS (أساسيات) — speed is the goal ================= */
    {
      id: 'frac-add', trackId: 'basics', nodeId: null, tier: 'basics',
      title: 'Add fractions', titleAr: 'جمع الكسور',
      gen() {
        const b = pick([2, 3, 4, 5, 6]), d = pick([2, 3, 4, 5, 6]);
        const a = ri(1, b - 0), c = ri(1, d - 0);
        const n = a * d + c * b, den = b * d;
        return {
          prompt: 'Compute:  <b>' + a + '/' + b + ' + ' + c + '/' + d + '</b>  (answer as a fraction, simplest form)',
          accept: [frac(n, den), n + '/' + den], value: n / den, tol: 0.005,
          steps: ['Common denominator: ' + b + '·' + d + ' = ' + den, a + '/' + b + ' = ' + (a * d) + '/' + den + ',   ' + c + '/' + d + ' = ' + (c * b) + '/' + den, 'Add the tops: ' + (a * d) + ' + ' + (c * b) + ' = ' + n, 'Simplify with gcd (2.7!): ' + n + '/' + den + ' = ' + frac(n, den)],
          code: '// exact fractions in code need a Fraction class — floats lose exactness:\n' + a + '/' + b + ' + ' + c + '/' + d + '   // ' + (n / den).toFixed(4) + '…',
          usage: 'Probabilities add as fractions constantly (Track 5). Fast fraction hands = fast probability exams.',
          tip: '💡 Trick: use the LCM (المضاعف المشترك الأصغر) as denominator to keep numbers small — but b·d ALWAYS works when you are in a hurry.'
        };
      }
    },
    {
      id: 'frac-mul', trackId: 'basics', nodeId: null, tier: 'basics',
      title: 'Multiply / divide fractions', titleAr: 'ضرب وقسمة الكسور',
      gen() {
        const div = Math.random() < 0.4;
        const a = ri(1, 6), b = ri(2, 7), c = ri(1, 6), d = ri(2, 7);
        if (div) {
          const n = a * d, den = b * c;
          return {
            prompt: 'Compute:  <b>(' + a + '/' + b + ') ÷ (' + c + '/' + d + ')</b>  (simplest form)',
            accept: [frac(n, den), n + '/' + den], value: n / den, tol: 0.005,
            steps: ['Dividing = multiplying by the flip (المقلوب): ÷ ' + c + '/' + d + '  →  × ' + d + '/' + c, '(' + a + '·' + d + ') / (' + b + '·' + c + ') = ' + n + '/' + den, 'Simplify: ' + frac(n, den)],
            code: '(' + a + '/' + b + ') / (' + c + '/' + d + ')   // ' + (n / den).toFixed(4),
            usage: 'Rates and unit conversions are fraction division: (km/h) ÷ (km/l) = l/h.',
            tip: '💡 Trick: NEVER divide fractions directly — flip the second one and multiply. One rule, zero errors.'
          };
        }
        const n = a * c, den = b * d;
        return {
          prompt: 'Compute:  <b>(' + a + '/' + b + ') × (' + c + '/' + d + ')</b>  (simplest form)',
          accept: [frac(n, den), n + '/' + den], value: n / den, tol: 0.005,
          steps: ['Multiply straight across: tops ' + a + '·' + c + ' = ' + n + ', bottoms ' + b + '·' + d + ' = ' + den, 'Simplify: ' + frac(n, den)],
          code: '(' + a + '/' + b + ') * (' + c + '/' + d + ')   // ' + (n / den).toFixed(4),
          usage: 'Chained probabilities multiply exactly like this: P(A)·P(B) for independent events.',
          tip: '💡 Trick: cancel BEFORE multiplying (cross-simplify) — smaller numbers, fewer mistakes.'
        };
      }
    },
    {
      id: 'percent-of', trackId: 'basics', nodeId: null, tier: 'basics',
      title: 'Percentages', titleAr: 'النسب المئوية',
      gen() {
        const p = pick([5, 10, 20, 25, 50, 75]), n = ri(2, 25) * 20;
        const ans = p * n / 100;
        return {
          prompt: 'Compute:  <b>' + p + '% of ' + n + '</b>',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['10% of ' + n + ' = ' + (n / 10) + '  (just move the decimal point)', p + '% = ' + (p / 10) + ' × (10%)  →  ' + (p / 10) + ' × ' + (n / 10), '= ' + ans],
          code: 'const r = ' + n + ' * ' + p + ' / 100;   // ' + ans,
          usage: 'Discounts, error rates, battery, interest — percent fluency is daily life plus every statistics course.',
          tip: '💡 Trick: build everything from 10% (move the point) and 1% (move it twice). 35% = 3×10% + 5×1%.'
        };
      }
    },
    {
      id: 'solve-linear', trackId: 'basics', nodeId: null, tier: 'basics',
      title: 'Solve linear equations', titleAr: 'حل معادلة من الدرجة الأولى',
      gen() {
        const two = Math.random() < 0.45;
        if (two) {
          const x0 = ri(-6, 8);
          let a = ri(2, 6), c = ri(1, 5); if (c === a) c += 1;
          const b = ri(-9, 9), d = (a - c) * x0 + b;
          return {
            prompt: 'Solve for x:  <b>' + a + 'x ' + (b >= 0 ? '+ ' + b : '− ' + (-b)) + ' = ' + c + 'x ' + (d >= 0 ? '+ ' + d : '− ' + (-d)) + '</b>',
            accept: [String(x0)], value: x0, tol: 0,
            steps: ['Move the x terms to one side: ' + a + 'x − ' + c + 'x = ' + d + ' − ' + b + (b >= 0 ? '' : ' (watch the sign!)'), (a - c) + 'x = ' + (d - b), 'x = ' + (d - b) + '/' + (a - c) + ' = ' + x0, 'Check: plug x = ' + x0 + ' into BOTH sides — they match ✓'],
            code: 'const x = (' + d + ' - ' + b + ') / (' + a + ' - ' + c + ');   // ' + x0,
            usage: 'Every "when do these two things meet?" question — costs, speeds, break-even points.',
            tip: '💡 Trick: ALWAYS plug the answer back in. 10 seconds, catches 90% of sign errors — free marks.'
          };
        }
        const a = ri(2, 9), x0 = ri(-9, 12), b = ri(-15, 15), c = a * x0 + b;
        return {
          prompt: 'Solve for x:  <b>' + a + 'x ' + (b >= 0 ? '+ ' + b : '− ' + (-b)) + ' = ' + c + '</b>',
          accept: [String(x0)], value: x0, tol: 0,
          steps: ['Move the constant: ' + a + 'x = ' + c + ' − ' + (b >= 0 ? b : '(' + b + ')') + ' = ' + (c - b), 'Divide: x = ' + (c - b) + '/' + a + ' = ' + x0, 'Check: ' + a + '·' + x0 + (b >= 0 ? ' + ' + b : ' − ' + (-b)) + ' = ' + c + ' ✓'],
          code: 'const x = (' + c + ' - ' + b + ') / ' + a + ';   // ' + x0,
          usage: 'Undo operations in reverse order — the same instinct as reversing a function (1.6 bijections).',
          tip: '💡 Trick: undo in REVERSE order — last operation first (the +b goes away before the ×a).'
        };
      }
    },
    {
      id: 'inequality', trackId: 'basics', nodeId: null, tier: 'basics',
      title: 'Inequalities (the flip!)', titleAr: 'المتباينات وقلب الإشارة',
      gen() {
        const a = pick([2, 3, -2, -3]), k = ri(-5, 6), b = ri(-9, 9);
        const c = a * k + b;
        const ans = a > 0 ? 'x<' + k : 'x>' + k;
        const alt = a > 0 ? k + '>x' : k + '<x';
        return {
          prompt: 'Solve:  <b>' + a + 'x ' + (b >= 0 ? '+ ' + b : '− ' + (-b)) + ' &lt; ' + c + '</b>  (answer like "x&lt;3" or "x&gt;3")',
          accept: [ans, alt],
          steps: ['Move the constant: ' + a + 'x < ' + (c - b), 'Divide by ' + a + (a < 0 ? ' — NEGATIVE, so the inequality FLIPS! (تنقلب الإشارة)' : ' (positive — no flip)'), (a > 0 ? 'x < ' : 'x > ') + k],
          code: '// why the flip: 2 < 3, but multiply by −1:  −2 > −3\n// negative scaling reverses order',
          usage: 'Ranges, constraints, valid-input checks — inequalities define every boundary in code.',
          tip: '💡 THE trick: dividing or multiplying by a NEGATIVE number flips < to >. The #1 lost mark in inequality questions.'
        };
      }
    },
    {
      id: 'sqrt-simplify', trackId: 'basics', nodeId: null, tier: 'basics',
      title: 'Simplify square roots', titleAr: 'تبسيط الجذور',
      gen() {
        const k = ri(2, 5), m = pick([2, 3, 5, 6, 7]);
        const N = k * k * m;
        return {
          prompt: 'Write <b>√' + N + '</b> as k√m (with m as small as possible). Answer like "k,m".',
          accept: [k + ',' + m],
          steps: ['Hunt for square factors: ' + N + ' = ' + (k * k) + ' · ' + m + ' = ' + k + '² · ' + m, '√(' + k + '²·' + m + ') = ' + k + '√' + m, 'Answer: ' + k + '√' + m],
          code: '// check: (' + k + ' * Math.sqrt(' + m + ')) ** 2  ≈ ' + N,
          usage: 'Vector lengths (3.1) and quadratic roots constantly produce √ that simplify — clean answers earn full marks.',
          tip: '💡 Trick: test the squares in order — 4, 9, 16, 25 — does it divide N? First hit wins.'
        };
      }
    },
    {
      id: 'pemdas', trackId: 'basics', nodeId: null, tier: 'basics',
      title: 'Order of operations', titleAr: 'ترتيب العمليات',
      gen() {
        const a = ri(2, 9), b = ri(2, 6), c = ri(2, 6), d = ri(2, 4);
        const ans = a + b * c - d * d;
        return {
          prompt: 'Compute:  <b>' + a + ' + ' + b + ' × ' + c + ' − ' + d + '²</b>',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Powers first: ' + d + '² = ' + (d * d), 'Then ×: ' + b + ' × ' + c + ' = ' + (b * c), 'Then + and − left to right: ' + a + ' + ' + (b * c) + ' − ' + (d * d) + ' = ' + ans],
          code: 'const r = ' + a + ' + ' + b + ' * ' + c + ' - ' + d + ' ** 2;   // ' + ans + '\n// same precedence rules as the math',
          usage: 'Operator precedence in every programming language IS this rule — misreading it writes real bugs.',
          tip: '💡 Order: Parentheses → Exponents → ×÷ → +− (from left). When unsure IN CODE: add parentheses — free clarity.'
        };
      }
    },
    {
      id: 'expo-rules', trackId: 'basics', nodeId: 'calc.growth', tier: 'basics',
      title: 'Exponent rules', titleAr: 'قواعد الأسس',
      gen() {
        const a = pick([2, 3, 5, 'x']), m = ri(2, 6), n = ri(2, 5);
        const sub = pick(['mul', 'pow', 'div']);
        const res = sub === 'mul' ? m + n : sub === 'pow' ? m * n : m - n;
        const exprs = { mul: a + '^' + m + ' · ' + a + '^' + n, pow: '(' + a + '^' + m + ')^' + n, div: a + '^' + m + ' / ' + a + '^' + n };
        const rules = { mul: 'multiplying powers → ADD exponents', pow: 'power of a power → MULTIPLY exponents', div: 'dividing powers → SUBTRACT exponents' };
        return {
          prompt: 'Simplify:  <b>' + exprs[sub] + ' = ' + a + '^?</b>  — give the exponent.',
          accept: [String(res)], value: res, tol: 0,
          steps: ['Rule: ' + rules[sub], sub === 'mul' ? m + ' + ' + n + ' = ' + res : sub === 'pow' ? m + ' × ' + n + ' = ' + res : m + ' − ' + n + ' = ' + res],
          code: '// verify with numbers: 2**' + m + (sub === 'mul' ? ' * 2**' + n + ' === 2**' + res : sub === 'pow' ? ' ** ' + n + ' === 2**' + res : ' / 2**' + n + ' === 2**' + res),
          usage: 'Log rules (4.1) are these rules mirrored. Master one side, get the other free.',
          tip: '💡 Forgot a rule? Test it with tiny numbers: 2²·2³ = 4·8 = 32 = 2⁵. Ten seconds rebuilds any rule.'
        };
      }
    },

    /* ================= ADVANCED (متقدم) — multi-step ================= */
    {
      id: 'quad-roots', trackId: 'calculus', nodeId: 'calc.optimization', tier: 'advanced',
      title: 'Quadratic roots (factoring)', titleAr: 'جذور معادلة تربيعية',
      gen() {
        let r = ri(-6, 6), s = ri(-6, 6);
        if (r === 0) r = 7; if (s === 0) s = -4; if (s === r) s += 1;
        const B = -(r + s), C = r * s;
        return {
          prompt: 'Solve:  <b>x² ' + (B >= 0 ? '+ ' + B : '− ' + (-B)) + 'x ' + (C >= 0 ? '+ ' + C : '− ' + (-C)) + ' = 0</b>  — answer both roots like "r,s".',
          accept: [r + ',' + s, s + ',' + r],
          steps: ['Hunt two numbers with sum = ' + (r + s) + ' (−b) and product = ' + C + ' (c)', 'Found: ' + r + ' and ' + s + '  →  factors: (x ' + (r >= 0 ? '− ' + r : '+ ' + (-r)) + ')(x ' + (s >= 0 ? '− ' + s : '+ ' + (-s)) + ') = 0', 'Roots: x = ' + r + ' or x = ' + s, 'Vieta check (فييتا): ' + r + '+' + s + ' = ' + (r + s) + ' ✓, ' + r + '·' + s + ' = ' + C + ' ✓'],
          code: '// or the formula: x = (-b ± √(b²-4ac)) / 2a\nconst D = ' + B + '**2 - 4*' + C + ';\n[(-(' + B + ') + Math.sqrt(D))/2, (-(' + B + ') - Math.sqrt(D))/2]   // [' + Math.max(r, s) + ', ' + Math.min(r, s) + ']',
          usage: 'Where a parabola crosses zero: projectile landing points, break-even points, intersection of curves.',
          tip: '💡 Vieta’s trick: roots sum to −b and multiply to c. Use it to FIND roots fast — and to CHECK them in 5 seconds.'
        };
      }
    },
    {
      id: 'discriminant', trackId: 'calculus', nodeId: 'calc.optimization', tier: 'advanced',
      title: 'Count real roots (discriminant)', titleAr: 'المميّز وعدد الجذور',
      gen() {
        const kind = pick([2, 2, 1, 0]);
        let b, c;
        if (kind === 1) { b = pick([2, 4, 6, 8]); c = b * b / 4; }
        else if (kind === 2) { b = ri(2, 8); c = ri(-9, Math.floor(b * b / 4) - 1); }
        else { b = ri(1, 5); c = Math.floor(b * b / 4) + ri(1, 8); }
        const D = b * b - 4 * c;
        const ans = D > 0 ? 2 : D === 0 ? 1 : 0;
        return {
          prompt: '<b>x² ' + (b >= 0 ? '+ ' + b : '− ' + (-b)) + 'x ' + (c >= 0 ? '+ ' + c : '− ' + (-c)) + ' = 0</b> — how many REAL roots? (0, 1, or 2)',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Discriminant (المميّز): D = b² − 4ac = ' + b + '² − 4·' + c, '= ' + (b * b) + ' − ' + (4 * c) + ' = ' + D, D > 0 ? 'D > 0 → the parabola crosses zero twice → 2 roots' : D === 0 ? 'D = 0 → the parabola just TOUCHES zero → 1 root' : 'D < 0 → the parabola never reaches zero → 0 real roots'],
          code: 'const D = ' + b + '**2 - 4 * 1 * ' + c + ';   // ' + D + '\nconst roots = D > 0 ? 2 : D === 0 ? 1 : 0;',
          usage: '"Does this equation have a solution?" answered WITHOUT solving — collision detection uses exactly this test.',
          tip: '💡 You rarely need the roots — D’s SIGN alone answers yes/no/touch questions. Compute less, answer faster.'
        };
      }
    },
    {
      id: 'log-solve', trackId: 'calculus', nodeId: 'calc.growth', tier: 'advanced',
      title: 'Solve with logarithms', titleAr: 'حل بالِلوغاريتم',
      gen() {
        const A = pick([2, 3, 5, 10]), k = ri(2, A === 10 ? 5 : A === 2 ? 8 : 4);
        const V = Math.pow(A, k);
        return {
          prompt: 'Solve for x:  <b>' + A + 'ˣ = ' + V + '</b>',
          accept: [String(k)], value: k, tol: 0,
          steps: ['Ask: ' + A + ' to which power gives ' + V + '?', 'Build up: ' + A + ', ' + A * A + ', ' + A * A * A + '…', 'x = log_' + A + '(' + V + ') = ' + k],
          code: 'Math.log(' + V + ') / Math.log(' + A + ')   // ' + k + '  (log base-change trick)',
          usage: '"How many doublings until X?" — cache growth, backoff retries, binary search depth.',
          tip: '💡 No log button for base ' + A + '? Base-change: log_a(b) = ln(b)/ln(a). Works for every base, every calculator.'
        };
      }
    },
    {
      id: 'inverse-2x2', trackId: 'linear-algebra', nodeId: 'la.determinant', tier: 'advanced',
      title: 'Inverse of a 2×2', titleAr: 'معكوس مصفوفة',
      gen() {
        const b = ri(1, 4), c = ri(1, 3), d = b * c + 1; /* det = 1·d − b·c = 1 */
        const i = pick([1, 2]), j = pick([1, 2]);
        const inv = [[d, -b], [-c, 1]];
        const ans = inv[i - 1][j - 1];
        return {
          prompt: 'A = [1 ' + b + '; ' + c + ' ' + d + '] has det = 1. Entry (row ' + i + ', col ' + j + ') of <b>A⁻¹</b> = ?',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['2×2 inverse recipe: swap the diagonal, NEGATE the off-diagonal, divide by det', 'A⁻¹ = (1/det)·[d −b; −c a] = [' + d + ' ' + (-b) + '; ' + (-c) + ' 1]', 'Entry (' + i + ',' + j + ') = ' + ans],
          code: '// [a b; c d]⁻¹ = 1/(ad−bc) · [d −b; −c a]\nconst inv = [[' + d + ', ' + (-b) + '], [' + (-c) + ', 1]];',
          usage: 'Undoing a transform: camera un-projection, solving Ax = b as x = A⁻¹b (though solve() is better — 3.5!).',
          tip: '💡 The jingle: "swap the leading diagonal, change the signs of the other one, divide by det." Verify: A·A⁻¹ should give I.'
        };
      }
    },
    {
      id: 'eigen-triangular', trackId: 'linear-algebra', nodeId: 'la.eigen', tier: 'advanced',
      title: 'Eigenvalues (read them off!)', titleAr: 'القيم الذاتية مباشرة',
      gen() {
        let a = ri(-4, 6), d = ri(-4, 6); if (a === d) d += 1;
        const b = ri(1, 5);
        return {
          prompt: 'The triangular matrix [' + a + ' ' + b + '; 0 ' + d + '] — its eigenvalues are…? (answer "λ₁,λ₂")',
          accept: [a + ',' + d, d + ',' + a],
          steps: ['Triangular matrix (zeros below the diagonal) → eigenvalues ARE the diagonal entries', 'Why: det(A − λI) = (' + a + ' − λ)(' + d + ' − λ) — the off-diagonal ' + b + ' never enters', 'λ = ' + a + ' and λ = ' + d],
          code: '// stability check in one glance: |' + a + '| and |' + d + '| vs 1\n// (iterating this matrix ' + (Math.abs(a) > 1 || Math.abs(d) > 1 ? 'EXPLODES' : 'settles') + ')',
          usage: 'Instant stability analysis — and why numerical algorithms reduce matrices to triangular form first.',
          tip: '💡 Diagonal or triangular matrix? DON’T compute the characteristic polynomial — read the eigenvalues off the diagonal. Free answer.'
        };
      }
    },
    {
      id: 'chain-numeric', trackId: 'calculus', nodeId: 'calc.chain', tier: 'advanced',
      title: 'Chain rule (numbers)', titleAr: 'قاعدة السلسلة بالأرقام',
      gen() {
        const a = ri(2, 4), b = ri(-3, 4), n = pick([2, 3]), x0 = ri(0, 3);
        const u = a * x0 + b;
        const ans = n * Math.pow(u, n - 1) * a;
        return {
          prompt: 'f(x) = (' + a + 'x ' + (b >= 0 ? '+ ' + b : '− ' + (-b)) + ')' + (n === 2 ? '²' : '³') + '.  Compute f′(' + x0 + ').',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Outside first: d/du of u' + (n === 2 ? '²' : '³') + ' = ' + n + 'u' + (n === 2 ? '' : '²') + ', evaluated at u = ' + a + '·' + x0 + (b >= 0 ? '+' + b : '−' + (-b)) + ' = ' + u, 'Inside: d/dx of (' + a + 'x' + (b >= 0 ? '+' + b : '−' + (-b)) + ') = ' + a, 'MULTIPLY: ' + n + '·' + (n === 2 ? u : u + '²') + '·' + a + ' = ' + ans],
          code: '// numeric check:\nconst f = x => (' + a + '*x + ' + b + ') ** ' + n + ';\n(f(' + x0 + ' + 1e-6) - f(' + x0 + ' - 1e-6)) / 2e-6   // ≈ ' + ans,
          usage: 'Every nested function you differentiate — and the exact arithmetic backpropagation runs per weight.',
          tip: '💡 The #1 lost mark: forgetting to multiply by the INNER derivative (×' + a + ' here). Say "times inside" out loud every time.'
        };
      }
    },
    {
      id: 'tangent-line', trackId: 'calculus', nodeId: 'calc.derivative', tier: 'advanced',
      title: 'Tangent line value', titleAr: 'قيمة خط المماس',
      gen() {
        const x0 = ri(1, 4), x1 = x0 + ri(1, 3);
        const ans = x0 * x0 + 2 * x0 * (x1 - x0);
        return {
          prompt: 'f(x) = x². The TANGENT LINE at x = ' + x0 + ' — what y-value does it give at x = ' + x1 + '?',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Tangent line formula: y = f(x₀) + f′(x₀)·(x − x₀)', 'f(' + x0 + ') = ' + (x0 * x0) + ',   f′(' + x0 + ') = 2·' + x0 + ' = ' + (2 * x0), 'y = ' + (x0 * x0) + ' + ' + (2 * x0) + '·(' + x1 + ' − ' + x0 + ') = ' + ans, 'Note: the true f(' + x1 + ') = ' + (x1 * x1) + ' — the tangent UNDERSHOOTS by ' + (x1 * x1 - ans) + ' (curves bend away from tangents)'],
          code: 'const tangent = x => ' + (x0 * x0) + ' + ' + (2 * x0) + ' * (x - ' + x0 + ');\ntangent(' + x1 + ')   // ' + ans,
          usage: 'Linear approximation — how physics engines and neural nets estimate "nearby" values cheaply.',
          tip: '💡 Memorize the shape: y = f(x₀) + f′(x₀)(x − x₀). Point value + slope × distance. It IS the definition of the derivative, rearranged.'
        };
      }
    },
    {
      id: 'limit-cancel', trackId: 'calculus', nodeId: 'calc.limits', tier: 'advanced',
      title: 'Limits (0/0 cancel)', titleAr: 'النهايات بالاختصار',
      gen() {
        const a = ri(2, 9);
        return {
          prompt: 'Compute:  <b>lim (x² − ' + (a * a) + ')/(x − ' + a + ')  as x → ' + a + '</b>',
          accept: [String(2 * a)], value: 2 * a, tol: 0,
          steps: ['Direct substitution gives 0/0 — a disguise, not an answer', 'Factor the top: x² − ' + (a * a) + ' = (x − ' + a + ')(x + ' + a + ')', 'Cancel (legal for x ≠ ' + a + '): limit of (x + ' + a + ')', 'Substitute: ' + a + ' + ' + a + ' = ' + (2 * a)],
          code: '// numeric check: x = ' + a + '.000001 →\n((' + a + '.000001)**2 - ' + (a * a) + ') / 0.000001   // ≈ ' + (2 * a),
          usage: 'Every derivative from the definition is one of these — this IS how f′(x) = 2x was born (4.3).',
          tip: '💡 See 0/0? Factor and cancel FIRST, substitute LAST. a² − b² = (a−b)(a+b) does most of the work in exams.'
        };
      }
    },
    {
      id: 'integral-ab', trackId: 'calculus', nodeId: 'calc.integration', tier: 'advanced',
      title: 'Integral with two bounds', titleAr: 'تكامل بحدّين',
      gen() {
        const a = ri(1, 3), b = a + ri(1, 3);
        const ans = b * b - a * a;
        return {
          prompt: 'Compute:  <b>∫ from ' + a + ' to ' + b + ' of 2x dx</b>',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Antiderivative: F(x) = x²', 'FTC with BOTH bounds: F(' + b + ') − F(' + a + ')', '= ' + (b * b) + ' − ' + (a * a) + ' = ' + ans],
          code: 'const F = x => x * x;\nF(' + b + ') - F(' + a + ')   // ' + ans,
          usage: '"Total between time a and time b" — partial accumulations, not just from zero.',
          tip: '💡 The classic slip: forgetting −F(a). Write "F(b) − F(a)" with BOTH numbers before computing anything.'
        };
      }
    },
    {
      id: 'gauss-sum', trackId: 'logic', nodeId: 'logic.induction', tier: 'advanced',
      title: 'Gauss sum 1+2+…+n', titleAr: 'مجموع غاوس',
      gen() {
        const n = ri(20, 200);
        const ans = n * (n + 1) / 2;
        return {
          prompt: 'Compute:  <b>1 + 2 + 3 + … + ' + n + '</b>',
          accept: [String(ans)], value: ans, tol: 0,
          steps: ['Gauss’s trick: pair the ends — (1 + ' + n + '), (2 + ' + (n - 1) + '), … each pair sums to ' + (n + 1), 'Number of pairs: ' + n + '/2', 'Sum = ' + n + '·' + (n + 1) + '/2 = ' + ans],
          code: 'const s = ' + n + ' * ' + (n + 1) + ' / 2;   // ' + ans + '\n// vs the O(n) loop — the formula is O(1)!',
          usage: 'Cost of all-pairs loops, triangular arrangements, "handshakes" — and it is C(n+1, 2) in disguise.',
          tip: '💡 The pairing trick generalizes: any ARITHMETIC series = (first + last) × count / 2. Works for 5+10+15+…+100 too.'
        };
      }
    },
    {
      id: 'mod-exp', trackId: 'discrete', nodeId: 'disc.modular', tier: 'advanced',
      title: 'Power mod m (reduce early)', titleAr: 'قوة مع باقي القسمة',
      gen() {
        const a = ri(2, 7), m = ri(5, 11), b = ri(3, 6);
        let r = 1; const steps = [];
        for (let i = 1; i <= b; i++) {
          const prev = r;
          r = (r * a) % m;
          steps.push('step ' + i + ': (' + prev + ' · ' + a + ') mod ' + m + ' = ' + (prev * a) + ' mod ' + m + ' = ' + r);
        }
        return {
          prompt: 'Compute:  <b>' + a + '^' + b + ' mod ' + m + '</b>  — reduce at every step, never compute ' + a + '^' + b + '!',
          accept: [String(r)], value: r, tol: 0,
          steps: steps.concat(['Answer: ' + r]),
          code: 'let r = 1;\nfor (let i = 0; i < ' + b + '; i++) r = (r * ' + a + ') % ' + m + ';   // ' + r,
          usage: 'RSA encryption does exactly this with 600-digit numbers — reduce-early keeps them 600 digits forever.',
          tip: '💡 Never compute the big power first! Reduce mod m after EVERY multiplication — the answer is identical, the numbers stay tiny.'
        };
      }
    },
    {
      id: 'vector-norm', trackId: 'linear-algebra', nodeId: 'la.vectors', tier: 'advanced',
      title: 'Vector length (clean answers)', titleAr: 'طول المتجه',
      gen() {
        const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [20, 21, 29]]);
        const sx = pick([1, -1]), sy = pick([1, -1]);
        return {
          prompt: 'Compute:  <b>‖(' + (sx * t[0]) + ', ' + (sy * t[1]) + ')‖</b>',
          accept: [String(t[2])], value: t[2], tol: 0,
          steps: ['‖v‖ = √(x² + y²) — signs vanish when squaring', '= √(' + (t[0] * t[0]) + ' + ' + (t[1] * t[1]) + ') = √' + (t[2] * t[2]), '= ' + t[2] + '  (a Pythagorean triple!)'],
          code: 'Math.hypot(' + (sx * t[0]) + ', ' + (sy * t[1]) + ')   // ' + t[2],
          usage: 'Distances in games, magnitudes in physics, error sizes in ML — the most-computed formula in graphics.',
          tip: '💡 Memorize the triple families: 3-4-5, 5-12-13, 8-15-17, 7-24-25 (and their multiples). Exam vectors are usually built from them.'
        };
      }
    },
    {
      id: 'bayes-clean', trackId: 'probability', nodeId: 'prob.bayes', tier: 'advanced',
      title: 'Bayes with a population', titleAr: 'بايز بطريقة العدّ',
      gen() {
        const s = pick([50, 100, 200]), fpPct = pick([5, 10, 20]);
        const fpc = 1000 * fpPct / 100;
        const ans = s / (s + fpc);
        return {
          prompt: 'In a group: <b>' + s + '</b> people have condition X, <b>1000</b> do not. A test catches ALL ' + s + ' true cases, but wrongly flags <b>' + fpPct + '%</b> of the healthy 1000.<br>P(has X | flagged) = ?  (fraction or decimal)',
          accept: [frac(s, s + fpc)], value: ans, tol: 0.005,
          steps: ['Count the flags — door 1 (true): ' + s + ' people', 'Door 2 (false alarms): ' + fpPct + '% of 1000 = ' + fpc + ' people', 'Total flagged: ' + s + ' + ' + fpc + ' = ' + (s + fpc), 'P = ' + s + '/' + (s + fpc) + ' = ' + frac(s, s + fpc) + ' ≈ ' + ans.toFixed(3)],
          code: 'const p = ' + s + ' / (' + s + ' + ' + fpc + ');   // ' + ans.toFixed(4),
          usage: 'Medical tests, spam filters, security alerts — the flip that intuition always gets wrong (5.2).',
          tip: '💡 NEVER use the Bayes formula directly in exams — draw the population square and COUNT. Same answer, no formula to misremember.'
        };
      }
    },
    {
      id: 'two-draws', trackId: 'probability', nodeId: 'prob.randomvars', tier: 'advanced',
      title: 'Two draws, no replacement', titleAr: 'سحبتان بدون إرجاع',
      gen() {
        const r = ri(3, 6), b = ri(2, 5);
        const n = r * (r - 1), d = (r + b) * (r + b - 1);
        const ans = n / d;
        return {
          prompt: 'A bag: <b>' + r + ' red</b>, <b>' + b + ' blue</b>. Draw two (no replacement). P(both red) = ?',
          accept: [frac(n, d)], value: ans, tol: 0.005,
          steps: ['First draw: P(red) = ' + r + '/' + (r + b), 'Second draw — the world CHANGED (5.2): ' + (r - 1) + ' red left of ' + (r + b - 1), 'Multiply the chain: (' + r + '/' + (r + b) + ')·(' + (r - 1) + '/' + (r + b - 1) + ') = ' + frac(n, d) + ' ≈ ' + ans.toFixed(3)],
          code: 'const p = (' + r + '/' + (r + b) + ') * (' + (r - 1) + '/' + (r + b - 1) + ');   // ' + ans.toFixed(4),
          usage: 'Card draws, sampling without replacement, defect testing — dependent chains multiply UPDATED fractions.',
          tip: '💡 "No replacement" = shrink BOTH numbers for the next draw (one less red, one less total). Forgetting the −1s is the classic slip.'
        };
      }
    },
    {
      id: 'first-success', trackId: 'probability', nodeId: 'prob.distributions', tier: 'advanced',
      title: 'First success on try k', titleAr: 'أول نجاح في المحاولة k',
      gen() {
        const die = Math.random() < 0.5;
        const k = ri(2, 4);
        const n = die ? Math.pow(5, k - 1) : 1;
        const d = die ? Math.pow(6, k) : Math.pow(2, k);
        const label = die ? 'rolling a six' : 'flipping heads';
        const p = die ? '1/6' : '1/2';
        return {
          prompt: 'Keep trying until success: <b>' + label + '</b> (p = ' + p + ').<br>P(first success on EXACTLY try ' + k + ') = ?  (fraction or decimal)',
          accept: [frac(n, d)], value: n / d, tol: 0.005,
          steps: ['The exact story: fail ' + (k - 1) + ' times, then succeed once', 'P = (fail)^' + (k - 1) + ' · (success) = (' + (die ? '5/6' : '1/2') + ')^' + (k - 1) + ' · ' + p, '= ' + frac(n, d) + ' ≈ ' + (n / d).toFixed(4)],
          code: 'const p = ' + (die ? '(5/6)' : '0.5') + ' ** ' + (k - 1) + ' * ' + (die ? '(1/6)' : '0.5') + ';   // ' + (n / d).toFixed(4),
          usage: 'Retry loops, waiting times, "rolls until a critical hit" — the geometric distribution (5.5) by hand.',
          tip: '💡 Write the STORY as a sequence (F,F,…,F,S), then multiply its parts. Stories don’t get misremembered; formulas do.'
        };
      }
    }
  ];

  /* merge into the main registry and rebuild the indexes */
  window.GENERATORS.forEach(g => { if (!g.tier) g.tier = 'core'; });
  WAVE2.forEach(g => window.GENERATORS.push(g));
  window.GENERATORS.byNode = {};
  window.GENERATORS.byId = {};
  window.GENERATORS.forEach(g => {
    if (g.nodeId) (window.GENERATORS.byNode[g.nodeId] = window.GENERATORS.byNode[g.nodeId] || []).push(g);
    window.GENERATORS.byId[g.id] = g;
  });
})();
