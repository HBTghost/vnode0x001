const mongoose = require('mongoose');

const lotterySchema = mongoose.Schema({
  region: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Lottery', lotterySchema)