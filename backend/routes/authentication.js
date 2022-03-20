const express = require('express');
const router = express.Router();
const authentication_controller = require('../controller/authentication');

router.post('/login',authentication_controller.login);
router.post('/register',authentication_controller.registerUser);
router.post('/forgotPassword',authentication_controller.forgotPassword);
router.post('/reset-password',authentication_controller.reset_password);
router.post('/logout',authentication_controller.logout);
module.exports = router;