const Sequelize = require('sequelize');
const db = require('./_db');

const Day = db.define('day', {
  day_number: Sequelize.INTEGER
});

module.exports = Day;
