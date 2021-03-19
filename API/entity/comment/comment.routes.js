const express = require("express");
const router = express.Router();
const commentCtrl = require("./comment.controller")



router.post("/", commentCtrl.createComment);
router.put("/:id", commentCtrl.modifyComment);
router.delete("/:id", commentCtrl.deleteComment)



module.exports = router;