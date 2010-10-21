window.onload = function() {
  paper = Raphael(0,0, 800, 600);
  paper.draggable.enable();
  
  attrs = { 'fill': 'white' };
  
  singleRect();
  ellipse();
  set();
};

function singleRect() {
  var rect = paper.rect(0, 0, 100, 100).
                   attr(attrs).
                   draggable.enable();

  rect.draggable.dragstart(function() {
    console.log("Dragging started!");
  });

  rect.draggable.dragend(function() {
    console.log("Dragging ended!");
  });
}

function ellipse() {
  paper.ellipse(150, 150, 50, 100).
        attr(attrs).
        draggable.enable();
}

function set() {
  var rect = paper.rect(300, 300, 100, 100).
             attr(attrs);

  rect.draggable.drag(function() {
    console.log("Rect dragged!");
  });

  var circle = paper.circle(350, 350, 20).
               attr(attrs);

  var set = paper.set();
  set.draggable.drag(function() {
    console.log("Set dragged!");
  });

  set.draggable.enable();
  set.push(rect);
  set.push(circle);

  var div = document.createElement("div");
}
