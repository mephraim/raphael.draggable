function triggerMouseEvent(element, type, clientX,  clientY) {
  var event = document.createEvent("MouseEvents");
  event.initMouseEvent(type, false, false, window, null, clientX, clientY, clientX, clientY);
  element.dispatchEvent(event);
}

function clickAndMoveElement(element) {
  triggerMouseEvent(element, "mousedown");
  triggerMouseEvent(document, "mousemove");
  triggerMouseEvent(document, "mouseup");
}
