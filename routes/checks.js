const express = require('express');

const checkControler = require('../controllers/checks');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const checkSchecma = require('../validation/checkSchema');
const createCheck = require('../validation/createCheckSchema');

const router = express.Router();

router.post('/create', auth.verifyToken, validation(createCheck, 'body'), checkControler.createCheck);
router.post('/delete', auth.verifyToken, validation(checkSchecma, 'body'), checkControler.deleteCheck);
router.post('/run', auth.verifyToken, validation(checkSchecma, 'body'), checkControler.runCheck);
router.get('/report', auth.verifyToken, validation(checkSchecma, 'body'), checkControler.getReport);
module.exports = router;
