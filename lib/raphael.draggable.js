// Raphael draggable object plugin
// Matt Ephraim - 2009
(function() {
  Raphael.fn.draggable = function() {
    var currentDraggable;
    this.isDraggable = true;
    
    this.setCurrentDraggable = function(element) {
  	  currentDraggable = element;
  	};
  	
  	this.getCurrentDraggable = function() {
  	  return currentDraggable;
  	};
  	
  	this.clearCurrentDraggable = function() {
  	  currentDraggable = null;    
  	} 
  };
  
  Raphael.el.draggable = function() {
    
  };
})();