# 📚 Projet SPA (vanilla + Carpenter) — Guide complet (brut Markdown)

Ce projet est une **Single‑Page App** 100 % **client‑side** qui fonctionne en `file://` (double‑clic), sans serveur, sans `import/export`, sans `fetch`.  
Le rendu s’appuie sur **Carpenter** et des **blueprints** (objets JSON) : rien n’est écrit en dur dans le HTML.  
Le **routing** est assuré par le **hash** (`#/home`, `#/blog/posts`, `#/apps/catalog`, …).

---

## 📁 Arborescence

```
static/
│  index.html                 ← body vide (tout est injecté via blueprints)
│
├─ css/
│   └─ custom.css
│
└─ js/
    ├─ configs.classic.js     ← blueprints (SHELL & composants), menus, données, rôle
    └─ app.runtime.classic.js ← runtime vanilla : build du shell + menus + hash router
```

---

## 📄 `static/index.html`

### Rôle du fichier
- Point d’entrée minimal : charge **styles**, **Carpenter**, **Bootstrap JS**, puis **configs** et **runtime**.
- `<body>` est **vide** : le **SHELL** (navbar, sidebar, layout) est injecté via **blueprints**.

### Sections principales
- `<link>` CSS (Bootstrap + `css/custom.css`)
- `<script>` Carpenter (CDN), Bootstrap bundle
- `<script>` `js/configs.classic.js` (expose blueprints & données)
- `<script>` `js/app.runtime.classic.js` (construit shell, menus, router)

### Templates à modifier
- Remplacer URLs CDN (Bootstrap, Carpenter) si besoin.
- Garder l’ordre : **CSS → Carpenter → Bootstrap JS → configs → runtime**.

---

## 📄 `static/js/configs.classic.js`

### Rôle du fichier
Déclare toutes les **configurations globales** :
- `SITE` (branding)
- `ROLE` (rôle courant)
- `MENUS` (TopBar + Sidebar)
- `SHELL` (blueprint du layout)
- `COMPONENTS` (blueprints réutilisables)
- `DATA` (contenu des pages)

### Sections principales
- **SITE** : titre, identité
- **ROLE** : rôle courant (`guest`, `user`, `admin`, …)
- **MENUS** :
  - `sidebar` = navigation (Home/Blog/Apps)
  - `topnav`  = liens compte
  - `actions` = login/logout
- **SHELL** : blueprints de **TopBar**, **offcanvas sidebar**, **layout** avec `#app-root`
- **COMPONENTS** : fonctions → blueprints (`GridRow`, `BlogCard`, `AppView`, …)
- **DATA** : objets métier (articles, apps…)

### Templates à modifier
- **Changer le titre** :
```js
window.SITE = { title: "Mon Nouveau Site" };
```

- **Configurer menus & audience** :
```js
window.MENUS = {
  sidebar: [ { label:"Home", href:"#/home", audience:["guest","user","admin"] } ],
  topnav:  [ { label:"Mon compte", href:"#/account", audience:["user","admin"] } ],
  actions: [ { label:"Se connecter", href:"#/login", audience:["guest"] },
             { label:"Se déconnecter", href:"#/logout", audience:["user","admin"] } ]
};
window.ROLE = "guest"; // rôle courant
```

- **Ajouter une section (Sidebar)** :
```js
// 1) Déclarer le lien
window.MENUS.sidebar.push({ label:"FAQ", href:"#/faq", audience:["guest","user","admin"] });

// 2) (Optionnel) Données
window.DATA = window.DATA || {};
window.DATA.faq = [
  { question: "Comment utiliser l’app ?",  answer: "Naviguez via la barre de gauche (hash routing)." },
  { question: "Comment gérer l’audience ?", answer: "Modifiez MENUS.*[].audience et window.ROLE." }
];

// 3) (Optionnel) Composant blueprint
window.COMPONENTS = window.COMPONENTS || {};
window.COMPONENTS.FAQItem = ({ question, answer }) => ({
  item: "div",
  attributes: { class: "mb-3" },
  children: [
    { item: "h5", textContent: question },
    { item: "p",  textContent: answer }
  ]
});
```

---

## 📄 `static/js/app.runtime.classic.js`

### Rôle du fichier
- Construit le **SHELL** via Carpenter (au `DOMContentLoaded`).
- Monte les menus (TopBar & Sidebar), filtrés par `ROLE`.
- Démarre le **hash‑router** (Home, Blog, Apps, Account, Login, Logout). 

### Sections principales
- **Helpers** : `killChildren`, `filterByAudience`, `linkItem`, `actionItem`.
- **Menus** : `rebuildMenus(builder)` reconstruit TopBar/Sidebar selon `ROLE`.
- **Router** :
  - `renderHome`, `renderBlog(posts|post/<slug>)`, `renderApps(catalog|app/<id>)`.
  - `renderAccount`, `renderLogin` (simulation login), `logout`.
- **Bootstrap global** :
  - `builder.newBuilds(SHELL, document.body)` + `builder.buildBlueprint()`.
  - branding (titre), `rebuildMenus(builder)`.
  - `hashchange` + `renderFromHash(builder)`.

### Rendu : filtrage par audience
```js
function filterByAudience(list, role) {
  return (list || []).filter(i => !i.audience || i.audience.includes(role));
}

function rebuildMenus(builder) {
  const role     = window.ROLE || 'guest';
  const topLinks = document.getElementById('top-links');
  const topActs  = document.getElementById('top-actions');
  const sideMob  = document.getElementById('side-links');
  const sideLg   = document.getElementById('side-links-lg');

  const topnav  = filterByAudience(window.MENUS.topnav,  role);
  const actions = filterByAudience(window.MENUS.actions, role);
  const sidebar = filterByAudience(window.MENUS.sidebar, role);

  killChildren(topLinks); killChildren(topActs);
  killChildren(sideMob);  killChildren(sideLg);

  if (topLinks) { builder.newBuilds(topnav.map(linkItem),   topLinks); builder.buildBlueprint(); }
  if (topActs)  { builder.newBuilds(actions.map(actionItem), topActs); builder.buildBlueprint(); }
  if (sideMob)  { builder.newBuilds(sidebar.map(linkItem),   sideMob); builder.buildBlueprint(); }
  if (sideLg)   { builder.newBuilds(sidebar.map(linkItem),   sideLg);  builder.buildBlueprint(); }
}
```

### Changement de rôle (simulation)
```js
// Login simulé
window.ROLE = 'user';
rebuildMenus(builder);
location.hash = '#/account';

// Logout simulé
window.ROLE = 'guest';
rebuildMenus(builder);
location.hash = '#/home';
```

### Persistance du rôle (optionnelle)
```js
// À l'initialisation
window.ROLE = localStorage.getItem('role') || window.ROLE || 'guest';

// À chaque changement de rôle
localStorage.setItem('role', window.ROLE);
```

### Protection des routes par rôle (guard)
```js
function renderAccount(builder, root) {
  const role = window.ROLE || 'guest';
  if (role === 'guest') {
    builder.newBuilds([{ item:'div', attributes:{ class:'alert alert-info' }, textContent:'Veuillez vous connecter.' }], root);
    builder.buildBlueprint();
    return;
  }
  // ... contenu authentifié
}
```

---

## 📄 `static/css/custom.css`

### Rôle
Styles complémentaires (liens actifs, cartes, etc.).

### Templates à modifier
```css
/* Liens actifs */
#top-links .nav-link.active,
#side-links .nav-link.active,
#side-links-lg .nav-link.active {
  font-weight: 600;
  color: #0d6efd;
}

/* Cartes */
.card-img-top { object-fit: cover; height: 160px; }
```

---

## ➕ Exemple complet : **ajout d’une section Sidebar “FAQ”**

### 1) Déclarer le lien (Sidebar)
```js
// Fichier : static/js/configs.classic.js
window.MENUS.sidebar.push({ label:"FAQ", href:"#/faq", audience:["guest","user","admin"] });
```

### 2) (Optionnel) Ajouter des données
```js
// Fichier : static/js/configs.classic.js
window.DATA = window.DATA || {};
window.DATA.faq = [
  { question: "Comment utiliser l’app ?",  answer: "Naviguez via la barre de gauche (hash routing)." },
  { question: "Comment gérer l’audience ?", answer: "Modifiez MENUS.*[].audience et window.ROLE." }
];
```

### 3) (Optionnel) Définir un composant blueprint
```js
// Fichier : static/js/configs.classic.js
window.COMPONENTS = window.COMPONENTS || {};
window.COMPONENTS.FAQItem = ({ question, answer }) => ({
  item: "div",
  attributes: { class: "mb-3" },
  children: [
    { item: "h5", textContent: question },
    { item: "p",  textContent: answer }
  ]
});
```

### 4) Implémenter le rendu dans le router
```js
// Fichier : static/js/app.runtime.classic.js
function renderFAQ(builder, root) {
  const items = (window.DATA.faq || []).map(q => window.COMPONENTS.FAQItem(q));
  builder.newBuilds([{ item: 'h1', attributes: { class: 'h3 mb-3' }, textContent: 'FAQ' }], root);
  builder.newBuilds(items, root);
  builder.buildBlueprint();
}
```

### 5) Brancher la route
```js
// Fichier : static/js/app.runtime.classic.js (dans renderFromHash)
if (section === 'faq') return renderFAQ(builder, root);
```

### 6) Tester
- Aller sur `#/faq` pour afficher la section.

---

## ✅ Bonnes pratiques
- **Déclarer l’audience** pour chaque entrée de menu (`audience: [...]`).
- **Reconstruire les menus** (`rebuildMenus(builder)`) après un changement de rôle.
- **Protéger les routes** sensibles avec un guard (`ROLE` en début de rendu).
- **Optionnel : persister** le rôle dans `localStorage`.

---
