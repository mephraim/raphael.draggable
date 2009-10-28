Screw.Unit(function() {   
  describe("Draggable plugin for Raphael paper", function() {
    var paper;
    before(function() {
      paper = Raphael(0,0, 600, 600);
    });
    
    it("adds a draggable namespace to the raphael paper", function() {
      expect(paper.draggable).to_not(equal, null);
    });
    
    it("add sa draggable.enable function to the raphael paper", function() {
      expect(jQuery.isFunction(paper.draggable.enable)).to(equal, true);
    });  
    
    describe("The draggable.enable function for the paper", function() {
      var paper;
      before(function() {
        paper = Raphael(0,0, 600, 600);
        paper.draggable.enable();
      });
            
      it("returns the paper object after being called", function() {
        var paper = Raphael(0, 0, 600, 600);
        expect(paper.draggable.enable()).to(equal, paper);
      });
      
      it("sets a new property draggable.enabled for the paper to true", function() {
        expect(paper.draggable.enabled).to(equal, true);
      });
      
      it("adds a draggable.current function to the paper ", function() {
        expect(jQuery.isFunction(paper.draggable.current)).to(equal, true);
      });
      
      it("adds a draggable.clearCurrent function to the paper", function() {
        expect(jQuery.isFunction(paper.draggable.clearCurrent)).to(equal, true);
      });
            
      it("sets the current draggable to null when draggable.clearCurrent is called", function() {
        paper.draggable.current("test");
        paper.draggable.clearCurrent();
        expect(paper.draggable.current()).to(equal, null);
      });
    });
  
    describe("The draggable.current function", function() {
      before(function() {
        paper = Raphael(0, 0, 600, 600);
        paper.draggable.enable();
      });
      
      it("returns the paper after being called", function() {
        expect(paper.draggable.current("test")).to(equal, paper);
      });
      
      it("stores the current draggable", function() {
        var element = "test";
        paper.draggable.current(element);
        expect(paper.draggable.current()).to(equal, element);
      });
    });
    
    describe("The clearCurrentDraggable function", function() {
      it("returns the paper after being called", function() {
        paper.draggable.enable();
        expect(paper.draggable.clearCurrent()).to(equal, paper);
      });
    });
  });
  
  describe("Draggable plugin for Raphael elements", function() {
    var paper;
    var rect;
    before(function() {
      // Override Raphael's mousedown so that mousedown can be triggered
      Raphael.el.mousedown = function(arg) {
        if (typeof arg == 'function') {
          this.mousedownHandlers = this.mousedownHandlers || [];
          this.mousedownHandlers.push(arg);
        }
        else {
          for(var i = 0; i < this.mousedownHandlers.length; i++) {
            this.mousedownHandlers[i].apply(this, arg);
          }
        }
      };
      
      // Override Raphael's mousemove so that mousemove can be triggered
      Raphael.el.mousemove = function(arg) {
        if (typeof arg == 'function') {
          this.mouseMoveHandlers = this.mouseMoveHandlers || [];
          this.mouseMoveHandlers.push(arg);
        }
        else {
          for(var i = 0; i < this.mouseMoveHandlers.length; i++) {
            this.mouseMoveHandlers[i].apply(this, arg);
          }
        }
      };
      
      paper = Raphael(0, 0, 600, 600).draggable.enable();
      rect  = paper.rect(1,1,1,1).draggable.enable();
    });
    
    it("adds a draggable namespace to raphael elements", function() {
      expect(rect.draggable).to_not(equal, null);
    });
    
    it("adds a draggable.enable function to raphael elements", function() {
      expect(jQuery.isFunction(rect.draggable.enable)).to(equal, true);
    });
    
    describe("The draggable.enable function for elements", function() {
      it("returns the element after being called", function() {
        expect(rect.draggable.enable()).to(equal, rect);
      });
    });
    
    describe("the draggable.enable function", function() {
      it("sets draggable.enabled to true when is called", function() {
        rect.draggable.enabled = false;
        rect.draggable.enable();
        expect(rect.draggable.enabled).to(equal, true);
      });
      
      it("returns the element after being called", function() {
        expect(rect.draggable.enable()).to(equal, rect);
      });
    });

    describe("the draggable.disable function", function() {
      it("sets draggable.enabled to false when called", function() {
        rect.draggable.enabled = true;
        rect.draggable.disable();
        expect(rect.draggable.enabled).to(equal, false);
      });
      
      it("returns the element after being called", function() {
        expect(rect.draggable.disable()).to(equal, rect);
      });
    });
  
    describe("event handlers", function() {
      describe("mousedown", function() {
        it("sets the draggable.current() for the paper to the element", function() {
          rect.mousedown([{}]);
          expect(paper.draggable.current()).to(equal, rect);
        });
      });
      
      describe("mousemove", function() {        
        it("translates the object by the amount that the mouse moved", function() {
          var translateX, translateY;
          Raphael.el.translate = function(x, y) {
            translateX = x;
            translateY = y;
          };
          
          var startX = startY = 0;
          var moveX = moveY = 15;
          
          rect.mousedown([{ clientX: startX, clientY: startY}]);
          rect.mousemove([{clientX: moveX, clientY: moveY}]);
          
          expect(translateX).to(equal, moveX - startX);
          expect(translateY).to(equal, moveY - startY);
        });
      });
    });
  });
});

