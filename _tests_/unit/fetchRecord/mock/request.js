'use strict'

module.exports = {
  validPayload: {
    "startDate": "2015-06-20",
    "endDate": "2015-06-23",
    "minCount": 5000,
    "maxCount": 5050
  },
  invalidPayload: {
    "endDate": "2015-06-23",
    "minCount": 5000,
    "maxCount": 5050
  }
}