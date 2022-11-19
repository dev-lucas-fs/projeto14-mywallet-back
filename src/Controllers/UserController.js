const connection = require("../Database");

module.exports = {
  getUser: async (req, res, next) => {
    if (!res.locals.session) return res.sendStatus(400);

    try {
      const db = await connection();

      const user = await db
        .collection("users")
        .findOne({ _id: res.locals.session.userId });

      if (!user) return res.sendStatus(404);

      return res.send({
        email: user.email,
        name: user.name,
      });
    } catch (err) {
      return res.sendStatus(400);
    }
  },
};
