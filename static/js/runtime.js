(function(){
  document.addEventListener('DOMContentLoaded', function(){
    // 1) Construire le SHELL via Carpenter
    var builder = new Carpenter();
    builder.newBuilds(window.SHELL, document.body);
    builder.buildBlueprint();

    // 2) Branding
    var brand = document.getElementById('app-title');
    if (brand && window.SITE && window.SITE.title) brand.textContent = window.SITE.title;

    // 3) Menus (TopBar + Sidebar)
    window.App.Menus.rebuildMenus(builder);

    // 4) Router (hash)
    window.addEventListener('hashchange', function(){ window.App.Router.renderFromHash(builder); });
    window.App.Router.renderFromHash(builder);
  });
})();
``
