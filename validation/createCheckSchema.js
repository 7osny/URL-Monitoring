/* eslint-disable linebreak-style */
const Joi = require('joi');

const createCheckSchema = Joi.object({
  checkId: Joi.number().integer().required(),
  name: Joi.string().min(2).max(45),
  url: Joi.string().uri(),
  protocol: Joi.string().valid('HTTP', 'HTTPS', 'TCP'),
  path: Joi.string(),
  port: Joi.number(),
  timeOutInSeconds: Joi.number().integer(),
  interval: Joi.number().integer(),
  threshold: Joi.number().integer(),
  authentication: Joi.string(),
  httpHeaders: Joi.string(),
  assertStatusCode: Joi.number().integer(),
  tags: Joi.array(),
  ignoreSSL: Joi.bool(),
});
module.exports = createCheckSchema;
