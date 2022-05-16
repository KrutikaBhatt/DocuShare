const express = require('express');
const router = express.Router();
const document_controller = require('../controller/document.controller');

router.post('/',document_controller.createDocument);
router.post('/send',document_controller.sendEnvelopeUsingEmbeddedSending);

module.exports = router;