const connection = require("../Database");

module.exports = async (req, res, next) => {
  const { user: token } = req.headers;

  if (!token) return res.sendStatus(404);

  try {
    const db = await connection();

    const session = await db.collection("sessions").findOne({ token });

    if (!session) return res.sendStatus(404);

    res.locals.session = session;
    next();
  } catch (err) {
    return res.sendStatus(400);
  }
};
