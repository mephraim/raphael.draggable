window.onload = function() {
  var canvas = Raphael(0,0, 500, 500);
  canvas.draggable.enable();
  
  var rect = canvas.rect(0, 0, 100, 100).
             attr({ 'fill': 'white' }).
             draggable.enable();
}
