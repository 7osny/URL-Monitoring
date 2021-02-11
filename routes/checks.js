var express = require('express');

const User= require('../models/user');
const checkControler= require('../controllers/checks');
const auth= require('../middleware/auth');
const validation= require('../middleware/validation');

var router = express.Router();

/* GET */
router.post('/create',auth.verifyToken,checkControler.createCheck);
router.get('/run',checkControler.runCheck);
module.exports = router;
