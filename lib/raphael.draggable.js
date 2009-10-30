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
  
  /* Raphael element extensions */
  function overrideElements(paper) {
    var elementTypes = ['circle', 'rect', 'ellipse', 'image', 'text', 'path'];
  	for(var i = 0; i < elementTypes.length; i++) {
  		overrideElementFunc(paper, elementTypes[i]);
  	}
  }
  
  function overrideElementFunc(paper, elementType) {
		var oldFunc = paper[elementType];
		paper[elementType] = function() {
			var element = oldFunc.apply(paper, arguments);
			element.draggable = new DraggableExtension(element);
			return element;
		};
	}
	
	/* Raphael set extensions */
	function overrideSet(paper) {
	  var oldFunc = paper.set;
	  paper.set = function() {
	    var set = oldFunc.apply(paper, arguments);
	    set.paper = paper;
	    set.draggable = new DraggableExtension(set);
	    
	    overrideSetFunctions(set);
	    return set;
	  };
	}
	
	function overrideSetFunctions(set) {
	  var oldPushFunc = set.push;
	  set.push = function(element) {
	    oldPushFunc.apply(set, arguments);
	    if (element.draggable) {
	      element.draggable.parent = set;
	      
	      if (set.draggable.enabled) {
	        element.draggable.enable();
	      }
	    }
	  }
	}
	
	/* Extension for objects that adds draggable functionality */
	var DraggableExtension = function (element) {
	  var paper = element.paper,
	      lastX,
	      lastY;
	  
	  this.element = element;
	  this.enabled = false;
	  
    element.mousedown(function(event) {
      if (paper.draggable.current() || !element.draggable.enabled)
        return;
      
      element.draggable.isDragging = true;
    
      paper.draggable.current(element);
      lastX = event.clientX;
  		lastY = event.clientY;
    });
    
    element.mousemove(function(event) {
      if (element.draggable.isDragging) {
        var toMove = element.draggable.parent || element;
        
        var transX = event.clientX - lastX;
        var transY = event.clientY - lastY;
        
        toMove.translate(transX, transY);
        lastX = event.clientX;
        lastY = event.clientY;
      }
    });
	
	  element.mouseup(stopDragging);
	  element.mouseout(stopDragging);
	  
	  function stopDragging() {
	    element.draggable.isDragging = false;
	    paper.draggable.clearCurrent();
	  }
	};
	
  DraggableExtension.prototype = {
    enable: function() {
      this.enabled = true;
      return this.element;
    },
    
    disable: function() {
      this.enabled = false;
      return this.element;
    }
  }
})();