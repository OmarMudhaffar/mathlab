/* MATH LAB — THE MANUAL (المرجع): common laws, fixed values, formulas.
   Every item: formula · name (with Arabic) · short note · link to the lesson. */
window.REFERENCE = [

  {
    section: 'Tips & Tricks', sectionAr: 'حيل الامتحان', color: '--power',
    note: 'The moves that earn marks. Read this list the night before every exam.',
    items: [
      { f: 'plug the answer back in', name: 'The free check', ar: 'التحقق المجاني', note: '10 seconds after solving any equation — catches 90% of sign errors', nodeId: null },
      { f: 'test formulas on n = 1, n = 2', name: 'Tiny-case test', ar: 'اختبار الحالات الصغيرة', note: 'Not sure if it is 2ⁿ or n²? Try n = 3: 8 vs 9. Rebuilds any formula', nodeId: null },
      { f: '"at least one" → 1 − P(none)', name: 'Complement first', ar: 'المتممة أولاً', note: 'Turns many-case counting into one subtraction', nodeId: 'prob.samplespaces' },
      { f: '÷ or × by NEGATIVE → flip the inequality', name: 'The inequality flip', ar: 'قلب المتباينة', note: 'The most-lost mark in algebra questions', nodeId: null },
      { f: 'roots: sum = −b, product = c', name: 'Vieta’s shortcut', ar: 'اختصار فييتا', note: 'Find and CHECK quadratic roots without the formula (x² + bx + c)', nodeId: null },
      { f: 'see 0/0 → factor & cancel first', name: 'The 0/0 routine', ar: 'روتين صفر على صفر', note: 'a² − b² = (a−b)(a+b) does most exam limits', nodeId: 'calc.limits' },
      { f: 'chain rule: say "…times inside"', name: 'Inner-derivative alarm', ar: 'منبّه المشتقة الداخلية', note: 'The #1 calculus error is forgetting ×g′(x)', nodeId: 'calc.chain' },
      { f: 'F(b) − F(a): write BOTH before computing', name: 'Both bounds', ar: 'الحدّان معاً', note: 'Integrals lose marks at the forgotten −F(a)', nodeId: 'calc.integration' },
      { f: 'Bayes → draw the population square', name: 'Count, don’t formula', ar: 'عدّ ولا تحفظ', note: '1000 people, count each door — the formula falls out by itself', nodeId: 'prob.bayes' },
      { f: 'reduce mod m at EVERY step', name: 'Reduce early', ar: 'اختصر مبكراً', note: 'Never compute the big power — numbers stay tiny, answer identical', nodeId: 'disc.modular' },
      { f: 'pair the ends: (first + last) × count / 2', name: 'Gauss pairing', ar: 'ترتيب غاوس', note: 'Any arithmetic series in 5 seconds', nodeId: 'logic.induction' },
      { f: '3-4-5 · 5-12-13 · 8-15-17 · 7-24-25', name: 'Pythagorean triples', ar: 'الثلاثيات الفيثاغورية', note: 'Exam vectors and triangles are built from these — spot them instantly', nodeId: 'la.vectors' },
      { f: 'units must cancel correctly', name: 'Unit check', ar: 'فحص الوحدات', note: '(sales/°C)·(°C/hour) = sales/hour ✓ — wrong units = wrong formula, guaranteed', nodeId: 'calc.chain' },
      { f: 'triangular matrix → eigenvalues on the diagonal', name: 'Read, don’t compute', ar: 'اقرأ ولا تحسب', note: 'Also: diagonal matrices, det of triangular = product of diagonal', nodeId: 'la.eigen' }
    ]
  },

  {
    section: 'Logic Laws', sectionAr: 'قوانين المنطق', color: '--t-logic',
    items: [
      { f: '¬(p ∧ q) ≡ ¬p ∨ ¬q', name: 'De Morgan (AND)', ar: 'دي مورغان', note: 'Push NOT inside — the gate flips', nodeId: 'logic.demorgan' },
      { f: '¬(p ∨ q) ≡ ¬p ∧ ¬q', name: 'De Morgan (OR)', ar: 'دي مورغان', note: '"neither" = both false', nodeId: 'logic.demorgan' },
      { f: 'p → q  ≡  ¬p ∨ q', name: 'Implication as OR', ar: 'الاستلزام', note: 'How code encodes "if…then" checks', nodeId: 'logic.implication' },
      { f: 'p → q  ≡  ¬q → ¬p', name: 'Contrapositive', ar: 'عكس النقيض', note: 'Always equivalent (the converse q→p is NOT!)', nodeId: 'logic.implication' },
      { f: '¬∀x P(x) ≡ ∃x ¬P(x)', name: 'Negate "for all"', ar: 'نفي الكل', note: '"not all" = "some exception exists"', nodeId: 'logic.quantifiers' },
      { f: '¬∃x P(x) ≡ ∀x ¬P(x)', name: 'Negate "exists"', ar: 'نفي الوجود', note: '"none" = "all fail"', nodeId: 'logic.quantifiers' },
      { f: 'p ∧ (q ∨ r) ≡ (p∧q) ∨ (p∧r)', name: 'Distributive law', ar: 'التوزيع', note: 'Like a(b+c) = ab+ac', nodeId: 'logic.demorgan' },
      { f: 'rows = 2ⁿ', name: 'Truth table size', ar: 'حجم جدول الصدق', note: 'n variables → 2ⁿ combinations', nodeId: 'logic.props' }
    ]
  },

  {
    section: 'Sets & Counting', sectionAr: 'المجموعات والعدّ', color: '--t-disc',
    items: [
      { f: '|A ∪ B| = |A| + |B| − |A ∩ B|', name: 'Inclusion–exclusion', ar: 'الإدراج والاستبعاد', note: 'Subtract the overlap once', nodeId: 'logic.sets' },
      { f: '|P(S)| = 2ⁿ', name: 'Power set size', ar: 'مجموعة القوى', note: 'Each element: in or out', nodeId: 'logic.sets' },
      { f: 'n₁ · n₂ · … · nₖ', name: 'Product rule', ar: 'قاعدة الضرب', note: 'Independent choices multiply', nodeId: 'disc.counting' },
      { f: 'P(n,k) = n·(n−1)·…·(n−k+1)', name: 'Permutations', ar: 'التباديل', note: 'Order matters — shrinking product', nodeId: 'disc.combinations' },
      { f: 'C(n,k) = P(n,k) / k!', name: 'Combinations', ar: 'التوافيق', note: 'Order does not matter — divide out orderings', nodeId: 'disc.combinations' },
      { f: 'C(n,k) = C(n, n−k)', name: 'Symmetry', ar: 'تناظر التوافيق', note: 'Choosing k in = choosing n−k out. Compute the small side!', nodeId: 'disc.combinations' },
      { f: 'C(n,0)+C(n,1)+…+C(n,n) = 2ⁿ', name: 'Row sum', ar: 'مجموع الصف', note: 'All subsets, grouped by size', nodeId: 'disc.combinations' },
      { f: 'N items, n boxes → some box ≥ ⌈N/n⌉', name: 'Pigeonhole', ar: 'أعشاش الحمام', note: 'Guaranteed, not just likely', nodeId: 'disc.counting' },
      { f: 'gcd(a, b) = gcd(b, a mod b)', name: 'Euclid’s algorithm', ar: 'خوارزمية إقليدس', note: 'Repeat until 0 — last non-zero remainder wins', nodeId: 'disc.numtheory' },
      { f: '(a + b) mod m = ((a mod m)+(b mod m)) mod m', name: 'Mod distributes', ar: 'توزيع الباقي', note: 'Reduce early, reduce often (× too)', nodeId: 'disc.modular' },
      { f: '((x % m) + m) % m', name: 'JS negative-mod fix', ar: 'إصلاح باقي السالب', note: 'JS % keeps the sign — this armor fixes it', nodeId: 'disc.modular' }
    ]
  },

  {
    section: 'Graphs', sectionAr: 'المخططات', color: '--t-disc',
    items: [
      { f: 'Σ deg(v) = 2|E|', name: 'Handshake theorem', ar: 'نظرية المصافحة', note: 'Degree sum is always EVEN', nodeId: 'disc.graphs1' },
      { f: 'K_n has n(n−1)/2 edges', name: 'Complete graph', ar: 'المخطط الكامل', note: 'All pairs = C(n,2)', nodeId: 'disc.graphs1' },
      { f: 'tree: |E| = |V| − 1', name: 'Tree edge count', ar: 'حواف الشجرة', note: 'Connected + no cycles, exactly', nodeId: 'disc.graphs2' },
      { f: 'BFS → shortest path (unweighted)', name: 'BFS guarantee', ar: 'ضمان BFS', note: 'Queue = rings by distance; DFS = stack, goes deep', nodeId: 'disc.graphs2' }
    ]
  },

  {
    section: 'Growth, Logs & Big-O', sectionAr: 'النمو واللوغاريتم', color: '--t-calc',
    items: [
      { f: '2¹⁰ ≈ 10³', name: 'The programmer’s constant', ar: 'ثابت المبرمج', note: '+10 in the power ≈ +3 digits. log₂(10⁶) ≈ 20', nodeId: 'calc.growth' },
      { f: 'log(a·b) = log a + log b', name: 'Log of product', ar: 'لوغاريتم الضرب', note: 'Logs turn × into + (NO rule for log(a+b)!)', nodeId: 'calc.growth' },
      { f: 'log(aᵇ) = b·log a', name: 'Log of power', ar: 'لوغاريتم القوة', note: 'Powers come down as multipliers', nodeId: 'calc.growth' },
      { f: 'aᵐ · aⁿ = aᵐ⁺ⁿ', name: 'Exponent rule', ar: 'قاعدة الأسس', note: 'Multiplying powers adds exponents', nodeId: 'calc.growth' },
      { f: '1 ≺ log n ≺ n ≺ n log n ≺ n² ≺ 2ⁿ ≺ n!', name: 'The growth ladder', ar: 'سلّم النمو', note: 'Each eventually beats all before it — forever', nodeId: 'disc.bigo' },
      { f: 'i *= 2 loop → O(log n)', name: 'Doubling loop', ar: 'حلقة المضاعفة', note: 'Halving/doubling loops are logarithmic', nodeId: 'disc.bigo' }
    ]
  },

  {
    section: 'Trigonometry — fixed values', sectionAr: 'حساب المثلثات — القيم الثابتة', color: '--t-lin',
    note: 'Not a lab lesson yet — but rotations (3.3) and calculus use these constantly. Memory trick for sin: √0/2, √1/2, √2/2, √3/2, √4/2.',
    items: [
      { f: 'sin: 0, 1/2, √2/2, √3/2, 1', name: 'sin of 0°, 30°, 45°, 60°, 90°', ar: 'قيم الجيب', note: '= √0/2, √1/2, √2/2, √3/2, √4/2 — count up!', nodeId: null },
      { f: 'cos: 1, √3/2, √2/2, 1/2, 0', name: 'cos of 0°, 30°, 45°, 60°, 90°', ar: 'قيم جيب التمام', note: 'Same list, reversed', nodeId: null },
      { f: 'tan: 0, 1/√3, 1, √3, —', name: 'tan of 0°, 30°, 45°, 60°, 90°', ar: 'قيم الظل', note: 'tan = sin/cos; undefined at 90°', nodeId: null },
      { f: 'sin²θ + cos²θ = 1', name: 'Pythagorean identity', ar: 'المتطابقة الفيثاغورية', note: 'The one identity to never forget', nodeId: null },
      { f: 'Q1: all + · Q2: sin + · Q3: tan + · Q4: cos +', name: 'Signs by quadrant', ar: 'الإشارات حسب الربع', note: '"All Students Take Calculus" (ASTC)', nodeId: null },
      { f: '180° = π rad;  deg → rad: × π/180', name: 'Degrees ↔ radians', ar: 'الدرجات والراديان', note: '90° = π/2, 45° = π/4, 30° = π/6', nodeId: null },
      { f: 'R(θ) = [cos θ  −sin θ;  sin θ  cos θ]', name: 'Rotation matrix', ar: 'مصفوفة الدوران', note: 'Rotate the plane by θ (CCW). θ=90° gives [0 −1; 1 0]', nodeId: 'la.transform' }
    ]
  },

  {
    section: 'Vectors & Matrices', sectionAr: 'المتجهات والمصفوفات', color: '--t-lin',
    items: [
      { f: 'u·v = u₁v₁ + u₂v₂ + …', name: 'Dot product (compute)', ar: 'الضرب القياسي', note: 'Multiply matching parts, add', nodeId: 'la.dot' },
      { f: 'u·v = ‖u‖ ‖v‖ cos θ', name: 'Dot product (meaning)', ar: 'معنى الضرب القياسي', note: 'Lengths × alignment', nodeId: 'la.dot' },
      { f: 'cos θ = u·v / (‖u‖ ‖v‖)', name: 'Cosine similarity', ar: 'تشابه جيب التمام', note: '+1 same direction · 0 perpendicular · −1 opposite. Runs search & AI recommendations', nodeId: 'la.dot' },
      { f: 'u·v = 0  ⟺  u ⊥ v', name: 'Perpendicular test', ar: 'اختبار التعامد', note: 'Zero dot = 90° — no protractor needed', nodeId: 'la.dot' },
      { f: '‖v‖ = √(v₁² + v₂² + …)', name: 'Length (norm)', ar: 'طول المتجه', note: 'Pythagoras in n dimensions. Unit vector = v/‖v‖', nodeId: 'la.vectors' },
      { f: 'A·v = x·col₁ + y·col₂', name: 'Matrix × vector', ar: 'مصفوفة × متجه', note: 'Columns = where î and ĵ land', nodeId: 'la.transform' },
      { f: '(AB)ᵢⱼ = row i of A · col j of B', name: 'Matrix product', ar: 'ضرب المصفوفات', note: 'AB means B FIRST, then A. AB ≠ BA!', nodeId: 'la.matmul' },
      { f: 'det[a b; c d] = ad − bc', name: 'Determinant 2×2', ar: 'المحدد', note: 'Area scale factor; 0 = collapse (no inverse); < 0 = flip', nodeId: 'la.determinant' },
      { f: 'det(AB) = det(A) · det(B)', name: 'Det of product', ar: 'محدد الضرب', note: 'Scale factors multiply', nodeId: 'la.determinant' },
      { f: 'Av = λv  (v ≠ 0)', name: 'Eigenvector / eigenvalue', ar: 'المتجه والقيمة الذاتية', note: 'Direction unchanged, stretched by λ. Aⁿv = λⁿv: |λ|>1 explodes, |λ|<1 decays', nodeId: 'la.eigen' }
    ]
  },

  {
    section: 'Calculus', sectionAr: 'التفاضل والتكامل', color: '--t-calc',
    items: [
      { f: 'xⁿ → n·xⁿ⁻¹', name: 'Power rule', ar: 'قاعدة القوة', note: 'Bring the power down, lower it by one. Constants → 0', nodeId: 'calc.derivative' },
      { f: 'eˣ → eˣ  ·  ln x → 1/x', name: 'Exp & log derivatives', ar: 'مشتقات الأسي واللوغاريتم', note: 'eˣ is its own slope', nodeId: 'calc.derivative' },
      { f: 'sin x → cos x  ·  cos x → −sin x', name: 'Trig derivatives', ar: 'مشتقات المثلثات', note: 'The minus lives on cos′', nodeId: null },
      { f: '(f(g(x)))′ = f′(g(x)) · g′(x)', name: 'Chain rule', ar: 'قاعدة السلسلة', note: 'Rates through a chain MULTIPLY. Evaluate f′ at g(x)!', nodeId: 'calc.chain' },
      { f: '(f·g)′ = f′g + fg′', name: 'Product rule', ar: 'قاعدة الضرب للمشتقات', note: 'Not just f′·g′! Each factor takes a turn', nodeId: null },
      { f: 'f′ = 0, then f″: > 0 min · < 0 max', name: 'Critical point test', ar: 'اختبار النقطة الحرجة', note: 'Flat first, then read the bend. Check the borders too!', nodeId: 'calc.optimization' },
      { f: 'quadratic ax²+bx+c: vertex at x = −b/(2a)', name: 'Vertex formula', ar: 'رأس القطع المكافئ', note: 'The instant min/max for quadratics', nodeId: 'calc.optimization' },
      { f: 'x ← x − α·f′(x)', name: 'Gradient descent', ar: 'النزول بالتدرج', note: 'Walk downhill. α too big → explode; too small → crawl', nodeId: 'calc.descent' },
      { f: '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C   (n ≠ −1)', name: 'Integral power rule', ar: 'قاعدة قوة التكامل', note: 'Raise the power, divide by it — derivative reversed', nodeId: 'calc.integration' },
      { f: '∫ₐᵇ f dx = F(b) − F(a),  F′ = f', name: 'Fundamental Theorem', ar: 'النظرية الأساسية', note: 'Infinite sum → one subtraction. Both limits!', nodeId: 'calc.integration' }
    ]
  },

  {
    section: 'Sums & Series', sectionAr: 'المجاميع والمتسلسلات', color: '--t-calc',
    items: [
      { f: '1 + 2 + … + n = n(n+1)/2', name: 'Triangular sum', ar: 'المجموع المثلثي', note: 'Gauss’s formula — also C(n+1, 2)', nodeId: 'logic.induction' },
      { f: '1² + 2² + … + n² = n(n+1)(2n+1)/6', name: 'Sum of squares', ar: 'مجموع المربعات', note: 'Appears in nested-loop counting', nodeId: null },
      { f: 'a + ar + … + arⁿ⁻¹ = a(1−rⁿ)/(1−r)', name: 'Geometric (finite)', ar: 'الهندسية المنتهية', note: 'Any r ≠ 1', nodeId: 'calc.series' },
      { f: 'a + ar + ar² + … = a/(1−r),  |r| < 1', name: 'Geometric (infinite)', ar: 'الهندسية اللانهائية', note: 'Only when |r| < 1! Array-doubling cost < 2n comes from this', nodeId: 'calc.series' },
      { f: '1 + 1/2 + 1/3 + … → ∞', name: 'Harmonic diverges', ar: 'التوافقية تتباعد', note: 'Shrinking terms are NOT enough. Grows like ln n (quicksort’s log!)', nodeId: 'calc.series' }
    ]
  },

  {
    section: 'Probability', sectionAr: 'الاحتمالات', color: '--t-prob',
    items: [
      { f: 'P = favorable / total', name: 'Uniform probability', ar: 'الاحتمال المنتظم', note: 'ONLY when all outcomes equally likely — check it!', nodeId: 'prob.samplespaces' },
      { f: 'P(not A) = 1 − P(A)', name: 'Complement', ar: 'المتممة', note: '"At least one…" → compute 1 − P(none)', nodeId: 'prob.samplespaces' },
      { f: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', name: 'Addition rule', ar: 'قاعدة الجمع', note: 'Inclusion–exclusion with probabilities', nodeId: 'prob.samplespaces' },
      { f: 'P(A|B) = P(A ∩ B) / P(B)', name: 'Conditional probability', ar: 'الاحتمال الشرطي', note: 'Probability inside a smaller world. P(A|B) ≠ P(B|A)!', nodeId: 'prob.bayes' },
      { f: 'P(A|B) = P(B|A)·P(A) / P(B)', name: 'Bayes’ rule', ar: 'قاعدة بايز', note: 'Flip the direction — pay the base rate. Draw a population square!', nodeId: 'prob.bayes' },
      { f: 'independent: P(A ∩ B) = P(A)·P(B)', name: 'Independence', ar: 'الاستقلال', note: 'Multiplying REQUIRES independence — shared causes break it', nodeId: 'prob.randomvars' },
      { f: 'E[X] = Σ value · probability', name: 'Expected value', ar: 'القيمة المتوقعة', note: 'Long-run average (not the most likely value!)', nodeId: 'prob.expectation' },
      { f: 'E[X + Y] = E[X] + E[Y]  — always', name: 'Linearity', ar: 'خطية التوقع', note: 'Needs NO independence. The superpower', nodeId: 'prob.expectation' },
      { f: 'Binomial: P(k) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ,  E = np', name: 'Binomial distribution', ar: 'توزيع ذات الحدين', note: 'Count successes in n tries. Typical swing ≈ √(np(1−p))', nodeId: 'prob.distributions' },
      { f: 'Geometric: P(k) = (1−p)ᵏ⁻¹ p,  E = 1/p', name: 'Geometric distribution', ar: 'التوزيع الهندسي', note: 'Wait for first success. 20% rate → ~5 tries', nodeId: 'prob.distributions' },
      { f: 'collisions likely near n ≈ √N', name: 'Birthday bound', ar: 'حد عيد الميلاد', note: '23 people / 365 days; 2¹⁶ items / 32-bit hash', nodeId: 'prob.algorithms' },
      { f: 'error ~ 1/√n', name: 'Monte Carlo error', ar: 'خطأ مونت كارلو', note: '10× accuracy costs 100× samples', nodeId: 'prob.montecarlo' }
    ]
  }
];
