var express = require('express');

const User= require('../models/user');
const usercontrol= require('../controllers/users');
const auth= require('../middleware/auth');
const validation= require('../middleware/validation');
const editProfileSchema= require('../validation/editProfileSchema');
const signinSchema= require('../validation/signinSchema');
const signupSchema= require('../validation/signupSchema');
const verifySchema= require('../validation/verifySchema');

var router = express.Router();

/* GET */
router.post('/signup',validation(signupSchema,'body'),usercontrol.signup);
router.post('/signin',validation(signinSchema,'body'),usercontrol.signin);
router.post('/edit',auth.verifyToken,validation(editProfileSchema,'body'),usercontrol.editProfile);
router.post('/verifyemail',validation(verifySchema,'body'),usercontrol.verify);

module.exports = router;
