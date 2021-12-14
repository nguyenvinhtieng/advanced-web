const express = require("express");
const router = express.Router();
const checkUser = require("../../app/middleware/checkUser");
const PostController = require("../../app/controllers/PostController");
const uploadImage = require("../../app/lib/upload_image");

router.post("/create", PostController.createNewPost);
router.post("/:id", checkUser, PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/", checkUser, PostController.getPosts);


module.exports = router;
