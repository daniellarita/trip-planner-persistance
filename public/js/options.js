// Populate the attraction dropdowns with database info.
//
// Setup event handler for adding an attraction to the current
// day's itinerary.
$(function initializeOptions() {
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
  });
});

