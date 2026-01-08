(function(){
  var Menus = window.App.Menus;

  window.App.Views = window.App.Views || {};
  window.App.Views.login = function(builder, root){
    builder.newBuilds([{
      item:'div', attributes:{ class:'row justify-content-center' }, children:[
        { item:'div', attributes:{ class:'col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4' }, children:[
          { item:'h1', attributes:{ class:'h4 mb-3' }, textContent:'Connexion' },
          { item:'div', attributes:{ class:'card' }, children:[
            { item:'div', attributes:{ class:'card-body' }, children:[
              { item:'form', attributes:{ id:'login-form' }, children:[
                { item:'div', attributes:{ class:'mb-3' }, children:[
                  { item:'label', attributes:{ for:'email', class:'form-label' }, textContent:'Email' },
                  { item:'input', attributes:{ type:'email', class:'form-control', id:'email', required:'' } }
                ]},
                { item:'div', attributes:{ class:'mb-3' }, children:[
                  { item:'label', attributes:{ for:'password', class:'form-label' }, textContent:'Mot de passe' },
                  { item:'input', attributes:{ type:'password', class:'form-control', id:'password', required:'' } }
                ]},
                { item:'button', attributes:{ class:'btn btn-primary w-100', type:'submit' }, textContent:'Se connecter' }
              ]}
            ]}
          ]}
        ]}
      ]
    }], root);
    builder.buildBlueprint();

    var form = document.getElementById('login-form');
    if (form) form.addEventListener('submit', function(e){
      e.preventDefault();
      // Simulation login : passer en ROLE='user', reconstruire menus et aller sur #/account
      window.ROLE = 'user';
      Menus.rebuildMenus(builder);
      location.hash = '#/account';
    });
  };
})();
``
