
// ===================================================
// RUNTIME (vanilla) : construit le SHELL via Carpenter,
// injecte la TopBar (compte/login/logout) & Sidebar (navigation),
// puis démarre le hash router. Compatible file://.
// ===================================================

(function() {

  // --- Helpers DOM ---
  function killChildren(target) {
    if (!target) return;
    while (target.firstChild) target.removeChild(target.lastChild);
  }

  function filterByAudience(list, role) {
    return (list || []).filter(function(i) { return !i.audience || i.audience.indexOf(role) >= 0; });
  }

  function linkItem(l) {
    return { item:'li', attributes:{ class:'nav-item' }, children:[
      { item:'a', attributes:{ class:'nav-link', href:l.href }, textContent:l.label }
    ]};
  }

  function actionItem(a) {
    // Bouton d’action à droite dans la TopBar
    return { item:'a', attributes:{ class:'btn btn-outline-light ms-2', href:a.href }, textContent:a.label };
  }

  // --- Montage des menus (TopBar + Sidebar) ---
  function rebuildMenus(builder) {
    var role     = window.ROLE || 'guest';

    var topLinks = document.getElementById('top-links');
    var topActs  = document.getElementById('top-actions');
    var sideMob  = document.getElementById('side-links');
    var sideLg   = document.getElementById('side-links-lg');

    var topnav  = filterByAudience(window.MENUS.topnav, role);
    var actions = filterByAudience(window.MENUS.actions, role);
    var sidebar = filterByAudience(window.MENUS.sidebar, role);

    // Nettoyage
    killChildren(topLinks);
    killChildren(topActs);
    killChildren(sideMob);
    killChildren(sideLg);

    // Reconstruction
    if (topLinks) { builder.newBuilds(topnav.map(linkItem),   topLinks); builder.buildBlueprint(); }
    if (topActs)  { builder.newBuilds(actions.map(actionItem), topActs); builder.buildBlueprint(); }
    if (sideMob)  { builder.newBuilds(sidebar.map(linkItem),   sideMob); builder.buildBlueprint(); }
    if (sideLg)   { builder.newBuilds(sidebar.map(linkItem),   sideLg);  builder.buildBlueprint(); }
  }

  // --- Router (hash) ---
  function setActive() {
    var hash = window.location.hash || '#/home';
    var all = document.querySelectorAll('#top-links a, #side-links a, #side-links-lg a');
    for (var i=0;i<all.length;i++) {
      all[i].classList.toggle('active', all[i].getAttribute('href') === hash);
    }
  }

  function renderHome(builder, root) {
    builder.newBuilds([{
      item:'div', attributes:{ class:'p-3' }, children:[
        { item:'h1', attributes:{ class:'h3' }, textContent:'Bienvenue' },
        { item:'p',  textContent:'Choisis Blog ou Apps dans la navigation (barre de gauche).' }
      ]
    }], root);
    builder.buildBlueprint();
  }

  function renderAccount(builder, root) {
    builder.newBuilds([{
      item:'div', attributes:{ class:'p-3' }, children:[
        { item:'h1', attributes:{ class:'h4' }, textContent:'Mon compte' },
        { item:'p',  textContent:'Profil, préférences, sécurité… (zone à personnaliser).' }
      ]
    }], root);
    builder.buildBlueprint();
  }

  function renderLogin(builder, root) {
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
      rebuildMenus(builder);
      location.hash = '#/account';
    });
  }

  function renderBlog(builder, root, sub, param) {
    var comps = window.COMPONENTS;
    var posts = window.DATA.blog.posts;

    if (sub === 'posts' || !sub) {
      var header = [{ item:'h1', attributes:{ class:'h3 mb-3' }, textContent:'Articles' }];
      var grid   = [ comps.GridRow({ class: '' }) ];
      var cards  = posts.map(function(p){ return comps.BlogCard({ title:p.title, excerpt:p.excerpt, slug:p.slug }); });

      builder.newBuilds(header, root);
      builder.newBuilds(grid, root);
      builder.newBuilds(cards, root);
      builder.buildBlueprint();
      return;
    }

    if (sub === 'post' && param) {
      var article = posts.find(function(p){ return p.slug === param; });
      if (!article) {
        builder.newBuilds([{ item:'div', attributes:{ class:'alert alert-danger' }, textContent:'Article introuvable' }], root);
        builder.buildBlueprint(); return;
      }
      var view = comps.ArticleView({ title: article.title, subtitle: "" });
      builder.newBuilds(view, root);
      builder.buildBlueprint();
      var body = document.getElementById('article-body');
      if (body) body.innerHTML = article.html;
      return;
    }

    builder.newBuilds([{ item:'div', attributes:{ class:'alert alert-warning' }, textContent:'Route blog inconnue' }], root);
    builder.buildBlueprint();
  }

  function renderApps(builder, root, sub, param) {
    var comps   = window.COMPONENTS;
    var catalog = window.DATA.apps.catalog;

    if (sub === 'catalog' || !sub) {
      var header = [{ item:'h1', attributes:{ class:'h3 mb-3' }, textContent:'Catalogue d’apps' }];
      var grid   = [ comps.GridRow({ class: '' }) ];
      var cards  = catalog.map(function(a){ return comps.AppCard({ title:a.title, desc:a.desc, id:a.id }); });

      builder.newBuilds(header, root);
      builder.newBuilds(grid, root);
      builder.newBuilds(cards, root);
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
  }

  function renderFromHash(builder) {
    var hash = (window.location.hash || '#/home').replace(/^#\/?/, '');
    var parts = hash.split('/');
    var section = parts[0] || 'home';
    var sub     = parts[1];
    var param   = parts[2];

    setActive();

    var root = document.getElementById('app-root');
    if (!root) return; // shell pas encore monté
    killChildren(root);

    if (section === 'account') return renderAccount(builder, root);
    if (section === 'login')   return renderLogin(builder, root);
    if (section === 'logout')  {
      // Simulation logout : ROLE='guest', reconstruire menus et aller home
      window.ROLE = 'guest';
      rebuildMenus(builder);
      location.hash = '#/home';
      return;
    }
    if (section === 'blog') return renderBlog(builder, root, sub, param);
    if (section === 'apps') return renderApps(builder, root, sub, param);
    return renderHome(builder, root);
  }

  // --- Bootstrap global (après parsing DOM) ---
  document.addEventListener('DOMContentLoaded', function() {
    // 1) Construire le SHELL via Carpenter
    var builder = new Carpenter();
    builder.newBuilds(window.SHELL, document.body);
    builder.buildBlueprint();

    // 2) Branding
    var brand = document.getElementById('app-title');
    if (brand && window.SITE && window.SITE.title) brand.textContent = window.SITE.title;

    // 3) Menus (TopBar + Sidebar)
    rebuildMenus(builder);

    // 4) Router (hash)
    window.addEventListener('hashchange', function(){ renderFromHash(builder); });
    renderFromHash(builder);
  });

})();
