const express = require('express');
const controller = require('./controller');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/', auth.getToken, auth.verify, controller.create);

module.exports = router;
