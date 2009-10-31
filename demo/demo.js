window.onload = function() {
  paper = Raphael(0,0, 800, 600);
  paper.draggable.enable();
  
  attrs = { 'fill': 'white' };
  
  singleRect();
  ellipse();
  set();
}

function singleRect() {
  paper.rect(0, 0, 100, 100).
        attr(attrs).
        draggable.enable();
}

function ellipse() {
  paper.ellipse(150, 150, 50, 100).
        attr(attrs).
        draggable.enable();
}

function set() {
  var rect = paper.rect(300, 300, 100, 100).
             attr(attrs);
             
  var circle = paper.circle(350, 350, 20).
               attr(attrs);
             
  var set = paper.set();
  set.draggable.enable();
  set.push(rect);
  set.push(circle);
}
