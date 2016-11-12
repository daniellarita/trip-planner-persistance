const express = require('express');
const router = express.Router();
const db=require('../../models/_db')
//
const Activity = require('../../models/activity');
const Hotel = require('../../models/hotel');
const Place = require('../../models/place');
const Promise = require('bluebird');
const Restaurant = require('../../models/restaurant');
const Days = require('../../models/day');

router.get('/days', function (req, res, next) {
  Days.findAll()
  .then(function(result){
    res.send(result)
  })
});


router.post('/days', function (req, res, next) {
  Days.create({
    day_number:1,
    hotelId:3,
    restaurantId:1
  })
  .then(function(){
    return Days.findAll()
  })
  .then(function(result){
    res.send(result)
  })
});

module.exports=router;
