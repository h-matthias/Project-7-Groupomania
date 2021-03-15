const express = require("express");
const router = express.Router();
const userCtrl = require ("./user.controller");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete-user", userCtrl.deleteUser)


module.exports = router;