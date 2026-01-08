# 📚 Projet SPA (vanilla + Carpenter) — Guide d’architecture

Ce projet est une **Single-Page App** 100% **client-side** qui fonctionne en `file://` (double-clic), sans serveur, sans `import/export`, sans `fetch`.
Le rendu s’appuie sur **Carpenter** et des **blueprints** (objets JSON) : rien n’est écrit en dur dans le HTML.
Le **routing** est assuré par le **hash** (`#/home`, `#/blog/posts`, `#/apps/catalog`, etc.).

---

## 📁 Arborescence

```
/
├─ index.html
└─ js/
   ├─ core/
   │  └─ helpers.js
   ├─ config/
   │  ├─ site.js
   │  ├─ role.js
   │  ├─ menus.js
   │  └─ shell.js
   ├─ components/
   │  ├─ common.js
   │  ├─ blog.components.js
   │  └─ apps.components.js
   ├─ data/
   │  ├─ blog.data.js
   │  └─ apps.data.js
   ├─ features/
   │  └─ menus.js
   ├─ views/
   │  ├─ home.view.js
   │  ├─ account.view.js
   │  ├─ login.view.js
   │  ├─ blog.view.js
   │  └─ apps.view.js
   ├─ router.js
   └─ runtime.js
```

---

## 🚦 Ordre de chargement dans `index.html`

> **Important** : respecte cet ordre pour que tout soit défini avant le runtime.

```html
<!-- libs CSS/JS (Bootstrap/Carpenter) au-dessus -->

<!-- CONFIG -->
<script src="./static/js/config/site.js"></script>
<script src="./static/js/config/role.js"></script>
<script src="./static/js/config/menus.js"></script>
<script src="./static/js/config/shell.js"></script>

<!-- CORE -->
<script src="./static/js/core/helpers.js"></script>

<!-- COMPONENTS -->
<script src="./static/js/components/common.js"></script>
<script src="./static/js/components/blog.components.js"></script>
<script src="./static/js/components/apps.components.js"></script>

<!-- DATA (métier) -->
<script src="./static/js/data/blog.data.js"></script>
<script src="./static/js/data/apps.data.js"></script>

<!-- FEATURES -->
<script src="./static/js/features/menus.js"></script>

<!-- VIEWS -->
<script src="./static/js/views/home.view.js"></script>
<script src="./static/js/views/account.view.js"></script>
<script src="./static/js/views/login.view.js"></script>
<script src="./static/js/views/blog.view.js"></script>
<script src="./static/js/views/apps.view.js"></script>

<!-- ROUTER + RUNTIME -->
<script src="./static/js/router.js"></script>
<script src="./static/js/runtime.js"></script>
```

---

## 🧩 Structure des modules

- **config/** : configuration du site, rôle, menus, shell (blueprint Carpenter)
- **core/** : helpers DOM et utilitaires globaux
- **components/** : composants réutilisables (common) et spécifiques (blog, apps)
- **data/** : données métier (blog, apps)
- **features/** : logique métier (menus dynamiques, `rebuildMenus`)
- **views/** : renderviews pour chaque section (home, account, login, blog, apps)
- **router.js** : dispatch des routes vers les views
- **runtime.js** : bootstrap de l’app (construction shell, branding, menus, router)

---

## 🛠️ Fonctionnement

- **Tout est injecté dynamiquement** dans le DOM via Carpenter et les blueprints.
- **Menus** : affichés selon le rôle (`guest`, `user`, `admin`) grâce à `rebuildMenus`.
- **Routing** : changement de hash (`#/...`) → dispatch vers la bonne view.
- **Login/Logout** : simulation du changement de rôle, menus mis à jour dynamiquement.
- **Aucune dépendance serveur** : tout fonctionne en local, même en ouvrant `index.html` directement.

---

## 📝 Ajouter une nouvelle vue ou fonctionnalité

1. Crée un fichier dans `js/views/` ou `js/features/` selon le besoin.
2. Ajoute la balise `<script>` correspondante dans `index.html` (avant `router.js` et `runtime.js`).
3. Ajoute la route dans `router.js` si nécessaire.

---

## 📦 Déploiement

- **Aucune compilation** requise.
- Hébergement statique : GitHub Pages, Netlify, S3, etc.
- Ouvre simplement `/index.html` dans le navigateur.

---

## 👤 Auteur

Kevin Vu  

