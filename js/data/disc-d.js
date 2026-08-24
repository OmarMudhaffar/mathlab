/* Track 2 content — nodes 2.7, 2.8 and the Lattice boss */

/* ============ 2.7 NUMBER THEORY I: GCD & EUCLID ============ */
window.NODES['disc.numtheory'] = {
  id: 'disc.numtheory', num: '2.7', trackId: 'discrete',
  title: 'Number Theory I: gcd & Euclid',
  minutes: 30,
  payoff: 'reducing fractions · cryptography foundations',
  levels: {

    l1: {
      widget: 'eucstep',
      html: `
<h4>The largest square tile</h4>
<p>You must tile a 48 × 18 floor with identical square tiles, no cutting. What is the biggest tile that works? The side must divide both 48 and 18 — the biggest such number is their <span class="term">greatest common divisor</span>, gcd(48, 18) = 6.</p>
<p>How to find it without listing divisors? A 2300-year-old observation: <b>any tile that fits both 48 and 18 also fits their difference</b> — and their remainder. So gcd(48, 18) = gcd(18, 48 mod 18) = gcd(18, 12). Repeat: gcd(12, 6), then gcd(6, 0) = 6. Done. That cascade is <span class="term">Euclid's algorithm</span> — likely the oldest algorithm still in production.</p>
<div class="callout amber"><p><b>Trace it below</b> with your own numbers. Watch how fast the numbers collapse — try 610 and 987 (neighboring Fibonacci numbers, Euclid's worst case) and it still takes only a dozen steps.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `The biggest square tile for a 48 × 18 floor has side…`,
          options: [
            { t: '6 — the greatest number dividing both 48 and 18', ok: true, why: 'The tile side must divide both dimensions exactly; the largest such divisor is gcd(48, 18) = 6. (48 = 6·8, 18 = 6·3 — an 8×3 grid of tiles.)' },
            { t: '9 — half of 18', ok: false, why: '9 divides 18 but not 48 (48/9 = 5.33…) — the tiles would need cutting along one wall. BOTH dimensions must cooperate.' },
            { t: '2 — play it safe with small tiles', ok: false, why: '2 works (it is a common divisor) but 6 also works and is bigger. gcd asks for the GREATEST, not the safest.' }
          ],
          hints: ['The side must divide 48 AND divide 18.', 'Common divisors of both: 1, 2, 3, 6. Which is greatest?']
        },
        {
          type: 'mcq',
          prompt: `Euclid's key insight: gcd(48, 18) equals…`,
          options: [
            { t: 'gcd(18, 12) — swap in the remainder of 48 ÷ 18', ok: true, why: 'Any common divisor of 48 and 18 also divides 48 − 2·18 = 12, and vice versa — so the PAIR (18, 12) has exactly the same common divisors. Shrink the problem, keep the answer.' },
            { t: 'gcd(24, 9) — halve both numbers', ok: false, mis: 'halving-preserves-gcd', why: 'Halving changes the answer when the gcd has factors of 2: gcd(48,18) = 6 but gcd(24,9) = 3. The remainder move is the one that provably preserves the gcd.' },
            { t: 'gcd(47, 17) — decrement both', ok: false, why: 'gcd(47,17) = 1 (both prime-ish) ≠ 6. Subtracting one from each destroys everything; subtracting MULTIPLES of one from the other is the legal move.' }
          ],
          hints: ['48 = 2·18 + 12. What do common divisors of 48 and 18 say about 12?', 'd | 48 and d | 18 ⟹ d | (48 − 2·18) = 12.']
        },
        {
          type: 'mcq',
          prompt: `The cascade stops at gcd(6, 0). Why is gcd(6, 0) = 6?`,
          options: [
            { t: 'Every number divides 0, so the constraint is only "divide 6" — and 6 wins', ok: true, why: '0 = 6·0, so 6 | 0 ✓ (and d | 0 for every d). The pair’s common divisors are just 6’s divisors; the greatest is 6 itself. This is the algorithm’s base case.' },
            { t: 'Convention — someone had to pick a value', ok: false, mis: 'convention-dodge', why: 'It follows from the definition of divisibility, no convention needed: d | 0 holds for all d (0 = d·0), like the vacuous truths of Track 1 — the empty constraint constrains nothing.' },
            { t: 'It is actually undefined, like dividing by zero', ok: false, why: 'No division by zero occurs — divisibility of zero is perfectly defined (everything divides it). gcd(0,0) is the genuinely awkward one; gcd(n,0) = n is solid.' }
          ],
          hints: ['Does 6 divide 0? Is there a k with 0 = 6·k?', 'k = 0 works. So what limits the common divisors of (6, 0)?'],
          edge: 'gcd(a, 0) = a is the recursion’s base case — remove it and Euclid never terminates. Node 1.7’s missing-base failure, in ancient Greek.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Divisibility, formally</h4>
<p>d | a ("d divides a") means a = d·k for some integer k. Facts worth owning: d | a and d | b ⟹ d | (a + b) and d | (a − b) and d | (a·anything ± b·anything) — divisors of two numbers divide every integer combination of them.</p>
<h4>The theorem behind Euclid</h4>
<pre><code>gcd(a, b) = gcd(b, a mod b),   gcd(a, 0) = a</code></pre>
<p><b>Proof sketch:</b> write a = qb + r (so r = a mod b). Any d dividing a and b divides r = a − qb (integer combination). Any d dividing b and r divides a = qb + r. Same common-divisor set both sides ⟹ same greatest one. ∎ — a two-line direct proof (1.4) powering a 2300-year-old algorithm.</p>
<h4>Why it is fast</h4>
<p>Each step at least <em>halves</em> something: r &lt; b always, and after two steps the larger number drops below half. So Euclid runs in <b>O(log min(a,b))</b> steps — gcd of two 100-digit numbers in a few hundred steps. (Worst case: consecutive Fibonacci numbers, where quotients are all 1.)</p>
<p><span class="term">Coprime</span> (gcd = 1) numbers share no factor — the condition RSA key generation checks constantly, and the exact sense in which a fraction is "fully reduced": a/b in lowest terms means gcd(a,b) = 1.</p>`,
      questions: [
        {
          type: 'order',
          prompt: `Trace Euclid on gcd(48, 18) — arrange the steps.`,
          steps: [
            '48 = 2·18 + 12, so gcd(48,18) = gcd(18,12)',
            '18 = 1·12 + 6, so gcd(18,12) = gcd(12,6)',
            '12 = 2·6 + 0, so gcd(12,6) = gcd(6,0)',
            'gcd(6, 0) = 6 — the last nonzero remainder wins'
          ],
          hints: ['Each step divides the larger by the smaller and keeps the remainder.', 'The remainders shrink: 12, then 6, then 0.', 'The answer is the last remainder BEFORE zero.'],
          why: 'Divide, keep remainder, repeat until 0 — the gcd is the final nonzero remainder. Same cascade for any pair.'
        },
        {
          type: 'input',
          prompt: `gcd(21, 14) = ?`,
          accept: ['7'],
          placeholder: '…',
          hints: ['21 = 1·14 + 7.', 'Then gcd(14, 7): does 7 divide 14?'],
          why: 'gcd(21,14) = gcd(14,7) = gcd(7,0) = 7. Two steps — remainders collapse fast.'
        },
        {
          type: 'mcq',
          prompt: `In the proof of gcd(a,b) = gcd(b, a mod b), why does d | a and d | b imply d | r?`,
          options: [
            { t: 'r = a − qb is an integer combination of a and b, and d divides those', ok: true, why: 'd | a and d | b gives d | (a − qb) by the combination rule — and a − qb is exactly the remainder. Both pairs share ALL common divisors, hence the same greatest one.' },
            { t: 'Because r is smaller than b', ok: false, mis: 'size-implies-divisibility', why: 'Size says nothing about divisibility — 5 < 6 yet 6 ∤ 5… and divisors of big numbers can be big. The argument is algebraic (r is a combination), not magnitudinal.' },
            { t: 'It only holds when d is prime', ok: false, why: 'The combination rule needs no primality: a = dk, b = dm ⟹ a − qb = d(k − qm), whatever d is. Primes enter number theory later — not here.' }
          ],
          hints: ['Express r using a, q, b.', 'r = a − qb. Substitute a = dk, b = dm.'],
          edge: 'The full statement (common divisors of (a,b) = common divisors of (b,r)) is stronger than needed — Euclid preserves the entire divisor SET, not just its maximum.'
        },
        {
          type: 'mcq',
          prompt: `Which pair is <b>coprime</b>?`,
          options: [
            { t: '8 and 15', ok: true, why: '8 = 2³, 15 = 3·5 — disjoint prime inventories, gcd = 1. Coprimality is "no shared prime", checked instantly by factoring small numbers or by Euclid for large ones.' },
            { t: '8 and 12', ok: false, why: 'Both even — gcd is at least 2 (it is 4). One shared factor disqualifies.' },
            { t: '15 and 25', ok: false, why: 'Both multiples of 5: gcd = 5. Ending in 5 or 0 is the giveaway.' }
          ],
          hints: ['Coprime = gcd 1 = no common prime factor.', 'Factor each pair and compare inventories.'],
          edge: 'Two random integers are coprime with probability 6/π² ≈ 61% — one of math’s strangest cameos of π, and why gcd-based algorithms rarely get unlucky.'
        },
        {
          type: 'mcq',
          prompt: `Why does Euclid finish in O(log) steps rather than O(a) steps?`,
          options: [
            { t: 'Every two steps, the larger number at least halves — remainders shrink geometrically', ok: true, why: 'r < b always; and one can show a mod b < a/2 whenever b ≤ a/2, or the next step forces it. Geometric shrinkage = logarithmic step count, the same "halving = log" law as binary search (2.4).' },
            { t: 'Because subtraction is fast on CPUs', ok: false, mis: 'hardware-vs-structure', why: 'Speed per step is constants; the CLAIM is about the number of steps. The subtraction-only variant of Euclid (no mod) genuinely takes O(a) steps — mod’s bulk-subtraction is the log.' },
            { t: 'It doesn’t — gcd of big numbers is slow', ok: false, why: 'gcd of two 617-digit RSA-sized numbers takes ~3000 remainder steps — microseconds. Euclid at cryptographic scale is daily infrastructure, and the log is why.' }
          ],
          hints: ['Compare a mod b with a/2 in the two cases b ≤ a/2 and b > a/2.', 'Either r < b ≤ a/2, or r = a − b < a/2. Both halve.'],
          edge: 'Fibonacci pairs are the exact worst case (every quotient is 1) — the connection between 2.3’s sequence and 2.7’s algorithm runs deep enough to have theorems.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Euclid in four lines</h4>
<pre><code>function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
// or the loop:  while (b) [a, b] = [b, a % b];  return a;</code></pre>
<p>Base case (b === 0), self-call on a smaller pair, termination by strong induction on b — node 1.7's whole checklist in one expression.</p>
<h4>Where it runs</h4>
<ul>
  <li><b>Reducing fractions:</b> a/b in lowest terms = (a/g)/(b/g) with g = gcd(a,b). Rational-number libraries call gcd on every operation.</li>
  <li><b>Aspect ratios:</b> 1920×1080 → divide by gcd 120 → 16:9.</li>
  <li><b>Crypto:</b> RSA picks e coprime to φ(n) — checked with Euclid; the extended version computes the private key itself.</li>
  <li><b>lcm without overflow:</b> lcm(a,b) = a / gcd(a,b) * b — divide FIRST, or the product overflows before the division saves you.</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `<code>gcd(b, a % b)</code> recursion, termination argument. Which node-1.7 pattern certifies it?`,
          options: [
            { t: 'Strong induction: the second argument strictly decreases (r < b) toward the base b === 0', ok: true, why: 'Each call’s new second argument a % b is strictly below the old b and nonnegative — a decreasing sequence of naturals must hit 0. Base catches it. Recursion correctness = induction, always.' },
            { t: 'It might not terminate for coprime inputs', ok: false, why: 'Coprime pairs terminate at gcd(1, 0) = 1 like any others — reaching 1 then 0 IS the coprime signature, not a hang.' },
            { t: 'The call stack limit terminates it', ok: false, mis: 'crash-as-termination', why: 'O(log min(a,b)) depth never threatens the stack (64-bit inputs: ~90 frames max). The math terminates it; the stack never gets a vote.' }
          ],
          hints: ['What strictly decreases across calls, and where must it land?', 'a % b < b, and naturals can’t decrease forever.'],
          edge: 'A strictly-decreasing natural measure is THE standard termination proof for loops and recursions — compilers for verified languages demand exactly this argument.'
        },
        {
          type: 'input',
          prompt: `Reduce the aspect ratio 1920 : 1080 to lowest terms. Enter the two numbers separated by a colon, like "a:b".`,
          accept: ['16:9', '16 : 9'],
          placeholder: 'a:b',
          hints: ['Divide both by gcd(1920, 1080).', 'gcd(1920,1080): 1920 = 1·1080 + 840; 1080 = 1·840 + 240; 840 = 3·240 + 120; 240 = 2·120 + 0.', 'gcd = 120. Divide both sides by it.'],
          why: 'gcd(1920, 1080) = 120, and 1920/120 : 1080/120 = 16 : 9. Every "reduce this ratio" in graphics code is a gcd call.'
        },
        {
          type: 'mcq',
          prompt: `Why is <code>lcm = a / gcd(a,b) * b</code> written with the division FIRST?`,
          options: [
            { t: 'a·b might overflow before a later division could rescue it; a/gcd is exact and small', ok: true, why: 'gcd divides a exactly, so a/gcd(a,b) is a clean integer; multiplying it by b stays within a factor of the answer. a*b/gcd computes the huge product first — overflow with a correct formula. Order of operations is a correctness issue in integer arithmetic.' },
            { t: 'Division is faster than multiplication', ok: false, mis: 'perf-explains-semantics', why: 'Both are single instructions — the reordering is about staying inside the integer range, not speed.' },
            { t: 'It rounds more accurately', ok: false, why: 'No rounding exists here — everything is exact integer math BECAUSE gcd | a. The hazard is overflow, not precision.' }
          ],
          hints: ['Try a = b = 10¹⁰ with 64-bit integers: what is a·b?', '10²⁰ overflows int64 (~9.2×10¹⁸); a/gcd·b = 10¹⁰ does not.'],
          edge: 'The bug pattern generalizes: with integers, restructure formulas so intermediate values stay small — mathematically-equal is not computationally-equal.'
        }
      ]
    }
  }
};

/* ============ 2.8 MODULAR ARITHMETIC ============ */
window.NODES['disc.modular'] = {
  id: 'disc.modular', num: '2.8', trackId: 'discrete',
  title: 'Modular Arithmetic',
  minutes: 35,
  payoff: 'hashing · cyclic buffers · RSA teaser',
  levels: {

    l1: {
      html: `
<h4>Clock arithmetic</h4>
<p>It's 10 o'clock; a meeting runs 5 hours. It ends at 3 — because clocks live on a circle where 12 wraps to 0. That wraparound is <span class="term">mod</span>: 10 + 5 = 15, and 15 <b>mod</b> 12 = 3. "a mod m" = the remainder when a is divided by m — always in {0, 1, …, m−1}.</p>
<p>Numbers that land on the same clock position are interchangeable for clock purposes: 15, 27, and 3 are all "3 o'clock". We say 15 ≡ 3 (mod 12) — <span class="term">congruent</span>. Congruence-mod-m is the "same remainder" relation — the very equivalence relation from node 1.6, with its m classes carving up all of ℤ.</p>
<div class="callout amber"><p><b>The liberating fact:</b> you may reduce mod m at ANY point in a calculation — before adding, after multiplying, whenever. The wheel doesn't care how many full turns you took to get somewhere; only where you stopped.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A 12-hour clock reads 10. What does it read 5 hours later — and as a mod expression?`,
          options: [
            { t: '3 — (10 + 5) mod 12 = 3', ok: true, why: '15 wraps past 12 to 3. Mod is exactly "position after wraparound".' },
            { t: '15 — clocks just keep counting', ok: false, why: 'No clock face has a 15 — the circle forces every count into {0..11} (or 1..12 on the dial). The wrap is the whole point.' },
            { t: '5 — start over after 12', ok: false, mis: 'wrap-miscount', why: 'Starting over is right, but count carefully: 10→11→12(=0)→1→2→3. The remainder of 15 ÷ 12 is 3, not 5.' }
          ],
          hints: ['Add, then subtract full turns of 12.', '15 − 12 = 3.']
        },
        {
          type: 'mcq',
          prompt: `Which numbers are all congruent mod 12?`,
          options: [
            { t: '3, 15, 27 — each is 3 plus full turns of 12', ok: true, why: 'All leave remainder 3: same clock position, same equivalence class. Congruence ignores full revolutions.' },
            { t: '3, 13, 23 — climbing by tens', ok: false, why: 'Their remainders mod 12 are 3, 1, 11 — three different positions. Congruence needs steps of exactly the modulus.' },
            { t: '12, 24, 30', ok: false, why: '12 and 24 are both ≡ 0, but 30 mod 12 = 6 — one outsider breaks the class.' }
          ],
          hints: ['Compute each number mod 12.', 'Same remainder = same class.']
        },
        {
          type: 'mcq',
          prompt: `You need the last digit of 7 × 8 × 9 × 3. The lazy-but-legal way:`,
          options: [
            { t: 'Reduce mod 10 as you go: 7·8=56→6, 6·9=54→4, 4·3=12→2', ok: true, why: 'Last digit = value mod 10, and mod commutes with × and + — reduce early, reduce often, the answer survives. (Check: 1512 ends in 2 ✓.)' },
            { t: 'Multiply it all out first — reducing early changes the answer', ok: false, mis: 'reduce-late-only', why: 'The fear is natural and wrong: (a·b) mod m = ((a mod m)·(b mod m)) mod m, provably. Early reduction is why computers can work with numbers mod p without ever holding the giant true values.' },
            { t: 'Impossible without computing the full product', ok: false, why: 'The full product is 1512, and its last digit was already forced by the last digits of the factors — mod 10 information stays mod 10.' }
          ],
          hints: ['Does the last digit of a product depend on anything beyond the last digits of the factors?', 'Try 17 × 23 vs 7 × 3 — compare last digits.'],
          edge: 'This "reduce anytime" law scaled up is how RSA computes 65537-th powers of 600-digit numbers without ever leaving 600 digits.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Congruence, formally</h4>
<p>a ≡ b (mod m) ⟺ m | (a − b) ⟺ a and b leave the same remainder on division by m. It is an equivalence relation (reflexive, symmetric, transitive — check them, they're one-liners), and its m classes {[0], [1], …, [m−1]} form the number system <b>ℤ/mℤ</b> — arithmetic on the classes themselves.</p>
<h4>The compatibility laws</h4>
<pre><code>(a + b) mod m = ((a mod m) + (b mod m)) mod m
(a · b) mod m = ((a mod m) · (b mod m)) mod m</code></pre>
<p>Addition and multiplication respect the classes — which is what LICENSES reduce-as-you-go. Division does <b>not</b> in general: 10 ≡ 4 (mod 6) but 5 ≢ 2 (mod 6). (Division mod m needs coprimality — where 2.7 re-enters.)</p>
<h4>Powers cycle</h4>
<p>Powers of 7 mod 10: 7, 9, 3, 1, 7, 9, 3, 1, … — period 4. With only m possible values, pigeonhole (2.1!) forces every power sequence mod m into a cycle. So 7¹⁰⁰ mod 10 = 7^(100 mod 4 → the cycle position) — huge exponents collapse to cycle bookkeeping. This is how "fast modular exponentiation" and RSA's whole arithmetic breathe.</p>`,
      questions: [
        {
          type: 'input',
          prompt: `17 mod 5 = ?`,
          accept: ['2'],
          placeholder: '…',
          hints: ['How many full 5s fit in 17, and what is left?', '17 = 3·5 + 2.'],
          why: '17 = 3·5 + 2, remainder 2. The remainder is always in {0,…,m−1}.'
        },
        {
          type: 'mcq',
          prompt: `Is 38 ≡ 14 (mod 12)?`,
          options: [
            { t: 'Yes — both leave remainder 2, and 12 | (38 − 14) = 24', ok: true, why: 'Two equivalent checks, one answer: same remainder (2 and 2), and the difference 24 is a multiple of 12. Use whichever is cheaper.' },
            { t: 'No — 38 and 14 are different numbers', ok: false, mis: 'equality-vs-congruence', why: 'Congruence deliberately forgets full turns — it asks about POSITION, not identity. Different numbers, same class: that is the entire point of the notation ≡.' },
            { t: 'No — 38 mod 12 = 4', ok: false, why: 'Recount: 38 = 3·12 + 2. (36 is the nearest multiple below, not 34.) Remainder 2, matching 14 = 1·12 + 2.' }
          ],
          hints: ['Reduce both mod 12, or check whether 12 divides their difference.', '38 − 14 = 24 = 2·12.']
        },
        {
          type: 'mcq',
          prompt: `Why is congruence mod m an equivalence relation on ℤ?`,
          options: [
            { t: 'Same-remainder is reflexive, symmetric, transitive — a "same-X" relation like those in 1.6', ok: true, why: 'a has a’s remainder (reflexive); sharing is mutual (symmetric); sharing chains (transitive). Its classes are the m clock positions — the partition that BECOMES the number system ℤ/mℤ.' },
            { t: 'Because mod is a function', ok: false, why: 'Functions abound that induce nothing interesting — the equivalence comes from comparing OUTPUTS of the mod function ("same image under f" is always an equivalence relation — that is the 1.6 pattern at work).' },
            { t: 'It isn’t — 15 ≡ 3 but 15 ≠ 3 breaks reflexivity', ok: false, mis: 'equality-vs-congruence', why: 'Reflexivity asks a ≡ a, which holds trivially. Equivalence relations are precisely the ones ALLOWED to relate unequal things — that is their job description.' }
          ],
          hints: ['Test the three properties from 1.6 on "same remainder mod m".', 'All three are inherited from equality of the remainders.'],
          edge: 'General factory: for ANY function f, "f(a) = f(b)" is an equivalence relation. Congruence is the f = remainder instance; "same hash bucket" is another (see L3).'
        },
        {
          type: 'mcq',
          prompt: `Powers of 7 mod 10 run 7, 9, 3, 1, 7, 9, 3, 1, … What is the last digit of 7¹⁰⁰?`,
          options: [
            { t: '1 — the cycle has period 4, and 100 mod 4 = 0 lands on the 4th position', ok: true, why: '7¹, 7², 7³, 7⁴ end in 7, 9, 3, 1 and then repeat. Exponent 100 = 4·25 exactly — position 4 of the cycle: digit 1. An astronomically large power, answered by remainder bookkeeping.' },
            { t: '7 — powers of 7 end in 7', ok: false, mis: 'cycle-blind', why: 'Only exponents ≡ 1 (mod 4) end in 7 (7¹, 7⁵, 7⁹…). The cycle has four stops; identify which stop 100 is.' },
            { t: 'Unknowable without computing 7¹⁰⁰', ok: false, why: '7¹⁰⁰ has 85 digits and its last one was decided by a 4-cycle. Mod turns impossible computations into clock positions.' }
          ],
          hints: ['List the last digits of 7¹ through 7⁵ — find the period.', 'Period 4. Where in the cycle does exponent 100 fall?', '100 is a multiple of 4 → same position as 7⁴.'],
          edge: 'Why cycles are guaranteed: only m values exist mod m, so pigeonhole forces a repeat within m steps — 2.1 proving a fact about 2.8.'
        },
        {
          type: 'mcq',
          prompt: `10 ≡ 4 (mod 6). Dividing both by 2 gives 5 ≡ 2 (mod 6) — which is FALSE. What went wrong?`,
          options: [
            { t: 'Nothing "went wrong" mechanically — division simply is not a legal congruence operation in general', ok: true, why: '+ and × respect classes; ÷ does not (2 shares a factor with the modulus 6). Cancelling k is only safe when gcd(k, m) = 1 — coprimality (2.7) is the exact license. Know which operations your equivalence survives.' },
            { t: 'The arithmetic was botched — 10/2 is not 5', ok: false, why: 'The plain arithmetic is fine; the RULE being applied does not exist. Congruence is not equality, and inherits only the operations proven compatible.' },
            { t: 'Mod 6 is broken; prime moduli would fix everything', ok: false, mis: 'overcorrection', why: 'Half right: mod a prime p, every nonzero element IS cancellable (all are coprime to p) — which is why crypto lives mod primes. But mod 6 is not broken; it just has non-invertible elements (2, 3, 4).' }
          ],
          hints: ['Which operations did the compatibility laws actually cover?', 'What is gcd(2, 6), and why might that matter for cancelling 2?'],
          edge: 'The elements you CAN divide by mod m are exactly those coprime to m — the bridge from 2.7 to modern cryptography in one sentence.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>The % trap every JS/C/Java programmer hits once</h4>
<pre><code>-7 % 12        // JS: -7   ← remainder operator, keeps the sign!
((x % m) + m) % m   // the mathematical mod: always 0..m−1
// (Python's % already behaves mathematically: -7 % 12 == 5)</code></pre>
<p>Ring-buffer indices, calendar math, and hash buckets all break on negative inputs until this idiom appears. It is likely the most-reinvented five tokens in programming.</p>
<h4>Mod as infrastructure</h4>
<pre><code>bucket  = hash(key) % NUM_BUCKETS;      // hash tables: classes as bins
next    = (i + 1) % capacity;           // ring buffer: the clock as memory layout
sharded = userId % NUM_SHARDS;          // load distribution
checksum: sum of digits mod 9 — why "casting out nines" detects typos</code></pre>
<p>Every one of these is the 1.6/2.8 equivalence partition doing labor: mod m sorts the infinite integers into m operational bins, and the compatibility laws guarantee the bins behave arithmetically.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `In JavaScript, <code>-7 % 12</code> evaluates to…`,
          options: [
            { t: '-7 — the % operator keeps the dividend’s sign; use ((x % m) + m) % m for true mod', ok: true, why: 'JS/C/Java define % as remainder-toward-zero. Math’s mod always lands in 0..m−1 — the double-mod idiom restores it. A ring buffer stepping backwards without this reads index −1.' },
            { t: '5 — mod always lands in 0..11', ok: false, mis: 'math-mod-assumed', why: 'That is the MATHEMATICAL answer (and Python’s) — precisely why the JS behavior is a trap: your math intuition is correct and your runtime disagrees.' },
            { t: 'NaN — negative modulus is undefined', ok: false, why: 'Perfectly defined, just surprisingly signed. NaN would at least be loud; −7 fails silently inside an array index.' }
          ],
          hints: ['JS % is "remainder", not "mod" — what sign does it inherit?', 'The dividend’s. So -7 % 12 keeps the minus.'],
          edge: 'Audit trigger: any % on a value that could go negative (deltas, offsets, i−1) needs the ((x%m)+m)%m armor — or a language whose % is already mathematical.'
        },
        {
          type: 'mcq',
          prompt: `A hash table computes <code>bucket = hash(key) % 16</code>. In this node's language, the buckets are…`,
          options: [
            { t: 'The 16 congruence classes of hash values mod 16 — an equivalence partition as a data structure', ok: true, why: 'Keys with congruent hashes share a bin: "same remainder" (1.6/2.8) built in silicon. Compatibility of mod is why resizing to 32 buckets re-partitions cleanly.' },
            { t: 'Random assignments that happen to balance', ok: false, why: 'Nothing random after hashing: the class function is deterministic — the same key ALWAYS lands in the same bin, which is the entire retrieval contract.' },
            { t: 'A lossy compression of the keys', ok: false, mis: 'partition-vs-compression', why: 'Half-truth: information IS lost (many keys per bin — pigeonhole), but the structure is the partition. "Which class" is retained perfectly; "which member" is what the in-bucket search recovers.' }
          ],
          hints: ['What relation holds between two keys in the same bucket?', 'hash(k₁) ≡ hash(k₂) (mod 16) — name that relation.'],
          edge: 'Power-of-two bucket counts let % become bitwise AND: h % 16 === h & 15 — congruence classes computed in one cycle.'
        },
        {
          type: 'mcq',
          prompt: `A ring buffer of capacity 8 advances with <code>i = (i + 1) % 8</code>. After index 7, the next write lands at…`,
          options: [
            { t: '0 — the mod wraps the index; the buffer is a clock', ok: true, why: '(7+1) % 8 = 0: oldest slot gets overwritten, the arithmetic IS the eviction policy. Fixed memory, infinite stream — courtesy of ℤ/8ℤ.' },
            { t: '8 — buffers grow as needed', ok: false, why: 'A RING buffer never grows — bounded memory is its contract (audio buffers, log rings). Index 8 would be out of bounds; the mod exists to make 8 impossible.' },
            { t: '7 — it stays at the end when full', ok: false, why: 'Sticking at the end would stop recording. The wrap keeps the newest data flowing over the oldest — exactly clock hands passing 12.' }
          ],
          hints: ['Compute (7 + 1) % 8.', 'Where does a clock hand go after the top?'],
          edge: 'Reading the last k items means indices (i − k + j) % 8 for j = 1..k — negative-capable arithmetic, so the JS % trap from question 1 strikes exactly here.'
        }
      ]
    }
  }
};

/* ============ BOSS: ROUTE THE NETWORK (LATTICE) ============ */
window.NODES['boss.lattice'] = {
  id: 'boss.lattice', num: '2.B', trackId: 'discrete', boss: true,
  title: 'BOSS — Route the Network',
  minutes: 25,
  payoff: 'Lattice comes online',
  intro: `
<h4>System integration test</h4>
<p>The Lattice waits — the machine's data and network layer. Five integration checks cross-wire everything Track 2 built: counting state spaces, pricing algorithms, solving recurrences, certifying networks, and wrapping the arithmetic around a ring.</p>
<div class="callout amber"><p><b>Boss rules:</b> five challenges, pass four. Hints cost more here. Fail, and the machine names the unstable subsystem — review it and return.</p></div>`,
  levels: {
    boss: {
      passNeed: 4,
      questions: [
        {
          type: 'input',
          prompt: `<b>Integration 1 — the wiring bill.</b><br>A cluster of 8 servers must be FULLY meshed — every pair directly cabled. How many cables?`,
          accept: ['28'],
          placeholder: '…',
          hints: ['Every pair, once — order irrelevant.', 'C(8,2) = 8·7/2.'],
          why: 'C(8,2) = 28 — complete-graph edges, the all-pairs count. (This quadratic cable bill is why real networks use switches, not full meshes.)',
          edge: 'Doubling the servers roughly quadruples the cables: C(16,2) = 120. The n² shadow falls over every "connect everything" design.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 2 — feasibility triage.</b><br>Duplicate-detection by comparing all pairs, at ~10⁸ comparisons/second. Verdicts for n = 10⁴ and n = 10⁷?`,
          options: [
            { t: 'n = 10⁴: ~5×10⁷ pairs, sub-second ✓. n = 10⁷: ~5×10¹³ pairs, days ✗ — change algorithm', ok: true, why: 'C(n,2) ≈ n²/2. The same code is fine and hopeless at different scales — big-O triage BEFORE optimizing constants. (The fix is a hash set: O(n).)' },
            { t: 'Both fine — computers are fast', ok: false, mis: 'constant-fixation', why: '5×10¹³ comparisons at 10⁸/s is ~6 days. Speed multiplies constants; it never forgives a squared n at 10⁷.' },
            { t: 'Both hopeless — quadratic means never', ok: false, why: 'Quadratic at n = 10⁴ is 50M ops — half a second. Classes tell you WHERE the wall is, not that everything is a wall. Compute the number.' }
          ],
          hints: ['Count the pairs in each case: n²/2.', '10⁸/2·10⁸… careful: (10⁴)²/2 = 5×10⁷; (10⁷)²/2 = 5×10¹³.', 'Divide each by 10⁸ ops/sec.']
        },
        {
          type: 'order',
          prompt: `<b>Integration 3 — price the divide &amp; conquer.</b><br>Derive the cost of T(n) = 2T(n/2) + n. Arrange the argument.`,
          steps: [
            'One level of the call tree: 2 calls of size n/2, plus n merge work at the top',
            'Each level’s total work is n — twice as many calls, each half the size, products conserved',
            'Halving reaches the base case after log₂ n levels',
            'Total: n work per level × log₂ n levels = O(n log n)'
          ],
          hints: ['Account level by level, not call by call.', 'What is the SUM of work across one whole level?', 'n per level; count the levels via repeated halving.'],
          why: 'The level-accounting argument — mergesort’s price tag derived, not memorized. Every 2T(n/2)+n recurrence pays it.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 4 — audit the topology report.</b><br>Report: "Network of 9 routers; connection counts 4, 3, 3, 3, 2, 2, 2, 1, 1. Also, the network is a single tree." How many lies?`,
          options: [
            { t: 'One lie: Σdeg = 21 is odd — impossible for ANY graph. (A 9-vertex tree would need Σdeg = 16.)', ok: true, why: 'Handshake first: 21 is odd ⟹ no graph exists, full stop. The tree claim never even gets examined — 2|E| = Σdeg would demand |E| = 10.5. Parity kills reports before topology does.' },
            { t: 'No lies — the numbers are individually plausible', ok: false, mis: 'plausibility-vs-parity', why: 'Each degree is plausible; the SUM is impossible. Aggregate constraints (Σdeg even; trees have exactly n−1 edges) audit claims that member-by-member checks cannot touch.' },
            { t: 'Two lies — also, trees cannot contain a degree-4 vertex', ok: false, why: 'Trees happily host high-degree hubs (a star is a tree with one degree-(n−1) center). The only provable lie is the parity one — do not over-convict.' }
          ],
          hints: ['Sum the degrees. What parity must Σdeg have?', 'If it were a 9-vertex tree, |E| = 8 and Σdeg = 16 — compare.'],
          edge: 'Order of audit: parity (free), then edge-count identities, then structure. Cheap invariants first — in math and in code review.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 5 — close the ring.</b><br>A ring buffer of capacity 12 holds a telemetry stream. The write index sits at 5; a replay must step BACK 9 writes. In JS, the correct index is…`,
          options: [
            { t: '((5 − 9) % 12 + 12) % 12 = 8 — armor the negative before it touches the array', ok: true, why: '5 − 9 = −4; JS gives −4 % 12 = −4; the +12 re-mod lands at 8 — genuinely 9 slots behind 5 on a 12-clock. Modular classes plus the remainder-vs-mod trap, welded into one line.' },
            { t: '(5 − 9) % 12 = −4 — JS handles the wrap', ok: false, mis: 'math-mod-assumed', why: 'JS % keeps the sign: −4 is what actually comes back, and arr[−4] is silently undefined. The runtime does NOT share your math intuition — that is the whole trap.' },
            { t: '5 − 9 + 12 = 8, but only because 9 < 12 — the formula breaks for bigger steps', ok: false, why: 'The single +12 rescue works here by luck of magnitude; stepping back 25 would need +24. The double-mod idiom ((x%m)+m)%m works for EVERY step size — armor beats arithmetic-by-cases.' }
          ],
          hints: ['Compute 5 − 9, then ask what JS % does to a negative.', 'Wrap it with the ((x % m) + m) % m idiom and evaluate.'],
          edge: 'One expression, four nodes: equivalence classes (1.6), clock arithmetic (2.8), the remainder trap (2.8 L3), and an off-by-one-proof mindset (1.4). Integration achieved.'
        }
      ]
    }
  }
};
