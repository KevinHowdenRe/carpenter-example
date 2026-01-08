(function(){
  var Core = window.App.Core;

  function rebuildMenus(builder) {
    var role     = window.ROLE || 'guest';

    var topLinks = document.getElementById('top-links');
    var topActs  = document.getElementById('top-actions');
    var sideMob  = document.getElementById('side-links');
    var sideLg   = document.getElementById('side-links-lg');

    var topnav  = Core.filterByAudience(window.MENUS.topnav, role);
    var actions = Core.filterByAudience(window.MENUS.actions, role);
    var sidebar = Core.filterByAudience(window.MENUS.sidebar, role);

    // Nettoyage
    Core.killChildren(topLinks);
    Core.killChildren(topActs);
    Core.killChildren(sideMob);
    Core.killChildren(sideLg);

    // Reconstruction
    if (topLinks) { builder.newBuilds(topnav.map(Core.linkItem),   topLinks); builder.buildBlueprint(); }
    if (topActs)  { builder.newBuilds(actions.map(Core.actionItem), topActs); builder.buildBlueprint(); }
    if (sideMob)  { builder.newBuilds(sidebar.map(Core.linkItem),   sideMob); builder.buildBlueprint(); }
    if (sideLg)   { builder.newBuilds(sidebar.map(Core.linkItem),   sideLg);  builder.buildBlueprint(); }
  }

  window.App.Menus = { rebuildMenus };
})();
