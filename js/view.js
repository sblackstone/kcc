const View = function(model) {
  console.log("Initializing View");
  window.view = this;
  this.model = model;
  this.elements = {};
  this.elements.root = $('#root');
  this.elements.board = $('#board');    
  this.elements.errors = $('#error-messages');
  this.elements.current_move = $('#current-move');
  this.elements.current_turn = $('#current-turn');
  this.elements.squares = [];
  this.init_squares();
  this.draw();  
};

View.prototype.draw = function() { 
  this.draw_board();
  this.draw_current_move();
  this.draw_last_move();
  this.draw_errors();
  this.draw_turn();
  this.draw_winner();
};


View.prototype.draw_winner = function() {
  if (this.model.winner() == 1) {
    alert("Red Wins!");
  }; 
  if (this.model.winner() == 2) {
    alert("Green Wins!");
  };

};

View.prototype.draw_board = function() {
  for (let i = 0; i < 64; i++) {
    this.elements.squares[i].removeClass('red-piece green-piece');
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

View.prototype.draw_turn = function() {
  this.elements.current_turn.removeClass("red green").html("");
  if (this.model.winner() > 0) {
        
  };
  this.elements.current_turn.html(this.model.turn() == 1 ? "Red's Turn" : "Green's Turn");
  this.elements.current_turn.addClass(this.model.turn() == 1 ? "red" : "green");
};

View.prototype.draw_current_move = function() {
  this.elements.current_move.html(this.model.uncommitted_move().join(", "));
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


View.prototype.draw_last_move = function() {
  $('.highlight-last-move').removeClass('highlight-last-move');
  let move = this.model.last_committed_move();
  move.forEach((i) => {
    if (i >= 0) {
      this.highlight_last_move(i);      
    }
  });
};

View.prototype.highlight_square = function(i) {
  this.elements.squares[i].addClass('highlight');  
};

View.prototype.highlight_legal_move = function(i) {
  this.elements.squares[i].addClass('highlight-legal-move');  
};

View.prototype.highlight_last_move = function(i) {
  this.elements.squares[i].addClass('highlight-last-move');  
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


