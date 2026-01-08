// Blueprint Carpenter du shell (navbar + offcanvas + layout principal)
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
            children: [{ item: "span", attributes: { class: "navbar-toggler-icon" } }]
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
            children: [{ item: "span", attributes: { class: "navbar-toggler-icon" } }]
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
        children: [{ item: "ul", attributes: { class: "navbar-nav", id: "side-links" } }]
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
            children: [{ item: "ul", attributes: { class: "nav flex-column p-3", id: "side-links-lg" } }]
          },
          { item: "section", attributes: { class: "col-12 col-lg-10 p-3", id: "app-root" } }
        ]
      }
    ]
  }
];
