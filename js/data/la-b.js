/* Track 3 content — nodes 3.3 and 3.4 */

/* ============ 3.3 MATRICES AS TRANSFORMATIONS ============ */
window.NODES['la.transform'] = {
  id: 'la.transform', num: '3.3', trackId: 'linear-algebra',
  title: 'Matrices as Transformations',
  minutes: 40,
  payoff: '2D/3D graphics · CSS transforms',
  levels: {

    l1: {
      widget: 'matrixlab',
      html: `
<h4>A machine that moves every point at once</h4>
<p>A <span class="term">matrix</span> is not a spreadsheet of numbers — it is a <em>machine that transforms the whole plane</em>. Feed it any point, it outputs a moved point. Rotations, stretches, shears, reflections: each is one matrix.</p>
<p>And here is the secret that makes matrices readable: <b>the columns tell you where the basis arrows land.</b> The plane rides on two reference arrows — î = (1,0) pointing east, ĵ = (0,1) pointing north. Column 1 of the matrix is î's destination; column 2 is ĵ's. Everything else follows along, because the grid deforms <em>uniformly</em> — lines stay lines, the origin stays put.</p>
<div class="callout amber"><p><b>The playground below is this whole node.</b> Drag î and ĵ; the grid warps to follow. Try the presets, then: make the two arrows point along the SAME line and watch the plane collapse to that line — and the det readout hit 0. Remember that moment in node 3.7.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `To read what a 2×2 matrix does geometrically, you look at…`,
          options: [
            { t: 'Its columns — they are the landing spots of î and ĵ', ok: true, why: 'Column 1 = image of (1,0), column 2 = image of (0,1). Two arrows determine the whole transformation, because everything is a combination of î and ĵ and the machine respects combinations.' },
            { t: 'Its rows — matrices read left to right', ok: false, mis: 'row-column-swap', why: 'Rows have their own story (they build each output coordinate), but the GEOMETRIC read is columns-as-destinations. Mixing these up transposes your mental picture — the classic matrix confusion.' },
            { t: 'Its diagonal — the rest is padding', ok: false, why: 'The diagonal alone describes only axis-aligned scaling. Rotations and shears live entirely in the off-diagonal entries you would be discarding.' }
          ],
          hints: ['Feed (1,0) into the machine — which numbers come out?', 'Exactly the first column. And (0,1)?']
        },
        {
          type: 'mcq',
          prompt: `In the playground, which arrow positions make the matrix "do nothing"?`,
          options: [
            { t: 'î = (1,0) and ĵ = (0,1) — the identity matrix', ok: true, why: 'Basis arrows landing on themselves ⟹ every point lands on itself. Columns (1,0) and (0,1) form the identity I — the "multiply by 1" of matrix-land.' },
            { t: 'î = (0,1) and ĵ = (1,0) — keep unit lengths', ok: false, mis: 'swap-is-identity', why: 'Unit lengths, wrong destinations: î and ĵ have TRADED places, which reflects the plane across the diagonal y = x. Identity means each arrow returns HOME, not just somewhere respectable.' },
            { t: 'Any position where the arrows stay perpendicular', ok: false, why: 'Perpendicular unit arrows give rotations and reflections — rigid motions, but motions nonetheless. Only the exact home position moves nothing.' }
          ],
          hints: ['"Do nothing" = every point maps to itself. What must happen to î and ĵ specifically?', 'They must land exactly where they started.']
        },
        {
          type: 'mcq',
          prompt: `You drag ĵ until it lies on the same line as î. The grid collapses onto that line. What just happened?`,
          options: [
            { t: 'Both basis images cram into one line, so every combination of them is stuck on it — 2D input, 1D output', ok: true, why: 'All outputs are mixes of the two column vectors; if those share a line, the mixes cannot escape it. The machine destroys a dimension — information is lost, and no inverse can recover it.' },
            { t: 'A rendering glitch — the math still covers the plane', ok: false, mis: 'collapse-denial', why: 'The widget is being honest: check any point’s output, it lands on the line. Collapse is a real, important regime of matrices — "singular" — with its own theory (3.7) and its own production bugs.' },
            { t: 'The plane rotated very fast', ok: false, why: 'Rotations preserve the plane’s full 2D-ness (and all areas). Collapse is a different species of event — the det readout hitting 0 is its signature.' }
          ],
          hints: ['Every output is (something)·î-image + (something)·ĵ-image. Where can outputs live if both images share a line?', 'Only on that line. What happened to the second dimension?'],
          edge: 'Preview: collapse ⟺ det = 0 ⟺ not invertible ⟺ columns "linearly dependent" — four vocabularies (3.6, 3.7) for the moment you just created by hand.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Linear maps, and why matrices capture them all</h4>
<p>A map T is <span class="term">linear</span> if it respects the vector operations: T(u + v) = T(u) + T(v) and T(cv) = c·T(v). Consequences: T(0) = 0 (the origin is nailed down), and grid lines map to evenly-spaced lines.</p>
<p><b>The representation theorem:</b> every linear T on ℝ² is T(x) = Ax, where A's columns are T(î) and T(ĵ). Proof in one breath: x = x₁î + x₂ĵ, so T(x) = x₁T(î) + x₂T(ĵ) — a combination of the columns, which is exactly what Ax computes. ∎</p>
<pre><code>A·(x, y) = x·(column 1) + y·(column 2)</code></pre>
<h4>The gallery</h4>
<div class="tbl-scroll"><table class="tt">
  <tr><th>Machine</th><th>Matrix</th><th>Columns say…</th></tr>
  <tr><td style="text-align:left">Identity</td><td>[1 0; 0 1]</td><td>î→î, ĵ→ĵ</td></tr>
  <tr><td style="text-align:left">Scale ×2</td><td>[2 0; 0 2]</td><td>both arrows doubled</td></tr>
  <tr><td style="text-align:left">Rotate 90° CCW</td><td>[0 −1; 1 0]</td><td>î→north, ĵ→west</td></tr>
  <tr><td style="text-align:left">Shear</td><td>[1 1; 0 1]</td><td>î stays, ĵ leans east</td></tr>
  <tr><td style="text-align:left">Reflect across y = x</td><td>[0 1; 1 0]</td><td>î and ĵ trade places</td></tr>
</table></div>
<p>(Matrix notation here: [a b; c d] means top row a b, bottom row c d — columns are (a,c) and (b,d).)</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `The matrix [0 −1; 1 0] — columns (0,1) and (−1,0) — transforms the plane. What does it do?`,
          options: [
            { t: 'Rotates 90° counter-clockwise', ok: true, why: 'î = (1,0) lands on (0,1): east turned north. ĵ = (0,1) lands on (−1,0): north turned west. Both arrows turned a quarter-turn CCW — so the whole plane did.' },
            { t: 'Rotates 90° clockwise', ok: false, mis: 'column-direction-confusion', why: 'Tempting if you read rows instead of columns. Clockwise would send î south: its matrix is [0 1; −1 0] — the sign placement is the entire difference between the two rotations.' },
            { t: 'Reflects across y = x', ok: false, mis: 'reflection-rotation-mixup', why: 'The mirror is [0 1; 1 0] — no minus sign. That minus is what makes it a turn instead of a flip; 3.7 will quantify this (det +1 vs −1).' }
          ],
          hints: ['Where does (1,0) land? Read column 1.', '(0,1) — east became north. Now track ĵ via column 2.', 'Both arrows turned 90° CCW; linearity drags everything else along.'],
          edge: 'Apply it four times and you are back to the identity — quarter-turns have order 4, and matrix powers will make that literal in the next node.'
        },
        {
          type: 'input',
          prompt: `A = [2 0; 0 3] (columns (2,0) and (0,3)). Compute A·(1, 2) — answer as "a,b".`,
          accept: ['2,6', '(2,6)', '2, 6'],
          placeholder: 'a,b',
          hints: ['Ax = x·(column 1) + y·(column 2).', '1·(2,0) + 2·(0,3).'],
          why: '1·(2,0) + 2·(0,3) = (2,6). A diagonal matrix scales each axis independently — x stretched ×2, y stretched ×3.'
        },
        {
          type: 'mcq',
          prompt: `Which property test would PROVE a map T is not linear?`,
          options: [
            { t: 'Finding T(0) ≠ 0', ok: true, why: 'Linearity forces T(0) = T(0·v) = 0·T(v) = 0 — the origin cannot move. One violated consequence kills the claim (a counterexample, 1.3-style). Translation ("shift everything right by 5") fails exactly this test.' },
            { t: 'Finding two inputs with the same output', ok: false, why: 'That is a failure of INJECTIVITY (1.6), and linear maps commit it freely — the collapse matrix sends infinitely many points to each output. Linear ≠ invertible.' },
            { t: 'Finding an input whose output is longer than it', ok: false, why: 'Stretching is linear’s favorite hobby — scale ×2 doubles every length. Linearity constrains STRUCTURE (sums, scalings), never size.' }
          ],
          hints: ['List what linearity forces: T(u+v) = T(u)+T(v), T(cv) = cT(v), and therefore T(0) = ?', 'The origin is pinned. Which option contradicts that?'],
          edge: 'So how do games move objects, if translation is not linear? Homogeneous coordinates — 2D points ride in 3D as (x, y, 1), where translation BECOMES linear. The trick behind every 4×4 graphics matrix.'
        },
        {
          type: 'mcq',
          prompt: `A designer wants text slanted like italics: verticals lean right, the baseline stays put. Which matrix?`,
          options: [
            { t: '[1 1; 0 1] — î stays home, ĵ leans to (1,1)', ok: true, why: 'The shear: the x-axis (baseline) is untouched since î maps to itself; vertical strokes tilt because ĵ now leans east. Every italic and skew() in CSS is this matrix.' },
            { t: '[2 0; 0 1] — stretch the x direction', ok: false, why: 'That widens letters without tilting a single stroke — verticals stay vertical, just farther apart. Leaning needs an off-diagonal entry mixing y into x.' },
            { t: '[0 −1; 1 0] — turn everything', ok: false, why: 'Rotation tilts the baseline too — the whole line of text would run uphill. The shear’s trick is selective: one axis fixed, the other tilted.' }
          ],
          hints: ['"Baseline stays put" pins down where î must land.', 'î → î. Now which column choice makes verticals lean?'],
          edge: 'Shears are also the sneaky ones: they preserve area exactly (det = 1, node 3.7) while wrecking angles — rigid-looking numbers, non-rigid geometry.'
        },
        {
          type: 'mcq',
          prompt: `Why does knowing T(î) and T(ĵ) determine T on EVERY point of the plane?`,
          options: [
            { t: 'Every x is a combination x₁î + x₂ĵ, and linearity forces T(x) = x₁T(î) + x₂T(ĵ)', ok: true, why: 'The two axioms convert "where do the basis arrows go" into "where does everything go" — that computation IS matrix-vector multiplication. Two arrows of data, infinitely many points determined.' },
            { t: 'It doesn’t — two points can’t pin down a whole plane’s worth of outputs', ok: false, mis: 'underdetermined-instinct', why: 'For an ARBITRARY map, correct! Linearity is precisely the rigidity that makes two samples suffice — the uniform grid deformation you watched in the widget is that rigidity made visible.' },
            { t: 'Because î and ĵ are perpendicular', ok: false, why: 'Perpendicularity is a bonus, not the mechanism — any two non-parallel vectors would serve (a "basis", node 3.6). What matters is that everything is a combination of them.' }
          ],
          hints: ['Write (3, 2) in terms of î and ĵ.', '3î + 2ĵ. Now apply T using the two linearity rules.'],
          edge: 'This is why neural-net layers store weight MATRICES: a linear layer is fully specified by where it sends each basis direction — columns are the learned destinations.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Transforming real geometry</h4>
<pre><code>const apply = (m, [x, y]) =>            // m = [a, b, c, d] means [a c; b d] (column-major!)
  [m[0]*x + m[2]*y, m[1]*x + m[3]*y];   // x·col1 + y·col2

const rot90 = [0, 1, -1, 0];
const shipOnScreen = ship.vertices.map(v => apply(rot90, v));</code></pre>
<p>Transform the <em>vertices</em>, redraw the edges between them — that is how every sprite rotation and 3D model transform works. Linearity is why transforming corners suffices: straight edges stay straight.</p>
<h4>You have been writing matrices all along</h4>
<pre><code>/* CSS */  transform: matrix(a, b, c, d, tx, ty);   /* columns (a,b), (c,d) + translation */
/* CSS */  transform: rotate(90deg);                /* compiles to [0 1; -1 0]… wait, or [0 -1; 1 0]? */</code></pre>
<p>Careful: the browser's y-axis points <b>down</b>, so CSS "clockwise" is this node's counter-clockwise — same matrices, mirrored world. Neural networks complete the trilogy: <code>output = W·input + b</code> — a weight matrix is a learned transformation of feature space, columns and all.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Why does rotating a polygon only require transforming its <b>vertices</b>?`,
          options: [
            { t: 'Linear maps send line segments to line segments — the edges follow their endpoints for free', ok: true, why: 'Points between two vertices are combinations of them, and linearity preserves combinations — so the transformed edge is exactly the segment between transformed endpoints. Four vertex computations move a whole rectangle.' },
            { t: 'It doesn’t really — renderers secretly transform every pixel of the shape', ok: false, mis: 'per-pixel-myth', why: 'Rasterizers fill BETWEEN transformed vertices precisely because linearity guarantees the interior behaves. (GPUs do run per-pixel work — for shading, not for figuring out where straight edges went.)' },
            { t: 'Vertices are the only points that matter visually', ok: false, why: 'Edges and interiors are most of what you SEE — they matter and come along automatically. That "automatically" is a theorem, not an approximation.' }
          ],
          hints: ['A point midway along an edge is (v₁ + v₂)/2. Apply T and use linearity.', 'T of the midpoint = midpoint of the T’d endpoints. Generalize.'],
          edge: 'The same theorem fails for NON-linear warps (fisheye, ripple) — those genuinely must sample many points per edge. Knowing when vertices suffice is knowing linearity.'
        },
        {
          type: 'mcq',
          prompt: `<code>transform: matrix(0, 1, -1, 0, 0, 0)</code> in CSS — columns (0,1) and (−1,0). On screen the element appears rotated…`,
          options: [
            { t: 'Clockwise — the math says CCW, but CSS’s y-axis points down, mirroring the rotation sense', ok: true, why: 'Same matrix, flipped world: with y increasing downward, what the algebra calls counter-clockwise renders as clockwise. Coordinate-convention mismatches are the #1 source of "my rotation is backwards" bugs.' },
            { t: 'Counter-clockwise — the matrix is the matrix', ok: false, mis: 'convention-blind', why: 'The matrix IS the matrix — and its visual meaning routes through the coordinate frame. Screen-y points down (scan order), so all rotation senses mirror. Test in a browser; the algebra and the pixels are both right.' },
            { t: 'Not at all — CSS matrices only scale', ok: false, why: 'matrix() is the full 2D affine transform — rotate(), scale(), skew() all compile down to it. This one has the classic quarter-turn shape.' }
          ],
          hints: ['What direction does y grow on a screen?', 'Downward. What does mirroring one axis do to "clockwise"?'],
          edge: 'Same trap in canvas, SVG, and most GUI toolkits — versus math-convention in WebGL clip space and physics engines. Every graphics programmer keeps a mental sign bit for "whose y?".'
        },
        {
          type: 'mcq',
          prompt: `A neural-net layer computes <code>output = W·input</code> with W a 512×768 matrix. In this node's language, column j of W is…`,
          options: [
            { t: 'The learned destination of input-basis direction j — where feature j "lands" in the 512-dim output space', ok: true, why: 'Same theorem, bigger room: the layer is a linear map, columns are images of basis vectors, and the output is a weighted mix of columns (weights = the input’s components). Training a network is choosing where the basis arrows land.' },
            { t: 'A single training example', ok: false, mis: 'data-vs-map', why: 'Examples flow THROUGH the matrix; they are not stored in it. W is the machine, not the material — confusing model parameters with data is a real and common category error.' },
            { t: 'A random initialization artifact with no meaning', ok: false, why: 'It starts random and BECOMES meaningful: after training, columns encode how each input feature projects into the learned representation. Interpretability research reads exactly these columns.' }
          ],
          hints: ['Apply the representation theorem: what is column j of any linear map’s matrix?', 'The image of basis vector eⱼ. Here, basis vector = one input feature.'],
          edge: 'Dimensions tell the story too: 768 in, 512 out — this layer COMPRESSES, like the collapse in L1 but deliberate and only partial. Rank (3.6) measures how much survives.'
        }
      ]
    }
  }
};

/* ============ 3.4 MATRIX MULTIPLICATION ============ */
window.NODES['la.matmul'] = {
  id: 'la.matmul', num: '3.4', trackId: 'linear-algebra',
  title: 'Matrix Multiplication',
  minutes: 35,
  payoff: 'transform pipelines · path counting',
  levels: {

    l1: {
      html: `
<h4>Multiplication is composition</h4>
<p>Two machines: B shears the plane, A rotates it. Run points through B, then feed the results to A. The combined effect — shear-then-rotate — is itself one linear machine, and its matrix is called <b>AB</b>. Matrix multiplication is not an arithmetic curiosity: it is <em>doing one transformation after another</em>, compressed into a single matrix.</p>
<div class="callout amber"><p><b>Read AB right-to-left:</b> ABx means "B first, then A" — because ABx = A(Bx), and the machine nearest the input runs first. It reads like function composition f(g(x)) because it IS function composition.</p></div>
<h4>Order matters — and now you can see why</h4>
<p>Rotate a photo 90°, then shear it horizontally. Now shear first, then rotate. Picture the two results: the shear tilts <em>different lines</em> depending on whether the photo was already turned. Different outcomes ⟹ <b>AB ≠ BA</b> in general. Composition of actions was never commutative — putting on socks and shoes has an order too.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `The product AB, applied to a point x, means…`,
          options: [
            { t: 'Apply B first, then A — the machine written closest to x runs first', ok: true, why: 'ABx = A(Bx): x enters B, the result enters A. Right-to-left reading, exactly like f(g(x)).' },
            { t: 'Apply A first, then B — read left to right', ok: false, mis: 'composition-order', why: 'The most natural-feeling wrong answer in the track. ABx parses as A(Bx) — parentheses reveal the order. Reading transforms left-to-right ships real bugs (rotating around the wrong point, orbiting instead of spinning).' },
            { t: 'Apply both simultaneously and average', ok: false, why: 'Averaging matrices is a real operation — and a completely different one (it blends, composition CHAINS). AB is sequential machinery.' }
          ],
          hints: ['Put the parentheses in: ABx = A(Bx).', 'Which machine touches x first?']
        },
        {
          type: 'mcq',
          prompt: `Rotate-then-shear vs shear-then-rotate on the same photo. The results are…`,
          options: [
            { t: 'Generally different — composition order changes the outcome, so AB ≠ BA', ok: true, why: 'The shear always tilts along the CURRENT horizontal — which the rotation has moved. Sequences of actions rarely commute (socks, shoes), and matrix multiplication inherits that honestly.' },
            { t: 'Identical — multiplication is commutative', ok: false, mis: 'commutativity-assumed', why: 'Number-instinct misfire: 3·5 = 5·3, but matrices are ACTIONS, not amounts. Commutativity is the property you must PROVE, not assume — and here it is simply false.' },
            { t: 'Mirror images of each other', ok: false, why: 'No such symmetry — the two results differ in an unstructured way. (Special pairs DO commute: two rotations, two scalings. The claim is "not ALWAYS equal", not "never equal".)' }
          ],
          hints: ['The shear tilts vertical lines. Are the "vertical" lines the same before and after a rotation?', 'No — so the shear acts on different geometry in each order.']
        },
        {
          type: 'mcq',
          prompt: `Matrix sizes: A is 2×3 (2 rows, 3 cols), B is 3×4. Which products even exist?`,
          options: [
            { t: 'AB exists (2×4); BA does not — output of A (ℝ²) cannot feed B (wants ℝ³)', ok: true, why: 'Chaining machines needs matching plumbing: B maps ℝ⁴→ℝ³, A maps ℝ³→ℝ². AB chains them into ℝ⁴→ℝ² (a 2×4 matrix). BA would pipe 2D output into a 3D intake — a type error.' },
            { t: 'Both — any two matrices multiply', ok: false, mis: 'shape-blind', why: 'Inner dimensions must match (the 3s in 2×3 · 3×4). NumPy’s most-thrown error — "shapes not aligned" — is this fact reaching production daily.' },
            { t: 'Neither — only square matrices multiply', ok: false, why: 'Rectangular products are everywhere (every neural layer with different in/out sizes!). The rule is inner-dimension agreement, not squareness.' }
          ],
          hints: ['Treat each matrix as a machine: what dimension goes in, what comes out?', 'B: 4 in, 3 out. A: 3 in, 2 out. Which chaining connects?'],
          edge: 'Mnemonic: (m×n)·(n×p) = m×p — the inner n’s must shake hands and then they vanish.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>The formula — and where it comes from</h4>
<p>Entry (i, j) of AB is <b>row i of A dotted with column j of B</b>:</p>
<pre><code>(AB)ᵢⱼ = Σₖ Aᵢₖ Bₖⱼ</code></pre>
<p>Not arbitrary! Column j of AB must be "where does B's j-th basis-image land after A" — that is A·(column j of B), and each coordinate of THAT is a row-dot-column. The weird formula is composition, unpacked. (And the dot product from 3.2 turns out to be the atom of matrix multiplication.)</p>
<pre><code>example:  [1 2; 3 4] · [5; 6]  →  (1·5 + 2·6, 3·5 + 4·6) = (17, 39)</code></pre>
<h4>The algebra of composition</h4>
<ul>
  <li><b>Associative:</b> (AB)C = A(BC) — regrouping fine, REORDERING forbidden. Consequence: a chain of transforms can be pre-multiplied into one matrix, in advance.</li>
  <li><b>Identity:</b> AI = IA = A — the do-nothing machine composes invisibly.</li>
  <li><b>Not commutative:</b> AB ≠ BA in general (previous level's photos).</li>
  <li><b>Powers:</b> A² = AA means "apply twice". The 90° rotation R satisfies R⁴ = I — four quarter-turns come home.</li>
</ul>`,
      questions: [
        {
          type: 'input',
          prompt: `[1 2; 3 4] · [5; 6] — compute the FIRST entry of the result.`,
          accept: ['17'],
          placeholder: '…',
          hints: ['Row 1 of the matrix, dotted with the column.', '1·5 + 2·6.'],
          why: 'Row (1,2) · column (5,6) = 5 + 12 = 17. Every entry of every matrix product is one dot product — 3.2 was the training for this.'
        },
        {
          type: 'order',
          prompt: `Derive WHY (AB)ᵢⱼ is row-i-dot-column-j. Arrange the argument.`,
          steps: [
            'Column j of AB is where the j-th basis vector lands after B-then-A',
            'B sends that basis vector to column j of B',
            'A then transforms it: column j of AB = A · (column j of B)',
            'Each coordinate of A·(vector) is a row of A dotted with that vector — hence row i · column j'
          ],
          hints: ['Start from what any matrix’s columns mean (3.3): basis destinations.', 'Track one basis vector through B first, then through A.', 'The last step is just how matrix-times-vector computes each coordinate.'],
          why: 'The formula stops being arbitrary once derived: composition, tracked one basis vector at a time. Derive once, never memorize wrong again.'
        },
        {
          type: 'mcq',
          prompt: `R = [0 −1; 1 0] (rotate 90° CCW). What is R⁴, without computing a single entry?`,
          options: [
            { t: 'The identity I — four quarter-turns return every point home', ok: true, why: 'Powers are repeated application: R⁴ means rotate 90° four times = rotate 360° = touch nothing. Geometric reasoning replaces sixteen multiply-adds — the win of thinking in transformations, not tables of numbers.' },
            { t: 'A rotation by 360° — similar to I but not equal', ok: false, mis: 'rotation-360-distinct', why: 'As a MAP, rotating 360° and doing nothing are indistinguishable — same output for every input, hence the same matrix, exactly I. (Maps with equal behavior are equal — extensionality, a 1.6 idea.)' },
            { t: '4R — powers scale matrices', ok: false, why: 'That is scalar multiplication’s law, not composition’s. A² is A APPLIED TWICE, not A doubled — the difference between doing a thing again and doing a bigger thing.' }
          ],
          hints: ['What does applying a 90° rotation four times amount to?', 'A full turn. Which matrix does a full turn equal, as a machine?'],
          edge: 'Also R² = [−1 0; 0 −1] = −I: two quarter-turns is point-reflection. Small matrix groups like {I, R, R², R³} are your first glimpse of group theory.'
        },
        {
          type: 'mcq',
          prompt: `Associativity says (AB)C = A(BC). What does this let a game engine do?`,
          options: [
            { t: 'Pre-multiply a whole transform chain into ONE matrix, then apply it to millions of vertices', ok: true, why: 'M = projection · view · model computed once per object; each vertex then costs one matrix-vector multiply instead of three. Regrouping ((P·V)·M)·x = (P·V·M)·x is associativity earning its salary — the "MVP matrix" of every 3D engine.' },
            { t: 'Reorder transforms for convenience', ok: false, mis: 'assoc-vs-commut', why: 'Associativity moves PARENTHESES, never the operands: the sequence stays P, V, M. Reordering is commutativity — which matrices refuse. Confusing the two laws breaks renderers.' },
            { t: 'Skip transforms that cancel out', ok: false, why: 'Cancellation needs inverses (A·A⁻¹ = I) — a different tool (3.7). Associativity only regroups; it never deletes.' }
          ],
          hints: ['With v vertices and 3 chained matrices: cost of A(B(Cx)) per vertex vs (ABC)x?', 'Three matrix-vector products vs one — after a single precomputation.'],
          edge: 'The optimization is huge and the trap is real: precompute in the WRONG order and everything renders — somewhere else. Associativity is the license; order discipline is still on you.'
        },
        {
          type: 'mcq',
          prompt: `S = [2 0; 0 2] (uniform scale), R = any rotation. Do S and R commute?`,
          options: [
            { t: 'Yes — uniform scaling is direction-blind, so scale-then-rotate = rotate-then-scale', ok: true, why: 'S = 2I, and I commutes with everything: SR = 2IR = 2R = R(2I) = RS. "AB ≠ BA in general" leaves room for special friendships — uniform scalings commute with all matrices.' },
            { t: 'No — nothing commutes with anything', ok: false, mis: 'never-commute', why: 'Overcorrection! The theorem says not ALWAYS, not NEVER. Scalar multiples of I commute universally; rotations commute with each other (in 2D). Knowing WHICH pairs commute is usable knowledge.' },
            { t: 'Only for 90° rotations', ok: false, why: 'The angle is irrelevant — S = 2I slips through any matrix untouched. (NON-uniform scaling [2 0; 0 1], though, genuinely fails to commute with rotations — direction-blindness was the key.)' }
          ],
          hints: ['Rewrite S as a multiple of the identity.', '2I·R vs R·2I — does the scalar care where it sits?'],
          edge: 'The set of matrices commuting with EVERYTHING is exactly {cI} — a theorem (Schur). Uniformity is not just sufficient for universal commuting; it is necessary.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>Pipelines: the MVP pattern</h4>
<pre><code>const mvp = mul(projection, mul(view, model));   // once per object per frame
for (const v of mesh.vertices) out.push(apply(mvp, v));  // millions of times</code></pre>
<p>Associativity turns three transforms per vertex into one — the single most consequential algebra law in real-time graphics.</p>
<h4>The crossover payoff: adjacency matrix powers</h4>
<pre><code>A = adjacency matrix of a graph (2.5): A[i][j] = 1 if edge i–j
(A²)[i][j] = Σₖ A[i][k]·A[k][j]  =  number of length-2 paths i → k → j
(Aⁿ)[i][j] = number of length-n walks from i to j</code></pre>
<p>Read the formula: the sum over k tries every intermediate stop — nonzero terms are exactly the two-hop routes. Your two tracks just fused: graph structure (Track 2) computed by matrix arithmetic (Track 3). Friend-of-friend counts, network reachability, even PageRank's core loop — all matrix powers of graphs.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `A game object should spin in place, then be positioned in the world. With R = rotation and T = translation (as matrices), the correct product applied to vertices is…`,
          options: [
            { t: 'T·R — rotate first (about the object’s own origin), then move into place', ok: true, why: 'TRx = T(Rx): rotation runs while the model still sits at the origin, so it spins in place; translation then carries the rotated object out. Right-to-left reading, deciding actual gameplay visuals.' },
            { t: 'R·T — alphabetical seems natural', ok: false, mis: 'composition-order', why: 'RTx translates FIRST — the object leaves the origin, and the rotation then swings it in a wide ORBIT around the origin instead of spinning it. The moon instead of a top: the classic transform-order bug, visible in a hundred shipped games.' },
            { t: 'Either — the results only differ by a constant offset', ok: false, why: 'They differ by the whole difference between spinning and orbiting — grab any point and trace both orders. Non-commutativity is not a technicality; it is visible on screen.' }
          ],
          hints: ['Which operation must happen while the object is still at the origin?', 'Rotation about its own center. So rotation sits nearest the vertex: …·R·x.'],
          edge: 'General scene-graph law: local transforms multiply on the RIGHT, world transforms accumulate on the LEFT — parent·child ordering in every engine’s node hierarchy.'
        },
        {
          type: 'mcq',
          prompt: `A is a social network’s adjacency matrix. What does (A²)[i][j] = 7 tell you?`,
          options: [
            { t: 'Users i and j have exactly 7 mutual friends — 7 two-hop paths connect them', ok: true, why: 'The sum Σₖ A[i][k]A[k][j] scores 1 for every k adjacent to both — mutual friends ARE the length-2 paths. "People you may know" ranks candidates j by exactly this entry.' },
            { t: 'i and j are 7 hops apart', ok: false, mis: 'entry-vs-distance', why: 'Distance is the SMALLEST hop count (BFS territory, 2.6); the matrix entry COUNTS routes of one fixed length. 7 routes of length 2 actually means they are close — probably one hop from friending.' },
            { t: 'i has 7 friends', ok: false, why: 'That would be a diagonal-related count — (A²)[i][i] is i’s degree (each friend gives an out-and-back walk). The off-diagonal (i,j) speaks about the PAIR.' }
          ],
          hints: ['Expand the (i,j) entry of A²: which k’s contribute a 1?', 'Those adjacent to both i and j — what are they called socially?'],
          edge: 'That diagonal fact is cute and useful: trace(A²) = Σ degrees = 2|E| — the handshake theorem (2.5) hiding inside a matrix product.'
        },
        {
          type: 'mcq',
          prompt: `Computing (P·V·M)·x per frame instead of P·(V·(M·x)) per vertex saves work — but a teammate warns it "changes the result". Verdict?`,
          options: [
            { t: 'The teammate is wrong in exact arithmetic (associativity) — but floating-point rounding can differ in the last bits, which is harmless here', ok: true, why: 'Associativity is a theorem: same map, same result. Floats break exact associativity (rounding differs per grouping) — by ~1e-7 relative, invisible at pixel scale. Know both truths: the algebra licenses the optimization; the numerics footnote it.' },
            { t: 'The teammate is right — regrouping changes the transformation', ok: false, mis: 'assoc-vs-commut', why: 'Regrouping is exactly what associativity protects. The ORDER P, V, M is untouched — only parenthesization moved. If regrouping changed the map, no 3D engine could exist.' },
            { t: 'Nobody is right — the two expressions are unrelated', ok: false, why: 'They are provably the same linear map applied to x. The only daylight between them is machine epsilon.' }
          ],
          hints: ['Which law covers (AB)C vs A(BC)? Is order changing?', 'Associativity; no. What COULD differ, on real hardware?'],
          edge: 'Where float non-associativity DOES bite: summing millions of small numbers (use Kahan summation) and physics accumulating over hours. Graphics per-frame? Sleep soundly.'
        }
      ]
    }
  }
};
