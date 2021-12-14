const express = require("express");
const router = express.Router();
const checkUser = require("../../app/middleware/checkUser");
const PostController = require("../../app/controllers/PostController");

router.post('/:post_id/create', PostController.addComment);
router.delete('/:post_id/:comment_id', PostController.deleteComment);

module.exports = router;
