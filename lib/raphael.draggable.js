// Raphael draggable object plugin
// Matt Ephraim - 2009
(function() {
  Raphael.fn.draggable = function() {
    var currentDraggable;
    this.isDraggable = true;
    
    this.setCurrentDraggable = function(element) {
  	  currentDraggable = element;
  	  return this;
  	};
  	
  	this.getCurrentDraggable = function() {
  	  return currentDraggable;
  	};
  	
  	this.clearCurrentDraggable = function() {
  	  currentDraggable = null;  
  	  return this;  
  	} 
  
    return this;
  };
  
  Raphael.el.draggable = function() {    
    this.isDraggable = true;
    
    this.enableDragging = function() { 
      this.isDraggable = true; 
      return this;
    };
    
    this.disableDragging = function() { 
      this.isDraggable = false; 
      return this;
    };
    
    return this;
  };
})();