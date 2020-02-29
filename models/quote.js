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
})

module.exports = mongoose.model('Quote', quoteSchema)
