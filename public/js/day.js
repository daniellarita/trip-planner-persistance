'use strict';

// Our Day object will manage all of the given
// attractions for one Day in our itenerary. This is responsible 
// for maintaining a list of attractions, and adding the
// appropriate DOM elements to the page.
//
// Day is a constructor for creating new Day objects
//   var day = new Day({number: 1, hotel {...}, restaurants: [{...}]);
//
// Prototype Functions
//  buildButton():
//    Construct the button for switching to this day
//
//  showButton():
//    Add constructed buton to page
//
//  hideButton():
//    Remove button from page
//
//  show():
//    Set current day info in itinerary
//    Draw any related attractions in Day planner
//
//  hide():
//    Remove any day & attraction info from itinerary
//
//  addAttraction(attraction):
//    Add the given attraction to the day. Day should
//    maintain a list of all attractions and their types.
//    Attraction is "shown" on page once added
//
//  removeAttraction(attraction):
//    Remove the given attraction from the day
//    (this is done by clicking the red "x" next to attraction)
//
//  allAttractions():
//    Returns a list of ALL attractions, regardless of type
//
var Day = (function() {
  var $dayButtons;
  var $dayTitle;

  $(function() { // wait for jQuery onload
    $dayButtons = $('.day-buttons');
    $dayTitle = $('#day-title > span');
  });

  function Day(data) {
    this.number = data.number || 0;
    this.hotel = data.hotel;
    this.restaurants = data.restaurants || [];
    this.activities = data.activities || [];

    this.buildButton().showButton();
  }

  Day.prototype.buildButton = function() {
    this.$button = $('<button class="btn btn-circle day-btn"></button>').text(this.number);

    var self = this;
    this.$button.on('click', function() {
      Trip.switchTo(self);
    });

    return this;
  };

  Day.prototype.showButton = function() {
    this.$button.appendTo($dayButtons);
    return this;
  };

  Day.prototype.hideButton = function() {
    this.$button.detach();
    return this;
  };

  Day.prototype.setNumber = function(number) {
    this.number = number;
    this.$button.text(this.number);
    return this;
  };

  Day.prototype.show = function() {
    $dayTitle.text(`Day ${this.number}`);
    this.allAttractions().forEach(
      (attraction) => attraction.show()
    );
    return this;
  };

  Day.prototype.hide = function() {
    this.allAttractions().forEach(
      (attraction) => attraction.hide()
    );
    return this;
  };

  Day.prototype.addAttraction = function(attraction) {
    switch(attraction.type) {
      case 'hotel':
        if (this.hotel)
          this.hotel.hide();
        this.hotel = attraction;
        break;

      case 'restaurant':
        addUnique(this.restaurants, attraction);
        break;

      case 'activity':
        addUnique(this.activities, attraction);
        break;
    }

    attraction.show();
  };

  Day.prototype.removeAttraction = function(attraction) {
    switch(attraction.type) {
      case 'hotel':
        this.hotel = null;
        break;

      case 'restaurant':
        remove(this.restaurants, attraction);
        break;

      case 'activity':
        remove(this.activities, attraction);
        break;
    }

    attraction.hide();
  };

  Day.prototype.allAttractions = function() {
    return (this.hotel ? [this.hotel] : [])
      .concat(this.restaurants)
      .concat(this.activities);
  };

  return Day;
}());
