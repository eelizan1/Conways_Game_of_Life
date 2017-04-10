// the cell object
function Cell () {
  // state flag - alive or not
  this.element = $("<div class='cell " + randomize() + "'></div>");

  // reference to the number of it's live neighbors
  // to determine if it's alive or dead the next turn
  this.neighbors = 0;

  // randomly returns to be alive (30%) of the time
  // returns to the cell div
  function randomize() {
    if(Math.random() > 0.7) {
      return "alive";
    } else {
      return "";
    }
  }

  // function sort(x, y) {
  //
  // }

  // when we bring a cell to life, we add he .alive class
  Cell.prototype.resurrect = function() {
    this.element.addClass('alive');
  }

  // when we kill a cell we remove .alive class
  Cell.prototype.kill = function() {
    this.element.removeClass('alive');
  }

  // check if cell is alive
  Cell.prototype.isAlive = function () {
    return this.element.hasClass('alive');
  }

  //get coordinates of cell


}
