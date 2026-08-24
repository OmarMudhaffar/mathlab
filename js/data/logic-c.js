/* Track 1 content — nodes 1.5, 1.6, 1.7 */

/* ============ 1.5 SETS & OPERATIONS ============ */
window.NODES['logic.sets'] = {
  id: 'logic.sets', num: '1.5', trackId: 'logic',
  title: 'Sets & Operations',
  minutes: 30,
  payoff: 'collections & types · bitmask flags',
  levels: {

    l1: {
      html: `
<h4>A bag with two strange rules</h4>
<p>A <span class="term">set</span> is a collection where only <em>membership</em> matters. Two strange rules follow:</p>
<ul>
  <li><b>No duplicates:</b> {1, 2, 2, 3} <em>is</em> {1, 2, 3}. An element is in or out — "in twice" is meaningless.</li>
  <li><b>No order:</b> {3, 1, 2} <em>is</em> {1, 2, 3}. A set is not a list.</li>
</ul>
<p>We write x ∈ A ("x is in A"). The empty set ∅ contains nothing — and it is still a perfectly good set, the way zero is a perfectly good number.</p>
<h4>The three combinators</h4>
<ul>
  <li><b>A ∪ B (union)</b> — in either. The merged guest list of two parties.</li>
  <li><b>A ∩ B (intersection)</b> — in both. The people invited to <em>both</em> parties.</li>
  <li><b>A \\ B (difference)</b> — in A but not in B. Your invitees who did not get invited to B’s party.</li>
</ul>
<div class="callout amber"><p>Notice the echo: ∪ is an OR over membership, ∩ is an AND, and "not in" is a NOT. Set algebra <em>is</em> the logic of nodes 1.1–1.2 wearing different clothes — De Morgan works on sets too.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Which set equals {1, 2, 2, 3}?`,
          options: [
            { t: '{3, 2, 1}', ok: true, why: 'Duplicates collapse and order is irrelevant — both are the set containing exactly 1, 2, 3.' },
            { t: '{1, 2, 3, 2} but not {1, 2, 3}', ok: false, mis: 'set-as-list', why: 'Treating a set like an array. Sets answer only one question per candidate — in or out? — so repeats add nothing.' },
            { t: 'None — the duplicate 2 makes it invalid', ok: false, why: 'Writing an element twice is redundant, not illegal — the notation still denotes {1, 2, 3}.' }
          ],
          hints: ['A set only remembers WHO is in — not how often, not in what order.', 'Strip duplicates, ignore order: what remains?']
        },
        {
          type: 'mcq',
          prompt: `A = friends who like pizza, B = friends who like sushi. Who is in A ∩ B?`,
          options: [
            { t: 'Friends who like both pizza and sushi', ok: true, why: '∩ keeps exactly the members shared by both sets — membership in A AND membership in B.' },
            { t: 'Friends who like pizza or sushi (or both)', ok: false, mis: 'union-intersection-swap', why: 'That is the union A ∪ B — the generous merge. Intersection is the strict overlap.' },
            { t: 'Friends who like pizza but not sushi', ok: false, why: 'That is the difference A \\ B — in A with B’s members removed.' }
          ],
          hints: ['∩ narrows; ∪ widens.', 'Intersection = the AND of memberships.']
        },
        {
          type: 'mcq',
          prompt: `How many elements does ∅ have — and is it a set?`,
          options: [
            { t: 'Zero, and yes — a perfectly legitimate set', ok: true, why: 'The empty set is to sets what 0 is to numbers: the identity that makes the algebra work (A ∪ ∅ = A).' },
            { t: 'It is not a set — a set must contain something', ok: false, mis: 'empty-not-valid', why: 'Then "the set of solutions" would stop being a set the moment an equation has none. Mathematics keeps its containers valid even when empty — so does every programming language: [] is a real list.' },
            { t: 'Undefined — you cannot count nothing', ok: false, why: 'You can: the count is exactly 0. |∅| = 0 is as definite as facts get.' }
          ],
          hints: ['Think of an empty array in code — invalid, or just empty?', 'A container and its contents are different things.'],
          edge: 'Careful later: ∅ (no elements) and {∅} (ONE element, which happens to be the empty set) are different sets — the empty box vs a box containing an empty box.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Definitions & notation</h4>
<p><span class="term">Set-builder notation</span> writes a set by predicate: {x ∈ ℤ | x² &lt; 10} = {−3, …, 3}. (Quantifier logic powering a container — SQL’s <code>WHERE</code> is exactly this.)</p>
<p><b>A ⊆ B</b> (<span class="term">subset</span>): every element of A is in B — formally ∀x (x ∈ A → x ∈ B). Distinguish carefully from ∈: <code>1 ∈ {1,2}</code> but <code>{1} ⊆ {1,2}</code>. The braces matter.</p>
<p>Two consequences of the definition worth meditating on:</p>
<ul>
  <li><b>∅ ⊆ A for every A</b> — vacuously: the ∀ ranges over no elements, so it cannot fail. (Vacuous truth, third appearance.)</li>
  <li><b>A = B exactly when A ⊆ B and B ⊆ A</b> — the standard way to prove two sets equal: two inclusions.</li>
</ul>
<h4>Counting: the power set</h4>
<p>The <span class="term">power set</span> P(S) is the set of all subsets of S. Each element independently chooses in/out — n elements, 2 choices each:</p>
<pre><code>|P(S)| = 2^|S|        {a,b,c} → 8 subsets, ∅ and {a,b,c} included</code></pre>
<p>Cardinality of unions must not double-count the overlap — <span class="term">inclusion–exclusion</span>:</p>
<pre><code>|A ∪ B| = |A| + |B| − |A ∩ B|</code></pre>`,
      questions: [
        {
          type: 'mcq',
          prompt: `|S| = 3. How many subsets does S have?`,
          options: [
            { t: '8', ok: true, why: 'Each of the 3 elements independently chooses in or out: 2·2·2 = 2³ = 8 — including ∅ and S itself.' },
            { t: '6', ok: false, mis: 'subsets-linear', why: 'Tempting as 2·3 — but choices multiply. The same exponential 2ⁿ as truth-table rows, and for the same reason: independent binary choices.' },
            { t: '7', ok: false, mis: 'forgot-empty-or-full', why: 'Almost — this usually means ∅ or S itself was left out. Both are genuine subsets: ⊆ allows equality, and ∅ ⊆ S vacuously.' }
          ],
          hints: ['Build a subset by interrogating each element: in or out?', 'Three independent yes/no decisions — how many outcomes?', '2 × 2 × 2, exactly like a 3-variable truth table.'],
          edge: 'The bijection with truth tables is real: a subset of {p, q, r} IS an assignment of T/F to three variables.'
        },
        {
          type: 'mcq',
          prompt: `A = {1, 2, 3}, B = {2, 3, 4}. What is A \\ B?`,
          options: [
            { t: '{1}', ok: true, why: 'Start from A, remove everything B claims: 2 and 3 go, 1 survives.' },
            { t: '{4}', ok: false, mis: 'difference-direction', why: 'That is B \\ A — difference is not symmetric, the left operand is the one being filtered. Order matters, exactly like subtraction.' },
            { t: '{2, 3}', ok: false, why: 'Those are the shared elements — A ∩ B. Difference keeps what is NOT shared (from the left side).' },
            { t: '{1, 4}', ok: false, mis: 'symmetric-difference', why: 'This is the symmetric difference (elements in exactly one of the two) — a real operation, in fact the XOR of sets, but not A \\ B.' }
          ],
          hints: ['Read A \\ B as: A, with B’s members deported.', 'Which members of A also appear in B? Remove precisely those.'],
          edge: 'The {1,4} distractor is set-XOR: (A \\ B) ∪ (B \\ A). The logic connectives keep resurfacing as set operations.'
        },
        {
          type: 'mcq',
          prompt: `Which statement is TRUE?`,
          options: [
            { t: '{1} ⊆ {1, 2}', ok: true, why: 'Every element of {1} — just the number 1 — is in {1, 2}. That is all ⊆ asks.' },
            { t: '1 ⊆ {1, 2}', ok: false, mis: 'element-vs-subset', why: '⊆ relates SET to SET. The number 1 is an element, not a set of elements: the correct claim is 1 ∈ {1, 2}. One symbol, one level of braces — a distinction type systems enforce for the same reason.' },
            { t: '{1} ∈ {1, 2}', ok: false, mis: 'element-vs-subset', why: '∈ asks whether the exact object {1} appears in the list of members — the members are 1 and 2, and neither IS the set {1}. ({1} ∈ {{1}, 2} would be true.)' }
          ],
          hints: ['∈ asks about one member; ⊆ asks about a whole set fitting inside.', 'Match the types: number ∈ set, set ⊆ set.'],
          edge: 'In code: 1 is an int, {1} is a Set<int> — "1 ⊆ A" is a type error, and mathematicians read it the same way.'
        },
        {
          type: 'input',
          prompt: `|A| = 3, |B| = 2, and |A ∩ B| = 1. What is |A ∪ B|?`,
          accept: ['4'],
          placeholder: '…',
          hints: ['Adding 3 + 2 counts somebody twice — who?', 'The overlap was counted in both sets — subtract it once.', '3 + 2 − 1 = 4.'],
          why: 'Inclusion–exclusion: |A ∪ B| = |A| + |B| − |A ∩ B| = 3 + 2 − 1 = 4. The subtraction un-double-counts the overlap.',
          edge: 'With three sets the pattern deepens: add singles, subtract pairs, add back the triple. Full combinatorics in Track 2.'
        },
        {
          type: 'mcq',
          prompt: `Is ∅ ⊆ A true for every set A?`,
          options: [
            { t: 'Yes — vacuously: no element of ∅ can violate it', ok: true, why: '⊆ unfolds to ∀x (x ∈ ∅ → x ∈ A), and the hypothesis x ∈ ∅ is always false — every implication holds vacuously. No possible counterexample, hence true.' },
            { t: 'No — the empty set is in nothing', ok: false, mis: 'empty-in-nothing', why: 'Confuses ⊆ with ∈. Whether ∅ ∈ A depends on A — but ∅ ⊆ A asks if ∅’s members (all zero of them) are in A, which cannot fail.' },
            { t: 'Only when A is also empty', ok: false, why: 'It even holds then (∅ ⊆ ∅), but no restriction is needed — the vacuous argument works for every A.' }
          ],
          hints: ['Unfold the definition: every element of ∅ must be in A.', 'To refute it you would need an element of ∅ outside A. Any candidates?', 'None exist — the claim stands unopposed. Vacuous truth again.'],
          edge: 'Third meeting with vacuous truth: [].every(p), F → q, and now ∅ ⊆ A. One convention, three costumes.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Sets ship in every language</h4>
<pre><code>const seen = new Set([1, 2, 2, 3]);
seen.size            // 3 — dedup is the set contract
seen.has(2)          // ∈ as an O(1) question

// A ∩ B and A \\ B, hand-rolled:
const inter = [...a].filter(x => b.has(x));
const diff  = [...a].filter(x => !b.has(x));</code></pre>
<p>Any time you deduplicate, check membership, or diff two collections, you are doing set theory with better syntax.</p>
<h4>Bitmasks: the power set in one integer</h4>
<p>Give each of n flags a bit. An n-bit integer then <em>is</em> a subset of the flag set — bit i set means flag i in. All 2ⁿ subsets fit in the integers 0 … 2ⁿ−1, and the set operations compile to single instructions:</p>
<pre><code>const READ = 1, WRITE = 2, EXEC = 4;   // {}, {R}, {W}, {R,W}, … all in 0..7
perms | other    // union
perms & other    // intersection
perms & ~other   // difference
perms ^ other    // symmetric difference (set XOR!)</code></pre>
<div class="callout"><p>Unix permissions, feature flags, chess bitboards, CSS font styles — all power sets stored as integers. |P(byte)| = 2⁸ = 256 subsets per byte.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `What does <code>new Set([4, 4, 4, 7]).size</code> return?`,
          options: [
            { t: '2', ok: true, why: 'The set contract collapses duplicates on entry: members are {4, 7}, size 2.' },
            { t: '4', ok: false, mis: 'set-as-list', why: 'That is the array’s length. The Set constructor is precisely a dedup pass — only membership survives.' },
            { t: '3', ok: false, why: 'Neither the list length nor the member count — the members are exactly 4 and 7.' }
          ],
          hints: ['Sets store membership, not occurrences.', 'Which DISTINCT values went in?']
        },
        {
          type: 'mcq',
          prompt: `A settings object packs 8 independent boolean feature flags into one byte. How many distinct configurations exist?`,
          options: [
            { t: '256', ok: true, why: '2⁸ — each configuration is a subset of the flag set, and a byte enumerates the whole power set 0…255.' },
            { t: '8', ok: false, mis: 'subsets-linear', why: 'That counts the flags, not their combinations. Configurations are subsets — the power set, exponentially bigger than the set.' },
            { t: '64', ok: false, why: '2⁶ — two flags short. Each of the 8 bits independently doubles the count: 2⁸ = 256.' }
          ],
          hints: ['One configuration = one choice of ON flags = one subset.', '|P(S)| = 2^|S| with |S| = 8.'],
          edge: 'Testing consequence: "test every flag combination" means 256 runs at 8 flags, a million at 20. Exponentials decide test strategy.'
        },
        {
          type: 'mcq',
          prompt: `<code>a</code> and <code>b</code> are Sets. What does this compute?<br><code>[...a].filter(x =&gt; !b.has(x))</code>`,
          options: [
            { t: 'A \\ B — members of a not in b', ok: true, why: 'Iterate a, keep what fails the b-membership test: the set difference, left operand filtered by the right.' },
            { t: 'B \\ A — members of b not in a', ok: false, mis: 'difference-direction', why: 'Direction check: the code ITERATES a — a is the pool being filtered, b is only consulted. Swapping the roles needs [...b].filter(x => !a.has(x)).' },
            { t: 'A ∩ B — the overlap', ok: false, why: 'The predicate is NEGATED (!b.has). Drop the ! and you get the intersection — one character between overlap and difference.' }
          ],
          hints: ['Which set is being looped over? That one is being filtered.', 'The predicate keeps x when x is NOT in b.'],
          edge: 'That one-character gap (!b.has vs b.has) is a classic code-review catch — name your variables notInB, not tmp.'
        }
      ]
    }
  }
};

/* ============ 1.6 RELATIONS & FUNCTIONS ============ */
window.NODES['logic.relations'] = {
  id: 'logic.relations', num: '1.6', trackId: 'logic',
  title: 'Relations & Functions',
  minutes: 35,
  payoff: 'hash maps · equals() contracts · invertible encodings',
  levels: {

    l1: {
      html: `
<h4>Arrows between two shores</h4>
<p>Draw students on the left shore, lockers on the right, and an arrow from each student to their assigned locker. Any such bundle of arrows is a <span class="term">relation</span>. A relation earns the title <span class="term">function</span> under one discipline: <b>every left-shore point fires exactly one arrow</b>. No student with zero lockers, none with two.</p>
<p>Functions then come in grades, by how the arrows LAND:</p>
<ul>
  <li><b>Injective (one-to-one):</b> no locker is shared — different students, different lockers.</li>
  <li><b>Surjective (onto):</b> no locker is wasted — every locker has at least one arrow arriving.</li>
  <li><b>Bijective:</b> both at once — a perfect pairing. Every student has their own locker, every locker its own student.</li>
</ul>
<div class="callout amber"><p><b>Why bijections are gold:</b> a perfect pairing can be read <em>backwards</em>. Student → locker can be reversed into locker → student with no ambiguity. Bijective = invertible, and invertible means no information was lost.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Which arrow diagram is <b>NOT</b> a function from students to lockers?`,
          options: [
            { t: 'One student has arrows to two different lockers', ok: true, why: 'A function must answer "which locker?" with ONE locker per student. Two arrows from one input breaks the exactly-one rule.' },
            { t: 'Two students point at the same locker', ok: false, mis: 'sharing-breaks-function', why: 'Sharing an output is allowed — it merely costs the function its injectivity. The exactly-one rule constrains arrows LEAVING each input, not arriving.' },
            { t: 'One locker receives no arrow at all', ok: false, why: 'Unused outputs are fine — that only means not surjective. Every STUDENT needs an arrow; lockers can idle.' }
          ],
          hints: ['The function rule polices the left shore: how many arrows may leave each input?', 'Exactly one arrow out of each input. Which option violates that?']
        },
        {
          type: 'mcq',
          prompt: `The locker assignment is <b>injective</b>. What does that guarantee?`,
          options: [
            { t: 'No two students share a locker', ok: true, why: 'Injective = distinct inputs get distinct outputs. Collisions are exactly what injectivity forbids.' },
            { t: 'Every locker is assigned to someone', ok: false, mis: 'inj-surj-swap', why: 'That is surjectivity — no output wasted. Injectivity is no output SHARED; a school with spare lockers can still be injective.' },
            { t: 'Every student has a locker', ok: false, why: 'True of every function (the exactly-one rule) — injectivity adds something on top: no sharing.' }
          ],
          hints: ['Injective polices the arrows ARRIVING at each output.', 'At most one arrow per locker — what does that rule out?']
        },
        {
          type: 'mcq',
          prompt: `Why are <b>bijections</b> the VIPs of the function world?`,
          options: [
            { t: 'They can be run backwards — a perfect, invertible pairing', ok: true, why: 'Exactly one arrow touches every point on both shores, so reversing all arrows yields a legitimate function back. Bijective ⇔ invertible ⇔ lossless.' },
            { t: 'They are the fastest to compute', ok: false, why: 'Speed is an algorithmic property; bijectivity is structural — about the arrow pattern, not the cost of following an arrow.' },
            { t: 'They only work on finite sets', ok: false, why: 'n ↦ n + 1 is a bijection on all of ℤ. (On finite sets they do have a bonus power: forcing equal sizes.)' }
          ],
          hints: ['Try reversing all arrows — when is the result still a function?', 'Reversal fails at any shared output (which arrow to follow back?) or unused output (nowhere to go). Rule out both and you have…?'],
          edge: 'Preview: on finite sets, a bijection A → B forces |A| = |B|. Counting by pairing is Track 2’s favorite trick.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Formal definitions</h4>
<p>A <span class="term">relation</span> from A to B is any subset R ⊆ A × B (the set of ordered pairs). A <span class="term">function</span> f: A → B is a relation where each a ∈ A appears in <em>exactly one</em> pair. Then:</p>
<ul>
  <li><b>Injective:</b> f(a₁) = f(a₂) ⟹ a₁ = a₂. Prove by taking f(a₁) = f(a₂) and forcing a₁ = a₂; refute with one collision.</li>
  <li><b>Surjective:</b> ∀b ∈ B ∃a ∈ A, f(a) = b. Note the ∀∃ shape — node 1.3 working.</li>
  <li><b>Bijective:</b> both ⟺ f has an inverse function f⁻¹.</li>
</ul>
<p><b>The codomain matters:</b> f(x) = 2x is surjective ℤ → even integers, but not ℤ → ℤ. Same formula, different claim — like the domain in 1.3.</p>
<h4>Equivalence relations</h4>
<p>A relation ~ on one set is an <span class="term">equivalence relation</span> if it is:</p>
<ul>
  <li><b>Reflexive:</b> a ~ a for all a</li>
  <li><b>Symmetric:</b> a ~ b ⟹ b ~ a</li>
  <li><b>Transitive:</b> a ~ b and b ~ c ⟹ a ~ c</li>
</ul>
<p>Equivalence relations are exactly the "sameness in one respect" relations — same birthday, same remainder mod 3, same length. Each one carves its set into disjoint <span class="term">equivalence classes</span> (a <span class="term">partition</span>): every element in exactly one class. "Same remainder mod 3" splits ℤ into 3 classes — the arithmetic of Track 2’s modular world.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `f: ℤ → ℤ, f(x) = 2x. Classify it.`,
          options: [
            { t: 'Injective but not surjective', ok: true, why: '2a = 2b forces a = b (injective ✓). But no integer maps to 3 — odd targets are unreachable, so not surjective onto ℤ.' },
            { t: 'Surjective but not injective', ok: false, mis: 'inj-surj-swap', why: 'Backwards on both counts: doubling never collides (injective holds) and misses every odd number (surjectivity fails).' },
            { t: 'Bijective — it has a clean formula', ok: false, mis: 'formula-implies-bijective', why: 'A tidy formula guarantees nothing about arrow structure. The codomain ℤ contains odd numbers that 2x can never hit.' }
          ],
          hints: ['Injectivity: can 2a = 2b with a ≠ b?', 'Surjectivity: which integer b would need f(a) = 3?', 'No collisions, but odd outputs unreachable: injective, not surjective.'],
          edge: 'Onto the EVEN integers, the same formula is bijective — the codomain is part of the function’s identity.'
        },
        {
          type: 'mcq',
          prompt: `f: ℝ → ℝ, f(x) = x². Injective?`,
          options: [
            { t: 'No — f(−2) = f(2) = 4 is a collision', ok: true, why: 'One shared output between distinct inputs settles it. Refuting injectivity needs exactly one collision, like refuting a ∀.' },
            { t: 'Yes — each x has exactly one square', ok: false, mis: 'function-vs-injective', why: 'One output per input makes it a FUNCTION — that is the entry requirement, not injectivity. Injectivity asks the reverse: one input per output.' },
            { t: 'Yes on ℝ, since squares are all distinct', ok: false, why: 'Squares of distinct numbers can match precisely when signs differ: (−x)² = x². Restricting to x ≥ 0 would rescue injectivity.' }
          ],
          hints: ['Hunt for two different inputs with the same output.', 'What do x and −x share?'],
          edge: 'The restriction fix (x ≥ 0 makes x² injective) is why √ returns only the non-negative root — an API decision forced by injectivity.'
        },
        {
          type: 'mcq',
          prompt: `Which relation on ℤ is <b>NOT</b> an equivalence relation?`,
          options: [
            { t: 'a ≤ b', ok: true, why: 'Symmetry fails: 2 ≤ 5 but 5 ≤ 2 is false. (Reflexive ✓ and transitive ✓ — but the club requires all three.) Orderings and equivalences are different species.' },
            { t: '"a and b have the same parity"', ok: false, why: 'Same-X relations pass all three tests automatically — this one partitions ℤ into evens and odds.' },
            { t: '"a and b have the same remainder mod 3"', ok: false, why: 'Also a same-X relation: reflexive, symmetric, transitive, with exactly 3 classes.' }
          ],
          hints: ['Test each relation against reflexive / symmetric / transitive.', 'Symmetry is the discriminating test: does a R b force b R a?', '≤ has direction — sameness relations do not.'],
          edge: 'Rule of thumb: any relation phrased "same ___ " is an equivalence relation; any phrased "at most / bigger / before" is an order.'
        },
        {
          type: 'input',
          prompt: `"Same remainder when divided by 3" partitions ℤ into how many equivalence classes?`,
          accept: ['3', 'three'],
          placeholder: '…',
          hints: ['One class per possible remainder.', 'What remainders can division by 3 leave?', 'Remainders 0, 1, 2 — one class each.'],
          why: 'Three classes: the multiples of 3, the numbers with remainder 1, and remainder 2. Every integer lands in exactly one — the definition of a partition.',
          edge: 'These three classes ARE the number system ℤ/3ℤ that modular arithmetic computes in — Track 2 builds on exactly this.'
        },
        {
          type: 'mcq',
          prompt: `~ is an equivalence relation, and x ~ y. Someone claims the classes of x and of y might merely overlap. What is true?`,
          options: [
            { t: 'Their classes are IDENTICAL — classes never partially overlap', ok: true, why: 'Any shared member chains everything together by symmetry + transitivity: two classes are either equal or disjoint. That all-or-nothing structure is what makes the classes a partition.' },
            { t: 'Overlap is possible — transitivity only chains three elements', ok: false, mis: 'partial-overlap', why: 'Transitivity chains indefinitely: any member of x’s class reaches x, then y, then all of y’s class. One shared element fuses the classes completely.' },
            { t: 'x’s class contains y’s class, not vice versa', ok: false, why: 'Symmetry forbids one-directional containment: x ~ y gives y ~ x, so each class swallows the other — equality.' }
          ],
          hints: ['Take any z ~ x. Can you connect z to y?', 'z ~ x and x ~ y give z ~ y by transitivity — so x’s whole class sits in y’s. Now use symmetry for the reverse.'],
          edge: 'This equal-or-disjoint property is why hash-partitioning data by any "same key" relation cleanly shards it with no stragglers.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>A hash map is a finite function</h4>
<p><code>Map&lt;K, V&gt;</code> implements f: K → V under the exactly-one rule — <code>map.set(k, v2)</code> <em>replaces</em> v1 because two arrows from one key would make lookups ambiguous. The math rule and the API rule are the same rule.</p>
<h4>equals() must be an equivalence relation</h4>
<p>Java’s <code>equals()</code> contract and every language’s equality trait list reflexive, symmetric, transitive — verbatim. Violate them and collections break <em>silently</em>: a non-symmetric equals means <code>list.contains(x)</code> can answer differently depending on which end did the comparing.</p>
<pre><code>// broken: symmetric? NO —
// a CaseString equals a plain string, but never vice versa
class CaseString {
  equals(other) { return other.toLowerCase?.() === this.s.toLowerCase(); }
}</code></pre>
<h4>Bijections are lossless codecs</h4>
<p>encode: Record → String is usable only if some decode reverses it — i.e. only if it is injective (no two records share an encoding). Make it bijective onto its format and every valid string parses back. serialize/deserialize, char ↔ codepoint, autoincrement id ↔ row: every "and back again" pair in computing is a bijection wearing overalls.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Why does <code>map.set(key, newValue)</code> <b>overwrite</b> the old value instead of keeping both?`,
          options: [
            { t: 'A map implements a function — each key must have exactly one value', ok: true, why: 'Two values under one key is precisely the two-arrows-from-one-input diagram that disqualifies a function: get(key) would have no well-defined answer.' },
            { t: 'Memory efficiency — storing two values costs double', ok: false, mis: 'perf-explains-semantics', why: 'Multimaps exist and store lists happily. The overwrite is a semantic contract (one answer per question), not a storage economy.' },
            { t: 'Hash collisions make storing both impossible', ok: false, why: 'Collisions (two KEYS, one bucket) are handled internally and invisibly. Overwriting is about one key — the function rule, enforced on purpose.' }
          ],
          hints: ['What should get(key) return if two values were kept?', 'The exactly-one-output rule of functions IS the map contract.'],
          edge: 'When you genuinely need many values per key, you change the codomain — Map<K, V[]> — keeping the function rule intact. The math forces the API shape.'
        },
        {
          type: 'mcq',
          prompt: `An <code>equals()</code> where <code>a.equals(b)</code> is true but <code>b.equals(a)</code> is false breaks which requirement — and what is a real consequence?`,
          options: [
            { t: 'Symmetry — collection membership answers can depend on comparison direction', ok: true, why: 'contains() iterates comparing either stored.equals(query) or query.equals(stored) — implementations differ. Non-symmetric equality makes the SAME list answer contains() differently across libraries. Equivalence-relation laws are what make "same" portable.' },
            { t: 'Reflexivity — objects stop equaling themselves', ok: false, mis: 'law-name-mixup', why: 'Reflexivity is a.equals(a) — untouched here. The broken law is the two-object mirror: symmetry.' },
            { t: 'Transitivity — chains of equality break', ok: false, why: 'Transitivity needs three objects (a=b, b=c ⟹ a=c). This failure appears already with two.' }
          ],
          hints: ['Which law is about swapping the two sides?', 'Now imagine list.contains(x): who calls equals on whom?'],
          edge: 'The CaseString above is this bug: "abc" has no idea CaseStrings exist, so string.equals(caseString) is false while the reverse is true.'
        },
        {
          type: 'mcq',
          prompt: `An <code>encode: Record → String</code> is safe to decode only if it is at least…`,
          options: [
            { t: 'Injective — distinct records never share an encoding', ok: true, why: 'Decoding reads the arrow backwards; a shared output ("collision") makes the backward step ambiguous — information destroyed. Injectivity is exactly losslessness.' },
            { t: 'Surjective — every string must decode to something', ok: false, mis: 'inj-surj-swap', why: 'Convenient (no unparseable strings) but not what losslessness needs: even with unused strings, every record still round-trips — decode is simply partial.' },
            { t: 'Fast — decoding must not be slower than encoding', ok: false, why: 'Speed never rescues ambiguity: if two records encode identically, no amount of compute can tell them apart again.' }
          ],
          hints: ['Decoding is running the arrows backwards. What arrow pattern breaks that?', 'Two records → one string: which property just failed?'],
          edge: 'Hash functions are deliberately NON-injective (infinite inputs, fixed-size output) — which is why a hash can verify but never restore data, and why "collision found" headlines end cryptographic careers.'
        }
      ]
    }
  }
};

/* ============ 1.7 INDUCTION & STRONG INDUCTION ============ */
window.NODES['logic.induction'] = {
  id: 'logic.induction', num: '1.7', trackId: 'logic',
  title: 'Induction & Strong Induction',
  minutes: 40,
  payoff: 'recursion correctness · loop invariants',
  levels: {

    l1: {
      html: `
<h4>The domino argument</h4>
<p>Infinite dominoes, numbered 1, 2, 3, … How do you guarantee <em>every</em> domino falls — an infinite claim — with finite work? Two facts suffice:</p>
<ul>
  <li><b>The first domino falls.</b> (Someone pushes it.)</li>
  <li><b>Every falling domino knocks over the next.</b> (Spacing is right, everywhere.)</li>
</ul>
<p>Then domino 1 falls, so 2 falls, so 3 falls… no domino escapes. That is <span class="term">mathematical induction</span>: prove a statement for 1 (<span class="term">base case</span>), prove that truth-at-k forces truth-at-k+1 (<span class="term">inductive step</span>), and the statement holds for every natural number.</p>
<div class="callout amber"><p><b>Both legs or nothing.</b> Perfect spacing with no push: nothing ever falls. A push with one gap at domino 17: everything from 17 on survives. The two failure modes of every broken induction proof.</p></div>
<p>The dominoes need not start at 1 — push domino 5 with good spacing from 5 onward, and you have proven the claim for all n ≥ 5. Where the chain starts is part of the theorem.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `To guarantee ALL dominoes fall, you need…`,
          options: [
            { t: 'The first falls, and each faller knocks over the next', ok: true, why: 'Base + step. The push starts the chain; the spacing propagates it past every number.' },
            { t: 'Each faller knocks over the next — that alone suffices', ok: false, mis: 'missing-base', why: 'Perfect spacing, no push: an eternally standing row satisfies this perfectly. Propagation with nothing to propagate is vacuous.' },
            { t: 'Watch the first thousand fall and extrapolate', ok: false, mis: 'examples-prove', why: 'A thousand observations do not reach domino 1001. (Real math example: a famous prime-related claim first fails past 10³⁴⁰ — checking "a lot" is not checking all.)' }
          ],
          hints: ['Two independent things can go wrong with a domino run.', 'One ensures a start; the other ensures no gap. Name both.']
        },
        {
          type: 'mcq',
          prompt: `The spacing is perfect (every faller topples the next), but nobody pushes domino 1. What falls?`,
          options: [
            { t: 'Nothing at all', ok: true, why: 'The step only converts falls into falls. Zero falls in, zero falls out — the base case is the fuel.' },
            { t: 'Everything eventually — good spacing is enough', ok: false, mis: 'missing-base', why: '"IF one falls THEN the next falls" is an implication — and with no falling domino ever, it holds vacuously while nothing moves. The step alone proves nothing.' },
            { t: 'Only domino 1 stays up', ok: false, why: 'Domino 2 needs domino 1’s fall to be triggered — no push anywhere means no fall anywhere.' }
          ],
          hints: ['The step is conditional: it fires only when fed a falling domino.', 'Who feeds the first fall into the chain?'],
          edge: 'Vacuous truth, fourth sighting: an unfired implication is true and useless — which is exactly why the base case is not optional.'
        },
        {
          type: 'mcq',
          prompt: `Domino 5 is pushed; spacing is perfect from 5 onward (nothing is known about 1–4). What is proven?`,
          options: [
            { t: 'Every domino from 5 on falls; 1–4 are unknown', ok: true, why: 'The chain reaction runs forward from where it starts. Induction from base 5 proves the claim for all n ≥ 5 — a perfectly respectable theorem shape.' },
            { t: 'All dominoes fall — chains spread everywhere', ok: false, mis: 'base-covers-all', why: 'Chains run forward only; nothing propagates backwards to 4, 3, 2, 1. The base case marks the left edge of the conquered territory.' },
            { t: 'Nothing — a proof must start at 1', ok: false, why: 'Starting elsewhere just changes the theorem: "for all n ≥ 5". Many real claims are false for small n and provable from a later base — e.g. 2ⁿ > n² holds for all n ≥ 5.' }
          ],
          hints: ['Which direction does the chain reaction travel?', 'Forward only — so the conclusion covers which numbers?'],
          edge: '"For all n ≥ n₀" is the native shape of algorithm analysis — Big-O claims in Track 2 hold "for large enough n" for exactly this reason.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The principle, stated</h4>
<p>To prove ∀n ≥ n₀, P(n):</p>
<ol>
  <li><b>Base case:</b> verify P(n₀) directly.</li>
  <li><b>Inductive step:</b> for arbitrary k ≥ n₀, assume P(k) — the <span class="term">inductive hypothesis</span> (IH) — and derive P(k+1).</li>
</ol>
<p>The IH is not circular: you are not assuming the theorem (all n), only borrowing truth-at-k to buy truth-at-k+1. The implication P(k) → P(k+1), plus a starting point, is what covers infinity with two pages of work.</p>
<h4>Worked specimen</h4>
<p><b>Claim:</b> 1 + 2 + ⋯ + n = n(n+1)/2 for all n ≥ 1.</p>
<pre><code>Base    n = 1:  LHS = 1,  RHS = 1·2/2 = 1  ✓
IH      assume 1 + ⋯ + k = k(k+1)/2
Step    1 + ⋯ + k + (k+1)
        = k(k+1)/2 + (k+1)        (by IH)
        = (k+1)(k/2 + 1)
        = (k+1)(k+2)/2            — the formula at n = k+1  ∎</code></pre>
<p>Anatomy of every step: <em>peel off the last piece, apply the IH to the rest, reassemble.</em></p>
<h4>Strong induction</h4>
<p>Sometimes k+1 leans not on k but on some <em>smaller</em> case — a number factors into two much smaller numbers; a recursion splits its input in half. <span class="term">Strong induction</span> upgrades the IH: assume P(m) for <b>all</b> m ≤ k, derive P(k+1). Same principle, roomier borrowing — dominoes so heavy that all previous dominoes together push over the next.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `In the inductive step for the sum formula, what exactly do you get to assume?`,
          options: [
            { t: '1 + ⋯ + k = k(k+1)/2 for one arbitrary fixed k — and nothing more', ok: true, why: 'The IH is the single rung you stand on while building the next. Arbitrary k makes the step generic; assuming only k keeps it non-circular.' },
            { t: 'The formula for all n — the thing being proven', ok: false, mis: 'circular-ih', why: 'That would be circular and prove nothing. Induction borrows exactly one instance and pays it forward — the ladder is climbed, not assumed.' },
            { t: 'Nothing — assumptions invalidate proofs', ok: false, mis: 'assume-nothing', why: 'Conditional assuming is legitimate: the step proves the implication P(k) → P(k+1), and proving "if A then B" rightly begins "assume A".' }
          ],
          hints: ['The step proves an implication. What is its hypothesis?', 'P(k), for one arbitrary k. That borrowed instance is the whole IH.']
        },
        {
          type: 'order',
          prompt: `Arrange the induction proof that 1 + 2 + ⋯ + n = n(n+1)/2.`,
          steps: [
            'Base case n = 1: LHS = 1, RHS = 1·2/2 = 1. ✓',
            'Inductive hypothesis: assume 1 + ⋯ + k = k(k+1)/2 for some k ≥ 1.',
            'Write the k+1 sum and peel: 1 + ⋯ + k + (k+1) = [1 + ⋯ + k] + (k+1).',
            'Apply the IH to the bracket: = k(k+1)/2 + (k+1).',
            'Factor: = (k+1)(k+2)/2 — the formula at n = k+1. ∎'
          ],
          hints: ['Base first — the chain needs its push before its spacing.', 'You must WRITE the k+1 case before the IH has anything to bite on.', 'Base → assume → peel → substitute → reassemble.'],
          why: 'Peel, substitute, reassemble — the mechanical heart of nearly every induction step you will ever write.'
        },
        {
          type: 'mcq',
          prompt: `A proof establishes P(k) → P(k+1) for all k ≥ 1, but P(1) is actually FALSE. What has been proven about P?`,
          options: [
            { t: 'Nothing — the chain has no starting point', ok: true, why: 'The step transports truth but cannot create it. P(n) might still be true from some later base, or false everywhere — this proof does not say.' },
            { t: 'P holds from n = 2 onward', ok: false, mis: 'step-implies-truth', why: 'P(2) would need to come from P(1) — which is false. F → anything tells you nothing about the anything (the → table, row 3).' },
            { t: 'P is false for every n', ok: false, why: 'Also unproven! A false base breaks the argument, not the statement — perhaps P(7) holds and the chain runs fine from there.' }
          ],
          hints: ['The step is an implication — what do implications with false hypotheses deliver?', 'Nothing usable. Where could truth enter the chain?'],
          edge: 'Debugging analogy: a correct recursive case with a wrong base case — the recursion faithfully propagates the garbage. Base bugs are root causes.'
        },
        {
          type: 'mcq',
          prompt: `2ⁿ > n² is false at n = 2, 3, 4 but true at n = 5, and the step works for k ≥ 5. The honest theorem is…`,
          options: [
            { t: '2ⁿ > n² for all n ≥ 5, base case n = 5', ok: true, why: 'Start the dominoes where the claim starts being true. Base P(5): 32 > 25 ✓, step from k ≥ 5 — theorem proven with its exact domain of validity.' },
            { t: 'No theorem — a claim failing anywhere cannot be proven', ok: false, mis: 'all-or-nothing', why: '"For all n ≥ n₀" is a standard and useful theorem shape — asymptotic truths are still truths, and algorithm analysis consists almost entirely of them.' },
            { t: '2ⁿ > n² for all n, ignoring small exceptions', ok: false, why: 'Never — a stated ∀ with known counterexamples is simply false. State the base honestly; the theorem is the range where it holds.' }
          ],
          hints: ['Where should the first domino stand?', 'At the first n where the claim holds AND the step can run: n = 5.'],
          edge: '"Eventually, exponentials beat polynomials" — this exercise is the formal skeleton of that Big-O slogan.'
        },
        {
          type: 'mcq',
          prompt: `"Every integer n ≥ 2 is a product of primes." Why does this proof want STRONG induction?`,
          options: [
            { t: 'A composite k+1 factors as a·b with a, b possibly far smaller than k+1 — you need the IH at those sizes', ok: true, why: '36 = 4 · 9: to conclude, you need prime factorizations of 4 and 9 — not of 35. Strong induction’s roomier hypothesis (all m ≤ k) covers whichever factors appear.' },
            { t: 'Strong induction is simply more rigorous', ok: false, mis: 'strong-is-stronger', why: 'Equally rigorous, provably equivalent principles — the choice is about which IH the step NEEDS, not about safety margins.' },
            { t: 'Ordinary induction fails on statements about primes', ok: false, why: 'Nothing prime-specific — plenty of prime facts use ordinary induction. The trigger is structural: the case leans on distant smaller cases, not the immediate predecessor.' }
          ],
          hints: ['Factor 36. Which smaller cases does the argument consult?', '4 and 9 — nowhere near 35. Which flavor of IH reaches them?'],
          edge: 'The same trigger fires for mergesort: sorting n leans on sorting n/2 — distant, not adjacent. Divide & conquer runs on strong induction.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Recursion is induction executing</h4>
<pre><code>function factorial(n) {
  if (n === 0) return 1;          // base case
  return n * factorial(n - 1);    // inductive step
}</code></pre>
<p>Why do you trust it? You check the base, and you check that the step is right <em>assuming the recursive call is right</em> — which is precisely the inductive hypothesis, worn as code. You never trace all the way down; the IH lets you reason one layer at a time. Miss the base case and you get infinite recursion: the missing-push failure mode, now with a stack overflow as its error message.</p>
<p>Divide & conquer is strong induction executing: <code>mergesort(n)</code> trusts <code>mergesort(n/2)</code> — a distant smaller case, not n−1.</p>
<h4>Loop invariants: induction for loops</h4>
<p>A <span class="term">loop invariant</span> is a property that is true before the loop starts (<em>base</em>) and preserved by each iteration (<em>step</em>) — so it still holds at exit, where it delivers your conclusion:</p>
<pre><code>// invariant: best = max of items[0..i)
let best = -Infinity;              // i = 0: max of nothing ✓ (vacuous!)
for (let i = 0; i < items.length; i++) {
  best = Math.max(best, items[i]); // preserved: now max of items[0..i+1)
}
// exit: i = length ⟹ best = max of ALL items  ∎</code></pre>
<div class="callout"><p>Base, step, conclusion — the domino argument, wearing a <code>for</code> loop. This is how algorithm correctness proofs work for the rest of the degree.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `When you verify <code>factorial</code>, what plays the role of the inductive hypothesis?`,
          options: [
            { t: 'Trusting that factorial(n−1) returns (n−1)! while checking the n case', ok: true, why: 'You verify one layer, borrowing correctness of the smaller call — exactly assume P(k), prove P(k+1). Induction is why you may trust a function you are in the middle of writing.' },
            { t: 'The if (n === 0) check', ok: false, mis: 'base-vs-ih', why: 'That is the base case — the push. The hypothesis is the borrowed trust in the recursive call, the spacing of the dominoes.' },
            { t: 'Testing factorial(5) === 120', ok: false, mis: 'examples-prove', why: 'A test is one domino observed falling — valuable, but the inductive argument is what covers every n at once.' }
          ],
          hints: ['Which part of your reasoning says "assume the smaller case works"?', 'The mental step "the recursive call is correct, so…" — name it in induction terms.'],
          edge: 'This is why recursion feels like cheating until induction clicks — the trust IS licensed, by the theorem.'
        },
        {
          type: 'mcq',
          prompt: `<code>factorial</code> is called with the base case <b>deleted</b>. In induction terms, what happens?`,
          options: [
            { t: 'The step propagates forever with no floor — infinite recursion, stack overflow', ok: true, why: 'The chain n → n−1 → n−2 → … never reaches a settled case; the missing-base failure mode with a runtime error as its proof. The base case is where recursion cashes out.' },
            { t: 'Still correct — the recursive logic is intact', ok: false, mis: 'missing-base', why: 'The step alone proves (and computes) nothing — perfectly spaced dominoes, no push. Every recursion needs its settled floor.' },
            { t: 'Wrong answers, but it terminates', ok: false, why: 'It cannot terminate: each call demands another. The failure is structural, not numerical.' }
          ],
          hints: ['Where does the chain of calls stop, without a base?', 'Nowhere — and the call stack is finite even if the math is not.']
        },
        {
          type: 'mcq',
          prompt: `In the max-loop above, why is <code>best = -Infinity</code> the correct initialization — in invariant terms?`,
          options: [
            { t: 'It makes the invariant true BEFORE iteration 1: "max of zero items" ✓ vacuously', ok: true, why: 'The invariant’s base case must hold at i = 0, where best claims to be the max of an empty prefix — the identity for max, vacuous truth doing real engineering work.' },
            { t: 'It is the smallest float, avoiding overflow', ok: false, mis: 'perf-explains-semantics', why: 'Nothing to do with numeric limits — the value is chosen so the invariant’s base case holds. (best = items[0] with the loop from i = 1 is the other correct choice: a different base case.)' },
            { t: 'Convention — accumulators start at extreme values', ok: false, why: 'The convention EXISTS because of the invariant: start each accumulator at its operation’s identity (0 for sum, 1 for product, −∞ for max) so the empty-prefix claim is true.' }
          ],
          hints: ['State the invariant at i = 0: best = max of items[0..0) — of nothing.', 'What value makes "max of nothing" true? The identity of max.'],
          edge: 'Identity elements (0, 1, −∞, ∅, "") are all base cases of invariants — the same reason reduce() takes an initial value.'
        }
      ]
    }
  }
};
