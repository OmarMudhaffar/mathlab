/* Track 5 content — nodes 5.6, 5.7 and the Oracle boss */

/* ============ 5.6 MONTE CARLO & THE LAW OF LARGE NUMBERS ============ */
window.NODES['prob.montecarlo'] = {
  id: 'prob.montecarlo', num: '5.6', trackId: 'probability',
  title: 'Monte Carlo & Large Numbers',
  minutes: 30,
  payoff: 'estimation by simulation · why averages stabilize',
  levels: {

    l1: {
      widget: 'montecarlo',
      html: `
<h4>Estimate by throwing darts</h4>
<p>Some questions are too hard to count exactly. The <span class="term">Monte Carlo</span> idea: stop counting — <b>sample</b>. Throw random darts at the problem, measure the fraction that hit, and let that fraction estimate the true probability.</p>
<p>The famous demo: a circle inside a square. Circle area ÷ square area = π/4. So throw random points at the square: about π/4 of them land inside the circle. Count, multiply by 4 — you just measured π with randomness.</p>
<h4>Why it works: the law of large numbers</h4>
<p>The <span class="term">law of large numbers</span> (قانون الأعداد الكبيرة) says: as you take more independent samples, the running average settles toward the true expected value. Ten darts: rough. Ten thousand: close. It is the mathematical guarantee behind "more data = better estimate" — and behind why casinos always win eventually (5.4's expectations, enforced by volume).</p>
<div class="callout amber"><p><b>Throw darts below.</b> Watch the estimate wobble wildly at 500 darts, then calm down near 3.14 at 5000+. The wobble never fully dies — it just shrinks. That shrinking IS the law.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `In the dart demo, why does (darts in circle) / (all darts) estimate π/4?`,
          options: [
            { t: 'A uniform random dart lands in a region with probability = that region’s share of the area — and the circle’s share is π/4', ok: true, why: 'Uniform darts turn area-fractions into probabilities. The sample fraction then estimates that probability (law of large numbers). Geometry → probability → counting: the full pipeline in one toy.' },
            { t: 'Because π is random', ok: false, why: 'π is a fixed constant — the RANDOMNESS is our measuring tool, not the thing measured. Monte Carlo uses random probes to measure deterministic quantities. That inversion is the whole idea.' },
            { t: 'Lucky coincidence of circles', ok: false, why: 'Any shape works: throw darts at ANY region of known container, and the hit-fraction estimates its area share. The circle is just the demo with a celebrity answer.' }
          ],
          hints: ['P(dart in circle) = circle area / square area.', 'And what does the sample fraction approach as darts accumulate?']
        },
        {
          type: 'mcq',
          prompt: `After 100 darts your π estimate reads 3.32. Is the method broken?`,
          options: [
            { t: 'No — 100 samples give a rough estimate; the law of large numbers promises convergence AS n grows, not accuracy at n = 100', ok: true, why: 'Small samples wobble — that is the deal. At 10,000 darts the estimate typically sits within ~0.03 of π. Judge Monte Carlo by its convergence trend, never by one early reading.' },
            { t: 'Yes — the answer must be 3.14 at any sample size', ok: false, mis: 'expectation-as-bound', why: 'Demanding exactness from samples repeats the 5.5 error: randomness delivers wobble around the truth, shrinking with n. Early estimates are honest previews, not verdicts.' },
            { t: 'Yes — the darts must not be uniform', ok: false, why: 'Possible, but 3.32 at n = 100 is well inside normal wobble for uniform darts. Suspect the sampler only when large-n estimates stay off-center. (Diagnosing WHICH failure — small n vs biased sampler — is a real skill: more samples separates them.)' }
          ],
          hints: ['What did the widget’s estimate look like at 500 darts vs 5000?', 'Wobbly then calm. Where in that journey is n = 100?']
        },
        {
          type: 'mcq',
          prompt: `A casino's roulette edge is tiny — the house wins each bet only 52.6% of the time on red/black. Why is the casino's yearly income nearly guaranteed?`,
          options: [
            { t: 'Millions of bets: the law of large numbers crushes the wobble around the small per-bet edge, making the total predictably positive', ok: true, why: 'Each bet is a coin slightly bent the house’s way (E > 0, 5.4). One bet: anything happens. 10⁷ bets: the average locks onto the edge. The LLN converts a 2.6% edge into a business plan — volume is the casino’s real product.' },
            { t: 'The casino cheats on individual spins', ok: false, why: 'No need — the honest arithmetic is crueler than cheating: a fair-but-tilted game plus volume is unbeatable in aggregate. (And regulators verify the physical fairness.)' },
            { t: 'It isn’t guaranteed — gamblers could get lucky all year', ok: false, mis: 'luck-thinking', why: '"All gamblers lucky all year" has probability like a coin landing heads a million times straight — permitted by physics, forbidden by arithmetic. The LLN quantifies exactly how impossible.' }
          ],
          hints: ['Per-bet: small positive E for the house. What does averaging millions of bets do?', 'The average converges to E — on which side of zero?'],
          edge: 'The same volume-crushes-wobble fact powers insurance, ad networks (5.4!), and index funds. Aggregation is the industrial application of the LLN.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The method, as a recipe</h4>
<pre><code>1. Express your quantity as an EXPECTED VALUE:  answer = E[something samplable]
2. Sample n independent draws of that something (5.3's independence!)
3. Average them. The average → answer as n grows (LLN)
4. Report the estimate WITH its wobble.</code></pre>
<h4>The price tag: error shrinks like 1/√n</h4>
<p>The typical error of a Monte Carlo estimate scales as <b>1/√n</b>. Consequences to internalize:</p>
<ul>
  <li>Want 10× more accuracy? Pay <b>100×</b> more samples. (√ of 100 is 10.)</li>
  <li>The first 1000 samples do most of the work; the millionth adds little. Diminishing returns are built into the √.</li>
  <li>But the rate is <b>dimension-independent</b> — the same 1/√n in 2D or 1000D. Exact methods explode with dimension (2ⁿ grids!); Monte Carlo does not care. That indifference is why it owns high-dimensional problems (finance, physics, ML).</li>
</ul>
<h4>When to sample vs when to count</h4>
<p>5.1's rule completes: <b>enumerate when the space is listable</b> (exact, free), <b>sample when it is astronomical</b> (52! shuffles, 2¹⁰⁰⁰ configurations, any integral in 100 dimensions). Monte Carlo is the honest fallback when counting dies.</p>`,
      questions: [
        {
          type: 'input',
          prompt: `Your Monte Carlo estimate uses 1,000 samples. To make the typical error 10× smaller, how many samples do you need?`,
          accept: ['100000', '100,000', '100 000'],
          placeholder: '…',
          hints: ['Error ~ 1/√n: shrinking error 10× needs √n to grow 10×.', 'n must grow 10² = 100 times.'],
          why: '100,000 — accuracy is bought at quadratic prices. Budget planning for simulations starts with this square law.'
        },
        {
          type: 'mcq',
          prompt: `Step 1 says "express your quantity as an expected value". For P(system survives the day), the samplable "something" is…`,
          options: [
            { t: 'An indicator: simulate one full day, output 1 if the system survived, 0 if not — P(survive) = E[indicator]', ok: true, why: 'Probabilities ARE expectations of 0/1 indicators (5.4’s trick, powering 5.6). Run 10,000 simulated days, average the 0s and 1s: the survival probability emerges. This indicator-bridge is how EVERY probability becomes Monte-Carlo-able.' },
            { t: 'The day’s length — 24 hours, sampled', ok: false, why: 'The day’s length is constant — sampling constants estimates constants. The random thing is whether survival HAPPENS; wrap that yes/no in an indicator and average.' },
            { t: 'Probabilities cannot be sampled, only computed', ok: false, mis: 'simulation-superstition', why: 'The indicator identity P(A) = E[1_A] makes every probability samplable. That one line is the legal bridge between probability theory and simulation practice.' }
          ],
          hints: ['Which 0/1 variable has expectation equal to the probability you want?', 'The survived-today indicator. Average many simulated days.']
        },
        {
          type: 'mcq',
          prompt: `Team A refines an exact formula for a 200-dimensional integral (weeks of work, exponential compute). Team B throws 10⁶ Monte Carlo samples (an afternoon). Who is being reasonable?`,
          options: [
            { t: 'Team B — in 200 dimensions, grids need ~k²⁰⁰ points (impossible), while Monte Carlo’s 1/√n error rate does not see the dimension at all', ok: true, why: 'A grid with even 2 points per axis is 2²⁰⁰ ≈ 10⁶⁰ evaluations — Track 2’s exponential wall. Monte Carlo at 10⁶ samples gives ~0.1% typical error REGARDLESS of the 200 dims. High-dimensional integration belongs to sampling; this is why finance and physics run on it.' },
            { t: 'Team A — exact always beats approximate', ok: false, mis: 'exact-always-better', why: '"Exact but never finishes" loses to "approximate with an error bar today". The 2ᵈⁱᵐ cost of exactness is not a detail — it is the whole decision. Method choice IS complexity analysis (2.4).' },
            { t: 'Neither — 200-dimensional problems are unsolvable', ok: false, why: 'They are solved daily (options pricing, molecular simulation, Bayesian ML) — by exactly Team B’s method. The √n law’s dimension-blindness makes the impossible routine.' }
          ],
          hints: ['Cost of a grid with k points per axis in d dimensions: k^d. Plug d = 200.', 'And Monte Carlo’s error rate depends on the dimension how?'],
          edge: 'The phrase to keep: "Monte Carlo breaks the curse of dimensionality." The 1/√n price is mediocre in 1D and miraculous in 200D — mediocrity that scales beats brilliance that doesn’t.'
        },
        {
          type: 'mcq',
          prompt: `Two simulation reports: (A) "P(outage) ≈ 0.021, from 10⁶ runs". (B) "P(outage) ≈ 0.02 ± 0.0001, from 10⁶ runs". Which is professional, and why?`,
          options: [
            { t: 'B — an estimate without its wobble is unusable: readers cannot tell 0.021 vs 0.019 apart from noise without the ± (√(p(1−p)/n) here ≈ 0.00014)', ok: true, why: 'Step 4 of the recipe is not decoration: downstream decisions ("did the fix reduce outages?") compare estimates, and comparison requires knowing the noise floor. Estimates travel with error bars or they mislead.' },
            { t: 'A — cleaner numbers, less clutter', ok: false, mis: 'errorbar-optional', why: 'The "clutter" is the calibration. Without it, a reader seeing next month’s 0.023 cannot know if the system worsened or the dice wobbled. Deleting the ± deletes the ability to compare — the most expensive cleanliness available.' },
            { t: 'Both equal — same data, same estimate', ok: false, why: 'Same estimate, different USABILITY: B answers "how much should I trust this digit?" and A cannot. Reporting standards exist because that question always comes next.' }
          ],
          hints: ['What question does a reader of these numbers ask next month, comparing with a new run?', '"Is the difference real or noise?" Which report can answer?'],
          edge: 'The error-bar formula for probability estimates: ±√(p(1−p)/n) — the binomial swing (5.5!) divided down by √n (5.6). Two nodes, one honest report.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Monte Carlo in twelve lines — estimating a deployment risk</h4>
<pre><code>// P(a 3-service deploy succeeds) where services fail dependently? Simulate it:
function oneDay() {
  const surge = Math.random() < 0.02;             // shared bad event (5.3 dependence!)
  const fail = s => Math.random() < (surge ? 0.4 : 0.01);
  return !(fail('a') || fail('b') || fail('c'));  // survived?
}
let ok = 0, N = 100000;
for (let i = 0; i < N; i++) if (oneDay()) ok++;
const p = ok / N;                                  // ≈ P(success)
const err = Math.sqrt(p * (1 - p) / N);            // ± error bar
</code></pre>
<p>Note what the simulation handled effortlessly: the DEPENDENCE via the shared surge (which broke the multiply-probabilities shortcut in 5.3). Simulation eats dependence for breakfast — you just model the mechanism and run it. That is its deepest advantage over formulas.</p>
<h4>The three habits of good simulations</h4>
<ol>
  <li><b>Model the mechanism</b> (shared causes included) — not just the marginal rates.</li>
  <li><b>Report ± error</b> (√(p(1−p)/N)) — estimates travel with wobble.</li>
  <li><b>Fix the seed for debugging, free it for production</b> — reproducibility when hunting, independence when measuring.</li>
</ol>`,
      questions: [
        {
          type: 'mcq',
          prompt: `In the deploy simulation, why is Monte Carlo BETTER than multiplying 0.99³ (each service's success rate)?`,
          options: [
            { t: 'The shared surge makes failures dependent — multiplication (which assumes independence, 5.3) underestimates the risk; simulation runs the actual mechanism, dependence included', ok: true, why: '0.99³ ≈ 0.970, but the surge correlates failures: the simulated truth is closer to 0.955. Formulas demand assumptions; simulation demands only the mechanism. When dependence is real (it usually is), sampling tells the truth formulas cannot.' },
            { t: 'It isn’t — multiplication is exact and instant', ok: false, mis: 'independence-assumed', why: '"Exact" for the WRONG model: independence is false here by construction (the surge!). Instantly computing a wrong number is not a feature. The 5.3 rack-disaster lesson, now with the simulation cure attached.' },
            { t: 'Monte Carlo is always better than any formula', ok: false, why: 'When independence genuinely holds, 0.99³ is exact, instant, and noise-free — strictly better. The rule stays: count/derive when assumptions hold, simulate when they break. Tools have territories.' }
          ],
          hints: ['What does the shared surge do to independence?', 'Breaks it. Which tool needs independence, and which does not?'],
          edge: 'This "just model the mechanism" power is why risk teams at banks and cloud providers run simulations, not formulas: correlated failure is the failure that matters (5.3’s racks, at company scale).'
        },
        {
          type: 'mcq',
          prompt: `Habit 3: "fix the seed for debugging, free it for production". What does a FIXED random seed buy, and what does it cost?`,
          options: [
            { t: 'Buys reproducibility — the same "random" run replays exactly, so a bug at iteration 40,517 can be re-visited; costs independence across runs — repeated fixed-seed runs re-measure ONE sample path, not new evidence', ok: true, why: 'Pseudo-randomness is a deterministic sequence with a starting point (the seed). Same seed = same universe: perfect for debugging, useless for accumulating statistical evidence (n runs of one seed = n copies of one sample). Know which mode you are in.' },
            { t: 'Fixed seeds make the randomness higher quality', ok: false, why: 'Quality comes from the generator; the seed only chooses WHERE in its sequence you start. Fixing it changes reproducibility, not quality.' },
            { t: 'Nothing — seeds are an implementation detail', ok: false, mis: 'randomness-purity', why: 'The seed decision has bitten every simulation team: CI that "randomly" tests the same path forever (fixed seed left in), or a heisenbug nobody can replay (free seed during debugging). It is a workflow-critical detail.' }
          ],
          hints: ['If two runs share a seed, how do their outputs relate?', 'Identical. When is that gold, and when is it self-deception?'],
          edge: 'The professional pattern: log the (random) seed of every production run — free independence, retroactive reproducibility. One log line, both worlds.'
        },
        {
          type: 'mcq',
          prompt: `A teammate estimates a rare failure (true p ≈ 10⁻⁶) with 10,000 Monte Carlo runs, sees zero failures, and reports "p = 0, system is safe". The flaw?`,
          options: [
            { t: 'With n·p ≈ 0.01 expected hits, seeing zero is guaranteed-ish and says only "p is probably below ~3/10,000" — rare events need n ≫ 1/p samples (or smarter methods)', ok: true, why: 'Zero hits ≠ zero probability: the sample was simply too small to SEE a 10⁻⁶ event (expected hits: 0.01!). The honest report is an upper bound, not a zero. Rare-event estimation is Monte Carlo’s known weak spot — importance sampling and analytic bounds exist for exactly this.' },
            { t: 'Nothing — zero observed means zero probability', ok: false, mis: 'zero-observed-zero-true', why: 'By that logic, 10 coin flips without a double-heads-streak proves streaks impossible. Absence of evidence at tiny n is evidence of nothing — the LLN’s promise activates only when n·p is comfortably large.' },
            { t: 'The runs should have used a fixed seed', ok: false, why: 'Seeds are orthogonal — the flaw is sample-size arithmetic: n = 10⁴ cannot resolve p = 10⁻⁶ any more than a bathroom scale can weigh a grain of rice. Match the instrument to the magnitude.' }
          ],
          hints: ['Expected number of observed failures = n·p. Compute it.', '10⁴ × 10⁻⁶ = 0.01 — can a 0.01-expected-count experiment distinguish 10⁻⁶ from 0?'],
          edge: 'The rule of thumb: to SEE an event of probability p, budget n ≈ 10/p samples minimum. For p = 10⁻⁶: ten million runs — or switch to importance sampling, the rare-event workaround whose whole job is beating this wall.'
        }
      ]
    }
  }
};

/* ============ 5.7 RANDOMNESS IN ALGORITHMS ============ */
window.NODES['prob.algorithms'] = {
  id: 'prob.algorithms', num: '5.7', trackId: 'probability',
  title: 'Randomness in Algorithms',
  minutes: 35,
  payoff: 'birthday paradox · hashing · randomized quicksort',
  levels: {

    l1: {
      html: `
<h4>The birthday surprise</h4>
<p>How many people in a room before two probably share a birthday? 365 days… so maybe 180 people? The true answer: <b>23</b>. Just 23 people give a better-than-half chance of a shared birthday.</p>
<p>Why intuition fails: you imagine YOUR birthday being matched (23 chances). But the event is ANY pair matching — and 23 people hold C(23,2) = <b>253 pairs</b> (Track 2.2!). Two hundred fifty-three lottery tickets, not twenty-three.</p>
<div class="callout amber"><p><b>The rule that runs security and databases:</b> collisions among n random values in a space of size N become likely around <b>n ≈ √N</b>. 365 days → √365 ≈ 19-ish people. A hash with 2⁶⁴ values → collisions near 2³² items, NOT 2⁶⁴. Every system that assigns random IDs must plan for √, not for N.</p></div>
<h4>Randomness as a tool, not just a threat</h4>
<p>Algorithms also USE randomness on purpose: shuffling, random sampling, picking random pivots. Why would an algorithm want dice? Because randomness is the ultimate defense against bad luck being ARRANGED — no adversary can plan around choices you have not made yet. That story is quicksort's, in L2.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Why do just 23 people suffice for a likely birthday match?`,
          options: [
            { t: 'Because 23 people contain C(23,2) = 253 PAIRS, and any pair can match — the chances multiply across pairs, not people', ok: true, why: 'The event is pair-based: 253 quiet opportunities. Each pair matches with chance 1/365; across 253 near-independent pairs, P(no match) ≈ (364/365)²⁵³ ≈ 0.49. The combinatorics of 2.2 is what intuition was missing.' },
            { t: 'Birthdays cluster in some months', ok: false, why: 'Real clustering exists and mildly HELPS matching — but the surprise stands with perfectly uniform birthdays. The mechanism is pair-counting, not seasonality.' },
            { t: 'It doesn’t — you need about 180 people', ok: false, mis: 'linear-collision-intuition', why: '180 ≈ 365/2 is the intuition for "someone matches MY birthday" — a different, much harder event (that one indeed needs ~183). ANY-pair matching is quadratically easier: the √N law.' }
          ],
          hints: ['Count the pairs among 23 people (2.2!).', '253 pairs, each a 1/365 chance. What is P(none of 253 fire)?'],
          edge: 'The two events to never confuse: "someone matches ME" (needs ~N/2 people) vs "any two match" (needs ~√N). Security cares about the second — attackers do not target your hash, they hunt any collision.'
        },
        {
          type: 'mcq',
          prompt: `A system assigns random 6-digit IDs (a million possible). At roughly how many issued IDs should the team EXPECT the first duplicate?`,
          options: [
            { t: 'Around a thousand — the birthday law: collisions near √N = √10⁶ = 10³', ok: true, why: 'Not at a million, not at half a million: at ~1200 IDs, a collision is more likely than not. Systems that check "N is huge, we are safe" without the √ ship this bug constantly. Plan for √N or handle duplicates.' },
            { t: 'Around half a million — half the space', ok: false, mis: 'linear-collision-intuition', why: 'Half-the-space is the matches-a-SPECIFIC-id intuition. Any-duplicate arrives quadratically sooner: √N. The gap between 10³ and 5×10⁵ is the gap between a launch-week incident and never noticing.' },
            { t: 'Exactly at one million and one — pigeonhole', ok: false, why: 'Pigeonhole (2.1) gives the GUARANTEED collision at N+1 — the worst case. The EXPECTED first collision comes astronomically earlier: √N. Both theorems true, different questions — and probability’s answer is the operational one.' }
          ],
          hints: ['Apply n ≈ √N.', '√(1,000,000) = 1000.'],
          edge: 'Real sizing: UUIDs use 122 random bits precisely so √N = 2⁶¹ — collisions pushed past any realistic issuance count. The √ law, budgeted for.'
        },
        {
          type: 'mcq',
          prompt: `Why would a sorting algorithm CHOOSE randomly (a random pivot) instead of deterministically (always the first element)?`,
          options: [
            { t: 'A fixed rule can be fed its own worst case (sorted input kills first-element pivots); a random choice has no worst INPUT — only worst luck, which no one can arrange', ok: true, why: 'Deterministic weaknesses are addresses — adversaries (and innocent patterns like already-sorted data!) deliver to them. Randomness erases the address: every input gets the same good expected behavior. Unpredictability as armor.' },
            { t: 'Random choices are faster to compute', ok: false, why: 'Generating randomness costs MORE than picking index 0. The payoff is not per-step speed — it is immunity from catastrophic input patterns. A tiny premium for insurance.' },
            { t: 'It adds fun to the algorithm', ok: false, why: 'The reason is deadly serious: hash-flooding DoS attacks exploit exactly deterministic weak spots (predictable hash seeds). Languages randomize their hash seeds since ~2012 for this reason. Randomness is a security control.' }
          ],
          hints: ['If the pivot rule is public and fixed, what can an adversary (or sorted data) do?', 'Construct the killer input. What if the rule involves dice?'],
          edge: 'This idea has a name — "adversarial robustness by randomization" — and shows up in quicksort, hash seeds, load balancing, and TLS. Dice as defense.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The birthday bound, derived</h4>
<pre><code>P(no collision among n values in space N) ≈ (1 − 1/N)^C(n,2) ≈ e^(−n²/2N)
→ collision probability hits 50% near  n ≈ 1.18·√N</code></pre>
<p>The derivation is a tour of the course: C(n,2) pairs (2.2) × independence-ish multiplication (5.3) × the exponential approximation (4.1/4.8). At n = 23, N = 365: e^(−23²/730) = e^(−0.72) ≈ 0.49 ✓.</p>
<h4>Randomized quicksort, priced by expectation</h4>
<p>With random pivots, quicksort's EXPECTED comparisons are ~2n·ln n = O(n log n) for <b>every</b> input — the average is over the algorithm's own dice, not over hoped-for-nice data. The proof is the indicator trick (5.4): for each pair (i, j), P(they get compared) = 2/(j−i+1); sum over C(n,2) pairs → the harmonic series (4.8's divergent friend!) × n → 2n·ln n.</p>
<div class="callout"><p><b>The two flavors of "average case":</b> hoping the INPUT is random (fragile — real data has patterns) vs making the ALGORITHM random (robust — the guarantee holds per input). Randomized algorithms buy the second, stronger kind.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `In the birthday derivation, where does each course-piece plug in: C(n,2), the multiplication, and e^(−x)?`,
          options: [
            { t: 'C(n,2) counts the pairs that could collide (2.2); multiplication compounds each pair’s (1−1/N) survival (5.3); e^(−x) approximates (1−1/N)^many (4.1’s exponential)', ok: true, why: 'The formula is a three-track sandwich: combinatorics supplies the exponent, independence supplies the product, analysis supplies the clean closed form. Recognizing borrowed parts is what makes formulas re-derivable instead of memorized.' },
            { t: 'They are interchangeable approximations', ok: false, why: 'Each does one specific job — swap any out and the formula breaks differently (wrong exponent / illegal product / no closed form). Precision about which tool does what IS the understanding.' },
            { t: 'Only the e^(−x) matters; the rest is decoration', ok: false, mis: 'formula-mysticism', why: 'Drop C(n,2) and you get the wrong event entirely (matches-me instead of any-match — the L1 trap in formula form!). The n² inside the exponential IS the pair-count speaking.' }
          ],
          hints: ['What is being counted, what is being multiplied, what is being approximated?', 'Pairs; per-pair survivals; the big product.'],
        },
        {
          type: 'input',
          prompt: `A hash function outputs 32-bit values (N = 2³²). Around how many items should you expect the first collision? (Answer as a power: 2^k, give k.)`,
          accept: ['16', '2^16', '65536'],
          placeholder: 'k',
          hints: ['Birthday law: n ≈ √N.', '√(2³²) = 2¹⁶.'],
          why: '2¹⁶ = 65,536 items — not four billion! This factor-of-√ collapse is why 32-bit hashes are toys and real systems use 128+ bits.'
        },
        {
          type: 'mcq',
          prompt: `"Randomized quicksort is O(n log n) expected FOR EVERY input." What makes this stronger than "quicksort is O(n log n) on average inputs"?`,
          options: [
            { t: 'The expectation is over the algorithm’s own dice — so even an adversarially-arranged input gets the guarantee; "average inputs" collapses the moment real data has patterns (like being already sorted)', ok: true, why: 'Averaging over inputs assumes the world is nice; averaging over the algorithm’s randomness requires nothing of the world. Sorted input — utterly common! — is the worst case for naive quicksort and just another Tuesday for the randomized one. WHERE the randomness lives decides the strength of the promise.' },
            { t: 'Nothing — both statements say average O(n log n)', ok: false, mis: 'average-source-blind', why: 'Same words, different universes: one guarantee survives hostile inputs, the other dies on sorted arrays. The question "random over WHAT?" (5.1’s "uniform over what?" grown up) is the sharpest question in randomized algorithms.' },
            { t: 'The randomized version is also faster in the worst case', ok: false, why: 'Its worst CASE (terrible dice) is still O(n²) — just vanishingly unlikely (probability ~n·2⁻ⁿ-ish for sustained bad luck) and not triggerable by any input. Worst case unchanged; worst case UNREACHABLE by enemies. That is the actual purchase.' }
          ],
          hints: ['In each claim, what is the probability over — the input distribution, or the algorithm’s coins?', 'Whose behavior must you trust in each case?'],
          edge: 'This distinction runs through modern CS: expected-time hashing (seeds!), randomized load balancing, sketching algorithms. The exam question is always the same: random over what?'
        },
        {
          type: 'mcq',
          prompt: `The quicksort analysis sums P(pair i,j gets compared) = 2/(j−i+1) over all pairs. Which two tools from earlier nodes make this sum tractable?`,
          options: [
            { t: 'Linearity of expectation (5.4) to sum indicator probabilities without worrying about dependence, and the harmonic series (4.8) whose partial sums grow like ln n', ok: true, why: 'E[comparisons] = Σ P(compared) needs NO independence between pairs (linearity’s superpower) — and the inner sums Σ 2/k are harmonic numbers ≈ 2 ln n each. Total: ~2n ln n. Two borrowed theorems, one famous result.' },
            { t: 'The pigeonhole principle and Bayes', ok: false, why: 'Fine tools, wrong job: nothing here needs forced collisions or belief-flipping. Matching tools to structure (a sum of indicator-expectations + a harmonic tail) is the analytical skill.' },
            { t: 'None — the sum requires a computer', ok: false, why: 'The sum closes by hand in four lines once the two tools are recognized — that closure is why this proof appears in every algorithms course. Recognizing "this is a harmonic sum" is the whole trick.' }
          ],
          hints: ['Summing expectations of dependent indicators — what licenses it?', 'And what is Σ 1/k called, growth-wise (4.8)?'],
          edge: 'Notice what the harmonic series’ DIVERGENCE means here: the log in n log n IS the harmonic growth ln n. A series from Track 4 became a complexity class in Track 2 via a probability from Track 5. Full circle.'
        },
        {
          type: 'mcq',
          prompt: `A language runtime randomizes its hash-table seed at startup. What attack does this defeat, using this node's ideas?`,
          options: [
            { t: 'Hash-flooding: with a KNOWN hash function an attacker precomputes thousands of keys that collide into one bucket, turning O(1) lookups into O(n) and freezing the server; a secret random seed makes collisions unplannable', ok: true, why: 'Deterministic hash = published worst-case address (the quicksort lesson, weaponized). Randomizing the seed moves the "average case" guarantee from trusting inputs to trusting your own dice — which attackers cannot load. This attack (2011, "hashDoS") forced every major language to patch.' },
            { t: 'Rainbow-table password attacks', ok: false, why: 'Different domain: password hashing wants SLOW salted hashes (bcrypt et al.). Table-seed randomization protects data-structure performance, not credentials. Same word "hash", two threat models.' },
            { t: 'No attack — it prevents accidental patterns only', ok: false, why: 'Accidents are the minor case; the 2011 hashDoS advisories were about deliberate crafted-key floods taking down web frameworks. The seed is a security boundary, documented as such in every runtime’s changelog since.' }
          ],
          hints: ['If the attacker knows hash(), what can they compute offline (birthday-style, but targeted)?', 'A colliding key set. What single secret invalidates their precomputation?'],
          edge: 'The full defense stack reads like this track’s syllabus: random seeds (5.7) + load factors as expectations (5.4) + √N collision budgets (5.7) + uniformity audits (5.5). Hash tables are applied probability with an API.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>The toolbox you now own</h4>
<pre><code>// Fisher–Yates shuffle — THE correct way to randomize an array:
for (let i = arr.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));   // uniform over 0..i
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
// (the naive arr.sort(() => Math.random() - 0.5) is BIASED — famously so)</code></pre>
<ul>
  <li><b>Reservoir sampling:</b> pick a uniform random item from a stream of unknown length — keep item i with probability 1/i. Uniformity provable by induction (1.7!).</li>
  <li><b>Random load balancing:</b> "pick 2 random servers, send to the less loaded" — expected max load drops exponentially vs pick-1. Two dice beat one, provably.</li>
  <li><b>Property-based testing:</b> throw random inputs at your code’s invariants (1.3’s ∀ claims!) — Monte Carlo applied to correctness.</li>
</ul>
<p>Track 5 ends where Track 1 began: claims, evidence, and the discipline of knowing exactly what you know. The Oracle awaits.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Why is <code>arr.sort(() => Math.random() - 0.5)</code> a BIASED shuffle while Fisher–Yates is uniform?`,
          options: [
            { t: 'Sort algorithms assume a CONSISTENT comparator; a coin-flip comparator violates that contract, and the sort’s internal structure leaks into the output — some orderings come out measurably more often', ok: true, why: 'The random comparator answers differently on repeat comparisons — sorts (built on 1.6-style ordering assumptions!) do arbitrary structured things with the contradictions. Measured bias: some permutations appear ~3× others in V8. Fisher–Yates instead makes each arrangement provably equally likely (a clean product-rule argument: n! equally-weighted paths).' },
            { t: 'It is slower, not biased', ok: false, why: 'It is both — but the bias is the dangerous part: a biased shuffle in a card game or lottery is an exploitable unfairness (5.5’s security lesson). Slowness annoys; bias litigates.' },
            { t: 'Math.random() is not random enough for sorting', ok: false, mis: 'randomness-purity', why: 'The same Math.random() inside Fisher–Yates gives a fine shuffle — the generator is not the culprit. The BROKEN CONTRACT with sort() is. Where you inject randomness matters as much as its quality (the "random over what?" question again).' }
          ],
          hints: ['What does a sorting algorithm assume about compare(a, b) asked twice?', 'Consistency. What does the coin-comparator do to that assumption?'],
          edge: 'This bug shipped in a real browser’s ballot-order randomizer (Microsoft, 2010, EU browser choice screen) — measurable candidate bias from one clever-looking line. Fisher–Yates is three lines. Use the three lines.'
        },
        {
          type: 'mcq',
          prompt: `Reservoir sampling keeps a uniform random item from a stream without knowing its length: on seeing item i, replace the kept item with probability 1/i. Which Track-1 tool PROVES uniformity?`,
          options: [
            { t: 'Induction (1.7): assume uniform after i−1 items (each held with prob 1/(i−1)); show the 1/i replacement rule makes all i items held with probability exactly 1/i', ok: true, why: 'The step: new item kept w.p. 1/i ✓; an old item survives w.p. (1/(i−1))·(1−1/i) = 1/i ✓. Base case i=1 trivial. Streaming correctness by dominoes — the 1.7 machinery holding up a 5.7 algorithm. The lab’s first and last tracks, shaking hands.' },
            { t: 'De Morgan’s laws', ok: false, why: 'No negations to push around here — the claim is a ∀i probability invariant, and invariants marching through i are induction’s home territory (1.7’s loop invariants, with probabilities as the state).' },
            { t: 'No proof needed — 1/i is obviously fair', ok: false, mis: 'obviousness-trap', why: '"Obvious" probability claims are wrong at a legendary rate (birthday! Monty Hall! the sort-shuffle above!). This one is TRUE but needs the two-line induction — and the discipline of demanding it is what five tracks were building.' }
          ],
          hints: ['The claim has the shape "after every i, property P(i) holds" — which proof pattern fits?', 'Check the base; assume for i−1; verify the replacement rule preserves it.'],
          edge: 'Reservoir sampling runs in log samplers, stream analytics, and ML data pipelines — an interview classic precisely because it fuses streaming code with an induction proof. You now own both halves.'
        },
        {
          type: 'mcq',
          prompt: `Property-based testing: instead of 5 hand-written test cases for your sort function, generate 10,000 random arrays and assert "output is ordered ∧ same elements". What is this, in the language of this course?`,
          options: [
            { t: 'Monte Carlo sampling (5.6) of the input space, hunting counterexamples (1.3) to the ∀-claim "sort is correct" — random probing where exhaustive checking (2¹⁰⁰⁰ inputs) is impossible', ok: true, why: 'A correctness claim is ∀input P(input) — unprovable by finite tests but efficiently ATTACKED by random sampling: any hit is a counterexample that settles the ∀ (1.3’s asymmetry!). The whole course in one testing tool: quantifiers, counting the space, sampling it, and knowing what a passing run does and does not prove.' },
            { t: 'A replacement for proofs — 10,000 passes means correct', ok: false, mis: 'testing-proves', why: 'Node 1.2’s very first lesson, returning for the finale: passing samples never prove a ∀ (the bug may live in a 10⁻⁹ corner — rare-event sampling, 5.6 L3!). Tests hunt counterexamples; only proofs (or exhaustive enumeration) certify. Use both, claim accordingly.' },
            { t: 'Unnecessary — hand-picked cases cover better', ok: false, why: 'Hand-picked cases encode the AUTHOR’s imagination — and bugs live precisely outside it (the empty array, the all-equal array, the 2³¹-length…). Random generation searches where you forgot to look. The strongest suites use both: adversarial hand cases + random sweeps.' }
          ],
          hints: ['What kind of claim is "the function is correct for all inputs" (1.3)?', 'And what does 5.6 offer when a space is too big to enumerate?'],
          edge: 'Full circle, deliberately: Track 1 taught what claims mean, Track 2 counted the spaces, Track 4 measured convergence, Track 5 sampled — and testing your own code uses all of it. That composite skill is what this machine was built to install. One boss remains.'
        }
      ]
    }
  }
};

/* ============ BOSS: CONSULT THE ORACLE ============ */
window.NODES['boss.oracle'] = {
  id: 'boss.oracle', num: '5.B', trackId: 'probability', boss: true,
  title: 'BOSS — Consult the Oracle',
  minutes: 25,
  payoff: 'the final component · FULL BOOT',
  intro: `
<h4>The final integration test</h4>
<p>The Oracle is the machine's last dark component. Five challenges — and they reach across the whole machine: counting, conditioning, expectation, distributions, and the discipline of knowing what randomness can and cannot tell you.</p>
<div class="callout amber"><p><b>Boss rules:</b> five challenges, pass four. Beyond this door: FULL BOOT — every component of the machine, online at once. اقترب النور الكامل.</p></div>`,
  levels: {
    boss: {
      passNeed: 4,
      questions: [
        {
          type: 'input',
          prompt: `<b>Integration 1 — the space.</b><br>A config has 3 boolean flags and one mode with 4 values. A test suite claims "we test a random valid config each run". How many distinct configs exist?`,
          accept: ['32'],
          placeholder: '…',
          hints: ['Product rule across the choices (2.1).', '2·2·2·4.'],
          why: '2³ × 4 = 32 — small enough to ENUMERATE (5.1’s rule: count when you can!). Random testing here is theater; 32 exact runs beat 100 random ones.',
          edge: 'The Oracle’s first lesson is when NOT to use randomness: sampling a listable space is voluntarily knowing less.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 2 — the flip.</b><br>An anomaly detector flags 99% of real intrusions; it also flags 2% of the 10,000 normal daily sessions. Real intrusions: ~1/day. A session is flagged. P(real intrusion | flag) ≈ ?`,
          options: [
            { t: '≈ 0.5% — about 1 true flag among ~200 false ones daily; the base rate crushes the impressive 99%', ok: true, why: 'Population square: 1 intrusion → ~1 true flag; 10,000 normals × 2% → 200 false flags. 1/201 ≈ 0.5%. Bayes with counts (5.2) — and the reason security teams drown in alerts unless they tune the 2%.' },
            { t: '99% — the detector said so', ok: false, mis: 'base-rate-neglect', why: 'The direction flip, one final time: 99% is P(flag | intrusion). The needed P(intrusion | flag) divides by ALL flags — mostly false ones. The most expensive swapped conditional in the industry.' },
            { t: '2% — the false positive rate', ok: false, why: '2% is P(flag | normal) — a third different conditional! Three look-alike percentages, three meanings. The population square keeps them straight: count the people, then divide.' }
          ],
          hints: ['Draw the day: 1 intrusion, 10,000 normal sessions. Count the flags from each side.', '~1 true vs ~200 false. What fraction of flags is real?'],
          edge: 'Every triage queue — alerts, spam, medical screening, fraud — is this arithmetic. The Oracle insists you run it BEFORE trusting any "99% accurate" claim.'
        },
        {
          type: 'order',
          prompt: `<b>Integration 3 — the expected bill.</b><br>A pipeline runs 50 jobs; each fails with probability 0.1 (failures may cluster — shared runners). Each failure costs one retry at 2 minutes. Derive E[retry minutes].`,
          steps: [
            'Write the failure count as a sum of 50 indicator variables, one per job',
            'Linearity of expectation: E[failures] = 50 × 0.1 = 5 — clustering cannot change this',
            'Each failure costs 2 minutes: E[retry minutes] = E[failures] × 2',
            'Answer: 10 expected minutes — plan the mean now; model the clustering only for worst-case planning'
          ],
          hints: ['"Expected number of…" — which 5.4 trick?', 'Indicators + linearity, immune to dependence.', 'Scale by the per-failure cost at the end.'],
          why: 'Indicators → linearity → scale: the expectation pipeline that dependence cannot derail. (The clustering matters for VARIANCE — bad days — not for the mean.)'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 4 — name the pattern.</b><br>Three metrics: (A) "retries until the flaky test passes", (B) "how many of 500 requests time out", (C) "which of 8 shards a random key lands on (good hash)". Their distributions:`,
          options: [
            { t: 'A: geometric (waiting for first success) · B: binomial (count over n tries) · C: uniform (equal shares by design)', ok: true, why: 'The 5.5 recognition drill at full speed: waiting → geometric (E = 1/p); counting → binomial (E = np); engineered equal-likelihood → uniform. Naming each imports its formulas, its assumptions, and its failure modes in one word.' },
            { t: 'All three are binomial — they involve repetition', ok: false, mis: 'count-vs-wait', why: 'Repetition alone does not choose the model — the QUESTION does: how long (geometric) vs how many (binomial) vs which one (uniform). One-word answers to three different questions.' },
            { t: 'All uniform — randomness spreads evenly', ok: false, mis: 'uniform-assumed', why: 'The course’s most-corrected instinct, one last time: uniformity is engineered (C, by the hash), never assumed (A decays, B peaks at np). "Random" describes the mechanism; the SHAPE must be derived.' }
          ],
          hints: ['For each: is the question "how long", "how many", or "which one"?', 'Wait → geometric; count → binomial; equal by design → uniform.']
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 5 — the Oracle's discipline.</b><br>Your Monte Carlo simulation (10⁵ runs) estimates P(cascade failure) ≈ 0, and a teammate wants to ship with "provably zero risk". The Oracle's verdict:`,
          options: [
            { t: 'Refuse the word "provably": zero observed at n = 10⁵ only bounds p below ~10⁻⁴-ish; a rarer cascade is invisible to this experiment. Report the bound, size n to the risk you must resolve, or find an analytic argument', ok: true, why: 'The full discipline in one decision: absence of evidence ≠ evidence of absence (5.6 rare events), samples never prove ∀-claims (1.3 → 5.7), and honest reports carry their resolution limits (5.6 error bars). The Oracle’s only magic is knowing exactly what it knows.' },
            { t: 'Agree — 100,000 clean runs is proof', ok: false, mis: 'zero-observed-zero-true', why: 'A p = 10⁻⁶ cascade would show ~0 hits in 10⁵ runs — the experiment cannot distinguish "safe" from "10× rarer than our instrument". Claiming proof from underpowered sampling is how "impossible" outages happen.' },
            { t: 'Run it once more to be sure', ok: false, why: 'A second underpowered experiment compounds confidence, not evidence (same resolution wall). The fix is structural: more runs (n ≈ 10/p), importance sampling, or a proof — not repetition of the insufficient.' }
          ],
          hints: ['What is the expected hit count if p = 10⁻⁶ and n = 10⁵?', '0.1 — indistinguishable from zero. What may you honestly claim, then?'],
          edge: 'FULL BOOT awaits. The machine you assembled runs on exactly this: claims stated precisely (T1), spaces counted (T2), structures transformed (T3), limits respected (T4), uncertainty measured honestly (T5). It was never about the components — it was about the operator.'
        }
      ]
    }
  }
};
