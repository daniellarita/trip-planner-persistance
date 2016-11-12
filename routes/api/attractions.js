const express = require('express');
const router = express.Router();
const db=require('../../models/_db')
//
const Activity = require('../../models/activity');
const Hotel = require('../../models/hotel');
const Place = require('../../models/place');
const Promise = require('bluebird');
const Restaurant = require('../../models/restaurant');

router.get('/hotels', function (req, res, next) {
  var hotels=[];
  Hotel.findAll({
    include: [{model: Place, required: true}]
  })
  .then(function(result){
    // console.log(result);
    result.forEach(function(el){
      hotels.push(el);
    })
    res.send(hotels);
  })
  .catch(next)
  .done()
});

router.get('/restaurants', function (req, res, next) {
  var restaurants=[];
  Restaurant.findAll({
    include: [{model: Place, required: true}]
  })
  .then(function(result){
    // console.log(result);
    result.forEach(function(el){
      restaurants.push(el);
    })
    res.send(restaurants);
  })
  .catch(next)
  .done()
});

router.get('/activities', function (req, res, next) {
  var activities=[];
  Activity.findAll({
    include: [{model: Place, required: true}]
  })
  .then(function(result){
    // console.log(result);
    result.forEach(function(el){
      activities.push(el);
    })
    res.send(activities);
  })
  .catch(next)
  .done()
});

module.exports=router;
