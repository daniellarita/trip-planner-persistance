'use strict';

// Map module
// This will be the interface, and maange the interactions
// directly with the Map on the page.
//
// Public Functions
//
//  createMarker(type, coords):
//    Create a new marker object from a given attraction
//    type and lat, lng coords
//
//  drawMarker(marker):
//    Draw the given marker on the map
//
//  resetBounds():
//    Reset the zoom for a given set of attractions (from a day)
//    Or back to the default view if no attractions
var Map = (function (){

  var map;
  var bounds = new google.maps.LatLngBounds();

  var defaultOptions = {
    center: new google.maps.LatLng(40.705086, -74.009151), // Fullstack Academy
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  };

  // Create initial map
  $(function initiailzeMap() {
    let mapCanvas = document.getElementById('map-canvas');
    map = new google.maps.Map(mapCanvas, defaultOptions);
  });

  // Adjust map to fit marker
  function extendBounds(marker) {
    bounds.extend(marker.position);
    map.fitBounds(bounds);
  }

  // Adjust view depending on current attractions
  function resetBounds() {
    let currentAttractions = Trip.getAttractions();

    if (currentAttractions.length) {
      let newBounds = new google.maps.LatLngBounds();
      currentAttractions.forEach((attraction) => {
        newBounds.extend(attraction.marker.position);
      });
      map.fitBounds(newBounds);

    } else {
      map.setOptions(defaultOptions);
    }
  }

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  // Create a new marker object for a given type and coord
  function createMarker (type, coords) {
    let latLng = new google.maps.LatLng(coords[0], coords[1]);
    let iconURL = iconURLs[type];
    let marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    return marker;
  }


  // Place a marker on the map
  function drawMarker(marker) {
    marker.setMap(map);
    extendBounds(marker);
  }

  var publicAPI = {
    createMarker: createMarker,
    drawMarker: drawMarker,
    resetBounds: resetBounds
  };

  return publicAPI;
}());

var styleArr = [{
  featureType: 'landscape',
  stylers: [{ saturation: -100 }, { lightness: 60 }]
}, {
  featureType: 'road.local',
  stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
}, {
  featureType: 'transit',
  stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
}, {
  featureType: 'administrative.province',
  stylers: [{ visibility: 'off' }]
}, {
  featureType: 'water',
  stylers: [{ visibility: 'on' }, { lightness: 30 }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.fill',
  stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.stroke',
  stylers: [{ visibility: 'off' }]
}, {
  featureType: 'poi.park',
  elementType: 'geometry.fill',
  stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
}];

