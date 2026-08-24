/* Track 2 content — nodes 2.3 and 2.4 */

/* ============ 2.3 RECURRENCES & RECURSION ============ */
window.NODES['disc.recurrences'] = {
  id: 'disc.recurrences', num: '2.3', trackId: 'discrete',
  title: 'Recurrences & Recursion',
  minutes: 35,
  payoff: 'divide & conquer · memoization',
  levels: {

    l1: {
      html: `
<h4>Defining things by smaller versions of themselves</h4>
<p>A <span class="term">recurrence</span> answers "what is step n?" with "whatever step n−1 was, plus this." Fibonacci is the celebrity: F(n) = F(n−1) + F(n−2), with F(1) = F(2) = 1 → 1, 1, 2, 3, 5, 8, 13…</p>
<p>You met this structure twice already: induction (1.7) <em>proves</em> by leaning on smaller cases; recursion <em>computes</em> by leaning on smaller cases; a recurrence <em>defines</em> by leaning on smaller cases. One idea, three costumes.</p>
<div class="callout amber"><p><b>No base, no meaning:</b> "F(n) = F(n−1) + F(n−2)" alone pins down nothing — the base cases F(1) = F(2) = 1 are what anchor the whole infinite sequence. Same dominoes, same rule.</p></div>
<h4>The unrolling instinct</h4>
<p>To see what a recurrence "costs", unroll a few layers by hand: T(n) = T(n−1) + 1 → T(n−2) + 2 → … → T(1) + (n−1). The pattern that emerges IS the closed form. Guess it, then trust induction to prove it.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Fibonacci: 1, 1, 2, 3, 5, 8, 13, … What comes next, and by what rule?`,
          options: [
            { t: '21 — each term is the sum of the previous two', ok: true, why: 'F(n) = F(n−1) + F(n−2): 8 + 13 = 21. The rule references the sequence itself — that self-reference is what makes it a recurrence.' },
            { t: '20 — the gaps grow by one each time', ok: false, mis: 'pattern-guess', why: 'The gaps (0,1,1,2,3,5…) are themselves Fibonacci — pretty, but the defining rule is sum-of-previous-two, and 8+13 is 21.' },
            { t: '26 — double the previous term', ok: false, why: 'Doubling matches 1→2 and briefly flatters 5→8-ish, but 13·2 = 26 ≠ 8+13. Ratios approach ~1.618 (the golden ratio), never 2.' }
          ],
          hints: ['Each term is built from the terms just before it.', 'Add the last two: 8 + 13.']
        },
        {
          type: 'mcq',
          prompt: `Someone defines a sequence by ONLY "a(n) = 2·a(n−1)". What is a(5)?`,
          options: [
            { t: 'Cannot be determined — no base case was given', ok: true, why: 'The rule propagates values but cannot create one. a(1) = 1 gives 16; a(1) = 7 gives 112. Without the anchor, the sequence is a shape with no numbers — exactly induction’s missing-push failure.' },
            { t: '32 — doubling five times', ok: false, mis: 'assumed-base', why: 'You silently assumed a(1) = 2 (or a(0) = 1). Reasonable guess, but a guess — recurrences are only defined once their base is stated.' },
            { t: '10 — 2 times 5', ok: false, why: 'The rule multiplies by the PREVIOUS TERM’s value, not by n. But even the right reading is stuck without a base.' }
          ],
          hints: ['Trace it: a(5) = 2·a(4) = 4·a(3) = … = 16·a(1). Now what?', 'Everything hinges on a(1), which was never given.']
        },
        {
          type: 'mcq',
          prompt: `Unroll T(n) = T(n−1) + 1 with T(1) = 1. What is T(n) in closed form?`,
          options: [
            { t: 'T(n) = n — one unit per layer, n layers', ok: true, why: 'Each unrolling step trades T(k) for T(k−1) plus 1. After n−1 trades: T(1) + (n−1) = n. Linear recurrence, linear answer.' },
            { t: 'T(n) = 2n — it grows every step', ok: false, why: 'It grows by exactly 1 per step, starting at 1: that lands on n, not 2n. Check n = 2: T(2) = T(1)+1 = 2 ✓.' },
            { t: 'T(n) = 2ⁿ — recurrences are exponential', ok: false, mis: 'recursion-means-exponential', why: 'Only recurrences that BRANCH (two self-calls, like Fibonacci) go exponential. One self-call per layer is a straight line — a loop in disguise.' }
          ],
          hints: ['Write three layers: T(n) = T(n−1)+1 = T(n−2)+2 = …', 'After k layers: T(n−k) + k. Stop at n−k = 1.'],
          edge: 'Branching factor is the destiny: 1 self-call → linear-ish, 2 self-calls on n−1 → exponential, 2 self-calls on n/2 → n log n territory. Watch the branching.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Solving by unrolling — two worked classics</h4>
<pre><code>Tower of Hanoi   T(n) = 2T(n−1) + 1,  T(1) = 1
unroll: 2(2T(n−2)+1)+1 = 4T(n−2)+3 = 8T(n−3)+7 …
pattern: 2ᵏT(n−k) + (2ᵏ−1)  →  at k = n−1:  2ⁿ⁻¹ + 2ⁿ⁻¹ − 1 = 2ⁿ − 1</code></pre>
<pre><code>Sum-shaped   T(n) = T(n−1) + n,  T(1) = 1
unroll: T(n−2) + (n−1) + n = … = 1 + 2 + ⋯ + n = n(n+1)/2</code></pre>
<p>The 1.7 sum formula, arriving by recurrence — and the guess-then-induct loop closes: unrolling <em>suggests</em> the closed form, induction <em>certifies</em> it.</p>
<h4>Divide & conquer shapes</h4>
<pre><code>T(n) = T(n/2) + 1      halve, constant work    → log₂ n      (binary search)
T(n) = 2T(n/2) + n     halve BOTH sides, merge → n log₂ n    (mergesort)
T(n) = 2T(n−1) + 1     branch on n−1           → 2ⁿ − 1      (Hanoi — exponential!)</code></pre>
<p>The chasm between T(n/2) and T(n−1) under branching is the chasm between "fast" and "hopeless" — halving reaches the base in log n steps; decrementing takes n steps, and 2 branches per step compound.</p>`,
      questions: [
        {
          type: 'input',
          prompt: `T(1) = 1 and T(n) = T(n−1) + 2. Compute T(4).`,
          accept: ['7'],
          placeholder: '…',
          hints: ['Climb from the base: T(2), then T(3), then T(4).', 'T(2)=3, T(3)=5 — each step adds 2.'],
          why: 'T(4) = 7: the sequence 1, 3, 5, 7 — odd numbers, closed form 2n − 1. Small hand-traces reveal closed forms.'
        },
        {
          type: 'mcq',
          prompt: `Tower of Hanoi: T(n) = 2T(n−1) + 1, T(1) = 1. The closed form is…`,
          options: [
            { t: '2ⁿ − 1', ok: true, why: 'Check the base: 2¹−1 = 1 ✓. Check the step: 2(2ⁿ⁻¹−1)+1 = 2ⁿ−1 ✓. Base + step — that is a full induction proof in two lines.' },
            { t: '2n − 1', ok: false, mis: 'exp-linear-confusion', why: 'Matches T(1)=1 and T(2)=3 — then diverges: T(3) = 2·3+1 = 7 but 2n−1 says 5. Two shared points prove nothing (1.3: examples ≠ proof).' },
            { t: 'n²', ok: false, why: 'T(2) = 3 ≠ 4 — dead at the second value. Always execute the recurrence a few steps before believing a formula.' }
          ],
          hints: ['Compute T(1), T(2), T(3), T(4) by hand: 1, 3, 7, 15…', 'Each is one less than a power of 2.', 'Verify 2ⁿ−1 satisfies BOTH the base and the recurrence.'],
          edge: 'The monks moving 64 disks need 2⁶⁴−1 ≈ 1.8×10¹⁹ moves — exponential closed forms are why some clean-looking programs never finish.'
        },
        {
          type: 'order',
          prompt: `Arrange the unrolling of T(n) = T(n−1) + n, T(1) = 1 into a closed form.`,
          steps: [
            'Start: T(n) = T(n−1) + n',
            'Unroll once: T(n) = T(n−2) + (n−1) + n',
            'Continue to the base: T(n) = T(1) + 2 + 3 + ⋯ + n',
            'Recognize the sum: T(n) = 1 + 2 + ⋯ + n = n(n+1)/2'
          ],
          hints: ['Unrolling substitutes the recurrence into itself, one layer at a time.', 'The trail of "+k" terms accumulates until T(1) is reached.', 'The accumulated trail is the triangular sum from node 1.7.'],
          why: 'Unroll → spot the accumulated series → summon a known sum. Most simple recurrences fall to exactly this three-step ritual.'
        },
        {
          type: 'mcq',
          prompt: `Binary search halves the remaining range and does one comparison per step. Its recurrence is…`,
          options: [
            { t: 'T(n) = T(n/2) + 1', ok: true, why: 'One recursive call on half the input, constant work per layer. Unrolls to ~log₂ n steps — why binary search laughs at a billion elements (≈30 steps).' },
            { t: 'T(n) = 2T(n/2) + 1', ok: false, mis: 'branch-count', why: 'The 2 means BOTH halves get searched — that is a full traversal, not a search. Binary search’s power is discarding one half unexamined.' },
            { t: 'T(n) = T(n−1) + 1', ok: false, why: 'Shrinking by one per comparison is LINEAR scan. The recurrence must record the halving, or the log is lost.' }
          ],
          hints: ['How much input survives one comparison? How many recursive calls are made?', 'One call, half the input, +1 comparison.'],
          edge: 'Read recurrences as code x-rays: coefficient = number of recursive calls, argument = how fast input shrinks, additive term = work per layer.'
        },
        {
          type: 'mcq',
          prompt: `Naive recursive Fibonacci makes two self-calls per invocation. Roughly how many total calls does fib(n) trigger?`,
          options: [
            { t: 'Exponentially many — the call tree doubles at each level', ok: true, why: 'Each call spawns two more on nearly-as-large inputs; the tree has depth ~n and branches ×2. Total calls actually track F(n) itself ≈ 1.618ⁿ — fib(50) is over a billion calls.' },
            { t: 'About n — one call per number computed', ok: false, mis: 'ignores-recomputation', why: 'That would be true IF each value were computed once. Naive recursion recomputes fib(n−2) inside both branches, and the waste compounds exponentially. (Fixing this is memoization — L3.)' },
            { t: 'About n² — two calls times n levels', ok: false, why: 'Branching MULTIPLIES per level, never adds: 2·2·2·… over ~n levels is 2-to-the-something, not n·2.' }
          ],
          hints: ['Draw the call tree for fib(5) — count the repeated subtrees.', 'fib(3) appears how many times? And fib(2)?', 'Two branches per node, depth ≈ n: the tree is exponential.'],
          edge: 'The tree contains only ~n DISTINCT values — exponential work on linear information. That gap is exactly what memoization harvests.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Memoization: collapse the tree into a line</h4>
<pre><code>const memo = {};
function fib(n) {
  if (n <= 2) return 1;
  if (memo[n]) return memo[n];          // seen it? reuse it.
  return memo[n] = fib(n - 1) + fib(n - 2);
}</code></pre>
<p>Three lines turn ~10⁹ calls (fib(50) naive) into 49 stored values. The recurrence didn't change — the <em>evaluation strategy</em> did: each distinct subproblem is now solved once. Dynamic programming is exactly this: a recurrence + a table. You already met one — Pascal's identity filling the triangle (2.2).</p>
<h4>Reading performance off the recurrence</h4>
<pre><code>distinct subproblems × work per subproblem = total cost
fib memoized:      n subproblems × O(1)  = O(n)
mergesort:         T(n)=2T(n/2)+n        = O(n log n)
naive fib:         tree of ~φⁿ calls     = exponential</code></pre>
<p>Before optimizing any recursive function, ask the recurrence two questions: <b>how many distinct subproblems exist?</b> and <b>is anything computed twice?</b> A "yes" to the second is free performance waiting.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Memoized fib(50) computes each fib(k) once. Total function-body executions (cache misses)?`,
          options: [
            { t: '~50 — one per distinct subproblem', ok: true, why: 'The memo means each of fib(1)…fib(50) runs its body once; every other call is a lookup. Exponential → linear by remembering.' },
            { t: 'Still ~2⁵⁰ — the recursion is unchanged', ok: false, mis: 'memo-misunderstood', why: 'The recursion SHAPE is unchanged; the EXECUTION is not — repeated subtrees terminate instantly at the cache. Distinct subproblems bound the work, and there are only 50.' },
            { t: '~50² — each value consults all before it', ok: false, why: 'Each fib(k) consults exactly two neighbors, not all predecessors: 50 bodies × O(1) work each.' }
          ],
          hints: ['How many DISTINCT inputs can fib receive here?', 'Once fib(k) is cached, what does any later fib(k) call cost?'],
          edge: 'The general law: memoized cost = (distinct subproblems) × (work per body). Learn to count subproblems and you can price any DP before coding it.'
        },
        {
          type: 'mcq',
          prompt: `A function solves size n by two recursive calls on size n/2 plus O(n) merge work — T(n) = 2T(n/2) + n. Its running time is…`,
          options: [
            { t: 'O(n log n) — n work per level, log n levels', ok: true, why: 'Each level of the tree does n total work (halves double in count, halve in size — the products stay n), and halving reaches the base in log₂ n levels. This is mergesort’s signature.' },
            { t: 'O(n²) — two calls means squared', ok: false, mis: 'branch-count', why: 'Two calls on n−1 would explode, but two calls on HALF each conserve total size per level. Branching is priced together with shrinkage, never alone.' },
            { t: 'O(n) — the halves are small', ok: false, why: 'Each level costs n and there are log n levels — the log is real, and it is the whole difference between mergesort and a single scan.' }
          ],
          hints: ['Total work per LEVEL of the call tree: 2 halves × n/2 merge each = ?', 'n per level. How many levels until size 1?'],
          edge: 'n log n at n = 10⁶ is ~2×10⁷ ops — trivial. n² is 10¹² — minutes to hours. This recurrence is why sorting a million rows is routine.'
        },
        {
          type: 'mcq',
          prompt: `You spot a recursive function that is slow. The FIRST diagnostic question from this node is…`,
          options: [
            { t: '"Is any subproblem computed more than once?"', ok: true, why: 'Repeated subproblems are the exponential trap with a three-line cure (memoize). Check it before touching anything else — it is the highest-leverage question in recursive performance.' },
            { t: '"Can I rewrite it with a while loop?"', ok: false, mis: 'loops-faster-myth', why: 'Loop vs recursion changes constant factors (stack frames), not complexity class. An exponential algorithm stays exponential in a loop; find the repeated work first.' },
            { t: '"Is the language too slow?"', ok: false, why: 'A 10× language speedup is invisible next to an exponential-to-linear algorithm fix. Complexity first, constants later — always in that order.' }
          ],
          hints: ['What made naive fib catastrophic — the calls themselves, or something about WHICH calls?', 'The same values recomputed exponentially often. Which question detects that?'],
          edge: 'Second question, if the first says no: "does the input shrink by a constant fraction (n/2) or a constant amount (n−1)?" — that decides log vs linear depth.'
        }
      ]
    }
  }
};

/* ============ 2.4 ASYMPTOTICS & BIG-O ============ */
window.NODES['disc.bigo'] = {
  id: 'disc.bigo', num: '2.4', trackId: 'discrete',
  title: 'Asymptotics & Big-O',
  minutes: 35,
  payoff: 'the daily language of algorithm analysis',
  levels: {

    l1: {
      widget: 'bigorace',
      html: `
<h4>The race that only ends one way</h4>
<p>Five algorithms line up: log n, n, n log n, n², 2ⁿ. For tiny inputs they jostle — constants and luck decide. Then n grows, and something brutal happens: <b>the rankings lock in, permanently</b>. Past some point, 2ⁿ loses to n² loses to n log n loses to n loses to log n — no exceptions, forever.</p>
<div class="callout amber"><p><b>Big-O is the finish-line question:</b> not "who is fastest at n = 10?" but "whose cost curve has the gentler <em>shape</em> as n → ∞?" Shape beats speed. A slow-but-linear algorithm on fast hardware loses to a fast-but-quadratic one only briefly.</p></div>
<p>Race them below — slide n and watch 2ⁿ leave the chart while log n barely wakes up. At n = 60, 2ⁿ exceeds the number of seconds since the Big Bang.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Algorithm A costs 100·n steps; algorithm B costs n² steps. For LARGE n, which wins?`,
          options: [
            { t: 'A — past n = 100, linear beats quadratic forever', ok: true, why: '100n < n² exactly when n > 100. The constant delays the crossover; it cannot prevent it. Shape wins.' },
            { t: 'B — 100 is a huge constant', ok: false, mis: 'constant-fixation', why: 'At n = 1000: A does 10⁵ steps, B does 10⁶. At n = 10⁶: A does 10⁸, B does 10¹². The constant is a head start in a race B cannot finish.' },
            { t: 'Depends on the hardware', ok: false, why: 'Hardware scales both by the same factor — it shifts the crossover point, never the verdict. That invariance is exactly why big-O ignores constants.' }
          ],
          hints: ['Find where 100n = n².', 'n = 100. Which side of that line does "large n" live on?']
        },
        {
          type: 'mcq',
          prompt: `In the race widget at n = 40, which function has left the chart entirely?`,
          options: [
            { t: '2ⁿ — over a trillion by n = 40', ok: true, why: '2⁴⁰ ≈ 1.1 × 10¹², while n² = 1600. Exponentials are not "steep" — they are a different species.' },
            { t: 'n² — squares get huge', ok: false, why: '1600 at n = 40 — comfortably on any chart. Huge is relative, and next to 2ⁿ, n² is a flat line.' },
            { t: 'n log n — the log compounds', ok: false, mis: 'log-fear', why: 'Backwards: logs are the TAMEST factor in the lineup. n log n at 40 is ≈ 213 — barely above linear. Fear the exponent, befriend the log.' }
          ],
          hints: ['Compute all five at n = 40, roughly.', '2⁴⁰ has 13 digits; everything else has 4 or fewer.'],
          edge: 'Rule of thumb: 2¹⁰ ≈ 10³. So 2ⁿ gains three decimal digits per +10 of n. n = 60 → 18 digits.'
        },
        {
          type: 'mcq',
          prompt: `Big-O deliberately throws away constants and lower-order terms. Why is that a feature?`,
          options: [
            { t: 'Constants are machine/compiler noise; the growth shape is the portable truth', ok: true, why: 'A 3 GHz laptop and a 30 MHz microcontroller disagree on every constant — and agree perfectly on which curve eventually dominates. Big-O keeps exactly the part that survives changing machines.' },
            { t: 'Constants are impossible to measure', ok: false, why: 'They are perfectly measurable (profilers do) — just not portable or stable. The discard is a choice of abstraction, not a surrender.' },
            { t: 'It makes the math easier, at the cost of accuracy', ok: false, mis: 'bigo-is-sloppy', why: 'The "lost accuracy" is precisely the unstable part. For the question big-O answers — how does cost SCALE — dropping constants loses nothing.' }
          ],
          hints: ['What changes when you run the same code on a machine 10× faster?', 'Every constant — and no growth shape. Which one deserves a theory?']
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The definition</h4>
<p>f(n) is <b>O(g(n))</b> if there exist constants c &gt; 0 and n₀ with f(n) ≤ c·g(n) for all n ≥ n₀. In words: past some threshold, g (scaled once) ceilings f forever. Note the two quantifiers — ∃c ∃n₀ ∀n ≥ n₀ — this is node 1.3 notation earning its keep, and "for all n ≥ n₀" is the induction-style base from 1.7.</p>
<h4>The working rules</h4>
<ul>
  <li><b>Drop constants:</b> 5n → O(n). The c absorbs them.</li>
  <li><b>Keep the dominant term:</b> 3n² + 50n + 7 → O(n²). Past n₀, the n² term owns the total.</li>
  <li><b>The hierarchy:</b> 1 ≺ log n ≺ n ≺ n log n ≺ n² ≺ n³ ≺ 2ⁿ ≺ n! — each eventually beats all before it.</li>
  <li><b>Sequential code adds, nested code multiplies</b> — the sum and product rules of 2.1, now pricing loops.</li>
</ul>
<pre><code>for i in 0..n: work()               // O(n)
for i in 0..n: for j in 0..n: w()   // O(n²)      product
loopA(n); loopB(n)                  // O(n+n) = O(n)   sum, then dominant term</code></pre>
<p>Logarithms enter wherever input is repeatedly halved: binary search does ~log₂ n comparisons because that is how many halvings n survives (the 2.3 recurrence T(n) = T(n/2) + 1).</p>`,
      questions: [
        {
          type: 'order',
          prompt: `Arrange from slowest-growing to fastest-growing.`,
          steps: [
            'log n',
            'n',
            'n log n',
            'n²',
            '2ⁿ'
          ],
          hints: ['The log is the gentlest non-constant growth in the lineup.', 'n log n sits strictly between linear and quadratic.', 'The exponential outgrows every polynomial — always last.'],
          why: 'The canonical hierarchy. Every algorithm you meet for the next three years gets filed onto this shelf.'
        },
        {
          type: 'mcq',
          prompt: `f(n) = 3n² + 50n + 7. Its big-O class is…`,
          options: [
            { t: 'O(n²) — the quadratic term dominates past small n', ok: true, why: 'At n = 100: 3n² = 30,000 vs 50n = 5,000 — and the gap only widens. Constants and lower terms vanish into c and n₀.' },
            { t: 'O(3n²) — keep the leading coefficient', ok: false, mis: 'constant-in-O', why: 'O(3n²) = O(n²) — the 3 is absorbed by c in the definition. Writing constants inside O() is grammatically legal and always redundant.' },
            { t: 'O(n² + n) — keep both growing terms', ok: false, why: 'Also collapses to O(n²): once n² dominates, carrying n adds no information. One term — the winner — is the whole classification.' }
          ],
          hints: ['Which term wins as n grows without bound?', 'Divide everything by n²: 3 + 50/n + 7/n² → 3. Bounded by a constant times n².']
        },
        {
          type: 'input',
          prompt: `Binary search on a sorted array of 1,048,576 (= 2²⁰) items: how many comparisons in the worst case (≈ log₂ n)?`,
          accept: ['20', '21'],
          placeholder: '…',
          hints: ['Each comparison halves the candidates.', 'How many halvings take 2²⁰ down to 1?'],
          why: '20 halvings: 2²⁰ → 1. A million items, twenty questions — the whole magic of logarithms in one number.',
          edge: 'Doubling the data adds ONE comparison. Log-time algorithms are effectively immune to data growth.'
        },
        {
          type: 'mcq',
          prompt: `Two code fragments over an array of n items:<br>(A) two loops, one after the other. (B) one loop nested inside the other. Their classes are…`,
          options: [
            { t: 'A: O(n), B: O(n²) — sequence adds, nesting multiplies', ok: true, why: 'A does n + n = 2n → O(n). B runs the inner n times for each outer pass: n · n. The counting rules of 2.1, pricing structure.' },
            { t: 'Both O(n²) — two loops each', ok: false, mis: 'loop-count-fallacy', why: 'The NUMBER of loops is irrelevant; their COMPOSITION is everything. Ten sequential loops are still O(n); two nested ones are O(n²).' },
            { t: 'A: O(2n), B: O(n²) — count both passes', ok: false, why: 'O(2n) is O(n) — see the constants rule. Half credit for the right instinct on B.' }
          ],
          hints: ['Sequential = sum rule. Nested = product rule.', 'n + n vs n × n.']
        },
        {
          type: 'mcq',
          prompt: `Per the formal definition, why is 100n NOT O(log n), even with a giant c?`,
          options: [
            { t: 'No constant c makes c·log n stay above 100n forever — linear eventually beats any scaled log', ok: true, why: 'For any c, 100n > c·log n for all large n (n/log n → ∞). The ∀n ≥ n₀ clause is merciless: a bound must hold forever, not merely for a while.' },
            { t: 'Because 100 is too large a constant', ok: false, mis: 'constant-fixation', why: 'Constants are exactly what the definition forgives — on BOTH sides. The obstruction is the shapes: n outgrows log n by an unbounded factor.' },
            { t: 'It actually is O(log n) for large enough c', ok: false, why: 'Try c = 10⁶: at n = 10⁸, c·log₂ n ≈ 2.7×10⁷ but 100n = 10¹⁰. Any fixed c loses eventually — that is what ∀ means.' }
          ],
          hints: ['The definition demands ONE fixed c working for ALL large n.', 'What happens to the ratio 100n / log n as n → ∞?'],
          edge: 'Big-O is an upper-bound claim (≤ shape). The matching lower bound is Ω, and both together are Θ — vocabulary the algorithms course will formalize.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Reading big-O straight off code</h4>
<pre><code>for (let i = 1; i < n; i *= 2) work();     // i: 1,2,4,8… → O(log n)
for (let i = 0; i < n; i++)
  for (let j = i + 1; j < n; j++) cmp();   // C(n,2) pairs → O(n²)
arr.sort()                                  // library sort → O(n log n)</code></pre>
<p>Loop variable <em>doubling</em> = log. Nesting = multiply. All-pairs = the C(n,2) triangle from 2.2 — big-O is your counting toolkit applied to control flow.</p>
<h4>What the classes feel like at n = 10⁶ (~10⁸ simple ops/sec)</h4>
<div class="tbl-scroll"><table class="tt">
  <tr><th>Class</th><th>Ops</th><th>Wall clock</th></tr>
  <tr><td>log n</td><td>≈ 20</td><td>instant</td></tr>
  <tr><td>n</td><td>10⁶</td><td>~10 ms</td></tr>
  <tr><td>n log n</td><td>2×10⁷</td><td>~0.2 s</td></tr>
  <tr><td>n²</td><td>10¹²</td><td>~3 hours</td></tr>
  <tr><td>2ⁿ</td><td>—</td><td>never</td></tr>
</table></div>
<div class="callout"><p><b>The honest caveat:</b> big-O hides constants, and constants matter at small n — insertion sort (O(n²)) beats mergesort under ~30 elements, which is why production sorts hybridize. Big-O chooses the algorithm; profiling tunes it.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `<code>for (let i = 1; i < n; i *= 2) work();</code> — the class is…`,
          options: [
            { t: 'O(log n) — i doubles, so ~log₂ n iterations reach n', ok: true, why: 'i visits 1, 2, 4, …, and doubling k times reaches n at k = log₂ n. Multiplicative loop variables are the code smell — in the good sense — of logarithmic cost.' },
            { t: 'O(n) — the loop runs up to n', ok: false, mis: 'bound-vs-steps', why: 'The BOUND is n; the STEP COUNT is what big-O prices. i jumps exponentially, touching only ~log₂ n values on its way. Count iterations, not the finish line.' },
            { t: 'O(n/2) — it skips half the values', ok: false, why: 'It skips far more than half — it touches ~20 of a million. Doubling is not skipping-by-2 (that would be n/2 → O(n)); it is exponential leaping.' }
          ],
          hints: ['List the values i takes for n = 64.', '1, 2, 4, 8, 16, 32 — six values. And log₂ 64 = ?'],
          edge: 'The mirror image i /= 2 is also O(log n) — and it is the loop inside binary search, heaps, and every "keep halving" algorithm.'
        },
        {
          type: 'mcq',
          prompt: `Your O(n²) duplicate-checker is fine in tests (n = 100) and times out in production (n = 10⁶). The realistic fix is…`,
          options: [
            { t: 'A hash-set pass — O(n) expected, one lookup per item', ok: true, why: 'seen.has(x) is O(1) expected (Track 1.6 meets hashing), making the scan linear: 10⁶ ops instead of 10¹²/2 comparisons. Class change, not constant change.' },
            { t: 'Move to a faster server', ok: false, mis: 'constant-fixation', why: '10× hardware turns 3 hours into 18 minutes — still 5 orders of magnitude off the linear version’s 10 ms. Exponents don’t negotiate with hardware.' },
            { t: 'Micro-optimize the comparison function', ok: false, why: 'Shaving the constant on 5×10¹¹ comparisons still leaves ~10¹¹ work. When the class is wrong, the constant is a rounding error.' }
          ],
          hints: ['Is the problem the cost per comparison, or the NUMBER of comparisons?', 'What data structure answers "have I seen this?" in O(1)?'],
          edge: 'The general pattern: n² from "compare all pairs" usually collapses to n (hash) or n log n (sort first) — the two standard escapes.'
        },
        {
          type: 'mcq',
          prompt: `Insertion sort is O(n²), mergesort O(n log n) — yet production sorts run insertion sort on chunks under ~30 elements. Why is this sane?`,
          options: [
            { t: 'Big-O speaks only for large n; at tiny n, insertion sort’s small constants win', ok: true, why: 'The definition’s n₀ is doing real work: below the crossover, the hidden constants dominate and the "worse" class is faster. Hybrid sorts (Timsort et al.) exploit exactly this.' },
            { t: 'Big-O analysis was wrong about insertion sort', ok: false, mis: 'bigo-is-sloppy', why: 'The analysis is correct AND silent about small n — that silence is designed in. No contradiction: different questions, different answers.' },
            { t: 'Mergesort has a bug below 30 elements', ok: false, why: 'Mergesort is flawless at any size — merely slower there: its recursion overhead outweighs its asymptotic edge on 30 items.' }
          ],
          hints: ['Where in the formal definition does small n get excused?', 'The ∀n ≥ n₀ clause. What rules below n₀?'],
          edge: 'The complete engineering method: big-O to choose the algorithm family, profiling to place the crossovers. Either one alone misleads.'
        }
      ]
    }
  }
};
