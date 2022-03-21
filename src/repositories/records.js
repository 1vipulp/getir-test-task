'use strict'
const recordModel = require('../models/records')

module.exports.fetchRecords = async (_conditions = {}, _projection = {}, _options = {}) => {
    const data = await recordModel.find()
    return data
}

module.exports.aggregate = async (condition) => {
    const data = await recordModel.aggregate(condition);
    return data
} 