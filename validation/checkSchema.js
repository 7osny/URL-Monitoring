/* eslint-disable linebreak-style */
const Joi = require('joi');

const deleteCheck = Joi.object().keys({
  checkId: Joi.number().integer().required(),
});
module.exports = deleteCheck;
