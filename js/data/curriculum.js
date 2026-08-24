/* MATH LAB — curriculum manifest (P5: all five tracks live) */
window.NODES = {};

window.TRACKS = [
  {
    id: 'logic', glyph: '∧',
    title: 'Logic & Foundations',
    component: 'GATEWORK',
    componentSub: 'Control unit',
    colorVar: '--t-logic',
    cssClass: 'gatework-on',
    live: true,
    unlockedBy: null,
    nodeIds: [
      'logic.props', 'logic.demorgan', 'logic.quantifiers', 'logic.implication',
      'logic.sets', 'logic.relations', 'logic.induction'
    ],
    bossId: 'boss.gatework'
  },
  {
    id: 'discrete', glyph: 'Σ',
    title: 'Discrete Mathematics',
    component: 'LATTICE',
    componentSub: 'Data & network',
    colorVar: '--t-disc',
    cssClass: 'lattice-on',
    live: true,
    unlockedBy: 'logic',
    nodeIds: [
      'disc.counting', 'disc.combinations', 'disc.recurrences', 'disc.bigo',
      'disc.graphs1', 'disc.graphs2', 'disc.numtheory', 'disc.modular'
    ],
    bossId: 'boss.lattice'
  },
  {
    id: 'linear-algebra', glyph: '⊗',
    title: 'Linear Algebra',
    component: 'RENDER ENGINE',
    componentSub: 'Graphics',
    colorVar: '--t-lin',
    cssClass: 'render-on',
    live: true,
    unlockedBy: 'logic',
    nodeIds: [
      'la.vectors', 'la.dot', 'la.transform', 'la.matmul',
      'la.systems', 'la.basis', 'la.determinant', 'la.eigen'
    ],
    bossId: 'boss.render'
  },
  {
    id: 'calculus', glyph: '∂',
    title: 'Calculus / Analysis',
    component: 'OPTIMIZER',
    componentSub: 'Tuning',
    colorVar: '--t-calc',
    cssClass: 'optimizer-on',
    live: true,
    unlockedBy: 'logic',
    nodeIds: [
      'calc.growth', 'calc.limits', 'calc.derivative', 'calc.chain',
      'calc.optimization', 'calc.descent', 'calc.integration', 'calc.series'
    ],
    bossId: 'boss.optimizer'
  },
  {
    id: 'probability', glyph: 'ℙ',
    title: 'Probability',
    component: 'ORACLE',
    componentSub: 'Randomness',
    colorVar: '--t-prob',
    cssClass: 'oracle-on',
    live: true,
    unlockedBy: 'discrete',
    nodeIds: [
      'prob.samplespaces', 'prob.bayes', 'prob.randomvars',
      'prob.expectation', 'prob.distributions', 'prob.montecarlo', 'prob.algorithms'
    ],
    bossId: 'boss.oracle'
  }
];

window.XP_RULES = { l1: 20, l2: 40, l3: 60, boss: 150 };
window.HINT_MULT = [1.0, 0.8, 0.6, 0.4, 0.2]; /* index = hints used */
