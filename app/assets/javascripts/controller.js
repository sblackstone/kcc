class Controller {
  constructor() {
    console.log("*** Controller Init");
    this.model = new Model();
  }
}

$(function() {
  c = new Controller();  
});