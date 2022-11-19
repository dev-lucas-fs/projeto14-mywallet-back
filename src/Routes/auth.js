const { Router, json } = require("express");
const SignInValidation = require("../Middlewares/SignInValidation");
const SignUpValidation = require("../Middlewares/SignUpValidation");
const { signIn, signUp } = require("../Controllers/AuthController");

const router = Router();
router.use(json());

router.post("/sign-in", SignInValidation, signIn);
router.post("/sign-up", SignUpValidation, signUp);

module.exports = router;
