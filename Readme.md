# 📚 Projet SPA (vanilla + Carpenter) — Guide d’architecture (mise à jour)

Ce projet est une **Single-Page App** 100% **client-side** qui fonctionne en `file://` (double‑clic), sans serveur, sans `import/export`, sans `fetch`.
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

> **Important** : respecte cet ordre pour que tout soit défini avant le runtime. Pendant les tests, ajoute `?v=timestamp` pour éviter le cache.

```html
<!-- CONFIG -->
<script src="js/config/site.js?v=20260108"></script>
<script src="js/config/role.js?v=20260108"></script>
<script src="js/config/menus.js?v=20260108"></script>
<script src="js/config/shell.js?v=20260108"></script>

<!-- CORE -->
<script src="js/core/helpers.js?v=20260108"></script>

<!-- COMPONENTS -->
<script src="js/components/common.js?v=20260108"></script>
<script src="js/components/blog.components.js?v=20260108"></script>
<script src="js/components/apps.components.js?v=20260108"></script>

<!-- DATA (métier) -->
<script src="js/data/blog.data.js?v=20260108"></script>
<script src="js/data/apps.data.js?v=20260108"></script>

<!-- FEATURES -->
<script src="js/features/menus.js?v=20260108"></script>

<!-- VIEWS -->
<script src="js/views/home.view.js?v=20260108"></script>
<script src="js/views/account.view.js?v=20260108"></script>
<script src="js/views/login.view.js?v=20260108"></script>
<script src="js/views/blog.view.js?v=20260108"></script>
<script src="js/views/apps.view.js?v=20260108"></script>

<!-- ROUTER + RUNTIME -->
<script src="js/router.js?v=20260108"></script>
<script src="js/runtime.js?v=20260108"></script>
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

## 📰 Blog — Layout "Clean Blog"

- **Listing `/blog/posts`** : bande **Hero** (cover + overlay) + **previews verticales** (titre, sous‑titre, meta) sans card.
- **Page article `/blog/post/:slug`** : header + corps centré.

### Configuration du Hero
Dans `js/config/site.js` :
```js
window.SITE = {
  title: "Kitchen Krafts",
  blogTitle: "Learning by cooking",
  blogSubtitle: "?",
  blogImage: "static/assets/blog/cover.jpg" // ou "assets/blog/cover.jpg" selon ton arbo
};
```
> Le chemin d’image est **relatif à `index.html`** (pas au hash).

### Bonnes pratiques d’injection (2 phases)
- **Phase A** : injecter **Hero** puis **Container** et **flusher chaque bloc** (`buildBlueprint()` après chaque `newBuilds`).
- **Phase B** : injecter les **previews dans la colonne** (jamais dans `root`) et flusher.

Extrait :
```js
// Phase A
builder.newBuilds([hero], root);     // hero
builder.buildBlueprint();             // flush HERO
builder.newBuilds([container], root); // container
builder.buildBlueprint();             // flush CONTAINER

// Phase B
const column = document.getElementById('blog-list-column')
             || root.querySelector('.col-12.col-lg-10.col-xl-8');
if (!column) return;                  // ne pas injecter dans root
builder.newBuilds(previews, column);
builder.buildBlueprint();             // flush PREVIEWS
```

---

## ⚠️ Avertissement — Carpenter `newBuilds` / `buildBlueprint`

**Symptôme** : le *hero* disparaît après le rendu, ou la liste des articles remplace le contenu précédent.

**Cause** : dans Carpenter, chaque appel à `newBuilds(...)` alimente une **file interne**. Si plusieurs `newBuilds` sont enchaînés **sans** `buildBlueprint()` intermédiaire, **seule la dernière file est rendue**, écrasant ainsi le rendu déjà injecté (ex. le *hero*).

**À éviter** :
- `builder.newBuilds(previews, root)` après le *hero* → **écrase** le *hero*.
- Un **second** `killChildren(root)` après l’injection du *hero/container*.

**Checklist** :
- `components` chargés **avant** `views`, puis `router`, puis `runtime`.
- Chemins d’images **relatifs à `index.html`**.
- Pendant les tests, ajouter `?v=timestamp` aux `<script>` pour éviter le **cache**.

---

## 🛠️ Déploiement

- **Aucune compilation** requise.
- Hébergement statique (GitHub Pages, Netlify, S3, etc.).
- Ouvre simplement `/index.html` dans le navigateur.

---

## 👤 Auteur

Kevin Vu  
Architecture modulaire inspirée par la logique Carpenter SPA.
