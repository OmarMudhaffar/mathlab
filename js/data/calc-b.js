/* Track 4 content — nodes 4.3 and 4.4 */

/* ============ 4.3 THE DERIVATIVE ============ */
window.NODES['calc.derivative'] = {
  id: 'calc.derivative', num: '4.3', trackId: 'calculus',
  title: 'The Derivative',
  minutes: 40,
  payoff: 'rates of change · sensitivity',
  levels: {

    l1: {
      widget: 'tangent',
      html: `
<h4>Speed at one single moment</h4>
<p>Your car trip: 100 km in 2 hours. Average speed: 50 km/h. Easy. But what did the speedometer show at exactly 14:30? That is a harder question — speed <em>at one instant</em>, not over a stretch.</p>
<p>The trick: measure over a smaller and smaller stretch. Speed over 1 minute. Over 1 second. Over 0.01 seconds. These averages approach one number — and that number is the <span class="term">derivative</span> (المشتقة): the rate of change at a single point.</p>
<p>On a graph, the same story: the average between two points is the slope of the line through them (a <span class="term">secant</span>). Pull the two points together and the line settles into the <span class="term">tangent</span> — the line that just touches the curve. <b>Derivative = slope of the tangent.</b></p>
<div class="callout amber"><p><b>Try it below:</b> the amber line goes through two points, h apart. Shrink h and watch the amber line melt into the dashed tangent. You are watching a limit (4.2!) compute a derivative.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `The speedometer at exactly 14:30 shows the…`,
          options: [
            { t: 'Derivative of position at that moment — the instant rate of change', ok: true, why: 'Speed NOW = how fast position changes NOW = the derivative. Speedometers are derivative-computers built into cars.' },
            { t: 'Average speed of the whole trip', ok: false, mis: 'average-vs-instant', why: 'The average mixes the whole 2 hours together. The speedometer answers about ONE instant — you can drive 50 average and show 120 at 14:30.' },
            { t: 'Distance traveled so far', ok: false, why: 'That is the odometer — the position itself. The speedometer shows how FAST that number is growing: its derivative.' }
          ],
          hints: ['Instant, not interval.', 'Which idea from this node means "rate of change right now"?']
        },
        {
          type: 'mcq',
          prompt: `In the widget, what happens to the amber (secant) line as you shrink h toward 0?`,
          options: [
            { t: 'It settles into the tangent line — its slope approaches the derivative', ok: true, why: 'The two points merge; the average slope becomes the instant slope. The derivative IS this limit — you just watched the definition run.' },
            { t: 'It disappears — two identical points make no line', ok: false, mis: 'limit-needs-arrival', why: 'At exactly h = 0, yes, no line — 0/0! But the LIMIT (4.2) does not need arrival: the line’s direction stabilizes long before h reaches 0. Near, not at.' },
            { t: 'It spins randomly', ok: false, why: 'Watch again: the motion is calm and settles. Smooth curves have stable tangents — that stability is what makes the derivative well-defined.' }
          ],
          hints: ['Slide h smaller and watch the slope number.', 'It approaches the dashed line’s slope.'],
          edge: 'Curves with corners (like |x| at 0) do NOT settle — left and right give different slopes. No agreement, no derivative there.'
        },
        {
          type: 'mcq',
          prompt: `f(x) = x². Looking at the graph: at x = 0 the tangent is flat, and for bigger x it gets steeper. So the derivative of x²…`,
          options: [
            { t: 'Starts at 0 and grows with x — in fact it is 2x', ok: true, why: 'Flat at 0 (slope 0 = 2·0 ✓), steeper as x grows (slope 6 at x = 3 ✓). The derivative is itself a FUNCTION — a slope-report for every point at once.' },
            { t: 'Is always 2 — the little ² becomes a 2', ok: false, mis: 'constant-slope-assumed', why: 'A constant slope belongs to a straight line. The parabola visibly steepens — its slope must change with x. (The 2 is half right: the rule gives 2x, x included.)' },
            { t: 'Is x² also — a function is its own slope', ok: false, why: 'Almost never true (the special one is eˣ). Check x = 0: the curve value is 0 AND flat — but at x = 2, value 4 while slope is 4… coincidence? At x = 3: value 9, slope 6. Different.' }
          ],
          hints: ['Read slopes off the picture at x = 0, 1, 2.', 'Slopes 0, 2, 4 — a pattern in x?'],
          edge: 'The derivative of a function is a new function. That one idea — slopes as data — is what makes calculus computable.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The definition — a limit you already know</h4>
<pre><code>f'(x) = limit of  (f(x + h) − f(x)) / h   as h → 0</code></pre>
<p>Read it: "average change over a stretch h, then shrink the stretch." At h = 0 it is 0/0 — and node 4.2 taught exactly how to handle that: simplify first, then let h → 0.</p>
<p><b>Worked, for f(x) = x²:</b></p>
<pre><code>((x+h)² − x²)/h = (2xh + h²)/h = 2x + h   →   as h → 0:   f'(x) = 2x  ∎</code></pre>
<h4>The rules (so you never redo the limit)</h4>
<div class="tbl-scroll"><table class="tt">
  <tr><th>f(x)</th><th>f'(x)</th><th>note</th></tr>
  <tr><td>c (constant)</td><td>0</td><td>flat line, no change</td></tr>
  <tr><td>xⁿ</td><td>n·xⁿ⁻¹</td><td>the power rule — bring n down, lower the power</td></tr>
  <tr><td>c·f</td><td>c·f'</td><td>constants ride along</td></tr>
  <tr><td>f + g</td><td>f' + g'</td><td>slopes add</td></tr>
  <tr><td>eˣ</td><td>eˣ</td><td>the self-slope function</td></tr>
</table></div>
<h4>What the sign tells you</h4>
<p>f' &gt; 0: the function is climbing. f' &lt; 0: falling. f' = 0: momentarily flat — the tops and bottoms of hills live here (next node's treasure).</p>`,
      questions: [
        {
          type: 'input',
          prompt: `Power rule: d/dx of x³ = ? (write like "3x^2")`,
          accept: ['3x^2', '3x²', '3*x^2', '3x2'],
          placeholder: 'n·x^(n−1)',
          hints: ['Bring the power down as a multiplier, then lower the power by one.', '3 comes down; 3 − 1 = 2 stays up.'],
          why: 'd/dx x³ = 3x². One rule replaces one limit computation — forever.'
        },
        {
          type: 'input',
          prompt: `f(x) = x². The slope of the tangent at x = 3 is f'(3) = ?`,
          accept: ['6'],
          placeholder: '…',
          hints: ['First find f\'(x) with the power rule.', 'f\'(x) = 2x; plug in x = 3.'],
          why: 'f\'(x) = 2x → f\'(3) = 6. The derivative-function answers slope questions at every point by substitution.'
        },
        {
          type: 'order',
          prompt: `Derive f'(x) = 2x for f(x) = x² from the definition — arrange the steps.`,
          steps: [
            'Write the difference quotient: ((x+h)² − x²) / h',
            'Expand the square: (x² + 2xh + h² − x²) / h = (2xh + h²) / h',
            'Cancel the h: 2x + h  (legal for h ≠ 0 — which is all the limit looks at)',
            'Let h → 0: the limit is 2x  ∎'
          ],
          hints: ['Start from the definition with f = x² inserted.', 'The 0/0 recipe from 4.2: simplify (cancel h) before taking the limit.', 'After canceling, h → 0 is painless.'],
          why: 'Expand → cancel → limit. Every basic derivative rule was born from this three-step ritual; do it once by hand and own it.'
        },
        {
          type: 'mcq',
          prompt: `g(x) = 5x³ − 2x + 7. Then g'(x) = ?`,
          options: [
            { t: '15x² − 2', ok: true, why: 'Term by term: 5·(3x²) = 15x², then −2·(1) = −2, then the constant 7 → 0. Sum rule + power rule + constants-die.' },
            { t: '15x² − 2 + 7', ok: false, mis: 'constant-survives', why: 'The 7 is a flat shift — it changes WHERE the curve sits, never how fast it changes. Constants always differentiate to 0.' },
            { t: '5x² − 2x', ok: false, why: 'The power must come DOWN as a multiplier: 5x³ → 5·3·x² = 15x². And −2x is already power 1: its slope is the constant −2.' }
          ],
          hints: ['Differentiate each term alone, then add.', 'x³ → 3x² (then ×5). x → 1 (then ×−2). 7 → ?'],
          edge: 'Why constants vanish: f(x)+7 is the same curve lifted up — identical steepness everywhere. The derivative measures shape, not height.'
        },
        {
          type: 'mcq',
          prompt: `h'(x) is negative for all x in some range. On that range, h is…`,
          options: [
            { t: 'Falling — every tangent tilts downhill', ok: true, why: 'Negative slope = decreasing. The derivative’s SIGN is a one-bit summary of direction — and the cheapest useful fact about any function.' },
            { t: 'Negative — below the x-axis', ok: false, mis: 'sign-of-f-vs-fprime', why: 'The classic mix-up: h′ negative says h is FALLING, not that h is negative. A function can fall from +100 to +1 (positive the whole way, falling the whole way).' },
            { t: 'Flat', ok: false, why: 'Flat is f′ = 0 exactly. Strictly negative slope means genuinely going down.' }
          ],
          hints: ['f′ describes the DIRECTION of f, not its position.', 'Downhill tangents mean…?'],
          edge: 'Keep the two signs separate forever: sign of f = above/below zero; sign of f′ = rising/falling. Interviews love this confusion.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Derivatives are sensitivity — the question "if I nudge x, how much does y move?"</h4>
<pre><code>// numeric derivative — three lines, works on any function:
const dfdx = (f, x, h = 1e-6) => (f(x + h) - f(x - h)) / (2 * h);
dfdx(x => x * x, 3)     // → 5.99999… ≈ 6  ✓</code></pre>
<p>Sensitivity questions are everywhere: if the price rises 1€, how much do sales drop? If this neural-net weight moves 0.01, how much does the error change? That last one is THE question of machine learning — and its answer (the gradient, node 4.6) is a bundle of derivatives.</p>
<h4>Where the definition meets floats</h4>
<p>The code uses h = 1e-6, not smaller — because (f(x+h) − f(x−h)) subtracts nearly-equal numbers (4.2's cancellation!). Too-big h: bad math approximation. Too-small h: float noise wins. 1e-6 is the practical truce. Libraries dodge the whole fight with <em>automatic differentiation</em> — applying the L2 rules symbolically, exactly.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A store's profit function has derivative dProfit/dPrice = −300 at the current price. Meaning?`,
          options: [
            { t: 'Raising the price by 1€ would DROP profit by about 300€ — the price is already past the sweet spot', ok: true, why: 'The derivative is the per-unit sensitivity: €−300 per +1€ of price, locally. Negative slope means "you are on the downhill side" — lower the price to climb. One number, one business decision.' },
            { t: 'The store loses 300€ every day', ok: false, mis: 'derivative-vs-value', why: 'That would be the PROFIT value (or its time-derivative). This derivative is with respect to PRICE: it compares nearby price choices, not days. Always ask: derivative with respect to WHAT?' },
            { t: 'The price is 300€ too high', ok: false, why: 'The slope says which DIRECTION and how STEEP — not how far to go. (Walking downhill-in-price until slope ≈ 0 finds the best price: that is literally the next two nodes.)' }
          ],
          hints: ['Read it as: Δprofit ≈ (−300) · Δprice for small Δprice.', 'What happens to profit if Δprice = +1?'],
          edge: '"With respect to" (بالنسبة إلى) is the crucial phrase: profit has many derivatives — per price, per ad budget, per staff count. Each is one sensitivity dial.'
        },
        {
          type: 'mcq',
          prompt: `In the numeric-derivative code, why does making h SMALLER eventually make the answer WORSE?`,
          options: [
            { t: 'f(x+h) and f(x−h) become nearly equal — subtracting them cancels the true digits and leaves float rounding noise, then dividing by tiny 2h amplifies it', ok: true, why: 'Catastrophic cancellation (4.2 L3) strikes again: below h ≈ 1e-8 the noise term dominates. The best h balances math error (wants small h) against float error (wants big h) — numerical analysis in one line of code.' },
            { t: 'Small h makes the loop run longer', ok: false, why: 'There is no loop — one evaluation each side. The cost is precision, not time.' },
            { t: 'It doesn’t — smaller h is always closer to the limit', ok: false, mis: 'exact-vs-float', why: 'True in exact math (that IS the limit definition) — false in float64. Try h = 1e-15 on x²at x=3: the answer degrades badly. The definition lives in ℝ; the code lives in float64 — respect the difference.' }
          ],
          hints: ['What did 4.2 say about subtracting nearly-equal floats?', 'The difference is ~h·f′ but the noise is ~1e-16·f. When does noise win?'],
          edge: 'The clean escape — automatic differentiation — applies the derivative RULES to the code itself: exact, no h at all. It is how PyTorch and JAX differentiate a million-parameter function.'
        },
        {
          type: 'mcq',
          prompt: `A smooth-scrolling animation feels "jerky" at the moment it starts. The bug, in derivative language:`,
          options: [
            { t: 'The position curve has a corner at t = 0 — its derivative (velocity) jumps from 0 to a big value instantly', ok: true, why: 'The eye reads velocity, not position: a corner in position = a jump in velocity = visible jerk. Easing curves (ease-in) exist precisely to start the derivative at 0 and grow it smoothly.' },
            { t: 'The frame rate is too low', ok: false, why: 'Low fps stutters CONTINUOUSLY. A jerk at exactly the start, once, is the signature of a velocity discontinuity — a math property of the easing curve, visible at any frame rate.' },
            { t: 'Positions are computed with floats', ok: false, mis: 'bug-vs-numerics', why: 'Float noise is ~1e-16 of a pixel — invisible. The jerk is ~100 pixels/second of instant velocity: a design-level discontinuity, not a precision one.' }
          ],
          hints: ['What quantity does the eye perceive as "smooth motion"? Position, or its rate of change?', 'Velocity. What does a corner in the position curve do to velocity?'],
          edge: 'Designers go further: jumps in the SECOND derivative (acceleration) also feel wrong — "jerk" is literally the third derivative’s name in physics. CSS ease curves manage all of this for you.'
        }
      ]
    }
  }
};

/* ============ 4.4 THE CHAIN RULE ============ */
window.NODES['calc.chain'] = {
  id: 'calc.chain', num: '4.4', trackId: 'calculus',
  title: 'The Chain Rule',
  minutes: 35,
  payoff: "backpropagation's core trick",
  levels: {

    l1: {
      html: `
<h4>Gears in a chain</h4>
<p>Gear A turns gear B; gear B turns gear C. A spins at some rate, B turns 3× as fast as A, C turns 2× as fast as B. How fast does C turn compared to A? Easy: <b>3 × 2 = 6×</b>. Rates through a chain <b>multiply</b>.</p>
<p>Functions chain exactly like gears. If y depends on u, and u depends on x, then:</p>
<pre><code>(how fast y changes with x)  =  (how fast y changes with u) × (how fast u changes with x)</code></pre>
<p>That is the <span class="term">chain rule</span> (قاعدة السلسلة). It is not a strange formula to memorize — it is the gear picture: each stage multiplies its rate onto the chain.</p>
<div class="callout amber"><p><b>Why this rule matters more than the others:</b> real systems are chains. Code calls code; a neural network is 100 functions deep. "How does the input affect the final output?" = multiply the local rates along the chain. Machine learning trains on this one rule, billions of times per second.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Gear A → gear B (3× faster) → gear C (2× faster than B). C turns how fast compared to A?`,
          options: [
            { t: '6× — the rates multiply along the chain', ok: true, why: '3 × 2 = 6. Each stage multiplies its factor onto the whole. This IS the chain rule, with gears instead of symbols.' },
            { t: '5× — the rates add', ok: false, mis: 'rates-add', why: 'Adding is for side-by-side effects. Chained effects multiply: every turn of A makes 3 of B, and EACH of those makes 2 of C — 3 groups of 2.' },
            { t: '2× — only the last gear matters', ok: false, why: 'The last gear multiplies whatever reaches it — and 3× reaches it. Ignore a stage and you lose its factor.' }
          ],
          hints: ['One full turn of A: how many turns of B? And each of those makes how many of C?', '3 turns of B → 6 turns of C.']
        },
        {
          type: 'mcq',
          prompt: `Ice cream sales depend on temperature (+50 sales per °C). Temperature depends on the hour right now (+2 °C per hour). Sales are changing at…`,
          options: [
            { t: '+100 sales per hour — 50 per °C × 2 °C per hour', ok: true, why: 'A real-life chain: hour → temperature → sales. Multiply the local rates: 50 × 2 = 100. Notice the units cancel like fractions: (sales/°C)·(°C/hour) = sales/hour.' },
            { t: '+52 sales per hour — add the rates', ok: false, mis: 'rates-add', why: 'The units expose the error: sales/°C + °C/hour cannot even be added (different units!). Chained rates multiply — and the unit-cancellation confirms it.' },
            { t: 'Cannot combine two different rates', ok: false, why: 'You can when they CHAIN (output of one is input of the other). That is exactly what the chain rule is for.' }
          ],
          hints: ['Write the units of each rate. Which operation makes °C cancel?', 'Multiplication: (sales/°C) × (°C/hour).'],
          edge: 'Unit-checking is a free proof-reader for chain rule work: if the units of your answer are wrong, the calculus is wrong too.'
        },
        {
          type: 'mcq',
          prompt: `A chain has three stages with rates 4, 0, and 100. The end-to-end rate is…`,
          options: [
            { t: '0 — one dead gear kills the whole chain (4 × 0 × 100 = 0)', ok: true, why: 'Multiplication with a zero factor is zero: if stage two passes on NO change, nothing downstream ever hears about the input. One flat stage = a dead chain.' },
            { t: '104 — the working stages still add up', ok: false, mis: 'rates-add', why: 'Chains multiply, and a zero factor is fatal to a product. The 4 and the 100 are trapped behind a wall that transmits nothing.' },
            { t: '400 — skip the zero', ok: false, why: 'The zero cannot be skipped — the signal must PASS THROUGH stage two, and stage two is frozen. 4 × 0 × 100 = 0.' }
          ],
          hints: ['A change enters stage 1, gets ×4… then hits a stage that changes NOTHING.', 'What reaches stage 3?'],
          edge: 'This zero-kills-the-chain fact is famous in ML as the "dying/vanishing gradient": one flat layer and the network stops learning behind it. A billion-dollar problem, and it is just ×0.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The rule, in symbols</h4>
<pre><code>If y = f(g(x)):     y' = f'(g(x)) · g'(x)
  "derivative of the outside, EVALUATED AT the inside,  ×  derivative of the inside"</code></pre>
<p>The often-missed detail: f′ is evaluated <b>at g(x)</b>, not at x — the outer gear's rate depends on where the inner gear has put it.</p>
<h4>Worked examples</h4>
<pre><code>y = (x² + 1)⁵
  outside: u⁵ → 5u⁴        inside: x² + 1 → 2x
  y' = 5(x² + 1)⁴ · 2x  =  10x(x² + 1)⁴

y = e³ˣ:      y' = e³ˣ · 3
y = √(x²+9):  y' = (1 / (2√(x²+9))) · 2x  =  x / √(x²+9)</code></pre>
<h4>Longer chains: just keep multiplying</h4>
<pre><code>y = f(g(h(x)))   →   y' = f'(g(h(x))) · g'(h(x)) · h'(x)</code></pre>
<p>Three gears, three factors. A 100-layer network: 100 factors. The rule never gets more complicated — only longer.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `y = (x² + 1)⁵. Then y' = ?`,
          options: [
            { t: '5(x² + 1)⁴ · 2x', ok: true, why: 'Outside u⁵ gives 5u⁴ (evaluated at u = x²+1), inside gives 2x — multiply. Both gears turn; both rates count.' },
            { t: '5(x² + 1)⁴', ok: false, mis: 'inner-derivative-forgotten', why: 'The most common calculus error on Earth: the outer gear’s rate alone, inner gear forgotten. The ·2x factor is how fast the INSIDE turns — without it, the answer is wrong everywhere except x = ½.' },
            { t: '5(2x)⁴', ok: false, why: 'The outside derivative must be evaluated at the ORIGINAL inside (x²+1), not at its derivative. The inside function and its rate play two different roles.' }
          ],
          hints: ['Name the outside (u⁵) and the inside (x²+1).', 'Differentiate each in its own world, multiply, evaluate the outer at the inner.'],
          edge: '"Forgot the inner derivative" is so common it has a name in every teaching language. Make the ×(inside)′ a reflex.'
        },
        {
          type: 'input',
          prompt: `y = e³ˣ. y' at x = 0 equals ? (a plain number)`,
          accept: ['3'],
          placeholder: '…',
          hints: ['Chain: e³ˣ · (derivative of 3x).', 'At x = 0: e⁰ · 3.'],
          why: 'y′ = 3e³ˣ, and at 0: 3·1 = 3. The 3 in the exponent becomes the chain factor — this is why e^(kx) grows k-times faster.'
        },
        {
          type: 'order',
          prompt: `Differentiate y = √(x² + 9) by the chain rule — arrange the steps.`,
          steps: [
            'Name the layers: outside u = √u, inside u = x² + 9',
            'Differentiate the outside: 1 / (2√u), to be evaluated at u = x² + 9',
            'Differentiate the inside: 2x',
            'Multiply and simplify: (1 / (2√(x²+9))) · 2x = x / √(x²+9)'
          ],
          hints: ['First move is always naming the layers.', 'Each layer differentiates in its own world.', 'The chain assembles them by multiplication.'],
          why: 'Name layers → differentiate each → multiply. The same three moves handle any depth of nesting.'
        },
        {
          type: 'mcq',
          prompt: `In y' = f'(g(x)) · g'(x), why must f' be evaluated at g(x) and not at x?`,
          options: [
            { t: 'The outer function receives g(x) as ITS input — its local rate is measured where it actually operates', ok: true, why: 'f never sees x; it lives at position g(x). A gear’s speed ratio depends on where it is meshed. Evaluating f′ at x asks about a place f never visits.' },
            { t: 'Convention — either point works', ok: false, mis: 'evaluation-point-loose', why: 'Test on y = (x²)³ = x⁶ (true derivative 6x⁵): the rule at g(x) gives 3(x²)²·2x = 6x⁵ ✓; at x it gives 3x²·2x = 6x³ ✗. Evaluation point is substance, not style.' },
            { t: 'Because g(x) is larger than x', ok: false, why: 'Size is irrelevant (g(x) may be smaller). The reason is structural: g(x) is f’s actual input location.' }
          ],
          hints: ['Where does the outer function actually live — at x, or at g(x)?', 'Verify with y = (x²)³, whose true derivative you know via x⁶.'],
          edge: 'Testing a rule on a case you can check independently (x⁶!) is the same habit as testing code against a brute-force version. Keep it.'
        },
        {
          type: 'mcq',
          prompt: `A 3-stage chain has local rates 0.9, 0.9, 0.9 at some point. A 30-stage chain has thirty 0.9s. End-to-end rates?`,
          options: [
            { t: '0.9³ ≈ 0.73 and 0.9³⁰ ≈ 0.04 — long chains of slightly-damping stages nearly kill the signal', ok: true, why: 'Products of near-1 factors decay exponentially (0.9ⁿ — Track 4.1!). Thirty gentle dampers ≈ a wall. This is the "vanishing gradient": deep networks’ oldest enemy, and it is pure chain rule.' },
            { t: 'Both 0.9 — the rate per stage is what matters', ok: false, mis: 'rates-add', why: 'The chain MULTIPLIES: each stage applies its 0.9 to everything upstream. Per-stage health does not guarantee end-to-end health — that is exactly why depth is hard.' },
            { t: '2.7 and 27 — thirty stages, thirty times the effect', ok: false, why: 'Adding again! 0.9+0.9+… has no meaning here. The chain is ×0.9 thirty times = 0.9³⁰ ≈ 0.042.' }
          ],
          hints: ['Chain rule for 30 layers: how do the thirty 0.9s combine?', '0.9³⁰ — estimate with the 4.1 tools: ≈ e⁻³.'],
          edge: 'And rates of 1.1 explode the same way (1.1³⁰ ≈ 17). Deep-learning history is the fight to keep chain products near 1 — ReLU, normalization, residual connections all exist for this.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Backpropagation IS the chain rule</h4>
<pre><code>prediction = layer3(layer2(layer1(input)))     // a function chain
error = loss(prediction)

// training asks: d(error)/d(each weight)?
// answer: multiply local derivatives backward along the chain:
d(error)/d(w1) = loss' · layer3' · layer2' · d(layer1)/d(w1)</code></pre>
<p>"Backward" because it is cheaper to multiply from the error end back toward the inputs — one sweep collects the derivative for EVERY weight. That sweep is called <span class="term">backpropagation</span> (الانتشار العكسي), and it is the chain rule organized as an algorithm. Every model you have heard of learned by this.</p>
<h4>The same trick outside ML</h4>
<ul>
  <li><b>Error bars:</b> a measurement error of ±0.1 in x becomes ±0.1·|f′(x)| in f(x) — errors travel through chains by multiplying rates.</li>
  <li><b>Sensitivity analysis:</b> "if the exchange rate moves 1%, how does our quarterly profit move?" — a chain of dependencies, multiplied.</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Backpropagation computes d(error)/d(weight) for a million weights. What is it, mathematically?`,
          options: [
            { t: 'The chain rule, applied backward through the layer-chain, sharing the common factors across all weights', ok: true, why: 'Each weight’s derivative is a product of local rates along its path to the error. Sweeping backward computes shared prefixes once — a dynamic-programming trick (2.3!) layered on the chain rule. No new math; brilliant organization.' },
            { t: 'A brute-force search over weight changes', ok: false, mis: 'search-vs-derivative', why: 'Trying each weight ±ε would need two million forward runs. The chain rule gets ALL million derivatives in about two runs’ cost — the difference between possible and impossible training.' },
            { t: 'A statistical estimate that is sometimes wrong', ok: false, why: 'It is exact calculus (up to float precision) — the same rules you used in L2, mechanized. The randomness in training comes from data sampling, not from the derivative computation.' }
          ],
          hints: ['A network is f(g(h(…))) — what rule differentiates chains?', 'And why backward? Which direction lets partial products be reused?'],
          edge: 'The reuse idea has a name: reverse-mode automatic differentiation. Cost: ~2× a forward run, independent of weight count. That constant is why deep learning is economically possible.'
        },
        {
          type: 'mcq',
          prompt: `A sensor measures temperature with error ±0.5°C. Your code computes energy = f(T) where f′(T) = 40 J/°C at the current reading. The energy value carries an error of about…`,
          options: [
            { t: '±20 J — errors pass through a function multiplied by its local derivative', ok: true, why: 'Small input wiggles scale by the slope: ΔE ≈ f′·ΔT = 40 × 0.5. The derivative is the error-amplification factor — the chain rule applied to uncertainty.' },
            { t: '±0.5 J — errors pass through unchanged', ok: false, mis: 'error-passes-through', why: 'Only if f′ = 1! A steep function magnifies input noise; a flat one absorbs it. The slope IS the magnification — never assume it is 1.' },
            { t: '±40 J — the derivative is the error', ok: false, why: 'The derivative is the error PER UNIT of input error — multiply by the actual ±0.5 to get the output error. Units again: (J/°C)·(°C) = J.' }
          ],
          hints: ['Δoutput ≈ slope × Δinput.', '40 × 0.5.'],
          edge: 'Chains extend it: sensor → calibration → model → report, each stage multiplying its slope onto the error. Long pipelines can silently amplify noise ×1000 — audit the product of slopes.'
        },
        {
          type: 'mcq',
          prompt: `A deep network stops learning: gradients reaching the early layers are ~10⁻¹⁵. In gear language, the diagnosis is…`,
          options: [
            { t: 'The chain product of many small local rates has vanished — thirty gears each turning at 0.3× leaves nothing at the far end', ok: true, why: 'The vanishing-gradient problem: each layer contributes a factor; many factors below 1 multiply to ~0 (0.3³⁰ ≈ 10⁻¹⁶). The early layers hear nothing about the error, so they cannot improve. Pure L1-question-3, at industrial scale.' },
            { t: 'The learning rate is set to zero', ok: false, why: 'That would freeze ALL layers equally. The signature here — later layers learn, early layers starve — points at the chain product decaying with depth.' },
            { t: 'The dataset is too small', ok: false, mis: 'data-blame', why: 'Data problems change WHAT is learned, not whether the gradient physically reaches layer 1. A 10⁻¹⁵ gradient is arithmetic (a product of small factors), diagnosable before touching the data.' }
          ],
          hints: ['Gradient at layer 1 = product of local rates of every layer above it.', 'What does a long product of sub-1 factors do (4.1)?'],
          edge: 'The fixes are famous now: ReLU (local rate = 1 when active), residual connections (add a +1 path so the product has a shortcut), careful init. All engineering answers to one multiplication.'
        }
      ]
    }
  }
};
