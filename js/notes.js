/* MATH LAB — notebook store (دفتر الملاحظات). Pages in localStorage, autosaved. */
(function () {
  const KEY = 'mathlab.notes.v1';
  let cache = null;

  function load() {
    if (cache) return cache;
    try { cache = JSON.parse(localStorage.getItem(KEY)) || { pages: [] }; }
    catch (e) { cache = { pages: [] }; }
    return cache;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {} }
  function newId() { return 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  window.Notes = {
    list() {
      return load().pages.slice().sort((a, b) => b.updatedAt - a.updatedAt);
    },
    get(id) { return load().pages.find(p => p.id === id) || null; },
    create(title, nodeId) {
      const p = { id: newId(), title: title || 'Untitled', body: '', nodeId: nodeId || null, updatedAt: Date.now() };
      load().pages.push(p); save();
      return p;
    },
    update(id, fields) {
      const p = window.Notes.get(id);
      if (!p) return;
      Object.assign(p, fields, { updatedAt: Date.now() });
      save();
    },
    remove(id) {
      const s = load();
      s.pages = s.pages.filter(p => p.id !== id);
      save();
    },
    forNode(nodeId) {
      return load().pages.find(p => p.nodeId === nodeId) || null;
    },
    /* one markdown file with all notes — a backup you can keep anywhere */
    exportMd() {
      const pages = window.Notes.list();
      const md = '# Math Lab Notebook — exported ' + new Date().toISOString().slice(0, 10) + '\n\n' +
        pages.map(p =>
          '## ' + p.title + (p.nodeId && window.NODES[p.nodeId] ? '  (lesson ' + window.NODES[p.nodeId].num + ')' : '') +
          '\n_' + new Date(p.updatedAt).toLocaleString() + '_\n\n' + p.body + '\n'
        ).join('\n---\n\n');
      const blob = new Blob([md], { type: 'text/markdown' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'mathlab-notebook.md';
      a.click();
      URL.revokeObjectURL(a.href);
    }
  };
})();
