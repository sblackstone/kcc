class Model {
  constructor() {    
    console.log("Initializing Model");
    this.initialize_state();
    this.view = new View(this);    
  }
  
  turn() {
    return(this._state.turn);
  }
  
  empty(i) {
    return this.square(i) === 0;
  }
  
  square(i) {
    return this._state.squares[i];
  }
  
  is_court_square(square_number) {
    return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0][square_number]
  }
  
  initialize_state() {
    this._state = {};
    this._state.human_team   = 1;
    this._state.turn         = 1;
    this._state.squares      = [ 1, 2, 1, 2, 1, 2, 1, 2,
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