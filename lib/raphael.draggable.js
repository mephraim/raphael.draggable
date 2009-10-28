// Raphael draggable object plugin
// Matt Ephraim - 2009

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
		}
	}
	
	var DraggableExtension = function (element) {
	  var paper = element.paper,
	      lastX,
	      lastY,
	      isDragging;
	  
	  this.element = element;
	  this.enabled = false;
	  
    element.mousedown(function(event) {
      if (paper.draggable.current() || !element.draggable.enabled)
        return;
        
      paper.draggable.current(element);
      lastX   = event.clientX;
  		lastY   = event.clientY;
  		isDragging = true;
    });
    
    element.mousemove(function(event) {
      if (isDragging) {
        var transX = event.clientX - lastX;
        var transY = event.clientY - lastY;
      
        element.translate(transX, transY);
        lastX = event.clientX;
        lastY = event.clientY;
      }
    });
	
	  element.mouseup(function() {
	    paper.draggable.clearCurrent();
	  });
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