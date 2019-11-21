const express = require('express');
const controller = require('./controller');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/login', auth.getUser, controller.login);
router.post('/register', auth.register, auth.getUser, controller.login);
router.post('/verify', auth.getToken, auth.verify, controller.verify);

module.exports = router;
