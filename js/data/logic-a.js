/* Track 1 content — nodes 1.1 and 1.2 */

/* ============ 1.1 PROPOSITIONS & CONNECTIVES ============ */
window.NODES['logic.props'] = {
  id: 'logic.props', num: '1.1', trackId: 'logic',
  title: 'Propositions & Connectives',
  minutes: 30,
  payoff: 'if-conditions · short-circuit evaluation',
  levels: {

    l1: {
      widget: 'truthlab',
      html: `
<h4>Statements are switches</h4>
<p>A <span class="term">proposition</span> is any statement that is definitely true or definitely false — a switch that is ON or OFF. "Barcelona is in Spain" — ON. "2 + 2 = 5" — OFF. "Close the door!" — not a switch at all: commands and questions have no truth value.</p>
<p>Logic is what happens when you wire switches together. A <span class="term">connective</span> is a gate that combines switch signals into one output lamp:</p>
<ul>
  <li><b>AND (∧)</b> — the strict gate: the lamp lights only if <em>both</em> inputs are on.</li>
  <li><b>OR (∨)</b> — the generous gate: lights if <em>at least one</em> input is on. (Both on still counts!)</li>
  <li><b>NOT (¬)</b> — the rebel: flips whatever it receives.</li>
  <li><b>XOR (⊕)</b> — the picky gate: lights only if <em>exactly one</em> input is on.</li>
</ul>
<div class="callout amber"><p><b>Try the gate bench below.</b> Pick a gate, flip the switches, watch the lamp. The highlighted row of the table is the situation you built. Find the input combo where OR and XOR disagree.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Which of these is a <b>proposition</b> (definitely true or definitely false)?`,
          options: [
            { t: 'Barcelona is in Spain.', ok: true, why: 'It has a definite truth value (true) — that makes it a proposition, whether or not you know the answer.' },
            { t: 'Close the door!', ok: false, mis: 'command-as-statement', why: 'Tempting because it is a full sentence — but a command is neither true nor false, so it has no truth value.' },
            { t: 'x + 1 = 5', ok: false, mis: 'open-formula', why: 'Sneaky one: its truth depends on x. Until x is fixed, it is an open formula, not a proposition. (This gap is exactly what predicates fix in node 1.3.)' },
            { t: 'What time is it?', ok: false, why: 'Questions ask for information; they cannot themselves be true or false.' }
          ],
          hints: ['Which of these could you honestly label ON or OFF?', 'A proposition must have a definite truth value all by itself — no missing information, no requests.']
        },
        {
          type: 'mcq',
          prompt: `You wire two switches into an <b>AND</b> gate. When does the lamp light?`,
          options: [
            { t: 'Only when both switches are on', ok: true, why: 'AND is the strict gate: p ∧ q is true only in the one case p = T, q = T.' },
            { t: 'When at least one switch is on', ok: false, mis: 'and-or-swap', why: 'Tempting because everyday "and" is loose — but "at least one" is the OR gate. AND demands both.' },
            { t: 'When exactly one switch is on', ok: false, why: 'That is XOR, the picky gate.' }
          ],
          hints: ['Flip the widget to AND and try all four switch combinations.', 'Out of the four input combinations, AND lights the lamp in exactly one of them.']
        },
        {
          type: 'mcq',
          prompt: `Both switches are ON and the gate is <b>XOR (⊕)</b>. Lamp?`,
          options: [
            { t: 'Dark — XOR needs exactly one on', ok: true, why: 'T ⊕ T = F. "Exactly one" fails when both are on — that is the whole difference between XOR and OR.' },
            { t: 'Lit — two on is at least one on', ok: false, mis: 'xor-or-swap', why: 'Tempting because that rule is real — for OR. XOR is stricter: both-on is too many.' },
            { t: 'Lit — XOR rewards matching inputs', ok: false, why: 'Backwards: XOR lights on a mismatch. Matching inputs (both on or both off) leave it dark. XOR is really a difference detector.' }
          ],
          hints: ['XOR = eXclusive OR: one or the other but not both.', 'Set the widget to XOR with both switches on and look at the highlighted row.'],
          edge: 'XOR is a difference detector: a ⊕ b is true exactly when a ≠ b. That reading will matter in code.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Definitions</h4>
<p>A <span class="term">proposition</span> is a declarative sentence with exactly one truth value, <b>T</b> or <b>F</b>. Propositional variables p, q, r stand for propositions. A <span class="term">compound proposition</span> combines them with connectives:</p>
<div class="tbl-scroll"><table class="tt">
  <tr><th>p</th><th>q</th><th>¬p</th><th>p ∧ q</th><th>p ∨ q</th><th>p ⊕ q</th></tr>
  <tr><td class="T">T</td><td class="T">T</td><td class="F">F</td><td class="T">T</td><td class="T">T</td><td class="F">F</td></tr>
  <tr><td class="T">T</td><td class="F">F</td><td class="F">F</td><td class="F">F</td><td class="T">T</td><td class="T">T</td></tr>
  <tr><td class="F">F</td><td class="T">T</td><td class="T">T</td><td class="F">F</td><td class="T">T</td><td class="T">T</td></tr>
  <tr><td class="F">F</td><td class="F">F</td><td class="T">T</td><td class="F">F</td><td class="F">F</td><td class="F">F</td></tr>
</table></div>
<p>Note ∨ is <em>inclusive</em>: both-true counts. Mathematics always means inclusive or unless it says "exactly one".</p>
<h4>Truth tables</h4>
<p>A <span class="term">truth table</span> lists the output for <em>every</em> input assignment. With n variables there are <b>2ⁿ rows</b> — each variable doubles the cases. This is why truth tables are a complete, mechanical proof method for propositional logic: check all rows, and there is nothing left to argue.</p>
<p>A proposition true in every row is a <span class="term">tautology</span> (e.g. p ∨ ¬p); false in every row, a <span class="term">contradiction</span> (e.g. p ∧ ¬p); otherwise it is a <span class="term">contingency</span>.</p>
<div class="callout"><p><b>Convention:</b> ¬ binds tightest, then ∧, then ∨. So ¬p ∧ q ∨ r means ((¬p) ∧ q) ∨ r. When in doubt, parenthesize — in logic and in code.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A compound proposition uses variables p, q, r. How many rows does its full truth table need?`,
          options: [
            { t: '8', ok: true, why: '2 × 2 × 2 = 2³ = 8. Each variable independently doubles the number of assignments.' },
            { t: '6', ok: false, mis: 'linear-growth', why: 'Tempting as 2 · 3 — but assignments multiply, they do not add. Growth is exponential: 2ⁿ.' },
            { t: '9', ok: false, mis: 'square-growth', why: 'That is 3² — squaring the count of variables. The base is 2 (truth values) and the variable count is the exponent: 2³.' },
            { t: '3', ok: false, why: 'Three variables, but each row must fix all three at once — count the combinations, not the variables.' }
          ],
          hints: ['How many choices per variable? How do choices combine?', 'One variable: 2 rows. Two variables: 4. Each new variable does what to the count?', 'The formula is 2ⁿ for n variables.'],
          edge: 'This 2ⁿ blow-up is why brute-forcing all inputs of a 64-bit condition is hopeless — and why SAT solvers are clever instead of exhaustive.'
        },
        {
          type: 'mcq',
          prompt: `Evaluate ¬(p ∧ q) when p = T and q = F.`,
          options: [
            { t: 'T', ok: true, why: 'Inside first: p ∧ q = T ∧ F = F. Then negate: ¬F = T.' },
            { t: 'F', ok: false, mis: 'negate-parts', why: 'Tempting if you negated p alone (¬p = F) and stopped. The ¬ applies to the whole parenthesis — evaluate inside first, flip last.' }
          ],
          hints: ['Work inside-out, like arithmetic with parentheses.', 'Step 1: what is p ∧ q with these values? Step 2: negate that.', 'p ∧ q = F, and ¬F = T.']
        },
        {
          type: 'mcq',
          prompt: `For which assignment is p ∨ q <b>false</b>?`,
          options: [
            { t: 'Only p = F, q = F', ok: true, why: 'OR fails only when every disjunct fails — one row out of four.' },
            { t: 'Whenever p and q disagree', ok: false, mis: 'or-xor-swap', why: 'Disagreement is XOR territory. Inclusive OR is happy with any true input, agreeing or not.' },
            { t: 'Whenever at least one is F', ok: false, mis: 'and-or-swap', why: 'That is when p ∧ q fails. OR is the generous gate — it takes more to kill it: all inputs must be F.' }
          ],
          hints: ['OR asks: is at least one input true?', 'To make "at least one true" fail, how many inputs must be false?'],
          edge: 'Generalizes: a big OR of 50 conditions is false only in the single case where all 50 fail. Its negation is a big AND — De Morgan, next node.'
        },
        {
          type: 'input',
          prompt: `A truth table has <b>5 variables</b>. How many rows? (Enter a number.)`,
          accept: ['32'],
          placeholder: '…',
          hints: ['Each variable doubles the row count.', '2 → 4 → 8 → 16 → …', '2⁵ = 32.'],
          why: '2⁵ = 32. Ten variables would already need 1,024 rows — exponential growth arrives fast.'
        },
        {
          type: 'mcq',
          prompt: `Classify p ∨ ¬p.`,
          options: [
            { t: 'Tautology — true in every row', ok: true, why: 'If p = T the left side fires; if p = F the right side does. No row escapes. (The classical "law of excluded middle".)' },
            { t: 'Contingency — depends on p', ok: false, mis: 'row-vs-table', why: 'Tempting because p itself varies — but classify the whole expression by its output column, and that column is all T.' },
            { t: 'Contradiction — a statement and its negation', ok: false, why: 'A statement AND its negation (p ∧ ¬p) is the contradiction. With OR, one of the two is always there to save it.' }
          ],
          hints: ['Build the two-row truth table for it.', 'Row p = T: output? Row p = F: output?', 'Both rows give T — what do we call that?']
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Booleans are the propositions of code</h4>
<p>JavaScript ships the whole node so far as operators:</p>
<div class="tbl-scroll"><table class="tt">
  <tr><th>Logic</th><th>JS</th><th>Reads as</th></tr>
  <tr><td>p ∧ q</td><td>a && b</td><td>both</td></tr>
  <tr><td>p ∨ q</td><td>a || b</td><td>at least one</td></tr>
  <tr><td>¬p</td><td>!a</td><td>flip</td></tr>
  <tr><td>p ⊕ q</td><td>a !== b</td><td>exactly one (difference detector!)</td></tr>
</table></div>
<h4>Short-circuit: the gate that refuses to look</h4>
<p><code>&&</code> and <code>||</code> evaluate left to right and <b>stop as soon as the answer is decided</b>. <code>false && f()</code> never calls <code>f</code> — a false left side already settles AND. <code>true || g()</code> never calls <code>g</code>. This is not a micro-optimization; it is a control-flow idiom you will read daily:</p>
<pre><code>// safe: the length check runs only if user exists
if (user && user.name.length > 0) { ... }</code></pre>
<p><b>Precedence:</b> <code>!</code> binds tightest, then <code>&&</code>, then <code>||</code> — exactly ¬, ∧, ∨. So <code>a && b || c</code> is <code>(a && b) || c</code>. When mixing them, parenthesize for the next human.</p>
<div class="callout"><p>The fabrication challenge below includes the <b>expression forge</b>: you write a JS expression, the lab evaluates it against every input combination — a machine-checked truth table of your own code.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `What does this print?<br><code>console.log(true && false || true)</code>`,
          options: [
            { t: 'true', ok: true, why: '&& binds tighter: (true && false) = false, then false || true = true.' },
            { t: 'false', ok: false, mis: 'precedence-ltr', why: 'Tempting to read strictly left-to-right as true && (false || true) — but && groups first, like × before + in arithmetic.' },
            { t: 'SyntaxError', ok: false, why: 'Mixing && and || is legal (if unkind to readers). Precedence resolves it: && first.' }
          ],
          hints: ['Which binds tighter, && or ||?', 'Parenthesize it the way JS sees it, then evaluate inside-out.', 'JS sees (true && false) || true.']
        },
        {
          type: 'mcq',
          prompt: `<code>function f() { console.log("called!"); return true; }</code><br>How many times does <code>"called!"</code> print when this runs?<br><code>false && f();  true || f();  true && f();</code>`,
          options: [
            { t: 'Once — only the third expression calls f', ok: true, why: 'false && … short-circuits (AND already lost). true || … short-circuits (OR already won). Only true && f() must actually consult f.' },
            { t: 'Three times — f appears three times', ok: false, mis: 'no-short-circuit', why: 'Tempting because f is written three times — but && and || stop evaluating the moment the result is decided. Appearing in source is not the same as running.' },
            { t: 'Twice — the && lines call it', ok: false, why: 'The first && never reaches f: a false left side settles AND instantly.' }
          ],
          hints: ['For each expression ask: is the result already decided by the left side?', 'false && anything is already false. true || anything is already true.', 'Only true && f() leaves the answer hanging on f.'],
          edge: 'Real-world consequence: side effects in the right side of && / || may silently never run. Bugs love hiding there.'
        },
        {
          type: 'boolExpr',
          vars: ['a', 'b'],
          target: '(a || b) && !(a && b)',
          prompt: `<b>Expression forge.</b> Two status flags <code>a</code> and <code>b</code>. Write a JS expression that is <code>true</code> exactly when <b>exactly one</b> of them is true (XOR). Use <code>a</code>, <code>b</code>, <code>&&</code>, <code>||</code>, <code>!</code>, parentheses — or any other boolean trick you know.`,
          placeholder: 'e.g.  (a || b) && …',
          hints: ['"Exactly one" = at least one, but not both.', 'Translate directly: (at least one) AND NOT (both).', '(a || b) && !(a && b) — or the difference-detector shortcut: a !== b.'],
          why: 'Any expression with the XOR truth table passes: (a || b) && !(a && b), a !== b, (a && !b) || (!a && b) — equivalent circuits, different wirings.',
          edge: 'The forge checked your expression on all 4 input rows — a truth table is exactly an exhaustive test suite over booleans.'
        }
      ]
    }
  }
};

/* ============ 1.2 EQUIVALENCE & DE MORGAN ============ */
window.NODES['logic.demorgan'] = {
  id: 'logic.demorgan', num: '1.2', trackId: 'logic',
  title: 'Equivalence & De Morgan',
  minutes: 30,
  payoff: 'refactoring conditionals · negating guards',
  levels: {

    l1: {
      html: `
<h4>Different wiring, same machine</h4>
<p>Two circuits are <span class="term">equivalent</span> if you cannot tell them apart from outside: same lamp output for <em>every</em> switch combination. The wiring inside may look totally different — behavior is what counts.</p>
<p>Why care? Because you can swap a tangled circuit for a clean equivalent one. That is what "simplifying an expression" means, and it is precisely what you do when refactoring an <code>if</code>.</p>
<h4>The negation flip</h4>
<p>How do you say a compound statement is <em>false</em>? Everyday intuition often botches this. "The fridge has milk <b>and</b> eggs" — when is that false? Not only when both are missing! It fails when <em>at least one</em> is missing: no milk <b>or</b> no eggs.</p>
<div class="callout amber"><p><b>De Morgan's flip:</b> pushing NOT through a gate flips the gate. NOT(both) = at least one missing. NOT(at least one) = both missing. AND ⇄ OR, and the NOT lands on each part.</p></div>
<p>Check it against the machine: an AND gate's lamp is dark in 3 of 4 rows — exactly the rows where "no milk OR no eggs" holds.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `What must you check to be <b>sure</b> two circuits are equivalent?`,
          options: [
            { t: 'Same output on every possible input combination', ok: true, why: 'Equivalence is defined behaviorally: identical output columns in the truth table. All rows, no exceptions.' },
            { t: 'Same output on a couple of test inputs', ok: false, mis: 'testing-proves', why: 'Tempting — it is how we often test code! But passing some rows proves nothing about the rest. Circuits differing in one row of sixteen pass most spot checks.' },
            { t: 'Same number of gates inside', ok: false, why: 'Internals are irrelevant: p and ¬¬¬¬p have very different gate counts and identical behavior.' }
          ],
          hints: ['Equivalence is about behavior, not appearance.', 'How many input rows would you need to check to leave no room for doubt?']
        },
        {
          type: 'mcq',
          prompt: `"The fridge has milk AND eggs" is <b>false</b>. What do you actually know?`,
          options: [
            { t: 'It is missing milk, or missing eggs (possibly both)', ok: true, why: 'For AND to fail, one failure suffices. ¬(m ∧ e) ≡ ¬m ∨ ¬e — the NOT distributes and the AND flips to OR.' },
            { t: 'It is missing milk and missing eggs', ok: false, mis: 'negate-keep-and', why: 'The classic slip: negating both parts but keeping AND. That claims an emptier fridge than you can prove — maybe only the milk is gone.' },
            { t: 'It has milk but no eggs', ok: false, why: 'That is one way AND can fail, but not the only one. The negation must cover every failing case.' }
          ],
          hints: ['How many missing items does it take to break "milk AND eggs"?', 'One missing item breaks it. So the negation says: at least one is missing — which connective is that?']
        },
        {
          type: 'mcq',
          prompt: `"It is not the case that it is not raining." So…?`,
          options: [
            { t: 'It is raining — the two NOTs cancel', ok: true, why: 'Double negation: ¬¬p ≡ p. Two flips of a switch land it back where it started.' },
            { t: 'It is not raining — NOTs pile up', ok: false, mis: 'negation-accumulates', why: 'Tempting because the sentence sounds negative — but each ¬ is a flip, and two flips undo each other.' },
            { t: 'Cannot tell — the sentence is ambiguous', ok: false, why: 'Convoluted, yes; ambiguous, no. Strip the pairs of negations mechanically: ¬¬p is just p.' }
          ],
          hints: ['Treat each "not" as one flip of the switch.', 'Start at raining = ?, flip twice, where do you land?']
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Logical equivalence</h4>
<p>p ≡ q means p and q have identical truth-table columns — equivalently, p ↔ q is a tautology. Because equivalence is checkable row by row, every law below can be <em>proved</em> with a small table. The working set:</p>
<div class="tbl-scroll"><table class="tt">
  <tr><th>Law</th><th>Statement</th></tr>
  <tr><td style="text-align:left">Double negation</td><td>¬¬p ≡ p</td></tr>
  <tr><td style="text-align:left">Idempotent</td><td>p ∧ p ≡ p&nbsp;&nbsp;·&nbsp;&nbsp;p ∨ p ≡ p</td></tr>
  <tr><td style="text-align:left">Identity</td><td>p ∧ T ≡ p&nbsp;&nbsp;·&nbsp;&nbsp;p ∨ F ≡ p</td></tr>
  <tr><td style="text-align:left">Domination</td><td>p ∧ F ≡ F&nbsp;&nbsp;·&nbsp;&nbsp;p ∨ T ≡ T</td></tr>
  <tr><td style="text-align:left">Commutative</td><td>p ∧ q ≡ q ∧ p&nbsp;&nbsp;·&nbsp;&nbsp;p ∨ q ≡ q ∨ p</td></tr>
  <tr><td style="text-align:left">Distributive</td><td>p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)</td></tr>
  <tr><td style="text-align:left"><b>De Morgan</b></td><td><b>¬(p ∧ q) ≡ ¬p ∨ ¬q&nbsp;&nbsp;·&nbsp;&nbsp;¬(p ∨ q) ≡ ¬p ∧ ¬q</b></td></tr>
  <tr><td style="text-align:left">Complement</td><td>p ∨ ¬p ≡ T&nbsp;&nbsp;·&nbsp;&nbsp;p ∧ ¬p ≡ F</td></tr>
</table></div>
<h4>Two proof styles</h4>
<p><b>By truth table:</b> exhaustive, mechanical, always works — 2ⁿ rows. <b>By rewriting:</b> chain known laws, one per step, like algebra. Example:</p>
<pre><code>¬(p ∧ ¬q)
≡ ¬p ∨ ¬¬q     (De Morgan)
≡ ¬p ∨ q       (double negation)</code></pre>
<p>Rewriting scales where tables cannot (20 variables = a million rows), and each step names its justification — your first taste of formal proof.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `De Morgan: ¬(p ∨ q) is equivalent to…`,
          options: [
            { t: '¬p ∧ ¬q', ok: true, why: 'NOT pushes onto each part and the OR flips to AND: "neither" means both fail.' },
            { t: '¬p ∨ ¬q', ok: false, mis: 'negate-keep-gate', why: 'The classic half-flip: negating the parts but forgetting to flip the gate. ¬p ∨ ¬q is the negation of p ∧ q, not of p ∨ q.' },
            { t: 'p ∧ q', ok: false, why: 'Check row p=T, q=T: ¬(T ∨ T) = F but T ∧ T = T. One disagreeing row kills an equivalence.' }
          ],
          hints: ['"Not (at least one)" means how many of them are true?', 'Zero of them true — so both are false. Which connective states both?', 'Both false: ¬p ∧ ¬q. The ∨ flipped to ∧.'],
          edge: 'Both De Morgan laws generalize to n terms: ¬(p₁ ∨ … ∨ pₙ) ≡ ¬p₁ ∧ … ∧ ¬pₙ.'
        },
        {
          type: 'mcq',
          prompt: `Which law justifies p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)?`,
          options: [
            { t: 'Distributive', ok: true, why: '∧ distributes over ∨ exactly like × over +: a(b + c) = ab + ac. (Unlike arithmetic, logic also distributes the other way: ∨ over ∧.)' },
            { t: 'Associative', ok: false, mis: 'law-name-mixup', why: 'Associativity regroups the same connective: (p ∧ q) ∧ r ≡ p ∧ (q ∧ r). Here two different connectives interact — that is distribution.' },
            { t: 'De Morgan', ok: false, why: 'No negation in sight — De Morgan is about pushing ¬ through a gate.' }
          ],
          hints: ['Compare with arithmetic: a × (b + c) = ?', 'One operation is being pushed through another — which law does that in algebra?']
        },
        {
          type: 'mcq',
          prompt: `Classify (p ∧ ¬p) ∨ (q ∧ ¬q).`,
          options: [
            { t: 'Contradiction — always false', ok: true, why: 'Each half is a complement-law contradiction (F), and F ∨ F = F in every row.' },
            { t: 'Tautology — it covers p and q', ok: false, mis: 'or-means-true', why: 'Tempting because OR feels generous — but OR of two guaranteed-false things is guaranteed false. Coverage of variables is not truth.' },
            { t: 'Contingency — depends on p and q', ok: false, why: 'Try any row: each conjunct contains a variable and its own negation, so both halves die every time. No dependence survives.' }
          ],
          hints: ['Evaluate p ∧ ¬p on its own first.', 'Both disjuncts are always F. What is F ∨ F?'],
          edge: 'In code: if (x > 0 && x <= 0) is dead code — a linter finds it by spotting exactly this pattern.'
        },
        {
          type: 'order',
          prompt: `Arrange the rewriting proof that ¬(p ∧ ¬q) ≡ ¬p ∨ q into the correct order.`,
          steps: [
            'Start: ¬(p ∧ ¬q)',
            'Apply De Morgan: ¬p ∨ ¬(¬q)',
            'Apply double negation: ¬p ∨ q'
          ],
          hints: ['A rewriting proof starts from the expression being transformed.', 'De Morgan must fire before double negation — the ¬¬ only appears after the NOT is pushed inside.', 'Start → De Morgan → double negation.'],
          why: 'Each line is the previous line transformed by exactly one named law — that is what makes it a proof rather than a claim.'
        },
        {
          type: 'mcq',
          prompt: `Simplify (p ∧ q) ∨ (p ∧ ¬q) as far as possible.`,
          options: [
            { t: 'p', ok: true, why: 'Factor out p (distributive, backwards): p ∧ (q ∨ ¬q) ≡ p ∧ T ≡ p. Whether q holds or not, p alone decides.' },
            { t: 'q', ok: false, mis: 'wrong-survivor', why: 'q appears in both halves but once plain and once negated — q is exactly the part that cancels out.' },
            { t: 'p ∧ q', ok: false, why: 'Too strong: the row p=T, q=F makes the original true (second half) but p ∧ q false.' },
            { t: 'It is already simplest', ok: false, why: 'Factor it: both halves share p, and what remains is q ∨ ¬q ≡ T.' }
          ],
          hints: ['Both disjuncts share a common factor — pull it out.', 'p ∧ (q ∨ ¬q). Now what is q ∨ ¬q?', 'p ∧ T ≡ p by the identity law.'],
          edge: 'This is real refactoring: if (p && q) … else if (p && !q) … doing the same thing collapses to if (p).'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>De Morgan is a refactoring tool</h4>
<p>Every time you negate a compound condition, De Morgan is the law keeping you honest:</p>
<pre><code>// "not (admin and active)" — push the ! through:
if (!(user.isAdmin && user.isActive))
// ≡  gate flips, ! lands on each part:
if (!user.isAdmin || !user.isActive)</code></pre>
<p>The second form usually reads better ("missing a requirement") and short-circuits earlier. Linters even auto-suggest this rewrite.</p>
<h4>Negating comparisons</h4>
<p>When the parts are comparisons, the ! dissolves <em>into</em> them: <code>!(x &gt; 5)</code> is <code>x &lt;= 5</code> — not <code>x &lt; 5</code>! Negation of "greater" includes "equal". So:</p>
<pre><code>!(x > 5 && y > 5)   ≡   x <= 5 || y <= 5</code></pre>
<div class="callout"><p><b>Boundary discipline:</b> off-by-one bugs at the = boundary are a top source of real defects. When you flip a comparison, say the boundary out loud: "greater than 5 fails means: 5 or less."</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Refactor <code>!(order.isPaid && order.isShipped)</code> into an equivalent condition without the outer <code>!</code>.`,
          options: [
            { t: '<code>!order.isPaid || !order.isShipped</code>', ok: true, why: 'De Morgan: NOT lands on each part, && flips to ||. "Not fully processed" = unpaid or unshipped.' },
            { t: '<code>!order.isPaid && !order.isShipped</code>', ok: false, mis: 'negate-keep-gate', why: 'The half-flip again — this demands both failures, but the original fires on just one. These differ whenever exactly one flag is false.' },
            { t: '<code>order.isPaid || order.isShipped</code>', ok: false, why: 'The parts must be negated too — dropping the NOTs entirely gives nearly the opposite meaning.' }
          ],
          hints: ['Push the ! onto each operand; flip the operator between them.', '&& becomes ||, and each flag gets its own !.']
        },
        {
          type: 'mcq',
          prompt: `Which condition is equivalent to <code>!(x > 5 && y > 5)</code>?`,
          options: [
            { t: '<code>x <= 5 || y <= 5</code>', ok: true, why: 'De Morgan flips && to ||, and each !(v > 5) dissolves into v <= 5 — the boundary 5 crosses to the other side.' },
            { t: '<code>x < 5 || y < 5</code>', ok: false, mis: 'boundary-drop', why: 'The gate flip is right but the comparison flip lost the boundary: x = 5 makes x > 5 false, so the negation must include 5. !(x > 5) is x <= 5.' },
            { t: '<code>x <= 5 && y <= 5</code>', ok: false, mis: 'negate-keep-gate', why: 'Comparisons flipped correctly, but && must become ||. Test x=10, y=0: original is true, this is false.' }
          ],
          hints: ['Two flips must happen: the && between, and each comparison.', 'What exactly is the negation of x > 5 — where does x = 5 land?', '!(x > 5) ≡ x <= 5, and De Morgan turns && into ||.'],
          edge: 'The boundary case x = 5 is the whole difference between <= and < here — one character, one real bug.'
        },
        {
          type: 'boolExpr',
          vars: ['a', 'b'],
          target: '!a && !b',
          forbid: ['!('],
          prompt: `<b>Expression forge.</b> Rewrite <code>!(a || b)</code> ("neither flag is set") <b>without negating a compound</b> — the sequence <code>!(</code> is banned. Use only <code>!a</code>, <code>!b</code>, <code>&&</code>, <code>||</code>.`,
          placeholder: 'your equivalent expression…',
          hints: ['De Morgan: push the ! inside, flip the gate.', '"Neither is set" means: a is off AND b is off.', '!a && !b.'],
          why: '¬(a ∨ b) ≡ ¬a ∧ ¬b — the forge verified your wiring against all four rows.',
          edge: 'Also equivalent (cute): a === false && b === false, or !(a) && !(b) — but the clean De Morgan form is what reviewers expect.'
        }
      ]
    }
  }
};
