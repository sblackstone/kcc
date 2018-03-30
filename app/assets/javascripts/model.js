class Model {
  constructor() {    
    console.log("Initializing Model");
    this.initialize_state();
    this.view = new View(this);    
  }
  
  initialize_state() {
    this.state = [ 1, 2, 1, 2, 1, 2, 1, 2,
                   2, 1, 2, 1, 2, 1, 2, 1, 
                   1, 2, 0, 0, 0, 0, 1, 2,
                   2, 1, 0, 0, 0, 0, 2, 1, 
                   1, 2, 0, 0, 0, 0, 1, 2,
                   2, 1, 0, 0, 0, 0, 2, 1, 
                   1, 2, 1, 2, 1, 2, 1, 2,
                   2, 1, 2, 1, 2, 1, 2, 1,     
                 ];
  }
  
  
  
}