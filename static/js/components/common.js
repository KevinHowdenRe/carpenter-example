(function(){
  window.COMPONENTS = window.COMPONENTS || {};
  window.COMPONENTS.GridRow = function(props){
    return { item: "div", attributes: { class: "row " + ((props && props.class) || "") } };
  };
})();
