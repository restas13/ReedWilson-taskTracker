// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currDate = dayjs().format('MMMM, dddd DD');
var currTime = dayjs().format('H');
var date = $('#currentDay');
var timeslots = $('.container-fluid').children('div');
var buttons = $('.saveBtn');

//console.log(timeslots);
date.text('Today is: ' + currDate);
console.log(currTime);

renderSlots();

for(var i = 1; i < timeslots.length + 1; i++){
  if ((i + 8) < currTime) {
    $('#hour-' + i).removeClass('future');
    $('#hour-' + i).removeClass('present');
    $('#hour-' + i).addClass('past');
  }else if ((i + 8) == currTime) {
    $('#hour-' + i).removeClass('future');
    $('#hour-' + i).removeClass('past');
    $('#hour-' + i).addClass('present');
  }else {
    $('#hour-' + i).removeClass('present');
    $('#hour-' + i).removeClass('past');
    $('#hour-' + i).addClass('future');
  }
}

function saveSlots() {
  for(var i = 1; i < timeslots.length + 1; i++){
    var savedText = $('#hour-' + i).children('.description');

    console.log(savedText);

    if ((i + 8) == currTime) {
      savedText.html(localStorage.getItem('task-' + i));
    }

    localStorage.setItem('task-' + i, savedText.val());   

  }
}

function renderSlots() {
  for(var i = 1; i < timeslots.length + 1; i++){
    var savedText = $('#hour-' + i).children('.description');
    if ((i + 8) == currTime) {
      if (localStorage.getItem('task-' + i) == 'undefined') {
        savedText.html('');
        savedText.html('Current Time \n');
      }else {
        savedText.html('');
        savedText.html('Current Time \n' + localStorage.getItem('task-' + i));
      }

      
    }else {
      if (localStorage.getItem('task-' + i) == 'undefined') {
        savedText.html('');
      }else {
        savedText.html(localStorage.getItem('task-' + i));
      }
      
    }
    
  }
}

$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  });

  buttons.on('click', function(event) {
    event.preventDefault();

    saveSlots();
    renderSlots();
  });
 