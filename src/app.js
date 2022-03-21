'use strict'

require('./config/database')
require('./config/middlewares')
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
app.use(express.json())

require('./routes')(app)

app.listen(port, (err) => {
    if (err) {
        console.log(`Error occurred while listening on port: ${port}`)
    } else {
        console.log(`Service is running on port: ${port}`)
    }
})

module.exports = app
