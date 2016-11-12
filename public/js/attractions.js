'use strict';

// Attractions maintains a list of all "Attraction" JavaScript objects
// created from the existing database info on the page.
var Attractions = (function() {
  console.log("hello");
  var attractions = {};

  function find(collection, id) {
    return collection.find((item) => item.id === id);
  }

  var publicAPI = {

    isReady: function() {
      attractions = {
        hotels: hotels.map((hotel) => new Attraction('hotel', hotel)),
        restaurants: restaurants.map((restaurant) => new Attraction('restaurant', restaurant)),
        activities: activities.map((activity) => new Attraction('activity', activity))
      }
    },

    find: function(type, id) {
      let intId = parseInt(id);

      switch (type) {
        case 'hotel':
          return find(attractions.hotels, intId);

        case 'restaurant':
          return find(attractions.restaurants, intId);

        case 'activity':
          return find(attractions.activities, intId);
      }
    }
  };

  return publicAPI;
}());
