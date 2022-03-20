const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const auth_routes = require('./authentication');

router.use('/user', userRoutes);
router.use('/auth',auth_routes);
module.exports = router;