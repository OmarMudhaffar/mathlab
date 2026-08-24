/* Track 4 content — nodes 4.5 and 4.6 */

/* ============ 4.5 OPTIMIZATION ============ */
window.NODES['calc.optimization'] = {
  id: 'calc.optimization', num: '4.5', trackId: 'calculus',
  title: 'Optimization',
  minutes: 35,
  payoff: 'best price · best design · cost functions',
  levels: {

    l1: {
      html: `
<h4>Tops of hills are flat</h4>
<p>You are climbing a hill in fog. How do you know you reached the top? Simple: the ground stops rising. At the very top, the ground is <b>flat</b> — one step in any direction goes down.</p>
<p>Functions work the same. At the highest point of a smooth curve, the tangent is horizontal: <b>the derivative is zero</b>. Same at the lowest point of a valley. So the search for "best" (biggest profit, smallest cost) becomes a search for <b>flat points</b>: solve f′(x) = 0.</p>
<p>These flat points are called <span class="term">critical points</span> (نقاط حرجة).</p>
<div class="callout amber"><p><b>But flat ≠ best.</b> Three kinds of flat: a hilltop (maximum), a valley floor (minimum), and a "shelf" that just pauses before continuing. Finding f′ = 0 gives you the candidates — you still must check which kind each one is.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Why is the derivative zero at the top of a smooth hill?`,
          options: [
            { t: 'If the slope were positive you could climb higher; negative means you passed the top. Only flat fits the top', ok: true, why: 'A tiny proof by elimination (1.4 style!): nonzero slope in either direction contradicts "this is the top". So f′ = 0 there — necessarily.' },
            { t: 'Because hills are round', ok: false, why: 'Even a pointy mathematical hill made of smooth parts obeys this — the argument uses only "you cannot go higher", not roundness.' },
            { t: 'It is not — the slope is biggest at the top', ok: false, mis: 'peak-steepest', why: 'The slope is biggest on the SIDE of the hill (the steep climb). At the very top the climbing is finished — flat. Steepness and height peak at different places.' }
          ],
          hints: ['Suppose the slope at the top were +2. Could you go higher?', 'Yes — one step forward. So the top cannot have slope +2 (or −2…).']
        },
        {
          type: 'mcq',
          prompt: `You solved f′(x) = 0 and found x = 5. What do you know about x = 5?`,
          options: [
            { t: 'It is a candidate — a flat point that might be a max, a min, or neither. It needs a second check', ok: true, why: 'f′ = 0 is necessary for a smooth top/bottom, but not enough. The classic "neither" example: x³ at 0 is flat but keeps climbing after a pause.' },
            { t: 'It is the maximum', ok: false, mis: 'flat-means-max', why: 'Valleys are flat too! And so are pause-shelves. Flatness only shortlists; classification comes next.' },
            { t: 'The function equals zero there', ok: false, mis: 'fprime-vs-f', why: 'f′(5) = 0 speaks about the SLOPE at 5, not the value f(5). The function can be at height 1000 and flat. Keep f and f′ in separate mental boxes.' }
          ],
          hints: ['Name three different shapes that are flat at a point.', 'Top, bottom, shelf. Which did you find? Unknown yet.']
        },
        {
          type: 'mcq',
          prompt: `A delivery company wants the cheapest route AND your phone wants the longest battery life AND a bakery wants the best price. What do these share, mathematically?`,
          options: [
            { t: 'Each is "find the input that makes one function biggest or smallest" — an optimization problem, solved by hunting flat points', ok: true, why: 'Different stories, one shape: a quantity to optimize, a variable to choose. Calculus turns each into: differentiate, find f′ = 0, classify, compare. One method, a thousand jobs.' },
            { t: 'Nothing — routes, batteries, and prices are different fields', ok: false, why: 'The FIELDS differ; the MATH is one. Recognizing the shared shape is the skill — after that, this node’s method applies to all three.' },
            { t: 'They all need bigger computers', ok: false, why: 'A bakery’s best price is one derivative on paper. Optimization is a way of asking, before it is ever a computation.' }
          ],
          hints: ['Rewrite each story as "choose x to maximize/minimize f(x)".', 'Same sentence three times — that sameness is the point.']
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The method, complete</h4>
<ol>
  <li><b>Differentiate</b> and solve f′(x) = 0 → critical points.</li>
  <li><b>Classify</b> each one. Second-derivative test: f″ &gt; 0 means the slope is increasing through zero — a <b>valley</b> (minimum). f″ &lt; 0 — a <b>hilltop</b> (maximum). f″ = 0 — no verdict, look closer.</li>
  <li><b>Check the borders.</b> On a limited range [a, b], the best point can sit at an endpoint where nothing is flat. Compare all candidates: critical points AND endpoints.</li>
</ol>
<h4>Worked: f(x) = x² − 4x</h4>
<pre><code>f'(x) = 2x − 4 = 0   →   x = 2
f''(x) = 2 > 0        →   a minimum
f(2) = 4 − 8 = −4     →   lowest value: −4 at x = 2</code></pre>
<h4>Why the second derivative knows</h4>
<p>f″ is the slope OF the slope. f″ &gt; 0 at a flat point: the slope goes …negative, zero, positive… — falling then rising: a valley. The sign of f″ reads the shape of the bend (تقوّس).</p>`,
      questions: [
        {
          type: 'input',
          prompt: `f(x) = x² − 4x. Its critical point is at x = ?`,
          accept: ['2'],
          placeholder: '…',
          hints: ['Differentiate, set to zero.', '2x − 4 = 0.'],
          why: 'f′ = 2x − 4 = 0 → x = 2. (And f″ = 2 > 0, so it is a minimum — the parabola’s bottom.)'
        },
        {
          type: 'mcq',
          prompt: `At a critical point, f″ = −6. The point is a…`,
          options: [
            { t: 'Maximum — negative f″ means the slope is falling through zero: rising before, falling after. A hilltop', ok: true, why: 'The second-derivative test: f″ < 0 = curved downward = top. Read the sign, read the shape.' },
            { t: 'Minimum — negative means low', ok: false, mis: 'sign-direct-read', why: 'The SIGN of f″ describes the bend’s direction, not altitude. Negative bend = frowning curve ∩ = a top. (Mnemonic: f″ < 0 frowns, f″ > 0 smiles ∪.)' },
            { t: 'Neither — f″ must be zero at critical points', ok: false, why: 'f′ is zero at critical points; f″ is free to be anything — and its value is exactly the classification information.' }
          ],
          hints: ['f″ < 0: the slope is decreasing. Through the zero-slope moment, slope goes + → 0 → −.', 'Rising then falling — what shape is that?']
        },
        {
          type: 'order',
          prompt: `Find the minimum of f(x) = x² − 6x + 1 — arrange the full method.`,
          steps: [
            'Differentiate: f′(x) = 2x − 6',
            'Solve f′ = 0: x = 3 — the only critical point',
            'Classify: f″ = 2 > 0, so x = 3 is a minimum',
            'Report the value: f(3) = 9 − 18 + 1 = −8'
          ],
          hints: ['The method always starts with the derivative.', 'Candidates from f′ = 0, verdict from f″.', 'The answer to "what is the minimum" is a VALUE — compute f there.'],
          why: 'Differentiate → solve → classify → evaluate. Four moves, any smooth single-variable problem.'
        },
        {
          type: 'mcq',
          prompt: `Maximize f(x) = x on the range [0, 10]. Where is the maximum — and why does the f′ = 0 method miss it?`,
          options: [
            { t: 'At the endpoint x = 10. f′ = 1 is never zero — the best point is on the border, where flatness is not required', ok: true, why: 'A steadily climbing function has its max at the right wall. Endpoints are candidates in their own right: nothing forces flatness where the allowed range simply STOPS. Always compare critical points AND borders.' },
            { t: 'There is no maximum — no critical point exists', ok: false, mis: 'endpoints-forgotten', why: 'On a CLOSED range a continuous function always has a max (a theorem!). Missing it here means the endpoint check was skipped — the #1 practical optimization bug.' },
            { t: 'At x = 0 — the start is special', ok: false, why: 'x = 0 is the MINIMUM here (f = 0 vs f = 10). Endpoints are candidates, not automatic winners — evaluate f at each and compare.' }
          ],
          hints: ['Is f′ ever zero for f(x) = x?', 'No. So where can the best value hide on a limited range?'],
          edge: 'Real version: "best price in the allowed range 1–100€" often lands on 100€ exactly — a boundary answer. Constrained optimization is mostly about respecting the fences.'
        },
        {
          type: 'mcq',
          prompt: `f(x) = x³ has f′(0) = 0 and f″(0) = 0. What is x = 0?`,
          options: [
            { t: 'Neither max nor min — the curve pauses flat, then continues climbing. The test gave no verdict, and looking directly settles it', ok: true, why: 'x³ climbs, flattens momentarily at 0, climbs again — values left of 0 are below, right of 0 above: no extremum. When f″ = 0 the test abstains; check values around the point by hand.' },
            { t: 'A minimum — zero is the smallest f″ can be', ok: false, why: 'f″ = 0 is the test SHRUGGING, not voting min. The direct check (compare f(−0.1) < 0 < f(0.1)) shows no extremum at all.' },
            { t: 'An error — critical points must be max or min', ok: false, mis: 'flat-means-max', why: 'This function is the standard counterexample (مثال مضاد) to exactly that belief. Flat-and-neither is real; it even has a name (saddle/inflection behavior).' }
          ],
          hints: ['Compute f just left and just right of 0: f(−0.1), f(0.1).', '−0.001 and +0.001 — is 0 above both, below both, or between?'],
          edge: 'Carry x³ in your pocket forever: it is the one-line counterexample for "flat implies extremum" and for "f″ test always decides".'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Cost functions: optimization is how machines "decide"</h4>
<pre><code>// pricing: profit(p) = (p − cost) · sales(p)     → choose p with profit′(p) = 0
// ML: loss(weights) = how wrong the model is     → choose weights minimizing loss
// engineering: drag(shape), latency(config), risk(portfolio) — same skeleton</code></pre>
<p>Modern ML never solves loss′ = 0 by algebra — millions of variables make that impossible. Instead it <em>walks downhill step by step</em> — which is the next node. But the definition of "done" is still this node's: the gradient is (nearly) zero. Flatness is the destination; descent is the vehicle.</p>
<h4>The two honest warnings</h4>
<ul>
  <li><b>Local vs global:</b> a valley can be the lowest point NEARBY but not the lowest anywhere. f′ = 0 methods find local answers; finding the global best is fundamentally harder.</li>
  <li><b>Model vs world:</b> the optimum of profit(p) is only as good as the sales(p) formula inside it. Optimizing a wrong model gives a precisely wrong answer.</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A bakery models profit(p) = (p − 2) · (100 − 10p) for price p. Setting profit′ = 0 gives p = 6. What did the bakery just compute?`,
          options: [
            { t: 'The model’s best price: the flat point of its profit curve — trustworthy exactly as far as the sales model (100 − 10p) is', ok: true, why: 'The calculus is exact; the model is an assumption. p = 6 maximizes THIS formula (check: profit″ = −20 < 0, a max). Whether it maximizes reality depends on whether sales really fall 10 per euro. Optimization inherits the model’s honesty.' },
            { t: 'The guaranteed real-world best price', ok: false, mis: 'model-vs-world', why: 'The formula (100 − 10p) is a guess about customers. If real sales drop faster, the true best is lower. Calculus optimizes the model it is given — garbage model in, precisely-computed garbage out.' },
            { t: 'The price where profit is zero', ok: false, mis: 'fprime-vs-f', why: 'profit′ = 0 means the SLOPE is zero — the top of the curve, where profit is LARGEST (here: (6−2)(100−60) = 160€). Zero profit happens elsewhere (p = 2 or p = 10).' }
          ],
          hints: ['What does setting the derivative to zero find, always?', 'A flat point of THE GIVEN function. Where did that function come from?'],
          edge: 'The professional workflow: optimize, then SENSITIVITY-check (4.3!) — "if the sales slope is 12 not 10, how much does the best price move?" Robust answers beat precise ones.'
        },
        {
          type: 'mcq',
          prompt: `Training a neural network stops when the loss stops improving. The loss is not zero — just flat. In this node's language, training found…`,
          options: [
            { t: 'A critical point (or a nearly-flat region) of the loss — a local minimum candidate, not necessarily the global best', ok: true, why: '"Stopped improving" = gradient ≈ 0 = flat. High-dimensional losses have many valleys; training settles into one. (Deep-learning practice: good-enough local valleys abound — a lucky empirical fact, not a theorem.)' },
            { t: 'The global minimum — training always finds the best', ok: false, mis: 'local-is-global', why: 'No such guarantee exists for non-convex losses — different random starts genuinely find different valleys (try it: two training runs, two different final losses). Local is what descent buys.' },
            { t: 'A bug — loss should reach zero', ok: false, why: 'Zero loss usually means memorization (overfitting) or a trivial task. A healthy flat-point above zero is the normal, desirable outcome.' }
          ],
          hints: ['"Stops improving" translates to what statement about the gradient?', '≈ 0 — which vocabulary word from L1 is that?'],
          edge: 'The "convex" special case — one valley only, local = global — is why classical ML (linear/logistic regression) has guarantees deep learning lacks. The word to remember when guarantees matter.'
        },
        {
          type: 'mcq',
          prompt: `An engineer optimizes server count for cost, gets n = 4.7, and deploys 4.7 servers… obviously not. What is the right last step, and the caution?`,
          options: [
            { t: 'Evaluate the true cost at the integer neighbors n = 4 and n = 5 and take the better — the continuous optimum only brackets the discrete answer', ok: true, why: 'Calculus lives on smooth curves; servers come in whole numbers. Near-flat tops mean both neighbors are close to optimal — but CHECK, because constraints (capacity at n = 4!) can break the tie hard. Continuous methods propose; discrete reality disposes.' },
            { t: 'Round to 5 — always round up', ok: false, why: 'Sometimes 4 wins (cost may rise steeply after the optimum). Rounding rules are superstition; evaluating both neighbors is two multiplications. Compare, don’t guess.' },
            { t: 'The optimization was invalid — server count is not differentiable', ok: false, mis: 'discrete-invalidates', why: 'Modeling n as continuous is a legitimate, standard approximation — it finds the neighborhood instantly. The method is fine; it just needs its integer-check final step. Approximate-then-verify beats pure discrete search at scale.' }
          ],
          hints: ['The smooth answer says "the best is near 4.7". What are the legal candidates near it?', '4 and 5 — how do you pick?'],
          edge: 'The same relax-then-round pattern powers huge scheduling and allocation systems (linear programming relaxations). When rounding gaps matter, whole fields exist to bound them.'
        }
      ]
    }
  }
};

/* ============ 4.6 GRADIENT DESCENT ============ */
window.NODES['calc.descent'] = {
  id: 'calc.descent', num: '4.6', trackId: 'calculus',
  title: 'Gradient Descent',
  minutes: 35,
  payoff: 'the algorithm behind ML training',
  levels: {

    l1: {
      widget: 'descent',
      html: `
<h4>Fog, again — but now you must walk</h4>
<p>You stand on a hillside in thick fog, and you want the valley floor. You cannot see it. But you can FEEL the slope under your feet. Strategy: step <b>downhill</b>. Feel again. Step again. Repeat until the ground is flat.</p>
<p>That is <span class="term">gradient descent</span> — the whole idea:</p>
<pre><code>new position  =  position  −  (step size) × (slope here)</code></pre>
<p>Notice the minus: the slope points uphill, so you subtract it. And notice the slope also sets your step: steep ground → big steps, nearly-flat ground → tiny careful steps. The algorithm slows down automatically as it arrives.</p>
<div class="callout amber"><p><b>Try it below:</b> a ball on the curve f(x) = x². Press STEP and watch position − α·slope play out. Then raise the step size α (معدل الخطوة) too high and watch the ball start jumping ACROSS the valley instead of into it.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Why does gradient descent SUBTRACT the slope?`,
          options: [
            { t: 'The slope points uphill; subtracting it walks downhill — toward smaller values', ok: true, why: 'f′ > 0 means "higher to the right", so go left (subtract). f′ < 0 means "higher to the left", so go right (subtracting a negative). One minus sign handles both directions.' },
            { t: 'Adding would be too fast', ok: false, why: 'Adding walks UPHILL — wrong direction entirely, not wrong speed. (Adding is gradient ASCENT — used when maximizing.)' },
            { t: 'Tradition from old papers', ok: false, why: 'Pure geometry: downhill is minus-slope. Flip the sign and the same algorithm climbs instead — the sign IS the goal.' }
          ],
          hints: ['If f′(x) = +3, is the valley to the left or right?', 'Left — so the update must DECREASE x.']
        },
        {
          type: 'mcq',
          prompt: `Near the bottom of the valley, the steps get automatically smaller. Why?`,
          options: [
            { t: 'The step is (α × slope), and the slope shrinks toward zero near the flat bottom', ok: true, why: 'The step size is proportional to the slope — and flat means small slope. Descent brakes by itself as it arrives: elegant, free, and the reason it can settle instead of pacing forever.' },
            { t: 'The algorithm counts steps and slows down on purpose', ok: false, mis: 'schedule-assumed', why: 'No counter in the basic rule — the slowing is geometry, not scheduling. (Real training DOES also add schedules on top, but the base behavior comes for free.)' },
            { t: 'They don’t — steps are constant', ok: false, why: 'The α is constant; the STEP is α·slope, and the slope collapses near the bottom. Watch the widget’s step sizes shrink.' }
          ],
          hints: ['Write the step: α·f′(x). What happens to f′ near the minimum?', 'It → 0 (node 4.5!). So the step → ?']
        },
        {
          type: 'mcq',
          prompt: `You set the step size α very large. In the widget, the ball…`,
          options: [
            { t: 'Jumps over the valley to the other side — and can bounce back and forth, even climbing higher each time', ok: true, why: 'A big step overshoots the bottom. Worse: with α too big the overshoot GROWS each bounce — divergence. Step size is the difference between converging, oscillating, and exploding.' },
            { t: 'Arrives faster — bigger steps are better', ok: false, mis: 'bigger-alpha-better', why: 'Only up to a point! Moderate α: faster ✓. Too big: overshoot and diverge ✗. The best α is a balance — one of ML’s eternal tuning knobs.' },
            { t: 'Refuses to move', ok: false, why: 'Refusing to move is the TOO-SMALL disease (steps ≈ 0, training takes forever). Too big is the opposite: wild jumping.' }
          ],
          hints: ['One step from x = 3 with a huge α on x² — where do you land?', 'Far on the OTHER side of 0. And the next step?'],
          edge: 'The three regimes to memorize: α too small → slow crawl; α right → smooth settle; α too big → oscillate/explode. Every training-loss chart you will ever see is one of these three.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The update rule, precisely</h4>
<pre><code>x ← x − α · f′(x)          α = the learning rate</code></pre>
<h4>Worked steps on f(x) = x², from x = 3, α = 0.1</h4>
<pre><code>f′(x) = 2x
step 1: x = 3 − 0.1·6 = 2.4
step 2: x = 2.4 − 0.1·4.8 = 1.92
step 3: x = 1.92 − 0.1·3.84 = 1.536   …each step: ×0.8 toward 0</code></pre>
<p>See the pattern: x ← x − 0.2x = <b>0.8·x</b>. Geometric decay (Track 4.1!) toward the minimum: 3, 2.4, 1.92, 1.536… Powers of 0.8. Convergence speed is an eigenvalue-flavored story (Track 3.8 fans will recognize |factor| &lt; 1).</p>
<h4>When does it break? Same example, general α</h4>
<pre><code>x ← x − α·2x = (1 − 2α)·x
|1 − 2α| < 1  →  0 < α < 1     converges
α = 0.5           →  x jumps EXACTLY to 0 in one step (lucky geometry)
α > 1             →  |1 − 2α| > 1: each step multiplies the distance — diverges</code></pre>
<h4>The local-minimum honesty clause</h4>
<p>Descent walks downhill from where it STARTS. Two valleys → two possible endings, chosen by the starting point. It finds <em>a</em> valley, not <em>the</em> valley (4.5's local-vs-global, now with a vehicle).</p>`,
      questions: [
        {
          type: 'input',
          prompt: `f(x) = x², so f′(x) = 2x. From x = 3 with α = 0.1, one step lands at x = ? (decimal)`,
          accept: ['2.4', '2,4'],
          placeholder: '…',
          hints: ['x − α·f′(x).', '3 − 0.1·(2·3).'],
          why: '3 − 0.1·6 = 2.4. Twenty more steps: 3·(0.8)²¹ ≈ 0.03 — geometric arrival.'
        },
        {
          type: 'mcq',
          prompt: `On f(x) = x², the update simplifies to x ← (1 − 2α)x. For which α does descent CONVERGE?`,
          options: [
            { t: '0 < α < 1 — exactly when |1 − 2α| < 1, so each step shrinks the distance to 0', ok: true, why: 'The update multiplies x by (1−2α) each step; convergence needs that factor inside (−1, 1). Solve: 0 < α < 1. The stability condition, derived, not memorized — and it is the 3.8 eigenvalue test |λ| < 1 in disguise.' },
            { t: 'Any α > 0 — downhill is downhill', ok: false, mis: 'bigger-alpha-better', why: 'Each single step aims downhill, yes — but a huge step LANDS higher on the far wall. α = 1.1 gives factor −1.2: distances GROW 20% per step while always "aiming down". Aim ≠ arrival.' },
            { t: 'Only α < 0.001 — safety first', ok: false, why: 'Anything under 1 converges here; tiny α just converges slowly (factor 0.998 ≈ crawling). Over-caution has a real cost: training time.' }
          ],
          hints: ['Iterating x ← c·x converges when |c| < 1 (Track 3.8/4.1).', 'Set |1 − 2α| < 1 and solve.'],
          edge: 'Real losses are not x² — but NEAR a minimum every smooth function looks like a parabola, so this analysis is the local truth for all of them. That is why it is taught.'
        },
        {
          type: 'order',
          prompt: `Trace descent breaking: f(x) = x², α = 1.1, start x = 1. Arrange the run.`,
          steps: [
            'Update factor: 1 − 2α = 1 − 2.2 = −1.2',
            'Step 1: x = −1.2 — jumped across the valley, and slightly farther out',
            'Step 2: x = 1.44 — back across, farther still',
            'Each step multiplies distance by 1.2: oscillating divergence. The loss chart shows growing zigzag'
          ],
          hints: ['Compute the constant factor first.', 'Apply it repeatedly: 1 → −1.2 → +1.44 → …', 'The sign alternates (crossing the valley); the size grows.'],
          why: 'The signature of α-too-big: loss zigzags UP. Seeing 1, −1.2, 1.44, −1.73… once by hand makes the pattern unmistakable in real training charts.'
        },
        {
          type: 'mcq',
          prompt: `A loss has two valleys: a shallow one at x = 1, a deep one at x = 5. Descent starting at x = 0 finds…`,
          options: [
            { t: 'The shallow valley at x = 1 — descent walks downhill from its start, and a hill separates it from the better valley', ok: true, why: 'From x = 0 the local downhill leads to x = 1 and STOPS (flat!). Reaching x = 5 would require going UP first — which descent never does. Starting position chooses the ending: the local-minimum trap, concretely.' },
            { t: 'The deep valley — descent prefers deeper', ok: false, mis: 'local-is-global', why: 'Descent has no map — only the slope underfoot (that fog!). It cannot compare valleys it never visits. Depth-preference would need global knowledge the algorithm simply lacks.' },
            { t: 'Both, eventually', ok: false, why: 'Once flat, the update is x ← x − α·0 = x: parked forever. Escaping needs new ingredients (random restarts, momentum) — which exist precisely because plain descent cannot.' }
          ],
          hints: ['What is between x = 0 and the deep valley at x = 5?', 'A hill. Can "step downhill" ever climb it?'],
          edge: 'Practice answers: run several random starts and keep the best; or add momentum (a rolling ball can coast over small bumps). Both are industry-standard for exactly this picture.'
        },
        {
          type: 'mcq',
          prompt: `In many dimensions (a million weights), the "slope" becomes the gradient — a VECTOR of all the partial slopes. The update is w ← w − α·∇f. Which Track 3 sentence explains why this works?`,
          options: [
            { t: 'The gradient is a vector pointing in the steepest-uphill direction — subtracting it (a vector operation, 3.1) steps steepest-downhill', ok: true, why: 'One derivative per weight, bundled as a vector; the bundle points up the steepest slope, and w − α∇f is vector subtraction toward lower loss. Calculus provides the direction, linear algebra provides the motion. The two tracks were always one story.' },
            { t: 'Matrices are involved, so anything can happen', ok: false, why: 'Very specific things happen: the same three α-regimes, the same flat-point stopping — just in ℝ¹⁰⁰⁰⁰⁰⁰ instead of ℝ. The 1D intuition transfers almost undamaged; that is why this node teaches 1D first.' },
            { t: 'It only works up to 3 dimensions', ok: false, mis: 'dimension-fear', why: 'The formulas never mention dimension — vector subtraction and slopes work in ℝⁿ for any n (3.1’s promise: trust the algebra when the picture gives out). GPT-class models descend in billions of dimensions.' }
          ],
          hints: ['What object holds "one slope per variable"?', 'A vector. Which operation moves a point by a scaled vector?'],
          edge: 'Full circle: positions and steps (3.1), steepest directions (3.2 dot products behind the scenes), stability factors (3.8 eigenvalues of the local curvature). Tracks 3 and 4 were building one machine.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Descent in eleven lines — this is a real trainer</h4>
<pre><code>function train(f, dfdx, x0, alpha, steps) {
  let x = x0;
  for (let i = 0; i < steps; i++) {
    const g = dfdx(x);            // the gradient (here: 1D slope)
    x = x - alpha * g;            // THE update
    if (Math.abs(g) < 1e-9) break; // flat enough — arrived (4.5!)
  }
  return x;
}
train(x => (x-3)**2, x => 2*(x-3), 0, 0.1, 200)   // → 2.9999…</code></pre>
<p>Swap the 1D x for a million-dimensional weight vector and this loop IS machine-learning training. Everything else in a framework — batching, momentum, Adam, schedules — is decoration on these four lines.</p>
<h4>Reading real training charts with this node's eyes</h4>
<ul>
  <li>Loss falls smoothly, slowing near the end → healthy α, approaching flat.</li>
  <li>Loss zigzags downward → α slightly big: oscillating but caught.</li>
  <li>Loss explodes to NaN → α too big: the |factor| &gt; 1 regime. Cut α ×10.</li>
  <li>Loss barely moves → α too small OR a vanishing chain product (4.4!).</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `In the code, why is the stop condition on the GRADIENT (|g| < 1e-9) instead of on the loss value?`,
          options: [
            { t: '"Arrived" means FLAT (4.5’s definition) — the loss value at the bottom is unknown in advance, but flatness is always the arrival signal', ok: true, why: 'You cannot test "loss == minimum" without knowing the minimum. Flatness is the observable symptom of being there — and small gradient also means further steps would barely move anyway. Stop conditions encode definitions.' },
            { t: 'Gradients are cheaper to compute than losses', ok: false, why: 'They cost similar (and the loop already computes g). The reason is logical, not economic: flat is the definition of done.' },
            { t: 'It should stop when loss = 0', ok: false, mis: 'zero-loss-goal', why: 'Most minima are NOT at zero (noise floors, model limits — 4.5 L3). Waiting for zero would loop forever below a healthy stopping point.' }
          ],
          hints: ['How does 4.5 define a minimum candidate?', 'f′ = 0. Which variable in the loop measures that?'],
          edge: 'Real trainers add friends: max-steps budgets, "loss stopped improving for k epochs" (patience), and validation-based early stopping. All are practical wrappers around "flat enough".'
        },
        {
          type: 'mcq',
          prompt: `Your training loss goes: 4.1 → 2.3 → 5.8 → 19.2 → NaN. Diagnosis and first fix?`,
          options: [
            { t: 'Divergence — the α-too-big regime (growing oscillation → overflow). First fix: reduce the learning rate ~10×', ok: true, why: 'Rising loss with acceleration is the |1−2α·curvature| > 1 signature from L2; NaN is the float overflow finale. Cutting α is the one-line first response, and it works shockingly often.' },
            { t: 'Bad data in batch 3', ok: false, why: 'Possible but not the FIRST suspect: bad data usually spikes loss once, then recovery. Monotone acceleration to NaN is the arithmetic signature of an unstable step size. Cheapest hypothesis first.' },
            { t: 'The model is too small', ok: false, mis: 'capacity-blame', why: 'Capacity problems show as loss PLATEAUING too high — not exploding. Explosions are dynamics (step size), plateaus are capacity. Learn the chart shapes; they triage for you.' }
          ],
          hints: ['Compare with the L2 trace: 1 → −1.2 → 1.44 → … what regime grows like this?', 'Divergent oscillation. Which knob controls it?'],
          edge: 'Modern helpers — gradient clipping, warmup, Adam — mostly exist to widen the safe-α zone. When they fail, the diagnosis skills are still these.'
        },
        {
          type: 'mcq',
          prompt: `Two colleagues train the same network twice and get different final weights, both with good loss. Should they be worried?`,
          options: [
            { t: 'Usually not — descent from different random starts finds different (near-)equally-good valleys; the local-minimum picture predicts exactly this', ok: true, why: 'Non-convex losses have many acceptable valleys (4.5/4.6). Different weights, similar loss = the expected geometry, not a bug. Worry triggers are different: unstable PREDICTIONS or big loss gaps.' },
            { t: 'Yes — correct training must be deterministic', ok: false, mis: 'determinism-expected', why: 'Random init + data shuffling make run-to-run variation the DEFAULT (you can force determinism with fixed seeds — done for debugging, at a speed cost). Distinguish "different weights" from "different quality".' },
            { t: 'Yes — one of the runs must have diverged', ok: false, why: 'Divergence looks like NaN/exploding loss — both runs reported GOOD loss. Two healthy runs in two valleys is the textbook multi-minimum outcome.' }
          ],
          hints: ['What did L2 say chooses which valley descent finds?', 'The starting point — and starts are random. So two runs → ?'],
          edge: 'Practical uses of the multiplicity: ensembles (average several valley-dwellers — usually beats any single one) and seed-variance reporting in honest papers.'
        }
      ]
    }
  }
};
