const connection = require("../Database");

module.exports = {
  outflow: async (req, res, next) => {
    try {
      const db = await connection();

      const cashFlowCollection = db.collection("cashFlow");

      console.log(res.locals.data.type !== "outflow");

      if (!res.locals.data || res.locals.data.type !== "outflow")
        return res.sendStatus(400);

      await cashFlowCollection.insertOne({
        ...res.locals.data,
        userId: res.locals.session.userId,
      });

      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(400);
    }
  },
  deposit: async (req, res, next) => {
    try {
      const db = await connection();

      const cashFlowCollection = db.collection("cashFlow");

      if (
        !res.locals.data ||
        res.locals.data.type !== "deposit" ||
        !res.locals.session
      )
        return res.sendStatus(400);

      await cashFlowCollection.insertOne({
        ...res.locals.data,
        userId: res.locals.session.userId,
      });

      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(400);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const db = await connection();

      const cashFlowCollection = db.collection("cashFlow");

      if (!res.locals.session) return res.sendStatus(400);

      const cashFlows = await cashFlowCollection
        .find(
          {
            userId: res.locals.session.userId,
          },
          {
            projection: {
              value: true,
              description: true,
              type: true,
              _id: false,
            },
          }
        )
        .toArray();

      return res.send(cashFlows);
    } catch (err) {
      return res.sendStatus(400);
    }
  },
};
