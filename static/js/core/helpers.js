(function () {
  window.App = window.App || {};

  // Helpers DOM
  function killChildren(target) {
    if (!target) return;
    while (target.firstChild) target.removeChild(target.lastChild);
  }

  function filterByAudience(list, role) {
    return (list || []).filter(function (i) {
      return !i.audience || i.audience.indexOf(role) >= 0;
    });
  }

  function linkItem(l) {
    return {
      item: 'li',
      attributes: { class: 'nav-item' },
      children: [{ item: 'a', attributes: { class: 'nav-link', href: l.href }, textContent: l.label }]
    };
  }

  function actionItem(a) {
    return { item: 'a', attributes: { class: 'btn btn-outline-light ms-2', href: a.href }, textContent: a.label };
  }

  function setActive() {
    var hash = window.location.hash || '#/home';
    var all = document.querySelectorAll('#top-links a, #side-links a, #side-links-lg a');
    for (var i = 0; i < all.length; i++) {
      all[i].classList.toggle('active', all[i].getAttribute('href') === hash);
    }
  }

  window.App.Core = { killChildren, filterByAudience, linkItem, actionItem, setActive };
})();
