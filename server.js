require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', e => console.error(e))
db.once('open', e => console.log('Connected to db'))

app.use(express.json())

const quotesRouter = require('./routes/quotes')
app.use('/quotes', quotesRouter)

app.listen(3000, () => console.log('Started'))
