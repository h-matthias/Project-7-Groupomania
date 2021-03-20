const express = require("express");
const router = express.Router();
const commentCtrl = require("./comment.controller")
const auth =require("../../middleware/auth")



router.post("/", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.deleteComment)



module.exports = router;