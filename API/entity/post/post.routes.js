const express = require("express");
const router = express.Router();
const postCtrl = require("./post.controller")

const auth = require("../../middleware/auth")
const multer = require("../../middleware/muter-config")

router.get("/", postCtrl.getAllPost);
router.post("/", multer, postCtrl.createPost);
router.put("/:id", multer, postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);

module.exports = router
