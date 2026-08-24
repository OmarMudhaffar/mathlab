/* Track 3 content — nodes 3.7, 3.8 and the Render Engine boss */

/* ============ 3.7 DETERMINANTS ============ */
window.NODES['la.determinant'] = {
  id: 'la.determinant', num: '3.7', trackId: 'linear-algebra',
  title: 'Determinants',
  minutes: 30,
  payoff: 'invertibility · orientation · area scaling',
  levels: {

    l1: {
      widget: 'matrixlab',
      html: `
<h4>One number per matrix: the area receipt</h4>
<p>Every 2×2 matrix warps the plane — and warps <em>areas</em> by one uniform factor. That factor is the <span class="term">determinant</span>. A unit square (area 1) becomes a parallelogram of area |det|; every other shape follows suit, because linearity treats all regions alike.</p>
<ul>
  <li><b>det = 2:</b> all areas double. <b>det = 1:</b> areas untouched (rotations, shears!).</li>
  <li><b>det &lt; 0:</b> areas scale by |det| but the plane is <em>flipped</em> — a mirror world where clockwise becomes counter-clockwise.</li>
  <li><b>det = 0:</b> areas become zero — the collapse you built by hand in 3.3. A dimension died.</li>
</ul>
<div class="callout amber"><p><b>Back to the playground:</b> the det readout has been there all along. Drag î and ĵ and watch the amber unit square — its area IS the det. Cross the arrows past each other and watch the sign flip at the exact moment of collapse.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A matrix has det = 3. A triangle of area 5 goes through it. Output area?`,
          options: [
            { t: '15 — every region’s area scales by |det|', ok: true, why: 'The determinant is the universal area multiplier: 5 × 3 = 15. One number, all shapes — uniformity is linearity’s gift.' },
            { t: '8 — area plus determinant', ok: false, why: 'The det MULTIPLIES areas; nothing here adds. Scale factors compose multiplicatively — like percentages, not like offsets.' },
            { t: 'Cannot tell without knowing the triangle’s shape', ok: false, mis: 'shape-dependent-scaling', why: 'The remarkable theorem is exactly that shape is irrelevant: linear maps scale ALL areas identically. That is why one number per matrix suffices.' }
          ],
          hints: ['The det is a per-area multiplier.', '5 × 3.']
        },
        {
          type: 'mcq',
          prompt: `In the playground you drag ĵ onto î's line — det hits 0. What does det = 0 announce?`,
          options: [
            { t: 'Collapse: the plane flattens to a line, areas vanish, and the map cannot be undone', ok: true, why: 'Zero area = a lost dimension = dependent columns (3.6) = information destroyed. No inverse can exist: many inputs share each output, and "which one was it?" is unanswerable (1.6’s injectivity, failing).' },
            { t: 'The matrix is very small', ok: false, mis: 'det-measures-size', why: 'Entry sizes and det are unrelated: [[1000, 2000],[500, 1000]] has huge entries and det = 0. The det measures what the map DOES to area, not how big its numbers look.' },
            { t: 'The transformation is a rotation', ok: false, why: 'Rotations have det = +1 — they are area-PRESERVING, the opposite of collapse. det 0 is the degenerate regime, det 1 the rigid one.' }
          ],
          hints: ['What happened to the unit square’s area at that moment?', 'Zero area — where did the second dimension go?'],
          edge: 'The chain is now complete: det = 0 ⟺ dependent columns ⟺ rank < 2 ⟺ not invertible ⟺ the 3.3 collapse. Five phrasings, one event.'
        },
        {
          type: 'mcq',
          prompt: `det = −1 (say, a reflection). What does the minus sign mean?`,
          options: [
            { t: 'Orientation flipped: the plane is mirrored — clockwise loops now run counter-clockwise. Areas still scale by |−1| = 1.', ok: true, why: 'The sign is an orientation bit riding along with the area factor. Reflections flip it; rotations (det +1) never do — which is precisely why no amount of rotating produces a mirror image.' },
            { t: 'Areas became negative', ok: false, mis: 'negative-area', why: 'Areas are sizes — never negative. The sign encodes a different fact (handedness); the SIZE information is |det|. One number smuggling two messages.' },
            { t: 'The matrix made an arithmetic error', ok: false, why: 'Negative determinants are healthy and meaningful — half of all invertible matrices have one. The sign is data, not damage.' }
          ],
          hints: ['Compare your left hand and its mirror image — same size, different… what?', 'Handedness. That is what the sign tracks.'],
          edge: 'Preview of use: 3D engines cull back-faces by exactly this sign — a triangle facing away has flipped winding, detected by a determinant.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The 2×2 formula</h4>
<pre><code>det [a  b]  =  ad − bc        (columns (a,c) and (b,d))
    [c  d]</code></pre>
<p>Where it comes from: the parallelogram spanned by the two columns has area |ad − bc| — base-times-height, ground through coordinates. The cross-term bc subtracts the sheared-off overlap.</p>
<h4>The theorems that do daily work</h4>
<ul>
  <li><b>det(A) = 0 ⟺ columns dependent ⟺ rank &lt; n ⟺ A not invertible.</b> One cheap number answers the expensive question "can this be undone?"</li>
  <li><b>det(AB) = det(A)·det(B).</b> Scale areas by 3, then by 2 — net ×6. Composition multiplies receipts (and det(A⁻¹) = 1/det(A) falls out for free).</li>
  <li><b>det(I) = 1</b> — doing nothing scales nothing.</li>
  <li>Rotations: det = +1. Reflections: −1. Shears: +1 (tilt without area change — verify: [1 1; 0 1] gives 1·1 − 1·0 = 1).</li>
</ul>`,
      questions: [
        {
          type: 'input',
          prompt: `det of the matrix with rows [2 1] and [1 3] = ?`,
          accept: ['5'],
          placeholder: '…',
          hints: ['ad − bc with a=2, b=1, c=1, d=3.', '2·3 − 1·1.'],
          why: '2·3 − 1·1 = 5: this map magnifies every area fivefold, no flip.'
        },
        {
          type: 'mcq',
          prompt: `Before solving Ax = b, a program checks det(A). What is it really asking?`,
          options: [
            { t: '"Is A invertible — does a unique solution exist?" det ≠ 0 says yes; det = 0 says collapse (no solution or infinitely many)', ok: true, why: 'The det is the cheapest invertibility oracle: nonzero ⟺ full rank ⟺ the 3.5 elimination will find a full pivot staircase. Zero ⟹ the system is one of the two degenerate endgames.' },
            { t: '"Is the solution large?" — big det means big answers', ok: false, mis: 'det-measures-size', why: 'No relation: det(2I) = 4 in 2D while halving… wait — 2I DOUBLES vectors. The point stands differently: det speaks about A’s geometry, not about x’s magnitude, which depends on b too.' },
            { t: '"Is A symmetric?"', ok: false, why: 'Symmetry is visible by inspection (compare Aᵀ) and is independent of invertibility — symmetric singular matrices exist ([1 1; 1 1], det 0). Different question, different test.' }
          ],
          hints: ['Which property of A decides unique-vs-degenerate for Ax = b?', 'Invertibility. Which single number certifies it?'],
          edge: 'Numerical caveat for later: det NEAR zero (relative to entries) already spells trouble in floats — "ill-conditioned". The clean zero/nonzero dichotomy softens in ℝ-as-implemented.'
        },
        {
          type: 'mcq',
          prompt: `det(A) = 3 and det(B) = 2. What is det(AB), and why?`,
          options: [
            { t: '6 — apply B (areas ×2), then A (×3): scale factors compose by multiplying', ok: true, why: 'det(AB) = det(A)det(B) is the area-receipt law: consecutive magnifications multiply. Corollary worth owning: det(A⁻¹) = 1/det(A), since undoing a ×3 must be a ×⅓.' },
            { t: '5 — determinants add under composition', ok: false, mis: 'det-additive', why: 'Adding is for offsets; scaling composes multiplicatively (200% of 300% is 600%). Note also det(A + B) ≠ det(A) + det(B) in general — the det respects products, not sums.' },
            { t: 'Cannot tell — depends on the matrices, not just their dets', ok: false, why: 'For the PRODUCT’s det, the two receipts suffice — that is the theorem’s whole charm. (For A + B you would indeed need the matrices; sums are the lawless case.)' }
          ],
          hints: ['Track a unit square through B, then through A.', '×2, then ×3 — net?'],
          edge: 'Elegant consequence: det(Rⁿ) = 1ⁿ = 1 for any rotation power — no pile-up of rotations can ever change an area. The algebra knows the geometry.'
        },
        {
          type: 'mcq',
          prompt: `The shear [1 1; 0 1] tilts the plane dramatically — yet det = 1. How can a big visual change preserve all areas?`,
          options: [
            { t: 'Shears slide layers sideways like a deck of cards — each region skews but its base and height survive', ok: true, why: 'ad − bc = 1·1 − 1·0 = 1 ✓. The unit square becomes a parallelogram of identical base and height: same area, wildly different shape. det measures AREA, and is silent about angles and lengths — a lossy but honest summary.' },
            { t: 'It cannot — the formula must be misapplied', ok: false, why: 'The formula is fine; the surprise is real and instructive. Visual drama and area change are independent axes — shears max out one at zero of the other.' },
            { t: 'det = 1 means the matrix is the identity', ok: false, mis: 'det-determines-matrix', why: 'Many matrices share det 1: identity, all rotations, all shears… det is a one-number SUMMARY (like a hash — 3.8 will add eigenvalues to the profile), never a fingerprint. det(A) = det(B) ⇏ A = B.' }
          ],
          hints: ['Compute the det. Then picture the unit square’s image: base? height?', 'Base 1, height 1 still — area 1, shape skewed.'],
          edge: 'Card-deck physics is real: shear flows in fluids are area/volume-preserving, and det = 1 matrices ("SL(2)") form the mathematics of incompressible motion.'
        },
        {
          type: 'mcq',
          prompt: `A composite transform is built as M = R · S where R rotates and S is the collapse [1 2; 2 4]… wait — first: det(S)?  And then det(M)?`,
          options: [
            { t: 'det(S) = 1·4 − 2·2 = 0, so det(M) = det(R)·0 = 0 — one singular stage poisons the whole pipeline', ok: true, why: 'Zero propagates through products: any collapsed stage collapses the composition, and no later transform resurrects the lost dimension (rotating a line yields a line). Pipelines are only as invertible as their weakest stage.' },
            { t: 'det(M) = det(R) — the rotation dominates', ok: false, why: 'Multiplication has no "dominant factor" when one factor is 0. The rotation faithfully rotates… the collapsed line S produced. Order cannot save it either: S·R is equally flat.' },
            { t: 'Cannot tell without multiplying out M', ok: false, mis: 'product-rule-forgotten', why: 'det(AB) = det(A)det(B) answers it from the receipts alone — no matrix arithmetic needed. Knowing WHICH questions the summary answers saves real computation.' }
          ],
          hints: ['Compute det(S) from the formula first.', '1·4 − 2·2. Then apply the product rule.'],
          edge: 'Debugging translation: a render pipeline outputting a flattened world has a det-0 stage SOMEWHERE — and the product rule says you can binary-search for it by checking dets of partial products.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Where the sign earns money: winding and culling</h4>
<pre><code>// signed area of triangle (a, b, c) — a 2×2 det of edge vectors:
const cross = (a, b, c) => (b.x-a.x)*(c.y-a.y) - (b.y-a.y)*(c.x-a.x);
// > 0: counter-clockwise ·  < 0: clockwise ·  = 0: the three points are collinear</code></pre>
<p>One determinant answers "which way does this triangle wind?" — the primitive under back-face culling (skip triangles facing away), polygon orientation tests, and "is this point left or right of that line?" in every geometry library.</p>
<h4>det as a health check</h4>
<ul>
  <li><b>Before inverting a transform:</b> |det| tiny ⟹ near-collapse ⟹ the inverse multiplies noise enormously. Physics engines clamp or reject such matrices.</li>
  <li><b>Collinearity test:</b> the cross() above returning ~0 flags degenerate triangles that would render as slivers or divide by zero in barycentric math.</li>
  <li><b>Debug heuristic:</b> a model rendering mirror-imaged? Somewhere a stage has det &lt; 0 — usually an odd number of axis flips.</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `The cross() function above returns −8 for triangle (a, b, c). What do you know?`,
          options: [
            { t: 'The vertices wind clockwise, and the triangle’s area is |−8|/2 = 4', ok: true, why: 'The det of the two edge vectors is the signed parallelogram area: sign = winding (orientation bit!), half the magnitude = triangle area. Two facts, one determinant, zero branches.' },
            { t: 'The triangle is invalid — negative result', ok: false, mis: 'negative-area', why: 'Negative is INFORMATION, not error: this triangle is wound clockwise, which back-face culling reads as "facing away — skip me". Discarding the sign would discard the feature.' },
            { t: 'The triangle is 8 units wide', ok: false, why: 'The magnitude is a doubled AREA, not a width — no single length is recoverable from it (many shapes share one area, the det-is-a-summary lesson again).' }
          ],
          hints: ['What two facts does the signed area carry?', 'Sign → winding; magnitude → parallelogram area (triangle = half).'],
          edge: 'Same one-liner answers "is point P left of line AB?" — cross(A, B, P)’s sign. Computational geometry is astonishingly much this determinant, repeated.'
        },
        {
          type: 'mcq',
          prompt: `A character model renders as its own mirror image after an artist "flipped it to face left" by scaling x by −1 somewhere in the chain. det-wise, what happened and what is the clean fix?`,
          options: [
            { t: 'The chain’s det went negative (one axis flip = one orientation reversal); fix by rotating 180° about y instead (det +1) or flipping an even number of axes', ok: true, why: 'Scale(−1, 1) has det −1: a true mirror — geometry AND textures AND winding all reverse (culling breaks too!). A y-rotation faces the model left with det +1: same intent, orientation intact. Know which operations touch the sign.' },
            { t: 'Nothing det-related — mirroring is a texture problem', ok: false, why: 'The texture reversal is a SYMPTOM; the cause is the orientation flip, which also breaks winding-based culling and normal maps. The det diagnosis explains all symptoms at once — that is what a good invariant does.' },
            { t: 'det went to zero — the model collapsed', ok: false, mis: 'flip-vs-collapse', why: 'det(scale(−1,1)) = −1, not 0: mirrored, fully 2D, invertible. Collapse (det 0) would render a LINE. Flip and collapse are different failure modes with different signatures — the sign vs the magnitude.' }
          ],
          hints: ['Compute det of scale(−1, 1) = [−1 0; 0 1].', '−1: what does a negative det do to orientation, winding, culling?'],
          edge: 'Rule of thumb in every engine’s docs: avoid negative scales; prefer rotations. Now you know the theorem the docs are paraphrasing.'
        },
        {
          type: 'mcq',
          prompt: `A physics engine refuses to invert a contact matrix with det = 10⁻¹³ (entries ~1). Why reject rather than proceed — mathematically it IS invertible?`,
          options: [
            { t: 'Near-zero det means near-collapse: the inverse magnifies rounding noise by ~1/det, turning float dust into forces of magnitude 10¹³', ok: true, why: 'Invertible-in-ℝ is not invertible-in-float64: dividing by an almost-vanished area amplifies the ~10⁻¹⁶ rounding floor into garbage that LOOKS like physics. Clamping/regularizing near-singular matrices is standard defensive numerics.' },
            { t: 'Small determinants indicate small, unimportant objects', ok: false, mis: 'det-measures-size', why: 'The det measures the transform’s area factor, not the object’s size — a huge object can produce a nearly-singular contact matrix (e.g., nearly-parallel contact normals). Importance and det are strangers.' },
            { t: 'The engine is being overly cautious — floats have 16 digits', ok: false, why: 'Those 16 digits are exactly the budget: 1/10⁻¹³ spends 13 of them on amplification, leaving ~3 digits of signal. The caution is arithmetic, not temperament.' }
          ],
          hints: ['If areas shrink by 10⁻¹³, what does the INVERSE do to areas — and to error?', 'Magnifies by 10¹³. Compare to float64’s ~10⁻¹⁶ noise floor.'],
          edge: 'The professional-grade version of this number is the "condition number" — det’s more honest cousin. Meet it in a numerical methods course; the instinct starts here.'
        }
      ]
    }
  }
};

/* ============ 3.8 EIGENVALUES & EIGENVECTORS ============ */
window.NODES['la.eigen'] = {
  id: 'la.eigen', num: '3.8', trackId: 'linear-algebra',
  title: 'Eigenvalues & Eigenvectors',
  minutes: 40,
  payoff: 'PageRank · stability · PCA teaser',
  levels: {

    l1: {
      html: `
<h4>The directions that don't turn</h4>
<p>Run every arrow of the plane through a matrix. Almost all of them come out <em>rotated</em> — pointing somewhere new. But some special arrows come out pointing <b>exactly the way they went in</b>, merely stretched or squashed. These unturned directions are the <span class="term">eigenvectors</span>; the stretch factor each one experiences is its <span class="term">eigenvalue</span> λ.</p>
<pre><code>A v = λ v      "A treats v like a scalar treats it"</code></pre>
<ul>
  <li>Stretch-the-x-axis matrix: the x-axis itself doesn't turn (λ = the stretch); neither does y (λ = 1).</li>
  <li>Uniform scale ×2: EVERY direction is eigen, all with λ = 2.</li>
  <li>Rotation by 90°: every direction turns — <em>no</em> (real) eigenvectors at all.</li>
</ul>
<div class="callout amber"><p><b>Why hunt for them?</b> Along an eigen-direction, the fearsome matrix becomes a humble number. Decompose the world into eigen-directions and matrix problems fall apart into scalar problems — the single most-used simplification in applied math.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `v is an eigenvector of A with eigenvalue λ = 3. What does A do to v?`,
          options: [
            { t: 'Keeps its direction exactly, stretches its length ×3', ok: true, why: 'Av = 3v: same line, triple length. The matrix’s full machinery — for this one direction — collapses to "multiply by 3".' },
            { t: 'Rotates it by 3 radians', ok: false, mis: 'eigen-rotates', why: 'Eigen-ness is precisely NOT rotating — the unturned directions are the whole definition. λ speaks of stretch, never of angle.' },
            { t: 'Moves it 3 units to the right', ok: false, why: 'Linear maps don’t translate (T(0) = 0, node 3.3) — and eigen behavior is proportional scaling, the purest non-move there is.' }
          ],
          hints: ['Read Av = λv aloud: A applied to v equals… a scalar times v.', 'Scalar times v = same direction, scaled length.']
        },
        {
          type: 'mcq',
          prompt: `For the uniform scaling matrix 2I ("everything ×2"), which vectors are eigenvectors?`,
          options: [
            { t: 'Every nonzero vector — all with eigenvalue 2', ok: true, why: '2I·v = 2v for all v: no direction turns, all stretch alike. The degenerate-but-instructive extreme: maximal eigen-abundance.' },
            { t: 'Only î and ĵ — the axes', ok: false, mis: 'axes-only', why: 'The axes are eigen for DIAGONAL matrices with distinct entries; uniform scaling is even more generous — direction-blind, so every direction qualifies. Eigenvectors need not be axis-aligned in general, either.' },
            { t: 'None — scaling changes every vector', ok: false, why: 'Changing LENGTH is allowed — encouraged, even; λ records it. What disqualifies is changing DIRECTION, which uniform scaling never does.' }
          ],
          hints: ['Does any arrow change direction under "double everything"?', 'No — so which arrows satisfy Av = 2v?']
        },
        {
          type: 'mcq',
          prompt: `Rotation by 90°. Its (real) eigenvectors are…`,
          options: [
            { t: 'None — every direction turns by 90°, so no arrow keeps its line', ok: true, why: 'Eigen-less (over the reals): the definition finds nothing to hold onto when everything rotates. (Complex numbers rescue this — rotation has eigenvalues ±i — a story for a later course.)' },
            { t: '(1, 0) — the x-axis is always special', ok: false, mis: 'axes-only', why: 'Check it: the rotation sends (1,0) to (0,1) — a new direction entirely. Axes carry no built-in privilege; eigen-ness is earned per-matrix, verified by computing Av.' },
            { t: 'Every vector — rotation preserves lengths', ok: false, why: 'Preserving LENGTH is orthogonality’s virtue; eigen-ness demands preserved DIRECTION. Rotations ace the first and fail the second everywhere.' }
          ],
          hints: ['Take any arrow; where does a quarter-turn send it?', 'Off its own line, always. What does that leave for Av = λv?'],
          edge: 'The census so far: uniform scale — all directions eigen; diagonal — the axes; rotation — none (real). Matrices differ wildly in eigen-personality, and that personality is the profile 3.8 L2 formalizes.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Definition, with its fine print</h4>
<p>λ is an <span class="term">eigenvalue</span> of A if Av = λv for some <b>v ≠ 0</b>; every such v is an eigenvector for λ. The v ≠ 0 clause is load-bearing: A·0 = 0 = λ·0 holds for EVERY λ, so allowing v = 0 would crown every number an eigenvalue and the concept would dissolve. (Vacuous solutions must be legislated away — a 1.4 instinct.)</p>
<h4>Reading eigen-data off easy matrices</h4>
<pre><code>diagonal [2 0; 0 3]:  î is eigen with λ = 2,  ĵ with λ = 3.
   (each axis scaled by its own diagonal entry — diagonal matrices wear
    their eigenvalues on their face, which is why everyone wants to diagonalize)</code></pre>
<h4>The power of powers</h4>
<p>Apply A repeatedly along an eigen-direction: A²v = A(λv) = λ²v, and generally <b>Aⁿv = λⁿv</b>. Long-run behavior becomes a |λ| story:</p>
<ul>
  <li>|λ| &gt; 1 — that direction <b>explodes</b> geometrically;</li>
  <li>|λ| &lt; 1 — it <b>decays</b> to nothing;</li>
  <li>|λ| = 1 — it persists.</li>
</ul>
<p>Mix a starting vector from several eigen-directions and iterate: the largest |λ| wins — everything else fades relative to it. The <span class="term">dominant eigenvector</span> is where repeated application of A herds the whole space.</p>`,
      questions: [
        {
          type: 'input',
          prompt: `The eigenvalues of the diagonal matrix [2 0; 0 3] — enter both, comma-separated.`,
          accept: ['2,3', '3,2', '2, 3', '3, 2'],
          placeholder: 'λ₁, λ₂',
          hints: ['What happens to î? To ĵ?', 'Each axis is scaled by its diagonal entry.'],
          why: 'λ = 2 (direction î) and λ = 3 (direction ĵ). Diagonal matrices publish their eigen-data openly — the reason "diagonalize" is a verb of desire.'
        },
        {
          type: 'mcq',
          prompt: `For A = [2 0; 0 3], is v = (1, 1) an eigenvector?`,
          options: [
            { t: 'No — Av = (2, 3), which is not a multiple of (1, 1): the direction changed', ok: true, why: 'The test is mechanical: compute Av, check proportionality. (2,3) ∦ (1,1) — v leans more toward y after the map. Only the axes survive unturned here; superpositions of different-λ directions always bend.' },
            { t: 'Yes — with eigenvalue 2.5, the average', ok: false, mis: 'eigen-averages', why: 'Seductive and wrong: (2.5, 2.5) ≠ (2, 3). Eigen-ness is exact proportionality, not approximate blend — a vector mixing two eigen-directions is NOT eigen (each part scales differently, bending the sum).' },
            { t: 'Yes — every vector is eigen for a diagonal matrix', ok: false, why: 'Only for MULTIPLES of I. Distinct diagonal entries (2 ≠ 3) break direction-blindness: the axes are eigen, their mixtures are not. Verify by computing — the two-line check beats every heuristic.' }
          ],
          hints: ['Compute Av componentwise.', '(2·1, 3·1) = (2, 3). Is that λ·(1, 1) for any λ?'],
          edge: 'The bending of mixtures is a feature: iterate A and the (1,1) vector tilts ever more toward the λ=3 axis — the dominant-eigenvector herding, visible in one example.'
        },
        {
          type: 'mcq',
          prompt: `Why does the definition demand v ≠ 0?`,
          options: [
            { t: 'A·0 = λ·0 holds for every λ — the zero vector would make every number an "eigenvalue" and the concept would say nothing', ok: true, why: 'Definitions exclude degenerate witnesses so the property discriminates. With v ≠ 0, "λ is an eigenvalue" is real information about A; without it, vacuously universal noise (Track 1’s vacuous-truth radar, applied to definitions).' },
            { t: 'The zero vector has no direction to preserve', ok: false, why: 'True and relevant — but it is the geometric half of the story. The killer argument is the collapse of the DEFINITION: every λ would qualify, and eigenvalues would cease to distinguish matrices.' },
            { t: 'Zero causes division errors in the algorithms', ok: false, mis: 'numerics-explains-math', why: 'Algorithms inherit the constraint from the math, not vice versa. The definition predates every computer — the exclusion is conceptual hygiene, implemented later as code guards.' }
          ],
          hints: ['Test v = 0 in Av = λv for arbitrary λ.', 'It always holds. What would that do to the meaning of "eigenvalue"?'],
          edge: 'λ = 0 however is PERMITTED and meaningful: Av = 0 for v ≠ 0 means A collapses a direction — eigenvalue zero ⟺ det zero ⟺ singular. The two zeros play different roles.'
        },
        {
          type: 'mcq',
          prompt: `v is eigen with λ = ½. What is A¹⁰v?`,
          options: [
            { t: '(1/1024)·v — still the same direction, shrunk by λ¹⁰', ok: true, why: 'Aⁿv = λⁿv: ten applications of "halve this direction" = ×(½)¹⁰ ≈ 0.001. Ten matrix multiplications collapse into one scalar power — the eigen-shortcut in action.' },
            { t: '5v — ten times half', ok: false, mis: 'powers-add', why: 'Repeated application MULTIPLIES factors (½·½·…), never adds them. λ¹⁰, not 10λ — the same exponential-vs-linear distinction as compound interest.' },
            { t: 'Unknowable without the full matrix', ok: false, why: 'Along an eigen-direction, λ is a complete description of A’s action — the full matrix adds nothing. That informational collapse is exactly why eigen-directions are prized.' }
          ],
          hints: ['A²v = A(λv) = λ(Av) = λ²v. Extend.', '(½)¹⁰ = 1/1024.'],
          edge: 'Now mix: x = 3v₁(λ=1.1) + 5v₂(λ=0.5). After 50 steps the v₂ part is ~10⁻¹⁵ of itself while v₁ grew ×117 — the mix is pure v₁-direction for all practical purposes. Iteration is an eigen-filter.'
        },
        {
          type: 'mcq',
          prompt: `A population model iterates xₙ₊₁ = A·xₙ. A’s eigenvalues are 0.95 and 0.8. Long-run forecast?`,
          options: [
            { t: 'Decline to zero — both |λ| < 1, so every component decays; the 0.95-direction fades slowest and dominates the endgame', ok: true, why: 'Decompose x₀ into the two eigen-directions: each decays as λⁿ. All below 1 in magnitude ⟹ extinction, with the largest λ setting the half-life. Stability analysis IS an eigenvalue read-out.' },
            { t: 'Growth — two positive eigenvalues', ok: false, mis: 'sign-vs-magnitude', why: 'The growth/decay switch is |λ| vs 1, not the sign: positive-but-below-1 means "keep 95% each step" — decay. (Negative λ would mean decay-with-alternation.) Compare to ONE, always.' },
            { t: 'Oscillation between the two rates', ok: false, why: 'Real positive eigenvalues produce monotone geometric behavior per direction — no oscillation machinery present (that would need negative or complex λ). The two rates run in parallel, not in alternation.' }
          ],
          hints: ['Write x₀ as a mix of the two eigen-directions and iterate each part.', 'Both parts shrink: 0.95ⁿ and 0.8ⁿ. Where does the sum go?'],
          edge: 'The stability rule of dynamical systems, in one line: all |λ| < 1 ⟹ settle; any |λ| > 1 ⟹ blow up. Feedback controllers, epidemic thresholds (R₀!), and physics integrators are all judged this way.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>PageRank: the trillion-dollar eigenvector</h4>
<p>Model the web as a matrix: entry (i, j) = the chance a surfer on page j clicks to page i. A page's importance = the importance flowing into it — which is circular… deliberately: importance x must satisfy <b>Ax = x</b>. That is an eigenvector equation, λ = 1. Google's founding insight: <em>ranking the web = finding the dominant eigenvector of its link matrix</em>, computed by exactly the L2 trick — iterate A on any starting guess and let the dominant direction win ("power iteration").</p>
<h4>The same math, three more costumes</h4>
<ul>
  <li><b>Stability everywhere:</b> physics integrators, feedback loops, recurrent networks — explode or settle by the largest |λ| vs 1.</li>
  <li><b>PCA (Track 5 will use this):</b> the eigenvectors of a dataset's covariance matrix are its principal directions — the rank-revealing axes 3.6 promised; eigenvalues say how much variance each carries.</li>
  <li><b>Vibration modes:</b> a bridge's resonant shapes are eigenvectors of its stiffness matrix — engineers compute them so wind doesn't.</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `PageRank defines importance as "you are important if important pages link to you" — circular on its face. How does the eigenvector equation dissolve the circularity?`,
          options: [
            { t: 'Ax = x asks for a SELF-CONSISTENT assignment — a fixed point where every page’s score equals its inflow; the dominant eigenvector is that consistent solution, found by iteration', ok: true, why: 'The circular definition becomes an equation whose solution EXISTS (dominant eigenvector, λ = 1 for a link matrix) and is COMPUTABLE (power iteration: start anywhere, apply A repeatedly, the dominant direction takes over — L2’s herding, industrialized). Circularity resolved by fixed-point thinking.' },
            { t: 'It doesn’t — Google breaks ties manually', ok: false, why: 'No manual step: the mathematics guarantees a unique consistent ranking (with damping tweaks), and iteration converges to it mechanically. The elegance IS the product.' },
            { t: 'It counts links twice to compensate', ok: false, why: 'No double counting — flow is conserved (columns sum to 1). The resolution is structural: turn the circular sentence into Ax = x, and solve.' }
          ],
          hints: ['"Score = weighted sum of scores linking in" — write it as matrix times vector.', 'x = Ax. What kind of equation is that, in this node’s language?'],
          edge: 'Definitions-by-self-reference resolving into fixed points is a deep repeated pattern: recursive functions (2.3), Markov steady states, Nash equilibria. Eigen-thinking is your first rigorous instance.'
        },
        {
          type: 'mcq',
          prompt: `A physics integrator updates state as xₙ₊₁ = Mxₙ. In tests, small numerical noise slowly amplifies until the simulation explodes. Eigen-diagnosis?`,
          options: [
            { t: 'M has some eigenvalue with |λ| > 1 — noise has a component along that direction, and λⁿ amplifies it geometrically', ok: true, why: 'Any perturbation decomposes across eigen-directions; the |λ| > 1 one grows without bound, however tiny its start. Fixes change the STRUCTURE (smaller timestep, implicit integrator — both pull eigenvalues inside the unit circle), not the noise. Stability is spectral.' },
            { t: 'Floating point is too imprecise — use float128', ok: false, mis: 'precision-vs-stability', why: 'More digits delay the explosion by a constant number of steps; geometric growth eats any precision budget. An unstable |λ| beats every float width — the fix must move λ, not the noise floor.' },
            { t: 'The initial conditions were unlucky', ok: false, why: 'With |λ| > 1, ALL initial conditions (except a measure-zero sliver with exactly no component along the bad direction — and noise re-seeds it) explode. Unluckiness that affects everyone is structure.' }
          ],
          hints: ['Decompose the noise across M’s eigen-directions. What does iteration do to each part?', 'λⁿ per direction. Which |λ| regime spells doom?'],
          edge: 'This is why implicit integrators exist and why "reduce the timestep" works: both are eigenvalue surgery on the update matrix. Simulation stability courses are applied 3.8.'
        },
        {
          type: 'mcq',
          prompt: `PCA on user data finds "the eigenvector of the covariance matrix with the largest eigenvalue". Translating to plain language, PCA found…`,
          options: [
            { t: 'The single direction in feature space along which users VARY the most — the axis carrying the most information', ok: true, why: 'Covariance eigenvectors are the data’s natural axes; eigenvalues measure variance along each. The dominant one is the best one-number summary of a user — and keeping the top-k axes is the principled version of 3.6’s "the data is secretly low-rank".' },
            { t: 'The average user', ok: false, mis: 'direction-vs-point', why: 'The average is a POINT (computed first and subtracted, in fact); the eigenvector is a DIRECTION of spread around it. "Where is the center" and "which way does the cloud stretch" are orthogonal questions — literally.' },
            { t: 'The feature with the biggest values', ok: false, why: 'Principal directions are usually MIXTURES of features (0.6·age + 0.8·income…) — that mixing is the value-add over just sorting columns. Big raw values without variance carry nothing; PCA hunts variance.' }
          ],
          hints: ['Covariance encodes how the data cloud spreads. What do its eigen-directions describe?', 'The cloud’s natural stretch axes, ranked by eigenvalue = variance.'],
          edge: 'The full pipeline you can now read: center data → covariance matrix → eigen-decompose → project (3.2) onto top-k eigenvectors (3.6 rank!) → compressed data. Four nodes of this track in one algorithm.'
        }
      ]
    }
  }
};

/* ============ BOSS: IGNITE THE RENDER ENGINE ============ */
window.NODES['boss.render'] = {
  id: 'boss.render', num: '3.B', trackId: 'linear-algebra', boss: true,
  title: 'BOSS — Ignite the Render Engine',
  minutes: 25,
  payoff: 'Render Engine comes online',
  intro: `
<h4>System integration test</h4>
<p>The Render Engine idles, waiting for an operator who can compose transforms without breaking them. Five integration checks span the track: vector geometry, transformation matrices, pipeline order, determinant forensics, and eigen-analysis of an iterated system.</p>
<div class="callout amber"><p><b>Boss rules:</b> five challenges, pass four. When the Engine ignites, the machine itself gains depth — watch the schematic.</p></div>`,
  levels: {
    boss: {
      passNeed: 4,
      questions: [
        {
          type: 'input',
          prompt: `<b>Integration 1 — the aim assist.</b><br>Turret at (2, 1), target at (5, 5). The aim vector (target − turret) has length…?`,
          accept: ['5'],
          placeholder: '…',
          hints: ['Subtract positions first: (5−2, 5−1).', '(3, 4). Now Pythagoras.'],
          why: 'Aim = (3, 4), ‖(3,4)‖ = 5. Subtraction direction (3.1) + length (3.1) — and normalizing this vector (÷5) would give the firing direction.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 2 — read the machine.</b><br>A mystery transform sends î → (0, 2) and ĵ → (−2, 0). The matrix, and what it does:`,
          options: [
            { t: '[0 −2; 2 0] — a 90° CCW rotation combined with a ×2 scale', ok: true, why: 'Columns are the basis destinations: (0,2) and (−2,0). Each is the 90°-CCW image of its basis vector, stretched ×2 — so the map is rotate-and-double. det = 0·0 − (−2)(2) = 4: areas ×4, consistent with lengths ×2. Everything cross-checks.' },
            { t: '[0 2; −2 0] — the same but clockwise', ok: false, mis: 'row-column-swap', why: 'That matrix has columns (0,−2) and (2,0): î would dive SOUTH — a clockwise turn. Check where î actually went: (0, 2), north. Columns, not rows; destinations, not sources.' },
            { t: '[2 0; 0 2] — a pure scale, since lengths doubled', ok: false, why: 'Pure scaling keeps directions — but î ended up pointing NORTH, a changed direction. Length data alone under-determines the map; the columns carry the full story.' }
          ],
          hints: ['Columns of the matrix = images of î and ĵ, in order.', 'Column 1 = (0,2), column 2 = (−2,0). Now interpret: what happened to each arrow?'],
          edge: 'Sanity via det: rotation contributes ×1, scale ×2 per axis → det 4 ✓. Cross-checking column-reading against the det catches most hand-built matrix bugs.'
        },
        {
          type: 'order',
          prompt: `<b>Integration 3 — forensic pipeline audit.</b><br>Sprites render as a single line. Reconstruct the diagnosis in order.`,
          steps: [
            'Inspect the artist’s custom transform: columns are (2, 1) and (4, 2)',
            'Spot the dependency: (4, 2) = 2·(2, 1) — the columns share one direction (rank 1)',
            'Confirm numerically: det = 2·2 − 4·1 = 0 — the plane collapses onto a line',
            'Fix: replace with independent columns (det ≠ 0), restoring two dimensions'
          ],
          hints: ['Start where any transform diagnosis starts: read the columns.', 'Are the two columns independent (3.6)? Check for a scalar multiple.', 'The det confirms what dependence predicts.'],
          why: 'Columns → dependence → det 0 → collapse: 3.3, 3.6, and 3.7 chained into one debugging session. The vocabulary IS the diagnostic toolkit.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 4 — the spinning moon bug.</b><br>Code: <code>vertex' = R · T · vertex</code> with R = spin rotation, T = move-to-orbit-position. The planet's moon ORBITS the origin instead of spinning in place. The fix:`,
          options: [
            { t: 'Swap to T · R — rotation must act while the moon is still at the origin, then translation places it', ok: true, why: 'R·T·x translates FIRST, so the rotation swings the already-displaced moon around the origin: an orbit. T·R·x spins at the origin, then places — spin-in-place. Composition order (3.4) read right-to-left is gameplay-visible.' },
            { t: 'Multiply by R twice to overpower the translation', ok: false, why: 'R²T just orbits twice as fast — order, not quantity, is the bug. No amount of extra rotation fixes WHERE the rotation happens.' },
            { t: 'The matrices should be added, not multiplied', ok: false, mis: 'composition-vs-addition', why: 'Adding transform matrices blends their entries into a map that is neither rotation nor translation — geometric nonsense for this purpose. Sequencing IS multiplication; the fix lives in the order of factors.' }
          ],
          hints: ['Read R·T·x right to left: which operation touches the vertex first?', 'T first — the moon leaves the origin before spinning. Reorder.'],
          edge: 'The professional statement: transforms compose right-to-left, so LOCAL operations (spin about own center) go rightmost, WORLD placement leftmost. Scene graphs enforce this so juniors cannot not.'
        },
        {
          type: 'mcq',
          prompt: `<b>Integration 5 — the drifting camera.</b><br>A "subtle zoom" effect applies M = [1.02 0; 0 0.98] every frame. After 300 frames, the scene looks…`,
          options: [
            { t: 'Smeared into a horizontal band — x has grown ×1.02³⁰⁰ ≈ ×380 while y shrank to ≈ 0.2%: the dominant eigen-direction took over', ok: true, why: 'Diagonal matrix: eigenvalues 1.02 (x) and 0.98 (y). Powers: λⁿ per axis (3.8) — 1.02³⁰⁰ ≈ e⁶ ≈ 380, 0.98³⁰⁰ ≈ e⁻⁶ ≈ 0.0025. Iterated "subtle" transforms are never subtle: the spectrum rules the long run.' },
            { t: 'Slightly zoomed, as designed — 2% is tiny', ok: false, mis: 'linear-intuition-for-powers', why: '2% ONCE is tiny; 2% compounded 300 times is ×380 (the compound-interest error, in pixels). Repeated application means eigenvalue POWERS — always ask "…to the n-th" before shipping a per-frame transform.' },
            { t: 'Unchanged — the two factors cancel (1.02 · 0.98 ≈ 1)', ok: false, mis: 'det-vs-spectrum', why: 'Their PRODUCT ≈ 1 means AREA is roughly preserved (det ≈ 0.9996) — while the SHAPE distorts catastrophically: ×380 one way, ÷400 the other. det summarizes area only; the eigenvalues tell the real story. Both numbers, always.' }
          ],
          hints: ['Diagonal entries are eigenvalues. What does frame-n behavior look like per axis?', '1.02³⁰⁰ and 0.98³⁰⁰ — estimate via (1+x)ⁿ ≈ eⁿˣ.', 'e⁶ ≈ 400 vs e⁻⁶ ≈ 1/400. Now picture the frame.'],
          edge: 'The professional reflex, one last time: any matrix applied repeatedly — physics steps, camera easing, feedback filters, neural recurrences — gets its eigenvalues checked against 1 BEFORE it ships. That reflex is this track’s graduation gift.'
        }
      ]
    }
  }
};
