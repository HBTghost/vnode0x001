const mongoose = require('mongoose');

const southSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  G8: [Number],
  G7: [Number],
  G6: [Number],
  G5: [Number],
  G4: [Number],
  G3: [Number],
  G2: [Number],
  G1: [Number],
  GDB: [Number]
});

module.exports = mongoose.model('South', southSchema);