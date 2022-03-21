'use strict'
const userService = require('../services/records')

/**
 * [ This is handler file for fetch records endpoint ]
 * @param {object} req HTTP Express endpoint Request Payload
 * @param {object} res HTTP Express endpoint Response payload
 * @returns object
 */
const fetchRecords = async (req, res) => {
    try {
        const body = req.body
        const response = await userService.fetchRecords(body)
        return res.send({
            code: 0,
            msg: 'Success',
            records: response
        })
    } catch (error) {
        return res.send({
            code: 0,
            msg: error,
            records: []
        })
    }
}

module.exports = {
    fetchRecords
}