/* Track 1 content — nodes 1.3 and 1.4 */

/* ============ 1.3 PREDICATES & QUANTIFIERS ============ */
window.NODES['logic.quantifiers'] = {
  id: 'logic.quantifiers', num: '1.3', trackId: 'logic',
  title: 'Predicates & Quantifiers',
  minutes: 35,
  payoff: 'every()/some() · SQL WHERE · loop invariants',
  levels: {

    l1: {
      html: `
<h4>Statements with a blank</h4>
<p>"x + 1 = 5" refused to be a proposition in node 1.1 — its truth depends on x. Such a statement-with-a-blank is a <span class="term">predicate</span>: a machine P(x) that becomes true or false the moment you feed it a value. P(4) is true; P(7) is false.</p>
<p>There is a second way to close the blank: sweep a <span class="term">spotlight</span> across the whole collection of candidates and summarize.</p>
<ul>
  <li><b>∀ (for all)</b> — the strict sweep: "every locker in this row is closed." One open locker anywhere and the claim dies.</li>
  <li><b>∃ (there exists)</b> — the treasure hunt: "some locker contains the key." One hit anywhere and the claim lives.</li>
</ul>
<div class="callout amber"><p><b>The asymmetry to internalize:</b> disproving ∀ takes <em>one counterexample</em>. Proving ∃ takes <em>one witness</em>. Their hard directions — proving ∀, disproving ∃ — require covering the whole collection. ∀ and ∃ are mirror twins.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Claim: "<b>All</b> lockers in this row are closed." What is the cheapest way to disprove it?`,
          options: [
            { t: 'Find one open locker', ok: true, why: 'A single counterexample destroys a universal claim — that is the whole power of ∀’s strictness.' },
            { t: 'Show most lockers are open', ok: false, mis: 'majority-logic', why: 'Overkill and beside the point — "all" fails at the first exception; majorities are irrelevant to logic.' },
            { t: 'Check every locker', ok: false, why: 'Checking everything is the cost of PROVING the claim. Disproving is the cheap direction: one open locker ends it.' }
          ],
          hints: ['How many exceptions does "all" tolerate?', 'Zero exceptions allowed — so how many do you need to find?']
        },
        {
          type: 'mcq',
          prompt: `∃x P(x) means…`,
          options: [
            { t: 'At least one x makes P true', ok: true, why: 'One witness suffices — ∃ is the treasure hunt. It says nothing about how many more there might be.' },
            { t: 'Exactly one x makes P true', ok: false, mis: 'exists-unique', why: 'Tempting from everyday "there is a…" — but ∃ is satisfied by one or many. Exactly-one is a different (composite) statement, written ∃!.' },
            { t: 'Most x make P true', ok: false, why: 'Logic has no "most" quantifier in this course — only the two extremes, all and at-least-one.' }
          ],
          hints: ['∃ sets the weakest possible bar.', 'If three lockers contain a key, is "some locker contains the key" true?']
        },
        {
          type: 'mcq',
          prompt: `"Every student passed" turns out to be <b>false</b>. What do you know for sure?`,
          options: [
            { t: 'At least one student failed', ok: true, why: '¬∀ ≡ ∃¬ : the failure of "all" guarantees exactly one thing — an exception exists.' },
            { t: 'Every student failed', ok: false, mis: 'negate-all-to-none', why: 'The classic over-negation: from "not all" to "none". One failing student falsifies "every student passed" while 29 still passed.' },
            { t: 'Most students failed', ok: false, why: 'You know nothing about counts — the exception could be a single student.' }
          ],
          hints: ['What is the minimum it takes to break "every"?', 'One exception breaks it — so the negation asserts precisely that one exists.'],
          edge: 'Mirror image: "some student cheated" being false means EVERY student did not cheat. ¬∃ ≡ ∀¬.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Formalities</h4>
<p>A <span class="term">predicate</span> P(x) is a statement whose truth depends on a variable drawn from a stated <span class="term">domain</span>. Quantifiers close it into a proposition:</p>
<ul>
  <li><b>∀x P(x)</b> — P holds for every element of the domain.</li>
  <li><b>∃x P(x)</b> — P holds for at least one element.</li>
</ul>
<p><b>The domain is part of the statement.</b> ∀x (x² ≥ x) is true over ℕ but false over ℝ (try x = ½: ¼ &lt; ½). Change the domain, change the truth.</p>
<h4>Negation rules (quantifier De Morgan)</h4>
<pre><code>¬∀x P(x)  ≡  ∃x ¬P(x)     "not all"  =  "some exception"
¬∃x P(x)  ≡  ∀x ¬P(x)     "none"     =  "all fail"</code></pre>
<p>Negation walks past each quantifier, flipping it, and lands on the predicate. With nested quantifiers, apply it one layer at a time.</p>
<h4>Nesting: order is meaning</h4>
<p>∀x ∃y (y &gt; x) over ℤ: "for every integer there is a bigger one" — true, y may depend on x. <br>∃y ∀x (y &gt; x): "one integer beats them all" — false. <b>Swapping ∀∃ changes who moves first</b>: the inner quantifier gets to react to the outer one’s choice.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Over the domain ℝ, is ∀x (x² ≥ x) true?`,
          options: [
            { t: 'False — x = ½ is a counterexample', ok: true, why: '(½)² = ¼ < ½. Squaring shrinks numbers strictly between 0 and 1. (Over ℕ the claim is true — the domain is part of the statement.)' },
            { t: 'True — squaring can only grow a number', ok: false, mis: 'squares-grow', why: 'Tempting from experience with integers ≥ 1 — but between 0 and 1, multiplying by a number less than 1 shrinks. Intuition trained on one domain fails on another.' },
            { t: 'False — x = −1 is a counterexample', ok: false, mis: 'bad-counterexample', why: '(−1)² = 1 ≥ −1 ✓ — so −1 actually satisfies the predicate. A counterexample must make the predicate FALSE; always verify your counterexample before deploying it.' }
          ],
          hints: ['Test values from different regions: negative, between 0 and 1, big.', 'What does squaring do to numbers strictly between 0 and 1?', '(½)² = ¼, and ¼ ≥ ½ is false.'],
          edge: 'Domain-sensitivity is a real bug class: code assuming integer behavior (x*x >= x) breaks the day someone passes 0.3.'
        },
        {
          type: 'mcq',
          prompt: `¬∀x P(x) is equivalent to…`,
          options: [
            { t: '∃x ¬P(x)', ok: true, why: 'Negation flips the quantifier and lands on the predicate: "not all satisfy P" = "at least one violates P".' },
            { t: '∀x ¬P(x)', ok: false, mis: 'negate-all-to-none', why: 'That says every element violates P — "none", far stronger than "not all". The quantifier must flip when negation passes it.' },
            { t: '¬∃x P(x)', ok: false, why: 'That is "none satisfy P" written differently (≡ ∀x ¬P(x)) — same over-negation in disguise.' }
          ],
          hints: ['"Not all" promises only the existence of what?', 'An exception. Which quantifier asserts existence?']
        },
        {
          type: 'mcq',
          prompt: `Over ℤ, which is true?`,
          options: [
            { t: '∀x ∃y (y > x) — every integer has a bigger one', ok: true, why: 'Given any x, choose y = x + 1. The inner ∃ may answer differently for each x — that dependence is the point.' },
            { t: '∃y ∀x (y > x) — some integer beats all integers', ok: false, mis: 'quantifier-swap', why: 'This demands one fixed y that exceeds every integer — including y itself (y > y is false). Swapping ∀∃ silently changed "a bigger one each time" into "one biggest of all".' },
            { t: 'Both — the order is just style', ok: false, mis: 'order-irrelevant', why: 'Order is meaning: ∀∃ lets the witness react, ∃∀ locks it in first. One statement is true, the other false — no clearer proof that order matters.' }
          ],
          hints: ['Read left to right: who commits to a value first?', 'In ∃y ∀x, the y is fixed BEFORE all the x-challenges arrive. Can one integer beat every integer?', 'No — it would have to beat itself. But ∀x ∃y lets y = x + 1.'],
          edge: '"Every user has a password" (∀∃) vs "there is a password every user shares" (∃∀) — same words shuffled, catastrophically different security properties.'
        },
        {
          type: 'input',
          prompt: `How many counterexamples are needed to disprove a ∀-claim? (Enter a number.)`,
          accept: ['1', 'one'],
          placeholder: '…',
          hints: ['∀ tolerates zero exceptions.', 'So the first exception you find already finishes the job.'],
          why: 'One. A universal claim is a chain with no weak links allowed — one broken link condemns the chain.'
        },
        {
          type: 'order',
          prompt: `Negate ∃x ∀y P(x, y) step by step — arrange the derivation in order.`,
          steps: [
            'Start: ¬ ∃x ∀y P(x, y)',
            'Negation passes ∃, flipping it: ∀x ¬ ∀y P(x, y)',
            'Negation passes ∀, flipping it: ∀x ∃y ¬P(x, y)'
          ],
          hints: ['Negation peels quantifiers outside-in, one at a time.', 'The outermost quantifier here is ∃ — it flips first.', '¬∃ → ∀¬ first, then ¬∀ → ∃¬ inside.'],
          why: 'Mechanical and safe: ¬ walks inward, flipping each quantifier it crosses, and finally lands on P.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Quantifiers ship in the standard library</h4>
<pre><code>xs.every(x => x > 0)   // ∀x∈xs (x > 0)
xs.some(x => x > 0)    // ∃x∈xs (x > 0)</code></pre>
<p>And the negation laws are API identities you can test:</p>
<pre><code>!xs.every(p)  ===  xs.some(x => !p(x))   // ¬∀ ≡ ∃¬
!xs.some(p)   ===  xs.every(x => !p(x))  // ¬∃ ≡ ∀¬</code></pre>
<h4>The empty-collection rule</h4>
<p><code>[].every(p)</code> is <code>true</code> — for <em>any</em> p. A universal claim over nothing has no chance to fail: this is <span class="term">vacuous truth</span>, and it is the mathematically correct convention, not a JS quirk. Dually, <code>[].some(p)</code> is <code>false</code>: no elements, no witness.</p>
<div class="callout"><p><b>Where it bites:</b> "all validations passed" on a form with zero validation rules is true — the code proceeds. Usually right! But if an empty rule set means a config bug, you must check <code>rules.length > 0</code> separately. The math will not do it for you.</p></div>
<p>SQL speaks predicate logic too: <code>WHERE</code> is a predicate, and "which rows satisfy P" is set-builder notation in production. Nested quantifiers appear as <code>EXISTS</code> subqueries.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `What does <code>[].every(x =&gt; x &gt; 9000)</code> return?`,
          options: [
            { t: '<code>true</code> — a ∀ over nothing cannot fail', ok: true, why: 'Vacuous truth: every() returns false only on finding a counterexample, and an empty array has none to offer.' },
            { t: '<code>false</code> — no element is > 9000', ok: false, mis: 'empty-fails', why: 'Tempting — "nothing passed the test!" But every() does not seek passers; it seeks FAILERS, and found none. "All my dragons breathe fire" is true for a dragon-less person.' },
            { t: 'It throws — nothing to test', ok: false, why: 'Perfectly defined, no error. The empty case is the convention working exactly as mathematics specifies.' }
          ],
          hints: ['every() returns false only when it finds a counterexample.', 'How many counterexamples can an empty array contain?'],
          edge: 'Dually [].some(p) is false. Remember the pair: empty-∀ true, empty-∃ false.'
        },
        {
          type: 'mcq',
          prompt: `Which expression is equivalent to <code>!users.every(u =&gt; u.verified)</code>?`,
          options: [
            { t: '<code>users.some(u => !u.verified)</code>', ok: true, why: '¬∀ ≡ ∃¬ : "not all verified" = "at least one unverified". Bonus: some() short-circuits at the first unverified user.' },
            { t: '<code>users.some(u => u.verified)</code>', ok: false, mis: 'negation-lost', why: 'The ! must land on the predicate as it flips the quantifier. This says "someone IS verified" — nearly unrelated to the original.' },
            { t: '<code>!users.some(u => u.verified)</code>', ok: false, mis: 'negate-all-to-none', why: 'This is "nobody is verified" — the over-negation again, now in code. "Not all" must not become "none".' }
          ],
          hints: ['Apply ¬∀ ≡ ∃¬ mechanically.', 'Flip every→some AND negate the inner predicate — both, not one.'],
          edge: 'The rewrite is also a performance win: it can return at the first counterexample instead of materializing the whole check.'
        },
        {
          type: 'mcq',
          prompt: `Servers <code>xs</code>, backups <code>ys</code>. What does this check?<br><code>xs.every(x =&gt; ys.some(y =&gt; y.covers(x)))</code>`,
          options: [
            { t: 'Every server has at least one backup covering it', ok: true, why: '∀x ∃y — the inner some() runs fresh for each server, so different servers may be covered by different backups.' },
            { t: 'One backup covers all servers', ok: false, mis: 'quantifier-swap', why: 'That is ∃y ∀x — ys.some(y => xs.every(x => y.covers(x))) — with the loops inverted. This code lets each server find its own backup; that one demands a single hero.' },
            { t: 'Every backup covers every server', ok: false, why: 'That would be every() nested in every() — ∀∀, the strictest of the four combinations.' }
          ],
          hints: ['Translate outside-in: every = ∀, some = ∃.', '∀ server, ∃ backup: who gets to depend on whom?', 'The inner quantifier can react to each x — that is ∀∃.'],
          edge: 'The four nestings every/some × every/some are four genuinely different system guarantees. Nested loops are nested quantifiers.'
        }
      ]
    }
  }
};

/* ============ 1.4 IMPLICATION & PROOF TECHNIQUES ============ */
window.NODES['logic.implication'] = {
  id: 'logic.implication', num: '1.4', trackId: 'logic',
  title: 'Implication & Proof Techniques',
  minutes: 40,
  payoff: 'contracts & guard clauses · proving code correct',
  levels: {

    l1: {
      html: `
<h4>An implication is a promise</h4>
<p>"<b>If</b> it rains, <b>then</b> I bring an umbrella" — written p → q. When is the promise <em>broken</em>? Only in one scenario: it rains and I show up without an umbrella. Every other day, the promise survives:</p>
<ul>
  <li>Rain + umbrella — kept, obviously.</li>
  <li>No rain + umbrella — kept. (I promised nothing about dry days; carrying one anyway is allowed.)</li>
  <li>No rain + no umbrella — kept. Nothing was triggered.</li>
</ul>
<p>So p → q is false <em>only</em> when p is true and q is false. A promise about rain simply cannot be broken on a sunny day — logicians say it holds <span class="term">vacuously</span>.</p>
<h4>The detective’s move</h4>
<p>Suppose the promise holds, and you spot me without an umbrella. Conclusion: it is not raining. That reversal — "no umbrella, therefore no rain" — is the <span class="term">contrapositive</span> (¬q → ¬p), and it is <em>perfectly equivalent</em> to the original promise. Detectives, debuggers, and mathematicians live on this move.</p>
<div class="callout amber"><p><b>Warning label:</b> the reversal that does NOT work is "umbrella, therefore rain" — I may carry one for style. Confusing a promise with its converse is the single most common logic error in the wild.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `"If it rains, I bring an umbrella." Which single scenario <b>breaks</b> the promise?`,
          options: [
            { t: 'Rain, and no umbrella', ok: true, why: 'The only failure row: the condition fired and the promised outcome did not. p → q is false exactly when p = T, q = F.' },
            { t: 'No rain, and an umbrella anyway', ok: false, mis: 'converse-confusion', why: 'Nothing was promised about dry days — carrying an umbrella for fun violates nothing.' },
            { t: 'No rain, and no umbrella', ok: false, why: 'The condition never fired; an untriggered promise cannot break.' }
          ],
          hints: ['A promise breaks only when its condition fires and its outcome fails.', 'Which row has the "if" part true and the "then" part false?']
        },
        {
          type: 'mcq',
          prompt: `Sunny all day; I never brought an umbrella. The promise "if it rains, I bring an umbrella" is…`,
          options: [
            { t: 'Kept — it was never put to the test', ok: true, why: 'F → F is true. An implication whose condition never fires holds vacuously — annoying to intuition, indispensable to mathematics.' },
            { t: 'Broken — no umbrella appeared', ok: false, mis: 'consequent-required', why: 'The promise obligates me only WHEN it rains. Reading p → q as "q must happen" ignores the whole "if".' },
            { t: 'Neither — it does not apply today', ok: false, mis: 'implication-undefined', why: 'Tempting, and some philosophers agree! But propositions get exactly two values, so logic assigns one: true. The convention that makes "all my dragons breathe fire" work.' }
          ],
          hints: ['Can you point at a broken clause? That is the only way to call it false.', 'No rain means the obligation never activated — unbroken, hence true.'],
          edge: 'Same convention as [].every(p) === true — vacuous truth again, one node later.'
        },
        {
          type: 'mcq',
          prompt: `The promise holds, and I am walking umbrella-free. What can you deduce?`,
          options: [
            { t: 'It is not raining', ok: true, why: 'If it were raining, the promise would force an umbrella into my hand. No umbrella, so no rain: ¬q → ¬p, the contrapositive.' },
            { t: 'It is raining', ok: false, why: 'That would make me a promise-breaker — but we assumed the promise holds.' },
            { t: 'Nothing — the promise says nothing here', ok: false, mis: 'contrapositive-blind', why: 'It says a lot! Run it backwards: rain would guarantee an umbrella. The absence of the guaranteed thing rules out its trigger.' }
          ],
          hints: ['Assume it WERE raining — what would the promise force?', 'An umbrella. You see none. So the assumption of rain must be wrong.']
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The conditional, formally</h4>
<div class="tbl-scroll"><table class="tt">
  <tr><th>p</th><th>q</th><th>p → q</th><th>q → p</th><th>¬q → ¬p</th><th>p ↔ q</th></tr>
  <tr><td class="T">T</td><td class="T">T</td><td class="T">T</td><td class="T">T</td><td class="T">T</td><td class="T">T</td></tr>
  <tr><td class="T">T</td><td class="F">F</td><td class="F">F</td><td class="T">T</td><td class="F">F</td><td class="F">F</td></tr>
  <tr><td class="F">F</td><td class="T">T</td><td class="T">T</td><td class="F">F</td><td class="T">T</td><td class="F">F</td></tr>
  <tr><td class="F">F</td><td class="F">F</td><td class="T">T</td><td class="T">T</td><td class="T">T</td><td class="T">T</td></tr>
</table></div>
<p>Read the columns: <b>p → q ≡ ¬q → ¬p</b> (the <span class="term">contrapositive</span> — identical column, free to swap) while <b>q → p</b> (the <span class="term">converse</span>) is a different animal. Also useful: p → q ≡ ¬p ∨ q — an implication is secretly an OR. The <span class="term">biconditional</span> p ↔ q ("if and only if") demands both directions.</p>
<h4>Three proof techniques</h4>
<ul>
  <li><b>Direct:</b> assume p, march forward to q. <em>Sum of two evens: m = 2a, n = 2b, so m + n = 2(a + b) — even. ∎</em></li>
  <li><b>Contrapositive:</b> to show p → q, prove ¬q → ¬p instead — equivalent, and often the easier road. <em>"If n² is even, n is even": directly, "n² even" is awkward to use; but assume n odd (n = 2k+1), then n² = 2(2k² + 2k) + 1 — odd. ∎</em></li>
  <li><b>Contradiction:</b> assume the whole claim is false, derive something impossible, conclude the claim. The boldest of the three — you get the strongest assumption to work with.</li>
</ul>
<div class="callout"><p><b>Choosing:</b> can you use the hypothesis directly? Go direct. Is the negated conclusion more concrete than the hypothesis? Contrapositive. Does "suppose not" hand you something juicy? Contradiction.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `p → q is <b>false</b> for exactly which assignment?`,
          options: [
            { t: 'p = T, q = F', ok: true, why: 'The one broken-promise row: trigger fired, outcome missing. All three other rows are true.' },
            { t: 'p = F, q = T', ok: false, mis: 'vacuous-denial', why: 'F → T is true — the promise was not tested. Only a fired trigger can break it.' },
            { t: 'p = F, q = F', ok: false, why: 'Also true (vacuously). One single row in the whole table is false: T → F.' }
          ],
          hints: ['A promise breaks in exactly one scenario.', 'The "if" part true, the "then" part false — which row is that?']
        },
        {
          type: 'mcq',
          prompt: `Which statement is <b>equivalent</b> to "if n is prime and n > 2, then n is odd"?`,
          options: [
            { t: 'If n is even, then n is not prime or n ≤ 2', ok: true, why: 'The contrapositive: negate both sides (¬odd = even; the AND becomes OR by De Morgan) and swap. Equivalent, always.' },
            { t: 'If n is odd, then n is prime and n > 2', ok: false, mis: 'converse-confusion', why: 'The converse — arrow reversed without negating. 9 is odd yet not prime: same words, false statement.' },
            { t: 'If n is not prime or n ≤ 2, then n is even', ok: false, mis: 'inverse-confusion', why: 'The inverse (negate both, keep direction) — equivalent to the CONVERSE, not the original. Try n = 9: not prime, yet odd.' }
          ],
          hints: ['Contrapositive = negate both sides AND reverse the arrow.', '¬(prime ∧ n>2) needs De Morgan: not-prime OR n ≤ 2.', 'Swap: ¬odd → ¬(prime ∧ n>2), i.e. even → not-prime ∨ n≤2.'],
          edge: 'Converse and inverse are equivalent to each other — that is why both are equally wrong as substitutes for the original.'
        },
        {
          type: 'mcq',
          prompt: `To prove "if n² is even, then n is even," the classic clean route is…`,
          options: [
            { t: 'Contrapositive: assume n odd, show n² odd', ok: true, why: '"n odd" hands you a formula (n = 2k+1) to compute with; "n² even" gives you nothing to grab. (2k+1)² = 2(2k²+2k) + 1 — odd. ∎' },
            { t: 'Direct: from n² = 2k, derive n = 2m', ok: false, mis: 'direct-always-best', why: 'Legitimate goal, painful road — extracting facts about n from a fact about n² needs machinery (unique factorization) far heavier than the two-line contrapositive.' },
            { t: 'Check n = 2, 4, 6 and generalize', ok: false, mis: 'examples-prove', why: 'Examples illustrate; they never prove a ∀-claim over infinitely many n. (One counterexample disproves — the asymmetry from node 1.3.)' }
          ],
          hints: ['Which assumption gives you an explicit formula to compute with?', '"n is odd" means n = 2k + 1 — square that.', '(2k+1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1: odd. Contrapositive proved.']
        },
        {
          type: 'order',
          prompt: `Arrange the direct proof that <b>the sum of two even numbers is even</b>.`,
          steps: [
            'Assume m and n are even.',
            'By definition, m = 2a and n = 2b for some integers a, b.',
            'Then m + n = 2a + 2b = 2(a + b).',
            'Since a + b is an integer, m + n is 2 × an integer — even. ∎'
          ],
          hints: ['Direct proofs open by assuming the hypothesis.', 'Before computing, unpack what "even" MEANS — definitions are the tools of proofs.', 'Assume → unpack definition → compute → re-read the result against the definition.'],
          why: 'The skeleton of every direct proof: assume, translate via definitions, compute, conclude. Note how "even" was used twice — once unpacked, once re-packed.'
        },
        {
          type: 'mcq',
          prompt: `A proof by <b>contradiction</b> of statement S begins by assuming…`,
          options: [
            { t: '¬S — the statement is false — and hunts for an impossibility', ok: true, why: 'If ¬S forces something absurd (like 1 = 0, or "this integer is both even and odd"), ¬S is untenable, so S holds. You get ¬S as a free assumption — the strongest starting capital of the three techniques.' },
            { t: 'S — and derives something true from it', ok: false, mis: 'affirming-consequent', why: 'Deriving truths from S proves nothing — false statements also imply plenty of truths (F → T is true!). The arrow only bites when it produces falsehood.' },
            { t: 'A specific example of S and generalizes', ok: false, why: 'That is example-checking again — never a proof of a general claim.' }
          ],
          hints: ['The technique is also called reductio ad absurdum — reduce WHAT to absurdity?', 'Assume the opposite of what you want; make that assumption destroy itself.'],
          edge: 'Famous specimen: assume √2 = a/b in lowest terms → both a and b must be even → contradicts "lowest terms". Hence √2 is irrational.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Implications are contracts</h4>
<p>Every function documents an implication: <em>if the precondition holds, then the postcondition holds.</em> "If the input array is non-empty, returns its maximum." Feed it an empty array and anything may happen — the contract is vacuously satisfied, which is precisely why undefined behavior on bad input is not a bug in the contract sense. (Whether it <em>should</em> be the contract is an engineering question.)</p>
<h4>Guard clauses are contrapositive reasoning</h4>
<pre><code>function process(order) {
  if (!order.isValid) return null;   // ¬valid → exit
  // from here on, order.isValid is a FACT
  ...
}</code></pre>
<p>The guard turns "valid → we process" into its working form: past this line, the hypothesis holds. Debugging uses the contrapositive constantly: "if the cache worked, this call would be fast; it is slow — the cache is not working."</p>
<h4>Encoding → in boolean code</h4>
<p>There is no <code>→</code> operator, but node 1.4’s identity p → q ≡ ¬p ∨ q compiles it:</p>
<pre><code>// invariant: "if user is admin, they have 2FA"
console.assert(!u.isAdmin || u.has2FA);</code></pre>`,
      questions: [
        {
          type: 'mcq',
          prompt: `You must assert the rule "<b>if</b> a user is an admin, <b>then</b> they have 2FA enabled." Which boolean expression encodes it?`,
          options: [
            { t: '<code>!u.isAdmin || u.has2FA</code>', ok: true, why: 'p → q ≡ ¬p ∨ q: the check passes for every non-admin (vacuously) and demands 2FA exactly from admins.' },
            { t: '<code>u.isAdmin && u.has2FA</code>', ok: false, mis: 'implication-as-and', why: 'This asserts every user IS an admin with 2FA — it fails on each ordinary user. An implication restricts only the case where its condition fires.' },
            { t: '<code>u.isAdmin || u.has2FA</code>', ok: false, why: 'Check the one case that must fail — an admin without 2FA: here isAdmin alone satisfies the OR, so the broken state passes the check. An assertion that cannot fail on the violation it exists to catch asserts nothing.' }
          ],
          hints: ['When must the assertion fail? Only: admin AND no 2FA.', 'So the assertion is ¬(admin ∧ ¬2FA) — push De Morgan through it.', '¬admin ∨ 2FA. Implication is secretly an OR.'],
          edge: 'The pattern !precondition || postcondition is how invariant checkers, property tests, and database CHECK constraints all encode "if".'
        },
        {
          type: 'mcq',
          prompt: `Contract: "if the input list is sorted, <code>binarySearch</code> finds any present element." A tester calls it on an <b>unsorted</b> list and it misses an element. Verdict?`,
          options: [
            { t: 'Contract honored — nothing was promised for unsorted input', ok: true, why: 'The implication’s condition (sorted) is false, so the contract holds vacuously. Garbage in, contract-free out.' },
            { t: 'Contract violated — it missed a present element', ok: false, mis: 'consequent-required', why: 'The postcondition alone is not the promise; the promise is conditional. Unsorted input never triggered it — like blaming the umbrella promise on a sunny day.' },
            { t: 'The contract is meaningless if input can be unsorted', ok: false, why: 'It is meaningful exactly where it applies — and it tells the caller precisely what they must guarantee (sortedness) to earn the guarantee. That division of labor IS the contract.' }
          ],
          hints: ['Write the contract as p → q. What is p here, and did it hold?', 'p = "input sorted" was false — which row of the → table is that?'],
          edge: 'Vacuous truth is why fuzzers must generate inputs SATISFYING preconditions — violating them tests nothing.'
        },
        {
          type: 'boolExpr',
          vars: ['a', 'b'],
          target: '!a || b',
          prompt: `<b>Expression forge.</b> Flag <code>a</code> = "feature enabled", <code>b</code> = "config loaded". Write the JS expression that is <code>true</code> exactly when the rule "<b>if</b> the feature is enabled, <b>then</b> the config is loaded" is satisfied.`,
          placeholder: 'your expression…',
          hints: ['The rule fails in exactly one row: enabled without config.', 'So you want ¬(a && !b) — or push it through De Morgan.', '!a || b — the compiled form of a → b.'],
          why: 'a → b compiles to !a || b. Equally correct: !(a && !b) — the same single failing row.',
          edge: 'The forge accepted any wiring with the → truth table — including b || !a, order does not matter for ∨.'
        }
      ]
    }
  }
};
