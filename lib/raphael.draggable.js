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

  var _lastDragX,
      _lastDragY,
      _dragStarted;

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

    _overrideElements(paper);
    _overrideSet(paper);

    document.addEventListener("mousemove", _mouseMove, false);
    document.addEventListener("mouseup", _mouseUp, false);

    /**
     * Handler for the document's mousemove event. If there is a current
     * draggable element, it will be moved. Otherwise, the handler won't do
     * anything.
     *
     * @param {DOM Event} event The DOM event being handled
     **/
    function _mouseMove(event) {
      var current = paper.draggable.current();
      if (current && current.translate) {
        if (!_dragStarted) {
          _dragStarted = true;
          _triggerHandler(current, "dragstart");
        }

        var transX = event.clientX - _lastDragX;
        var transY = event.clientY - _lastDragY;

        current.translate(transX, transY);
        _lastDragX = event.clientX;
        _lastDragY = event.clientY;

        _triggerHandler(current, "drag", {
          deltaX: transX,
          deltaY: transY
        });
      }
    }

    /**
     * Handler for the document's mouseup event. Clears the current
     * draggable element, so that dragging will stop.
     **/
    function _mouseUp() {
      if (_dragStarted) {
        _triggerHandler(paper.draggable.current(), "dragend");
      }

      paper.draggable.clearCurrent();
    }

    return paper;
  };

  /**
   * Wrap each element creation function on the canvas with a custom
   * element function that adds draggable functionality to the
   * newly created element before returning it
   *
   * @param {Raphael Canvas} paper The canvas that will have its functions wrapped
   */
  function _overrideElements(paper) {
    var elementTypes = ['circle', 'rect', 'ellipse', 'image', 'text', 'path'];
    for(var i = 0; i < elementTypes.length; i++) {
      _overrideElementFunc(paper, elementTypes[i]);
    }
  }

  /**
   * Overrides the element creation function that matches up with elemenType
   *
   * @param {Raphael canvas} paper The canvas that will have its function wrapped
   * @param {String} elementType The name of the element function to be wrapped
   */
  function _overrideElementFunc(paper, elementType) {
    paper[elementType] = function(oldFunc) {
      return function() {
        var element = oldFunc.apply(paper, arguments);
        element.draggable = new DraggableExtension(element);
        return element;
      };
    }(paper[elementType]);
  }

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
    },

    dragstart: function(func) {
      if (arguments.length > 0) {
        _registerHandler(this.element, "dragstart", func);
      }

      return this.element;
    },

    drag: function(func) {
      if (arguments.length > 0) {
        _registerHandler(this.element, "drag", func);
      }

      return this.element;
    },

    dragend: function(func) {
      if (arguments.length > 0) {
        _registerHandler(this.element, "dragend", func);
      }

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
    this.handlers = {};

    element.mousedown(_mouseDown);

    /**
     * Handler for the individual element mousedown event. If there is already
     * a current element being dragged or if the element doesn't have draggable
     * enabled, it will return immediately.
     *
     * Otherwise, it will set up the initial position of the element and set the
     * current element (or its parent, in the case of an element in a set) as the
     * current element being dragged.
     *
     * @param {DOM Event} event The DOM event being handled
     **/
    function _mouseDown(event) {
      if (paper.draggable.current() || !element.draggable.enabled)
        return;

      paper.draggable.current(element.draggable.parent || element);

      _dragStarted = false;
      _lastDragX = event.clientX;
      _lastDragY = event.clientY;
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
  function _overrideSet(paper) {
    paper.set = function(oldFunc) {
      return function() {
        var set = oldFunc.apply(paper, arguments);
        set.paper = paper;
        set.draggable = new DraggableSetExtension(set);

        _overrideSetFunctions(set);
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
  function _overrideSetFunctions(set) {
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
    this.handlers = {};
  };

  DraggableSetExtension.prototype = BaseFunctions;

  /* Drag event handling */

  /**
   * Registers a draggable handler
   *
   * @param {Raphael element} element The element to register the event on
   * @param {String} event The name of the event to register
   * @param {Function} func A function to call when the event is triggered
   **/
  function _registerHandler(element, event, func) {
    var handlers = element.draggable.handlers;

    handlers[event] = handlers[event] || [];
    handlers[event].push(func);
  }

  /**
   * Triggers a draggable event
   *
   * @param {Raphael element} element The element that triggered the handler
   * @param {String} event The name of the event to trigger
   **/
  function _triggerHandler(element, event, data) {
    if (!element || !element.draggable) {
      return;
    }

    var handlers = element.draggable.handlers[event];
    if (handlers) {
      for(var i = 0, len = handlers.length; i < len; i++) {
        handlers[i].call(element, data);
      }
    }

    var children = element.items;
    if (children) {
      _triggerForEach(children, event, data);
    }
  }

  /**
   * Triggers a draggable event on an array of elements
   *
   * @param {Array} elements An array of Raphael elements
   * @param{String} event The name of the event to trigger
   **/
  function _triggerForEach(elements, event, data) {
    for(var i = 0, len = elements.length; i < len; i++) {
      _triggerHandler(elements[i], event, data);
    }
  }
})();
