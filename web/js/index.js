var interval;

function go(game) {
  // the frequency of execution
  // what to do and at rate
  // updateNeighbors and updateStates every 1 second
  interval = setInterval(function(){
    game.updateNeighbors();
    game.updateStates();
    console.log("Interval count");
  }, 100)
}

// run on document ready because we want the grid to exist
$(document).ready(function() {
  var size = 10;
 // create grid
  var conway = new Conway(size);
  // put it on the page
  conway.renderGrid();

  // get row widthe to center content
  // used by the .cell class in style.css
  var rowWidth = $('.cell').width() * 40;
  $('.row').width(rowWidth);

  /*
    USER EVENTS
  */

  $('.cell').on('click', function(){
    // this refers to the cell that was clicked
    // note, use jquery syntax to make 'this' a jquery object
    console.log(this);
    $(this).toggleClass('alive');

  });

// start game when user press enter
$(document).on('keypress', function(e){
  // when user presses enter
  if(e.keyCode === 13) {
      go(conway);
    }
    // when user hits spacebar - clear the grid
    if(e.keyCode === 32) {
      $('.alive').removeClass('alive');
      // stop the time interval which will pause the game
      clearInterval(interval);
    }
  });

});
