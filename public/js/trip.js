'use strict';

// Our Trip object is the main orchestrator of the application.
// It's in charge of maintaining each day in our itinerary,
// and adding/removing attractions from the currently set day.
//
// Day is a global object for maintaining the state of our application
//   Trip.switchTo(day);
//   Trip.getAttractions();
//   etc..
//
// Public API
//  load():
//    Start the application by creating the first day
//
//  switchDay(day):
//    Change the current day in the trip to the given day
//
//  addToCurrent(attraction):
//    Add the given attraction to the current day's itinerary
//
//  removeFromCurrent(attraction):
//    Remove the given attraction from the current day's itinerary
//
//  getAttractions():
//    Returns a list of all the day's attractions (regardless of type)
//
var Trip = (function() {
  var currentDay;
  var days = [];

  $(function() {
    $('#day-add').on('click', addDay);
    $('#day-remove').on('click', removeDay);
  });

  function addDay() {
    let day = new Day({ number: days.length + 1});
    days.push(day);

    if (days.length == 1) {
      currentDay = day;
    }
    switchTo(day);
  }

  function removeDay() {
    if (days.length === 1) return;

    let index = days.indexOf(currentDay);
    let deleted = days.splice(index, 1)[0];
    let newCurrent = days[index] || days[index-1];

    days.forEach((day, i) => day.setNumber(i + 1));
    switchTo(newCurrent);
    deleted.hideButton();
  }

  function switchTo(day) {
    if (currentDay)
      currentDay.hide();

    currentDay = day;
    currentDay.show();
    Map.resetBounds();
  }

  var publicAPI = {
    load: function() {
      $(addDay);
    },

    switchTo: function(day) {
      switchTo(day);
    },

    addToCurrent: function(attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function(attraction) {
      currentDay.removeAttraction(attraction);
    },

    getAttractions: function() {
      return currentDay.allAttractions();
    }
  };

  return publicAPI;
}());
