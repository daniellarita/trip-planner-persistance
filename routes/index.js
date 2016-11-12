const express = require('express');
const router = express.Router();

const Activity = require('../models/activity');
const Hotel = require('../models/hotel');
const Place = require('../models/place');
const Promise = require('bluebird');
const Restaurant = require('../models/restaurant');

router.get('/', function (req, res, next) {

  const findingHotels = Hotel.findAll({
    include: [Place]
  });

  const findingActivities = Activity.findAll({
    include: [Place]
  });

  const findingRestaurants = Restaurant.findAll({
    include: [Place]
  });

  Promise.all([
    findingHotels,
    findingActivities,
    findingRestaurants
  ])
  .spread(function (hotels, activities, restaurants) {
    res.render('index', {
      hotels: hotels,
      activities: activities,
      restaurants: restaurants
    });
  })
  .catch(next);
});

module.exports = router;
