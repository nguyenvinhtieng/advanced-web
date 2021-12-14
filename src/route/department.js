const express = require('express');
const router = express.Router()
const checkDepartment = require("../app/middleware/checkDepartment");
const DepartmentController = require('../app/controllers/DepartmentController');
const NotificationController = require('../app/controllers/NotificationController')

router.use(checkDepartment);
router.get('/home', DepartmentController.renderHome)
router.get('/notify/:id', DepartmentController.renderDetailNotify)
router.get('/notify', DepartmentController.renderNotifyPage)
router.post('/createNotify', NotificationController.createNotify)
router.post('/notify/:id', NotificationController.updateNotify)
router.delete('/notify/:id', NotificationController.deleteNotify)

module.exports = router;
