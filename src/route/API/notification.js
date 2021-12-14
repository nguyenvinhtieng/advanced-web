const express = require("express");
const router = express.Router();
const checkUser = require("../../app/middleware/checkUser");
const PostController = require("../../app/controllers/PostController");
const NotificationController = require('../../app/controllers/NotificationController')

router.get("/", NotificationController.getNotifications);

module.exports = router;