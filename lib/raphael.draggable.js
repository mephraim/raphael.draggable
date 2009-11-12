// raphael.draggable plugin
// Copyright (c) 2009 Matt Ephraim
(function() {  
  /* Raphael paper extensions */
  Raphael.fn.draggable = {};
  Raphael.fn.draggable.enable = function() {
    var paper = this;
    
    var currentDraggable;
    paper.draggable.enabled = true;
    
    paper.draggable.current = function(element) {
      if (element) {
        currentDraggable = element;
        return paper;
      }
      else {
        return currentDraggable;
      }
    };
    
    paper.draggable.clearCurrent = function() {
      currentDraggable = null;  
      return paper;  
    } 
      
    overrideElements(paper);
    overrideSet(paper);
    return paper;
  };
  
  var BaseFunctions = {
    enable: function() {
      this.enabled = true;
      return this.element;
    },

    disable: function() {
      this.enabled = false;
      return this.element;
    }
  };
  
  /* Raphael element extensions */
  function overrideElements(paper) {
    var elementTypes = ['circle', 'rect', 'ellipse', 'image', 'text', 'path'];
    for(var i = 0; i < elementTypes.length; i++) {
      overrideElementFunc(paper, elementTypes[i]);
    }
  }
  
  function overrideElementFunc(paper, elementType) {    
    paper[elementType] = function(oldFunc) {
      return function() {
        var element = oldFunc.apply(paper, arguments);
        element.draggable = new DraggableExtension(element);
        return element;
      };
    }(paper[elementType]);
  }
  
  var lastDragX,
      lastDragY;
  
  /* Extension for objects that adds draggable functionality */
  var DraggableExtension = function (element) {
    var paper = element.paper;
    
    this.element = element;
    this.enabled = false;
    
    element.mousedown(function(event) {
      if (paper.draggable.current() || !element.draggable.enabled)
        return;
          
      paper.draggable.current(element.draggable.parent || element);
      lastDragX = event.clientX;
      lastDragY = event.clientY;
      
      startDragger();
    });
    
    document.onmouseup = function() {
      document.onmousemove = null;
      paper.draggable.clearCurrent();
    };
    
    function startDragger() {
      document.onmousemove = function(event) {
        if (paper.draggable.current()) {
          var transX = event.clientX - lastDragX;
          var transY = event.clientY - lastDragY;

          paper.draggable.current().translate(transX, transY);
          lastDragX = event.clientX;
          lastDragY = event.clientY;
        }
      };
    }
  };
  
  DraggableExtension.prototype = BaseFunctions;
  
  /* Raphael set extensions */
  function overrideSet(paper) {
    paper.set = function(oldFunc) { 
      return function() {
        var set = oldFunc.apply(paper, arguments);
        set.paper = paper;
        set.draggable = new DraggableSetExtension(set);
      
        overrideSetFunctions(set);
        return set;
      };
    }(paper.set);
  }
  
  function overrideSetFunctions(set) {
    set.push = function(oldFunc) { 
      return function(element) {
        oldFunc.apply(set, arguments);
        if (element.draggable) {
          element.draggable.parent = set;
        
          if (set.draggable.enabled) {
            element.draggable.enable();
          }
        }
      };
    }(set.push);
  }
  
  DraggableSetExtension = function(set) {
    this.element = set;
  };
  
  DraggableSetExtension.prototype = BaseFunctions;
})();