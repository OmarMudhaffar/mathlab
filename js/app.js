/* MATH LAB — bootstrap & hash router */
(function () {
  const root = document.getElementById('app');

  /* theme: dark (default) or light — saved, applied before first paint */
  try { if (localStorage.getItem('mathlab.theme') === 'light') document.documentElement.dataset.theme = 'light'; } catch (e) {}
  document.addEventListener('click', e => {
    if (!e.target.closest('#theme-toggle')) return;
    const toLight = document.documentElement.dataset.theme !== 'light';
    if (toLight) document.documentElement.dataset.theme = 'light';
    else delete document.documentElement.dataset.theme;
    try { localStorage.setItem('mathlab.theme', toLight ? 'light' : 'dark'); } catch (err) {}
    route(); /* re-render so canvas widgets pick up the new palette */
  });

  function route() {
    /* teardown any arena keyboard handler from the previous screen */
    if (window.Views.teardown) window.Views.teardown();

    window.TRACKS.forEach(t => {
      document.body.classList.toggle(t.cssClass, window.State.exists() && window.State.isPowered(t.id));
    });

    const fab = document.getElementById('mt-fab');
    if (fab) fab.hidden = !window.State.exists();

    if (!window.State.exists()) { window.Views.onboarding(root); return; }

    const hash = location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/').filter(Boolean);

    if (parts[0] === 'node' && window.NODES[parts[1]]) {
      window.Views.node(root, parts[1], parts[2] || null);
    } else if (parts[0] === 'arena' && window.NODES[parts[1]] && parts[2]) {
      window.Views.arena(root, parts[1], parts[2]);
    } else if (parts[0] === 'boot') {
      window.Views.boot(root);
    } else if (parts[0] === 'gym') {
      window.Views.gym(root);
    } else if (parts[0] === 'laws') {
      window.Views.manual(root);
    } else if (parts[0] === 'notes' && parts[1]) {
      window.Views.noteEdit(root, parts[1]);
    } else if (parts[0] === 'notes') {
      window.Views.notesList(root);
    } else if (parts[0] === 'drill' && parts[1]) {
      window.Views.drill(root, parts[1]);
    } else {
      window.Views.map(root);
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  window.App = {
    go(hash) {
      if (location.hash === hash) route();
      else location.hash = hash;
    },
    refresh: route
  };
  window.Mentor.mount();
  route();
})();
