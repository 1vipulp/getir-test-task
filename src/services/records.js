'use strict'
const recordsRepo = require('../repositories/records')
const joi = require('joi')

/**
 * [Request Sanitizer]
 */
const validationSchema = joi.object().keys({
    startDate: joi.string().isoDate().required().messages({
        'any.required': 'StartDate is required',
        'string.isoDate': 'Please enter valid ISO formatted StartDate'
    }),
    endDate: joi.string().isoDate().required().messages({
        'any.required': 'EndDate is required',
        'string.isoDate': 'Please enter valid ISO formatted EndDate'
    }),
    minCount: joi.number().strict().required().messages({
        'any.required': 'Please provide valid minCount'
    }),
    maxCount: joi.number().strict().min(joi.ref('minCount')).required().messages({
        'any.required': 'Please provide valid maxCount',
        'number.min': 'Minimum value of MaxCount should be greater than OR equal to minCount'
    })
})

/**
 * [ This is business logic for fetch records ]
 * @param {object} body incoming request body payload
 * @returns object
 */
const fetchRecords = async (body) => {

    /**
     * 1. Validate incoming request payload using Joi
     * 2. If there is any error, throw appropriate error with user friendly error message.
     * 3. Prepare aggregate query to fetch records based on input received.
     * 4. Return received data from database :)
     */

    const schemaValidateResult = validationSchema.validate(body)
    if (schemaValidateResult && schemaValidateResult.error) {
        throw {
            message: schemaValidateResult.error.message || schemaValidateResult.error.details[0].message
        }
    }

    const aggregateQuery =
        [
            {
                $addFields: {
                    totalCounts: {
                        $sum: '$counts'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalCounts: 1,
                    createdAt: 1,
                    key: 1
                }
            },
            {
                $redact: {
                    $cond: {
                        if: {
                            $and: [
                                { $gte: ["$totalCounts", body.minCount] }, { $lte: ["$totalCounts", body.maxCount] },
                                { $gte: ["$createdAt", new Date(body.startDate)] }, { $lte: ["$createdAt", new Date(body.endDate)] },
                            ]
                        },
                        then: '$$DESCEND',
                        else: '$$PRUNE'
                    }
                }
            }
        ]
    const response = await recordsRepo.aggregate(aggregateQuery)
    return response
}

module.exports = {
    fetchRecords
}