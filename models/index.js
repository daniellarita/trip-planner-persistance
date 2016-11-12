const db = require('./_db');

const Activity = require('./activity');
const Hotel = require('./hotel');
const Place = require('./place');
const Restaurant = require('./restaurant');
const Day = require('./day');

Activity.belongsTo(Place);
Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Day.belongsTo(Hotel)
Day.belongsToMany(Restaurant, {through: 'day_restaurant'});
// Restaurant.belongsToMany(Day, {through: 'day_restaurant'});

Day.belongsToMany(Activity, {through: 'day_activity'});

module.exports = db;
