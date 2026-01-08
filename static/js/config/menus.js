// Menus : TopBar (centre/gauche + actions à droite) et Sidebar (navigation)
window.MENUS = {
  sidebar: [
    { label: "Home", href: "#/home", audience: ["guest","user","admin"] },
    { label: "Blog", href: "#/blog/posts", audience: ["guest","user","admin"] },
    { label: "Apps", href: "#/apps/catalog", audience: ["guest","user","admin"] }
  ],
  topnav: [
    { label: "Mon compte", href: "#/account", audience: ["user","admin"] }
  ],
  actions: [
    { label: "Se connecter", href: "#/login", audience: ["guest"] },
    { label: "Se déconnecter", href: "#/logout", audience: ["user","admin"] }
  ]
};
