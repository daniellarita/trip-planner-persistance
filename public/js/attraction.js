'use strict';

// The Attraction object will maintain all the data related
// with an attraction (type, name, place),
// handle it's drawing and placement in the dom,
// as well as it's location on the map (marker).
//
// Attraction is a constructor for creating new Attraction objects
//   var attraction = new Attraction('hotel', data);
//
// Prototype Functions
//  buildItineraryItem():
//    Construct and store the button and title for placement in the DOM
//
//  buildMakrer():
//    Construct and store the google maps Marker object for the
//    attraction's place (lat, lng).
//
//  hideButton():
//    Remove button from page
//
//  show():
//    Draw the itinerary item on the page
//    Show the marker on the map
//
//  hide():
//    Remove the itinerary item on the page
//    Remove the marker on the map
//
var Attraction = (function() {
  var $itinerary, $hotel, $restaurants, $activities;

  $(function() {
    $itinerary = $('#itinerary');
    $hotel = $itinerary.find('.list-group[data-type=hotel]');
    $restaurants = $itinerary.find('.list-group[data-type=restaurant]');
    $activities = $itinerary.find('.list-group[data-type=activity]');
  });

  function Attraction(type, data) {
    this.type = type;
    merge(data, this);
    this.buildItineraryItem().buildMarker();
  };

  Attraction.prototype.buildItineraryItem = function() {
    var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');
    var $title = $('<span class="title"></span>').text(this.name);

    this.$itineraryItem = $('<div class="itinerary-item"></div>')
      .append($title)
      .append($button);

    var self = this;
    $button.on('click', function() {
      Trip.removeFromCurrent(self);
    });

    return this;
  };

  Attraction.prototype.buildMarker = function() {
    var place = this.place;
    this.marker = Map.createMarker(this.type, [place.lat, place.lng]);
  };

  Attraction.prototype.show = function() {
    switch (this.type) {
      case 'hotel':
        $hotel.html(this.$itineraryItem);
        break;

      case 'restaurant':
        $restaurants.append(this.$itineraryItem);
        break;

      case 'activity':
        $activities.append(this.$itineraryItem);
        break;
    }
    Map.drawMarker(this.marker);
  };

  Attraction.prototype.hide = function() {
    this.$itineraryItem.detach();
    this.marker.setMap(null);
    Map.resetBounds();
    return this;
  };

  return Attraction;
}());
