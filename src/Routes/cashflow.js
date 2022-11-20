const { Router, json } = require("express");
const {
  outflow,
  deposit,
  getAll,
} = require("../Controllers/CashFlowController");
const CashFlowValidation = require("../Middlewares/CashFlowValidation");
const SessionValidation = require("../Middlewares/SessionValidation");
const cors = require("cors");

const router = Router();
router.use(json());
router.use(cors());

router.post("/outflow", SessionValidation, CashFlowValidation, outflow);
router.post("/deposit", SessionValidation, CashFlowValidation, deposit);
router.get("/all", SessionValidation, getAll);

module.exports = router;
