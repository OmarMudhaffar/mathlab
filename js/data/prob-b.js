/* Track 5 content — nodes 5.3, 5.4, 5.5 */

/* ============ 5.3 INDEPENDENCE & RANDOM VARIABLES ============ */
window.NODES['prob.randomvars'] = {
  id: 'prob.randomvars', num: '5.3', trackId: 'probability',
  title: 'Independence & Random Variables',
  minutes: 30,
  payoff: 'modeling inputs · simulation building blocks',
  levels: {

    l1: {
      html: `
<h4>When knowing one thing tells you nothing</h4>
<p>Flip a coin twice. The first flip lands heads. Does that change the second flip? No — coins have no memory. The flips are <span class="term">independent events</span> (حوادث مستقلة): learning one gives ZERO information about the other.</p>
<p>Now draw two cards from a deck without putting the first back. Independent? No! The first draw changes what remains — the events are dependent, like the shrinking bag in 5.2.</p>
<div class="callout amber"><p><b>The test:</b> ask "if I learn the first result, do my chances for the second change?" Unchanged → independent. Changed → dependent. Coins: no. Cards without replacement: yes. Rain today and rain tomorrow: yes (weather has memory!).</p></div>
<h4>Random variables: outcomes turned into numbers</h4>
<p>A <span class="term">random variable</span> (متغير عشوائي) is just a NUMBER produced by a random process: the sum of two dice, the count of heads in 10 flips, the milliseconds a request takes. Formally it is a function (1.6!) from outcomes to numbers — and once things are numbers, we can average them, add them, chart them. That is the doorway to everything after this node.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A fair coin landed heads 5 times in a row. P(heads on flip 6)?`,
          options: [
            { t: '1/2 — coins have no memory; each flip is independent of the history', ok: true, why: 'The streak already happened; flip 6 is a fresh 50/50. Believing "tails is now due" is the famous gambler’s fallacy (مغالطة المقامر) — randomness does not keep score.' },
            { t: 'Less than 1/2 — tails is overdue', ok: false, mis: 'gamblers-fallacy', why: 'The most human error in probability. "Due" would require the coin to remember and compensate — no mechanism does that. (Streaks of 5 happen 1-in-32 runs — unremarkable.)' },
            { t: 'More than 1/2 — the coin is clearly hot', ok: false, mis: 'hot-hand-assumed', why: 'The mirror fallacy! With a FAIR coin, streaks predict nothing. (Five heads might make you Bayesian-suspicious the coin is BIASED — a legitimate but different question about the coin, not the flip.)' }
          ],
          hints: ['Does the coin physically change after landing heads?', 'No memory → what does independence say about flip 6?'],
          edge: 'Both wrong answers are real named fallacies people bet money on. The Bayes-flavored footnote: many repeats CAN justify doubting fairness — updating about the COIN, not the next flip of a fair one.'
        },
        {
          type: 'mcq',
          prompt: `Which pair is DEPENDENT?`,
          options: [
            { t: 'Drawing two aces in a row from one deck, no replacement', ok: true, why: 'The first ace leaves only 3 aces in 51 cards — the second draw’s chances moved (4/52 → 3/51). Removing without replacing creates dependence, always.' },
            { t: 'Two different dice, rolled together', ok: false, why: 'Neither die touches the other — learning one leaves the other at 1/6 each. Physically separate mechanisms are the model of independence.' },
            { t: 'Your coin flip and a stranger’s coin flip in another city', ok: false, why: 'No connection, no information flow — independent. Distance is a good (not perfect) proxy for independence.' }
          ],
          hints: ['For each pair ask: does the first result change the second’s chances?', 'Only one option changes the world between the two events.']
        },
        {
          type: 'mcq',
          prompt: `"Let X = the sum of two dice." What kind of object is X?`,
          options: [
            { t: 'A random variable — a rule (function!) turning each outcome pair into a number', ok: true, why: 'X maps (3,4) ↦ 7, (1,1) ↦ 2 — a function (1.6) from the sample space to numbers. The randomness lives in WHICH outcome happens; X just reports its number.' },
            { t: 'A single unknown number, like x in algebra', ok: false, mis: 'rv-as-unknown', why: 'Algebra’s x HAS one value we merely don’t know. X has a whole distribution of possible values with probabilities — a different kind of object, needing different tools (distributions, expectations).' },
            { t: 'An event', ok: false, why: 'Events are yes/no regions ("sum is 7"). X is number-valued — and each statement ABOUT X (like "X = 7") carves out an event. Variables generate events; they are not events.' }
          ],
          hints: ['What does X do to the outcome (5, 2)?', 'It outputs 7 — input outcome, output number. Which Track-1 word describes that?'],
          edge: 'The quiet upgrade: events answer yes/no; random variables answer "how much" — and "how much" can be averaged, summed, compared. Numbers unlock analysis.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Independence, formally</h4>
<pre><code>A and B independent  ⟺  P(A ∩ B) = P(A) · P(B)
                     ⟺  P(A | B) = P(A)         (the hint changes nothing)</code></pre>
<p>The multiplication rule is the practical face: two coins both heads = ½ · ½ = ¼. Ten servers all fine = 0.99¹⁰ (5.2's complement trick used exactly this). <b>Warning:</b> multiplying is only legal WHEN independent — using it on dependent things (two disk failures during one power surge!) silently underestimates risk.</p>
<h4>Random variables and their distributions</h4>
<p>The <span class="term">distribution</span> (توزيع) of X lists each possible value with its probability. Sum of two dice: P(X=2) = 1/36, … P(X=7) = 6/36, … — the pyramid from the dice lab.</p>
<p>Independence for variables: X and Y are independent when every "X = a" event is independent of every "Y = b" event — knowing one number tells nothing about the other.</p>`,
      questions: [
        {
          type: 'input',
          prompt: `Two fair coins. P(both heads) = ? (fraction "a/b")`,
          accept: ['1/4', '1/4'],
          placeholder: 'a/b',
          hints: ['Independent → multiply.', '½ × ½.'],
          why: '¼ — the multiplication rule for independent events. (Check by listing: HH, HT, TH, TT — one of four ✓. Two methods agreeing builds trust.)'
        },
        {
          type: 'mcq',
          prompt: `P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2. Are A and B independent?`,
          options: [
            { t: 'Yes — P(A)·P(B) = 0.20 = P(A ∩ B): the definition holds exactly', ok: true, why: 'The test is arithmetic, not intuition: multiply the singles, compare to the joint. Equal → independent. (Equivalently: P(A|B) = 0.2/0.4 = 0.5 = P(A) — B teaches nothing about A.)' },
            { t: 'No — different events are always dependent', ok: false, why: 'Independence is common and precious (it is what makes multiplication legal). "Different" and "dependent" are unrelated words.' },
            { t: 'Cannot tell from numbers alone', ok: false, mis: 'independence-untestable', why: 'The numbers are exactly enough — the definition IS a numeric equation. (What numbers cannot tell you is WHY they are independent; the mechanism is the modeler’s job.)' }
          ],
          hints: ['Compute P(A)·P(B). Compare with P(A∩B).', '0.5 × 0.4 = ? versus 0.2.']
        },
        {
          type: 'mcq',
          prompt: `A data center puts both backup disks in the same rack. Each fails 1% per year. The engineer computes P(both fail) = 0.01² = 0.0001. What is wrong?`,
          options: [
            { t: 'Same rack means shared power, heat, and floods — the failures are NOT independent, and the true joint risk is much higher than 0.0001', ok: true, why: 'Multiplication requires independence, and the physical setup destroys it: one surge kills both. P(both) can approach 0.01 itself under strong dependence. This exact modeling error contributed to real outages and financial crashes — correlated failures are THE risk-engineering trap.' },
            { t: 'Nothing — 1% times 1% is 0.01%', ok: false, mis: 'independence-assumed', why: 'The arithmetic is fine; the LICENSE to multiply is missing. Every multiplication of probabilities silently claims independence — audit the claim, not the product.' },
            { t: 'The math should be 0.01 + 0.01', ok: false, mis: 'add-probabilities', why: 'Adding approximates P(at least one), a different question. The broken part is not which operation — it is the independence assumption underneath the multiply.' }
          ],
          hints: ['What single event could take out BOTH disks at once?', 'Shared causes create dependence. What does that do to the multiplied estimate?'],
          edge: 'The fix is physical before mathematical: separate racks, rooms, cities ("failure domains"). Cloud availability zones exist to buy back independence — architecture as probability engineering.'
        },
        {
          type: 'mcq',
          prompt: `X = sum of two dice. Which statement correctly describes the distribution of X?`,
          options: [
            { t: 'P(X = 7) = 6/36 is the largest; probabilities fall off in a pyramid toward 2 and 12 at 1/36 each', ok: true, why: 'Each value’s probability = its count of outcome-pairs / 36 (5.1’s counting). The full list of value ↦ probability IS the distribution — the object the dice-lab bars were drawing all along.' },
            { t: 'All values 2–12 have probability 1/11', ok: false, mis: 'outcomes-vs-events', why: 'The uniform-values error again (5.1): pairs are uniform, sums are not. Distributions must be COMPUTED from the space, not assumed flat.' },
            { t: 'X has one true value that varies', ok: false, mis: 'rv-as-unknown', why: '"One value that varies" is a contradiction — X is a spread of possibilities with weights. The distribution is the honest, complete description of that spread.' }
          ],
          hints: ['For each sum s, count pairs giving s, divide by 36.', 'Counts: 1,2,3,4,5,6,5,4,3,2,1 — the pyramid.']
        },
        {
          type: 'mcq',
          prompt: `Requests arrive independently. P(a request is a search) = 0.3. Out of the next two requests, P(first is a search AND second is not) = ?`,
          options: [
            { t: '0.3 × 0.7 = 0.21 — independence licenses multiplying, and "not a search" uses the complement', ok: true, why: 'Two independent facts, one multiplication; the 0.7 arrives via 1 − 0.3 (5.2’s complement). Small compositions like this build every traffic model.' },
            { t: '0.3 × 0.3 = 0.09', ok: false, why: 'The second factor must be P(NOT search) = 0.7 — the event asked about is mixed (one yes, one no). Read the event before computing.' },
            { t: '0.3 + 0.7 = 1.0', ok: false, mis: 'add-probabilities', why: 'Adding complementary probabilities of DIFFERENT requests answers nothing (and 1.0 would mean certainty — alarm bells). AND across independent events is ×.' }
          ],
          hints: ['Break the event into two independent pieces.', 'P(search) × P(not search).']
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Random variables are what you simulate</h4>
<pre><code>// building blocks — every simulation is made of these:
const coin  = () => Math.random() < 0.5;          // Bernoulli(½)
const die   = () => 1 + Math.floor(Math.random() * 6);
const biased = p => Math.random() < p;            // Bernoulli(p) — the atom of randomness

// independent by construction: separate calls to random()
const twoDiceSum = () => die() + die();</code></pre>
<p>Each call to <code>Math.random()</code> is (modeled as) independent of every other — which is why <code>die() + die()</code> correctly simulates two independent dice. Simulations inherit their correctness from independence assumptions; break them (reusing a random value twice!) and the simulation silently lies.</p>
<h4>The classic simulation bug</h4>
<pre><code>const r = die();
const sum = r + r;        // BUG: one die counted twice — sums are always even!
const sum2 = die() + die(); // correct: two independent rolls</code></pre>`,
      questions: [
        {
          type: 'mcq',
          prompt: `The buggy line <code>const r = die(); sum = r + r</code> — what distribution does it actually produce?`,
          options: [
            { t: 'Only even sums 2, 4, 6, 8, 10, 12, each 1/6 — one die doubled, not two dice added', ok: true, why: 'Reusing r makes the two "dice" PERFECTLY dependent (always equal). The pyramid collapses onto the doubles. Dependence bugs do not crash — they quietly produce the wrong world. Chart your simulations!' },
            { t: 'The same as two dice — same function called', ok: false, mis: 'independence-assumed', why: 'The function was called ONCE. Independence needs two separate draws of randomness; copying one draw is maximal dependence. The variable r froze the randomness.' },
            { t: 'Random garbage', ok: false, why: 'Worse than garbage: a perfectly clean WRONG distribution — plausible enough to survive code review. Distribution bugs are the stealthiest bug family; only comparing charts (dice lab!) catches them.' }
          ],
          hints: ['If r = 3, what is r + r? Can the sum ever be 7?', 'Never odd — one draw, doubled. What dependence is that?'],
          edge: 'The real-world version: reusing one random seed across "independent" test runs, or one sampled user for both A and B groups. Ask of every simulation: how many independent draws did I ACTUALLY make?'
        },
        {
          type: 'mcq',
          prompt: `A load test needs "requests arriving with 30% searches, independently". Which line models one request correctly?`,
          options: [
            { t: '<code>const isSearch = Math.random() < 0.3;</code> — a fresh Bernoulli draw per request', ok: true, why: 'Each request gets its own random draw: independent by construction, 30% by the threshold. The Bernoulli(p) pattern is the atom every traffic/failure/AB-test simulation is built from.' },
            { t: '<code>const isSearch = (requestCount % 10) < 3;</code> — exactly 30%, no randomness needed', ok: false, mis: 'pattern-vs-random', why: 'That produces a rigid repeating PATTERN (3 searches, then 7 non-searches, forever) — right average, wrong world: no streaks, no variance. Caches and queues behave completely differently under patterns vs randomness. Averages are not distributions.' },
            { t: '<code>const isSearch = Math.random() < 0.3 ? true : Math.random() < 0.3;</code>', ok: false, why: 'A confused double-draw that yields P ≈ 0.3 + 0.7·0.3 = 0.51 for true — wrong probability entirely. Compose randomness carefully; test by counting a million draws.' }
          ],
          hints: ['One request = one independent yes/no with p = 0.3. Which code is exactly that?', 'One draw, one comparison.'],
          edge: 'The deterministic-pattern trap is subtle and real: perfectly-spaced load hides worst cases (bursts!) that random load exposes. Simulations must model the variance, not only the mean.'
        },
        {
          type: 'mcq',
          prompt: `An A/B test assigns users by <code>userId % 2</code>. The team later ships a feature to even userIds only, then reads the A/B results. What went wrong, in this node's language?`,
          options: [
            { t: 'Group assignment and the feature are now DEPENDENT (both keyed on even ids) — the "A vs B" difference mixes two causes and cannot be attributed', ok: true, why: 'The A/B logic assumed group ⊥ everything-else. Reusing the same key broke independence: group A = feature-users. Any measured difference is contaminated. Randomization exists precisely to manufacture independence — reusing keys un-manufactures it.' },
            { t: 'Nothing — deterministic assignment is fine for A/B tests', ok: false, why: 'Deterministic hashing IS fine (and standard) — UNTIL something else keys on the same attribute. The sin is not determinism; it is the shared key creating dependence with another treatment.' },
            { t: 'userId % 2 is not mathematically random', ok: false, mis: 'randomness-purity', why: 'For assignment purposes, hash-determinism acts random ENOUGH — the requirement is independence from outcomes, not cryptographic randomness. The failure here is the correlated second use, which would poison true randomness reused the same way too.' }
          ],
          hints: ['List everything that depends on "userId is even" after the feature ships.', 'Group AND feature. Can the analysis separate their effects?'],
          edge: 'The industry fix: hash(userId + experimentName) — a fresh independent-ish coin per experiment. One added string restores the independence the analysis silently requires.'
        }
      ]
    }
  }
};

/* ============ 5.4 EXPECTATION & LINEARITY ============ */
window.NODES['prob.expectation'] = {
  id: 'prob.expectation', num: '5.4', trackId: 'probability',
  title: 'Expectation & Linearity',
  minutes: 35,
  payoff: 'average-case analysis · pricing risk',
  levels: {

    l1: {
      html: `
<h4>The long-run average</h4>
<p>Roll a die thousands of times and average the results. The average settles near <b>3.5</b>. That target is the <span class="term">expected value</span> (القيمة المتوقعة) — written E[X]: each value weighted by its probability, summed.</p>
<pre><code>E[die] = 1·(1/6) + 2·(1/6) + … + 6·(1/6) = 21/6 = 3.5</code></pre>
<p>Note the joke in the name: you never "expect" a 3.5 — no die face shows it! E[X] is the long-run AVERAGE, not the likeliest value. It answers "what does this earn/cost per play, on average?"</p>
<div class="callout amber"><p><b>Why business runs on it:</b> a lottery ticket costs 2€ and pays 1000€ with probability 1/1000. E[winnings] = 1€ per ticket — you pay 2€ for an average return of 1€. Casinos and insurance companies are expectation calculators with buildings.</p></div>`,
      questions: [
        {
          type: 'input',
          prompt: `E[one fair die] = ? (decimal)`,
          accept: ['3.5', '3,5', '21/6'],
          placeholder: '…',
          hints: ['Average of 1 through 6, all equally weighted.', '(1+2+3+4+5+6)/6.'],
          why: '21/6 = 3.5 — the long-run average, and a value the die itself can never show. Expectation lives between the outcomes.'
        },
        {
          type: 'mcq',
          prompt: `The lottery ticket: costs 2€, pays 1000€ with chance 1/1000. Playing many times, you…`,
          options: [
            { t: 'Lose about 1€ per ticket on average — E[winnings] = 1€, but you paid 2€', ok: true, why: 'E = 1000 × 0.001 = 1€ of average return per 2€ ticket. Over 1000 plays: spend 2000€, win ~1000€. The expected value makes the invisible drain visible — which is why lotteries profit.' },
            { t: 'Break even — sometimes you win big', ok: false, mis: 'big-win-blindness', why: 'The big win is already INSIDE the expectation (that is what the ×0.001 weighting does). After counting it fairly, the average is still −1€ per play. Rare-but-large does not beat the arithmetic.' },
            { t: 'Cannot say — luck decides', ok: false, mis: 'luck-thinking', why: 'One ticket, luck decides. A thousand tickets, the average takes over (the law of large numbers — coming in 5.6). Expected value is exactly the "many plays" answer, and it is computable today.' }
          ],
          hints: ['E[winnings] = prize × probability.', 'Compare with the ticket price.'],
          edge: 'Same computation, respectable clothes: insurance premiums, free-to-play game economies, ad auctions. E[X] is the price tag of uncertainty.'
        },
        {
          type: 'mcq',
          prompt: `E[X] = 3.5 for a die. Is 3.5 the "most likely" result?`,
          options: [
            { t: 'No — it is not even a possible result! Expectation is the long-run average, not the likeliest value', ok: true, why: 'Every face has probability 1/6 — there IS no most likely face. E[X] answers a different question: where the average lands. Keep "average" and "most likely" (the mode) in separate boxes; they only sometimes agree.' },
            { t: 'Yes — expected means most probable', ok: false, mis: 'mean-vs-mode', why: 'The everyday word misleads: "expected" value can be impossible to observe (3.5 pips?). For skewed things (income, response times) mean and mode differ wildly — using the wrong one misleads dashboards.' },
            { t: 'Yes, rounded to 3 or 4', ok: false, why: '3 and 4 are exactly as likely as 1 or 6 (1/6 each). The average sits between them by symmetry, not by their popularity.' }
          ],
          hints: ['Can a die show 3.5?', 'No — so what kind of quantity is E[X]?'],
          edge: 'Real-world bite: average request latency 120ms while the most common latency is 40ms (a long tail pulls the mean). Which number goes in the alert? Depends on the question — that is why percentiles exist.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Definition and the superpower</h4>
<pre><code>E[X] = Σ (value · probability of that value)

LINEARITY:   E[X + Y] = E[X] + E[Y]     — ALWAYS. Even when X and Y are dependent!
             E[cX] = c·E[X]</code></pre>
<p>Read that again: expectations add <b>with no independence requirement</b>. Probabilities of joint events needed independence to multiply (5.3); expectations of sums need nothing at all. This asymmetry is the single most useful free lunch in probability.</p>
<h4>Why it is a superpower: two dice without tears</h4>
<pre><code>Hard way: distribution of the sum (that 11-value pyramid), then weight and add — 11 terms.
Linearity: E[sum] = E[die₁] + E[die₂] = 3.5 + 3.5 = 7.     Done.</code></pre>
<h4>The indicator trick (تقنية المؤشر) — counting by expectation</h4>
<p>To count "how many of the n things happen", write the count as a sum of 0/1 variables (one per thing), then use linearity:</p>
<pre><code>E[count] = Σ P(thing i happens)
Example: 100 requests, each fails with p = 0.02 (even dependently!):
E[failures] = 100 × 0.02 = 2</code></pre>`,
      questions: [
        {
          type: 'input',
          prompt: `E[sum of two dice] = ? — use linearity, not the pyramid.`,
          accept: ['7'],
          placeholder: '…',
          hints: ['E[X + Y] = E[X] + E[Y].', '3.5 + 3.5.'],
          why: '7. Eleven-term computation avoided by one addition — that is linearity earning its title.'
        },
        {
          type: 'mcq',
          prompt: `X and Y are DEPENDENT (say, Y = X, one die counted twice). Is E[X + Y] still E[X] + E[Y]?`,
          options: [
            { t: 'Yes — linearity holds with no independence condition: E[X + X] = 3.5 + 3.5 = 7 ✓ (check: E[2X] = 2·3.5)', ok: true, why: 'The doubled die (5.3’s bug!) has a totally different DISTRIBUTION than two dice — but the same expectation of the sum. Linearity survives dependence; that robustness is precisely what makes it the workhorse.' },
            { t: 'No — dependence breaks addition like it breaks multiplication', ok: false, mis: 'linearity-needs-independence', why: 'The most commonly mis-remembered rule in probability! MULTIPLYING probabilities needs independence; ADDING expectations does not. (What dependence does affect: the variance and the distribution’s shape — not the mean.)' },
            { t: 'Only if X and Y have the same distribution', ok: false, why: 'No such condition — E[die + coin·100] = 3.5 + 50 works fine. Linearity asks for nothing at all. Enjoy it.' }
          ],
          hints: ['Test the extreme dependence Y = X by computing E[2X] directly.', '2·E[X] — does it match E[X] + E[X]?'],
          edge: 'Where dependence DOES matter: the spread. Two real dice sum between 2 and 12; the doubled die gives only evens with wilder swings. Same mean, different risk — variance is the next concept that sees the difference.'
        },
        {
          type: 'mcq',
          prompt: `100 requests each fail with probability 0.02, but failures cluster (one bad server causes bursts — highly dependent). E[number of failures] = ?`,
          options: [
            { t: 'Exactly 2 — the indicator trick: E[count] = Σ P(each fails) = 100 × 0.02, dependence irrelevant', ok: true, why: 'Write count = 1₁ + 1₂ + … + 1₁₀₀ (each indicator is 1 if request i fails). Linearity adds the expectations one by one — clustering cannot touch the mean. (It DOES make bad days worse: bursts of 30 instead of steady 2s. Same average, scarier shape.)' },
            { t: 'Unknown — clustering breaks the calculation', ok: false, mis: 'linearity-needs-independence', why: 'Clustering breaks the multiplication rule and widens the spread — but the EXPECTED count is untouchable by dependence. Knowing what survives your assumptions failing is real modeling skill.' },
            { t: '2 only if failures are independent', ok: false, why: 'The independence disclaimer belongs to other theorems. E[sum] = sum of E’s carries no fine print — that is the whole point of teaching it loudly.' }
          ],
          hints: ['Express the count as a sum of one-per-request 0/1 variables.', 'E of each indicator = its probability = 0.02. Add 100 of them.'],
          edge: 'The indicator trick computes "expected number of…" for anything: expected collisions in a hash table, expected matches in a shuffled deck, expected comparisons in quicksort (5.7!). One trick, whole textbooks of applications.'
        },
        {
          type: 'mcq',
          prompt: `A game offer: pay 10 coins, then draw — 50% win 6 coins, 30% win 10, 20% win 25. Take the offer?`,
          options: [
            { t: 'E[prize] = 3 + 3 + 5 = 11 > 10 — positive expected profit of 1 coin per play, so yes (if played repeatedly and coins are all you care about)', ok: true, why: 'Weight each prize: 6·0.5 + 10·0.3 + 25·0.2 = 11. The +1 average says repeated play profits. The honest brackets matter: one-shot play with money you cannot afford to lose is a variance question, not just a mean question.' },
            { t: 'No — 50% of the time you get only 6, losing 4', ok: false, mis: 'mode-decision', why: 'Judging by the most likely single outcome ignores the other half of the world. The weighted average — which counts the 25s fairly — is the repeated-play truth: +1 per play.' },
            { t: 'E = (6 + 10 + 25)/3 = 13.7 — clearly take it', ok: false, mis: 'unweighted-average', why: 'The unweighted average pretends all prizes are equally likely — they are not (the 25 is rarest!). Weights ARE the expectation; dropping them inflated the answer from 11 to 13.7.' }
          ],
          hints: ['Multiply each prize by its probability; add.', '6·0.5 + 10·0.3 + 25·0.2 — compare with the 10-coin cost.']
        },
        {
          type: 'mcq',
          prompt: `E[X] = 5 for one request's retries. A batch runs 200 independent requests. E[total retries] and the reason:`,
          options: [
            { t: '1000 — linearity scales: E[sum of 200 copies] = 200 × 5 (independence true here but not even needed)', ok: true, why: 'Sum of 200 variables → sum of 200 expectations. Capacity planning in one line: expected work = per-item expectation × item count. (What planning ALSO needs: the spread around 1000 — coming in 5.6.)' },
            { t: '5 — expectation describes each request, not totals', ok: false, why: 'Expectations of sums ARE sums of expectations — totals inherit directly. That inheritance is why per-unit E[·] numbers are so operationally useful.' },
            { t: '1000 ± unknowable — dependence between requests could change it', ok: false, mis: 'linearity-needs-independence', why: 'Even fully dependent requests give E = 1000 (the superpower, again). Dependence would change the RELIABILITY of being near 1000 — never the 1000 itself.' }
          ],
          hints: ['E[X₁ + … + X₂₀₀] = ?', '200 terms of 5 each.']
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Average-case analysis: expectation meets Big-O</h4>
<pre><code>// hash table lookup, n keys in m buckets:
// expected chain length = n/m (the "load factor") — the indicator trick!
// keep m ≈ n and E[lookup] = O(1). Worst case is still O(n) — expectation ≠ guarantee.</code></pre>
<p>When Track 2 said "hash lookups are O(1) expected", THIS was the machinery: expected chain length by linearity. The famous average-case results — quicksort's O(n log n), hashing's O(1) — are expectation computations wearing algorithm costumes (full story in 5.7).</p>
<h4>Reading the fine print of "average"</h4>
<ul>
  <li><b>Expectation ≠ guarantee:</b> E[latency] = 50ms permits horrible 5s tails. SLAs use percentiles for exactly this reason.</li>
  <li><b>Expectation ≠ typical:</b> long tails drag means far from the crowd (mean income vs typical income).</li>
  <li><b>Linearity is your calculator:</b> expected totals, counts, and costs decompose into little sums — even under dependence.</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A hash table holds 1000 keys in 500 buckets. E[keys in the bucket you look up] = 2. A teammate says "so lookups touch at most 2 keys". Correct them.`,
          options: [
            { t: '2 is the AVERAGE, not a ceiling — some buckets hold 5+ keys (and pigeonhole guarantees at least one has ≥ 2). Expected O(1) coexists with worse cases', ok: true, why: 'E[chain] = load factor = 2 by the indicator trick; the distribution around it has a tail. "Expected constant time" is a statement about averages over keys/hashes — the fine print every average-case claim carries.' },
            { t: 'The teammate is right — expectation bounds the value', ok: false, mis: 'expectation-as-bound', why: 'Expectations are centers, not ceilings — a bucket with 6 keys and many with 1 average out to 2 happily. (Bounds on how far values stray exist — concentration inequalities — but they are extra theorems, not the definition.)' },
            { t: 'The average is wrong — it should be 1000', ok: false, why: '1000 is the TOTAL key count. Per-bucket expectation divides by the 500 buckets: n/m = 2. The indicator sum is per-bucket.' }
          ],
          hints: ['What does E[·] promise about individual cases?', 'Nothing individually — it is the weighted center. What claims need percentiles or bounds instead?'],
          edge: 'This distinction runs the SLA industry: "average latency 50ms" and "p99 latency 2s" describe one same system. Means for capacity, percentiles for promises.'
        },
        {
          type: 'mcq',
          prompt: `A shuffled playlist of 30 songs: what is E[number of songs that land in their original position], and by what trick?`,
          options: [
            { t: 'Exactly 1 — indicators: each song stays put with probability 1/30, and linearity sums 30 × (1/30) = 1, dependence be damned', ok: true, why: 'The positions are heavily dependent (one song staying affects others) — and linearity does not care. E = 1 for ANY playlist size: 30 songs or 30 million. One of the prettiest indicator-trick results.' },
            { t: '0 — a good shuffle moves everything', ok: false, why: 'Each song has a 1/30 chance of staying — small but real, and 30 chances add up (to exactly 1). "Shuffled" means random, not deliberately displaced.' },
            { t: 'Impossible without the full distribution of fixed points', ok: false, mis: 'linearity-needs-independence', why: 'The full distribution is genuinely complicated (inclusion–exclusion territory!) — and unnecessary: the MEAN needs only linearity. Choosing the cheap tool that answers the actual question is the skill.' }
          ],
          hints: ['Define indicator Iᵢ = 1 if song i stays at position i. What is E[Iᵢ]?', '1/30 each. Sum 30 of them.'],
          edge: 'The always-1 answer (independent of n!) surprises everyone once. The distribution around it is the famous "derangements" story — but the mean cost you one line.'
        },
        {
          type: 'mcq',
          prompt: `Ad pricing: an impression earns 2€ with probability 0.001 (a click), else 0. A publisher serves 1M impressions/day. Which numbers matter for revenue planning?`,
          options: [
            { t: 'E[per impression] = 0.002€, so E[daily] = 2000€ by linearity — plus (for risk) how much daily revenue swings around 2000', ok: true, why: 'Per-unit expectation × volume = expected total (linearity, as always). At n = 10⁶ the swings around 2000€ are small relative to it (5.6’s law of large numbers) — which is WHY ad businesses are plannable despite each impression being a lottery ticket.' },
            { t: 'Nothing is plannable — each impression is pure chance', ok: false, mis: 'luck-thinking', why: 'A million tiny lotteries make one predictable business — aggregation converts randomness into stability. This is arguably THE core economic fact of the internet ad industry.' },
            { t: 'The 2€ figure — it is the only real money', ok: false, why: 'The 2€ arrives once per thousand impressions; unweighted, it wildly overprices inventory. The sellable number is the expectation: 0.002€ per impression — literally the unit ads are priced in (CPM ≈ 1000 × per-impression E).' }
          ],
          hints: ['Expected revenue per impression? Then scale by a million.', '2 × 0.001, then ×10⁶.'],
          edge: 'CPM, insurance premiums, freemium conversion — industries whose unit prices ARE expectations. E[X] is where probability becomes accounting.'
        }
      ]
    }
  }
};

/* ============ 5.5 NAMED DISTRIBUTIONS ============ */
window.NODES['prob.distributions'] = {
  id: 'prob.distributions', num: '5.5', trackId: 'probability',
  title: 'Named Distributions',
  minutes: 30,
  payoff: 'retry logic · load modeling · recognizing shapes',
  levels: {

    l1: {
      html: `
<h4>Four shapes you will meet everywhere</h4>
<p>Random situations repeat the same few patterns so often that the patterns earned names. Recognize the story, and you instantly know the formulas:</p>
<ul>
  <li><b>Bernoulli(p)</b> — ONE yes/no try: a coin flip, a click, one request failing. The atom.</li>
  <li><b>Binomial(n, p)</b> — COUNT the successes in n independent tries: heads in 10 flips, failures among 100 requests. (Its formula runs on C(n,k) — Track 2.2 cashing in.)</li>
  <li><b>Geometric(p)</b> — WAIT for the first success: retries until one works, rolls until a six. Averages 1/p tries.</li>
  <li><b>Uniform</b> — all outcomes equal: a fair die, an unbiased random pick.</li>
</ul>
<div class="callout amber"><p><b>The skill is recognition</b> (المهارة هي التعرّف على النمط): hear "how many of my n tries succeed?" → binomial. Hear "how long until it works?" → geometric. Naming the pattern imports its whole toolbox for free.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `"Out of 20 emails sent, how many bounce?" — which named pattern?`,
          options: [
            { t: 'Binomial(20, p) — counting successes (bounces) across n independent tries', ok: true, why: 'The signature: fixed number of tries, count the yes-events. Each email is a Bernoulli atom; the count of 20 atoms is binomial.' },
            { t: 'Geometric — emails until the first bounce', ok: false, mis: 'count-vs-wait', why: 'Geometric answers "HOW LONG until the first" — a waiting question. This asks "HOW MANY among a fixed 20" — a counting question. The two interrogatives route to two distributions.' },
            { t: 'Uniform — each email is equal', ok: false, why: '"Equal treatment" ≠ uniform distribution. Uniform describes one draw having equally-likely values; this scenario counts events across many draws.' }
          ],
          hints: ['Fixed n? Counting successes? Or waiting for the first?', 'n = 20 fixed, counting bounces.']
        },
        {
          type: 'mcq',
          prompt: `"Keep retrying the flaky API until a call succeeds — how many attempts will that take?" — which pattern, and its average if p = 0.2 per call?`,
          options: [
            { t: 'Geometric(0.2) — waiting for the first success; average 1/p = 5 attempts', ok: true, why: 'The waiting-time story, exactly. E = 1/p is the geometric’s famous gift: 20% success rate → 5 tries on average. Every retry loop you have ever written has this distribution.' },
            { t: 'Binomial — attempts are being counted', ok: false, mis: 'count-vs-wait', why: 'Binomial needs a FIXED number of tries decided in advance; here the trying STOPS at first success — the count is the random thing produced by waiting. Stopping rules change the distribution.' },
            { t: 'Bernoulli(0.2), five times', ok: false, why: 'Each attempt IS a Bernoulli atom — but the question asks about the pattern of the WHOLE retry loop, and that composite has its own name and formulas: geometric.' }
          ],
          hints: ['Is n fixed in advance, or does the process stop when it succeeds?', 'Stops at first success — the waiting pattern. Average = 1/p.'],
          edge: 'The 1/p rule is instant capacity math: 1% conversion rate → expect ~100 visitors per sale; a 1-in-6 die face → ~6 rolls. Memorize it.'
        },
        {
          type: 'mcq',
          prompt: `Which situation is genuinely Uniform?`,
          options: [
            { t: 'The last digit of a random person’s phone number (0–9, essentially equal)', ok: true, why: 'No mechanism favors any last digit — a clean, natural uniform over ten values. (Real uniforms are rarer than people assume; this is one of the good ones.)' },
            { t: 'The number of siblings a random person has', ok: false, why: 'Heavily non-uniform: 0–2 siblings are common, 9 is rare. Counts of real things almost never spread evenly.' },
            { t: 'A random word’s length in English text', ok: false, why: 'Peaks around 3–5 letters, long tail to "antidisestablishmentarianism". Language is deeply non-uniform (a fact search engines and compressors exploit — 5.1’s weighted-bank lesson).' }
          ],
          hints: ['Uniform = every value truly equally likely. Which option has no favoritism at all?'],
          edge: 'The professional reflex: never ASSUME uniform — verify or design it (5.1’s quiz-bank bug). Uniformity is an achievement, not a default.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The formulas, and where each piece comes from</h4>
<pre><code>Bernoulli(p):   P(1) = p, P(0) = 1−p.            E = p
Binomial(n,p):  P(k successes) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ.    E = np
Geometric(p):   P(first success on try k) = (1−p)ᵏ⁻¹ p.  E = 1/p
Uniform{1..n}:  P(each) = 1/n.                    E = (n+1)/2</code></pre>
<p>Read the binomial formula as a Track 2/5 team effort: pᵏ(1−p)ⁿ⁻ᵏ multiplies the independent per-try probabilities (5.3) for ONE arrangement, and <b>C(n,k)</b> counts the arrangements (2.2) — which k of the n tries were the successes. Counting × probability, married.</p>
<p>The geometric similarly: fail k−1 times ((1−p)ᵏ⁻¹, independence), then succeed once (·p). Formulas you can DERIVE need never be memorized.</p>
<p>And E = np for the binomial? That is 5.4's indicator trick: n tries, each contributing p to the expected count. Three nodes, one formula sheet.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Binomial: P(exactly 2 heads in 4 flips) = C(4,2)·(½)²·(½)² = 6/16. What does the C(4,2) count?`,
          options: [
            { t: 'WHICH 2 of the 4 flips were the heads — the arrangements, from Track 2.2', ok: true, why: 'Each specific pattern (HHTT, HTHT, …) has probability (½)⁴ = 1/16; there are C(4,2) = 6 patterns with exactly two heads. Combinatorics counts the roads, probability weighs each road — the formula is their handshake.' },
            { t: 'The number of heads', ok: false, why: 'The k = 2 in the EXPONENT tracks the head-count; C(4,2) counts something else — the ways to PLACE those 2 heads among 4 slots. Two different 2s in one formula.' },
            { t: 'A correction factor with no meaning', ok: false, mis: 'formula-mysticism', why: 'Every factor in a good formula has a job. Without C(n,k) you would count only ONE arrangement (say HHTT) and underestimate 6-fold. Meaningless factors are formulas asking to be misremembered.' }
          ],
          hints: ['List the 4-flip sequences with exactly 2 heads.', 'HHTT, HTHT, HTTH, THHT, THTH, TTHH — how many? And what does 2.2 call that count?']
        },
        {
          type: 'input',
          prompt: `100 requests, each independently failing with p = 0.03. E[number of failures] = ?`,
          accept: ['3'],
          placeholder: '…',
          hints: ['Binomial expectation: np.', '100 × 0.03.'],
          why: 'np = 3 — the indicator trick pre-packaged. (Planning the SPREAD around 3 needs the distribution; planning the average needs one multiplication.)'
        },
        {
          type: 'mcq',
          prompt: `Geometric(p = 0.5): P(first success exactly on try 3) = ?`,
          options: [
            { t: '(0.5)²·(0.5) = 0.125 — two failures, then the success', ok: true, why: 'Fail, fail, succeed: (1−p)ᵏ⁻¹·p with k = 3. Derived from independence in one breath — no memorization required.' },
            { t: '0.5 — every try has the same chance', ok: false, mis: 'per-try-vs-pattern', why: '0.5 is each TRY’s chance; the EVENT "first success at try 3" requires a specific three-part history (F, F, S), and histories multiply their parts.' },
            { t: '1/3 — three possible tries', ok: false, mis: 'uniform-assumed', why: 'Waiting times are never uniform — try 1 is always the most likely (probability p), with each later try less likely by the surviving-failures factor. The geometric DECAYS; assuming flatness misprices every retry budget.' }
          ],
          hints: ['Write the exact history the event requires.', 'F then F then S — multiply the three.'],
          edge: 'The decay shape answers a practical question: most retry loops finish fast, but the tail is long — why retry systems add caps (max 5 attempts) and backoff (4.1!).'
        },
        {
          type: 'mcq',
          prompt: `A dashboard shows daily signup counts. Which named model is the natural FIRST fit, and what must you check before trusting it?`,
          options: [
            { t: 'Binomial(visitors, p) — n visitor-trials each converting with probability p; check that conversions are roughly independent (no viral bursts) and p is stable across the day', ok: true, why: 'Signups = count of successes among n visits: the binomial story. The two assumptions (independence, constant p) are exactly where reality attacks it — launch-day virality breaks independence; a pricing change mid-day breaks constant-p. Model first, then audit the assumptions.' },
            { t: 'Uniform — some days high, some low, all equal', ok: false, mis: 'uniform-assumed', why: '"Varies" ≠ "uniform"! Counts cluster around np with a bell-ish shape — nothing like flat. Uniform is a specific strong claim, almost never true of aggregates.' },
            { t: 'No model — real data defies mathematics', ok: false, why: 'Real data defies PERFECT models and rewards good-enough ones: binomial baselines detect anomalies ("today is 4σ above expected — investigate"). Refusing to model is refusing the alarm system.' }
          ],
          hints: ['Signups are a COUNT over many independent-ish tries — which pattern is that?', 'And which two assumptions does that pattern quietly make?'],
          edge: 'The general workflow this teaches: name the distribution → inherit its math → list its assumptions → watch for their failure. Modeling is naming plus honesty.'
        },
        {
          type: 'mcq',
          prompt: `Two teams monitor "requests until first error": Team A sees an average of 200, Team B (same system, later) sees 50. In geometric language, what changed?`,
          options: [
            { t: 'The per-request error probability p rose from ~1/200 to ~1/50 — a 4× reliability regression, read straight off E = 1/p', ok: true, why: 'The geometric mean IS a reliability gauge: average-wait 1/p inverts to error rate p. 200 → 50 means p quadrupled (0.5% → 2%). Waiting-time metrics and rate metrics are the same information, mirrored.' },
            { t: 'Nothing — averages naturally wander', ok: false, mis: 'luck-thinking', why: 'A 4× shift in a mean over many observations is signal, not wander (5.6 will quantify exactly how sure). Dismissing metric changes as luck is how regressions ship.' },
            { t: 'Team B measured wrong — waits cannot shrink', ok: false, why: 'Waits shrink exactly when errors become more frequent — that is the E = 1/p seesaw. The measurement is fine; the system degraded.' }
          ],
          hints: ['E[wait] = 1/p. Invert both averages.', 'p went from 1/200 to 1/50 — which direction is that for reliability?']
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Distributions in the wild — a field guide</h4>
<pre><code>// Bernoulli: every feature flag rollout — "5% of users get the new UI"
if (hash(userId) % 100 < 5) { ... }

// Binomial: "how many of today's 10k builds will flake?"  E = 10000·p
// Geometric: retry loops, "rolls until a critical hit", "interviews until an offer"
// Uniform: crypto keys and shuffles — where NON-uniformity is a vulnerability</code></pre>
<h4>Two professional habits</h4>
<ul>
  <li><b>Derive, don't memorize:</b> every formula above reassembles from independence (multiply per-try), counting (C(n,k) for arrangements), and linearity (E = np). If you can rebuild it, you cannot misremember it.</li>
  <li><b>Name the assumptions with the name:</b> saying "binomial" is silently saying "independent tries, constant p". Say it out loud in design reviews — reality loves violating exactly those two.</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A game designer wants "a critical hit about every 5 attacks". They set p = 0.2 per attack (geometric waits, E = 5). Players complain about 15-attack droughts. Are the players wrong?`,
          options: [
            { t: 'No — geometric waits have a long tail: P(drought ≥ 15) = 0.8¹⁴ ≈ 4.4%, so an active player sees them regularly. The mean hides the tail', ok: true, why: 'E = 5 says nothing about spread: the decaying-but-long geometric tail makes double-digit droughts routine across thousands of attacks. Games fix the FEELING with pity timers (guarantee by attack N) — deliberately leaving pure geometry for psychology (5.1’s lesson repeating).' },
            { t: 'Yes — E = 5 means a crit every 5 attacks, guaranteed', ok: false, mis: 'expectation-as-bound', why: 'Expectations are centers, not schedules (5.4!). The distribution around 5 includes 1s and 20s. Designing player experience on the mean alone is how "unfair RNG" complaints are born — from correct mathematics.' },
            { t: 'The random number generator must be broken', ok: false, mis: 'bug-vs-distribution', why: 'The droughts are the distribution working correctly — 0.8¹⁴ ≈ 4.4% is by design. Distinguishing "RNG bug" from "tail of a correct distribution" requires exactly this node. (Chart the waits; compare to (1−p)ᵏ⁻¹p.)' }
          ],
          hints: ['P(no crit in 14 straight attacks) = ?', '0.8¹⁴ — estimate with logs or the e-rule: ≈ e⁻³·¹ ≈ 4%. Common or rare for an active player?'],
          edge: 'Industry answer worth knowing: many games use PSEUDO-random distributions (rising p after each miss) — trading true geometrics for tails that feel fair. Math, tuned for humans.'
        },
        {
          type: 'mcq',
          prompt: `A/B test: 10,000 users each see version A or B (50/50 split via hashing). You expect "about 5000" in group A. What range is normal, and what count should trigger a bug hunt?`,
          options: [
            { t: 'Binomial(10⁴, ½): E = 5000 with typical swing ~±50 (√(np(1−p)) = 50); seeing 5050 is normal, seeing 5500 (10 swings away) means the split is broken', ok: true, why: 'The binomial does not deliver exactly np — it delivers np ± a few √(np(1−p)). 5500 is ~10 standard swings out: essentially impossible by chance, so the hashing is biased (a real, common bug: hash correlating with platform). Distributions give you calibrated alarms.' },
            { t: 'Exactly 5000, or the randomizer is faulty', ok: false, mis: 'expectation-as-bound', why: 'Demanding exactness misreads randomness — a perfect randomizer hits exactly 5000 only ~0.8% of the time! Both too-far AND suspiciously-exact-forever are anomalies. Healthy randomness wobbles.' },
            { t: 'Anything from 0 to 10,000 — randomness permits everything', ok: false, mis: 'luck-thinking', why: '"Permitted" and "plausible" differ by astronomical factors: 4000 heads in 10⁴ fair flips has probability ~10⁻⁸⁸. Distributions quantify plausibility — that quantification IS the monitoring tool.' }
          ],
          hints: ['Typical swing of a binomial count ≈ √(np(1−p)).', '√(10⁴·¼) = 50. How many 50s away is 5500?'],
          edge: 'The √np(1−p) "typical swing" is your first meeting with standard deviation — 5.6 formalizes it. The habit lands now: expected value ± typical swing = the normal zone.'
        },
        {
          type: 'mcq',
          prompt: `Security review: a session-token generator picks tokens "randomly", but analysis shows some tokens appear 100× more often than others. Why is NON-uniformity a security hole here?`,
          options: [
            { t: 'Attackers guess in order of probability — a skewed distribution concentrates mass on few tokens, collapsing the effective search space far below the theoretical one', ok: true, why: 'Uniformity maximizes attacker work (nothing to prioritize); skew hands them a hit-list. Security’s "128 bits of randomness" silently means UNIFORM bits — entropy measures the distribution, not the length. The 5.1 lesson (uniform is engineered, not assumed) with adversaries attached.' },
            { t: 'It isn’t — random is random', ok: false, mis: 'uniform-assumed', why: 'For security, the SHAPE is the whole game: a die that rolls 6 half the time is "random" and ruinous to bet against… for you. Adversaries are distribution-exploitation machines; only uniformity gives them nothing.' },
            { t: 'Non-uniform tokens are longer', ok: false, why: 'Length is unchanged — the weakness is invisible in any single token and lives only in the distribution across many. Which is why it needs statistical review, not code review, to catch.' }
          ],
          hints: ['If you had to guess a token, which would you try first under skew? Under uniformity?', 'Skew gives a best-first list. What does that do to expected guessing time (a geometric-like wait!)?'],
          edge: 'Real bugs of this family: weak PRNG seeds, modulo bias (rand() % n — the 2.8 mod, biasing when n doesn’t divide the range!), and timestamp-seeded tokens. The fix is always the same: cryptographic uniformity, verified.'
        }
      ]
    }
  }
};
