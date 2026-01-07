
// ============================
// CONFIGS (vanilla, globales)
// ============================

// Branding
window.SITE = { title: "Mon Site Carpenter" };

// Audience initiale (simulée)
window.ROLE = "guest"; // guest / user / admin 

// Menus : TopBar (compte/login/logout) ≠ Sidebar (navigation)
window.MENUS = {
  // Liens de navigation (barre de gauche)
  sidebar: [
    { label: "Home",  href: "#/home",         audience: ["guest","user","admin"] },
    { label: "Blog",  href: "#/blog/posts",   audience: ["guest","user","admin"] },
    { label: "Apps",  href: "#/apps/catalog", audience: ["guest","user","admin"] }
  ],

  // Liens de la TopBar (au centre/gauche)
  topnav: [
    { label: "Mon compte", href: "#/account", audience: ["user","admin"] }
  ],

  // Actions (à droite dans la TopBar)
  actions: [
    { label: "Se connecter",   href: "#/login",  audience: ["guest"] },
    { label: "Se déconnecter", href: "#/logout", audience: ["user","admin"] }
  ]
};

// ============================
// BLUEPRINT : SHELL (navbar, offcanvas, layout)
// ============================
window.SHELL = [
  {
    item: "nav",
    attributes: { class: "navbar navbar-expand-lg navbar-dark bg-dark" },
    children: [
      {
        item: "div",
        attributes: { class: "container-fluid" },
        children: [
          {
            item: "button",
            attributes: {
              class: "btn btn-outline-light me-2 d-lg-none",
              type: "button",
              "data-bs-toggle": "offcanvas",
              "data-bs-target": "#sidebar",
              "aria-controls": "sidebar"
            },
            children: [ { item: "span", attributes: { class: "navbar-toggler-icon" } } ]
          },
          { item: "a", attributes: { class: "navbar-brand", href: "#/home", id: "app-title" }, textContent: "" },
          {
            item: "button",
            attributes: {
              class: "navbar-toggler",
              type: "button",
              "data-bs-toggle": "collapse",
              "data-bs-target": "#topnav",
              "aria-controls": "topnav",
              "aria-expanded": "false",
              "aria-label": "Toggle navigation"
            },
            children: [ { item: "span", attributes: { class: "navbar-toggler-icon" } } ]
          },
          {
            item: "div",
            attributes: { class: "collapse navbar-collapse", id: "topnav" },
            children: [
              { item: "ul", attributes: { class: "navbar-nav me-auto mb-2 mb-lg-0", id: "top-links" } },
              { item: "div", attributes: { class: "d-flex", id: "top-actions" } }
            ]
          }
        ]
      }
    ]
  },

  // Sidebar offcanvas (mobile)
  {
    item: "div",
    attributes: { class: "offcanvas offcanvas-start bg-light", tabindex: "-1", id: "sidebar" },
    children: [
      {
        item: "div",
        attributes: { class: "offcanvas-header" },
        children: [
          { item: "h5", attributes: { class: "offcanvas-title" }, textContent: "Navigation" },
          { item: "button", attributes: { type: "button", class: "btn-close", "data-bs-dismiss": "offcanvas", "aria-label": "Fermer" } }
        ]
      },
      {
        item: "div",
        attributes: { class: "offcanvas-body p-0" },
        children: [
          { item: "ul", attributes: { class: "navbar-nav", id: "side-links" } }
        ]
      }
    ]
  },

  // Layout principal
  {
    item: "main",
    attributes: { class: "container-fluid" },
    children: [
      {
        item: "div",
        attributes: { class: "row" },
        children: [
          {
            item: "aside",
            attributes: { class: "col-12 col-lg-2 d-none d-lg-block border-end p-0" },
            children: [
              { item: "ul", attributes: { class: "nav flex-column p-3", id: "side-links-lg" } }
            ]
          },
          { item: "section", attributes: { class: "col-12 col-lg-10 p-3", id: "app-root" } }
        ]
      }
    ]
  }
];

// ============================
// Composants réutilisables (blueprints Carpenter)
// ============================
window.COMPONENTS = {
  GridRow: function(props) {
    return { item: "div", attributes: { class: "row " + ((props && props.class) || "") } };
  },
  BlogCard: function(props) {
    return {
      item: "div",
      attributes: { class: "col-12 col-md-6 col-lg-4 mb-3" },
      children: [
        {
          item: "div",
          attributes: { class: "card h-100" },
          children: [
            {
              item: "div",
              attributes: { class: "card-body d-flex flex-column" },
              children: [
                { item: "h5", attributes: { class: "card-title" }, textContent: props.title },
                { item: "p",  attributes: { class: "card-text flex-grow-1" }, textContent: props.excerpt },
                { item: "a",  attributes: { class: "btn btn-primary mt-auto", href: "#/blog/post/" + props.slug }, textContent: "Lire" }
              ]
            }
          ]
        }
      ]
    };
  },
  ArticleView: function(props) {
    return [
      {
        item: "article",
        children: [
          {
            item: "header",
            attributes: { class: "mb-3" },
            children: [
              { item: "h1", attributes: { class: "display-6" }, textContent: props.title },
              { item: "p",  attributes: { class: "text-body-secondary" }, textContent: props.subtitle || "" }
            ]
          },
          { item: "div", attributes: { id: "article-body" } }
        ]
      }
    ];
  },
  AppCard: function(props) {
    return {
      item: "div",
      attributes: { class: "col-12 col-md-6 col-lg-4 mb-3" },
      children: [
        {
          item: "div",
          attributes: { class: "card h-100" },
          children: [
            {
              item: "div",
              attributes: { class: "card-body d-flex flex-column" },
              children: [
                { item: "h5", attributes: { class: "card-title" }, textContent: props.title },
                { item: "p",  attributes: { class: "card-text flex-grow-1" }, textContent: props.desc },
                { item: "a",  attributes: { class: "btn btn-primary mt-auto", href: "#/apps/app/" + props.id }, textContent: "Ouvrir" }
              ]
            }
          ]
        }
      ]
    };
  },
  AppView: function(props) {
    return [
      {
        item: "section",
        children: [
          {
            item: "header",
            attributes: { class: "mb-3" },
            children: [
              { item: "h1", attributes: { class: "h3" }, textContent: props.title },
              { item: "p",  attributes: { class: "text-body-secondary" }, textContent: props.subtitle || "" }
            ]
          },
          { item: "div", attributes: { id: "app-body" } }
        ]
      }
    ];
  }
};

// ============================
// Données (métier) sans fetch
// ============================
window.DATA = {
  blog: {
    posts: [
      { slug: "hello-world", title: "Hello World",        excerpt: "Premiers pas…",                 html: "<p>Bonjour <strong>monde</strong> !</p>" },
      { slug: "deep-dive",   title: "Carpenter Deep Dive",excerpt: "Composants & config…",         html: "<p>Exploration de l’approche <em>config-only</em>…</p>" }
    ]
  },
  apps: {
    catalog: [
      { id: "editor",    title: "Editor",    desc: "Éditeur riche en ligne", html: "<p>Module d’édition avancé (ex. WYSIWYG).</p>" },
      { id: "dashboard", title: "Dashboard", desc: "Tableau de bord analytics", html: "<p>Visualisations et KPIs.</p>" }
    ]
  }
};
