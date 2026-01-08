(function(){
  window.App.Views = window.App.Views || {};
  window.App.Views.blog = function(builder, root, sub, param){
    var comps = window.COMPONENTS;
    var posts = window.DATA.blog.posts;

    if (sub === 'posts' || !sub) {

	  var cards  = posts.map(function(p){ return comps.BlogCard({ title:p.title, excerpt:p.excerpt, slug:p.slug }); });

       
	  var bp = [
		  { item:'h1', attributes:{ class:'h3 mb-5' }, textContent:'Articles' },
		  { item:'div', attributes:{ class:'row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3' }, children: cards }
		];

      builder.newBuilds(bp, root);
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
  };
})();
