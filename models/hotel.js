const Sequelize = require('sequelize');
const db = require('./_db');

const Hotel = db.define('hotel', {
  name: Sequelize.STRING,
  num_stars: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 },
    set: function(num) {
      this.setDataValue('num_stars', Math.round(num));
    }
  },
  amenities: Sequelize.STRING
});

module.exports = Hotel;
