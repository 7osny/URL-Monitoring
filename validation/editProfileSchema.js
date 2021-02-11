const Joi = require('joi');

const editProfileSchema = Joi.object({
    firstName: Joi.string().min(2).max(45),
    secondName: Joi.string().min(2).max(45),
    password: Joi.string().min(4).max(45).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})
module.exports = editProfileSchema;
