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
  
  $('#new-game').on("click", (o)=> {
    console.log("NEW GAME!");
    let human_color = parseFloat($('#human-color').val());
    let computer_level = parseFloat($('#computer-level').val());

    this.model.start_game(human_color, computer_level);
  });
  
};


$(function() {
  c = new Controller();  
});