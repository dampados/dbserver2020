const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const staffRouter = require('./routes/staff-router')
const labRouter = require('./routes/lab-router')
const facRouter = require('./routes/fac-router')

const app = express()
const apiPort = 2000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.raw({ inflate: false, limit: '100kb', type: 'text/xml' }))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello, Bogdan')
})

app.use('/api', staffRouter, labRouter, facRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))