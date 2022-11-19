const { Router, json } = require("express");
const { getUser } = require("../Controllers/UserController");
const SessionValidation = require("../Middlewares/SessionValidation");

const router = Router();
router.use(json());

router.get("/user", SessionValidation, getUser);

module.exports = router;
