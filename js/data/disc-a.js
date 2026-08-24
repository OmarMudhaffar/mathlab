/* Track 2 content — nodes 2.1 and 2.2 */

/* ============ 2.1 COUNTING PRINCIPLES ============ */
window.NODES['disc.counting'] = {
  id: 'disc.counting', num: '2.1', trackId: 'discrete',
  title: 'Counting Principles',
  minutes: 30,
  payoff: 'state spaces · brute-force feasibility',
  levels: {

    l1: {
      html: `
<h4>Counting without counting</h4>
<p>How many outfits from 3 shirts and 4 pants? You could list all twelve… or notice the shape of the problem: <em>for each</em> shirt, <em>every</em> pant is available. Independent choices <b>multiply</b>. That is the <span class="term">product rule</span> — the single most-used counting idea in computing.</p>
<p>Its sibling, the <span class="term">sum rule</span>, covers <em>either/or</em>: if you'll wear a dress OR a shirt-pants combo, and the options don't overlap, the counts <b>add</b>.</p>
<div class="callout amber"><p><b>The compass question:</b> am I making a sequence of choices (multiply), or picking between exclusive alternatives (add)? Misreading this one word — "and" vs "or" — is where most counting errors are born.</p></div>
<h4>The pigeonhole principle</h4>
<p>Put 13 pigeons into 12 holes: some hole holds two. Sounds trivial — and it proves non-obvious things: 13 people always share a birth month; any 5 cards contain two of the same suit. The art is spotting what the pigeons and holes <em>are</em>.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `3 shirts, 4 pants — how many outfits, and by which rule?`,
          options: [
            { t: '12, product rule — each shirt pairs with every pant', ok: true, why: 'A sequence of two independent choices: 3 × 4 = 12. "For each… every…" is the product rule’s signature.' },
            { t: '7, sum rule — 3 + 4 items', ok: false, mis: 'sum-product-swap', why: 'Adding counts the CLOTHES, not the outfits. Sum applies to either/or alternatives, and an outfit needs a shirt AND a pant.' },
            { t: '12, sum rule', ok: false, why: 'Right count, wrong law — and the law is what generalizes. AND-choices multiply; that is the product rule.' }
          ],
          hints: ['Is an outfit an either/or pick, or a this-AND-that build?', 'For each of the 3 shirts, how many complete outfits exist?']
        },
        {
          type: 'mcq',
          prompt: `13 people are in a room. What is <b>guaranteed</b>?`,
          options: [
            { t: 'Two of them share a birth month', ok: true, why: 'Pigeonhole: 13 people, 12 months — some month must hold at least two. No probability involved; it is forced.' },
            { t: 'Two of them share a birthday', ok: false, mis: 'pigeonhole-overreach', why: 'Only 13 pigeons for 366 day-holes — nothing forced. (Sharing gets LIKELY around 23 people, but that is probability, not guarantee — Track 5.)' },
            { t: 'Nothing — it depends on luck', ok: false, why: 'No luck needed: distribute 13 into 12 categories however you like, one category always doubles up.' }
          ],
          hints: ['What are the pigeons and what are the holes here?', '13 pigeons, 12 month-holes: can every hole hold at most one?'],
          edge: 'The guarantee needs pigeons > holes. 12 people could occupy 12 distinct months — the principle bites at 13.'
        },
        {
          type: 'mcq',
          prompt: `A drawer holds red, blue, and green socks (many of each). Grabbing blindly in the dark, how many socks <b>guarantee</b> a matching pair?`,
          options: [
            { t: '4', ok: true, why: 'Worst case: the first three are one of each color. Sock #4 has no new color to hide in — pigeonhole with 3 color-holes.' },
            { t: '3', ok: false, mis: 'off-by-one-worst-case', why: 'Three can still be red-blue-green, all different. Guarantees are about the WORST case surviving, not the likely case.' },
            { t: '2', ok: false, why: 'Two socks match only with luck. A guarantee must hold even against a maximally unhelpful drawer.' }
          ],
          hints: ['Play the adversary: how many socks can you draw with NO pair?', 'At most one per color = 3 pairless socks. The next one…?']
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The rules, precisely</h4>
<ul>
  <li><b>Product rule:</b> a procedure of k independent steps with n₁, n₂, …, n_k options has n₁·n₂·…·n_k outcomes.</li>
  <li><b>Sum rule:</b> if a choice is from disjoint pools A or B, total = |A| + |B|. Overlapping pools need inclusion–exclusion (node 1.5): |A ∪ B| = |A| + |B| − |A ∩ B|.</li>
  <li><b>Pigeonhole:</b> n+1 objects in n boxes force a box with ≥ 2. Generalized: N objects in n boxes force a box with ≥ ⌈N/n⌉.</li>
</ul>
<h4>Worked pattern: license plates</h4>
<pre><code>2 letters then 3 digits:  26 · 26 · 10 · 10 · 10 = 676,000
letters must DIFFER:      26 · 25 · 10 · 10 · 10 = 650,000</code></pre>
<p>The second line is the crucial move: once a choice <em>consumes</em> an option, later steps have fewer options — still the product rule, with shrinking factors. This shrinking product is about to become permutations (node 2.2).</p>
<div class="callout"><p><b>Sanity ritual:</b> after any count, test it on a tiny case you can list by hand (2 shirts, 2 pants → should be 4). Every counting formula should survive the n = 1 and n = 2 checks.</p></div>`,
      questions: [
        {
          type: 'input',
          prompt: `3 shirts, 4 pants, 2 pairs of shoes. How many full outfits?`,
          accept: ['24'],
          placeholder: '…',
          hints: ['Three independent choices in sequence.', '3 × 4 × 2.'],
          why: 'Product rule across three steps: 3 · 4 · 2 = 24. Each new independent choice multiplies the state space.'
        },
        {
          type: 'mcq',
          prompt: `Menu: 4 pastas or 3 pizzas (you pick one dish). Dessert: 2 options, always. Total meals?`,
          options: [
            { t: '(4 + 3) × 2 = 14', ok: true, why: 'Sum rule inside (disjoint dish pools: pasta OR pizza), then product rule with dessert (dish AND dessert). Rules compose.' },
            { t: '4 × 3 × 2 = 24', ok: false, mis: 'sum-product-swap', why: 'Multiplying pastas by pizzas pretends you eat one of EACH. Exclusive alternatives add; only sequential choices multiply.' },
            { t: '4 + 3 + 2 = 9', ok: false, why: 'Dessert is not an alternative to dinner — it is a second choice made after it. That AND is a ×.' }
          ],
          hints: ['Parse the "or" and the "and" in the setup.', 'Dishes: 4 + 3 ways. Then dessert multiplies.'],
          edge: 'Compound counting is exactly nested code: an if/else (sum) inside a loop over desserts (product).'
        },
        {
          type: 'mcq',
          prompt: `A 4-character PIN uses digits 0–9 with <b>no repeats</b>. How many PINs?`,
          options: [
            { t: '10 · 9 · 8 · 7 = 5040', ok: true, why: 'Each placed digit consumes an option: the shrinking product rule. (This is the permutation count P(10,4) — next node.)' },
            { t: '10⁴ = 10,000', ok: false, mis: 'ignore-constraint', why: 'That counts PINs WITH repeats allowed. "No repeats" shrinks each successive factor by one.' },
            { t: '10 · 4 = 40', ok: false, why: 'Choices multiply per POSITION, not per count-of-positions: four positions each contribute a factor.' }
          ],
          hints: ['How many options for slot 1? Then, having used one digit, slot 2?', '10, then 9, then 8, then 7 — multiply.']
        },
        {
          type: 'mcq',
          prompt: `A class has 30 students and 7 possible grades (A–F plus I). What does pigeonhole guarantee?`,
          options: [
            { t: 'Some grade is held by at least ⌈30/7⌉ = 5 students', ok: true, why: 'Generalized pigeonhole: N objects in n boxes force a box with at least ⌈N/n⌉. 30/7 ≈ 4.3, so some grade has ≥ 5.' },
            { t: 'Some grade is held by at least 2 students', ok: false, mis: 'weak-pigeonhole', why: 'True but far weaker than what is forced — the generalized principle gives ⌈30/7⌉ = 5, not just 2. Claim the strongest guarantee available.' },
            { t: 'Every grade is used at least 4 times', ok: false, why: 'Pigeonhole guarantees a crowded box, never a floor on every box — all 30 students could share one grade.' }
          ],
          hints: ['Spread 30 as evenly as possible over 7 boxes — what is the fullest box?', '⌈30/7⌉ = ⌈4.28…⌉ = 5.'],
          edge: 'This ⌈N/n⌉ bound is the same argument that says any hash table with N keys and n buckets has a bucket of size ≥ ⌈N/n⌉ — no hash function escapes it.'
        },
        {
          type: 'mcq',
          prompt: `|A| = 20 users like pizza, |B| = 15 like sushi, 8 like both. How many like at least one?`,
          options: [
            { t: '27', ok: true, why: 'Inclusion–exclusion: 20 + 15 − 8 = 27. The 8 both-likers were counted twice by the plain sum.' },
            { t: '35', ok: false, mis: 'double-count-overlap', why: '20 + 15 counts every both-liker twice — the sum rule requires DISJOINT pools, and these overlap by 8.' },
            { t: '12 + 7 = 19', ok: false, why: 'That counts only the exactly-one likers, dropping the 8 who like both — but "at least one" includes them.' }
          ],
          hints: ['Are the pizza pool and sushi pool disjoint?', 'Add, then subtract the overlap once: |A| + |B| − |A ∩ B|.']
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Counting decides what code is possible</h4>
<p>Before writing a brute-force, count the state space:</p>
<pre><code>8-char lowercase password:  26⁸ ≈ 2.1 × 10¹¹   // brute-forceable in hours
12-char mixed (62 chars):   62¹² ≈ 3.2 × 10²¹  // heat death of the universe territory</code></pre>
<p>The product rule IS the password-strength formula, the test-matrix size (3 browsers × 4 OSes × 2 locales = 24 runs), and the reason "just try all combinations" dies at ~20 boolean flags (2²⁰ ≈ 10⁶ fine; 2⁴⁰ not).</p>
<h4>Nested loops are products; guards are sums</h4>
<pre><code>for (const s of shirts)        // ×3
  for (const p of pants)       // ×4      → body runs 12 times
    tryOutfit(s, p);</code></pre>
<p>Loop nesting depth = number of product factors. That is why the counting rules and Big-O (node 2.4) are the same conversation.</p>
<p><b>Pigeonhole in production:</b> hashing N keys into n buckets guarantees collisions once N &gt; n — collision handling is not optional, it is arithmetic.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A test matrix covers 3 browsers × 4 OS versions × 2 locales. Adding a 5th OS version changes the run count by…`,
          options: [
            { t: '24 → 30: each new OS adds 3 × 2 = 6 runs', ok: true, why: 'The OS factor grows 4 → 5, so total = 3 · 5 · 2 = 30. Each unit added to one factor costs the product of the OTHER factors.' },
            { t: '24 → 25: one more version, one more run', ok: false, mis: 'linear-thinking', why: 'A new OS version must pair with every browser and locale — it arrives with 6 runs, not 1. Products punish casual additions.' },
            { t: '24 → 48: the matrix doubles', ok: false, why: 'Doubling happens when a factor doubles (4 → 8). Going 4 → 5 multiplies total by 5/4.' }
          ],
          hints: ['Recompute the product with the new factor.', '3 × 5 × 2 = ?'],
          edge: 'This is why CI matrices are pruned, not grown: every axis multiplies. Adding a 4th axis of size 3 would triple EVERYTHING.'
        },
        {
          type: 'mcq',
          prompt: `Hashing 1000 session keys into 256 buckets. Which statement is <b>guaranteed</b>?`,
          options: [
            { t: 'Some bucket holds at least ⌈1000/256⌉ = 4 keys', ok: true, why: 'Generalized pigeonhole — no hash function, however clever, can spread 1000 keys flatter than ⌈1000/256⌉ per fullest bucket.' },
            { t: 'Every bucket holds about 4 keys', ok: false, mis: 'average-vs-guarantee', why: 'That is the AVERAGE, and only a good hash approaches it. The guarantee is one-directional: some bucket is at least that full; others may be empty.' },
            { t: 'A perfect hash could avoid all collisions', ok: false, why: 'Not with 1000 keys and 256 slots — pigeonhole forbids injectivity into a smaller set (node 1.6: no injection from bigger to smaller).' }
          ],
          hints: ['Pigeons = keys, holes = buckets.', 'What does N > n force, and how full is the fullest box at minimum?'],
          edge: 'Same theorem, security flavor: a 256-bit hash of arbitrary files MUST have collisions — finding one is what breaks the function.'
        },
        {
          type: 'input',
          prompt: `A feature has 4 boolean flags and a mode with 3 values. How many configurations must exhaustive testing cover?`,
          accept: ['48'],
          placeholder: '…',
          hints: ['Each boolean contributes a ×2.', '2·2·2·2 = 16 flag states, then × 3 modes.'],
          why: '2⁴ · 3 = 48. Booleans are ×2 factors — the power set (node 1.5) meeting the product rule.',
          edge: 'At 10 flags and 3 modes it is 3072 — the point where teams switch from exhaustive testing to pairwise coverage.'
        }
      ]
    }
  }
};

/* ============ 2.2 PERMUTATIONS & COMBINATIONS ============ */
window.NODES['disc.combinations'] = {
  id: 'disc.combinations', num: '2.2', trackId: 'discrete',
  title: 'Permutations & Combinations',
  minutes: 35,
  payoff: 'password spaces · subsets · DP tables',
  levels: {

    l1: {
      widget: 'pascal',
      html: `
<h4>Does the order matter?</h4>
<p>Two questions that sound alike and count completely differently:</p>
<ul>
  <li><b>Podium:</b> 5 runners — how many ways to award gold, silver, bronze? The medals differ, so <em>order matters</em>: 5 · 4 · 3 = 60. A <span class="term">permutation</span>.</li>
  <li><b>Committee:</b> 5 people — how many ways to pick 3 for a committee? Nobody outranks anyone, so <em>order is noise</em>: each trio was counted 3! = 6 times by the podium logic. 60 / 6 = 10. A <span class="term">combination</span>.</li>
</ul>
<div class="callout amber"><p><b>The whole subject in one move:</b> count as if order mattered, then divide out the orderings you never wanted. Overcount deliberately, correct exactly.</p></div>
<p>Below: <b>Pascal's triangle</b> — every combination count C(n, k), stacked. Each cell is the sum of the two above it, and each row sums to 2ⁿ. Hover around; three nodes from now these numbers will be everywhere.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Which scenario is a <b>combination</b> (order irrelevant)?`,
          options: [
            { t: 'Choosing 3 pizza toppings from 8', ok: true, why: 'Mushroom-olive-onion is the same pizza as onion-olive-mushroom. Selection without ranking = combination.' },
            { t: 'Awarding gold, silver, bronze to 3 of 8 runners', ok: false, mis: 'order-blindness', why: 'The medals are distinguishable — swapping gold and bronze changes the outcome. Distinct roles = order matters = permutation.' },
            { t: 'Entering a 4-digit PIN', ok: false, why: '1234 and 4321 open different vaults — position is everything in a PIN. (A sequence, not a set.)' }
          ],
          hints: ['Test: swap two chosen items. Different outcome, or same?', 'Same pizza either way → order was noise.']
        },
        {
          type: 'mcq',
          prompt: `5 runners, 3 medals (gold/silver/bronze). Why is the count 5 · 4 · 3?`,
          options: [
            { t: 'Each medal consumes a runner: 5 choices, then 4, then 3', ok: true, why: 'The shrinking product from node 2.1 — every award removes one option from the pool. P(5,3) = 60.' },
            { t: 'It is 5 + 4 + 3 = 12 podiums', ok: false, mis: 'sum-product-swap', why: 'Sequential choices multiply. Adding would mean gold OR silver OR bronze — but a podium needs all three.' },
            { t: 'It should be 5³ — three picks from five', ok: false, mis: 'ignore-constraint', why: '5³ lets one runner take all three medals. Distinct winners means no replacement: the factors shrink.' }
          ],
          hints: ['After gold is awarded, who is still eligible for silver?', 'Shrinking pool: 5, then 4, then 3 — multiply.']
        },
        {
          type: 'mcq',
          prompt: `Podium says 60; committee-of-3 says 10. Where did the factor of 6 go?`,
          options: [
            { t: 'Each trio was counted 3! = 6 times — once per internal ordering', ok: true, why: 'The podium distinguishes {A,B,C} as ABC, ACB, BAC, BCA, CAB, CBA. A committee sees one trio. Divide by 3! to un-count the order.' },
            { t: 'Committees are smaller than podiums', ok: false, why: 'Both select exactly 3 people from 5 — the sets are identical. Only the LABELING inside differs.' },
            { t: 'The formula subtracts 50 invalid committees', ok: false, mis: 'divide-vs-subtract', why: 'Correcting an overcount is a DIVISION (each object counted equally often), never a subtraction. 60/6, not 60−50 — same number here, wildly different logic elsewhere.' }
          ],
          hints: ['Take one specific trio — how many podium orders does it generate?', '3 choices for gold × 2 for silver × 1 = 6 orderings of the same trio.'],
          edge: 'The divide-out move only works because EVERY trio is overcounted exactly 6 times — uniform overcounting is what licenses division.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The formulas</h4>
<pre><code>n! = n·(n−1)·…·2·1                 (0! = 1 by convention — the empty product)
P(n,k) = n!/(n−k)!                  k-length sequences, no repeats
C(n,k) = n!/(k!(n−k)!) = P(n,k)/k!  k-element subsets   ("n choose k")</code></pre>
<h4>Identities that do real work</h4>
<ul>
  <li><b>Symmetry:</b> C(n,k) = C(n,n−k). Choosing 3 to include IS choosing 2 to leave out. Compute the small side.</li>
  <li><b>Pascal's identity:</b> C(n,k) = C(n−1,k−1) + C(n−1,k). Fix one element: every subset either contains it or doesn't — sum rule splitting a count into disjoint cases. This recurrence IS the triangle, and it is a dynamic-programming table.</li>
  <li><b>Row sum:</b> Σₖ C(n,k) = 2ⁿ. Adding up subsets of every size = counting all subsets = the power set (node 1.5).</li>
</ul>
<h4>The binomial theorem</h4>
<pre><code>(x + y)ⁿ = Σₖ C(n,k) xᵏ yⁿ⁻ᵏ</code></pre>
<p>Why combinations appear in algebra: expanding (x+y)ⁿ means choosing, in each of n factors, an x or a y — the xᵏ terms are the ways to choose which k factors donate an x. Counting and algebra are the same machine.</p>`,
      questions: [
        {
          type: 'input',
          prompt: `C(5, 2) = ? (choosing 2 from 5, order irrelevant)`,
          accept: ['10'],
          placeholder: '…',
          hints: ['P(5,2) = 5·4 = 20 ordered pairs.', 'Each unordered pair was counted 2! = 2 times.', '20 / 2 = 10.'],
          why: 'C(5,2) = 5·4 / 2! = 10. Count ordered, divide out the order.'
        },
        {
          type: 'mcq',
          prompt: `You must compute C(100, 98) in your head. The move is…`,
          options: [
            { t: 'C(100,98) = C(100,2) = 100·99/2 = 4950', ok: true, why: 'Symmetry: choosing 98 to keep is choosing 2 to discard. The identity exists precisely to make the small side available.' },
            { t: 'Expand 100!/(98!·2!) digit by digit', ok: false, why: 'Mathematically identical but humanly (and numerically!) hostile — 100! overflows every native integer type. Cancel first, always.' },
            { t: 'C(100,98) = 100·99·98', ok: false, mis: 'perm-comb-swap', why: 'That is heading toward P(100,3), an unrelated ordered count. C needs the k! divided out — and symmetry avoids the mess entirely.' }
          ],
          hints: ['Choosing 98 to include is choosing how many to exclude?', 'C(n,k) = C(n,n−k), and C(100,2) is two shrinking factors over 2.'],
          edge: 'In code the same lesson: compute C(n,k) by multiplying k small fractions, never via full factorials — 21! already overflows int64.'
        },
        {
          type: 'mcq',
          prompt: `Pascal's identity C(n,k) = C(n−1,k−1) + C(n−1,k) works by fixing one element x and splitting subsets into…`,
          options: [
            { t: 'Those containing x (choose k−1 more) and those without x (choose all k elsewhere)', ok: true, why: 'Every k-subset either has x or not — disjoint, exhaustive cases, so the counts ADD (sum rule). This "condition on one element" move powers half of combinatorics.' },
            { t: 'Small subsets and large subsets', ok: false, why: 'Both terms count k-subsets — same size. The split is membership of one FIXED element, not size.' },
            { t: 'Even and odd subsets', ok: false, why: 'Parity plays no role here — the two terms are "with x" and "without x", nothing more.' }
          ],
          hints: ['Pick a specific element x. What are the two disjoint fates of any k-subset with respect to x?', 'Contains x: k−1 slots remain among n−1. Omits x: all k slots among n−1.'],
          edge: 'This recurrence + base cases IS the DP that fills Pascal’s triangle row by row — your first dynamic program, wearing math notation.'
        },
        {
          type: 'mcq',
          prompt: `Why does row n of Pascal's triangle sum to 2ⁿ?`,
          options: [
            { t: 'Both sides count all subsets of an n-set — grouped by size vs by element-choices', ok: true, why: 'Σ C(n,k) counts subsets sorted by size; 2ⁿ counts them by n independent in/out choices. Two counts of one set must agree — a "double counting" proof.' },
            { t: 'Each row doubles the previous row’s sum', ok: false, why: 'True (each entry feeds two children) — but that is a mechanism, not the meaning. The bijection with subsets explains WHY doubling happens: each new element doubles the subset count.' },
            { t: 'Coincidence of small cases', ok: false, mis: 'examples-prove', why: '1, 2, 4, 8, 16… is a pattern, and patterns lie (Track 1). The subset argument proves it for every n at once.' }
          ],
          hints: ['What does C(n,0) + C(n,1) + … + C(n,n) count, in words?', 'All subsets, organized by size. What else counts all subsets?'],
          edge: 'Counting one thing two ways ("double counting") is a proof technique in its own right — often slicker than induction.'
        },
        {
          type: 'mcq',
          prompt: `In the expansion of (x + y)⁴, the coefficient of x²y² is…`,
          options: [
            { t: 'C(4,2) = 6', ok: true, why: 'Each x²y² term arises by choosing WHICH 2 of the 4 factors contribute an x — a committee choice. Binomial theorem: coefficients are combinations.' },
            { t: '4', ok: false, why: 'That is C(4,1), the coefficient of x¹y³ (or x³y¹). The middle term of an even power is the biggest — C(4,2) = 6.' },
            { t: '2 — one for each variable', ok: false, mis: 'coefficient-confusion', why: 'The coefficient counts arrangements, not variables: how many of the 16 expansion paths through (x+y)(x+y)(x+y)(x+y) spell xxyy in some order.' }
          ],
          hints: ['Expanding means picking x or y from each factor — 4 picks.', 'How many pick-sequences contain exactly two x’s?', 'Choose which 2 factors give x: C(4,2).']
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Where the formulas run in production</h4>
<pre><code>// all pairs — every "compare everything with everything":
for (let i = 0; i < n; i++)
  for (let j = i + 1; j < n; j++)   // j > i: each pair once, no order
    compare(a[i], a[j]);            // runs C(n,2) = n(n−1)/2 times</code></pre>
<p>That <code>j = i + 1</code> is the combination move in code: it kills the double-count (i,j)/(j,i) exactly like dividing by 2! — the loop <em>structure</em> encodes the formula.</p>
<h4>Subsets = bitmasks, sized subsets = C(n,k)</h4>
<pre><code>// iterate ALL subsets of n flags (node 1.5): 2^n masks
for (let mask = 0; mask < (1 << n); mask++) ...
// of these, C(n,k) have exactly k bits set — "popcount(mask) === k"</code></pre>
<p>Pascal's identity is also the memoized recursion you'd write for C(n,k) — combinatorics is dynamic programming's home town. And password entropy is just log₂ of a permutation count: security teams literally bill in this node's units.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `The double loop with <code>j = i + 1</code> over n items runs its body exactly…`,
          options: [
            { t: 'C(n,2) = n(n−1)/2 times — each unordered pair once', ok: true, why: 'j > i admits each pair in exactly one orientation — the code-shaped version of dividing n(n−1) ordered pairs by 2.' },
            { t: 'n² times — two nested loops over n', ok: false, mis: 'ignore-constraint', why: 'That is the count for two FULL loops. Starting j above i cuts the square to a triangle: roughly half, exactly n(n−1)/2.' },
            { t: 'P(n,2) = n(n−1) times', ok: false, mis: 'perm-comb-swap', why: 'n(n−1) counts ordered pairs — that is the version with j from 0 skipping only j === i. The j > i guard is precisely what removes order.' }
          ],
          hints: ['For i = 0, how many j values? For i = 1?', '(n−1) + (n−2) + … + 1 — a sum you proved by induction in 1.7.'],
          edge: 'The same triangle number is why "compare all pairs" scales as O(n²) (node 2.4) — 10k items is 50M comparisons.'
        },
        {
          type: 'input',
          prompt: `A team of 12 needs a code-review pairing: how many distinct <b>pairs</b> of reviewers can be formed?`,
          accept: ['66'],
          placeholder: '…',
          hints: ['Order inside a pair is irrelevant — combination.', 'C(12,2) = 12·11/2.'],
          why: 'C(12,2) = 66. Handshakes, network links, A/B matchups — every "all pairs" count is this formula.'
        },
        {
          type: 'mcq',
          prompt: `Two password schemes: (A) 8 characters from 64 symbols, repeats allowed. (B) 10 distinct characters from 64, order matters. Which space is bigger?`,
          options: [
            { t: 'B — P(64,10) ≈ 64¹⁰ dwarfs A’s 64⁸', ok: true, why: 'B is 64·63·…·55, slightly under 64¹⁰ ≈ 1.2×10¹⁸ but two full powers of 64 (≈4096×) beyond A’s 64⁸ ≈ 2.8×10¹⁴. Length beats every other lever.' },
            { t: 'A — repeats allowed means more freedom', ok: false, mis: 'repeats-dominate', why: 'Repeats help per position, but B has TWO extra positions: each one multiplies by ~60. The no-repeat penalty (64→55 factors) is trivial next to two extra factors.' },
            { t: 'Roughly equal', ok: false, why: 'They differ by a factor of ~4000 — in security, that is the gap between days and decades of brute force.' }
          ],
          hints: ['Write both as products; count the factors.', 'A: eight 64s. B: ten factors, each ≥ 55.'],
          edge: 'log₂ of these counts is "bits of entropy": A ≈ 48 bits, B ≈ 60 bits. Every +1 bit doubles the attacker’s work.'
        }
      ]
    }
  }
};
