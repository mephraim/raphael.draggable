// Overrides a built in Raphael event handlers for elements so that event handlers can
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

// Overrides a built in Raphael event handler for sets so that event handlers can
// be triggered during testing
function overrideEventHandlerForSet(paper, handlerName) {
  var handlerCollectionName = handlerName + "handlers";
  var oldFunc = paper.set;
  paper.set = function() {
    var set = oldFunc.apply(paper, arguments);
    set[handlerName] = function(arg) {
      if (typeof arg == 'function') {
        this[handlerCollectionName] = this[handlerCollectionName] || [];
        this[handlerCollectionName].push(arg);
      } else {
        for(var i = 0; i < this[handlerCollectionName].length; i++) {
          this[handlerCollectionName][i].apply(this, arg);
        }
      }
    };
  
    return set;
  }
}