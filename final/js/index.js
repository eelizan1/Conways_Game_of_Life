/*
  THE MAIN CLASS OF THE APPLICATION
  ACTS AS THE INTERFACE
  EVENT HANDLING AND DOM MANIPULATION
*/

// run on document ready because we want the grid to exist
$(document).ready(function() {

var interval;
var size;
var grid;
var rowWidth;

// to inialize and restart the game
init();

// to one run the game indefinitly
function start(game) {
  // the frequency of execution
  // what to do and at rate
  // updateNeighbors and updateStates every 1 second
  interval = setInterval(function(){
      game.updateNeighbors();
      game.updateStates();
      timer();
      console.log("Interval count");
    }, 10);
}

// to one run through one iteration
function startOnce(game) {
  interval = setTimeout(function(){
      game.updateNeighbors();
      game.updateStates();
        timer();
      console.log("Interval count");
    }, 500);
}

// to cycle through 23 iterations
function twentythree(game) {
  var amount = 0;
  interval = setInterval(function () {
    game.updateNeighbors();
    game.updateStates();
      timer();
    console.log("Interval count from 23");
      amount++;
      if(amount === 23) {
          clearInterval(interval);
      }
    }, 10);
}

// all function button will call the timer
// because they will be restarting the count of the number of alive cells
function timer() {
  var numItems = $('.alive').length;
  $('#alivecount').text("Alive " + numItems);
}

// to initialize the game
// all the variables to start the game will be initialized here 
  function init() {
    size = 50;
   // create grid
    grid = new Grid(size);
    // put it on the page
    grid.renderGrid();

    // get row widthe to center content
    // used by the .cell class in style.css
    rowWidth = $('.cell').width() * size;
    $('.row1').width(rowWidth);
    timer();
  }

  /*
    USER EVENTS AND DOM MANIPULATION
  */

  // to single click a cell and change it's state
  $('.cell').on('click', function(){
    // this refers to the cell that was clicked
    // note, use jquery syntax to make 'this' a jquery object
    console.log('clicked from cell');
    $(this).toggleClass('alive');
      timer();

    // console.log(col + ", " + row);
    // console.log(pos.bottom + ", " + pos.right);

  });

  // to initiate single click mode
  $('#single').on('click', function(){
    // clears the board changing all alive cells to dead
      $('.alive').removeClass('alive');
        timer();
   });

 // to start the game and play indefinitly
 $('#start').on('click', function(){
     timer();
    start(grid);
   });

// to pause the game
 $('#stop').on('click', function(){
     timer();
   clearInterval(interval);
    });

 // to clear the game
 $('#clear').on('click', function(){
  $('.alive').removeClass('alive');
   timer();
    clearInterval(interval);
  });

// to run through one iteration of the game
 $('#one').on('click', function(){
     timer();
  startOnce(grid);
 });

// to run through 23 iterations of the game
 $('#twentythree').on('click', function(){
     timer();
   console.log("ive been clicked");
  twentythree(grid);
});

// to restart the game
// calls init()
$("#restart").click(function() {
    timer();
  $('#grid').empty();
        init();
});


// $('#block').on('click', function(){
//   generateBlock();
//
// });


// start game when user press enter
// $(document).on('click', '.btn btn-success', function(){
//
//       go(grid);
//
//     // // when user hits spacebar - clear the grid
//     // if(e.keyCode === 32) {
//     //   $('.alive').removeClass('alive');
//     //   // stop the time interval which will pause the game
//     //   clearInterval(interval);
//     // }
//   });

});
