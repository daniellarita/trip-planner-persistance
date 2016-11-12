const express = require('express');
const router = express.Router();
const db=require('../../models/_db')
//
// const Activity = require('../../models/activity');
// const Hotel = require('../models/hotel');
// const Place = require('../models/place');
const Promise = require('bluebird');
const Restaurant = require('../../models/restaurant');

router.get('/hotels', function (req, res, next) {
  var restaurants=[];
  Restaurant.findAll({})
  .then(function(result){
    result.forEach(function(el){
      restaurants.push(el.name)
    })
    res.send(restaurants)
  })
  .catch(next)
  .done()
});



module.exports=router;
