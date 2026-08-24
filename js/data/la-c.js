/* Track 3 content — nodes 3.5 and 3.6 */

/* ============ 3.5 LINEAR SYSTEMS & GAUSSIAN ELIMINATION ============ */
window.NODES['la.systems'] = {
  id: 'la.systems', num: '3.5', trackId: 'linear-algebra',
  title: 'Linear Systems & Gaussian Elimination',
  minutes: 35,
  payoff: 'constraint solving · fitting models',
  levels: {

    l1: {
      html: `
<h4>Where constraints meet</h4>
<p>"x + y = 5 and 2x + 3y = 12" — two facts about the same unknowns. Each equation draws a line of candidates; the <span class="term">solution</span> is where the lines <em>intersect</em>: the one point satisfying both. Solving systems is geometry: finding the meeting point of constraints.</p>
<p>Two lines in a plane can meet three ways — and so, therefore, can any 2×2 system:</p>
<ul>
  <li><b>One point</b> — the generic case: a unique solution.</li>
  <li><b>Never</b> (parallel lines) — contradictory constraints: no solution.</li>
  <li><b>Everywhere</b> (the same line twice) — redundant constraints: infinitely many solutions.</li>
</ul>
<div class="callout amber"><p><b>The solving strategy</b> is honest bookkeeping: combine equations to <em>cancel</em> unknowns. Subtract twice the first equation from the second and x vanishes — leaving a one-unknown equation you can just read. Simplify without changing the answer: that discipline is the whole algorithm.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Geometrically, solving a 2-equation, 2-unknown linear system means…`,
          options: [
            { t: 'Finding where two lines intersect', ok: true, why: 'Each equation is a line of candidate (x,y) pairs; a solution must lie on both — the intersection. Algebra problems with geometric bodies: the theme of this whole track.' },
            { t: 'Finding the midpoint between two lines', ok: false, why: 'Midpoints average; solutions SATISFY. A point between the lines satisfies neither equation — check it against either one.' },
            { t: 'Measuring the angle between two lines', ok: false, why: 'The angle exists but answers a different question. Solutions are about shared points, not inclination.' }
          ],
          hints: ['What does the set of (x,y) with x + y = 5 look like?', 'A line. A solution must sit on BOTH such lines.']
        },
        {
          type: 'mcq',
          prompt: `The system "x + y = 2 and x + y = 7" has…`,
          options: [
            { t: 'No solution — the same left side cannot equal 2 and 7 at once; parallel lines never meet', ok: true, why: 'Subtracting gives 0 = 5, a contradiction (1.4’s proof-by-contradiction, live). Geometrically: two parallel lines, offset — no shared point.' },
            { t: 'The solution x = 2, y = 7', ok: false, mis: 'read-off-rhs', why: 'Check it: 2 + 7 = 9, satisfying neither equation. Right-hand sides are not solutions — plugging back in is the universal detector for this slip.' },
            { t: 'Infinitely many — two equations, two unknowns always works out', ok: false, why: 'Counting equations is not enough; they must be CONSISTENT. These two contradict — the count was fine, the content wasn’t.' }
          ],
          hints: ['Can one number x + y be both 2 and 7?', 'Draw both lines: same slope, different height.']
        },
        {
          type: 'mcq',
          prompt: `The system "x + y = 3 and 2x + 2y = 6" has…`,
          options: [
            { t: 'Infinitely many solutions — the second equation is the first in disguise', ok: true, why: 'Double the first and you GET the second: one constraint wearing two costumes. One line, drawn twice — every point on it solves the system. Redundancy ≠ information.' },
            { t: 'Exactly one solution, since there are two equations', ok: false, mis: 'count-equals-constraint', why: 'Two equations, but only ONE independent constraint — the second adds nothing new. Effective constraints, not written lines, decide the outcome (a preview of rank, next node).' },
            { t: 'No solution — the numbers differ', ok: false, why: 'The numbers differ by a consistent factor of 2 — that is agreement, not conflict. Conflict would be 2x + 2y = 7.' }
          ],
          hints: ['Multiply the first equation by 2 and compare.', 'Identical constraint — how many distinct lines are there really?'],
          edge: 'The three outcomes (one/none/many) are the ONLY possibilities for any linear system, any size — never exactly two solutions, never five. Linearity forbids in-between counts.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Gaussian elimination</h4>
<p>Write the system as an <span class="term">augmented matrix</span> — coefficients plus right-hand side — and simplify with exactly three <span class="term">row operations</span>:</p>
<ol>
  <li>swap two rows,</li>
  <li>multiply a row by a <b>nonzero</b> constant,</li>
  <li>add a multiple of one row to another.</li>
</ol>
<p><b>Why these three?</b> Each is <em>reversible</em>, so the new system has exactly the same solutions — "same solution set" is an equivalence between systems (1.6 again), and the row ops move you within one class. (Multiplying by zero is banned because it is irreversible: it erases a constraint.)</p>
<h4>The plan: triangularize, then back-substitute</h4>
<pre><code>x +  y = 5          x + y = 5
2x + 3y = 12   →        y = 2      (R2 := R2 − 2R1)
then read upward: y = 2, so x = 5 − 2 = 3.   Check: 2·3 + 3·2 = 12 ✓</code></pre>
<h4>Reading the endgame</h4>
<ul>
  <li>A row <b>[0 0 | c]</b> with c ≠ 0 says "0 = c" — contradiction: <b>no solution</b>.</li>
  <li>A row <b>[0 0 | 0]</b> says "0 = 0" — a constraint evaporated: with fewer effective equations than unknowns, <b>infinitely many</b> (a free variable).</li>
  <li>Full staircase of pivots: <b>unique solution</b>, delivered by back-substitution.</li>
</ul>`,
      questions: [
        {
          type: 'order',
          prompt: `Solve x + y = 5, 2x + 3y = 12 by elimination — arrange the steps.`,
          steps: [
            'R2 := R2 − 2·R1, eliminating x from the second equation',
            'The second equation now reads y = 2',
            'Back-substitute into the first: x + 2 = 5, so x = 3',
            'Verify in the original second equation: 2·3 + 3·2 = 12 ✓'
          ],
          hints: ['Eliminate downward first, read upward after.', 'What multiple of row 1 kills the 2x in row 2?', 'Finish by checking in an ORIGINAL equation — the untouched one catches arithmetic slips.'],
          why: 'Eliminate down, substitute up, verify in the original — the full ritual. It scales unchanged to 10 or 10,000 unknowns.'
        },
        {
          type: 'input',
          prompt: `A system is already triangular: x + 2y = 7 and y = 2. What is x?`,
          accept: ['3'],
          placeholder: '…',
          hints: ['Back-substitution: use the known y in the first equation.', 'x + 2·2 = 7.'],
          why: 'x = 7 − 4 = 3. Triangular form makes solving a cascade of one-unknown equations — which is the entire point of eliminating first.'
        },
        {
          type: 'mcq',
          prompt: `Which "row operation" is FORBIDDEN, and why?`,
          options: [
            { t: 'Multiplying a row by 0 — it erases a constraint irreversibly, enlarging the solution set', ok: true, why: 'A zeroed row reads 0 = 0: the equation is gone, and points that violated it now count as "solutions". Legal ops are exactly the reversible ones — reversibility IS the proof that solutions are preserved.' },
            { t: 'Swapping two rows — order might matter', ok: false, why: 'A system is a SET of constraints (1.5): {eq1, eq2} = {eq2, eq1}. Order carries no meaning; swapping is the most harmless op of the three.' },
            { t: 'Adding one row to another — it mixes unrelated equations', ok: false, mis: 'mixing-fear', why: '"Mixing" is the entire method! If both equations hold, their sum holds too — and subtracting the added row back restores the original. Reversible ⟹ legal ⟹ this is how unknowns get eliminated.' }
          ],
          hints: ['Test each op: can you UNDO it?', 'Undo scaling by 5: scale by 1/5. Undo scaling by 0: …?'],
          edge: 'The same reversibility logic explains a debugging rule: transformations that lose information cannot be audited backwards. Row ops are lossless edits.'
        },
        {
          type: 'mcq',
          prompt: `Mid-elimination, a row becomes [0 0 | 4]. The verdict for the system:`,
          options: [
            { t: 'No solution — the row asserts 0 = 4, and reversible steps preserve truth, so the ORIGINAL system was contradictory', ok: true, why: 'Elimination is a contradiction-detector: the absurd row certifies the constraints collide (parallel lines, in 2D). Proof by contradiction (1.4) as an algorithm output.' },
            { t: 'x = 0, y = 0 is forced', ok: false, mis: 'zeros-mean-zero-solution', why: 'The zeros are COEFFICIENTS, not answers: the row claims 0·x + 0·y = 4 — satisfiable by nothing whatsoever. Read rows as equations, always.' },
            { t: 'Delete the broken row and continue', ok: false, why: 'The row is not broken — it is the system’s honest confession. Deleting evidence does not acquit the defendant; the original constraints still conflict.' }
          ],
          hints: ['Translate [0 0 | 4] back into equation language.', '0·x + 0·y = 4. Which (x, y) satisfy that?'],
          edge: 'Its sibling [0 0 | 0] is the OTHER endgame: a vanished constraint, a free variable, infinitely many solutions. One symbol apart, opposite verdicts.'
        },
        {
          type: 'mcq',
          prompt: `Three unknowns, and elimination yields exactly 2 pivot rows plus a [0 0 0 | 0] row. The solution set is…`,
          options: [
            { t: 'Infinite — one free variable remains; solutions form a line in ℝ³', ok: true, why: '2 effective constraints on 3 unknowns leave 3 − 2 = 1 degree of freedom: pick the free variable, the pivots follow. "Number of free variables = unknowns − pivots" is the accounting identity of elimination.' },
            { t: 'Unique — three rows were given, after all', ok: false, mis: 'count-equals-constraint', why: 'One row dissolved into 0 = 0: it was a combination of the others, contributing nothing. Written equations ≠ independent constraints — pivots count what actually binds (rank, one node ahead).' },
            { t: 'Empty — a zero row signals failure', ok: false, why: 'Only [0 0 0 | nonzero] signals contradiction. All-zeros is benign redundancy — the difference between "0 = 4" and "0 = 0" is the difference between impossible and underdetermined.' }
          ],
          hints: ['Count effective constraints vs unknowns.', '3 unknowns − 2 pivots = how many free choices?'],
          edge: 'Geometry of the answer: two planes in ℝ³ meeting in a line. Solution sets of linear systems are always flat things — points, lines, planes… — never curves.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Systems are how software answers "what values fit all the facts?"</h4>
<ul>
  <li><b>Physics/games:</b> forces at equilibrium, joint constraints in ragdolls — every solver tick assembles and solves a linear system.</li>
  <li><b>Fitting:</b> "find the line through these points" and least-squares regression reduce to linear systems (the normal equations).</li>
  <li><b>Circuits:</b> Kirchhoff's laws produce one equation per loop/node — solved by elimination since before computers.</li>
  <li><b>Graphics:</b> inverse kinematics, spline control points, physics-based animation.</li>
</ul>
<h4>In practice: call the solver, skip the inverse</h4>
<pre><code>x = np.linalg.solve(A, b)      # elimination with pivoting — fast, stable
x = np.linalg.inv(A) @ b       # ~3× the work, worse rounding — a known anti-pattern</code></pre>
<p>Real solvers are Gaussian elimination plus <em>pivoting</em> (row swaps that keep numbers well-sized for floating point) — your L2 algorithm, industrial grade. The "solve, don't invert" rule is standard numerical hygiene.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `You need the line y = mx + c through the points (1, 3) and (2, 5). As a linear system in (m, c):`,
          options: [
            { t: 'm + c = 3 and 2m + c = 5 — one equation per point; solving gives m = 2, c = 1', ok: true, why: 'Each point plugged into y = mx + c yields one linear constraint on the UNKNOWNS m and c. Subtracting: m = 2, then c = 1. "Fit a model" became "solve a system" — the move behind all of regression.' },
            { t: 'It’s not linear — lines have slopes, not systems', ok: false, mis: 'unknown-confusion', why: 'The system is linear in the unknowns THAT MATTER here: m and c. (x is not an unknown — the points supplied it.) Identifying which symbols are unknowns is the modeling step; the rest is 3.5 machinery.' },
            { t: '3 = 1x and 5 = 2x — solve for x', ok: false, why: 'The x-values are data, already known (1 and 2). The question asks for the line’s PARAMETERS — the unknowns are m and c, and each point donates one equation about them.' }
          ],
          hints: ['Substitute each point into y = mx + c. What is unknown afterwards?', 'Two equations in m and c. Eliminate.'],
          edge: 'With 20 points and 2 unknowns, the system is overdetermined — no exact solution. Least squares finds the closest fit, via… another linear system. Elimination all the way down.'
        },
        {
          type: 'mcq',
          prompt: `A physics engine assembles a 3-unknown force balance, but two of its constraint equations turn out to be the same fact restated. At solve time it will find…`,
          options: [
            { t: 'Infinitely many equilibria — 2 effective constraints on 3 unknowns leave a free variable, and the solver may pick any of them (jitter!)', ok: true, why: 'Redundant constraints ⟹ rank-deficient system ⟹ an underdetermined solve. Engines detect this and add regularization or drop constraints — otherwise the arbitrary choice changes frame to frame and joints visibly tremble.' },
            { t: 'The unique equilibrium — three equations were provided', ok: false, mis: 'count-equals-constraint', why: 'Provided, but not independent: elimination will expose a 0 = 0 row. The L2 accounting (pivots vs unknowns) is exactly what the engine’s solver reports back as a rank warning.' },
            { t: 'A crash — solvers require square systems', ok: false, why: 'The system IS square (3×3) — squareness was never the issue. Rank is: a square matrix can still carry too few independent rows. Shape ≠ substance.' }
          ],
          hints: ['Restated fact = one constraint counted twice. Effective constraints?', '2 constraints, 3 unknowns — which of the three endgames is this?'],
          edge: 'The word for what went missing is RANK — the next node makes it precise and gives you the vocabulary this bug report needs.'
        },
        {
          type: 'mcq',
          prompt: `Why do numerics people insist on <code>solve(A, b)</code> over <code>inv(A) @ b</code>?`,
          options: [
            { t: 'Solve runs one elimination (~n³/3 work) straight to x; inverting solves n systems then multiplies — ~3× the work and extra rounding error', ok: true, why: 'The inverse is a DETOUR: computing all of A⁻¹ answers n right-hand-sides you never asked about, and every extra float op donates rounding error. Ask the question you have — "which x satisfies Ax = b" — not a bigger one.' },
            { t: 'inv() is deprecated in modern libraries', ok: false, why: 'Fully supported — inverses have legitimate uses (covariance matrices, closed-form math). The advice is about the SOLVE use-case specifically: there, the inverse is pure overhead.' },
            { t: 'They give different answers', ok: false, mis: 'different-results', why: 'In exact arithmetic, identical (that is a theorem). In floats they differ only in error accumulated — solve() differs LESS from the truth. Same target, cleaner shot.' }
          ],
          hints: ['What does computing a full inverse implicitly solve?', 'n systems (one per column of I) — did you need n, or one?'],
          edge: 'General numerical proverb: never compute an intermediate object bigger than your question. Inverses, full sorts for a max, all-pairs for a nearest — same smell, same fix.'
        }
      ]
    }
  }
};

/* ============ 3.6 SPAN, INDEPENDENCE, BASIS, RANK ============ */
window.NODES['la.basis'] = {
  id: 'la.basis', num: '3.6', trackId: 'linear-algebra',
  title: 'Span, Independence, Basis, Rank',
  minutes: 40,
  payoff: 'dimensionality · compression intuition',
  levels: {

    l1: {
      html: `
<h4>What can you reach?</h4>
<p>You hold arrows and may combine them: scale each, add up. The set of everything reachable is the <span class="term">span</span>.</p>
<ul>
  <li>One arrow: its span is a <b>line</b> — scaling slides you along it, nothing pushes you off.</li>
  <li>Two arrows, different directions: the <b>whole plane</b> — like east and north composing any journey.</li>
  <li>Two <em>parallel</em> arrows: still just a line. The second arrow was <b>redundant</b> — it reached nothing new.</li>
</ul>
<p>That redundancy has a name: parallel arrows are <span class="term">dependent</span>. Arrows where none is redundant — none lies in the span of the others — are <span class="term">independent</span>.</p>
<div class="callout amber"><p><b>A basis is a perfect toolkit:</b> arrows that reach everything (spanning) with nothing wasted (independent). For the plane: any two non-parallel arrows. The COUNT is forced — always exactly 2 for the plane, 3 for space. That forced count is what "dimension" means.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `The span of the single vector (2, 1) is…`,
          options: [
            { t: 'The line through the origin in direction (2, 1)', ok: true, why: 'Combinations of one vector are just its scalings c·(2,1) — a line through 0. One arrow, one dimension of reach.' },
            { t: 'The whole plane — scale it enough and go anywhere', ok: false, mis: 'scaling-escapes-line', why: 'Scaling changes distance ALONG the direction, never the direction: no c makes c·(2,1) equal (1, 5). Escaping the line needs a second, non-parallel arrow.' },
            { t: 'Just the point (2, 1)', ok: false, why: 'The span includes every scalar multiple — (4,2), (−2,−1), (0,0)… A set of reachables, not a single destination.' }
          ],
          hints: ['List a few combinations: 2·(2,1), −1·(2,1), 0·(2,1)…', 'They all line up. Through which point?']
        },
        {
          type: 'mcq',
          prompt: `You hold (1, 0) and (2, 0). Can your combinations reach (0, 1)?`,
          options: [
            { t: 'No — both arrows point along the x-axis; combinations never leave it', ok: true, why: 'a(1,0) + b(2,0) = (a+2b, 0): the y-slot is locked at zero. The second arrow is dependent — redundant equipment. Two arrows, but only one direction of reach.' },
            { t: 'Yes — two vectors always span the plane', ok: false, mis: 'count-equals-span', why: 'COUNT is not COVERAGE: two parallel arrows span a line, the same as one. Independence, not headcount, is what buys the second dimension.' },
            { t: 'Yes, using negative scalars', ok: false, why: 'Negative scalars reverse along the same axis — (−3, 0) territory. The y-component stays untouchably zero under any signs.' }
          ],
          hints: ['Write the general combination a(1,0) + b(2,0).', 'What is its y-coordinate, always?'],
          edge: 'This is the widget moment from 3.3 — both basis images on one line, plane collapsed. Dependence and collapse are the same phenomenon.'
        },
        {
          type: 'mcq',
          prompt: `Which pair is a <b>basis</b> for the plane ℝ²?`,
          options: [
            { t: '(1, 1) and (1, −1) — non-parallel, so they span, and neither is redundant', ok: true, why: 'Any two non-parallel plane vectors form a basis — perpendicularity and unit length are NICE (3.2) but not required. E.g. (3,2) = 2.5·(1,1) + 0.5·(1,−1): everything is reachable, one way only.' },
            { t: '(1, 0) alone — keep it minimal', ok: false, why: 'Minimal, yes; spanning, no — one arrow reaches only its line. A basis must do BOTH jobs, and the plane demands exactly two arrows.' },
            { t: '(1, 0), (0, 1), and (1, 1) — more coverage', ok: false, mis: 'more-is-better', why: 'The third is redundant: (1,1) = (1,0) + (0,1), already reachable. Spanning ✓, independent ✗ — and the failure costs uniqueness of coordinates. Bases are exact: no gaps, no spares.' }
          ],
          hints: ['Basis = spans everything + nothing redundant.', 'Check each option against both requirements.'],
          edge: 'The forced count — every basis of ℝ² has exactly 2 elements — is a theorem, and it is what licenses the word "2-dimensional".'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The definitions, formally</h4>
<ul>
  <li><b>Linear combination:</b> c₁v₁ + ⋯ + cₖvₖ. <b>Span</b> = the set of all of them.</li>
  <li><b>Independence:</b> c₁v₁ + ⋯ + cₖvₖ = 0 <em>only</em> for c₁ = ⋯ = cₖ = 0. (Any nontrivial recipe for 0 lets you solve for one vector in terms of the others — that vector is the redundancy.)</li>
  <li><b>Basis:</b> an independent spanning set. <b>Dimension</b> = the size of any basis (all bases of a space have equal size — a theorem).</li>
  <li><b>Rank</b> of a matrix = the dimension of its columns' span = the number of pivots elimination (3.5) finds. Rank counts <em>effective</em> directions/constraints.</li>
</ul>
<h4>The two facts you will use weekly</h4>
<ol>
  <li><b>More vectors than dimensions ⟹ dependent.</b> Three vectors in ℝ² always carry a redundancy — no arrangement escapes.</li>
  <li><b>Basis coordinates are unique.</b> If x = Σcᵢvᵢ = Σdᵢvᵢ, subtract: Σ(cᵢ−dᵢ)vᵢ = 0, and independence forces every cᵢ = dᵢ. Independence is exactly what makes "the coordinates of x" a well-defined phrase. ∎</li>
</ol>`,
      questions: [
        {
          type: 'mcq',
          prompt: `(1, 2) and (2, 4): independent or dependent?`,
          options: [
            { t: 'Dependent — (2,4) = 2·(1,2); also 2·(1,2) − 1·(2,4) = 0 is a nontrivial recipe for zero', ok: true, why: 'One is a multiple of the other: same direction, redundant pair, span = one line. Both definitions (redundancy / nontrivial zero-combo) agree — they always do.' },
            { t: 'Independent — the vectors are not equal', ok: false, mis: 'unequal-means-independent', why: 'Unequal is far too weak: dependence asks about DIRECTIONS and combinations, not identity. (2,4) brings no new direction — a clone in disguise.' },
            { t: 'Independent — neither is the zero vector', ok: false, why: 'Nonzero-ness is necessary but nowhere near sufficient. Two robust, nonzero, parallel vectors are still a one-trick team.' }
          ],
          hints: ['Is either vector a scalar multiple of the other?', '(2,4) = ?·(1,2).']
        },
        {
          type: 'mcq',
          prompt: `Can THREE vectors in ℝ² ever be linearly independent?`,
          options: [
            { t: 'No — more vectors than the dimension forces a dependency, always', ok: true, why: 'Two independent vectors already span the plane; a third is necessarily a combination of them — reachable, hence redundant. No cleverness escapes: it is a theorem, not a tendency.' },
            { t: 'Yes, if they point in very different directions', ok: false, mis: 'spread-means-independent', why: 'Spread three arrows at 120° apart — maximally different — and still each is a combination of the other two. Visual variety ≠ algebraic independence once you exceed the dimension.' },
            { t: 'Yes, if none is a multiple of another', ok: false, mis: 'pairwise-vs-joint', why: 'Pairwise non-parallel is not joint independence: (1,0), (0,1), (1,1) has no parallel pair, yet (1,1) − (1,0) − (0,1) = 0. Dependence can hide in the COMBINATION of three, invisible to any pair. Subtle and heavily examined.' }
          ],
          hints: ['What do two independent plane vectors already span?', 'Everything. Where does that leave vector #3?'],
          edge: 'The pairwise trap generalizes viciously: in ℝ¹⁰⁰, 101 vectors are dependent even if every pair looks unrelated. Check jointly (via elimination), never pairwise.'
        },
        {
          type: 'input',
          prompt: `The matrix with columns (1, 2) and (2, 4). Its rank = ?`,
          accept: ['1'],
          placeholder: '…',
          hints: ['Rank = dimension of the columns’ span.', 'Both columns share a line — how many independent directions?'],
          why: 'Rank 1: two columns, one direction. This is the 3.3 collapse-matrix — rank is the number that MEASURES how much survives (1 of 2 dimensions).'
        },
        {
          type: 'mcq',
          prompt: `The formal test "c₁v₁ + c₂v₂ = 0 only for c₁ = c₂ = 0" captures independence because…`,
          options: [
            { t: 'A nontrivial zero-combination lets you solve for one vector in terms of the others — exhibiting the redundancy', ok: true, why: 'If 3v₁ − 2v₂ = 0 then v₂ = (3/2)v₁: dependence made explicit. Conversely, no nontrivial recipe ⟹ nobody is expressible via the others. The equation-form is redundancy, made checkable by elimination.' },
            { t: 'Zero is the most important vector', ok: false, why: 'Zero is the TEST POINT, not the celebrity — reaching 0 trivially (all coefficients zero) is always possible; the question is whether any OTHER recipe exists. The definition is about recipes, not about 0.' },
            { t: 'It rules out the zero vector from the set', ok: false, why: 'It does do that (0 in the set gives 1·0 = 0 nontrivially — instant dependence), but that is a corollary, not the content. The full test detects subtler redundancies among healthy nonzero vectors.' }
          ],
          hints: ['Suppose 3v₁ − 2v₂ + 0v₃ = 0 with the 3 ≠ 0. Rearrange for v₁.', 'v₁ = (2/3)v₂ — what does that say about v₁’s contribution?'],
          edge: 'Practical form: put the vectors as columns, run elimination, count pivots. Pivots = independent vectors; pivotless columns are the redundancies. 3.5 is the algorithm for 3.6.'
        },
        {
          type: 'mcq',
          prompt: `Why does a BASIS give every vector unique coordinates?`,
          options: [
            { t: 'Two different recipes for the same x would subtract to a nontrivial zero-combination — independence forbids it', ok: true, why: 'Σcᵢvᵢ = Σdᵢvᵢ ⟹ Σ(cᵢ−dᵢ)vᵢ = 0 ⟹ all cᵢ = dᵢ (independence). Spanning guarantees a recipe EXISTS; independence guarantees it is UNIQUE. The two halves of the basis definition each carry one half of "coordinates work".' },
            { t: 'Coordinates are unique by definition of the word', ok: false, mis: 'convention-dodge', why: 'It genuinely fails without independence: with the spanning-but-dependent set (1,0),(0,1),(1,1), the vector (1,1) has recipes (1,1,0) and (0,0,1). Uniqueness is a THEOREM about independent sets, not vocabulary.' },
            { t: 'Because bases are orthogonal', ok: false, why: 'Bases need not be orthogonal — (1,1),(1,−1) works fine, and skewed bases like (1,0),(1,1) still give unique (if slanted) coordinates. Orthogonality makes coordinates EASY to compute (project!), not unique.' }
          ],
          hints: ['Assume two recipes for one x; subtract them.', 'A zero-combination appears. What does independence conclude?'],
          edge: 'Uniqueness is why "the coordinates of x in basis B" can be a function (1.6!) — and changing basis is precisely an invertible matrix, tying this node back to 3.3.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Rank is the true size of your data</h4>
<pre><code>dataset: 100 columns per user.
but column "bmi" = f(weight, height); "age_days" = 365·age; …
rank(data) = 37  →  only 37 independent directions of information.</code></pre>
<p>Redundant features are dependent columns — they inflate storage and destabilize models without adding information. PCA and friends are rank-hunting: find the few directions that carry the variance, project onto them (3.2!), discard the rest. Compression = "the data's span is smaller than its container."</p>
<h4>Rank-deficiency is the bug class you met twice already</h4>
<ul>
  <li>3.3's collapsed plane: a rank-1 matrix ate a dimension.</li>
  <li>3.5's jittering physics: a rank-deficient constraint system left free variables.</li>
  <li>Regression with duplicated features: the fit has infinitely many "best" answers, and solvers pick arbitrarily — coefficients become meaningless.</li>
</ul>
<p>The professional reflex: when a linear computation misbehaves, <b>check the rank first</b>. <code>np.linalg.matrix_rank(A)</code> is one line and explains more failures than any stack trace.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A dataset has 100 feature columns but rank 3. What is the honest description?`,
          options: [
            { t: 'The data occupies a 3-dimensional subspace — 3 independent directions dressed up as 100 columns', ok: true, why: 'Rank = dimension of the span: 97 columns are combinations of the other 3. Three well-chosen coordinates lose NOTHING — massive compression with zero information loss. This is the insight PCA industrializes.' },
            { t: 'Only 3 of the columns contain nonzero values', ok: false, mis: 'rank-counts-nonzeros', why: 'All 100 can be densely nonzero — rank counts independent DIRECTIONS, not populated columns. A column of pure noise-free redundancy (2× another column) is nonzero everywhere and adds zero rank.' },
            { t: '97 columns are corrupted', ok: false, why: 'Nothing is broken — the columns are honest measurements that happen to be determined by others (bmi from weight and height). Redundancy is a property of the world being measured, not a data-quality bug.' }
          ],
          hints: ['Rank = how many independent directions the columns span.', '100 columns, 3 directions: what are the other 97?'],
          edge: 'Real data is usually APPROXIMATELY low-rank — near-dependencies rather than exact ones. "Effective rank" via singular values handles that; the concept is this node’s, softened.'
        },
        {
          type: 'mcq',
          prompt: `A regression includes both <code>temperature_C</code> and <code>temperature_F</code> as features. The model fits, but coefficients swing wildly between runs. Diagnosis?`,
          options: [
            { t: 'The two columns are dependent (F = 1.8C + 32), so infinitely many coefficient pairs give identical predictions — the solver picks arbitrarily', ok: true, why: 'A rank-deficient design matrix: the system has free variables (3.5!), and any credit split between the twin features predicts the same. Coefficients lose meaning while predictions look fine — the sneakiest version of this bug. Fix: drop one column.' },
            { t: 'Temperature is a bad predictor', ok: false, why: 'Predictive power is not the issue — the model may predict beautifully. The pathology is in ATTRIBUTION: two names for one direction make "whose coefficient?" unanswerable.' },
            { t: 'The learning rate is too high', ok: false, mis: 'optimizer-blame', why: 'Tuning knobs cannot repair a rank deficiency — the ambiguity is in the geometry of the feature span, not the descent schedule. Check rank before touching hyperparameters; it is cheaper and usually the answer.' }
          ],
          hints: ['Is temperature_F reachable as a combination of temperature_C and a constant?', 'Affinely yes — so the feature matrix has a dependency. Which 3.5 endgame does that trigger?'],
          edge: 'The near-miss version — features 99% correlated — is "multicollinearity": rank technically full, but barely, and coefficients still swing. Rank thinking, with error bars.'
        },
        {
          type: 'mcq',
          prompt: `An engine's save-file compresses 10,000 recorded positions of a train constrained to a track. Rank thinking suggests…`,
          options: [
            { t: 'The positions span (roughly) a 1-dimensional set — store one parameter (distance along track) instead of (x, y, z) triples', ok: true, why: 'The data’s container is ℝ³, its actual home is a curve — locally one direction. Re-parameterizing by arc length stores 1 number per sample instead of 3: compression by discovering the true dimensionality. (Curves need local/nonlinear rank — the idea generalizes.)' },
            { t: 'Positions are 3D — three floats is already minimal', ok: false, mis: 'container-equals-content', why: 'The CONTAINER is 3D; the CONTENT lives on a 1-parameter track. Confusing where data sits with what data varies is the anti-pattern this whole node exists to cure.' },
            { t: 'Delete every other sample', ok: false, why: 'Subsampling loses information indiscriminately. Rank-aware compression loses NONE here — it removes redundancy, not resolution. Know the difference before you shrink anything.' }
          ],
          hints: ['How many numbers genuinely vary as the train moves?', 'One — progress along the track. The rest are determined by it.'],
          edge: 'The general principle — "find the manifold the data actually lives on" — is modern ML’s obsession (autoencoders, embeddings). Rank is its linear ancestor and still its first diagnostic.'
        }
      ]
    }
  }
};
