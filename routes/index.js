const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')

router.get('/', async (req, res) => {
  let quotes
  try {
    quotes = await Quote.find().sort({ createdAt: 'desc' }).exec()
  } catch {
    books = []
  }
  res.render('index', { quotes: quotes })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/add', (req, res) => {
  res.render('add')
})

router.get('/doc', (req, res) => {
  res.render('doc')
})

module.exports = router
