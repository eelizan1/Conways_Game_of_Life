// Class that is the main interface

// run on document ready because we want the grid to exist
$(document).ready(function() {

var interval;


var size;
// create grid
var conway;
// put it on the page
// conway.renderGrid();

// get row widthe to center content
// used by the .cell class in style.css
var rowWidth;

init();

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

function startOnce(game) {
  interval = setTimeout(function(){
      game.updateNeighbors();
      game.updateStates();
        timer();
      console.log("Interval count");
    }, 500);
}

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

function timer() {

  var numItems = $('.alive').length;
  $('#alivecount').text("Alive " + numItems);
}

  function init() {
    size = 50;
   // create grid
    conway = new Conway(size);
    // put it on the page
    conway.renderGrid();

    // get row widthe to center content
    // used by the .cell class in style.css
    rowWidth = $('.cell').width() * size;
    $('.row1').width(rowWidth);
      timer();

  }

  /*
    USER EVENTS
  */

  $('.cell').on('click', function(){
    // this refers to the cell that was clicked
    // note, use jquery syntax to make 'this' a jquery object
    console.log('clicked from cell');
    $(this).toggleClass('alive');
      timer();

    // console.log(col + ", " + row);
    // console.log(pos.bottom + ", " + pos.right);

  });

  $('#single').on('click', function(){
      $('.alive').removeClass('alive');
        timer();

   });

 $('#start').on('click', function(){
     timer();
    start(conway);
   });

 $('#stop').on('click', function(){
     timer();
   clearInterval(interval);
    });

 $('#clear').on('click', function(){
  $('.alive').removeClass('alive');
   timer();
    clearInterval(interval);
  });


 $('#one').on('click', function(){
     timer();
  startOnce(conway);
 });

 $('#twentythree').on('click', function(){
     timer();
   console.log("ive been clicked");
  twentythree(conway);
});

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
//       go(conway);
//
//     // // when user hits spacebar - clear the grid
//     // if(e.keyCode === 32) {
//     //   $('.alive').removeClass('alive');
//     //   // stop the time interval which will pause the game
//     //   clearInterval(interval);
//     // }
//   });

});
