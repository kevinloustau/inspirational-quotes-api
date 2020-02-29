const express = require('express')
const router = express.Router()

const Quote = require('../models/quote')

//Get all quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find()
    res.json(quotes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Get one
router.get('/:id', getQuote, (req, res) => {
  res.json(res.quote)
})

//Creating One
router.post('/', async (req, res) => {
  const quote = new Quote({
    quote: req.body.quote,
    author: req.body.author,
  })

  try {
    const newQuote = await quote.save()
    res.status(201).json(newQuote)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//Updating One
router.patch('/:id', getQuote, async (req, res) => {
  if (req.body.quote != null) {
    res.quote.quote = req.body.quote
  }

  if (req.body.author != null) {
    res.quote.author = req.body.author
  }

  try {
    const quote = await res.quote.save()
    res.status(201).json(quote)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//Deleting One
router.delete('/:id', getQuote, async (req, res) => {
  try {
    await res.quote.remove()
    res.json({ message: `Delete quote: ${req.params.id}` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//custom middleware
async function getQuote(req, res, next) {
  let quote
  try {
    quote = await Quote.findById(req.params.id)
    if (quote == null) {
      return res.status(404).json({ message: 'Cannot find quote' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  res.quote = quote
  next()
}

module.exports = router
