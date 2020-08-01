const express = require('express');
const router = express.Router();
const controller = require('../controllers/validate-controller');

router.post('/', controller.validate);

module.exports = router;