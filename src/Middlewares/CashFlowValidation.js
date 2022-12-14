const CashFlowSchema = require("../Models/CashFlowSchema");

module.exports = async (req, res, next) => {
  const { value, description, type, date } = req.body;

  try {
    const validation = await CashFlowSchema.validateAsync({
      value,
      description,
      type,
      date,
    });
    if (validation.error) return res.sendStatus(422);

    res.locals.data = { value, description, type, date };
    next();
  } catch (err) {
    return res.sendStatus(400);
  }
};
