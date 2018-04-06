const Controller = function() {
  console.log("*** Controller Init");
  this.model = new Model();
  this.init_handlers();  
};


Controller.prototype.init_handlers = function() {
    $('.square').on("click", (o) => {
      let square_number = parseFloat($(o.target).closest(".square").data("square"));
      this.model.add_to_human_move(square_number);
      console.log(square_number);
    });
};


$(function() {
  c = new Controller();  
});