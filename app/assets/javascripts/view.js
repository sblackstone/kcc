class View {
  constructor(model) {
    console.log("Initializing View");

    window.view = this;
    this.model = model;
    this.elements = {};
    this.elements.root = $('#root');
    this.elements.board = $('#board');    
    this.elements.squares = [];
    this.init_squares();
    this.draw();
  }
  
  draw() {
    for (let i = 0; i < 64; i++) {
      this.elements.squares[i].removeClass('red-piece').removeClass('green-piece');
      if (this.model.state[i] == 1) {
        this.elements.squares[i].addClass('red-piece');
      }
      if (this.model.state[i] == 2) {
        this.elements.squares[i].addClass('green-piece');
      }
      
    }
  }

  init_squares() {
    for (let i = 0; i < 8; i++) {
      let rank = $('<div>').addClass('rank');
      for (let j = 0; j < 8; j++) {
        let square_number = i*8 + j;
        let square = $('<div>').addClass('square').data("data-square", square_number);
        let internal_square = $('<div>').addClass('internal-square').appendTo(square);      
        let piece = $('<div>').addClass('piece').appendTo(internal_square);
        this.elements.squares[square_number] = square;
        if ([18,19,20,21,26,27,28,29,34,35,36,37,42,43,44,45].indexOf(square_number) > -1) {
          square.addClass('court-square');
        }  
        square.appendTo(rank);      

      }
      rank.appendTo(this.elements.board);
    }
  }
}
