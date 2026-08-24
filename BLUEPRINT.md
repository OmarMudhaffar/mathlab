# MATH LAB — Master Blueprint (v0.1)

> An interactive, gamified Math Lab for First-Year Computer Science at Harbour.Space University.
> Local web app (HTML/CSS/JS) with Claude as the embedded AI mentor.
> **Status:** Architecture & curriculum design. No frontend code yet — this document is the build contract.

---

## 0. Vision & Guiding Principles

**One sentence:** You are booting a dead machine back to life — every math concept you master powers on a real component of the system, and the lab itself visibly upgrades as you learn.

**Principles**

1. **Math is the engine, not the obstacle.** Every topic is framed by what it *unlocks in computing* — graphics, networks, crypto, ML — never "because it's on the exam."
2. **Three depths, always.** Every concept exists at Level 1 (intuition/visual), Level 2 (rigor/proof), Level 3 (code/application). The student chooses the entry door; the lab ensures all three eventually.
3. **Do, don't watch.** Minimum text before the first interaction. Widgets before definitions. Questions within 90 seconds of opening any node.
4. **Errors are data.** Every wrong answer maps to a named misconception with a "why this was tempting" explanation. The mentor sees your error history.
5. **Retention is a mechanic.** Knowledge "drains charge" over time (spaced repetition); keeping the machine powered *is* the game.
6. **The mentor never lectures first.** Claude diagnoses, nudges, and asks — full solutions only after the hint ladder or explicit request.

---

## 1. Research Summary — The Harbour.Space Context

What matters from how Harbour.Space actually teaches:

| Fact | Design consequence |
| --- | --- |
| Courses run as **3-week intensive modules, one course at a time** | Lab content is chunked into module-sized arcs (~15–20 study hours each) that can shadow a live university module; daily cadence matters more than weekly |
| **First year = math foundations + programming basics** (courses like *Intro to Higher Math*, *Linear Algebra 1/2*, mathematical analysis; discrete math continues into year 2) | Our five tracks mirror this: Logic & Proofs first (it *is* "Intro to Higher Math"), then Linear Algebra, Discrete, Calculus, Probability |
| Strong **competitive-programming / olympiad culture** | L3 of every concept connects to algorithmic problems; difficulty ratings use an Elo system (familiar from Codeforces); "boss" problems reward clean reasoning under constraints |
| Math skill is a **hard requirement** for the degree (they run a full remedial year, MSL, for students without it) | The lab includes a placement diagnostic and never assumes prior comfort — L1 always starts from zero |

---

## 2. Curriculum Roadmap (Phase 1)

### 2.1 The Three-Depth Pedagogy Model

Every concept node ships all three levels. Game-framing in parentheses.

| Level | Name | What it contains | Passing criterion |
| --- | --- | --- | --- |
| **L1** | **Blueprint** (intuition) | Visual/interactive metaphor, ELI5 narrative, a widget to play with, zero formalism | 2–3 easy checkpoint questions |
| **L2** | **Schematic** (rigor) | Formal definitions, theorems, at least one proof (interactive where possible — step-ordering, fill-the-gap), standard notation | Adaptive question set (5–8 items) at target success ~75% |
| **L3** | **Fabrication** (applied CS) | Implement it: a small JS coding task, an algorithm connection, a real-system story (where this runs in production software) | Code/widget challenge with automated check |

**Reference example — "Matrices as Transformations" at all three depths:**

- **L1 Blueprint:** "A matrix is a machine that grabs every point of the plane and moves it." Widget: drag the two basis arrows î and ĵ; the whole grid (and a spaceship sprite) warps live. No numbers required to *feel* rotation, scaling, shear.
- **L2 Schematic:** Linear map definition; theorem: every linear map is `T(x) = Ax`, and the columns of `A` are the images of the basis vectors (interactive proof: student drags statements into order). Composition of maps = matrix product; why order matters.
- **L3 Fabrication:** Write `transform(point, m)` in JS and apply it to a polygon's vertices on a canvas. Connections: CSS `transform: matrix(...)`, game engine model matrices, weight matrices in neural nets.

### 2.2 The Five Tracks (≈42 concept nodes ≈ one academic year)

Each track powers one **component of the Machine** (see §3). Nodes listed in prerequisite order.

#### Track 1 — Logic & Foundations → powers **THE GATEWORK** (control unit)
*Mirrors "Intro to Higher Math." The mandatory first track — everything else depends on it.*

| # | Node | Core content | Signature widget | CS payoff |
| --- | --- | --- | --- | --- |
| 1.1 | Propositions & Connectives | AND/OR/NOT/XOR, truth tables | Truth-table builder + logic-gate circuit sim | `if` conditions, short-circuit evaluation |
| 1.2 | Equivalence & De Morgan | Tautology, equivalence laws | "Simplify the circuit" puzzle | Refactoring conditionals, negating guards correctly |
| 1.3 | Predicates & Quantifiers | ∀/∃, negating quantified statements | Quantifier "spotlight" over a data grid | Loop invariants, specs, SQL `WHERE` |
| 1.4 | Implication & Proof Techniques | Direct, contrapositive, contradiction | Proof step-ordering puzzles | Arguing code correctness, debugging by contradiction |
| 1.5 | Sets & Operations | ∪ ∩ \ complement, power set, Venn | Draggable Venn diagram + bitmask view | Types, collections, bitwise flags |
| 1.6 | Relations & Functions | Injective/surjective/bijective, equivalence relations | Mapping-arrows sandbox | Hash maps, comparators, `equals()` contracts |
| 1.7 | Induction & Strong Induction | Base case, inductive step, recursion link | Falling-dominoes / recursion-tree visual | Proving loops & recursive functions correct |
| 1.B | **BOSS: Power the Control Unit** | Mixed proof + circuit challenge | — | Unlocks Gatework; opens Tracks 2–4 |

#### Track 2 — Discrete Mathematics → powers **THE LATTICE** (data & network layer)

| # | Node | Core content | Signature widget | CS payoff |
| --- | --- | --- | --- | --- |
| 2.1 | Counting Principles | Product/sum rules, pigeonhole | Combinatorial "outfit builder" | Enumerating states, brute-force feasibility |
| 2.2 | Permutations & Combinations | nPr, nCr, binomial theorem | Pascal's triangle explorer | Password spaces, subsets, dynamic programming tables |
| 2.3 | Recurrences & Recursion | Fibonacci, T(n)=2T(n/2)+n intuition | Recursion-tree grower | Divide & conquer, memoization |
| 2.4 | Asymptotics & Big-O | Growth hierarchy, dominant terms | **Big-O race** (functions racing on a track) | Algorithm analysis — the daily language of CS |
| 2.5 | Graphs I: Structure | Vertices/edges, degree, adjacency matrix & list | Graph sandbox (build & drag nodes) | Social networks, maps, dependency graphs |
| 2.6 | Graphs II: Traversal & Trees | Paths, connectivity, trees, BFS/DFS idea | Step-through traversal visualizer | Search, crawling, file systems |
| 2.7 | Number Theory I | Divisibility, gcd, Euclid's algorithm | gcd step-tracer | Reducing fractions, cryptography foundations |
| 2.8 | Modular Arithmetic | mod, congruence, fast exponentiation | Clock-arithmetic dial + hash bucket visual | Hashing, cyclic buffers, RSA teaser |
| 2.B | **BOSS: Route the Network** | Multi-step graph + counting challenge | — | Unlocks Lattice; system map becomes force-directed |

#### Track 3 — Linear Algebra → powers **THE RENDER ENGINE** (graphics layer)

| # | Node | Core content | Signature widget | CS payoff |
| --- | --- | --- | --- | --- |
| 3.1 | Vectors | Geometry + arithmetic, scalar mult | Vector addition playground | Positions, velocities, feature vectors |
| 3.2 | Dot Product & Projections | Norm, angle, cosine similarity | Projection "shadow caster" | Similarity search, lighting calculations |
| 3.3 | Matrices as Transformations | Linear maps, basis images | **Matrix playground** (drag basis, grid warps) | 2D/3D graphics, CSS transforms |
| 3.4 | Matrix Multiplication | Composition, non-commutativity | Compose-two-transforms animator | Transform pipelines, adjacency powers |
| 3.5 | Linear Systems & Gaussian Elimination | Row reduction, solution sets | Row-op step console | Solving constraints, circuit analysis |
| 3.6 | Span, Independence, Basis, Rank | What combinations can reach | Span "paint the plane" visual | Dimensionality, compression intuition |
| 3.7 | Determinants | Area/volume scaling, invertibility | Determinant area-tracker on the grid | When systems are solvable; orientation flips |
| 3.8 | Eigenvalues & Eigenvectors | Invariant directions, Av = λv | Eigen "compass" (find unmoved directions) | PageRank, stability, PCA teaser |
| 3.B | **BOSS: Ignite the Render Engine** | Compose transforms to recreate a target scene | — | Unlocks Render Engine; the lab UI gains animated transforms |

#### Track 4 — Calculus / Analysis → powers **THE OPTIMIZER** (tuning layer)

| # | Node | Core content | Signature widget | CS payoff |
| --- | --- | --- | --- | --- |
| 4.1 | Functions & Growth | exp/log refresher, growth rates | Function grapher w/ log scale toggle | Log-time algorithms, information scale |
| 4.2 | Limits & Continuity | Approaching values, ε intuition first | Zoom-to-limit microscope | Numerical precision, convergence of iterations |
| 4.3 | The Derivative | Definition, rules, tangent slope | Tangent-line slider tracer | Rates of change, sensitivity |
| 4.4 | Chain Rule & Applications | Composite functions | Gear-train chain visual | Backpropagation's core trick |
| 4.5 | Optimization | Critical points, min/max | Hill-climber on a curve | Cost functions, tuning parameters |
| 4.6 | Gradient Descent | 1D → 2D descent intuition | **Descent simulator** (ball rolling on surface) | The algorithm behind all ML training |
| 4.7 | Integration | Riemann sums, FTC | Riemann rectangle stacker | Areas, accumulation, average-case sums |
| 4.8 | Series & Approximation | Geometric series, Taylor teaser | Partial-sum convergence animator | Amortized analysis, float approximation |
| 4.B | **BOSS: Tune the Machine** | Minimize a real cost function step-by-step | — | Unlocks Optimizer; charts gain animated easing |

#### Track 5 — Probability → powers **THE ORACLE** (reliability & randomness layer)
*Capstone track — requires Gatework + parts of Lattice (counting).*

| # | Node | Core content | Signature widget | CS payoff |
| --- | --- | --- | --- | --- |
| 5.1 | Sample Spaces & Events | Probability via counting | Dice/coin lab with live tallies | Modeling uncertainty |
| 5.2 | Conditional Probability & Bayes | P(A\|B), Bayes' rule | Bayes box (population-square visual) | Spam filters, diagnostics, A/B reasoning |
| 5.3 | Independence & Random Variables | Distributions as machines | RV "slot machine" sampler | Modeling inputs, simulation |
| 5.4 | Expectation & Linearity | E[X], the linearity superpower | Expected-value payoff table | Average-case analysis of algorithms |
| 5.5 | Named Distributions | Bernoulli, binomial, geometric, uniform | Distribution shape-shifter | Retry logic, load modeling |
| 5.6 | Monte Carlo & Concentration | Simulation, law of large numbers feel | **Monte Carlo π estimator** | Randomized testing, estimation |
| 5.7 | Randomness in Algorithms | Birthday paradox, hashing collisions, randomized quicksort | Collision birthday-party sim | Hash table design, probabilistic guarantees |
| 5.B | **BOSS: Consult the Oracle** | Reliability/collision challenge | — | Full machine boot — endgame ceremony |

### 2.3 Prerequisite Graph (high level)

```
Track 1 (Logic & Foundations)
   ├──► Track 2 (Discrete)  ──► Track 5 (Probability)
   ├──► Track 3 (Linear Algebra)
   └──► Track 4 (Calculus)
Cross-links: 2.1 Counting ──► 5.1 · 2.4 Big-O ◄── 4.1 Growth · 3.4 MatMul ◄── 2.5 Graphs (adjacency powers)
```

Tracks 2, 3, 4 can run **in parallel** after Track 1 — the student follows whichever mirrors their current university module.

---

## 3. Lab Concept & Mechanics (Phase 2)

### 3.1 Narrative Frame — "BOOT THE MACHINE"

You inherit **a dead machine** — a beautiful, mysterious computer whose schematic fills your home screen. Its five components (Gatework, Lattice, Render Engine, Optimizer, Oracle) are dark. Mathematical understanding is literally its power source: mastering concept nodes routes energy through the schematic; defeating a track's boss powers the component on — **and the lab's own UI visibly upgrades**, because the lab runs on that machine.

**The self-referential hook (the killer feature):** each powered component changes the tool you're using —

| Component powered | Visible upgrade in the lab itself |
| --- | --- |
| Gatework | Nav/circuit traces animate; unlock dark-mode "terminal skin" |
| Lattice | System map redraws as a live force-directed graph you can drag |
| Render Engine | Map gains rotation/parallax; your own matrix drives the logo animation |
| Optimizer | All charts/transitions gain smooth easing (you *earned* the animation curves) |
| Oracle | Daily challenge becomes seeded random; "prophecy" flavor text |

The message: *this software exists because of the math you now know.*

### 3.2 Node Lifecycle & Mastery

Each concept node has a **mastery ring** with five states:

```
LOCKED → DISCOVERED (L1 done) → UNDERSTOOD (L2 passed) → APPLIED (L3 passed) → MASTERED (retention proven)
```

- XP: L1 = 20, L2 = 40, L3 = 60, retention reviews = 5–10 each. Boss = 150.
- **Charge decay (spaced repetition):** APPLIED/MASTERED nodes slowly drain charge on intervals ~1d → 3d → 7d → 14d → 30d (SM-2-lite). A draining node dims on the map and enters the review queue. Answering due reviews recharges it and lengthens the next interval. Mastery = surviving 3 spaced retention checks.
- Draining is **never punitive** — nothing is lost, the map just honestly shows what's fading, and recharging is fast.

### 3.3 Daily Loop — "Boot Sequence"

Opening the lab starts a 5–10 minute warm-up: due retention reviews (mixed across tracks) + one streak tick. Short, finishable, honest. Streak counts *boot sequences completed*, not hours. After it, the lab recommends today's frontier node.

### 3.4 Adaptive Practice Engine

- **Elo ratings, per skill.** Student starts at 1200 per track; every question has a difficulty rating. The engine selects items targeting ~70–80% expected success (flow zone). After each answer both ratings update (K=32 student, K=16 item).
- **Question types:** MCQ (misconception distractors), numeric input, expression input, proof **step-ordering**, **spot-the-flaw** (in a proof or code snippet), code-output prediction, and **widget tasks** ("drag the basis vectors to produce this transformation").
- **Instant feedback with edge-case cards:** after every answer — why the right one is right, why *each* distractor was tempting (named misconception), plus an edge-case card ("what happens when n = 0? the empty set? a singular matrix?").
- **Hint ladder (4 rungs), cost-scaled XP:** ① Nudge (a re-focusing question) → ② Strategy (which tool applies) → ③ First step worked → ④ Full solution + a reflection question. XP multiplier 1.0 / 0.8 / 0.6 / 0.4 / 0.2. Language is always warm — hints are a smart move, not a penalty.

### 3.5 Boss Modules ("System Integration Tests")

End of each track: 3–5 multi-step problems that *combine* the track's nodes + one fabrication task, with limited hints and a power-on ceremony on success. Failing a boss triggers a diagnostic ("the machine reports: instability in Induction") and a targeted micro-review, not a grind wall.

### 3.6 Widget Catalog (build order by reuse value)

1. **Grapher core** (functions, points, vectors on canvas) — reused by ~15 nodes
2. **Matrix playground** (drag-basis grid warp) — Track 3's crown jewel
3. **Graph sandbox** (nodes/edges, traversal stepper) — Track 2
4. **Truth-table / logic-circuit builder** — Track 1
5. **Sampler/simulator frame** (dice, Monte Carlo, collisions) — Track 5
6. **Step console** (row ops, Euclid, proof ordering — shared "show your steps" UI)

---

## 4. Data Model & Schemas (Phase 3.2)

Static content lives in versioned JSON files; user state lives in `localStorage` (v1). All content is data-driven so the AI can also *generate* new items into the same schema.

### 4.1 `curriculum.json` — the map

```json
{
  "version": "0.1",
  "tracks": [
    {
      "id": "logic", "title": "Logic & Foundations", "component": "gatework",
      "color": "#f5b942", "order": 1, "unlockedBy": null,
      "modules": [
        { "id": "logic.core", "title": "Propositional Logic", "conceptIds": ["logic.props", "logic.demorgan"] }
      ],
      "bossId": "boss.gatework"
    }
  ]
}
```

### 4.2 `concepts/*.json` — one file per node

```json
{
  "id": "la.matrix-transform",
  "trackId": "linear-algebra",
  "title": "Matrices as Transformations",
  "prereqs": ["la.vectors", "la.dot-product"],
  "estMinutes": 35,
  "levels": {
    "l1": { "widget": "matrix-playground", "contentRef": "content/la/matrix-transform.l1.md",
            "checkpointQuestionIds": ["q.la.mt.001", "q.la.mt.002"] },
    "l2": { "contentRef": "content/la/matrix-transform.l2.md",
            "proofInteractions": ["proof.columns-basis-images"] },
    "l3": { "contentRef": "content/la/matrix-transform.l3.md",
            "challenge": { "type": "code", "id": "ch.la.transform-polygon" } }
  },
  "xp": { "l1": 20, "l2": 40, "l3": 60 },
  "misconceptionTags": ["row-column-swap", "composition-order", "matrix-as-grid-of-numbers"],
  "csPayoffs": ["css-transforms", "game-engines", "nn-weights"]
}
```

### 4.3 `questions/*.json` — the item bank

```json
{
  "id": "q.la.mt.014",
  "conceptId": "la.matrix-transform",
  "level": "l2",
  "type": "mcq",
  "difficulty": 1340,
  "prompt": "The matrix [[0,-1],[1,0]] transforms the plane. What does it do?",
  "options": [
    { "text": "Rotates 90° counter-clockwise", "correct": true,
      "explanation": "î=(1,0) lands on (0,1) and ĵ=(0,1) lands on (-1,0) — read the columns." },
    { "text": "Rotates 90° clockwise", "correct": false, "misconception": "column-direction-confusion",
      "explanation": "Tempting if you read rows instead of columns — the columns are where the basis vectors LAND." },
    { "text": "Reflects across y = x", "correct": false, "misconception": "reflection-rotation-mixup",
      "explanation": "Reflection across y=x is [[0,1],[1,0]] — no minus sign. The sign flip is what makes it a rotation." }
  ],
  "hints": [
    "Where does the vector (1,0) end up if you multiply this matrix by it?",
    "The columns of a matrix are the images of the basis vectors. Plot both columns.",
    "Column 1 is (0,1): î went from east to north. Column 2 is (-1,0): ĵ went from north to west. Which rotation does that?",
    "Full solution: both basis vectors turned 90° CCW, and linear maps move everything consistently — so the whole plane rotates 90° CCW."
  ],
  "edgeCases": ["Apply it four times — you get the identity. Rotations by 90° have order 4."],
  "tags": ["visual", "computation"],
  "source": "authored"
}
```

Non-MCQ types swap `options` for `answer` (numeric/expression with tolerance), `steps` (ordering), or `widgetGoal` (target state + checker id).

### 4.4 `progress` — localStorage (single key, versioned)

```json
{
  "schemaVersion": 1,
  "profile": { "name": "Omar", "createdAt": "2026-08-23", "placementDone": true },
  "xp": 2380,
  "streak": { "current": 6, "best": 14, "lastBootDate": "2026-08-23" },
  "ratings": { "logic": 1290, "linear-algebra": 1310 },
  "concepts": {
    "la.matrix-transform": {
      "state": "applied", "charge": 0.7,
      "lastReview": "2026-08-20", "nextReview": "2026-08-27", "intervalDays": 7,
      "attempts": 22, "correct": 17,
      "misconceptions": { "composition-order": 3 }
    }
  },
  "components": { "gatework": { "powered": true }, "render-engine": { "powered": false, "progress": 0.62 } },
  "badges": ["first-proof", "week-streak"],
  "mentorLog": [
    { "ts": "2026-08-22T18:04Z", "conceptId": "la.matmul",
      "summary": "confused about why AB ≠ BA; resolved via composition-of-functions framing" }
  ]
}
```

### 4.5 Mentor context payload (assembled at runtime per AI call)

```json
{
  "student": { "name": "Omar", "trackRatings": {"linear-algebra": 1310} },
  "location": { "conceptId": "la.matrix-transform", "level": "l2", "questionId": "q.la.mt.014" },
  "recentErrors": [ { "misconception": "composition-order", "count": 3, "lastSeen": "2026-08-22" } ],
  "hintRung": 1,
  "conceptSummary": "…l2 content abstract…",
  "conversation": [ /* this session's mentor chat turns */ ]
}
```

---

## 5. UX Flow & Interaction Design (Phase 3.3)

### 5.1 Screen Inventory

1. **Boot / Onboarding** — name → 10-question adaptive placement diagnostic (seeds Elo ratings; can mark early Logic nodes as already DISCOVERED) → machine schematic reveal cinematic.
2. **System Map (home)** — the machine schematic: five component regions, concept nodes as glowing sockets colored by state/charge. Top bar: XP, streak, daily Boot Sequence card. One clear call-to-action: *today's recommended node*.
3. **Node View** — three tabs: **Blueprint / Schematic / Fabrication** (L1/L2/L3), embedded widget, progress ring, and a persistent **Mentor side-panel** (collapsible chat).
4. **Practice Arena** — one question at a time, keyboard-first. Answer → instant verdict → explanation + misconception/edge-case cards → next. Hint button shows the ladder rung count. Session ends with summary: XP, rating delta, weakest tag, one-line mentor comment.
5. **Boss Room** — distinct visual mode (darker, focused). Multi-step problems, limited hints, power-on ceremony (component animates alive on the map).
6. **Review Queue ("Boot Sequence")** — mixed due cards across tracks, 5–10 min, big finish state.
7. **Stats** — mastery per track, misconception heat-list ("your top 3 confusions"), time invested, badge shelf.

### 5.2 The Core Loop (per concept node)

```
System Map: pick recommended node
   → L1 BLUEPRINT: play with widget (no stakes, 2–5 min) → 2–3 checkpoint Qs → DISCOVERED
   → L2 SCHEMATIC: read + interactive proof → Arena set (5–8 adaptive Qs) → UNDERSTOOD
   → L3 FABRICATION: code/widget challenge, auto-checked → APPLIED  (+ node glows on map)
   → [days pass] charge drains → node appears in Boot Sequence → retention checks → MASTERED
```

Mentor is reachable at every step; it *proactively* offers one line ("I noticed composition order tripped you twice — want the gear-train picture?") but never modal-interrupts.

### 5.3 First-Session Walkthrough (target: under 12 minutes to first dopamine)

1. Enter name → 10 quick placement questions ("calibrating sensors…") — adaptive, painless, honest "I don't know yet" button.
2. Schematic reveal: dead machine, one socket pulsing — *Propositions & Connectives*.
3. L1: truth-table widget; student toggles inputs, watches a gate circuit light up. Three checkpoint questions. **DISCOVERED** — first XP, first node glows, energy line crawls one segment toward the Gatework.
4. Map zooms out to show everything that's still dark. Text: *"Every light on this board is something you're going to understand."* Session end card + tomorrow's boot time nudge.

### 5.4 Interaction Rules

- Keyboard-first arena (1–4 select, Enter submit, H hint). Every widget also mouse/touch friendly.
- All math rendered with KaTeX. All feedback < 150 ms; AI responses stream in.
- No lives, no timers by default (timers exist only in optional "overclock" challenge mode).
- Every dead-end has an exit: from any failed state the UI offers exactly one next action (easier item, hint, or mentor).

---

## 6. Claude Mentor — Prompt Architecture (Phase 3.4)

### 6.1 Call Types

| Call | Trigger | Model | Mode |
| --- | --- | --- | --- |
| **Mentor chat** | Student asks / proactive nudge | `claude-opus-5` | Streaming, adaptive thinking |
| **Explain-at-level** | "Explain this again" button (choose L1/L2/L3 voice) | `claude-opus-5` | Streaming |
| **Question generation** | Item bank low for a (concept, difficulty band) | `claude-opus-5` (batch; `claude-haiku-4-5` acceptable for cost) | Structured outputs → schema-validated JSON |
| **Free-answer evaluation** | Numeric/expression/step answers needing judgment | `claude-opus-5` | Structured outputs (verdict JSON) |

Architecture note (v1, local app): call the Claude API from the browser or a ~50-line local proxy — decision pending (§8). Structured outputs (`output_config.format`) guarantee generator/evaluator responses parse into our schemas; the mentor chat streams for responsiveness.

### 6.2 Template A — Mentor System Prompt (the core persona)

```
You are MENTOR, the resident intelligence of a machine that a first-year computer science
student at Harbour.Space University is bringing back to life by learning mathematics.
You live inside their Math Lab. You are warm, sharp, and genuinely curious about how this
particular student thinks.

## Your teaching contract
1. DIAGNOSE BEFORE EXPLAINING. Read STUDENT_STATE first. If recentErrors shows a named
   misconception relevant to the current question, address the way of thinking that
   produces it — not just the correct fact.
2. SOCRATIC BY DEFAULT. Lead with one good question or a nudge, not a lecture. Give the
   full solution only when: (a) the hint ladder is exhausted, (b) the student explicitly
   asks twice, or (c) they solved it and want the clean write-up.
3. THREE DEPTHS ON DEMAND. You can explain anything at Level 1 (visual metaphor, zero
   formalism), Level 2 (precise definitions and proof), or Level 3 (code and real systems).
   Default to the level the student is currently in (see location.level); offer to shift.
4. SHORT BY DEFAULT. ≤ 120 words unless the student asks to go deep. One idea per message.
   End with a question or a concrete next action when teaching.
5. NEVER SHAME. Errors are information. Say what the error reveals ("you're treating
   matrix multiplication like number multiplication — reasonable instinct, here's where
   it breaks"), never that it was careless.
6. STAY GROUNDED. Use the student's actual numbers/expressions from the current question.
   Write math in LaTeX ($...$). If you're unsure of the student's reasoning, ask them to
   show one step rather than guessing.
7. CELEBRATE PRECISELY. When they get it, name exactly what they did right, in one line.

## Context you receive each call
STUDENT_STATE: JSON — ratings, recent misconception tags, hint rung already used.
LOCATION: the concept, level, and question the student is looking at.
CONCEPT_SUMMARY: the canonical content of this concept (trust it over your memory of
what this lab teaches).

The student sees your reply rendered with KaTeX in a chat side-panel.
```

### 6.3 Template B — Question Generator

```
You generate practice questions for a first-year CS math lab. Produce questions that
match the provided JSON schema EXACTLY (structured output enforced).

INPUT: concept summary, target difficulty (Elo NNNN ± 75), question type, the concept's
misconceptionTags list, and 3 example questions from the bank as style anchors.

Requirements:
- Every MCQ has exactly one correct option and 2–3 distractors. EVERY distractor must be
  the result of a specific, named misconception from the provided tags (or propose a new
  tag in snake-case). Never pad with absurd options.
- Each distractor's "explanation" must say why it is TEMPTING, then why it fails.
- "hints" is a 4-rung ladder: nudge question → strategy → first step worked → full solution.
- Include one edgeCases entry probing a boundary (zero, empty, identity, singular, n=1).
- Difficulty NNNN means: a student rated NNNN should have ~75% success. Calibrate by
  step count and abstraction, not by obscurity or trick wording.
- CS-flavor the surface story when natural (hashing, graphics, networks) — never forced.
- No ambiguity: a domain expert must agree the correct answer is uniquely correct.
```

### 6.4 Template C — Free-Answer Evaluator & Misconception Classifier

```
You grade one student answer for a math lab. Return ONLY the verdict JSON (schema enforced):
{ verdict: "correct" | "partial" | "incorrect",
  misconception: <tag or null>, confidence: 0-1,
  feedback: <≤60 words, warm, names what's right before what's wrong>,
  nextHintRung: 1-4 }

Rules: mathematically equivalent forms are CORRECT (0.5 = 1/2 = 50%; unsimplified is
correct unless the question demands simplification). "partial" = right method, wrong
execution. Match errors against the provided misconceptionTags; use null rather than
forcing a bad match. Never mark correct work incorrect for notation alone — mention
notation in feedback instead.
```

### 6.5 Template D — Explain-at-Level (depth dial)

```
Re-explain {concept} at Level {N} for this student.
L1 = one vivid visual/physical metaphor, a concrete tiny example, zero formal notation.
L2 = precise definition, the key theorem, a 3–5 step proof sketch, standard notation.
L3 = a short JS code sketch + where this runs in real software (one production system).
Constraints: ≤ 200 words. Use their misconception history: if recentErrors includes a tag
for this concept, structurally avoid or directly defuse that trap in the explanation.
```

---

## 7. Technical Architecture (v1) & Build Phases

**Stack:** static HTML/CSS/JS (no framework required; ES modules), Canvas/SVG for widgets, KaTeX for math, `localStorage` for progress, JSON files for content, Claude API for the mentor. Fully local; works offline except mentor calls.

| Phase | Deliverable | Contains |
| --- | --- | --- |
| **P0** | This blueprint | ✅ done |
| **P1** | Walking skeleton | ✅ done (2026-08-23) — system map, Track 1 (7 nodes + boss, ~40 authored questions), 3-tab node view, arena with hint ladder + misconception cards + expression forge, localStorage progress, XP/streak, power-on ceremony, programmer fast-track onboarding |
| **P2** | Practice engine | ✅ done (2026-08-23) — Elo ratings (student per track, drift per item), flow-zone selection for reviews, charge decay (1d→3d→7d→14d→30d), Boot Sequence review queue, MASTERED after 3 retention checks, misconception tallies in progress, `DEV.travel(days)` time simulator |
| **P3** | Mentor online | ✅ done (2026-08-23) — Claude mentor panel on every screen (◈ button / M key), streaming chat, Template-A persona + live context (student state, misconceptions, current question & wrong answer), explain-at-L1/L2/L3 quick actions, "ask mentor" on failed answers, in-app key/model settings, refusal fallback enabled |
| **P4** | Widgets | ✅ done (2026-08-23) — 13 interactive widgets: truth lab, vector lab, matrix playground, graph sandbox (BFS/DFS stepper), big-O race, growth lab, tangent tracer, riemann stacker, descent simulator, Euclid tracer, Pascal explorer, dice lab, Monte Carlo π |
| **P5.4** | Themes + Notebook | ✅ done (2026-08-24) — light "drafting paper" theme for classroom use (☀/🌙 topbar toggle, persisted, widgets re-mount with new palette); notebook (`js/notes.js`, `#/notes`): pages with autosave, search, markdown-lite preview, delete, EXPORT .md backup, 📝 topbar chip, plus a per-lesson quick-notes box on every node that syncs into the notebook tagged with the lesson |
| **P5.3** | The Manual (formula reference) | ✅ done (2026-08-24) — `js/data/reference.js`: 73 laws/formulas in 9 sections (logic laws, sets & counting, graphs, growth/logs/Big-O, trig fixed values incl. sin/cos table + quadrant signs + rotation matrix, vectors & matrices incl. cosine similarity, calculus rules, sums & series, probability); `#/laws` screen with live search, Arabic names, and a link from each law to its lesson; 📖 MANUAL chip in the topbar on every screen |
| **P5.2** | Practice Gym (equation generators) | ✅ done (2026-08-24) — `js/generators.js`: 28 parametric equation machines across all 5 tracks producing unlimited fresh exercises, each with auto-built step-by-step solution, code version, and where-used note; `#/gym` screen + `#/drill/<id>` endless-drill runner (SUBMIT / 📖 SOLUTION / 🧪 EXAMPLE / NEXT, +3 XP per correct, fraction+decimal tolerant checking); ∞ DRILL button on nodes; 📖 SOLUTION button in the regular arena (reveals full hint ladder); property-tested 200 runs per generator |
| **P5.1** | Arabic lesson mode | ✅ done (2026-08-24) — 🌐 عربي toggle on every lesson tab and boss intro: AI-translates the lesson to simple Arabic (RTL layout, code kept in English, terms bilingual), cached in localStorage (`mathlab.arabic.v1`) so each lesson costs one API call ever; mode is sticky via `mathlab.lang` |
| **P5** | Full curriculum | ✅ done (2026-08-23) — all 5 tracks live (38 nodes + 5 bosses, ~420 authored questions), per-component power-on upgrades, full-boot finale, AI question forge (Template B via Gemini/Claude), Arabic glossary system (110 terms auto-glossed), motivational quote system (4 reactive pools with Arabic), dual-provider mentor (Gemini default + Claude), simple-English content style from Track 4 onward |

---

## 8. Decisions (confirmed 2026-08-23)

1. **First track in P1:** Logic & Foundations (Track 1) ships with full content first.
2. **Claude connection:** direct browser → API. The key lives in `localStorage` on this machine only; the lab must never be hosted publicly with this setup. Revisit (switch to a small proxy) if the lab is ever shared.
3. **Narrative skin:** "Boot the Machine" as designed in §3.
