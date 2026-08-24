/* Track 4 content — nodes 4.1 and 4.2 (simple-English style + Arabic glosses) */

/* ============ 4.1 FUNCTIONS & GROWTH ============ */
window.NODES['calc.growth'] = {
  id: 'calc.growth', num: '4.1', trackId: 'calculus',
  title: 'Functions & Growth',
  minutes: 30,
  payoff: 'log-time algorithms · reading growth',
  levels: {

    l1: {
      widget: 'growthlab',
      html: `
<h4>Two kinds of growing</h4>
<p>Some things grow by <b>adding</b>: your savings grow by 10 € each week. Some things grow by <b>multiplying</b>: bacteria double every hour. Multiplying growth is called <span class="term">exponential</span> — and it is much, much faster than it feels.</p>
<p>The famous example: fold a paper 42 times (if you could). Its thickness would reach the moon. 2⁴² is that big.</p>
<h4>The logarithm: the "which power?" question</h4>
<p>The <span class="term">logarithm</span> asks the reverse question. 2ˣ = 1024 — what is x? Answer: log₂(1024) = 10. The log undoes the exponential, like subtraction undoes addition.</p>
<div class="callout amber"><p><b>Why programmers love logs:</b> log₂ answers "how many times can I cut this in half?" A million items → only ~20 cuts. That "20" is why binary search feels like magic (شرحناها في 2.4).</p></div>
<p>Play with the widget: on a normal scale, 2ˣ escapes the chart fast. Turn on the log scale — now 2ˣ becomes a straight line. Log scale is how we SEE exponential things.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Bacteria double every hour. Now: 1000. After 3 hours?`,
          options: [
            { t: '8000 — doubling 3 times means ×2×2×2 = ×8', ok: true, why: 'Multiplying growth: each hour multiplies by 2. Three hours = 2³ = 8 times more.' },
            { t: '3000 — add 1000 each hour', ok: false, mis: 'linear-thinking', why: 'That is adding growth. Doubling multiplies: 1000 → 2000 → 4000 → 8000. The gap gets bigger every hour.' },
            { t: '6000 — 2 × 3 = 6 times', ok: false, why: 'The 2 and the 3 do not multiply each other. The 2 multiplies ITSELF 3 times: 2³ = 8.' }
          ],
          hints: ['Follow it hour by hour: 1000 → ? → ? → ?', '1000 → 2000 → 4000 → 8000.']
        },
        {
          type: 'input',
          prompt: `2¹⁰ = ? (a number every programmer knows by heart)`,
          accept: ['1024'],
          placeholder: '…',
          hints: ['Keep doubling: 2, 4, 8, 16, 32…', '…64, 128, 256, 512, and one more.'],
          why: '1024 ≈ 1000. Useful trick: 2¹⁰ ≈ 10³, so every +10 in the power adds ~3 digits.'
        },
        {
          type: 'mcq',
          prompt: `log₂(1024) asks which question?`,
          options: [
            { t: '"2 to WHICH power gives 1024?" — answer: 10', ok: true, why: 'The log is the reverse of the exponential. It finds the missing power.' },
            { t: '"What is 1024 divided by 2?" — answer: 512', ok: false, mis: 'log-is-half', why: 'That is one halving. The log counts ALL the halvings needed to reach 1: 1024 needs 10 of them.' },
            { t: '"What is 2 × 1024?"', ok: false, why: 'The log never multiplies — it asks the "which power?" question. It is a question, not an operation on the numbers directly.' }
          ],
          hints: ['Fill the blank: 2^? = 1024.', 'Count the doublings from 1 to 1024.'],
          edge: 'Same idea in code: how many times can a loop cut n in half? log₂(n) times. That is the log in O(log n).'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The rules, cleanly</h4>
<pre><code>2ᵃ · 2ᵇ = 2ᵃ⁺ᵇ            multiplying powers → add the exponents
log(a·b) = log(a) + log(b)  the mirror rule: logs turn × into +
log₂(2ˣ) = x                log undoes exponential (they are inverse functions — دالتان عكسيتان)</code></pre>
<p>"Logs turn multiplication into addition" is the whole reason logarithms were invented — and why log-scale charts turn exponential curves into straight lines.</p>
<h4>The growth ladder (from 2.4, now with reasons)</h4>
<p>log n grows slower than n, which grows slower than n², which grows slower than 2ⁿ. Why is 2ⁿ always the winner in the end? Because it multiplies by 2 <em>every step</em>, while n² only multiplies by about (1 + 2/n) — a factor that shrinks toward 1. A runner who doubles speed daily beats every runner with a fixed plan.</p>
<h4>Numbers to carry in your pocket</h4>
<div class="tbl-scroll"><table class="tt">
  <tr><th>n</th><th>log₂ n</th><th>meaning</th></tr>
  <tr><td>1,000</td><td>≈ 10</td><td>1 thousand ≈ 2¹⁰</td></tr>
  <tr><td>1,000,000</td><td>≈ 20</td><td>1 million ≈ 2²⁰</td></tr>
  <tr><td>1,000,000,000</td><td>≈ 30</td><td>1 billion ≈ 2³⁰</td></tr>
</table></div>`,
      questions: [
        {
          type: 'input',
          prompt: `log₂ of 1 billion ≈ ? (whole number)`,
          accept: ['30'],
          placeholder: '…',
          hints: ['Use 2¹⁰ ≈ 10³.', 'A billion = 10⁹ = (10³)³ ≈ (2¹⁰)³.'],
          why: '≈ 30. Binary search on a billion items: about 30 questions. That is the practical power of logs.'
        },
        {
          type: 'mcq',
          prompt: `Which rule is TRUE?`,
          options: [
            { t: 'log(a·b) = log(a) + log(b)', ok: true, why: 'Logs turn multiplication into addition — because multiplying powers adds exponents. The core log rule.' },
            { t: 'log(a + b) = log(a) + log(b)', ok: false, mis: 'log-of-sum', why: 'A very common slip. Test it: log₂(2+2) = 2, but log₂2 + log₂2 = 1+1 = 2… try again with 4+4: log₂8 = 3, but 2+2 = 4. No rule exists for log of a SUM.' },
            { t: 'log(a·b) = log(a) · log(b)', ok: false, why: 'Logs downgrade the operation one level: × becomes +, not ×. Test with small numbers to see it.' }
          ],
          hints: ['Logs come from exponents: 2ᵃ·2ᵇ = 2ᵃ⁺ᵇ.', 'Multiplying inputs adds the exponents — read that as a log rule.'],
          edge: 'Testing rules on small numbers (a = b = 2) takes ten seconds and catches most formula-memory errors. Build the habit.'
        },
        {
          type: 'mcq',
          prompt: `Why does 2ⁿ ALWAYS beat n² for big n — even though n² starts ahead sometimes?`,
          options: [
            { t: '2ⁿ multiplies by a fixed 2 each step; n² multiplies by a factor that shrinks toward 1', ok: true, why: 'Going n → n+1: 2ⁿ grows ×2, but n² grows ×(1 + 1/n)² ≈ ×1 for large n. A fixed multiplier beats a fading one, forever after some point.' },
            { t: 'It doesn’t — for some very large n, n² catches up again', ok: false, mis: 'crossover-returns', why: 'Once 2ⁿ passes n², the gap only widens (its per-step multiplier stays bigger). Crossovers between these shapes happen once, never again.' },
            { t: 'Because 2ⁿ has a bigger base', ok: false, why: '"Base" is not the reason — 1.01ⁿ also beats n² eventually! ANY fixed multiplier above 1 wins against polynomial growth in the end.' }
          ],
          hints: ['Compare the step n → n+1 for both: what does each multiply by?', '×2 versus ×(about 1). Who wins a long race?'],
          edge: 'Even 1.01ⁿ (1% growth) passes n¹⁰⁰ eventually. Exponential vs polynomial is a different league, not a bigger number.'
        },
        {
          type: 'mcq',
          prompt: `A log-scale chart shows a company's users as a straight rising line. The real growth is…`,
          options: [
            { t: 'Exponential — a straight line on a log scale means multiplying by a fixed factor each period', ok: true, why: 'Log scale turns × into equal steps up. Straight line = equal multiplications = exponential. This is how growth charts are read in practice.' },
            { t: 'Linear — straight lines mean steady adding', ok: false, mis: 'scale-blind', why: 'On a NORMAL scale, yes. But this chart is log-scale: each step up is a ×10 (or ×2), not a +10. Always check the axis before reading the shape.' },
            { t: 'Slowing down', ok: false, why: 'Slowing growth would curve DOWNWARD on a log chart. Straight means the multiplication rate is constant — steady exponential.' }
          ],
          hints: ['On a log axis, what does moving up one step mean?', 'Multiplying by a fixed amount. What growth makes those steps at a constant speed?'],
          edge: 'COVID charts, startup metrics, Moore’s law — all read on log scales for exactly this reason. Axis first, conclusion second.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Growth thinking in daily engineering</h4>
<pre><code>// how many bits do I need for n values?   bits = ceil(log2(n))
Math.ceil(Math.log2(1_000_000))   // 20 bits for a million ids

// how deep is a balanced tree with n items?   ~log2(n) levels
// how many retries with doubling backoff before 1 hour?  log2(3600/1) ≈ 12</code></pre>
<p>Any time you see "double each step" or "cut in half each step", the answer to "how many steps?" is a logarithm.</p>
<h4>The overflow warning</h4>
<p>Exponentials break things quietly. 2⁶³ is about 9.2 × 10¹⁸ — the edge of a 64-bit integer. A doubling process crosses that edge in just 63 steps. If your code doubles something in a loop, ask early: "after how many steps does this overflow (يتجاوز حد التخزين)?"</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A retry system waits 1s, then 2s, then 4s… (doubling backoff). About how many retries happen in the first hour?`,
          options: [
            { t: 'About 12 — the waits sum like 2ⁿ, and 2¹² ≈ 4096 seconds ≈ an hour', ok: true, why: 'Total wait after n retries ≈ 2ⁿ seconds. Solve 2ⁿ = 3600 → n = log₂ 3600 ≈ 11.8. Doubling gets big fast, so retries get rare fast — which is the design goal.' },
            { t: 'About 3600 — one per second', ok: false, mis: 'linear-thinking', why: 'That is a FIXED 1-second wait. Doubling spreads retries out exponentially: after 12 waits you are already waiting over an hour between tries.' },
            { t: 'About 60', ok: false, why: 'That would fit waits of ~60s each. But the waits GROW — most of the hour is spent in the last one or two waits.' }
          ],
          hints: ['Sum of 1+2+4+…+2ⁿ ≈ 2ⁿ⁺¹.', 'Find n with 2ⁿ ≈ 3600.'],
          edge: 'This backoff pattern protects servers everywhere (npm, AWS, your browser). The log tells you it reaches "wait an hour" in ~12 steps — fast enough to matter in tests!'
        },
        {
          type: 'input',
          prompt: `You must give a unique binary id to 1,000,000 users. Minimum bits needed = ceil(log₂(1,000,000)) = ?`,
          accept: ['20'],
          placeholder: '…',
          hints: ['2²⁰ = 1,048,576 — just over a million.', '2¹⁹ = 524,288 is not enough.'],
          why: '20 bits. The log answers "how many binary digits?" — the same question as "how many halvings?", mirrored.'
        },
        {
          type: 'mcq',
          prompt: `A loop doubles a count starting from 1. A teammate says "it's just a loop, let it run". When does the int64 overflow?`,
          options: [
            { t: 'After only 63 doublings — exponentials cross 9.2×10¹⁸ almost immediately', ok: true, why: '2⁶³ ≈ 9.2×10¹⁸ is the int64 edge. 63 loop turns — nothing, in loop terms. Doubling processes need overflow thinking from day one.' },
            { t: 'Never in practice — 64 bits is huge', ok: false, mis: 'linear-thinking', why: '64 bits is huge for COUNTING (adding 1): ~10¹⁹ steps. For DOUBLING it is 63 steps. The same container, two totally different lifetimes — growth shape decides.' },
            { t: 'After about a million steps', ok: false, why: 'A million doublings would need 2¹⁰⁰⁰⁰⁰⁰ — a number with ~300,000 digits. The real edge arrives at step 63.' }
          ],
          hints: ['Overflow when 2ⁿ passes 2⁶³.', 'n = 63. Is that a big number of loop turns?'],
          edge: 'Same math warns about: array-doubling growth (fine — only ~40 doublings to fill RAM), compound percentages, and viral growth. Count the doublings, not the size.'
        }
      ]
    }
  }
};

/* ============ 4.2 LIMITS & CONTINUITY ============ */
window.NODES['calc.limits'] = {
  id: 'calc.limits', num: '4.2', trackId: 'calculus',
  title: 'Limits & Continuity',
  minutes: 35,
  payoff: 'convergence · numerical precision',
  levels: {

    l1: {
      html: `
<h4>The value you approach</h4>
<p>Walk halfway to a wall. Then halfway again. And again. You never touch the wall — but there is no doubt WHERE you are heading. That target is a <span class="term">limit</span>: the value a process approaches, even if it never exactly arrives.</p>
<p>Same idea with functions. Look at f(x) = (x² − 1)/(x − 1). At x = 1 exactly, it is 0/0 — broken, undefined. But walk TOWARD x = 1:</p>
<pre><code>f(1.1) = 2.1     f(1.01) = 2.01     f(1.001) = 2.001 …</code></pre>
<p>The function is clearly heading to <b>2</b>. We write: the limit as x → 1 is 2. The hole at x = 1 does not change where the road was going.</p>
<div class="callout amber"><p><b>Key separation:</b> "what happens AT the point" and "what happens NEAR the point" are two different questions. Limits only care about NEAR. This one separation is the foundation of all calculus.</p></div>
<p>A function is <span class="term">continuous</span> when there are no surprises: the value AT each point equals the limit NEAR it. No jumps, no holes — you can draw it without lifting the pen.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `You walk halfway to the wall, again and again, forever. The limit of your position is…`,
          options: [
            { t: 'The wall — that is where the process is heading, even if no step touches it', ok: true, why: 'The limit is the destination of the trend, not a step of the journey. Every distance to the wall gets passed eventually — the wall is the only possible target.' },
            { t: 'Nothing — you never arrive, so there is no answer', ok: false, mis: 'limit-needs-arrival', why: 'The limit does not need arrival. It asks: "is there a value you get arbitrarily close to and stay close to?" Yes: the wall. That IS the answer.' },
            { t: 'Halfway — that is the repeated rule', ok: false, why: 'Halfway of WHAT keeps changing. The positions are 1/2, 3/4, 7/8… and those numbers head to 1 (the wall), not to 1/2.' }
          ],
          hints: ['List positions: 1/2, 3/4, 7/8, 15/16… heading where?', 'Toward 1 — the wall.']
        },
        {
          type: 'mcq',
          prompt: `f(x) = (x² − 1)/(x − 1) is broken (0/0) at x = 1, but f(1.001) = 2.001. What is the limit of f as x → 1?`,
          options: [
            { t: '2 — the values near x = 1 crowd around 2; the hole at x = 1 does not matter', ok: true, why: 'Limits ask about NEAR, not AT. From both sides, the values approach 2. (Secret: for x ≠ 1, f simplifies to x + 1 — a line with one missing point.)' },
            { t: 'Undefined — f(1) does not exist, so no limit exists', ok: false, mis: 'at-vs-near', why: 'This mixes the two questions. f(1) is undefined ✓ — but the limit is a different question, about the approach. The approach clearly targets 2.' },
            { t: '0 — because the top is 0 at x = 1', ok: false, why: 'The bottom is also 0 — a 0/0 is not zero, it is a question mark. Answer it by approaching: 2.001, 2.0001… → 2.' }
          ],
          hints: ['Try x = 0.999 too: f = 1.999. Both sides agree?', 'Both crowd around 2.'],
          edge: 'Every derivative in the next node is a 0/0 puzzle solved exactly this way. This little idea carries all of calculus.'
        },
        {
          type: 'mcq',
          prompt: `Which everyday thing is NOT continuous (has a jump)?`,
          options: [
            { t: 'Postage price by weight: 100g costs 2€, but 101g suddenly costs 4€', ok: true, why: 'A jump: crossing 100g changes the price instantly. Step-prices, tax brackets, shipping tiers — real life is full of jumps, and each jump is a place where "nearby input" does NOT mean "nearby output".' },
            { t: 'Your height as you grow up', ok: false, why: 'Height changes smoothly — no day where you instantly gain 10cm. Continuous.' },
            { t: 'The temperature of your coffee cooling', ok: false, why: 'Cooling is smooth — each second changes the temperature a little. Continuous (and calculus describes exactly how it cools).' }
          ],
          hints: ['A jump means: tiny input change, big sudden output change.', 'Where does one extra gram double the price?'],
          edge: 'Jumps in code: if (weight > 100) price = 4. Every if-threshold is a discontinuity — and users FEEL them (why is 101g double?!).'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Saying "approaches" precisely</h4>
<p>"The limit of f(x) as x → a is L" means: <b>you can force f(x) as close to L as anyone demands, just by keeping x close enough to a</b> (without touching a itself). It is a challenge game: someone demands "within 0.001!" — you answer with a small zone around a that delivers it. If you can always win, the limit is L.</p>
<p>(Notice the ∀∃ shape from node 1.3: FOR EVERY demanded closeness, THERE EXISTS a zone that works. The order of those two matters — as always.)</p>
<h4>Continuity, precisely</h4>
<p>f is <span class="term">continuous</span> at a when three things line up: f(a) exists, the limit as x → a exists, and they are <b>equal</b>. Break any one → a hole, a jump, or a wild oscillation.</p>
<h4>Working rules</h4>
<ul>
  <li>Limits of sums, products, quotients = sums, products, quotients of limits (when the pieces exist and no division by 0).</li>
  <li>Polynomials, sin, cos, eˣ are continuous everywhere: their limit is just their value. The interesting cases are the broken points — 0/0 corners.</li>
  <li>For a 0/0: simplify first. (x²−1)/(x−1) = x+1 for x ≠ 1 → limit is 2. Cancel, then substitute.</li>
</ul>`,
      questions: [
        {
          type: 'input',
          prompt: `The limit of (x² − 9)/(x − 3) as x → 3 = ?`,
          accept: ['6'],
          placeholder: '…',
          hints: ['0/0 — so simplify first. Factor the top.', '(x−3)(x+3)/(x−3) = x + 3 for x ≠ 3.', 'Now substitute x = 3.'],
          why: 'Factor, cancel, substitute: x + 3 → 6. The hole at x = 3 hides a clean answer.'
        },
        {
          type: 'mcq',
          prompt: `f(x) = 5 for x < 0, and f(x) = 7 for x ≥ 0. What is the limit of f as x → 0?`,
          options: [
            { t: 'It does not exist — the left side approaches 5, the right side approaches 7, and they disagree', ok: true, why: 'A limit needs both sides to agree on ONE target. A jump gives two targets — so no (single) limit. This is exactly what "discontinuous at 0" looks like.' },
            { t: '7 — that is the value AT zero', ok: false, mis: 'at-vs-near', why: 'The value at 0 answers a different question. The limit listens to the approach — and the approach from the left insists on 5. Disagreement = no limit.' },
            { t: '6 — the average of the two sides', ok: false, mis: 'average-the-jump', why: 'Tempting, but limits never average. The definition demands ALL nearby values crowd one target; here they crowd two. (Some advanced tools use the average — the plain limit does not.)' }
          ],
          hints: ['Approach 0 from the left: what values do you see? From the right?', '5 and 7 — can one limit satisfy both?'],
          edge: 'One-sided limits (from left only / right only) DO exist here: 5 and 7. The two-sided limit exists only when they match.'
        },
        {
          type: 'mcq',
          prompt: `The precise definition says: for EVERY demanded closeness ε, THERE IS a zone δ that delivers it. Why is the ∀∃ order essential?`,
          options: [
            { t: 'The zone may depend on the demand — tighter demands earn smaller zones. Swapping to ∃∀ would demand one magic zone for all demands', ok: true, why: 'Same lesson as 1.3: ∀ε ∃δ lets δ answer each ε. ∃δ ∀ε would need one δ satisfying even impossible ε — almost nothing would have limits. The quantifier order IS the definition.' },
            { t: 'No reason — both orders mean the same', ok: false, mis: 'order-irrelevant', why: 'They differ exactly as "everyone has a password" differs from "one password for everyone" (1.3). One order defines limits; the other defines almost nothing.' },
            { t: 'Because ε comes before δ in the Greek alphabet', ok: false, why: 'The letters are tradition; the ORDER is logic. Rename them and the ∀∃ structure still carries the meaning.' }
          ],
          hints: ['Recall ∀x∃y vs ∃y∀x from node 1.3.', 'Should the zone be allowed to react to the demand?'],
          edge: 'This definition (by Weierstrass, ~1860) cleaned up 200 years of vague "infinitely small" talk. The quantifiers of Track 1 were the cleaning tool.'
        },
        {
          type: 'mcq',
          prompt: `g is continuous at 4, and g(4) = 10. What is the limit of g as x → 4?`,
          options: [
            { t: '10 — continuity means exactly that: limit = value', ok: true, why: 'That equation IS the definition of continuous. For continuous functions, computing limits is just plugging in — no drama.' },
            { t: 'Cannot tell — limits and values are independent', ok: false, mis: 'at-vs-near', why: 'Independent in GENERAL, yes — that was the whole point of L1. But "continuous" is precisely the promise that they agree. The word buys you the shortcut.' },
            { t: 'Approximately 10, but maybe not exactly', ok: false, why: 'Exactly 10. Continuity is an exact equation (limit = value), not an approximation.' }
          ],
          hints: ['Write the definition of continuity at a point.', 'limit = value. Both are given here.']
        },
        {
          type: 'mcq',
          prompt: `Why do we bother simplifying (x²−1)/(x−1) to x+1 instead of just plugging x = 1 into a calculator?`,
          options: [
            { t: 'Plugging x = 1 gives 0/0 — an error, not an answer. Algebra removes the fake obstacle and shows the real target', ok: true, why: 'The division by zero is a disguise: for every x except 1, the function IS x+1. Cancel first, then substitute — the standard 0/0 procedure.' },
            { t: 'Calculators are not allowed in proofs', ok: false, why: 'The problem is deeper: at exactly x = 1 there is nothing to calculate — 0/0 is undefined for calculators AND mathematicians. Algebra fixes the question, not the tool.' },
            { t: 'Simplifying changes the function into a nicer one', ok: false, mis: 'simplify-changes', why: 'Careful — it changes the function only at ONE point (the hole gets filled). Everywhere else they are equal, and limits never look at the one point. That is why the trick is legal.' }
          ],
          hints: ['What does a calculator say at exactly x = 1?', 'Error. Where must the answer come from instead?'],
          edge: 'Numerically x = 1.0000001 works too — but floating point near 0/0 gets noisy (small/small amplifies rounding). Algebra gives the exact target; numerics approximate it.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Limits are what "convergence" means in code</h4>
<pre><code>// iterate until the change is tiny — computing a limit numerically:
let x = 1;
while (true) {
  const next = (x + 2 / x) / 2;        // Newton's method for √2
  if (Math.abs(next - x) < 1e-12) break;
  x = next;                             // 1.5, 1.4167, 1.41422, … → √2
}</code></pre>
<p>Every "iterate until stable" loop — Newton's method, PageRank (3.8!), physics solvers, ML training — is chasing a limit. The stop-condition asks: "are we close enough to the target?" — the ε of the definition, hardcoded as 1e-12.</p>
<h4>Where discontinuity bites in software</h4>
<ul>
  <li><b>Thresholds:</b> if (score >= 0.5) approve — two users differing by 0.0001 get opposite answers. Every threshold is a jump; know where yours are.</li>
  <li><b>Floating point:</b> functions that are continuous in math can jump in float-land near cancellation (subtracting nearly-equal numbers). The math limit says 2; float noise says 1.9999847.</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `The Newton loop above stops when the change is under 1e-12. In limit language, this loop is…`,
          options: [
            { t: 'Approaching the limit √2, and stopping once inside a chosen closeness ε = 1e-12', ok: true, why: 'The sequence 1.5, 1.4167, 1.41422… has limit √2. Code cannot run forever, so it stops inside a tolerance — a practical ε. Convergence loops are limits with a budget.' },
            { t: 'Computing √2 exactly', ok: false, mis: 'exact-vs-limit', why: '√2 is irrational — no finite loop reaches it exactly (and floats could not store it anyway). The loop reaches "within 1e-12 of it", which is what applications actually need.' },
            { t: 'Looping forever, since the limit is never reached', ok: false, why: 'The CHANGE shrinks below 1e-12 quickly (Newton roughly doubles correct digits per step — 5-6 turns here). Never "arriving" at the limit does not prevent getting close fast.' }
          ],
          hints: ['What number is the sequence heading toward?', 'And what role does 1e-12 play, in ε-language?'],
          edge: 'Choosing ε is engineering: 1e-12 for physics, 1e-3 for graphics, "loss stopped improving" for ML. Same limit idea, different budgets.'
        },
        {
          type: 'mcq',
          prompt: `A loan app approves if score ≥ 0.5. Two applicants score 0.4999 and 0.5001. What is the mathematical name for what they experience — and the practical concern?`,
          options: [
            { t: 'A discontinuity: nearly identical inputs, opposite outcomes. Concern: the jump is invisible to the people affected and sensitive to noise', ok: true, why: 'The approval function jumps at 0.5. Since scores carry noise (±0.01 easily), the outcome near the edge is effectively random — a fairness and stability problem hiding in one ≥ sign.' },
            { t: 'Nothing special — rules need lines somewhere', ok: false, why: 'Lines are needed, yes — but KNOWING they are discontinuities changes design: add human review bands near the edge, smooth the response, or show the distance to the line. Naming the jump is the first fix.' },
            { t: 'A limit failure — the score has no limit at 0.5', ok: false, mis: 'function-vs-limit', why: 'The SCORE is continuous; the DECISION function jumps. Being precise about which function is discontinuous points to the fix (change the decision, not the score).' }
          ],
          hints: ['Small input difference, large outcome difference — what property just failed?', 'Continuity — of which function exactly?'],
          edge: 'Common softening: replace the hard jump with a band (0.45–0.55 → manual review). In ML the same idea appears as smooth "sigmoid" outputs instead of hard steps.'
        },
        {
          type: 'mcq',
          prompt: `You compute (x²−1)/(x−1) in floats at x = 1 + 1e-13 and get 2.0000444… but the limit says 2.0000000000001. Who is lying?`,
          options: [
            { t: 'Neither — floats near 0/0 subtract nearly-equal numbers and amplify rounding noise ("catastrophic cancellation"). The algebraic form x+1 computes it cleanly', ok: true, why: 'x²−1 and x−1 are both ~1e-13 with ~1e-16 rounding — dividing them amplifies the noise ~1000×. The simplified form x+1 has no subtraction of near-equals, so it is exact. Simplify BEFORE computing near singular points.' },
            { t: 'The math — limits are only approximations', ok: false, why: 'Backwards: the limit is EXACT; the float evaluation is the approximation. When they disagree near a 0/0, suspect the float arithmetic first.' },
            { t: 'The computer has a bug', ok: false, mis: 'bug-vs-numerics', why: 'No bug — this is float arithmetic working exactly as specified. Cancellation is predictable, documented behavior, and the fix (algebraic simplification) is also standard. Numerics ≠ defects.' }
          ],
          hints: ['What happens when you subtract two numbers that agree in 13 digits?', 'The 13 agreeing digits vanish; the rounding noise remains — then you DIVIDE by something tiny.'],
          edge: 'The rule of thumb: near a 0/0, rearrange the formula to avoid subtracting near-equals. Math identities are numerical-stability tools — a theme every numerics course expands.'
        }
      ]
    }
  }
};
