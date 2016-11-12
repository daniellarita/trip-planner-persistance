// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

var Promise = require('bluebird');
var db = require('./models');
var Place = require('./models/place');
var Hotel = require('./models/hotel');
var Restaurant = require('./models/restaurant');
var Activity = require('./models/activity');
var Day = require('./models/day');

var day= [
    {day_number:1, hotelId:1},
    {day_number:2, hotelId:2},
    {day_number:3, hotelId:3},
    {day_number:4, hotelId:4},
    {day_number:5, hotelId:5}
  ]


db.sync({})
.then(function () {
  console.log("now inserting data");
    for (var i=0;i<day.length;i++){
      Day.create(day[i], {
          include: [Hotel]
        });
    }
  })
.then(function () {
  console.log('Finished inserting data');
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
