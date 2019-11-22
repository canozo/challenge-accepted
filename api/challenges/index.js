const express = require('express');
const controller = require('./controller');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/', auth.getToken, auth.verify, controller.create);
router.get('/', auth.getToken, auth.verify, controller.getAll);
router.get('/available', auth.getToken, auth.verify, controller.getAvailable);
router.get('/by', auth.getToken, auth.verify, controller.getBy);
router.get('/takenby', auth.getToken, auth.verify, controller.getTakenBy);
router.put('/accept', auth.getToken, auth.verify, controller.accept);
router.put('/deny', auth.getToken, auth.verify, controller.deny);

module.exports = router;
