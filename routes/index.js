const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')

router.get('/', async (req, res) => {
  let quotes
  try {
    quotes = await Quote.find()
  } catch {
    books = []
  }
  res.render('index', { quotes: quotes })
})

module.exports = router
