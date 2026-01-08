(function(){
  window.App.Views = window.App.Views || {};
  window.App.Views.home = function(builder, root){
    builder.newBuilds([{
      item:'div', attributes:{ class:'p-3' }, children:[
        { item:'h1', attributes:{ class:'h3' }, textContent:'Bienvenue' },
        { item:'p', textContent:'Choisis Blog ou Apps dans la navigation (barre de gauche).' }
      ]
    }], root);
    builder.buildBlueprint();
  };
})();
``
