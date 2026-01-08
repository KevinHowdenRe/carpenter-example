
(function(){
  window.COMPONENTS = window.COMPONENTS || {};

  window.COMPONENTS.AppCard = function(props){
    return {
      item: "div",
      attributes: { class: "col-12 col-md-6 col-lg-4 mb-3" },
      children: [{
        item: "div", attributes: { class: "card h-100" }, children: [{
          item: "div", attributes: { class: "card-body d-flex flex-column" }, children: [
            { item: "h5", attributes: { class: "card-title" }, textContent: props.title },
            { item: "p", attributes: { class: "card-text flex-grow-1" }, textContent: props.desc },
            { item: "a", attributes: { class: "btn btn-primary mt-auto", href: "#/apps/app/" + props.id }, textContent: "Ouvrir" }
          ]
        }]
      }]
    };
  };

  window.COMPONENTS.AppView = function(props){
    return [
      {
        item: "section",
        children: [
          {
            item: "header",
            attributes: { class: "mb-3" },
            children: [
              { item: "h1", attributes: { class: "h3" }, textContent: props.title },
              { item: "p", attributes: { class: "text-body-secondary" }, textContent: props.subtitle || "" }
            ]
          },
          { item: "div", attributes: { id: "app-body" } }
        ]
      }
    ];
  };
})();

