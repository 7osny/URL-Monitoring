const Joi = require('joi');

const signupSchema = Joi.object({
    firstName: Joi.string().min(2).max(45)
        .required(),
    secondName: Joi.string().min(2).max(45)
        .required(),
    password: Joi.string()
        .min(4).max(45).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        }).required(),
});
module.exports = signupSchema;