const Model = function() {
  console.log("Initializing Model");
  this.initialize_state();
  this.move_generator = new MoveGenerator(this);
  this.view           = new View(this);   
  
  window.model = this;   
};


Model.prototype.handle_first_human_move = function(i) {
  if (this.square(i) !== this.human_team()) {
    alert("You must start with one of your piecees");
  } else {
    this._state.uncommitted_move.push(i);
    this.view.highlight_square(i);  
  }
  this.view.draw();
  return;      
};


Model.prototype.handle_nth_human_move = function(dst) {
  let src = this.last_uncommitted_dst();
  if (this.move_generator.is_legal_piece_move(src, dst)) {
    this.push_uncommitted_move(dst);
  } else {
    alert("Not a legal move");
  }  
  this.view.draw();
};

Model.prototype.handle_human_uncommitted_undo = function() {
  if (!this.is_human_turn()) {
    alert("Its not your turn");
    return;
  }
  
  if (this.is_start_of_turn()) {
    alert("Nothing to take back");
    return;
  }
  this.pop_uncommitted_move();
  this.view.draw();
  
};


Model.prototype.add_to_human_move = function(i) {
  if (!this.is_human_turn()) {
    alert("Its not your turn");
    return;
  }
      
  if (this.is_start_of_turn()) {
    this.handle_first_human_move(i);
  } else {
    this.handle_nth_human_move(i);
  }
  return;
};

Model.prototype.uncommitted_move = function() {
  return(this._state.uncommitted_move);
};

Model.prototype.is_start_of_turn = function() {
  return(this._state.uncommitted_move.length === 0);  
};

Model.prototype.is_first_piece_destination = function() {
  return(this._state.uncommitted_move.length === 1);  
};

Model.prototype.last_uncommitted_dst = function() {
  return(this._state.uncommitted_move[this._state.uncommitted_move.length - 1]);
};




Model.prototype.push_uncommitted_move = function(dst) {
  let src = this.last_uncommitted_dst();
  this.move_piece(src, dst);

  if (this.move_generator.is_jump_move(src,dst)) {
    let jumped = this.move_generator.jumped_square(src,dst);
    if (this.is_enemy(jumped)) {
      this._state.uncommitted_move.push(-1);
      this.set_square(jumped, 0);          
    };                
  }
  this._state.uncommitted_move.push(dst);  
};

Model.prototype.pop_uncommitted_move = function() {
  let last_dst = this._state.uncommitted_move.pop();
  let enemy_jump_move = false;

  if (last_dst === undefined) {
    console.log("Warning: tried to pop empty uncommitted move");
    return;
  };

  if (this.is_start_of_turn()) {
    return;
  }

  if (this.last_uncommitted_dst() === -1) {
    this._state.uncommitted_move.pop();
    enemy_jump_move = true;    
  }
  
  let last_src = this.last_uncommitted_dst();

  this.move_piece(last_dst, last_src);

  if (this.move_generator.is_jump_move(last_dst,last_src) && enemy_jump_move) {
    let jumped = this.move_generator.jumped_square(last_dst,last_src);
    this.set_square(jumped, this.other_team());          
  }
    
};

Model.prototype.push_move = function() {

  this._state.committed_moves.push(this._state.uncommitted_move.slice(0));
  this._state.uncommitted_move = [];
  this._state.turn = this.other_team();
  this.view.draw();
};

Model.prototype.pop_move = function() {
  this._state.turn = this.other_team();
  this._state.uncommitted_move = this._state.committed_moves.pop();

  while(!this.is_start_of_turn()) {
    console.log(this._state.uncommitted_move);
    this.pop_uncommitted_move();
  }
  this.view.draw();
    
};



// Accessors

Model.prototype.move_piece = function(src,dst) {
  this.set_square(dst, this.square(src));    
  this.set_square(src, 0);  
}

Model.prototype.other_team = function() {
  return this.turn() == 1 ? 2 : 1;  
};

Model.prototype.is_enemy = function(i) {
  return this.square(i) == this.other_team();  
};

Model.prototype.is_empty = function(i) {
  return this.square(i) === 0;
};

Model.prototype.is_human_turn = function() {
  return(this.turn() === this.human_team());
};


// Primatives.

Model.prototype.human_team = function() {
  return(this._state.human_team);  
};

Model.prototype.turn = function() {
  return(this._state.turn);
};

Model.prototype.set_square = function(i, val) {
  this._state.squares[i] = val;  
};

Model.prototype.square = function(i) {
  return this._state.squares[i];  
};

Model.prototype.is_court_square = function(i) {
  return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0][i];
};

Model.prototype.initialize_state = function() {
  this._state                  = {};
  this._state.moves            = [];
  this._state.human_team       = 1;
  this._state.turn             = 1;
  this._state.uncommitted_move = [];
  this._state.committed_moves  = [];

  this._state.squares          = [ 1, 2, 1, 2, 1, 2, 1, 2,
                                   2, 1, 2, 1, 2, 1, 2, 1, 
                                   1, 2, 0, 0, 0, 0, 1, 2,
                                   2, 1, 0, 0, 0, 0, 2, 1, 
                                   1, 2, 0, 0, 0, 0, 1, 2,
                                   2, 1, 0, 0, 0, 0, 2, 1, 
                                   1, 2, 1, 2, 1, 2, 1, 2,
                                   2, 1, 2, 1, 2, 1, 2, 1,     
                                 ];  
                                
  // DEBUG MODE
  this.set_square(19, 1);
  this.set_square(27, 2);
  this.set_square(26, 2);

};

