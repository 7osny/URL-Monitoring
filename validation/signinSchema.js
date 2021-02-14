/* eslint-disable linebreak-style */
const Joi = require('joi');

const signinSchema = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net'],
      },
    }).required(),
  password: Joi.string()
    .min(4).max(45)
    .required(),
});
module.exports = signinSchema;
