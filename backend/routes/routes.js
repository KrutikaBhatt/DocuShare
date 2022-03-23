const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const auth_routes = require('./authentication');
const doc_routes = require('./documents');

router.use('/user', userRoutes);
router.use('/auth',auth_routes);
router.use('/document',doc_routes);
module.exports = router;