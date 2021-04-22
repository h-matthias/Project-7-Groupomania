const express = require("express");
const router = express.Router();
const userCtrl = require ("./user.controller");
const auth =require("../../middleware/auth");

router.get("/:id", userCtrl.getUser)
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", auth, userCtrl.deleteUser)


module.exports = router;