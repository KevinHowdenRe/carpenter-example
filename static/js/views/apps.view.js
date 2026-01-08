(function(){
  window.App.Views = window.App.Views || {};
  window.App.Views.apps = function(builder, root, sub, param){
    var comps   = window.COMPONENTS;
    var catalog = window.DATA.apps.catalog;

    if (sub === 'catalog' || !sub) {
      
      var cards  = catalog.map(function(a){ return comps.AppCard({ title:a.title, desc:a.desc, id:a.id }); });

       
	  var bp = [
		  { item:'h1', attributes:{ class:'h3 mb-5' }, textContent:'Articles' },
		  { item:'div', attributes:{ class:'row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3' }, children: cards }
		];

	  builder.newBuilds(bp, root);
      builder.buildBlueprint();
      return;
    }

    if (sub === 'app' && param) {
      var app = catalog.find(function(a){ return a.id === param; });
      if (!app) {
        builder.newBuilds([{ item:'div', attributes:{ class:'alert alert-danger' }, textContent:'App introuvable' }], root);
        builder.buildBlueprint(); return;
      }
      var view = comps.AppView({ title: app.title, subtitle: "" });
      builder.newBuilds(view, root);
      builder.buildBlueprint();
      var body = document.getElementById('app-body');
      if (body) body.innerHTML = app.html;
      return;
    }

    builder.newBuilds([{ item:'div', attributes:{ class:'alert alert-warning' }, textContent:'Route apps inconnue' }], root);
    builder.buildBlueprint();
  };
})();
