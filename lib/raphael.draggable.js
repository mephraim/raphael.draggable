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
	  this.element = element;
	  this.enabled = false;
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