const SignUpSchema = require("../Models/SignUpSchema");

module.exports = async (req, res, next) => {
  const { name, email, password, repeatPassword } = req.body;

  try {
    const validation = await SignUpSchema.validateAsync({
      name,
      email,
      password,
      repeatPassword,
    });
    if (validation.error) return res.sendStatus(422);
    res.locals.data = { name, email, password, repeatPassword };
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
