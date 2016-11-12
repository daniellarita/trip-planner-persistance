// Populate the attraction dropdowns with database info.
//
// Setup event handler for adding an attraction to the current
// day's itinerary.

function initializeOptions() {
  var hotelSelector = $('#hotel-choices');
  var restaurantSelector = $('#restaurant-choices');
  var activitySelector = $('#activity-choices');

  hotelSelector.append(makeOptions(hotels));
  restaurantSelector.append(makeOptions(restaurants));
  activitySelector.append(makeOptions(activities));

  function makeOptions(collection) {
    return collection.map((attraction) => (
      $('<option />', { value: attraction.id, text: attraction.name })
    ));
  }

  $('button[data-action=add]').on('click', (event) => {
    let select = $(event.target).siblings('select');
    let type = select.data('type');
    let id = select.val();

    let attraction = Attractions.find(type, id);
    Trip.addToCurrent(attraction);
    console.log(Trip.currentDay())
    var dayObj=Trip.currentDay();
    $.ajax({
      method:'POST',
      url:'/days/'+dayObj.number,
      data:dayObj,
      processData:false
    })
  });
}

var restaurants, hotels, activities;

$(function() {
  $.ajax({
    method: 'GET',
    url: '/restaurants'
  })
  .then(function(responseData) {
    restaurants = responseData;
    console.log(restaurants);
  })
  .then(function() {
    return $.ajax({
      method: 'GET',
      url: '/hotels'
    });
  })
  .then(function(responseData) {
    hotels = responseData;
    console.log(hotels);
  })
  .then(function() {
    return $.ajax({
      method: 'GET',
      url: '/activities'
    });
  })
  .then(function(responseData) {
    activities = responseData;
    console.log(activities);
  })
  .then(function(){
    return $.get('/days')
  })
  .then(function(result){
    console.log(result)
  })
  .then(Attractions.isReady)
  .then(initializeOptions)
  .then(function() {
    $(Trip.load);
  })
  .then(null, function (errorObj) {
    console.log(errorObj);
  });
});
