const { Router, json } = require("express");
const { getUser } = require("../Controllers/UserController");
const SessionValidation = require("../Middlewares/SessionValidation");
const cors = require("cors");

const router = Router();
router.use(json());
router.use(cors());

router.get("/user", SessionValidation, getUser);

module.exports = router;
