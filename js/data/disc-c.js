/* Track 2 content — nodes 2.5 and 2.6 */

/* ============ 2.5 GRAPHS I: STRUCTURE ============ */
window.NODES['disc.graphs1'] = {
  id: 'disc.graphs1', num: '2.5', trackId: 'discrete',
  title: 'Graphs I: Structure',
  minutes: 30,
  payoff: 'networks · maps · dependency graphs',
  levels: {

    l1: {
      widget: 'graphlab',
      html: `
<h4>Dots and lines — the universal data structure</h4>
<p>A <span class="term">graph</span> is just things (<span class="term">vertices</span>) and connections between pairs of them (<span class="term">edges</span>). That poverty of structure is its superpower: friendships, road maps, package dependencies, the internet, this lab's prerequisite chart — all the same object wearing different labels.</p>
<p>The <span class="term">degree</span> of a vertex is how many edges touch it — a person's friend count, a router's cable count.</p>
<div class="callout amber"><p><b>Sandbox below:</b> drag the vertices — notice the graph does not change. A graph has no geometry, only connectivity: the drawing is a costume, the edge list is the creature. Click two vertices to add or remove an edge and watch Σdeg track 2|E| in the status line.</p></div>`,
      questions: [
        {
          type: 'mcq',
          prompt: `You drag the vertices of a graph into completely new positions. What changed?`,
          options: [
            { t: 'Nothing — a graph is its connectivity, not its drawing', ok: true, why: 'Same vertices, same edges ⇒ same graph. Layout is presentation; the mathematical object is the set of connections.' },
            { t: 'The graph — edge lengths are different now', ok: false, mis: 'geometry-confusion', why: 'Edges in a plain graph have no length — only existence. (Weighted graphs add numbers to edges, but position still means nothing.)' },
            { t: 'It depends whether edges now cross', ok: false, why: 'Crossings are drawing accidents. K₄ can be drawn with or without crossings — same graph both times.' }
          ],
          hints: ['What information defines the graph — coordinates or connections?', 'Could you rebuild the graph from just the edge list?']
        },
        {
          type: 'mcq',
          prompt: `In a friendship graph, what is a person's <b>degree</b>?`,
          options: [
            { t: 'Their number of friends — edges touching their vertex', ok: true, why: 'Degree counts incident edges. In the sandbox, a hub vertex has high degree; a loner has degree 0.' },
            { t: 'How far they are from the most popular person', ok: false, why: 'That is distance (path length) — a different and also useful measure, coming in 2.6.' },
            { t: 'Their number of friends-of-friends', ok: false, why: 'That is the size of their 2-neighborhood. Degree is strictly the direct connections.' }
          ],
          hints: ['Look at one vertex — count what touches it.']
        },
        {
          type: 'mcq',
          prompt: `Which of these is naturally a graph problem?`,
          options: [
            { t: 'All three of the others', ok: true, why: 'Cities/roads, packages/dependencies, people/follows — vertices and edges every time. Recognizing the graph hiding in a problem is half of algorithm design.' },
            { t: 'Shortest driving route between cities', ok: false, why: 'It is one — cities are vertices, roads are edges. But look at the other options again…' },
            { t: 'Which package to install first, given dependencies', ok: false, why: 'Also a graph (a directed one). But check the remaining options…' },
            { t: 'Who follows whom on a social platform', ok: false, why: 'Also a graph. In fact — every option here is one.' }
          ],
          hints: ['For each option, ask: what are the things, what are the connections?', 'If both questions have answers, it is a graph problem.']
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Definitions</h4>
<p>A (simple, undirected) graph G = (V, E): V a set of vertices, E a set of 2-element subsets of V. |V| = n, |E| = m. No self-loops, no repeated edges. <span class="term">Directed</span> graphs use ordered pairs instead — edges become arrows.</p>
<h4>The handshake theorem</h4>
<pre><code>Σ deg(v) = 2|E|      every edge contributes exactly 2 to the total degree</code></pre>
<p>Corollary with teeth: the sum of degrees is always <b>even</b>, so the number of odd-degree vertices is even. A party where exactly three people shook an odd number of hands is impossible — provably, before checking anything.</p>
<h4>Counting graphs</h4>
<ul>
  <li><b>Complete graph K_n:</b> every pair connected — C(n,2) = n(n−1)/2 edges (the all-pairs count of 2.2).</li>
  <li><b>How many graphs exist on n labeled vertices?</b> Each of the C(n,2) pairs independently has an edge or not: 2^C(n,2). For n = 10 that is 2⁴⁵ ≈ 3.5×10¹³ — the product rule detonating again.</li>
</ul>
<h4>Two representations</h4>
<div class="tbl-scroll"><table class="tt">
  <tr><th></th><th>Adjacency matrix</th><th>Adjacency list</th></tr>
  <tr><td style="text-align:left">storage</td><td>O(n²)</td><td>O(n + m)</td></tr>
  <tr><td style="text-align:left">edge lookup u–v</td><td>O(1)</td><td>O(deg u)</td></tr>
  <tr><td style="text-align:left">iterate neighbors</td><td>O(n)</td><td>O(deg u)</td></tr>
</table></div>
<p>Undirected ⇒ the matrix is <b>symmetric</b> (M[u][v] = M[v][u] — an equivalence-flavored symmetry, node 1.6), and row u sums to deg(u).</p>`,
      questions: [
        {
          type: 'input',
          prompt: `K₅ — the complete graph on 5 vertices. How many edges?`,
          accept: ['10'],
          placeholder: '…',
          hints: ['Every pair of vertices gets one edge.', 'C(5,2) = 5·4/2.'],
          why: 'C(5,2) = 10. Complete-graph edges ARE the all-pairs combination count — 2.2 and 2.5 are one lesson.'
        },
        {
          type: 'mcq',
          prompt: `A network audit reports: "7 servers, and their connection counts are 3, 3, 3, 2, 2, 2, 2." Trustworthy?`,
          options: [
            { t: 'No — the degree sum is 17, odd, which handshake forbids', ok: true, why: 'Σdeg = 2|E| must be even; 17 is not. The report is arithmetically impossible — no topology needs checking. Parity arguments reject data at the door.' },
            { t: 'Yes — small degrees are always realizable', ok: false, mis: 'plausibility-vs-parity', why: 'Each degree is individually plausible; the SUM betrays them. Handshake constrains the collection, not the members.' },
            { t: 'Cannot tell without the wiring diagram', ok: false, why: 'That is the beauty: no diagram can exist. Σdeg odd has no graph, the way an odd number has no half.' }
          ],
          hints: ['Add up the seven degrees.', 'What must Σ deg(v) equal, and what parity does that force?'],
          edge: 'Same theorem, positive use: |E| = Σdeg/2 lets you count edges from a degree census without seeing a single edge.'
        },
        {
          type: 'mcq',
          prompt: `The adjacency matrix of an <b>undirected</b> graph is always…`,
          options: [
            { t: 'Symmetric: M[u][v] = M[v][u]', ok: true, why: 'An undirected edge {u,v} is mutual — stored twice, mirrored across the diagonal. Directedness is exactly the freedom to break this symmetry.' },
            { t: 'Full of 1s on the diagonal', ok: false, why: 'Diagonal entries are self-loops — banned in simple graphs, so the diagonal is all 0.' },
            { t: 'Upper triangular', ok: false, mis: 'storage-vs-structure', why: 'You MAY store only the upper triangle (symmetry makes the rest redundant — a storage trick), but the matrix itself is symmetric, not triangular.' }
          ],
          hints: ['If u connects to v, does v connect to u in an undirected graph?', 'What does mutual connection do to positions (u,v) and (v,u)?'],
          edge: 'Symmetric relation ⇒ symmetric matrix — the 1.6 relation properties made visible as a picture of the matrix.'
        },
        {
          type: 'mcq',
          prompt: `A social graph: 10 million users, each following ~200 others. Matrix or list?`,
          options: [
            { t: 'List — O(n + m) ≈ 2×10⁹ entries; the matrix needs 10¹⁴ cells', ok: true, why: 'The matrix costs n² regardless of how empty the graph is: 10¹⁴ cells (≈100 TB) to store 2×10⁹ actual follows. Sparse graphs — most real ones — live in lists.' },
            { t: 'Matrix — O(1) edge lookup is worth anything', ok: false, mis: 'lookup-fixation', why: 'Worth 100 TB of nearly-all-zeros? A hash-set per user gives O(1) expected lookup at list-like storage. The matrix wins only when graphs are DENSE (m ≈ n²).' },
            { t: 'Neither works at that scale', ok: false, why: 'Lists handle it comfortably — 2×10⁹ ids ≈ 16 GB. Every real social platform is an adjacency list with engineering on top.' }
          ],
          hints: ['Compute both storage costs: n² vs n + m.', 'm = 10⁷ × 200 = 2×10⁹, but n² = 10¹⁴. Ratio?'],
          edge: 'Density m/n² here ≈ 0.00002 — the matrix would be 99.998% zeros. "Sparse vs dense" decides representation before any other consideration.'
        },
        {
          type: 'mcq',
          prompt: `How many distinct simple graphs exist on 10 labeled vertices?`,
          options: [
            { t: '2^C(10,2) = 2⁴⁵ — each pair independently has an edge or not', ok: true, why: 'C(10,2) = 45 candidate edges, each a yes/no choice: product rule → 2⁴⁵ ≈ 3.5×10¹³ graphs. A graph IS a subset of the pair-set — the power set again (1.5).' },
            { t: '10! — arrangements of the vertices', ok: false, mis: 'perm-comb-swap', why: '10! counts orderings of vertices, but a graph is defined by which PAIRS connect. The choice space is the 45 pairs, each binary.' },
            { t: 'C(45, 10) — choose 10 edges', ok: false, why: 'That counts only graphs with EXACTLY 10 edges. All edge counts from 0 to 45 are allowed — summing C(45,k) over k gives 2⁴⁵ (the row-sum identity of 2.2!).' }
          ],
          hints: ['A graph on fixed vertices is determined by its edge SET.', 'How many possible edges, and how many subsets of them?'],
          edge: 'The chain 1.5 → 2.1 → 2.2 → here: subsets, product rule, C(n,2), row sums — four nodes, one computation.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>The adjacency list, in code</h4>
<pre><code>const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C', 'E'],
  E: ['D']
};
const deg = v => graph[v].length;                  // degree = list length
const edges = Object.values(graph).flat().length / 2;   // handshake in one line!</code></pre>
<p>That <code>/ 2</code> is the handshake theorem as an implementation detail: every undirected edge appears in two lists.</p>
<h4>Graphs you already depend on daily</h4>
<ul>
  <li><b>Package managers:</b> packages are vertices, "depends on" edges — install order is a graph traversal (and a cycle means dependency hell, next node).</li>
  <li><b>Import statements:</b> your codebase is a directed graph; bundlers walk it.</li>
  <li><b>This lab:</b> the prerequisite chains on the system map are edges you have been traversing all along.</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `Given the adjacency list above, what does <code>Object.values(graph).flat().length / 2</code> compute — and why the division?`,
          options: [
            { t: '|E| — each undirected edge sits in exactly two lists, so total entries = 2|E|', ok: true, why: 'A–B appears under A and under B. Summing all list lengths IS Σdeg, and handshake says that is 2|E|. Theorem as code.' },
            { t: 'The vertex count, halved for symmetry', ok: false, why: 'Vertex count is Object.keys(graph).length — no halving involved. The flat() walks edge ENDPOINTS.' },
            { t: 'The average degree', ok: false, mis: 'sum-vs-average', why: 'Average degree would divide by n (vertex count): Σdeg / n = 2m/n. Dividing by 2 gives the edge count.' }
          ],
          hints: ['Each list entry is one edge-endpoint. How many endpoints has an edge?', 'Sum of list lengths = Σ deg(v) = ?'],
          edge: 'In a DIRECTED graph the /2 disappears — each arrow lives in one out-list only. The formula silently assumes undirectedness; a classic latent bug.'
        },
        {
          type: 'mcq',
          prompt: `Your code calls <code>hasEdge(u, v)</code> millions of times per second on a small, DENSE graph (n = 200, m ≈ 15,000). Best representation?`,
          options: [
            { t: 'Adjacency matrix — 40,000 booleans, O(1) exact lookup', ok: true, why: 'Dense + small + lookup-heavy is the matrix’s home turf: 200×200 bits is nothing, and M[u][v] is a single array read. Representation follows workload.' },
            { t: 'Adjacency list — lists are always better', ok: false, mis: 'one-true-structure', why: '"Always" died in L2: lists win SPARSE storage, matrices win DENSE lookup. Here m ≈ 15k of a possible ~20k pairs — the graph is 75% full.' },
            { t: 'Edge array — a flat list of pairs', ok: false, why: 'hasEdge becomes a O(m) scan or needs an index anyway. Fine for streaming edges once; wrong for lookup-heavy loads.' }
          ],
          hints: ['Check density: m vs C(200,2) ≈ 19,900.', 'Dense + lookup-dominated workload points where?'],
          edge: 'The full decision table: sparse+iterate → list; dense+lookup → matrix; huge+distributed → edge lists in a database. Workload first, structure second.'
        },
        {
          type: 'mcq',
          prompt: `npm/pip install order is computed from the dependency graph. The edges must be…`,
          options: [
            { t: 'Directed — "A depends on B" is one-way; B does not need A', ok: true, why: 'Dependency is asymmetric, so arrows, not lines. Install order = walk arrows backwards (dependencies first) — a topological sort, living entirely on directedness.' },
            { t: 'Undirected — a dependency connects two packages either way', ok: false, mis: 'symmetry-assumed', why: 'Losing the direction loses the ANSWER: an undirected edge cannot say who must install first. The asymmetry is the payload.' },
            { t: 'Weighted — dependencies have version numbers', ok: false, why: 'Versions are constraints layered on top; the ordering problem needs only direction. Add weights when the QUESTION involves magnitudes (route lengths, costs).' }
          ],
          hints: ['Is "depends on" a symmetric relation (1.6)?', 'Asymmetric relation ⇒ which kind of edge?'],
          edge: 'And a directed CYCLE (A→B→…→A) makes install order impossible — the "circular dependency" error is a graph-theoretic impossibility report. Next node builds the tools to detect it.'
        }
      ]
    }
  }
};

/* ============ 2.6 GRAPHS II: TRAVERSAL & TREES ============ */
window.NODES['disc.graphs2'] = {
  id: 'disc.graphs2', num: '2.6', trackId: 'discrete',
  title: 'Graphs II: Traversal & Trees',
  minutes: 35,
  payoff: 'search · crawling · file systems',
  levels: {

    l1: {
      widget: 'graphlab',
      html: `
<h4>Two ways to explore a maze</h4>
<p>Standing at vertex A, how do you visit everything reachable? Two personalities:</p>
<ul>
  <li><b>BFS (breadth-first):</b> the cautious ripple. Visit all neighbors, then all THEIR neighbors — the graph explored in expanding rings. Nothing at distance 2 before everything at distance 1.</li>
  <li><b>DFS (depth-first):</b> the spelunker. Follow one corridor as deep as it goes; backtrack only when stuck. You may end up far from home while near-home rooms wait unvisited.</li>
</ul>
<div class="callout amber"><p><b>Run both in the sandbox</b> from vertex A (step with repeated clicks) — same graph, different visit orders. Then rewire an edge and run again. The visit numbers above each vertex tell the story.</p></div>
<h4>Trees: graphs with no wasted wire</h4>
<p>A <span class="term">tree</span> is a connected graph with no cycles — every vertex reachable, no redundant edge anywhere. File systems, org charts, JSON documents, this sentence's grammar: trees. Remove any edge → it splits. Add any edge → a cycle appears. Trees sit exactly on the knife-edge of connectivity.</p>`,
      questions: [
        {
          type: 'mcq',
          prompt: `BFS from A has just finished visiting every vertex at distance 2. What is guaranteed about distance-1 vertices?`,
          options: [
            { t: 'All of them were already visited — BFS finishes each ring before the next', ok: true, why: 'The expanding-ripple invariant: BFS processes vertices in nondecreasing distance from the start. Rings never interleave.' },
            { t: 'Nothing — visit order depends on the drawing', ok: false, mis: 'geometry-confusion', why: 'Layout is costume (2.5). BFS order depends on adjacency and queue discipline — distance rings are structural, not visual.' },
            { t: 'They will be visited on the way back', ok: false, why: '"On the way back" is DFS backtracking. BFS never doubles back — it exhausts near before touching far.' }
          ],
          hints: ['BFS = ripples on a pond. Can an outer ripple exist before an inner one completes?']
        },
        {
          type: 'mcq',
          prompt: `Which explorer can find itself DEEP in the graph while a direct neighbor of the start is still unvisited?`,
          options: [
            { t: 'DFS — one corridor to the end before the next corridor begins', ok: true, why: 'DFS commits: the first neighbor’s entire reachable world is explored before the second neighbor gets a glance. Depth over breadth, by design.' },
            { t: 'BFS — it moves fast', ok: false, mis: 'bfs-dfs-swap', why: 'BFS structurally cannot: every distance-1 vertex is enqueued in the first wave, before anything at distance 2 dequeues.' },
            { t: 'Neither — traversals visit near before far', ok: false, why: 'Only BFS promises that. DFS trades the promise for minimal memory of where it has been — just the current path.' }
          ],
          hints: ['Which strategy says "finish this whole branch first"?', 'Run DFS in the sandbox and watch where visit #3 lands.']
        },
        {
          type: 'mcq',
          prompt: `A connected graph on 6 vertices has exactly 5 edges. Someone adds one more edge (anywhere). What appears?`,
          options: [
            { t: 'Exactly one cycle — the graph was a tree, with zero slack', ok: true, why: 'Connected with n−1 edges = tree = unique path between any two vertices. A new edge {u,v} plus the existing u–v path closes exactly one loop.' },
            { t: 'Possibly nothing, if the edge is placed well', ok: false, mis: 'tree-slack', why: 'No placement escapes: both endpoints are ALREADY connected by a path (trees connect everything), so any new edge completes a circuit. Trees have zero slack.' },
            { t: 'The graph might disconnect', ok: false, why: 'Adding edges can only preserve or improve connectivity — removal is what threatens it.' }
          ],
          hints: ['6 vertices, 5 edges, connected — what special graph is that?', 'In a tree, any two vertices already have a path. Add an edge between them…'],
          edge: 'The knife-edge, quantified: n−1 edges is the exact minimum for connectivity and the exact maximum for acyclicity. Trees are both at once.'
        }
      ]
    },

    l2: {
      passNeed: 4,
      html: `
<h4>Paths, connectivity, cycles</h4>
<p>A <span class="term">path</span> is a sequence of vertices with consecutive edges; its length is the edge count. G is <span class="term">connected</span> if every pair has a path. ("Reachable from" is reflexive, symmetric, transitive — an equivalence relation! Its classes are the <span class="term">connected components</span>: 1.6 slicing graphs into islands.) A <span class="term">cycle</span> returns to its start without reusing edges.</p>
<h4>Trees, characterized five ways</h4>
<p>For a graph on n vertices, these are all equivalent — any one implies the rest:</p>
<ol>
  <li>connected and acyclic (the definition)</li>
  <li>connected with exactly n − 1 edges</li>
  <li>acyclic with exactly n − 1 edges</li>
  <li>a unique path between every pair of vertices</li>
  <li>minimally connected: removing any edge disconnects it</li>
</ol>
<h4>The traversal contract</h4>
<div class="tbl-scroll"><table class="tt">
  <tr><th></th><th>BFS</th><th>DFS</th></tr>
  <tr><td style="text-align:left">frontier structure</td><td>queue (FIFO)</td><td>stack (LIFO) / recursion</td></tr>
  <tr><td style="text-align:left">visit order</td><td>by distance rings</td><td>by branch, deep first</td></tr>
  <tr><td style="text-align:left">superpower</td><td><b>shortest paths</b> (unweighted)</td><td>cycle detection, topological order</td></tr>
  <tr><td style="text-align:left">cost</td><td colspan="2">both O(V + E) with a visited set</td></tr>
</table></div>
<p>Why BFS finds shortest paths: the ring invariant — a vertex is first reached at its true distance, never earlier, never later. Why the <b>visited set</b> is non-negotiable: without it, any cycle loops the traversal forever (and even on trees, paths get re-walked exponentially).</p>`,
      questions: [
        {
          type: 'input',
          prompt: `A tree has 50 vertices. Exactly how many edges?`,
          accept: ['49'],
          placeholder: '…',
          hints: ['Trees: |E| = |V| − 1, always.', '50 − 1.'],
          why: '49 — one less than the vertex count, the tree signature. Induction-provable: each leaf added brings exactly one edge.'
        },
        {
          type: 'mcq',
          prompt: `Which frontier data structure produces which traversal?`,
          options: [
            { t: 'Queue → BFS, stack → DFS', ok: true, why: 'FIFO serves the oldest discovery first — the ripple. LIFO serves the newest — the corridor-plunge. Swap one data structure, swap the algorithm’s personality.' },
            { t: 'Stack → BFS, queue → DFS', ok: false, mis: 'bfs-dfs-swap', why: 'Reversed. Trace 3 steps by hand: a stack pops the most-recent vertex — that is diving deeper, not rippling outward.' },
            { t: 'Either works for both — order is a detail', ok: false, why: 'The order IS the algorithm: shortest-path correctness (BFS) lives or dies on FIFO. One character of difference, different theorems.' }
          ],
          hints: ['Who gets served next from each structure — oldest or newest discovery?', 'Oldest-first = closest-first = rings.'],
          edge: 'DFS-by-recursion is the stack version with the CALL stack as the stack — which is why deep graphs can stack-overflow a recursive DFS.'
        },
        {
          type: 'mcq',
          prompt: `Unweighted graph, need the minimum-hop route from u to v. The correct tool and the reason:`,
          options: [
            { t: 'BFS — it first reaches every vertex at its true shortest distance', ok: true, why: 'The ring invariant is a proof: when v leaves the queue, no shorter route can exist, because all shorter distances were exhausted first.' },
            { t: 'DFS — it commits to promising paths', ok: false, mis: 'dfs-shortest', why: 'DFS reaches v by whatever corridor it happened to enter first — possibly wildly long. It certifies reachability, never minimality.' },
            { t: 'Either, then measure the path found', ok: false, why: 'Measuring one found path says nothing about shorter unfound ones. The guarantee must come from the traversal ORDER, and only BFS’s order provides it.' }
          ],
          hints: ['Which traversal touches all distance-k vertices before any distance-(k+1)?', 'First touch at true distance — which structure enforced that?'],
          edge: 'Weighted edges break the ring logic — that failure is what Dijkstra’s algorithm repairs (a priority queue replacing the plain queue).'
        },
        {
          type: 'mcq',
          prompt: `Why does every traversal need a <b>visited</b> set on general graphs?`,
          options: [
            { t: 'Cycles would otherwise recirculate the traversal forever', ok: true, why: 'A→B→C→A re-enqueues A endlessly without the check. The visited set converts "wander" into "systematically exhaust": each vertex processed once, giving the O(V+E) bound.' },
            { t: 'To sort the output alphabetically', ok: false, why: 'Visit order comes from the frontier structure; the visited set only prevents revisiting. Different jobs.' },
            { t: 'Only DFS needs it; BFS is naturally safe', ok: false, mis: 'bfs-immune', why: 'Both drown in cycles unmarked — a queue recirculates A→B→C→A just as happily as a stack. The set is universal traversal hygiene.' }
          ],
          hints: ['Walk A→B→C→A by hand with no memory of past visits.', 'What terminates the loop? Nothing — unless something remembers.'],
          edge: 'The visited set is also why traversal cost is O(V+E), not exponential: each vertex enters the frontier at most once, each edge examined at most twice.'
        },
        {
          type: 'mcq',
          prompt: `A connected graph has n = 8 vertices and m = 10 edges. How many edges must be removed to leave a spanning tree?`,
          options: [
            { t: '3 — a tree on 8 vertices has exactly 7 edges', ok: true, why: 'Target is n−1 = 7; from 10, remove 10−7 = 3 (each removal breaking a cycle, never connectivity, if chosen from cycles). The excess m − (n−1) counts the graph’s independent cycles.' },
            { t: '2 — remove until it looks sparse', ok: false, why: '"Looks sparse" is not a criterion; n−1 is. 8 edges on 8 vertices still contains exactly one cycle.' },
            { t: '0 — connected graphs are already trees', ok: false, mis: 'connected-equals-tree', why: 'Connected is HALF the tree definition — acyclic is the other half. 10 > 7 edges guarantees cycles (three of them, independently).' }
          ],
          hints: ['How many edges does a spanning tree on 8 vertices have?', 'm − (n − 1) = ?'],
          edge: 'That excess m − n + 1 is the "cyclomatic number" — the same quantity code-quality tools compute as cyclomatic complexity of your control-flow graph.'
        }
      ]
    },

    l3: {
      passNeed: 2,
      html: `
<h4>BFS in eleven lines</h4>
<pre><code>function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const v = queue.shift();               // FIFO — swap to pop() and it's DFS
    order.push(v);
    for (const nb of graph[v])
      if (!visited.has(nb)) { visited.add(nb); queue.push(nb); }
  }
  return order;
}</code></pre>
<p>One line — <code>shift()</code> vs <code>pop()</code> — selects the algorithm. Everything else is shared scaffolding: the visited set (1.5 Sets, doing production work), the frontier, the neighbor loop.</p>
<h4>Traversals you run daily</h4>
<ul>
  <li><b>Web crawlers:</b> BFS from seed pages — closest pages first.</li>
  <li><b>"Degrees of separation" / friend suggestions:</b> BFS rings, literally.</li>
  <li><b>Circular-import detection:</b> DFS; an edge back into the current recursion path = cycle = your bundler's angriest error.</li>
  <li><b>find / du on a file system:</b> DFS over a tree (no visited set needed — trees have no cycles, one of the few safe omissions).</li>
</ul>`,
      questions: [
        {
          type: 'mcq',
          prompt: `In the bfs() above, replacing <code>queue.shift()</code> with <code>queue.pop()</code> changes…`,
          options: [
            { t: 'The algorithm: FIFO becomes LIFO, so BFS becomes (iterative) DFS', ok: true, why: 'The frontier discipline IS the algorithm’s identity; the rest of the code serves either master unchanged. Rings become corridors with three characters.' },
            { t: 'Only performance — pop() avoids re-indexing', ok: false, mis: 'perf-explains-semantics', why: 'pop() IS faster (O(1) vs O(n)) — but calling that the change misses that the visit ORDER, and every theorem about it (shortest paths!), just silently changed.' },
            { t: 'Nothing — all vertices still get visited', ok: false, why: 'Coverage survives; ORDER does not — and order was carrying the shortest-path guarantee. Same set, different theorem.' }
          ],
          hints: ['shift takes the oldest element; pop takes the newest.', 'Oldest-first vs newest-first — which traversal is each?'],
          edge: 'Real BFS code uses an index pointer or deque instead of shift() (which is O(n)) — same discipline, honest constants.'
        },
        {
          type: 'mcq',
          prompt: `LinkedIn-style "2nd-degree connections" for user u are computed how?`,
          options: [
            { t: 'BFS from u, keeping exactly the second ring (distance = 2)', ok: true, why: 'Degrees of separation ARE BFS distance rings. Ring 1 = friends, ring 2 = friends-of-friends minus ring 1 and u — the visited set handles the "minus" automatically.' },
            { t: 'DFS from u, stopping at depth 2', ok: false, mis: 'dfs-shortest', why: 'Depth-limited DFS finds vertices REACHABLE within 2 hops along its wander — but a vertex found at depth 2 might also be a direct friend reached the long way. Ring membership needs shortest distance, i.e. BFS.' },
            { t: 'Check all C(n,2) pairs for mutual friends', ok: false, why: 'Correct-ish and catastrophically O(n²) (2.4). BFS from u touches only u’s neighborhood: O(local edges).' }
          ],
          hints: ['"2nd degree" = shortest distance exactly 2. Which traversal computes shortest distances?'],
          edge: 'The ring sizes themselves are product-rule estimates: ~200 friends × ~200 each ≈ 40,000 in ring 2 — why "people you may know" never lacks candidates.'
        },
        {
          type: 'mcq',
          prompt: `Your bundler reports "circular dependency: a.js → b.js → c.js → a.js". Which traversal fact produced this error?`,
          options: [
            { t: 'DFS found an edge pointing back into its current recursion path — the definitive cycle witness', ok: true, why: 'A "back edge" to an ancestor still on the DFS path closes a directed cycle, and the path itself is the printable proof: a → b → c → a. Cycle detection is DFS’s home game.' },
            { t: 'BFS noticed a.js at two different distances', ok: false, why: 'Revisits in BFS happen in any graph with multiple routes — diamonds, not necessarily cycles. The precise cycle certificate is the DFS back edge into the ACTIVE path.' },
            { t: 'The visited set overflowed', ok: false, why: 'Visited sets do not overflow meaningfully — and a full one signals a big graph, not a circular one. The signal is structural: an edge into the in-progress stack.' }
          ],
          hints: ['What does it mean if DFS, deep in a→b→c, finds an edge c→a while a is still "open"?', 'An edge to an ancestor on the current path closes a loop.'],
          edge: 'Same machinery inverted: a DFS finishing order with NO back edges is a topological sort — the install order from 2.5’s dependency graphs. One traversal, both answers.'
        }
      ]
    }
  }
};
