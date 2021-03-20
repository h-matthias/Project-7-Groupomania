const express = require("express");
const router = express.Router();
const postCtrl = require("./post.controller")

const auth = require("../../middleware/auth")
const multer = require("../../middleware/muter-config")

router.get("/", auth, postCtrl.getAllPost);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router
