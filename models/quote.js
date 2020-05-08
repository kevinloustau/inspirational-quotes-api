const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

module.exports = mongoose.model('Quote', quoteSchema)
