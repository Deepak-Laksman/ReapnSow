const express = require("express");
const { loginHandler, signupHandler} = require("../controller/auth.js");

const router = express.Router();

router.post("/login", loginHandler);
router.post("/register", signupHandler);

module.exports = router;