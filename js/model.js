class Model {
  constructor() {    
    console.log("Initializing Model");
    this.initialize_state();
    this.view           = new View(this);   
    this.move_generator = new MoveGenerator(this);
    
    window.model = this; 
  }
      
  handle_first_human_move(i) {
    if (this.square(i) !== this.human_team()) {
      alert("You must start with one of your piecees");
    } else {
      this._state.uncommited_move.push(i);
      this.view.highlight_square(i);  
    }
    return;    
  }
  
  
    
  handle_nth_human_move(dst) {
    
  }
      
  add_to_human_move(i) {
    
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
  }
  
  subtract_from_human_move() {
    
  }
  
  is_start_of_turn() {
    return(this._state.uncommited_move.length === 0);
  }
  
  is_human_turn() {
    return(this.turn() === this.human_team());
  }
  
  human_team() {
    return(this._state.human_team);
  }
  
  turn() {
    return(this._state.turn);
  }
  
  set_square(i, val) {
    this._state.squares[i] = val;
  }
  
  other_team() {
    return this.turn() == 1 ? 2 : 1;
  }
  
  is_enemy(i) {
    return this.square(i) == this.other_team();
  }
  
  is_empty(i) {
    return this.square(i) === 0;
  }
  
  square(i) {
    return this._state.squares[i];
  }
  
  is_court_square(square_number) {
    return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0][square_number]
  } 
  
  initialize_state() {
    this._state                 = {};
    this._state.moves           = [];
    this._state.human_team      = 1;
    this._state.turn            = 1;
    this._state.uncommited_move = [];
    this._state.squares         = [ 1, 2, 1, 2, 1, 2, 1, 2,
                                    2, 1, 2, 1, 2, 1, 2, 1, 
                                    1, 2, 0, 0, 0, 0, 1, 2,
                                    2, 1, 0, 0, 0, 0, 2, 1, 
                                    1, 2, 0, 0, 0, 0, 1, 2,
                                    2, 1, 0, 0, 0, 0, 2, 1, 
                                    1, 2, 1, 2, 1, 2, 1, 2,
                                    2, 1, 2, 1, 2, 1, 2, 1,     
                                  ];
  }
  
};