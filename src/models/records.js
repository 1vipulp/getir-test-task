'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({}, {
  strict: false
})

module.exports = mongoose.model('records', userSchema)