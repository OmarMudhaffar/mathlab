/* Track 1 — BOSS: Power the Control Unit */
window.NODES['boss.gatework'] = {
  id: 'boss.gatework', num: '1.B', trackId: 'logic', boss: true,
  title: 'BOSS — Power the Control Unit',
  minutes: 25,
  payoff: 'Gatework comes online',
  intro: `
<h4>System integration test</h4>
<p>The Gatework hums at standby. Five integration checks stand between you and power-on — each one crosses wires between nodes you have mastered: negation through quantifiers, contrapositive reasoning, rewriting proofs, counting subsets, and one live fabrication.</p>
<div class="callout amber"><p><b>Boss rules:</b> five challenges, pass four. Hints exist but run cold — you get the ladder, but each rung costs more here. If the run fails, the machine reports which subsystem faltered; review it and return.</p></div>`,
  levels: {
    boss: {
      passNeed: 4,
      questions: [
        {
          type: 'mcq',
          prompt: `<b>Integration 1 — negation across the board.</b><br>Ops rule: "Every server has a backup <b>and</b> a monitor." The rule just FAILED. What do you know?`,
          options: [
            { t: 'Some server lacks a backup or lacks a monitor', ok: true, why: '¬∀x (B(x) ∧ M(x)) ≡ ∃x ¬(B(x) ∧ M(x)) ≡ ∃x (¬B(x) ∨ ¬M(x)) — quantifier flip, then De Morgan. One server, one missing thing, is all a failure guarantees.' },
            { t: 'Some server lacks both a backup and a monitor', ok: false, mis: 'negate-keep-and', why: 'De Morgan skipped: ¬(B ∧ M) is ¬B ∨ ¬M. The failing server might have a perfectly good monitor and no backup.' },
            { t: 'Every server lacks a backup or a monitor', ok: false, mis: 'negate-all-to-none', why: 'The quantifier must flip when negation crosses it: ¬∀ is ∃¬, not ∀¬. "Not all compliant" is one exception, not universal failure.' }
          ],
          hints: ['Two layers to negate: the ∀ outside, the ∧ inside.', '¬∀ ≡ ∃¬ first; then push ¬ through the ∧ with De Morgan.', '∃ server: ¬backup ∨ ¬monitor.'],
          edge: 'This composite move — flip the quantifier, then De Morgan the predicate — is the single most-used negation pattern in specs and alert conditions.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 2 — the detective’s move.</b><br>Invariant: "If a request is authenticated, it appears in the audit log." A request is <b>missing</b> from the log. Assuming the invariant holds, conclude:`,
          options: [
            { t: 'That request was not authenticated', ok: true, why: 'Contrapositive: (auth → logged) ≡ (¬logged → ¬auth). The absence of the guaranteed consequence rules out the trigger.' },
            { t: 'That request was authenticated but the log dropped it', ok: false, why: 'That scenario is exactly the broken-promise row (auth ∧ ¬logged) — excluded by assuming the invariant holds.' },
            { t: 'Nothing — the invariant says nothing about unlogged requests', ok: false, mis: 'contrapositive-blind', why: 'It speaks precisely through its contrapositive — equivalent, always available, and the daily reasoning move of every debugger: expected effect absent, therefore cause absent.' }
          ],
          hints: ['Write it as p → q. You observed ¬q.', '¬q → ¬p is free — it is the same statement.'],
          edge: 'The converse trap in the same setting: "it IS in the log, so it was authenticated" — invalid, unless logging happens nowhere else.'
        },
        {
          type: 'order',
          prompt: `<b>Integration 3 — rewriting proof.</b><br>Arrange the proof that ¬(¬p ∨ ¬q) ≡ p ∧ q.`,
          steps: [
            'Start: ¬(¬p ∨ ¬q)',
            'De Morgan on the ∨: ¬(¬p) ∧ ¬(¬q)',
            'Double negation, twice: p ∧ q'
          ],
          hints: ['The outer ¬ meets an ∨ — which law fires first?', 'After De Morgan you hold two double negations.', 'De Morgan, then double negation on each part.'],
          why: 'Read backwards, this is why AND can be built from OR and NOT alone — the fact that lets NAND gates implement every circuit on the planet.'
        },
        {
          type: 'input',
          prompt: `<b>Integration 4 — counting the state space.</b><br>A permission system has 4 independent grants. Counting the empty grant and full access, how many distinct permission sets exist?`,
          accept: ['16'],
          placeholder: '…',
          hints: ['Each grant is one in/out choice.', 'Permission sets are subsets of the grant set — count the power set.', '|P(S)| = 2⁴.'],
          why: '2⁴ = 16 — the power set of the grant set, and exactly why 4 permission bits fit in half a byte.',
          edge: 'Same count, three costumes now: truth-table rows, subsets, bitmask states. That triple identity IS the finale of Track 1.'
        },
        {
          type: 'boolExpr',
          vars: ['a', 'b', 'c'],
          target: '(!a || b) && (b || c)',
          prompt: `<b>Integration 5 — fabrication under load.</b><br>Health rule for the Gatework, three signals: <code>a</code> = alarm raised, <code>b</code> = backup power live, <code>c</code> = coolant flowing.<br>The system is healthy when <b>both</b> conditions hold: <i>if the alarm is raised then backup power is live</i>, <b>and</b> <i>at least one of backup power or coolant is active</i>.<br>Forge the expression.`,
          placeholder: 'combine a, b, c …',
          hints: ['Two clauses joined by && — build each separately.', 'Clause 1 is an implication: compile a → b the 1.4 way.', '(!a || b) && (b || c).'],
          why: 'a → b compiles to !a || b; conjoin with the disjunction b || c. The forge verified all 2³ = 8 signal combinations — your first three-variable circuit.',
          edge: 'Note b pulls double duty across the clauses — real spec conditions overlap like this, and only the full truth table (all 8 rows) confirms you got every corner.'
        }
      ]
    }
  }
};
