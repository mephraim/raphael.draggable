window.onload = function() {
  var canvas = Raphael(0,0, 500, 500);
  canvas.draggable.enable();
  
  canvas.rect(0, 0, 100, 100).
         attr({ 'fill': 'white' }).
         draggable.enable();
         
  var rect = canvas.rect(100, 100, 100, 100).
             attr({ 'fill': 'white' });
             
  var circle = canvas.circle(150, 150, 60);
             
  var set = canvas.set();
  set.draggable.enable();
  set.push(rect);
  set.push(circle);
}
