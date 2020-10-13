const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscribeToChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: new Date()
  }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)