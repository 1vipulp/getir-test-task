'use strict'

const userRoute = require('./records')

module.exports = (app) => {
    app.use('/v1', userRoute)
}