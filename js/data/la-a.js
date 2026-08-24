/* Track 3 content — nodes 3.1 and 3.2 */

/* ============ 3.1 VECTORS ============ */
window.NODES['la.vectors'] = {
  id: 'la.vectors', num: '3.1', trackId: 'linear-algebra',
  title: 'Vectors',
  minutes: 30,
  payoff: 'positions · velocities · feature vectors',
  levels: {

    l1: {
      widget: 'vectorlab',
      html: `
<h4>An arrow you can do arithmetic on</h4>
<p>A <span class="term">vector</span> is an arrow: it has a length and a direction, and it does not care where it starts. Write it as coordinates — v = (3, 1) means "3 right, 1 up" — and suddenly arrows become data you can compute with:</p>
<ul>
  <li><b>Addition:</b> walk u, then walk v from where u ended — <em>tip to tail</em>. The shortcut arrow from start to finish is u + v. (Slide them side-by-side instead and you get the parallelogram picture — same answer.)</li>
  <li><b>Scalar multiplication:</b> 2v is v stretched to double length, same direction. −v is v reversed. ½v, −3v… numbers ("scalars") scale arrows.</li>
</ul>
<div class="callout amber"><p><b>Drag the arrowheads below.</b> The amber arrow is always u + v — watch it stay the parallelogram diagonal no matter what you do. Make u and v point opposite ways and watch the sum shrink toward zero.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `What information does the vector (3, 1) carry?`,
          options: [
            { t: 'A displacement: 3 right and 1 up — length and direction, no fixed location', ok: true, why: 'Vectors are displacements, not places. The same (3,1) drawn from anywhere is the same vector — which is why it can also serve as a velocity, a force, or a feature bundle.' },
            { t: 'A single point that cannot move', ok: false, mis: 'point-vector-confusion', why: 'Points are locations; vectors are MOVES between locations. (Coordinates look identical, which fuels the confusion — the difference is what operations make sense: adding two points is meaningless, adding two moves is a combined move.)' },
            { t: 'The fraction 3/1', ok: false, why: 'The two components are independent axes, not numerator and denominator. (3,1) and (6,2) do share a direction — but different lengths make them different vectors.' }
          ],
          hints: ['Does an arrow change if you slide it without rotating or stretching?', 'No — so what two properties define it?']
        },
        {
          type: 'mcq',
          prompt: `In the widget, u = (2, 1) and v = (1, 2). Where does the amber u + v arrow point?`,
          options: [
            { t: '(3, 3) — add the components', ok: true, why: 'Tip-to-tail: 2+1 rightward, 1+2 upward. Vector addition is componentwise — geometry and coordinate arithmetic agree, always.' },
            { t: '(2, 2) — average the arrows', ok: false, mis: 'average-vs-sum', why: 'The average (u+v)/2 is a real and useful vector — the midpoint direction — but the SUM doubles it: full walk one, then full walk the other.' },
            { t: '(3, 2) — take the bigger of each', ok: false, why: 'Componentwise max is an operation, but not addition — it ignores the second walk’s vertical contribution. Add each axis independently.' }
          ],
          hints: ['Walk (2,1), then from there walk (1,2). Net rightward? Net upward?', '2+1 and 1+2.']
        },
        {
          type: 'mcq',
          prompt: `v = (2, 1). What is −2v, geometrically?`,
          options: [
            { t: 'v flipped to the opposite direction and stretched to double length: (−4, −2)', ok: true, why: 'The magnitude |−2| = 2 scales; the minus sign reverses. Scalars do exactly two things to arrows: resize and possibly flip.' },
            { t: 'v rotated 90°', ok: false, mis: 'scalar-rotates', why: 'No scalar can rotate a vector off its own line — scaling lives entirely along v’s direction. Rotation needs a MATRIX (two nodes away), and that distinction is the doorway to this whole track.' },
            { t: '(0, −1) — subtract 2 from each component', ok: false, why: 'Scalar multiplication multiplies each component: (−2·2, −2·1) = (−4, −2). Subtraction of a scalar from a vector is not even a defined operation.' }
          ],
          hints: ['Two effects: what does the 2 do, what does the − do?', 'Multiply each component by −2.'],
          edge: 'All scalar multiples of v form a line through the origin — the "span" of v. Hold that thought until node 3.6.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>ℝⁿ, formally</h4>
<p>A vector in ℝⁿ is an ordered n-tuple of reals. Operations are componentwise:</p>
<pre><code>(u₁,…,uₙ) + (v₁,…,vₙ) = (u₁+v₁, …, uₙ+vₙ)
c·(v₁,…,vₙ) = (cv₁, …, cvₙ)</code></pre>
<p>The laws you'd hope for all hold — u+v = v+u, (u+v)+w = u+(v+w), the <span class="term">zero vector</span> 0 = (0,…,0) is the identity, and v + (−v) = 0. (Each is a one-line proof: the components are just numbers, and numbers already obey these laws.)</p>
<h4>Length</h4>
<pre><code>‖v‖ = √(v₁² + v₂² + ⋯ + vₙ²)        Pythagoras, n dimensions</code></pre>
<p>‖(3,4)‖ = √(9+16) = 5 — the classic. A <span class="term">unit vector</span> has ‖v‖ = 1; dividing any nonzero v by its length ("normalizing") gives the unit vector in v's direction.</p>
<h4>Subtraction reads backwards</h4>
<p>u − v is the vector that, added to v, lands on u — drawn between their tips, it points <b>from v to u</b>. "Target minus position" gives the direction to the target: the single most-used vector idiom in game code.</p>
<div class="callout"><p><b>Type discipline:</b> (1,2) + (3,4,5) is undefined — different dimensions never add. Treat ℝ² and ℝ³ as different types; the compiler in your head should reject the mix.</p></div>`,
      questions: [
        {
          type: 'input',
          prompt: `(1, 2) + (3, −1) = ? — enter as "a,b"`,
          accept: ['4,1', '(4,1)', '4, 1'],
          placeholder: 'a,b',
          hints: ['Add each axis independently.', '1+3 and 2+(−1).'],
          why: '(4, 1). Componentwise, always — the x-world and y-world never interfere.'
        },
        {
          type: 'input',
          prompt: `‖(3, 4)‖ = ?`,
          accept: ['5'],
          placeholder: '…',
          hints: ['Pythagoras on the components.', '√(3² + 4²) = √25.'],
          why: '5 — the 3-4-5 triangle, now in vector clothing. In code: Math.hypot(3, 4).'
        },
        {
          type: 'mcq',
          prompt: `Which expression is <b>undefined</b>?`,
          options: [
            { t: '(1, 2) + (3, 4, 5)', ok: true, why: 'ℝ² + ℝ³ — no matching component for the third slot. Dimensions are types; mixing them is a type error, and NumPy/GLSL will tell you so at runtime.' },
            { t: '0 · (5, −2)', ok: false, why: 'Perfectly legal: the zero SCALAR times a vector gives the zero VECTOR (0,0). Note the two different zeros in that sentence.' },
            { t: '(1, 2) + (0, 0)', ok: false, why: 'Legal and lazy — adding the zero vector changes nothing. It is the additive identity, the ∅ of vector-land.' }
          ],
          hints: ['Check the dimensions of every operand.', 'Which pair disagrees?']
        },
        {
          type: 'mcq',
          prompt: `Player at position p = (10, 3); enemy at e = (7, 7). The vector <b>from the player toward the enemy</b> is…`,
          options: [
            { t: 'e − p = (−3, 4) — target minus position', ok: true, why: 'The vector that moves p onto e: p + (e−p) = e. "Where I want to be, minus where I am" — memorize the direction of that subtraction; half of gameplay code is this line.' },
            { t: 'p − e = (3, −4) — player minus enemy', ok: false, mis: 'subtraction-direction', why: 'That arrow points from the enemy TOWARD the player — the fleeing direction. Both differences are useful; confusing them makes homing missiles run away.' },
            { t: 'p + e = (17, 10)', ok: false, why: 'Adding two POSITIONS lands somewhere past both — geometrically meaningless (positions add only in careful averaged combinations). Directions come from differences.' }
          ],
          hints: ['Which vector, added to p, produces e?', 'p + ? = e, solve for ?.'],
          edge: 'Sanity check the arithmetic by walking it: from (10,3), go −3 right and +4 up → (7,7) ✓. Vector equations are always walkable.'
        },
        {
          type: 'mcq',
          prompt: `The unit vector in the direction of v = (3, 4) is…`,
          options: [
            { t: '(3/5, 4/5) — divide v by its length', ok: true, why: '‖v‖ = 5, so v/5 has length exactly 1 and v’s direction. Normalizing separates "which way" from "how much" — direction becomes a reusable part.' },
            { t: '(1, 1) — set each component to one', ok: false, mis: 'unit-means-ones', why: '(1,1) has length √2 ≈ 1.41 and points at 45° — wrong length AND wrong direction. "Unit" refers to the LENGTH being 1, not the components.' },
            { t: '(3, 4) — it already is one vector', ok: false, why: '"Unit" is a length condition: ‖(3,4)‖ = 5 ≠ 1. One vector ≠ unit vector — the pun is the trap.' }
          ],
          hints: ['What is ‖v‖? Divide the whole vector by that.', '(3,4)/5 — check its length: √(9/25 + 16/25) = 1 ✓.'],
          edge: 'Normalizing the zero vector is a division by zero — the classic NaN factory in physics engines. Guard it.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Vectors are the native type of motion</h4>
<pre><code>// the universal game loop line:
pos = pos + vel * dt        // position += velocity × time-step
vel = vel + acc * dt        // velocity += acceleration × time-step</code></pre>
<p>Two scalar multiplications and two vector additions — node 3.1's entire toolkit — run sixty times a second in every game and physics engine on earth.</p>
<h4>Vectors are also the native type of data</h4>
<pre><code>user = [age, height_cm, weekly_hours, ...]   // a "feature vector" in ℝⁿ</code></pre>
<p>Once users, songs, and documents are points in ℝⁿ, geometry becomes analytics: near = similar, direction = trend. (Measuring that nearness properly is the next node's job.) Machine learning is largely linear algebra on feature vectors — this track IS the ML prerequisite.</p>
<pre><code>const add   = (u, v) => u.map((x, i) => x + v[i]);
const scale = (c, v) => v.map(x => c * x);
const norm  = v => Math.hypot(...v);</code></pre>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A sprite at pos = (100, 50) with vel = (30, −10) px/s advances one frame of dt = 0.1 s. New position?`,
          options: [
            { t: '(103, 49) — pos + vel·dt', ok: true, why: 'vel·dt = (3, −1); add componentwise. The whole physics of uniform motion is one scalar-multiply and one vector-add per frame.' },
            { t: '(130, 40) — add the full velocity', ok: false, mis: 'dt-forgotten', why: 'That advances a FULL second in one frame — the sprite moves 10× too fast (and frame-rate-dependently!). dt is what decouples game speed from frame rate.' },
            { t: '(400, 250) — multiply everything together', ok: false, why: 'pos·vel has no meaning (what would position-times-velocity BE?). Type discipline: scalars scale, vectors add.' }
          ],
          hints: ['Scale velocity by the time slice first.', '(30, −10) × 0.1, then add to (100, 50).'],
          edge: 'This "explicit Euler step" accumulates tiny errors that Track 4 (calculus) will explain — dt is a discrete stand-in for an infinitesimal.'
        },
        {
          type: 'mcq',
          prompt: `A music service stores each song as [tempo, energy, valence, acousticness]. What has it built, and what does that buy?`,
          options: [
            { t: 'A feature vector in ℝ⁴ — songs become points, so "similar" becomes "geometrically close"', ok: true, why: 'The representation IS the insight: once data lives in ℝⁿ, all of geometry (distances, directions, projections) becomes an analytics toolkit. Recommendations = nearest neighbors in this space.' },
            { t: 'A lookup key for exact matching', ok: false, mis: 'vector-as-id', why: 'Keys answer "same or different"; vectors answer "HOW similar, and in what direction do they differ" — a continuum, not a binary. That graded structure is the entire point.' },
            { t: 'Four unrelated columns in a table', ok: false, why: 'Columns become RELATED the moment you compute with them jointly — distance mixes all four. The vector view is what licenses that mixing.' }
          ],
          hints: ['What can you compute between two points of ℝ⁴ that you cannot compute between two table rows viewed as text?', 'Distance. Direction. Similarity.'],
          edge: 'Real embeddings use ℝ³⁰⁰–ℝ³⁰⁷²  — dimensions beyond drawing, but every formula from this node survives unchanged. Trust the algebra when the picture gives out.'
        },
        {
          type: 'mcq',
          prompt: `Your homing missile code: <code>vel = scale(SPEED, sub(target, pos))</code>. It works — but the missile is faster when far away and dawdles when close. The fix is…`,
          options: [
            { t: 'Normalize before scaling: <code>vel = scale(SPEED, normalize(sub(target, pos)))</code>', ok: true, why: 'sub(target,pos) carries direction AND distance; using it raw makes speed proportional to distance. Normalizing strips the length, leaving pure direction — then SPEED alone sets the pace. Direction and magnitude are separate responsibilities.' },
            { t: 'Increase SPEED until the difference is unnoticeable', ok: false, why: 'The far/near ratio survives any constant — a missile 10× further still flies 10× faster. The bug is structural (unnormalized direction), not a tuning issue.' },
            { t: 'Use sub(pos, target) instead', ok: false, mis: 'subtraction-direction', why: 'That reverses the arrow — the missile now flees its target at distance-proportional speed. Two bugs, zero fixes.' }
          ],
          hints: ['What two pieces of information does target − pos carry? Which one is polluting the speed?', 'Strip the length with a normalize, keep the direction.'],
          edge: 'And the guard from L2 applies: at pos === target, normalize divides by zero. Real code checks the distance first — math edge cases become NaN crashes.'
        }
      ]
    }
  }
};

/* ============ 3.2 DOT PRODUCT & PROJECTIONS ============ */
window.NODES['la.dot'] = {
  id: 'la.dot', num: '3.2', trackId: 'linear-algebra',
  title: 'Dot Product & Projections',
  minutes: 35,
  payoff: 'similarity search · lighting',
  levels: {

    l1: {
      html: `
<h4>One number for "how aligned?"</h4>
<p>Two arrows. Are they pulling the same way, sideways to each other, or against each other? The <span class="term">dot product</span> compresses the answer into a single number:</p>
<ul>
  <li><b>u · v &gt; 0</b> — broadly the same direction (angle under 90°)</li>
  <li><b>u · v = 0</b> — exactly perpendicular. No cooperation at all.</li>
  <li><b>u · v &lt; 0</b> — working against each other (angle past 90°)</li>
</ul>
<p>The <span class="term">projection</span> picture: shine a light straight down onto u's line; v's <em>shadow</em> on that line is v's projection onto u. The dot product measures that shadow (scaled by ‖u‖). Perpendicular vectors cast no shadow on each other — that is what the zero means.</p>
<div class="callout amber"><p><b>Sign first, size second.</b> Before any formula, the SIGN of the dot product already answers real questions: is the enemy in front of me or behind? Is this force helping or fighting the motion? Same-ish or opposite-ish is one multiplication away.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Two vectors point in nearly the same direction. Their dot product is…`,
          options: [
            { t: 'Positive — alignment shows up as a plus sign', ok: true, why: 'Angle under 90° ⟹ positive dot. The closer to parallel, the larger it grows (maxing at ‖u‖‖v‖ when exactly parallel).' },
            { t: 'Zero — they don’t touch', ok: false, why: 'Zero is reserved for exact perpendicularity — total non-alignment. Touching is irrelevant; vectors have no location (3.1).' },
            { t: 'Negative — products of directions flip sign', ok: false, why: 'Negative means OPPOSING directions (angle past 90°). Sign tracks agreement, not some arbitrary flip.' }
          ],
          hints: ['Map the three sign cases to the three geometric relationships.', 'Same-ish → ? Perpendicular → 0. Opposing → ?']
        },
        {
          type: 'mcq',
          prompt: `u · v = 0 for two nonzero vectors. Geometrically, this means…`,
          options: [
            { t: 'They are perpendicular — v casts no shadow on u’s line', ok: true, why: 'Zero dot ⟺ 90° angle ⟺ zero projection. The algebra test for perpendicularity — no protractor required.' },
            { t: 'One of them is the zero vector', ok: false, mis: 'zero-product-zero-factor', why: 'Number instinct misfiring: for reals, ab = 0 forces a zero factor — for vectors it does not! (1,0)·(0,1) = 0 with both alive and well. Dot products have "zero divisors"; geometry is why.' },
            { t: 'They are identical', ok: false, why: 'Identical nonzero vectors give v·v = ‖v‖² > 0 — the most positive case, not zero.' }
          ],
          hints: ['What angle makes the shadow vanish entirely?', '90°. What do we call that pair?'],
          edge: 'The broken "ab=0 ⟹ a=0 or b=0" instinct matters: orthogonality is everywhere BECAUSE many nonzero pairs multiply to zero — it is a feature, not a bug.'
        },
        {
          type: 'mcq',
          prompt: `Sun directly overhead; a stick leans at an angle. Its shadow on the ground is the stick's…`,
          options: [
            { t: 'Projection onto the ground direction — the aligned component, sideways part discarded', ok: true, why: 'Projection = "how much of this vector lies along that direction". The vertical part of the stick casts nothing; the horizontal part IS the shadow. Dot products compute exactly this decomposition.' },
            { t: 'Reflection', ok: false, why: 'Reflection flips across a line, preserving length. Shadows SHORTEN — a leaning stick’s shadow is shorter than the stick. Losing the perpendicular part is the signature of projection.' },
            { t: 'Rotation onto the ground', ok: false, mis: 'projection-preserves-length', why: 'Rotating the stick down keeps its full length — but a 45° stick’s shadow is only ~71% of its length. Projection is lossy by design: it answers "how much ALONG this line", not "how long overall".' }
          ],
          hints: ['Compare the shadow’s length to the stick’s length.', 'Shorter (unless flat). Which operation shortens by discarding a perpendicular part?']
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Two formulas, one number</h4>
<pre><code>u · v = u₁v₁ + u₂v₂ + ⋯ + uₙvₙ          (algebraic — how you compute)
u · v = ‖u‖ ‖v‖ cos θ                    (geometric — what it means)</code></pre>
<p>The first is a sum of componentwise products — trivially programmable in any dimension. The second says that number equals the product of the lengths times the cosine of the angle between them. Setting them equal gives the angle machine:</p>
<pre><code>cos θ = (u · v) / (‖u‖ ‖v‖)              "cosine similarity": +1 parallel · 0 perpendicular · −1 opposite</code></pre>
<h4>Useful identities</h4>
<ul>
  <li><b>v · v = ‖v‖²</b> — a vector dotted with itself is its squared length (the length formula was a dot product all along).</li>
  <li><b>Symmetry & linearity:</b> u·v = v·u, and u·(v + w) = u·v + u·w, (cu)·v = c(u·v).</li>
  <li><b>Projection of v onto u:</b> the shadow's length (signed) is (u·v)/‖u‖; the shadow vector is ((u·v)/(u·u)) u.</li>
</ul>
<p>Check the perpendicular test live: (2, 1) · (−1, 2) = −2 + 2 = 0 ✓ — and notice the recipe hiding there: swap the components and negate one, and you manufacture a perpendicular vector on demand.</p>`,
      questions: [
        {
          type: 'input',
          prompt: `(1, 2) · (3, 4) = ?`,
          accept: ['11'],
          placeholder: '…',
          hints: ['Multiply matching components, then add.', '1·3 + 2·4.'],
          why: '1·3 + 2·4 = 11. Multiply-in-place, sum — the pattern CPUs even have a dedicated instruction for (FMA).'
        },
        {
          type: 'mcq',
          prompt: `Which vector is perpendicular to (2, 1)?`,
          options: [
            { t: '(−1, 2) — the dot product gives −2 + 2 = 0', ok: true, why: 'Zero dot = perpendicular. The general recipe: (a, b) ⊥ (−b, a) always, since a(−b) + ba = 0 — rotate-90° by swap-and-negate.' },
            { t: '(1, 2) — the reversed components', ok: false, mis: 'swap-without-negate', why: 'Half the recipe: (2,1)·(1,2) = 2+2 = 4 ≠ 0. The swap needs its negation partner — without the sign flip the products reinforce instead of cancel.' },
            { t: '(−2, −1) — the opposite vector', ok: false, why: 'Opposite is parallel, the least perpendicular possible: dot = −4−1 = −5, maximally negative. Anti-alignment ≠ orthogonality.' }
          ],
          hints: ['Test each candidate: does the dot product vanish?', '(2)(−1) + (1)(2) = ?'],
          edge: 'The swap-negate recipe (−b, a) IS the 90° rotation matrix from the next node, acting one vector at a time.'
        },
        {
          type: 'mcq',
          prompt: `Why does v · v = ‖v‖² hold?`,
          options: [
            { t: 'Componentwise it is v₁² + ⋯ + vₙ² — the length formula before the square root', ok: true, why: 'Both formulas agree: algebraically it is the sum of squares; geometrically it is ‖v‖‖v‖cos 0° = ‖v‖². Length is a special case of dot — one primitive, two services.' },
            { t: 'By convention, to make formulas tidy', ok: false, mis: 'convention-dodge', why: 'No convention — compute it: (3,4)·(3,4) = 9+16 = 25 = 5². It falls out of the definitions, which is worth checking once by hand to believe forever.' },
            { t: 'It only holds for unit vectors', ok: false, why: 'For unit vectors it says 1 = 1 — true but the least interesting case. The identity is universal, and it is why code computes ‖v‖² instead of ‖v‖ whenever it can (no square root needed for comparisons).' }
          ],
          hints: ['Write out v · v componentwise.', 'Compare with the ‖v‖ definition from 3.1.'],
          edge: 'Engineering payoff: comparing distances needs no sqrt — compare squared lengths instead. dist²(a,b) < r² is the idiom; sqrt is the tax you skip.'
        },
        {
          type: 'mcq',
          prompt: `u = (1, 0), v = (1, 1). The cosine similarity cos θ = (u·v)/(‖u‖‖v‖) is…`,
          options: [
            { t: '1/√2 ≈ 0.707 — the 45° angle between them', ok: true, why: 'u·v = 1, ‖u‖ = 1, ‖v‖ = √2 → cos θ = 1/√2, so θ = 45°. The formula turns coordinates into angles with no trigonometry tables.' },
            { t: '1 — both have a 1 in the x slot', ok: false, mis: 'similarity-inflation', why: 'cos θ = 1 demands EXACT alignment (θ = 0). v also spends energy on y, which the normalization by ‖v‖ = √2 faithfully discounts. Sharing a component ≠ parallel.' },
            { t: '0.5 — halfway aligned', ok: false, why: '"Halfway" by angle (45° of 90°) does not mean 0.5 of cosine — cosine is nonlinear in angle: cos 45° ≈ 0.707, cos 60° = 0.5. Compute, don’t interpolate.' }
          ],
          hints: ['Compute the three ingredients: u·v, ‖u‖, ‖v‖.', '1, 1, and √2. Assemble.'],
          edge: 'cos 60° = 0.5 while cos 45° ≈ 0.707 — similarity scores cluster high; a 0.7 is a wider angle than intuition suggests. Calibrate before thresholding.'
        },
        {
          type: 'mcq',
          prompt: `The projection ("shadow") of v = (3, 4) onto u = (1, 0) is…`,
          options: [
            { t: '(3, 0) — the x-component survives; the y-part is perpendicular to u and vanishes', ok: true, why: 'Projecting onto the x-axis keeps exactly the aligned part: ((u·v)/(u·u))u = (3/1)(1,0) = (3,0). Projection onto an axis = reading off a coordinate — coordinates ARE projections.' },
            { t: '(3, 4) — projection preserves the vector', ok: false, mis: 'projection-preserves-length', why: 'Then it would do nothing! Projection is deliberately lossy: the (0,4) part — perpendicular to u — is exactly what gets discarded. Shadow, not clone.' },
            { t: '(1.5, 2) — half of v', ok: false, why: 'Scaling shrinks both components proportionally; projection ANNIHILATES one direction and preserves the other. Different geometry entirely: shadows are not miniatures.' }
          ],
          hints: ['u points along x. What is v’s shadow on the x-axis?', 'Formula check: (u·v) = 3, (u·u) = 1, so 3·(1,0).'],
          edge: 'Decomposition preview: v = (3,0) + (0,4) — the part along u plus the part perpendicular. Splitting vectors this way against a whole basis is where node 3.6 is heading.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Cosine similarity runs the recommender economy</h4>
<pre><code>const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
const cosSim = (u, v) => dot(u, v) / (Math.hypot(...u) * Math.hypot(...v));</code></pre>
<p>Songs, products, documents, faces — embedded as vectors (3.1), compared by angle. Why angle instead of distance? A long document and its summary point the <em>same direction</em> in topic-space at very different lengths; cosine sees twins where distance sees strangers. Choosing the comparison IS the modeling decision.</p>
<h4>Lambert's law: dot products render your screen</h4>
<pre><code>brightness = max(0, dot(surfaceNormal, lightDir))   // both unit vectors</code></pre>
<p>A surface facing the light (cos θ = 1) glows; edge-on (0) goes dark; facing away would be negative — clamped by <code>max(0, …)</code>. Every frame of every 3D game computes millions of these. When the Render Engine powers on, remember: it is dot products all the way down.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Search embeddings: a 40-page manual and its 1-paragraph abstract cover the same topic. Which comparison rates them as near-twins?`,
          options: [
            { t: 'Cosine similarity — same direction in topic-space; the length gap (verbosity) is normalized away', ok: true, why: 'Dividing by both norms makes the score length-blind: only the DIRECTION (topic mix) remains. Euclidean distance would report them far apart — punishing the manual for being long, not different.' },
            { t: 'Euclidean distance — geometry’s native comparison', ok: false, mis: 'one-true-metric', why: 'Native, yes; appropriate, sometimes. Distance couples direction AND magnitude — right for positions, wrong when magnitude encodes verbosity you want ignored. The metric is a modeling choice, not a default.' },
            { t: 'Exact equality of the vectors', ok: false, why: 'Embeddings of different texts are never bitwise equal — equality is the degenerate similarity that answers only "identical?", the one question retrieval never asks.' }
          ],
          hints: ['What differs between the two embeddings: their direction, or mostly their magnitude?', 'Which comparison ignores magnitude by construction?'],
          edge: 'Rule of thumb: cosine for text/embeddings (direction = meaning), Euclidean for physical space (magnitude = actual distance). Mixed cases exist — think before you metric.'
        },
        {
          type: 'mcq',
          prompt: `Lambert lighting: <code>brightness = max(0, dot(n, l))</code> with unit vectors. Why the <code>max(0, …)</code>?`,
          options: [
            { t: 'Negative dot = surface facing away from the light — it gets darkness, not negative light', ok: true, why: 'cos θ < 0 past 90° would SUBTRACT light, brightening nothing and corrupting later additive light passes. Clamping encodes the physics: back-faces are simply unlit. The sign analysis of L1, deciding pixels.' },
            { t: 'Performance — max is faster than negative numbers', ok: false, mis: 'perf-explains-semantics', why: 'max costs the same as any comparison; the clamp is CORRECTNESS. Remove it and dark sides of objects develop negative-light artifacts that poison bloom and tone mapping downstream.' },
            { t: 'To keep brightness under 1', ok: false, why: 'Unit vectors already cap the dot at +1 — the top needs no clamp. The danger is the bottom: the max guards against sign, not magnitude.' }
          ],
          hints: ['What does a negative n·l mean geometrically for the surface and the light?', 'Facing away. What brightness should that surface get?'],
          edge: 'The un-clamped negative value is not garbage though — its magnitude says HOW MUCH the surface faces away, which translucency shaders (leaves, skin) actually use. Know what you clamp.'
        },
        {
          type: 'mcq',
          prompt: `An AI enemy should react only when the player is <b>in front of it</b>. With f = facing direction, p = vector to player (both from the enemy), the cheapest correct test is…`,
          options: [
            { t: '<code>dot(f, p) > 0</code> — positive means the player is within 90° of dead ahead', ok: true, why: 'The sign of the dot IS the front/behind bit — one multiply-add, no angles, no sqrt, no trig. For a narrower cone, compare cosSim(f,p) against cos(coneAngle): still no arctangent in sight.' },
            { t: 'Compute the angle with Math.atan2 and compare against 90°', ok: false, mis: 'angle-detour', why: 'Correct and wasteful: atan2 + comparisons recover the full angle only to ask for its sign — which the raw dot already had. Extract angles only when you NEED degrees; comparisons live happily in cosine-land.' },
            { t: '<code>‖p‖ < RANGE</code> — close enough means visible', ok: false, why: 'Distance is omnidirectional — it triggers on players sneaking up BEHIND. Range and facing are independent tests; this one answers the wrong question entirely.' }
          ],
          hints: ['Which single number distinguishes "ahead-ish" from "behind-ish"?', 'The sign of dot(facing, toPlayer).'],
          edge: 'The full stealth-game vision check: dot sign (front?) + squared distance (near?) + a raycast (unobstructed?) — three nodes of this track composed into one game mechanic.'
        }
      ]
    }
  }
};
