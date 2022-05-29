const express = require('express');
const router = express.Router()
const passport = require('passport');
require('../config/passport');
const checkMail = require("../app/middleware/checkMail");
const AccountController = require('../app/controllers/AccountController');
const flash = require("../app/middleware/flashMessage");
const checkUser = require("../app/middleware/checkUser");

router.use(passport.initialize());
router.use(passport.session());

router.get('/login', flash, AccountController.renderLogin)
router.get('/login-google-failure', AccountController.loginGoogleFailure)
router.get('/login-google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login-google-failure' }), AccountController.googleCallBack);
router.get('/check-login-google',/* checkMail,*/ AccountController.loginGoogle, AccountController.createAccountStudent)
router.get('/', AccountController.renderLogin)
router.post('/loginByAccount', AccountController.loginByAccount)
router.get('/logout', AccountController.logOut)
router.post("/change-password", AccountController.changePassword);
module.exports = router;
