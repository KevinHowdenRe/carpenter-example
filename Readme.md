Projet SPA (vanilla + Carpenter) — Guide succinct
Ce projet est une Single‑Page App 100 % client‑side qui fonctionne en file:// (double‑clic), sans serveur, sans import/export, sans fetch.
Le rendu s’appuie sur Carpenter et des blueprints (objets JSON) : rien n’est écrit en dur dans le HTML.

static/index.html
Rôle du fichier

Point d’entrée minimal : charge les styles, Carpenter, Bootstrap JS, puis les configs et le runtime.
Le <body> est vide : le SHELL (navbar, sidebar, layout) est injecté via blueprints.

Sections principales

Link CSS (Bootstrap + css/custom.css)
Script Carpenter (CDN), Bootstrap bundle
Script js/configs.classic.js (expose les blueprints & données)
Script js/app.runtime.classic.js (construit le shell, menus, router)

Templates à modifier (personnalisation rapide)

Balises : remplacer les URLs si tu utilises un autre CDN/style.
Ordre : garde l’ordre CSS → Carpenter → Bootstrap JS → configs → runtime.


static/js/configs.classic.js
Rôle du fichier

Déclare toutes les configurations globales :

SITE (branding), ROLE (rôle courant), MENUS (TopBar + Sidebar),
SHELL (blueprint du layout), COMPONENTS (blueprints réutilisables),
DATA (contenu des pages).



Sections principales

SITE : titre, identité.
ROLE : rôle courant (guest, user, admin, …).
MENUS :

TopBar = topnav (liens compte) + actions (login/logout),
Sidebar = sidebar (navigation Home/Blog/Apps).


SHELL : blueprints de TopBar, offcanvas sidebar mobile, layout avec #app-root.
COMPONENTS : fonctions qui renvoient des blueprints (GridRow, BlogCard, AppView, …).
DATA : objets métier (articles, apps, etc.), injectés tels quels.

Templates à modifier / ajouter

Changer le titre de l’appli :

JavaScript
window.SITE = { title: "Mon Nouveau Site" };

Séparer et configurer les menus (audience par rôle) :

JavaScript
```
window.MENUS = {  
	sidebar: [ { label:"Home", href:"#/home", audience:["guest","user","admin"] }, …],  
	topnav:  [ { label:"Mon compte", href:"#/account", audience:["user","admin"] } ],  
	actions: [ { label:"Se connecter", href:"#/login", audience:["guest"] },             
			   { label:"Se déconnecter", href:"#/logout", audience:["user","admin"] } ]};
```
Ajouter une nouvelle section (barre de gauche) :

JavaScript
```
// 1) Lien dans la Sidebar
window.MENUS.sidebar.push({ label:"Store", href:"#/store/catalog", audience:["guest","user","admin"] });
// 2) Données
window.DATA.store = { catalog: [ { id:"book-1", title:"Guide", desc:"...", html:"<p>…</p>" } ] };
// 3) Composants (optionnels), sinon réutilise AppCard/AppView
window.COMPONENTS.StoreCard = ({title,desc,id}) => ({ item:"div", ... });
window.COMPONENTS.StoreView = ({title}) => ([{ item:"section", ... }]);
```
Modifier le layout (SHELL) : tu peux changer la structure (ajouter un footer, un second aside, etc.) en éditant window.SHELL.


static/js/app.runtime.classic.js
Rôle du fichier

Construit le SHELL via Carpenter (au DOMContentLoaded).
Monte les menus (TopBar & Sidebar), filtrés par ROLE.
Démarre le hash‑router (Home, Blog, Apps, Account, Login, Logout).

Sections principales

Helpers : killChildren, filterByAudience, linkItem, actionItem.
Menus : rebuildMenus(builder) (reconstruit TopBar/Sidebar quand ROLE change).
Router :

renderHome, renderBlog(posts|post/<slug>), renderApps(catalog|app/<id>),
renderAccount, renderLogin (simulation login), case logout (simulation logout).


Bootstrap global :

builder.newBuilds(SHELL, document.body) + builder.buildBlueprint()
branding (titre), rebuildMenus(builder)
hashchange + renderFromHash(builder)



Templates à modifier / ajouter

Ajouter une nouvelle section (router) :

JavaScript
```
function renderStore(builder, root, sub, param) { /* map DATA.store → COMPONENTS.StoreCard/StoreView */ }
// Routing :
if (section === 'store') return renderStore(builder, root, sub, param);Afficher plus de lignes
```
Changer le contenu d’une page : adapte les fonctions render* (elles montent des blueprints et injectent un HTML depuis DATA).
Gérer l’audience / rôles :

Filtrage menus : via MENUS.*[].audience et window.ROLE.
Protection route : vérifie ROLE en début de render* (affiche une alerte si invité).
Login/Logout (simulation) : bascule window.ROLE et appelle rebuildMenus(builder) :

JavaScript
```
window.ROLE = 'user'; rebuildMenus(builder); location.hash = '#/account';
// …
window.ROLE = 'guest'; rebuildMenus(builder); location.hash = '#/home';
```
Persistance (optionnel) :

JavaScript
```
window.ROLE = localStorage.getItem('role') || window.ROLE;
// après login/logout
localStorage.setItem('role', window.ROLE);
```




static/css/custom.css
Rôle du fichier

Styles complémentaires (accent des liens actifs, cartes, etc.).

Sections principales

Liens actifs : .nav-link.active (TopBar & Sidebar)
Cartes : .card-img-top (si tu utilises <img>)

Templates à modifier

CSS
```
/* Accent actif */
#top-links .nav-link.active,
#side-links .nav-link.active,
#side-links-lg .nav-link.active {  
	font-weight: 600;  
	color: #0d6efd;}
/* Cartes (ex. hauteur image) */
.card-img-top { object-fit: cover; height: 160px; }
```
Recette express — créer une nouvelle section (gauche)

Lien : MENUS.sidebar.push({ label:"Store", href:"#/store/catalog", audience:["guest","user","admin"] })
Contenu : DATA.store = { catalog:[…] }
Composants : COMPONENTS.StoreCard / StoreView (optionnel)
Router : renderStore(...) + branche if (section === 'store')
Test : #/store/catalog et #/store/item/<id>


Recette express — modifier le contenu d’une page

Liste (Blog/Apps/…) : édite DATA.blog.posts / DATA.apps.catalog → les cartes se mettent à jour.
Détail : l’HTML est injecté dans #article-body / #app-body (ou #store-body).
Home : modifie renderHome(builder, root) (blueprints statiques).


Recette express — gérer l’audience / rôles

Définir un rôle : window.ROLE = "guest" | "user" | "admin" | "editor" | …
Menus : mets audience: ["guest","user","admin"] sur chaque entrée.
Changer de rôle (simulation) :

JavaScript
```
window.ROLE = 'user'; rebuildMenus(builder); location.hash = '#/account';
// ou
window.ROLE = 'guest'; rebuildMenus(builder); location.hash = '#/home';
```


