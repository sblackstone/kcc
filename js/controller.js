const Controller = function() {
  console.log("Initializing Controller");
  this.model = new Model();
  this.init_handlers();  
};


Controller.prototype.init_handlers = function() {
  $('.square').on("click", (o) => {
    let square_number = parseFloat($(o.target).closest(".square").data("square"));
    this.model.add_to_human_move(square_number);
  });
  
  $('#undo-button').on("click", (o)=> {
    this.model.handle_human_uncommitted_undo();  
  });
  
  $('#commit-move-button').on("click", (o)=> {
    this.model.human_commit_move();
  });
  
};


$(function() {
  c = new Controller();  
});