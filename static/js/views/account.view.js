(function(){
  window.App.Views = window.App.Views || {};
  window.App.Views.account = function(builder, root){
    builder.newBuilds([{
      item:'div', attributes:{ class:'p-3' }, children:[
        { item:'h1', attributes:{ class:'h4' }, textContent:'Mon compte' },
        { item:'p', textContent:'Profil, préférences, sécurité… (zone à personnaliser).' }
      ]
    }], root);
    builder.buildBlueprint();
  };
})();
``
