const SignInSchema = require("../Models/SignInSchema");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validation = await SignInSchema.validateAsync({ email, password });
    if (validation.error) return res.sendStatus(422);
    res.locals.data = { email, password };
    next();
  } catch (err) {
    return res.sendStatus(400);
  }
};
