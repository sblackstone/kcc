class Model {
  constructor() {    
    console.log("Initializing Model");
    this.initialize_state();
    this.view = new View(this);    
  }
  
  is_court_square(square_number) {
    return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0][square_number]
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