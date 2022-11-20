const Joi = require("joi");

module.exports = Joi.object({
  value: Joi.number().required().positive(),
  description: Joi.string().required().empty(),
  type: Joi.string().required().valid("outflow", "deposit"),
  date: Joi.date().timestamp().required(),
});
