function triggerMouseEvent(element, type, clientX,  clientY) {
  var event = document.createEvent("MouseEvents");
  event.initMouseEvent(type, false, false, window, null, clientX, clientY, clientX, clientY);
  element.dispatchEvent(event);
}

function clickAndMoveElement(element, startX, startY, endX, endY) {
  triggerMouseEvent(element, "mousedown", startX, startY);
  triggerMouseEvent(document, "mousemove", endX, endY);
  triggerMouseEvent(document, "mouseup", endX, endY);
}
