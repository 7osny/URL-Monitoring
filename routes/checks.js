var express = require('express');

const User= require('../models/user');
const checkControler= require('../controllers/checks');
const auth= require('../middleware/auth');
const validation= require('../middleware/validation');
const deleteCheck= require('../validation/deleteCheck');

var router = express.Router();

/* GET */
router.post('/create',checkControler.createCheck);
router.post('/delete',validation(deleteCheck,'body'),checkControler.deleteCheck);
router.post('/run',checkControler.runCheck);
router.get('/test',checkControler.test);

module.exports = router;
