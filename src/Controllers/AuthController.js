const connection = require("../Database");
const bcript = require("bcrypt");
const { v4: uuid } = require("uuid");

module.exports = {
  signUp: async (req, res, next) => {
    const { name, email, password } = res.locals.data;
    try {
      const db = await connection();
      const usersCollection = db.collection("users");

      const user = await usersCollection.findOne({ email });

      if (user) return res.sendStatus(422);

      await usersCollection.insertOne({ name, email, password });

      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(400);
    }
  },
  signIn: async (req, res, next) => {
    const { email, password } = res.locals.data;

    try {
      const db = await connection();
      const usersCollection = db.collection("users");

      const user = await usersCollection.findOne({ email });

      if (!user || !bcript.compare(password, user.password))
        return res.sendStatus(422);

      const sessionsCollection = db.collection("sessions");
      const session = await sessionsCollection.findOne({ userId: user._id });

      if (session) await sessionsCollection.deleteOne({ userId: user._id });

      const token = {
        userId: user._id,
        token: uuid(),
      };

      await sessionsCollection.insertOne(token);

      return res.send({
        token: token.token,
      });
    } catch (err) {
      return res.sendStatus(400);
    }
  },
};
