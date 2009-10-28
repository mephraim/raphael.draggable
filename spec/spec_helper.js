// Overrides a built in Raphael event handler so that event handlers can
// be triggered during testing
function overrideEventHandler(handlerName) {
  var handlerCollectionName = handlerName + "handlers";
  Raphael.el[handlerName] = function(arg) {
    if (typeof arg == 'function') {
      this[handlerCollectionName] = this[handlerCollectionName] || [];
      this[handlerCollectionName].push(arg);
    }
    else {
      for(var i = 0; i < this[handlerCollectionName].length; i++) {
        this[handlerCollectionName][i].apply(this, arg);
      }
    }
  };
}