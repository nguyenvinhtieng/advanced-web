const express = require('express');
const router = express.Router()
const UserController = require('../app/controllers/UserController');
const NotificationController = require('../app/controllers/NotificationController');
const checkUser = require("../app/middleware/checkUser");

router.get('/home', checkUser, UserController.renderHome)
router.get('/notify/:id', checkUser, NotificationController.renderDetailNotify)
router.get('/notify', checkUser, NotificationController.renderNotifyPage)
router.get('/notify-departments', checkUser, NotificationController.renderNotifyDepartmentPage)
router.get("/category/:category", checkUser, NotificationController.renderCategoryNotification);
router.get('/user/:id', UserController.renderProfile)
router.post("/update", checkUser, UserController.updateAccount)
module.exports = router;
