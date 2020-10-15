const mongoose = require('mongoose');

const northSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  G7: [String],
  G6: [String],
  G5: [String],
  G4: [String],
  G3: [String],
  G2: [String],
  G1: [String],
  GDB: [String],
  MaDB: [String]
});

module.exports = mongoose.model('North', northSchema);