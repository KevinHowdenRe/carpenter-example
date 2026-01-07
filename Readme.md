
# 📚 Projet SPA (vanilla + Carpenter) — Guide succinct

Ce projet est une **Single‑Page App** 100 % **client‑side** qui fonctionne en `file://` (double‑clic), sans serveur, sans `import/export`, sans `fetch`.  
Le rendu s’appuie sur **Carpenter** et des **blueprints** (objets JSON) : rien n’est écrit en dur dans le HTML.

---

## 📄 `static/index.html`

### ✅ Rôle du fichier
- Point d’entrée minimal : charge **styles**, **Carpenter**, **Bootstrap JS**, puis **configs** et **runtime**.
- `<body>` est **vide** : le **SHELL** (navbar, sidebar, layout) est injecté via blueprints.

### ✅ Sections principales
- `<link>` CSS (Bootstrap + `css/custom.css`)
- `<script>` Carpenter (CDN), Bootstrap bundle
- `<script>` `js/configs.classic.js` (expose blueprints & données)
- `<script>` `js/app.runtime.classic.js` (construit shell, menus, router)

### ✅ Templates à modifier
- **Changer URLs CDN** (Bootstrap, Carpenter)
- **Ordre** : CSS → Carpenter → Bootstrap JS → configs → runtime

---

## 📄 `static/js/configs.classic.js`

### ✅ Rôle du fichier
Déclare toutes les **configurations globales** :
- `SITE` (branding)
- `ROLE` (rôle courant)
- `MENUS` (TopBar + Sidebar)
- `SHELL` (blueprint du layout)
- `COMPONENTS` (blueprints réutilisables)
- `DATA` (contenu des pages)

### ✅ Sections principales
- **SITE** : titre, identité
- **ROLE** : rôle courant (`guest`, `user`, `admin`, …)
- **MENUS** :
  - `sidebar` = navigation (Home/Blog/Apps)
  - `topnav` = liens compte
  - `actions` = login/logout
- **SHELL** : blueprints de **TopBar**, **offcanvas sidebar**, **layout** avec `#app-root`
- **COMPONENTS** : fonctions → blueprints (`GridRow`, `BlogCard`, `AppView`, …)
- **DATA** : objets métier (articles, apps…)

### ✅ Templates à modifier
- **Changer le titre** :
```js
window.SITE = { title: "Mon Nouveau Site" };
