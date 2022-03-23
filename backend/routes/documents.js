const express = require('express');
const router = express.Router();
const document_controller = require('../controller/document.controller');
const upload = require('multer')();

router.post('/', upload.any(),document_controller.createDocument);


module.exports = router;