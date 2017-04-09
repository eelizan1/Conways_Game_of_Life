// two main objects - the game and the cells

// the cell object
function Cell () {
  // state flag - alive or not
  // randomly chooses to be alive (30%) of the time
  this.alive = Math.random() > 0.7;
  // reference to the number of it's live neighbors
  // to determine if it's alive or dead the next turn
  this.neighbors = 0;
}

// the grid object
function Conway (size) {
  // size of the grid
  this.size = size;
  this.grid = this.generateGrid(size);
  // a way of directions
  this.directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1,-1], [1,0], [1,1]];

}h git

/*
  GRID PROTOTYPES (BAG OF TOOLS)
*/

Conway.prototype.generateGrid = function(size) {
  // create a 2D array
  var grid = [];
  // for grid
  for(var i = 0; i < size; i++) {
    // create new row
    var row = [];
    // for each row
    for(var j = 0; j < size; j++) {
      // populate with cells - new instance of Cell
      row.push(new Cell());
    }
    // put new row in grid
    grid.push(row);
  }
  return grid;
};

// show grid by using a protype of the grid
// note: conway (object) has a bag of tools (prototype) and now has a new tool (show)
// can also use just as a method
Conway.prototype.show = function () {
  // show every row on a new line
  // 1. go through grid
  // 2. go through row
  for(var i = 0; i < this.size; i++) {
    // go through grid
    var row = this.grid[i];
    var rowString = "";
    for(var j = 0; j < this.size; j++) {
      // go through row
      var cell = row[j];
      // if cell is alive print X else print space
      if(cell.alive) {
        rowString += "X|";
      } else {
        rowString += " |";
      }
    }
    // print string before grid loop ends
    console.log(rowString);
  }
};

/*
  GAME LOGIC
  - if cell has less than 2 neighbors, cell dies
     method: isUnderpopulated(x,y)
  - if cell has more than 3 neighbors, cell dies
  - if cell is dead and has exactly three neighbors, cell is resurrected
  - update nieghbors for cell
*/

// checks if cell is underpopulated
Conway.prototype.isUnderpopulated = function(row, col) {
  // get cell
  var cell = this.grid[row][col];
  // returns true or false if cell's neighbors are less than 2
  return cell.neighbors < 2;
};

// checks if cell overpopulated
Conway.prototype.isOverpopulated = function(row, col) {
  // get cell
  var cell = this.grid[row][col];
  // returns true or false if cell's neighbors are greater than 3
  return cell.neighbors > 3;
};

Conway.prototype.isResurrectable = function (row, col) {
  // get cell
  var cell = this.grid[row][col];
  // return true of false if cell is dead and has exactly 3 nieghbors
  return !cell.alive && cell.neighbors === 3;
};

// checks if in bounds
Conway.prototype.isInBounds = function(row, col) {
  return row >= 0 && row < this.size && col >= 0 && col < this.size;
};

// update one neighbor for one cell
// will be used in the updateNeighborsForCell to update over everything
Conway.prototype.updateNeighborsForCell =  function (row, col) {
  var cell = this.grid[row][col];
  // reset the amount of neighbors
  cell.neighbors = 0;
  for(var i = 0; i < this.directions.length; i++) {
    var direction = this.directions[i];
    var directionRow = direction[0];
    var directionCol = direction[1];

    // check if in bounds
    if(this.isInBounds(row + directionRow, col + directionCol)) {
      // get neighbor
      var neighbor = this.grid[row + directionRow][col + directionCol];
      if(neighbor.alive) {
        cell.neighbors++;
      }
    }
  }
};

Conway.prototype.updateNeighbors = function () {
  // iterate through the grid
  for(var i  = 0; i < this.size; i++) {
    for(var j = 0; j < this.size; j++) {
      this.updateNeighborsForCell(i, j);
    }
  }
};

// updates the state of the cell
// will becalled by updates to iterate the whole grid
Conway.prototype.updateStateForCell = function(row, col) {
  var cell = this.grid[row][col];
  // kill cell if it's underpopulated or overpopulated
  if(this.isUnderpopulated(row, col) || this.isOverpopulated(row, col)) {
    cell.alive = false;
  } else if(this.isResurrectable(row, col)) {
    cell.alive = true;
  }
};

// update states through out whole grid
Conway.prototype.updateStates = function() {
  // iterate through the grid
  for(var i  = 0; i < this.size; i++) {
    for(var j = 0; j < this.size; j++) {
      this.updateStateForCell(i, j);
    }
  }
};

var conway = new Conway(30);

// the frequency of execution
// what to do and at rate
// 20 milliseconds
var interval = setInterval(function(){
  conway.show();
  conway.updateNeighbors();
  conway.updateStates();
}, 100)
