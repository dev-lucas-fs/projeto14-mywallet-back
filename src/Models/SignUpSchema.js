const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required().empty(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  repeatPassword: Joi.ref("password"),
});
