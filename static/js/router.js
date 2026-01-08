(function(){
  var Core = window.App.Core;

  function renderFromHash(builder) {
    var hash    = (window.location.hash || '#/home').replace(/^#\/?/, '');
    var parts   = hash.split('/');
    var section = parts[0] || 'home';
    var sub     = parts[1];
    var param   = parts[2];

    Core.setActive();

    var root = document.getElementById('app-root');
    if (!root) return; // shell pas encore monté
    Core.killChildren(root);

    // Dispatch vers les views
    if (section === 'account') return window.App.Views.account(builder, root);
    if (section === 'login')   return window.App.Views.login(builder, root);
    if (section === 'logout')  {
      // Simulation logout : ROLE='guest', reconstruire menus et aller home
      window.ROLE = 'guest';
      window.App.Menus.rebuildMenus(builder);
      location.hash = '#/home';
      return;
    }
    if (section === 'blog')    return window.App.Views.blog(builder, root, sub, param);
    if (section === 'apps')    return window.App.Views.apps(builder, root, sub, param);

    return window.App.Views.home(builder, root);
  }

  window.App.Router = { renderFromHash };
})();
