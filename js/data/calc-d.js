/* Track 4 content — nodes 4.7, 4.8 and the Optimizer boss */

/* ============ 4.7 INTEGRATION ============ */
window.NODES['calc.integration'] = {
  id: 'calc.integration', num: '4.7', trackId: 'calculus',
  title: 'Integration',
  minutes: 35,
  payoff: 'accumulation · areas · totals from rates',
  levels: {

    l1: {
      widget: 'riemann',
      html: `
<h4>Adding up infinitely many tiny pieces</h4>
<p>Your car's speedometer readings for one hour — can you recover the distance traveled? Yes: distance = speed × time, piece by piece. Drive 60 km/h for the first half hour: 30 km. Then 80 km/h: 40 km. Total: 70 km. You just <em>accumulated</em> a rate into a total.</p>
<p>If the speed changes smoothly, chop time into tiny slices, multiply each slice, and add. Finer slices → better answer. The limit of this process (there is 4.2 again!) is the <span class="term">integral</span> (التكامل): the exact accumulated total.</p>
<p>On a graph, each slice is a thin rectangle under the curve — so the integral is the <b>area under the curve</b>.</p>
<div class="callout amber"><p><b>Stack rectangles below:</b> under f(x) = x² from 0 to 2. With 6 rectangles the sum is rough; slide to 60 and watch it close in on the true area 8/3 ≈ 2.667. You are watching a limit compute an area.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Drive 60 km/h for 0.5h, then 80 km/h for 0.5h. Total distance — and what did you just do, in this node's language?`,
          options: [
            { t: '70 km — you accumulated a rate over time: a simple integral (two big slices)', ok: true, why: '30 + 40 = 70. Rate × time-slice, summed. Integration is exactly this, with the slices shrunk to nothing for smoothly-changing rates.' },
            { t: '140 km — add the speeds', ok: false, mis: 'rate-vs-total', why: '60 + 80 = 140 has units km/h — a speed, not a distance! Each speed must be multiplied by ITS time before adding. Units catch the error instantly.' },
            { t: '70 km/h — the average', ok: false, why: 'The average speed is 70 km/h, true — but the question asks distance (70 km). Rate, total, and average are three different animals; integration connects them.' }
          ],
          hints: ['Each block: speed × its time.', '60×0.5 and 80×0.5, then add.']
        },
        {
          type: 'mcq',
          prompt: `In the widget, what happens to the rectangle-sum as you raise n (more, thinner rectangles)?`,
          options: [
            { t: 'It climbs toward the true area 8/3 — the error is the small missed corners, and thinner rectangles miss less', ok: true, why: 'Each rectangle undershoots by a sliver near the curve (this "left sum" sits under an increasing curve). More rectangles → smaller slivers → the sum converges. The integral IS this limit.' },
            { t: 'It grows forever — more rectangles, more area', ok: false, mis: 'more-pieces-more-area', why: 'More rectangles are also THINNER — count up, width down, product stable. The total approaches a fixed target; watch the number settle in the widget.' },
            { t: 'Nothing — rectangles are rectangles', ok: false, why: 'The sum visibly changes: 6 rectangles give ≈ 2.22, 60 give ≈ 2.62, exact is 2.667. Thinness buys accuracy — that is the whole story of Riemann sums.' }
          ],
          hints: ['Where exactly is the error in each rectangle?', 'The gap between the flat top and the rising curve — what shrinks it?'],
          edge: 'Same idea in code: numerical integration libraries just use smarter slice shapes (trapezoids, parabolas) to shrink the error faster.'
        },
        {
          type: 'mcq',
          prompt: `Which of these is an integral wearing everyday clothes?`,
          options: [
            { t: 'All of the others', ok: true, why: 'Battery charge = accumulated current. Rainfall total = accumulated rain-rate. Data downloaded = accumulated bandwidth. Every "total of a changing rate" is an integral — most of them computed by your devices right now.' },
            { t: 'Total rainfall today from the changing rain-rate', ok: false, why: 'Yes — rain-rate accumulated over hours. But look at the other options too…' },
            { t: 'Battery % from the changing charging current', ok: false, why: 'Yes — current accumulated over time. Check the remaining options…' },
            { t: 'GB downloaded from your changing internet speed', ok: false, why: 'Yes — speed accumulated over the download. All the options qualify.' }
          ],
          hints: ['Integral = total built up from a rate.', 'Which options fit "rate × tiny time, summed"? Count them.']
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Notation and the main theorem</h4>
<pre><code>∫ₐᵇ f(x) dx     "the area under f from a to b"
                (the ∫ is a stretched S — for Sum; dx is the tiny width)</code></pre>
<p><b>The Fundamental Theorem of Calculus (FTC):</b> integration and differentiation are inverse operations — like log and exponential, like + and −:</p>
<pre><code>∫ₐᵇ f(x) dx = F(b) − F(a)     where F is any function with F′ = f
                               (F is called an antiderivative — دالة أصلية)</code></pre>
<p>Read it slowly: to add up infinitely many slivers of f, you do NOT need to add anything. Find a function whose slope is f, and subtract two of its values. Infinite work collapses into one subtraction — arguably the most surprising useful fact in mathematics.</p>
<h4>Worked</h4>
<pre><code>∫₀¹ 2x dx:   F(x) = x²  (check: F′ = 2x ✓)   →   F(1) − F(0) = 1 − 0 = 1
∫₀² x² dx:   F(x) = x³/3  (check: F′ = x² ✓)  →   8/3 − 0 = 8/3  ✓ (the widget's target!)</code></pre>
<h4>Reversed power rule</h4>
<p>To integrate xⁿ: raise the power, divide by the new power → xⁿ⁺¹/(n+1). The derivative's power rule, run backward.</p>`,
      questions: [
        {
          type: 'input',
          prompt: `∫₀¹ 2x dx = ?`,
          accept: ['1'],
          placeholder: '…',
          hints: ['Find F with F′ = 2x.', 'F(x) = x². Now F(1) − F(0).'],
          why: 'x² evaluated: 1 − 0 = 1. (Geometry check: the region is a triangle with base 1, height 2 — area ½·1·2 = 1 ✓.)'
        },
        {
          type: 'mcq',
          prompt: `The FTC says ∫ₐᵇ f dx = F(b) − F(a) with F′ = f. In plain words, why is this AMAZING?`,
          options: [
            { t: 'An infinite summing process is answered by one subtraction — provided you can "un-differentiate" f', ok: true, why: 'The left side is a limit of ever-finer rectangle sums (hard, infinite). The right side is two evaluations and a minus (trivial). The theorem trades infinite arithmetic for one reversed derivative. That trade built the modern world’s engineering.' },
            { t: 'It shows areas are always positive', ok: false, why: 'Actually integrals can be negative (curve below the axis counts negative — signed area). The wonder is elsewhere: the infinite-to-finite collapse.' },
            { t: 'It defines what area means', ok: false, why: 'The rectangle-limit defines area; the FTC gives a shortcut for COMPUTING it. Definition and computation are different gifts — the FTC is the second.' }
          ],
          hints: ['Compare the work on each side of the equation.', 'Infinite slices vs. F(b) − F(a). What made the collapse possible?'],
          edge: 'Why it is true, in one breath: the area-so-far function A(x) grows at rate f(x) — adding a sliver of width dx adds f(x)·dx of area. So A′ = f: area is an antiderivative. Everything follows.'
        },
        {
          type: 'mcq',
          prompt: `∫₁³ x² dx = ?`,
          options: [
            { t: '26/3 — F(x) = x³/3, so 27/3 − 1/3', ok: true, why: 'Reversed power rule, then subtract: F(3) − F(1) = 9 − 1/3 = 26/3 ≈ 8.67. Note the lower limit is 1 here — both ends matter.' },
            { t: '9 — just F(3)', ok: false, mis: 'lower-limit-forgotten', why: 'F(3) alone measures area from 0 (well, from wherever F is zero). The integral from 1 must SUBTRACT the part before 1: F(3) − F(1). Two limits, two evaluations, always.' },
            { t: '6x — integrate means differentiate twice', ok: false, why: 'Integration runs the derivative BACKWARD (power up, divide), not forward twice. 6x is f″, a different direction entirely.' }
          ],
          hints: ['Antiderivative of x²?', 'x³/3 — evaluate at 3 and at 1, subtract.'],
          edge: 'The habit that prevents the classic slip: always write "F(b) − F(a)" with both numbers visible before computing anything.'
        },
        {
          type: 'mcq',
          prompt: `Your car's speed graph v(t) for a trip. What does ∫₀ᵀ v(t) dt compute, and what does v′(t) compute — respectively?`,
          options: [
            { t: 'The distance traveled (accumulated speed), and the acceleration (rate of change of speed)', ok: true, why: 'Integral goes UP the ladder (speed → distance); derivative goes DOWN it (speed → acceleration). Position, velocity, acceleration form a ladder with ∫ and d/dx as the up/down staircases — the FTC says the staircases undo each other.' },
            { t: 'Both give the distance', ok: false, mis: 'integral-derivative-swap', why: 'v′ is how quickly the SPEED changes — pressing the pedal, not covering ground. Accumulate to totalize, differentiate to sensitize: opposite directions.' },
            { t: 'The average speed, and the top speed', ok: false, why: 'Close cousins live nearby (average speed = integral ÷ T; top speed = a maximum, 4.5) — but the direct meanings are distance and acceleration.' }
          ],
          hints: ['Integral of a rate = ? Derivative of a rate = ?', 'Total, and rate-of-the-rate.'],
          edge: 'The ladder in tech: battery charge ↔ current ↔ current-change; position ↔ velocity ↔ acceleration (your phone’s accelerometer literally integrates twice to guess movement).'
        },
        {
          type: 'mcq',
          prompt: `A curve dips BELOW the x-axis on part of [a, b]. The integral over that part is…`,
          options: [
            { t: 'Negative — the integral adds signed slivers, and f(x)·dx is negative where f is negative', ok: true, why: 'The integral is a sum of f(x)·dx values, not of |areas|. Below-axis parts subtract. (Want total ink-area? Integrate |f| — a deliberate, different question.)' },
            { t: 'Zero — area cannot be negative', ok: false, mis: 'area-always-positive', why: 'GEOMETRIC area cannot, but the integral is signed accumulation: spending (negative rate) reduces a bank balance. The sign carries meaning — deleting it breaks the speed-to-distance story for backward driving!' },
            { t: 'Whatever it is, plus — signs get dropped', ok: false, why: 'Nothing gets dropped: ∫₀^{2π} sin = 0 precisely because the positive hump cancels the negative one. The cancellation is a feature you will use.' }
          ],
          hints: ['Each sliver contributes f(x)·dx. What if f(x) < 0?', 'Negative contribution. What do those do to a sum?'],
          edge: 'Signed accumulation is the honest model of most totals: net profit (losses subtract), net charge, net displacement (walking back subtracts). "Area" is just the picture.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Integrals your code already computes</h4>
<pre><code>// numeric integration — the widget's rectangles, as a function:
const integrate = (f, a, b, n = 1000) => {
  let sum = 0, w = (b - a) / n;
  for (let i = 0; i < n; i++) sum += f(a + (i + 0.5) * w) * w;  // midpoint rule
  return sum;
};
integrate(x => x * x, 0, 2)   // → 2.66666… ≈ 8/3 ✓</code></pre>
<ul>
  <li><b>Games/physics:</b> every frame does <code>pos += vel * dt</code> — integrating velocity, one slice per frame (that dt from 3.1 was a Riemann sliver all along).</li>
  <li><b>Monitoring:</b> "total requests today" from a requests-per-second graph = the area under it. Dashboards shade it for a reason.</li>
  <li><b>Batteries, billing, carbon:</b> mAh, kWh, GB-months — all integral units: a rate × time, accumulated.</li>
</ul>
<p><b>When to go numeric vs symbolic:</b> the FTC needs an antiderivative formula — many real f's have none (famously e^(−x²)). Numeric slicing always works, at the price of approximation. Know both tools; choose by the problem.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A game runs <code>pos += vel * dt</code> each frame. A physicist watching says "that's integration". Exactly what integral, and what is the error source?`,
          options: [
            { t: 'A Riemann sum of velocity over time with slice width dt — the error is the finite slice size (velocity changes WITHIN a frame)', ok: true, why: 'Each frame adds one rectangle vel·dt; the true motion is the limit dt → 0. The gap is why fast-spinning objects "tunnel" through walls at low frame rates — the physics of missed slivers. Smaller dt (or smarter integrators) shrink it.' },
            { t: 'An exact integral — computers don’t approximate', ok: false, mis: 'exact-vs-limit', why: 'It is one rectangle per frame — the n = 60-per-second version of the widget at n = 6. Games are visibly approximate integrators; that is why physics engines offer "substeps".' },
            { t: 'Not an integral — games are not math', ok: false, why: 'It is the most-run integral on Earth — billions of devices, 60 times a second. Recognizing math inside plain code is the entire point of this lab.' }
          ],
          hints: ['Compare the code with the rectangle-sum picture.', 'One frame = one rectangle of width dt. What did the widget say about wide rectangles?'],
          edge: 'The upgrade path has names: Euler (this), then Verlet / RK4 — smarter slice shapes, same accumulation idea. Game-physics literature is applied 4.7.'
        },
        {
          type: 'mcq',
          prompt: `A server chart shows requests/second over 24h. The team needs "total requests today" but only has the chart. The answer is…`,
          options: [
            { t: 'The area under the curve — integrate the rate; e.g. a steady 50 req/s for a day ≈ 4.3 million requests', ok: true, why: 'Total = ∫ rate dt. Sanity math: 50 × 86,400 s = 4.32M. Monitoring tools compute exactly this behind "sum over period" — the FTC ladder (rate ↔ total) is the core abstraction of observability.' },
            { t: 'The peak of the curve × 24 hours', ok: false, mis: 'peak-vs-area', why: 'That computes the worst-case-if-always-peak — useful for capacity planning, wrong for totals (it overcounts every non-peak second). Peak and area answer different questions; dashboards need both.' },
            { t: 'Impossible without per-request logs', ok: false, why: 'The rate curve IS enough (up to chart resolution) — that is the accumulation direction of the FTC. Logs re-derive the same area the slow way.' }
          ],
          hints: ['Total from a rate — which operation?', 'Area under the curve. Estimate: average height × width.'],
          edge: 'The reverse reading is just as useful: the DERIVATIVE of the "total requests" counter is the rate chart. Every metrics system exposes both directions (rate() and sum() in monitoring query languages).'
        },
        {
          type: 'mcq',
          prompt: `You need ∫₀¹ e^(−x²) dx for a statistics feature. You search for the antiderivative formula… and find there is NONE. What now?`,
          options: [
            { t: 'Integrate numerically — the rectangle/midpoint machinery works on ANY continuous f, formula or not (answer ≈ 0.7468)', ok: true, why: 'e^(−x²) provably has no elementary antiderivative — the FTC shortcut is closed, but the DEFINITION (limit of sums) still computes fine. This exact integral powers the normal distribution in every stats library, always numerically.' },
            { t: 'The integral does not exist', ok: false, mis: 'no-formula-no-integral', why: 'The AREA plainly exists (draw it!) — what is missing is a closed-form FORMULA for it. Existence and expressibility are different things: a deep and practical distinction.' },
            { t: 'Approximate e^(−x²) ≈ 1 and integrate that', ok: false, why: 'A ~25% error, silently. Numeric integration achieves 12 correct digits for the same effort — never hand-wave when the honest tool is three lines (see L3 code).' }
          ],
          hints: ['Which of your two integration tools needs a formula, and which does not?', 'FTC needs F; slicing needs only f-values.'],
          edge: 'stats libraries name this one erf(x) and tabulate it numerically. Many famous functions (erf, Bessel, elliptic…) are "integrals without formulas", promoted to first-class citizens.'
        }
      ]
    }
  }
};

/* ============ 4.8 SERIES & APPROXIMATION ============ */
window.NODES['calc.series'] = {
  id: 'calc.series', num: '4.8', trackId: 'calculus',
  title: 'Series & Approximation',
  minutes: 35,
  payoff: 'amortized analysis · float approximation',
  levels: {

    l1: {
      html: `
<h4>Adding forever — and getting a finite answer</h4>
<p>Take a cake. Eat half. Then half of what remains. Then half of THAT. Forever. How much do you eat in total?</p>
<pre><code>1/2 + 1/4 + 1/8 + 1/16 + …  =  1        (the whole cake — never more)</code></pre>
<p>An infinite list of numbers added up is a <span class="term">series</span> (متسلسلة). The magic: if the pieces shrink fast enough, the infinite sum settles on a finite value — it <span class="term">converges</span> (يتقارب). This is the wall-walk from 4.2, wearing sum-clothes: partial sums 0.5, 0.75, 0.875… approach the limit 1.</p>
<div class="callout amber"><p><b>The shrinking-fast-enough rule matters.</b> The pieces going to zero is NOT enough: 1/2 + 1/3 + 1/4 + 1/5 + … (pieces → 0!) grows past every number — slowly, but forever. Shrinking must be fast; halving is fast.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Eat half the cake, then half the rest, forever. Total eaten?`,
          options: [
            { t: 'Exactly 1 cake (in the limit) — each bite halves what remains, and the remainder shrinks to zero', ok: true, why: 'After n bites, remaining = (1/2)ⁿ → 0. Eaten = 1 − (1/2)ⁿ → 1. The infinite sum equals the limit of the partial sums — 4.2 doing arithmetic.' },
            { t: 'Infinite — infinitely many bites must add up to infinity', ok: false, mis: 'infinite-terms-infinite-sum', why: 'The most natural wrong instinct in this track! Infinitely many SHRINKING pieces can total something finite — the cake picture makes it undeniable: you never eat cake that isn’t there.' },
            { t: 'About 0.9 — you never finish, so less than 1', ok: false, why: 'You pass 0.9 at bite 4 and 0.99 at bite 7 — no number below 1 survives as the answer. "Never finish" and "the limit is 1" live together happily (the wall-walk lesson).' }
          ],
          hints: ['Track what REMAINS: 1/2, 1/4, 1/8, …', 'Remaining → 0, so eaten → ?']
        },
        {
          type: 'mcq',
          prompt: `0.9999… (nines forever) — what number is it?`,
          options: [
            { t: 'Exactly 1 — it is the series 9/10 + 9/100 + … whose partial sums approach 1 and nothing else', ok: true, why: 'The notation MEANS the limit of 0.9, 0.99, 0.999… — and that limit is 1 (the gap 1/10ⁿ → 0). Not "close to 1": equal, the way 1/2 and 0.5 are equal. Infinite decimals ARE series.' },
            { t: 'The biggest number just below 1', ok: false, mis: 'infinitesimal-gap', why: 'No such number exists in ℝ! Any x < 1 gets passed by the 9s eventually (at the ⌈log₁₀⌉-th nine). The "tiny gap" intuition names a gap of size 0 — which is no gap.' },
            { t: 'Depends on where you stop', ok: false, why: 'The "…" means you never stop — the value is defined as the limit of the whole journey, and that is a single number: 1.' }
          ],
          hints: ['What is 1 − 0.999…9 (n nines)?', '1/10ⁿ. What does it approach?'],
          edge: 'A cousin lives in your computer: 0.1 in binary is an infinite repeating series — floats cut it off, which is why 0.1 + 0.2 ≠ 0.3 exactly. L3 continues this story.'
        },
        {
          type: 'mcq',
          prompt: `The pieces 1/2, 1/3, 1/4, 1/5, … also shrink to zero. Does THEIR sum converge like the halving series?`,
          options: [
            { t: 'No — this "harmonic series" grows past every bound, just very slowly. Shrinking to zero is necessary but not sufficient', ok: true, why: 'Group it: 1/3+1/4 > 1/2; 1/5+…+1/8 > 1/2; each doubling-block adds another 1/2 — forever. Pieces → 0 yet sum → ∞. The halving series shrinks GEOMETRICALLY; harmonic shrinks too lazily.' },
            { t: 'Yes — shrinking pieces always converge', ok: false, mis: 'shrinking-implies-converge', why: 'The harmonic series is the eternal counterexample (مثال مضاد). Convergence needs shrinking FAST (like a geometric ratio); merely shrinking is not a promise.' },
            { t: 'It converges to about 2.7', ok: false, why: 'Partial sums pass 2.7 around n = 8 and keep going (they pass 10 near n = 12,000). Slow growth fools eyeball tests — the grouping proof is what settles it.' }
          ],
          hints: ['Try grouping terms in blocks that each total more than 1/2.', '1/3+1/4 ≥ ? And 1/5+1/6+1/7+1/8 ≥ ?'],
          edge: 'This distinction is exam-famous AND production-famous: response-time tails, retry storms, and coupon-collector waits are harmonic-flavored — they grow like log n, slowly but unboundedly.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The geometric series — the one to know cold</h4>
<pre><code>a + ar + ar² + ar³ + …  =  a / (1 − r)      when |r| < 1
1 + 1/2 + 1/4 + …  =  1/(1 − 1/2)  =  2
1 + 0.9 + 0.81 + …  =  1/(1 − 0.9)  =  10</code></pre>
<p>Why: the partial sum is Sₙ = a(1 − rⁿ)/(1 − r), and rⁿ → 0 when |r| &lt; 1 (Track 4.1's decay). When |r| ≥ 1 the pieces refuse to shrink — divergence.</p>
<p>Feel the sensitivity: r = 0.9 sums to 10, r = 0.99 sums to 100. As r approaches 1, the sum explodes — the boundary between converge and diverge is a cliff, not a slope.</p>
<h4>Approximating functions with polynomial series (the Taylor idea — فكرة تايلور)</h4>
<pre><code>eˣ = 1 + x + x²/2 + x³/6 + …        sin x = x − x³/6 + x⁵/120 − …</code></pre>
<p>Hard functions can be rebuilt as infinite polynomials. Cut the series after a few terms → a polynomial approximation, excellent near x = 0. This is HOW calculators and math libraries compute sin, cos, eˣ — polynomials are all a CPU can actually do (add, multiply).</p>`,
      questions: [
        {
          type: 'input',
          prompt: `1 + 1/3 + 1/9 + 1/27 + … = ? (geometric, r = 1/3 — answer as a decimal or fraction)`,
          accept: ['1.5', '3/2', '1,5'],
          placeholder: '…',
          hints: ['a/(1 − r) with a = 1, r = 1/3.', '1 / (2/3).'],
          why: '1/(1 − 1/3) = 3/2. One formula, instant answer — the geometric series is the workhorse of infinite sums.'
        },
        {
          type: 'mcq',
          prompt: `Why does a + ar + ar² + … require |r| < 1 to converge?`,
          options: [
            { t: 'The partial sum is a(1 − rⁿ)/(1 − r), and only |r| < 1 makes rⁿ → 0 — otherwise the pieces never stop mattering', ok: true, why: 'The formula holds for any finite n; taking n → ∞ needs rⁿ to die (4.1: geometric decay). |r| ≥ 1 means pieces stay big (or grow) — a sum of non-shrinking pieces cannot settle.' },
            { t: 'Because negative r is not allowed', ok: false, why: 'Negative r is fine (alternating series): r = −1/2 gives 1 − 1/2 + 1/4 − … = 2/3 ✓. The condition is on |r| — the SIZE of the ratio, not its sign.' },
            { t: 'Convention, to keep formulas simple', ok: false, mis: 'convention-dodge', why: 'Try r = 1: 1+1+1+… plainly explodes. The condition is where the mathematics genuinely breaks, not where notation prefers to stop.' }
          ],
          hints: ['Write the finite sum formula and ask: what must happen as n → ∞?', 'The rⁿ term must vanish. When does it?'],
          edge: 'At exactly r = 1 the formula divides by zero AND the series diverges — the algebra and the analysis agree about the cliff edge. They usually do.'
        },
        {
          type: 'mcq',
          prompt: `Your calculator computes sin(0.1) as 0.1 − 0.1³/6 = 0.09983333… How wrong can it be?`,
          options: [
            { t: 'At most about the next term, 0.1⁵/120 ≈ 8×10⁻⁸ — cutting an alternating shrinking series errs by less than the first cut term', ok: true, why: 'For alternating series with shrinking terms, the truncation error is bounded by the first omitted term — a rare gift: the error estimate is free. Two terms of the series already give sin(0.1) to 7 digits.' },
            { t: 'Unknowably wrong — approximations are gambles', ok: false, mis: 'approx-unbounded', why: 'The whole discipline of numerical analysis is BOUNDING errors. Series truncation comes with error certificates — this is engineering, not hoping.' },
            { t: 'Exactly right — the formula IS sin', ok: false, why: 'The full INFINITE series is sin; the calculator cut it after two terms. Cut series are approximations — excellent ones near 0, with known error, but approximations.' }
          ],
          hints: ['What was the first term thrown away?', 'x⁵/120 at x = 0.1 — how big is that?'],
          edge: 'This is genuinely how libm computes sin/cos/exp: a polynomial of degree ~7–13, valid on a small range, plus range-reduction tricks. Series ARE the implementation.'
        },
        {
          type: 'mcq',
          prompt: `A bouncing ball falls 1m, and each bounce reaches 60% of the previous height. Total distance traveled (falls + rises), in the limit?`,
          options: [
            { t: '4m — down: 1/(1−0.6) = 2.5m; up: 1.5m (the same series minus the first fall); total 4m', ok: true, why: 'Two geometric series: falls are 1 + 0.6 + 0.36 + … = 2.5; rises are 0.6 + 0.36 + … = 1.5. Total 4. Infinitely many bounces, finite path — and finite time too, which is why the ball audibly STOPS.' },
            { t: 'Infinite — it bounces forever', ok: false, mis: 'infinite-terms-infinite-sum', why: 'Infinitely many shrinking bounces = the cake again. The geometric sum tames it: 4 meters, not one meter more. (The bounce COUNT is infinite; the DISTANCE is not.)' },
            { t: '1.6m — the fall plus one bounce', ok: false, why: 'That truncates after two terms of an infinite journey — the remaining bounces add a full 2.4m more. Series make "all the rest" computable instead of ignorable.' }
          ],
          hints: ['Split into the falls series and the rises series.', 'Each is geometric with r = 0.6 — apply a/(1−r) twice.'],
          edge: 'The same two-series pattern prices "retry with 60% backoff", total ad-revenue decay, drug half-lives — any repeated-fraction process. Physics homework, production math.'
        },
        {
          type: 'mcq',
          prompt: `r = 0.9 sums to 10; r = 0.99 sums to 100; r = 0.999 → 1000. An engineer says "my feedback loop's r is about 0.99-ish, so the total effect is roughly…"`,
          options: [
            { t: '"…dangerously sensitive: between r = 0.98 and 0.998 the total swings from 50 to 500 — I need the exact r, not a vibe"', ok: true, why: '1/(1−r) has a pole at r = 1: near it, tiny r-changes explode the sum. Systems with feedback ratios near 1 (viral loops, retry storms, resonance) live on this cliff — "about 0.99" is not a measurement, it is a hazard.' },
            { t: '"…about 100, plus or minus a little"', ok: false, mis: 'linear-intuition-near-pole', why: 'Linear thinking near a pole: the ±"little" in r is ×/÷ "a lot" in the sum. 1/(1−r) magnifies uncertainty unboundedly as r → 1. Error bars must ride THROUGH the formula (4.3’s sensitivity!), not be pasted on after.' },
            { t: '"…infinite, since 0.99 is basically 1"', ok: false, why: '0.99 is measurably not 1 — the sum is exactly 100, finite. Rounding r to 1 jumps the cliff in the other direction. Near-poles punish both kinds of sloppiness.' }
          ],
          hints: ['Compute 1/(1−r) at r = 0.98, 0.99, 0.998.', '50, 100, 500 — from ±1% wiggles in r.'],
          edge: 'The sensitivity |d/dr of the sum| = 1/(1−r)² — the derivative (4.3) of the series formula (4.8) diagnosing feedback systems. The Optimizer track, converging on itself.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>The amortized-analysis classic: array doubling</h4>
<pre><code>// a dynamic array doubles capacity when full: 1, 2, 4, 8, … slots
// pushing n items: how much total copying?
copies = 1 + 2 + 4 + … + n/2 + n  <  2n        (a geometric sum, read backward!)</code></pre>
<p>Total work &lt; 2n for n pushes → <b>O(1) "amortized" per push</b>. The scary occasional full-copy is paid for by the geometric sum staying under 2n. This argument is why <code>push()</code> in JS/Python/Java is "practically constant time" — and it is the 4.8 geometric series doing complexity analysis (Track 2.4, meet Track 4.8).</p>
<h4>Floats are truncated series</h4>
<pre><code>0.1  =  0.0001100110011…₂  (binary: an INFINITE repeating series)
float64 keeps 52 binary digits → truncation error ≈ 5.5×10⁻¹⁸
0.1 + 0.2 === 0.3   // false — two truncations meet a third</code></pre>
<p>Every float is a cut-off series; every float operation re-truncates. The errors are tiny and BOUNDED (series tail estimates!) — which is why numerics works at all, and why comparing floats needs a tolerance ε rather than ===.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Pushing n items into a doubling array costs less than 2n total copies. Which series fact is the proof?`,
          options: [
            { t: 'The copy costs 1 + 2 + 4 + … + n form a geometric sum, and such a sum is less than twice its largest term', ok: true, why: 'Each doubling copies the current size; the sizes are geometric. Sum ≈ 2·(last term) — so total < 2n. "Occasionally expensive" becomes "cheap on average" by exactly this bound: amortized analysis IS series analysis.' },
            { t: 'Computers copy quickly', ok: false, why: 'Speed changes constants; the claim is structural — the COUNT of copies is bounded by 2n, on any hardware. That is why the API can promise amortized O(1) in its documentation.' },
            { t: 'It only works when n is a power of two', ok: false, why: 'Other n just stop mid-way to the next doubling — the bound holds a fortiori (less copying happened). The geometric bound is robust to where you stop; that robustness is the point.' }
          ],
          hints: ['List the copy events for n = 16: copies of size 1, 2, 4, 8, 16.', 'Sum them; compare with 2×16.'],
          edge: 'The same "geometric sums are dominated by their last term" fact prices: doubling backoff totals, halving binary-search work, and mergesort’s level sums. One inequality, four algorithms.'
        },
        {
          type: 'mcq',
          prompt: `<code>0.1 + 0.2 === 0.3</code> is false. The series-level explanation:`,
          options: [
            { t: '0.1 and 0.2 are infinite repeating series in binary, truncated at 52 bits; their sum’s tiny truncation errors land on a different 52-bit value than 0.3’s own truncation', ok: true, why: 'Three numbers, three independent series-cuts — the cuts disagree by ~4×10⁻¹⁷. Nothing is broken: it is 4.8 truncation arithmetic, fully predictable. The fix is an ε-comparison: |a−b| < 1e-9 (a limit-style tolerance, 4.2!).' },
            { t: 'JavaScript is bad at math', ok: false, mis: 'language-blame', why: 'Every IEEE-754 language — Python, C, Rust, Java — answers identically (try it). The behavior is the ARITHMETIC standard, not the language. Blame enables no fix; understanding enables ε-comparison.' },
            { t: 'The computer ran out of memory for the digits', ok: false, why: 'It is not resource exhaustion — 52 bits is a deliberate fixed format. Infinite series simply do not fit in finite formats, ever, by counting (Track 2!). Truncation is a design decision with documented error bounds.' }
          ],
          hints: ['Is 0.1 exactly representable in binary? What kind of object is its binary expansion?', 'An infinite repeating series — and floats store finitely many terms.'],
          edge: 'Decimal types (like Python’s decimal, SQL DECIMAL) dodge THIS example by using base-10 series — then hit the same wall at 1/3. Choosing a base chooses which series truncate; none escape truncation.'
        },
        {
          type: 'mcq',
          prompt: `An engineer replaces Math.exp(x) in a hot loop with 1 + x + x²/2 (three series terms), for x ∈ [−0.1, 0.1]. Wise?`,
          options: [
            { t: 'Reasonable IF the error budget allows ~x³/6 ≈ 1.7×10⁻⁴ worst case — cut series are legitimate fast paths when the error is computed, not hoped', ok: true, why: 'On this small range the next term bounds the error: |x|³/6 ≤ 1.67×10⁻⁴. If the application tolerates 10⁻³, ship it (and comment the bound!). Approximation with certificates is engineering; approximation without them is gambling.' },
            { t: 'Never — always use the library function', ok: false, why: '"Always" ignores real cases: shaders, embedded chips, and inner loops routinely use truncated series (the library itself is one, remember!). The discipline is the error bound, not the brand of the function.' },
            { t: 'Fine for ANY x — three terms is plenty', ok: false, mis: 'range-forgotten', why: 'At x = 3 the cut series gives 8.5 vs the true e³ ≈ 20.1 — 58% error! Series approximations are LOCAL creatures (great near 0, wild far away). The range restriction is not a footnote; it is the license.' }
          ],
          hints: ['What is the first omitted term, and how big can it get on the allowed range?', 'x³/6 at |x| = 0.1. Then re-ask at x = 3.'],
          edge: 'Full professional version: minimax polynomials (slightly better than raw Taylor cuts), plus range reduction to pull every x into the sweet zone. That is the whole architecture of libm — and of this node.'
        }
      ]
    }
  }
};

/* ============ BOSS: TUNE THE MACHINE (OPTIMIZER) ============ */
window.NODES['boss.optimizer'] = {
  id: 'boss.optimizer', num: '4.B', trackId: 'calculus', boss: true,
  title: 'BOSS — Tune the Machine',
  minutes: 25,
  payoff: 'Optimizer comes online',
  intro: `
<h4>System integration test</h4>
<p>The Optimizer waits — the machine's tuning layer. Five integration checks: growth reasoning, a limit, a derivative pipeline, a real optimization, and a descent run you must diagnose by eye.</p>
<div class="callout amber"><p><b>Boss rules:</b> five challenges, pass four. Win, and the whole lab inherits the easing curves you now understand.</p></div>`,
  levels: {
    boss: {
      passNeed: 4,
      questions: [
        {
          type: 'input',
          prompt: `<b>Integration 1 — the doubling audit.</b><br>A cache doubles its entry count every hour, starting at 1,000. It crashes past 1,000,000 entries. Hours until crash ≈ log₂(1000) ≈ ?`,
          accept: ['10'],
          placeholder: '…',
          hints: ['You need 1000 → 1,000,000: a ×1000 growth.', 'How many doublings make ×1000? 2¹⁰ ≈ 1000.'],
          why: '≈ 10 hours. Exponential processes cross any fixed limit in logarithmically few steps — the 4.1 alarm bell, ringing in production.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 2 — the settling loop.</b><br>An animation loop runs <code>x = (x + target) / 2</code> each frame (average toward target). In limit language, x…`,
          options: [
            { t: 'Converges to target — each frame halves the distance, a geometric approach to the limit', ok: true, why: 'distance_new = distance/2: the walk-to-the-wall (4.2) implemented. After 20 frames the gap is 2⁻²⁰ ≈ one millionth — visually arrived. This "lerp smoothing" runs in every camera-follow and UI ease.' },
            { t: 'Reaches target after exactly 2 frames', ok: false, why: 'Frame 1 covers HALF the gap, not all of it. The journey is infinite; the limit is what makes "arrives (visually)" true. Halving ≠ finishing — the entire lesson of limits.' },
            { t: 'Oscillates around the target forever', ok: false, mis: 'overshoot-assumed', why: 'Averaging never crosses the target (new x is always BETWEEN x and target) — monotone approach, no overshoot. Oscillation needs a step bigger than the gap (the α > 1 disease of 4.6, absent here).' }
          ],
          hints: ['Write the distance to target after one step.', 'It halves. What sequence is that, and where does it go?'],
          edge: 'This one-liner is the most-deployed limit on Earth: smooth cameras, audio fades, cursor easing. Its α-cousin x += (target−x)·k is 4.6 descent on f = (x−target)².'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 3 — the sensitivity pipeline.</b><br>Revenue R depends on speed s: R = f(s) with f′ = 2000 €/point. Speed depends on server count n: s = g(n) with g′ = 0.5 points/server. Adding one server is worth about…`,
          options: [
            { t: '1000 € — chain rule: dR/dn = f′·g′ = 2000 × 0.5', ok: true, why: 'A dependency chain: n → s → R. Multiply the local rates (4.4): 1000 €/server. Compare against the server’s cost and the business decision falls out of one multiplication. Units check: (€/point)(point/server) = €/server ✓.' },
            { t: '2000.5 € — add the rates', ok: false, mis: 'rates-add', why: 'The units refuse: €/point + points/server is not addable. Chained sensitivities multiply — the gears of 4.4, now with a budget attached.' },
            { t: 'Cannot combine business and engineering numbers', ok: false, why: 'Combining them is precisely what the chain rule is FOR — sensitivity flows through any chain of dependencies, departmental boundaries included.' }
          ],
          hints: ['Draw the chain: servers → speed → revenue.', 'One rate per arrow; multiply along the path.'],
          edge: 'Real orgs run long chains (infra → latency → conversion → revenue → valuation). Each team knows one local derivative; the chain rule is the meeting where they multiply.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 4 — the pricing valley.</b><br>Cost per unit at batch size b: C(b) = b + 100/b (storage grows with b, setup shrinks). The best batch size:`,
          options: [
            { t: 'b = 10 — C′ = 1 − 100/b² = 0 gives b² = 100; check C″ = 200/b³ > 0: a minimum, C(10) = 20', ok: true, why: 'The full 4.5 ritual: differentiate, solve, classify, evaluate. The two forces (linear up, hyperbolic down) balance exactly where their slopes cancel — a genuinely classic operations formula (economic batch size).' },
            { t: 'b as large as possible — bulk is always cheaper', ok: false, mis: 'monotone-assumed', why: 'The b-term (storage) grows without limit: C(100) = 101 vs C(10) = 20. Trade-off functions have valleys, not slides — that is WHY optimization exists. Compute, don’t chant slogans.' },
            { t: 'b = 100 — make the fraction term equal 1', ok: false, why: 'Making one TERM pretty is not a method. The minimum is where the DERIVATIVE vanishes: 1 = 100/b² → b = 10. (At b = 100: C = 101, five times worse.)' }
          ],
          hints: ['C′(b) = 1 − 100/b². Set to zero.', 'b² = 100, b > 0. Then confirm it is a valley and compute C there.'],
          edge: 'The shape x + k/x appears everywhere trade-offs do: batch sizes, cache sizes, connection pools. Its minimum at √k is worth recognizing on sight.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 5 — read the training chart.</b><br>Three loss curves from three runs:<br>(A) falls smoothly, flattens at 0.02. (B) zigzags downward, settles. (C) 2.1 → 0.9 → 3.4 → 11 → NaN. Diagnose all three.`,
          options: [
            { t: 'A: healthy α, arrived at a flat point. B: α slightly big — oscillating but converging. C: α too big — divergence (|factor| > 1) ending in float overflow', ok: true, why: 'The three regimes of 4.6, as they appear in real dashboards. A is the goal; B converges but wastes time (halve α); C needs α cut ~10× before anything else is worth trying. Chart-reading IS eigen/derivative literacy.' },
            { t: 'A is stuck, B is broken, C is exploring', ok: false, mis: 'chart-misread', why: 'Backwards on all three: flattening at low loss is ARRIVAL (gradient ≈ 0 — the 4.5 definition of done); mild zigzag CONVERGES; and "exploring" through NaN is divergence wearing optimism. The regimes have precise signatures — match them.' },
            { t: 'All three need more data', ok: false, why: 'Data changes what the minimum IS; these charts show how the walk TOWARD it behaves. Dynamics problems (step size) have dynamics fixes. Diagnose the walk before blaming the destination.' }
          ],
          hints: ['Map each curve to the three α regimes of 4.6.', 'Smooth-settle / zigzag-settle / grow-to-NaN — which α does each imply?'],
          edge: 'You now read the most common chart in machine learning on sight. The Optimizer approves — and the lab’s own animations are about to inherit its easing.'
        }
      ]
    }
  }
};
