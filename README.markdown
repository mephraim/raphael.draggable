# Draggability for Raphael
raphael.draggable is a plugin for the [Raphael JavaScript library](http://raphaeljs.com/). It adds a draggable object to Raphael elements and sets that gives them the ability to be dragged around on the canvas.

# Enabling Draggability

## For the Canvas
To use the draggable plugin you must first enable the draggable functionality for the Raphael canvas

	var paper = Raphael(0,0, 800, 600).draggable.enable();
  
All draggable related functions are handled through the `draggable` namespace. If elements are added to the
canvas before draggable is enabled for the canvas, they won't be able to take advantage of draggable's 
functionality. It needs to be enabled before elements that need to have the draggable namespace are added to the canvas.

## For Elements
Once draggable is enabled for the canvas you can enable it for elements as well. By default, elements are not draggable. You must call the `draggable.enable` to make elements draggable:

	paper.rect(0, 0, 100, 100).
		  attr({ 'fill': 'white'}).
		  draggable.enable();

One caveat is that elements must have a fill color before they can be dragged. Otherwise, only the element borders will trigger the events that are required for dragging the element.

## For Sets
Finally, Raphael sets can be dragged. When draggable is enabled for sets, the entire set can be dragged around by clicking and dragging any of the elements that are in the set. By default, draggable is not enabled for sets, but it can be enabled with the `draggable.enable` function:

	var set = paper.set().draggable.enable();
	set.push(rect);

If an element that doesn't have draggable enabled is pushed into a set that has draggable enabled, draggable will be enabled for the element as well.

# Implementation Info

Raphael allows developers to extend the library using the `Raphael.fn` and `Raphael.el` objects. `Raphael.fn` allows functions to be namespaced, so raphael.draggable adds the draggable namespace to the Raphael object through the `Raphael.fn` object. 

Unfortunately, I was not able to figure out a way to add a similar namespace to elements through the `Raphael.el` function. As an alternative to adding the draggable namespace through the `Raphael.el` object, raphael.draggable overrides the Raphael functions that create elements and adds in an extra step where the draggable namespace is added to elements.

Raphael currently doesn't offer a way to extend sets. raphael.draggable gets around this by overriding the set creation function with one that adds the extra draggable functionality. 