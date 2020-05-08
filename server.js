if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// server
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (e) => console.error(e))
db.once('open', (e) => console.log('Connected to db'))

app.use(express.json())

const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const quotesRouter = require('./routes/quotes')
app.use('/quotes', quotesRouter)

const apiRouter = require('./routes/api')
app.use('/api/quotes', apiRouter)

app.listen(process.env.PORT || 3000, () => console.log('Started, http://localhost:3000'))
