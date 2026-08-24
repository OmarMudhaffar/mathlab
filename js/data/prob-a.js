/* Track 5 content — nodes 5.1 and 5.2 */

/* ============ 5.1 SAMPLE SPACES & EVENTS ============ */
window.NODES['prob.samplespaces'] = {
  id: 'prob.samplespaces', num: '5.1', trackId: 'probability',
  title: 'Sample Spaces & Events',
  minutes: 30,
  payoff: 'modeling uncertainty · counting chances',
  levels: {

    l1: {
      widget: 'dicelab',
      html: `
<h4>List everything that can happen</h4>
<p>Probability starts with one honest move: write down ALL possible outcomes. This complete list is the <span class="term">sample space</span>. One die: {1, 2, 3, 4, 5, 6}. A coin: {H, T}. Two dice: all 36 pairs (6 × 6 — the product rule from 2.1, back on duty).</p>
<p>An <span class="term">event</span> is a part of that list you care about — "the sum is 7" is the set {(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)}. Yes, events are SETS (1.5!) — and ∪, ∩, complement all mean what they always meant.</p>
<pre><code>P(event) = (outcomes in the event) / (all outcomes)     — when all outcomes are equally likely</code></pre>
<div class="callout amber"><p><b>Roll the dice lab below.</b> Why does sum 7 win so often? Count its ways: 6 out of 36. Sum 2 has only one way (1,1). The bars follow the counting — probability is counting, divided.</p></div>`,
      questions: [
        {
          type: 'input',
          prompt: `Two dice are rolled (one red, one blue). How many outcomes are in the sample space?`,
          accept: ['36'],
          placeholder: '…',
          hints: ['Each die: 6 results. Two independent choices…', 'The product rule: 6 × 6.'],
          why: '36 — every (red, blue) pair. Track 2 counting IS the floor that probability stands on.'
        },
        {
          type: 'mcq',
          prompt: `Rolling two dice: why is sum 7 more likely than sum 2?`,
          options: [
            { t: 'Sum 7 happens in 6 ways; sum 2 in only 1 way (1,1). More ways = more probability', ok: true, why: 'P(7) = 6/36, P(2) = 1/36. The dice do not "prefer" 7 — there are simply more roads leading there. Probability = counting the roads.' },
            { t: 'Middle numbers are luckier', ok: false, mis: 'luck-thinking', why: '"Lucky" is not a mechanism. The real cause is countable: list the pairs making each sum. 7 has six, 2 has one. Mystery dissolved by a list.' },
            { t: 'It is not — every sum from 2 to 12 is equally likely', ok: false, mis: 'outcomes-vs-events', why: 'The 36 PAIRS are equally likely; the 11 SUMS are not — each sum bundles a different number of pairs. Confusing outcomes with events is the classic first probability error.' }
          ],
          hints: ['List the pairs that give 7. Then the pairs that give 2.', '(1,6),(2,5),(3,4),(4,3),(5,2),(6,1) versus (1,1).'],
          edge: 'The widget shows this as the pyramid shape of the bars — count-of-ways drawn as a picture. Two-dice sums are C(pairs) counting in disguise.'
        },
        {
          type: 'mcq',
          prompt: `Event A = "sum is even", event B = "sum is bigger than 9". What is A ∩ B, in dice language?`,
          options: [
            { t: '"Sum is even AND bigger than 9" — the sums {10, 12}', ok: true, why: 'Intersection = both conditions at once (1.5 again). Sums over 9: {10, 11, 12}; keep the even ones: {10, 12}. Events are sets; probability inherits all of set algebra.' },
            { t: '"Sum is even OR bigger than 9"', ok: false, mis: 'union-intersection-swap', why: 'OR is the union A ∪ B — a bigger event. ∩ is the strict overlap: both at once. Same symbols, same meanings as Track 1.' },
            { t: 'Nothing — events cannot be combined', ok: false, why: 'Combining events is half of probability! P(A ∩ B), P(A ∪ B), P(not A) — the set operations each get a probability. That is the machinery being built here.' }
          ],
          hints: ['∩ means both conditions hold.', 'Which sums are both even and > 9?']
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The rules of probability</h4>
<ul>
  <li>0 ≤ P(A) ≤ 1. P(whole space) = 1, P(∅) = 0.</li>
  <li><b>Complement:</b> P(not A) = 1 − P(A). Often the shortcut: "at least one…" is usually easier as 1 − P(none).</li>
  <li><b>Addition:</b> P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Look familiar? It is inclusion–exclusion (1.5/2.1) with sizes replaced by probabilities. If A and B cannot both happen (disjoint), the overlap term is 0.</li>
</ul>
<h4>Worked: "at least one six" in 4 rolls</h4>
<pre><code>Hard way: count rolls with one six, two sixes, … (messy)
Smart way: P(no six in 4 rolls) = (5/6)⁴ ≈ 0.482
           P(at least one six)  = 1 − 0.482 ≈ 0.518</code></pre>
<p>The complement trick turns a four-case counting problem into one subtraction. It is the single most reused move in applied probability.</p>
<div class="callout"><p><b>Equal likelihood is an assumption, not a law.</b> Counting-over-counting works for fair dice and shuffled cards. A biased coin needs weights on the outcomes. Always ask: "is every outcome really equally likely here?"</p></div>`,
      questions: [
        {
          type: 'input',
          prompt: `Two fair dice: P(sum = 7) = ? (as a fraction like "a/b", simplest form)`,
          accept: ['1/6', '6/36'],
          placeholder: 'a/b',
          hints: ['6 favorable pairs out of 36.', '6/36 simplifies (divide by the gcd — Track 2.7!).'],
          why: '6/36 = 1/6. Note the gcd from Track 2 doing the simplification. Everything connects.'
        },
        {
          type: 'mcq',
          prompt: `P(rain) = 0.3. What is P(no rain), and by which rule?`,
          options: [
            { t: '0.7 — the complement rule: rain and no-rain split the whole probability of 1', ok: true, why: 'The two events cover everything and never overlap, so their probabilities add to 1. P(not A) = 1 − P(A): the cheapest theorem in the book, used daily.' },
            { t: '0.3 — both are one event each', ok: false, why: 'Events do not get equal probability for being nameable! "No rain" holds the rest of the probability mass: 1 − 0.3.' },
            { t: 'Cannot tell without more data', ok: false, mis: 'complement-missed', why: 'This one IS determined: the two options exhaust reality (it rains or it does not). Complements need no extra data — that is their charm.' }
          ],
          hints: ['Rain + no-rain together cover every possible day.', 'P(A) + P(not A) = 1.']
        },
        {
          type: 'mcq',
          prompt: `A password check: "what is the chance at least one of my 10 servers fails today", given each fails with probability 0.01 (independently)? The smart route is…`,
          options: [
            { t: '1 − P(no server fails) = 1 − 0.99¹⁰ ≈ 0.096 — the complement collapses ten cases into one', ok: true, why: 'Directly counting "exactly 1 fails, exactly 2 fail, …" is ten computations. The complement is one: all-fine happens with 0.99¹⁰ ≈ 0.904, so at-least-one-failure ≈ 9.6%. "At least one" almost always means "use the complement".' },
            { t: '10 × 0.01 = 0.10 exactly', ok: false, mis: 'add-probabilities', why: 'Adding ignores overlaps (two failing on the same day gets double-counted) — the missing inclusion–exclusion term. Here the approximation is close (0.10 vs 0.096) but it exceeds the truth, and for bigger numbers it breaks completely: 200 servers would give "probability 2".' },
            { t: '0.01 — failures share the same chance', ok: false, why: 'That is one server’s chance. Ten servers give failure ten chances to appear somewhere — the risk grows with the fleet (that is WHY reliability engineering is hard).' }
          ],
          hints: ['"At least one" — which trick does the lesson recommend?', 'Compute P(none), subtract from 1.'],
          edge: 'The broken "add them" method exposes itself at scale: probabilities above 1 are impossible. Any formula that CAN produce 1.3 was never a probability formula.'
        },
        {
          type: 'mcq',
          prompt: `P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2. What is P(A ∪ B)?`,
          options: [
            { t: '0.7 — add, then subtract the overlap once: 0.5 + 0.4 − 0.2', ok: true, why: 'Inclusion–exclusion with probability weights: the ∩ was counted inside both A and B, so it comes off once. Same theorem as counting pizza-and-sushi likers in 1.5 — probability is measured counting.' },
            { t: '0.9 — just add', ok: false, mis: 'double-count-overlap', why: 'The 0.2 overlap got counted twice. Adding works ONLY for disjoint events — always ask "can both happen?" before adding.' },
            { t: '0.2 — the overlap is what they share', ok: false, mis: 'union-intersection-swap', why: 'That IS P(A ∩ B), already given. The union asks for "at least one of them" — the bigger region: 0.7.' }
          ],
          hints: ['P(A ∪ B) = P(A) + P(B) − P(A ∩ B).', 'Plug in.'],
        },
        {
          type: 'mcq',
          prompt: `A quiz app picks "a random question" — but 90% of its bank is easy questions. A user says "each difficulty should be equally likely, it's random!" What is wrong?`,
          options: [
            { t: '"Random" does not mean "uniform" — the sample space is weighted by the bank’s contents: easy comes up 90% of the time', ok: true, why: 'Random = drawn by chance; UNIFORM (منتظم) = all equally likely — a specific, optional property. Equal-likelihood is an assumption you must build (balance the bank, or sample by difficulty first), never a free gift of the word "random".' },
            { t: 'Nothing — random always means 50/50 per category', ok: false, mis: 'uniform-assumed', why: 'Then a lottery would be a coin flip! The distribution follows the CONTENTS of the space. Uniformity must be engineered — this exact bug (sampling raw data and expecting balance) ships in real products constantly.' },
            { t: 'Computers cannot be random, so the question is moot', ok: false, why: 'Pseudo-randomness is a real but different topic — the user’s complaint is about the DISTRIBUTION, which would be 90/10 even with perfect physical randomness. Diagnose the actual issue.' }
          ],
          hints: ['If you grab blindly from a bag with 90 red and 10 blue balls, is red-vs-blue 50/50?', 'The bag’s contents ARE the distribution.'],
          edge: 'The fix in practice: two-stage sampling — pick a difficulty uniformly FIRST, then a question within it. Designing sample spaces is a real engineering act.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Sample spaces in code: enumerate, then count</h4>
<pre><code>// brute-force a probability — when the space is small, just LIST it (2.1 skills):
let hit = 0, total = 0;
for (let a = 1; a <= 6; a++)
  for (let b = 1; b <= 6; b++) {
    total++;
    if (a + b === 7) hit++;
  }
hit / total    // → 6/36 = 0.1666…  exact, no simulation needed</code></pre>
<p>For small spaces, exact enumeration beats simulation: no noise, no luck. Simulation (5.6) is for spaces too big to list.</p>
<h4>Where the modeling happens</h4>
<ul>
  <li><b>QA testing:</b> "what fraction of input pairs triggers the bug?" — an event in the space of inputs.</li>
  <li><b>Game design:</b> loot tables ARE weighted sample spaces; "0.5% legendary" is a design decision about the space.</li>
  <li><b>The equal-likelihood trap in code:</b> <code>arr[Math.floor(Math.random()*arr.length)]</code> is uniform over the ARRAY — if the array has duplicates, the VALUES are not uniform. The space you sample is the space you get.</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `The loop above computes P(sum = 7) exactly. When is this enumeration approach the RIGHT tool (vs simulating random rolls)?`,
          options: [
            { t: 'When the sample space is small enough to list — enumeration is exact and reproducible; simulation adds noise for no benefit', ok: true, why: '36 outcomes: list them (microseconds, exact). Simulation gives 0.167 ± noise and needs thousands of rolls for 2 digits. Rule: enumerate when you can, simulate when you must (spaces too big — like 52-card shuffles at 8×10⁶⁷).' },
            { t: 'Never — real probability requires real randomness', ok: false, mis: 'simulation-superstition', why: 'Backwards! The probability IS the count ratio — randomness only ESTIMATES it. When the exact count is computable, the estimate is the inferior tool.' },
            { t: 'Only for dice problems', ok: false, why: 'Any finite space: password policies, card draws, test-input grids, config combinations. If nested loops can visit every outcome (Track 2 counting tells you the size!), enumeration applies.' }
          ],
          hints: ['What does simulation give you that this loop does not? And vice versa?', 'Simulation: noise. Enumeration: exactness. Which do you prefer when both are possible?'],
          edge: 'The size check IS Track 2: 6² = 36 — loop it. 52! — never. Counting before computing is what decides the method.'
        },
        {
          type: 'mcq',
          prompt: `A game promises "25% drop chance". A player fails 4 times in a row and reports a bug: "4 × 25% = 100%, I was guaranteed a drop!" Your reply as the developer:`,
          options: [
            { t: 'Chances don’t add across tries — P(at least one in 4) = 1 − 0.75⁴ ≈ 68%. Failing all four happens to 1 in 3 players. Working as designed', ok: true, why: 'The complement rule settles it: P(no drop 4×) = 0.75⁴ ≈ 32% — common! The player’s addition would promise certainty, and certainty is exactly what independent chances never give. (Many games DO add pity timers because humans feel this way.)' },
            { t: 'Apologize — 4 tries at 25% must produce a drop', ok: false, mis: 'add-probabilities', why: 'By that logic 5 tries gives 125% — an impossible number, which flags the broken method (L2!). Each try is fresh; the dice have no memory.' },
            { t: 'The player’s account is unlucky; reset their seed', ok: false, mis: 'luck-thinking', why: '"Unlucky accounts" is superstition with a UI. 0.75⁴ ≈ 0.32 predicts a third of all players see this streak — no seed reset needed, just arithmetic.' }
          ],
          hints: ['Compute P(zero drops in 4 tries) with independence.', '0.75⁴ = ? Is that rare?'],
          edge: 'Design lesson hiding here: players FEEL streaks as bugs, so real games add "pity" mechanics (guaranteed drop by try N) — deliberately changing the sample space to match psychology.'
        },
        {
          type: 'mcq',
          prompt: `<code>pick = names[Math.floor(Math.random() * names.length)]</code> where names = ["ali", "ali", "sara"]. P(pick = "ali") is…`,
          options: [
            { t: '2/3 — the draw is uniform over ARRAY SLOTS, and "ali" occupies two of the three slots', ok: true, why: 'The sample space is the index set {0, 1, 2}, uniform. The VALUE "ali" is an event containing two outcomes. Duplicates weight the values — the space you sample is the space you get.' },
            { t: '1/2 — two distinct names, equally likely', ok: false, mis: 'uniform-assumed', why: 'The code never sees "distinct names" — it sees three slots. Wanting value-uniformity requires deduplicating first ([...new Set(names)] — 1.5’s sets, fixing 5.1’s bug!).' },
            { t: '1/3 — every element gets one share', ok: false, why: 'Every SLOT gets 1/3 — and "ali" holds two slots: 2/3. Count the outcomes inside the event, always.' }
          ],
          hints: ['What exactly is uniform here — the values, or the indices?', 'Indices. How many indices hold "ali"?'],
          edge: 'This is a real bug family: sampling users from a log (active users appear more → oversampled), picking a "random" server from a weighted list. Ask "uniform over WHAT?" in every code review of randomness.'
        }
      ]
    }
  }
};

/* ============ 5.2 CONDITIONAL PROBABILITY & BAYES ============ */
window.NODES['prob.bayes'] = {
  id: 'prob.bayes', num: '5.2', trackId: 'probability',
  title: 'Conditional Probability & Bayes',
  minutes: 40,
  payoff: 'spam filters · test results · updating beliefs',
  levels: {

    l1: {
      html: `
<h4>Probability, after a hint</h4>
<p>I roll a die. P(six) = 1/6. Now I peek and tell you: "it landed on an even number." Suddenly your world shrank to {2, 4, 6} — and the six is one of three: P(six | even) = 1/3. The "|" reads "given" (بشرط): <span class="term">conditional probability</span> is probability inside a smaller world.</p>
<pre><code>P(A | B) = "the chance of A, living only inside the world where B happened"</code></pre>
<h4>The direction trap</h4>
<p>P(A|B) and P(B|A) are DIFFERENT questions, and swapping them is the most costly reasoning error in this whole track:</p>
<ul>
  <li>P(speaks English | is a pilot) ≈ very high (pilots must).</li>
  <li>P(is a pilot | speaks English) ≈ tiny (billions speak English).</li>
</ul>
<div class="callout amber"><p><b>Bayes' rule</b> (قاعدة بايز) is the machine for flipping the direction CORRECTLY — paying the fee of the base rates. It is how spam filters, medical tests, and every "given the evidence…" argument must reason.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A die was rolled; you learn it landed even. P(six | even) = ?`,
          options: [
            { t: '1/3 — the world shrank to {2, 4, 6}, and six is one of the three', ok: true, why: 'Conditioning = restricting the sample space to where the hint is true, then recounting. New world: three outcomes, one favorable.' },
            { t: '1/6 — the die never changed', ok: false, mis: 'information-ignored', why: 'The DIE did not change — your INFORMATION did. Probability describes knowledge: ruling out {1,3,5} concentrates the chances on what remains.' },
            { t: '1/2 — six is the best even number', ok: false, why: 'The three survivors {2,4,6} stay equally likely — the hint favored evens, not sixes among evens. Recount inside the small world: 1 of 3.' }
          ],
          hints: ['Cross out the outcomes the hint eliminated.', '{2, 4, 6} remain. Where is the six among them?']
        },
        {
          type: 'mcq',
          prompt: `Which is bigger: P(knows math | is an engineer), or P(is an engineer | knows math)?`,
          options: [
            { t: 'The first — most engineers know math, but most math-knowers are not engineers (students, scientists, teachers…)', ok: true, why: 'The two conditionals live in different worlds: the first inside "engineers" (small, math-heavy), the second inside "math-knowers" (huge, mixed). Direction matters because the worlds differ in size — the base rates.' },
            { t: 'The second — math implies engineering', ok: false, mis: 'conditional-flip', why: 'Implication direction flipped — the exact converse error from 1.4, now with probabilities. Millions know math without engineering; the flip silently ignores them.' },
            { t: 'Equal — same two groups either way', ok: false, mis: 'conditional-symmetric', why: 'Same two groups, different DENOMINATORS: divided by |engineers| vs divided by |math-knowers|. P(A|B) = P(B|A) only when the groups are the same size — almost never.' }
          ],
          hints: ['Whose world does each question live in? How big is each world?', 'Small world of engineers vs the huge world of people who know math.'],
          edge: 'Court cases have turned on this swap ("probability of the evidence given innocence" vs "probability of innocence given the evidence") — it has a name: the prosecutor’s fallacy.'
        },
        {
          type: 'mcq',
          prompt: `A spam filter sees the word "FREE!!!". It knows P("FREE!!!" | spam) is high. What question does it actually need answered?`,
          options: [
            { t: 'P(spam | "FREE!!!") — the flipped direction, which needs Bayes and the base rate of spam', ok: true, why: 'The filter observes the WORD and must judge SPAM — the reverse of what it measured from training data. Bayes performs the flip, weighting by how common spam is overall. Every classifier lives on this flip.' },
            { t: 'The same one it knows — high means spam', ok: false, mis: 'conditional-flip', why: 'Legit emails also say FREE sometimes — and if spam were rare, most FREE-emails would be innocent. The measured direction alone cannot decide; the flip (with base rates) can.' },
            { t: 'P("FREE!!!") — how common the word is', ok: false, why: 'That is one INGREDIENT of the flip (the denominator in Bayes), not the verdict. Needed, not sufficient.' }
          ],
          hints: ['What does the filter observe, and what must it conclude?', 'Observes the word; concludes spam-ness. Which conditional is that?'],
          edge: 'The full recipe next level — but the shape to remember now: evidence-given-cause is what you measure; cause-given-evidence is what you need; Bayes is the bridge.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The definitions</h4>
<pre><code>P(A | B) = P(A ∩ B) / P(B)                 (shrink to B's world, recount)
Bayes:  P(A | B) = P(B | A) · P(A) / P(B)   (the direction flipper)</code></pre>
<p>Bayes is just the definition applied twice — nothing mystical. The P(A) factor is the <span class="term">base rate</span> (النسبة الأساسية): how common A is BEFORE the evidence. Forgetting it is THE classic error.</p>
<h4>The famous example — do it with a population square</h4>
<p>A disease affects 1 in 1000 people. The test catches 99% of sick people, but also wrongly flags 5% of healthy people. You test positive. P(sick | positive)?</p>
<pre><code>Imagine 1000 people:
   1 sick     → test positive: ~1 person
 999 healthy  → 5% falsely positive: ~50 people
positives: 51 total, of which 1 is sick
P(sick | positive) = 1/51 ≈ 2%     ← not 99%!</code></pre>
<p>The intuition shock: a "99% accurate" test leaves you at 2% — because healthy people are SO much more common that their small error rate produces most of the positives. The base rate dominates. Counting a concrete population makes Bayes impossible to get wrong.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `In the disease example (1/1000 sick, 99% catch rate, 5% false positive): why is P(sick | positive) only ≈ 2%?`,
          options: [
            { t: 'The 50 false positives from the huge healthy group swamp the 1 true positive — the base rate wins', ok: true, why: 'Positives come from two doors: sick-and-caught (~1) and healthy-but-flagged (~50). You are one of the 51, and only 1 of those is sick. Rare conditions stay improbable even after decent evidence.' },
            { t: 'It isn’t — the test is 99% accurate, so 99%', ok: false, mis: 'base-rate-neglect', why: 'THE textbook error (doctors famously make it too). 99% is P(positive | sick) — the wrong direction! The flip must pay the base-rate fee: 1/1000 sick turns 99% into 2%. Population squares never lie.' },
            { t: 'The test is broken and useless', ok: false, why: 'Not useless: it moved your probability from 0.1% to 2% — a 20× update! It is just not PROOF. (A second independent positive would push toward 30%; evidence stacks.)' }
          ],
          hints: ['Draw the 1000 people. How many positives come from each group?', '~1 true + ~50 false = 51 positives. Which fraction is sick?'],
          edge: 'Real-world policy consequence: screening rare conditions in everyone produces mostly false alarms — why mass-screening decisions always weigh base rates first.'
        },
        {
          type: 'input',
          prompt: `A bag: 3 red, 2 blue balls. You draw one — it is red (and you keep it out). P(the NEXT draw is red | first was red) = ? (fraction "a/b")`,
          accept: ['2/4', '1/2'],
          placeholder: 'a/b',
          hints: ['After removing a red: what remains in the bag?', '2 red, 2 blue left.'],
          why: '2 red among 4 remaining → 2/4 = 1/2. Conditioning = updating the world to match what already happened.'
        },
        {
          type: 'mcq',
          prompt: `P(A ∩ B) = 0.12 and P(B) = 0.4. Then P(A | B) = ?`,
          options: [
            { t: '0.3 — the definition: 0.12 / 0.4', ok: true, why: 'Inside B’s world (which has total weight 0.4), the part where A also happens (0.12) makes up 30%. Conditioning is division — a renormalization to the smaller world.' },
            { t: '0.048 — multiply them', ok: false, mis: 'multiply-instead-divide', why: 'Multiplying is the OTHER direction (P(A∩B) = P(A|B)·P(B) — building the joint from the conditional). To EXTRACT the conditional, divide the joint by the condition.' },
            { t: '0.52 — add them', ok: false, why: 'No rule adds these two. Conditional probability is a ratio: how much of B’s world is also A’s.' }
          ],
          hints: ['P(A|B) = P(A ∩ B) / P(B).', '0.12 / 0.4.']
        },
        {
          type: 'order',
          prompt: `Compute P(spam | word) with Bayes, given: P(word | spam) = 0.6, P(spam) = 0.2, P(word | not spam) = 0.05. Arrange the steps.`,
          steps: [
            'Numerator (spam door): P(word | spam) · P(spam) = 0.6 × 0.2 = 0.12',
            'Other door: P(word | not spam) · P(not spam) = 0.05 × 0.8 = 0.04',
            'Total P(word) = 0.12 + 0.04 = 0.16 — evidence can arrive through either door',
            'P(spam | word) = 0.12 / 0.16 = 0.75'
          ],
          hints: ['Bayes numerator: evidence-given-cause × base rate of the cause.', 'The denominator must count ALL ways the word appears — spam and not-spam doors.', 'Divide the spam door by the total.'],
          why: 'The two-doors pattern: weight each cause by its base rate, then ask which door your evidence probably came through. Every naive-Bayes spam filter computes exactly these four lines.'
        },
        {
          type: 'mcq',
          prompt: `Yesterday you thought P(bug in module X) = 0.1. Today a test that usually fails when X is buggy — failed. Your new belief should be…`,
          options: [
            { t: 'Higher than 0.1 — computed by Bayes: the failing test is evidence FOR the bug, weighted by how often such failures happen anyway', ok: true, why: 'Bayes is a belief-update machine: prior (0.1) × evidence strength → posterior. How MUCH higher depends on the false-alarm rate of the test — the exact structure of the disease example, wearing a debugging costume.' },
            { t: 'Exactly 1 — the test failed, so the bug is proven', ok: false, mis: 'evidence-as-proof', why: 'Tests fail for other reasons too (flaky CI, environment, other modules) — the "healthy false positives" of debugging. Evidence moves probability; only impossible-otherwise evidence moves it to 1.' },
            { t: 'Still 0.1 — beliefs shouldn’t chase single events', ok: false, mis: 'information-ignored', why: 'Refusing to update wastes real information — as wrong as over-updating. The rational middle IS Bayes: move proportionally to the evidence’s strength. Debugging is applied conditional probability.' }
          ],
          hints: ['Prior belief + new evidence → what operation?', 'A Bayes update. Direction: does a failing test make the bug more or less likely?'],
          edge: 'Experienced debugging is Bayesian without saying so: "this failure USUALLY means the cache" = high P(failure | cache-bug) × decent base rate. Making it explicit sharpens it.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>A naive Bayes spam filter in 12 lines</h4>
<pre><code>// learned from data: how often words appear in spam vs ham (legit mail)
const pWordGivenSpam = { free: 0.30, meeting: 0.02, winner: 0.20 };
const pWordGivenHam  = { free: 0.03, meeting: 0.25, winner: 0.001 };
const pSpam = 0.4;

function spamScore(words) {
  let spam = Math.log(pSpam), ham = Math.log(1 - pSpam);
  for (const w of words) {
    if (pWordGivenSpam[w]) spam += Math.log(pWordGivenSpam[w]);
    if (pWordGivenHam[w])  ham  += Math.log(pWordGivenHam[w]);
  }
  return spam > ham;   // which door is more likely?
}</code></pre>
<p>Two Bayes doors, one per class — multiplied across words (assuming independence, the "naive" part), computed in logs so tiny products do not underflow floats (4.1's logs turning × into +, saving the day). This exact architecture filtered your inbox for two decades.</p>
<h4>The three-line summary of Bayesian thinking</h4>
<pre><code>posterior ∝ likelihood × prior
new belief  =  evidence strength  ×  old belief   (then normalize)</code></pre>`,
      questions: [
        {
          type: 'mcq',
          prompt: `In the spam filter code, why compute with Math.log instead of multiplying the probabilities directly?`,
          options: [
            { t: 'A 100-word email multiplies 100 small numbers — underflowing float64 toward 0. Logs turn the product into a sum, which floats handle fine', ok: true, why: '0.01¹⁰⁰ = 10⁻²⁰⁰, far below float64’s ~10⁻³⁰⁸ danger zone for chains… and comparisons of 0 vs 0 are meaningless. log turns ×into + (4.1’s rule!): −460 vs −520 compares perfectly. A math identity as an engineering fix.' },
            { t: 'Logarithms make the answer more accurate probabilistically', ok: false, why: 'The MATH is identical (log is monotonic — comparisons unchanged). The fix is numeric survival, not statistical improvement. Know which problem each tool solves.' },
            { t: 'Logs are faster than multiplication', ok: false, mis: 'perf-explains-semantics', why: 'log() costs MORE than × per operation. The win is correctness at scale (no underflow), worth every cycle. Performance is not the reason — precision is.' }
          ],
          hints: ['Estimate 0.01 multiplied by itself 100 times.', '10⁻²⁰⁰ — what does float64 do with products heading there? And what does log do to products?'],
          edge: 'The pattern "work in log-space" is universal in ML: log-likelihoods, log-probabilities, logsumexp. Whenever you see products of many probabilities, expect logs nearby.'
        },
        {
          type: 'mcq',
          prompt: `A monitoring alert fires. From history: the alert fires in 95% of real outages, but also ~40 times/month total while real outages happen ~2 times/month. P(real outage | alert) is roughly…`,
          options: [
            { t: '~5% — about 2 real firings among ~40 total: most alerts are false alarms, despite the impressive 95%', ok: true, why: 'Population-square the month: ~1.9 true firings, ~38 other firings. 1.9/40 ≈ 5%. The 95% (evidence-given-cause) seduces; the base rate (2 outages vs 40 alerts) decides. This IS the disease example, running in your on-call rotation.' },
            { t: '95% — the alert catches 95% of outages', ok: false, mis: 'base-rate-neglect', why: 'Direction flipped again: 95% = P(alert | outage). The needed direction P(outage | alert) must divide by ALL firings — and false alarms outnumber outages 19:1 here. Alert fatigue is base-rate neglect institutionalized.' },
            { t: 'Cannot combine monthly counts with percentages', ok: false, why: 'Counts ARE the friendliest form of Bayes (the population square is literally counts). 2 real, 40 total → the division is immediate.' }
          ],
          hints: ['Out of ~40 firings a month, how many correspond to real outages?', '95% of 2 ≈ 1.9. Divide by 40.'],
          edge: 'The SRE fix is Bayesian too: raise the alert threshold (fewer false firings → the SAME evidence becomes stronger). Tuning alerts = tuning likelihood ratios.'
        },
        {
          type: 'mcq',
          prompt: `The "naive" in naive Bayes: the filter multiplies word probabilities as if words were independent — but "free" and "winner" clearly travel together in spam. Why does the filter still work?`,
          options: [
            { t: 'The dependence errors inflate BOTH doors similarly, and only the comparison matters — the argmax survives imperfect probabilities', ok: true, why: 'The computed "probabilities" are distorted, but distorted in correlated ways across classes; the ORDERING (spam vs ham) is robust. A deep lesson: models can be wrong in the numbers yet right in the decision. (Its calibrated probabilities, though, should not be trusted.)' },
            { t: 'Words in email actually are independent', ok: false, mis: 'assumption-denial', why: 'They demonstrably are not ("click" predicts "here"). The assumption is FALSE and USEFUL — engineering lives in that gap, but only when you know the assumption is there and check where it bites.' },
            { t: 'It doesn’t work; modern filters use magic instead', ok: false, why: 'Naive Bayes filtered email successfully for ~20 years and still baselines text classification. Modern models improve on it — by modeling the dependence it ignored. Progress = fixing named assumptions.' }
          ],
          hints: ['What does the filter ultimately output — a probability, or a choice between two doors?', 'A choice. What must be preserved for the choice to be right?'],
          edge: 'The professional skill: know your model’s false assumptions BY NAME (independence, linearity, stationarity…) and know which outputs they poison (calibrated probabilities) vs spare (rankings). That is the difference between using a model and trusting one.'
        }
      ]
    }
  }
};
