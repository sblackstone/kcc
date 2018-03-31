class Controller {
  constructor() {
    console.log("*** Controller Init");
    this.model = new Model();
    this.init_handlers();
    this.mv = new MoveGenerator(this.model);
  }

  init_handlers() {
    $('.square').on("click", (o) => {
      let square_number = parseFloat($(o.target).closest(".square").data("square"));
      $('.square').removeClass('highlight');
      this.mv.slide_moves[square_number].forEach((i) => {
        this.model.view.highlight_square(i);        
      });
      this.model.view.highlight_square(square_number);

      console.log(square_number);
    });
  }

}

$(function() {
  c = new Controller();  
});