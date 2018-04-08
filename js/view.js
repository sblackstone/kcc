const View = function(model) {
  console.log("Initializing View");
  window.view = this;
  this.model = model;
  this.elements = {};
  this.elements.root = $('#root');
  this.elements.board = $('#board');    
  this.elements.errors = $('#error-messages');
  this.elements.current_move = $('#current-move');
  this.elements.squares = [];
  this.init_squares();
  this.draw();  
}

View.prototype.draw = function() { 
  this.draw_board();
  this.draw_current_move();
  this.draw_errors();
};

View.prototype.draw_board = function() {
  for (let i = 0; i < 64; i++) {
    this.elements.squares[i].removeClass('red-piece').removeClass('green-piece');
    if (this.model.square(i) == 1) {
      this.elements.squares[i].addClass('red-piece');
    }
    if (this.model.square(i) == 2) {
      this.elements.squares[i].addClass('green-piece');
    }      
  }    
};

View.prototype.draw_errors = function() {
  this.elements.errors.html("");
  let error = this.model.fetch_and_clear_error_message();
  if (error !== null) {
    $('<li>').html(error).appendTo(this.elements.errors);    
  }
};

View.prototype.draw_current_move = function() {
  this.elements.current_move.html(JSON.stringify(this.model.uncommitted_move()));
  $('.highlight').removeClass('highlight');
  $('.highlight-legal-move').removeClass('highlight-legal-move');
  
  let moves = this.model.uncommitted_move();
  moves.forEach((i)=> {
    if (i >= 0) {
      this.highlight_square(i);      
    }
  });
  
  if (!this.model.is_start_of_turn()) {
    let legal_moves = this.model.move_generator.legal_moves();
    legal_moves.forEach((i)=> {
      this.highlight_legal_move(i);    
    });    
  }
  
};

View.prototype.highlight_square = function(i) {
  console.log(`Highlighting ${i}`);
  this.elements.squares[i].addClass('highlight');  
};

View.prototype.highlight_legal_move = function(i) {
  console.log(`Highlighting Legal Move ${i}`);
  this.elements.squares[i].addClass('highlight-legal-move');  
};


View.prototype.init_squares = function() {
  for (let i = 0; i < 8; i++) {
    let rank = $('<div>').addClass('rank');
    for (let j = 0; j < 8; j++) {
      let square_number = i*8 + j;
      let square = $('<div>').addClass('square').data("square", square_number);
      let internal_square = $('<div>').html(square_number).addClass('internal-square').appendTo(square);      
      let piece = $('<div>').addClass('piece').appendTo(internal_square);
      this.elements.squares[square_number] = square;
      if (this.model.is_court_square(square_number)) {
        square.addClass('court-square');
      }  
      square.appendTo(rank);      

    }
    rank.appendTo(this.elements.board);
  }  
};


