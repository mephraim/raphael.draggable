/** 
 * raphael.draggable plugin 1.0.1
 * Copyright (c) 2010 @author Matthew Ephraim
 *
 * licensed under the MIT license 
 */
(function() {  
  /** 
   * Raphael paper extensions namespace 
   */
  Raphael.fn.draggable = {};

  /** 
   * Calling the draggable.enable function on a Raphael 
   * canvas will add the functions current and clearCurrent
   * to the canvas. It will also wrap the functions that 
   * create elements and sets with extra draggable functionality 
   *
   * @return the canvas
   */
  Raphael.fn.draggable.enable = function() {
    var paper = this;
    
    var currentDraggable;
    paper.draggable.enabled = true;
    
    /**
     * Set the current draggable element to the element
     * that was passed in. Otherwise, return the current
     * draggable element (if there is one)
     *
     * @param {Raphael element} element (optional) The element to set 
     * as the current draggable
     *
     * @return the canvas, if an element was passed in, otherwise, the
     * current draggable
     */
    paper.draggable.current = function(element) {
      if (element) {
        currentDraggable = element;
        return paper;
      }
      else {
        return currentDraggable;
      }
    };
    
    /** 
     * Clear out the current draggable 
     */
    paper.draggable.clearCurrent = function() {
      currentDraggable = null;  
      return paper;  
    };
      
    overrideElements(paper);
    overrideSet(paper);
    return paper;
  };
  
  /**
   * Wrap each element creation function on the canvas with a custom
   * element function that adds draggable functionality to the 
   * newly created element before returning it
   *
   * @param {Raphael Canvas} paper The canvas that will have its functions wrapped 
   */
  function overrideElements(paper) {
    var elementTypes = ['circle', 'rect', 'ellipse', 'image', 'text', 'path'];
    for(var i = 0; i < elementTypes.length; i++) {
      overrideElementFunc(paper, elementTypes[i]);
    }
  }

  /** 
   * Overrides the element creation function that matches up with elemenType
   * 
   * @param {Raphael canvas} paper The canvas that will have its function wrapped
   * @param {String} elementType The name of the element function to be wrapped
   */
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

  /**
   * Base functionality to be used as a prototype for draggable extentions
   */
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
  
  /** 
   * Extension for Raphael elements that adds draggable functionality  
   * @constructor
   */
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
  
  /** 
   * Wrap the set creation function on the canvas with a custom
   * function that adds draggable functionality to the 
   * newly created set before returning it
   * 
   * @param {Raphael canvas} paper The canvas that will have its function wrapped
   */
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
  
  /**
   * Takes a Raphael set and wraps some functions so that
   * they take advantage of the extra draggable functionality
   *
   * @param {Raphael set} set The that will have its functions wrapped
   */
  function overrideSetFunctions(set) {
    set.push = function(oldFunc) { 
      return function() {
        oldFunc.apply(set, arguments);

        for (var i = 0, len = arguments.length; i < len; i++) {
          var element = arguments[i];
          if (element.draggable) {
            element.draggable.parent = set;
        
            if (set.draggable.enabled) {
              element.draggable.enable();
            }
          }
        }
      };
    }(set.push);
  }
 
  /**
   * Extension for draggable Raphael sets
   * @constructor
   */ 
  DraggableSetExtension = function(set) {
    this.element = set;
  };
  
  DraggableSetExtension.prototype = BaseFunctions;
})();
