class Model {
  constructor() {    
    console.log("Initializing Model");
    this.initialize_state();
    this.view = new View(this);    
  }
  
  is_court_square(square_number) {
    return [18,19,20,21,26,27,28,29,34,35,36,37,42,43,44,45].indexOf(square_number) > -1;
  }
  
  initialize_state() {
    this.state = {};
    this.state.human_team   = 1;
    this.state.turn         = 1;
    this.state.squares      = [ 1, 2, 1, 2, 1, 2, 1, 2,
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