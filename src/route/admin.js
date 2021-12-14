const express = require('express');
const router = express.Router()
const AdminController = require('../app/controllers/AdminController');
const checkAdmin = require("../app/middleware/checkAdmin");
const flash = require("../app/middleware/flashMessage");

router.use(checkAdmin);
router.get('/home', AdminController.renderHome)
router.get('/departments', flash, AdminController.renderDepartmentPage)
router.get('/accounts', AdminController.renderMyAccount)
router.post('/createDepartmentAccount', AdminController.createDepartmentAccount)

module.exports = router;
