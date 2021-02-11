const Joi = require('joi');

const verifySchema =  Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        }).required(),
    code: Joi.number()
    .integer()
    .min(100000)
    .max(999999)
    .required()
})
module.exports = verifySchema;