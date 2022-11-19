const CashFlowSchema = require("../Models/CashFlowSchema");

module.exports = async (req, res, next) => {
  const { value, description, type } = req.body;

  try {
    const validation = await CashFlowSchema.validateAsync({
      value,
      description,
      type,
    });
    if (validation.error) return res.sendStatus(422);

    res.locals.data = { value, description, type };
    next();
  } catch (err) {
    return res.sendStatus(400);
  }
};
