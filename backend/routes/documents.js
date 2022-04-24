const express = require('express');
const router = express.Router();
const document_controller = require('../controller/document.controller');

router.post('/',document_controller.createDocument);


module.exports = router;