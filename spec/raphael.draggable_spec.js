Screw.Unit(function() {   
  describe("Draggable plugin for Raphael paper", function() {
    var paper;
    before(function() {
      paper = Raphael(0,0, 600, 600);
    });
    
    it("should add a draggable function to the raphael paper ", function() {
      expect(jQuery.isFunction(paper.draggable)).to(equal, true);
    });  
    
    describe("The draggable initialization function for the paper", function() {
      var paper;
      before(function() {
        paper = Raphael(0,0, 600, 600);
        paper.draggable();
      });
      
      it("should return the paper object after being called", function() {
        var paper = Raphael(0, 0, 600, 600);
        expect(paper.draggable()).to(equal, paper);
      });
      
      it("should set a new property isDraggable for the paper to true", function() {
        expect(paper.isDraggable).to(equal, true);
      });
      
      it("should add a setCurrentDraggable function to the paper ", function() {
        expect(jQuery.isFunction(paper.setCurrentDraggable)).to(equal, true);
      });
      
      it("should add a getCurrentDraggable function to the paper", function() {
        expect(jQuery.isFunction(paper.getCurrentDraggable)).to(equal, true);
      });
      
      it("should add a clearCurrentDraggable function to the paper", function() {
        expect(jQuery.isFunction(paper.clearCurrentDraggable)).to(equal, true);
      });
      
      it("should store the current draggable", function() {
        var element = "test";
        paper.setCurrentDraggable(element);
        expect(paper.getCurrentDraggable()).to(equal, element);
      });
      
      it("set the current draggable to null when clearCurrentDraggable is called", function() {
        paper.setCurrentDraggable("test");
        paper.clearCurrentDraggable();
        expect(paper.getCurrentDraggable()).to(equal, null);
      });
    });
  
    describe("The setCurrentDraggable function", function() {
      it("should return the paper after being called", function() {
        paper.draggable();
        expect(paper.setCurrentDraggable("test")).to(equal, paper);
      });
    });
    
    describe("The clearCurrentDraggable function", function() {
      it("should return the paper after being called", function() {
        paper.draggable();
        expect(paper.clearCurrentDraggable()).to(equal, paper);
      });
    });
  });
  
  describe("Draggable plugin for Raphael elements", function() {
    var rect;
    before(function() {
      rect = Raphael(0, 0, 600, 600).rect(1,1,1,1);
      rect.draggable();
    });
    
    it("should add a draggable function to raphael elements", function() {
       expect(jQuery.isFunction(rect.draggable)).to(equal, true);
    });
    
    describe("The draggable initialization function for elements", function() {
      it("should return the element after being called", function() {
        var rect = Raphael(0, 0, 600, 600).rect(1,1,1,1);
        expect(rect.draggable()).to(equal, rect);
      });

      it("should set a new property isDraggable to true after being called", function() {
        expect(rect.isDraggable).to(equal, true);
      });
      
      it("should add an enableDragging function to raphael elements", function() {
        expect(jQuery.isFunction(rect.enableDragging)).to(equal, true);
      });
         
      it("should add a disableDragging function to raphael elements", function() {
        expect(jQuery.isFunction(rect.disableDragging)).to(equal, true);
      });
    });
    
    describe("the enableDragging function", function() {
      it("should set isDraggable to true when enableDragging is called", function() {
        rect.isDraggable = false;
        rect.enableDragging();
        expect(rect.isDraggable).to(equal, true);
      });
      
      it("should return the element after being called", function() {
        expect(rect.enableDragging()).to(equal, rect);
      });
    });
    
    describe("the disableDragging function", function() {
      it("should set isDraggable to false when disableDragging is called", function() {
        rect.isDraggable = true;
        rect.disableDragging();
        expect(rect.isDraggable).to(equal, false);
      });
      
      it("should return the element after being called", function() {
        expect(rect.disableDragging()).to(equal, rect);
      });
    });
  });
});

