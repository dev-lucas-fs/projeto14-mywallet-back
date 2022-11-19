const express = require("express");
const dotenv = require("dotenv");
const auth = require("./Routes/auth");
const user = require("./Routes/user");
const cashflow = require("./Routes/cashflow");

const app = express();
dotenv.config();

app.use(auth);
app.use(user);
app.use("/cashflow", cashflow);

app.listen(process.env.PORT || 5000, () => {
  console.log("online...");
});
