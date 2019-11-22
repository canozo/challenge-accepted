const express = require('express');
const controller = require('./controller');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/', auth.getToken, auth.verify, controller.create);
router.get('/', auth.getToken, auth.verify, controller.getAll);
router.get('/available', auth.getToken, auth.verify, controller.getAvailable);
router.get('/by/:id', auth.getToken, auth.verify, controller.getBy);
router.get('/takenby/:id', auth.getToken, auth.verify, controller.getTakenBy);

module.exports = router;
