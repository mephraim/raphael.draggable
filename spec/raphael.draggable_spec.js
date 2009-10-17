Screw.Unit(function() {   
  describe("Draggable plugin for Raphael", function() {
    var paper;
    before(function() {
      paper = Raphael(0,0, 600, 600);
    });
    
    it("should add a draggable function to the raphael paper ", function() {
      expect(jQuery.isFunction(paper.draggable)).to(equal, true);
    });
    
    it("should add a draggable function to raphael elements", function() {
      var rect = paper.rect(1,1,1,1);
      expect(jQuery.isFunction(rect.draggable)).to(equal, true);
    });
    
    describe("The draggable initialization function for the paper", function() {
      var paper;
      before(function() {
        paper = Raphael(0,0, 600, 600);
        paper.draggable();
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
  });
});

