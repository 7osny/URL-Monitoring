/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const configurations = require('../config/config');
const helper = require('../helpers/verifyemail');

const signup = async (req, res) => {
  try {
    const {
      firstName,
      secondName,
      email,
      password,
    } = req.body;
    const userdata = await User.findOne({
      where: {
        email,
      },
    });
    if (userdata) {
      res.status(409).send('Your Email is exist');
    } else {
      const hash = await bcrypt.hash(password, 5);
      const code = Math.ceil((Math.random() * (999999 - 100000) + 100000));
      await User.create({
        firstName,
        secondName,
        email,
        password: hash,
        code,
      });
      const message = helper.verifyEmail(email, `your verification code${code}`, 'verification code');
      res.status(200).send(`user created successfuly ${message}`);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const signin = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const userdata = await User.findOne({
      where: {
        email,
      },
    });
    const token = jwt.sign({
      id: userdata.id,
      email: userdata.email,
    },
    configurations.secretkey, {
      expiresIn: '2 days',
    });
    console.log(token);

    if (userdata) {
      const match = await bcrypt.compare(password, userdata.password);
      if (match) {
        res.status(200).send('login successfuly');
      } else {
        res.status(401).send('invaild password');
      }
    } else {
      res.status(401).send('invaild email');
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const editProfile = async (req, res) => {
  try {
    const {
      firstName,
      secondName,
      password,
    } = req.body;
    console.log(req.user);
    const hash = await bcrypt.hash(password, 5);
    const result = await User.update({
      firstName,
      secondName,
      password: hash,
    }, {
      where: {
        email: req.user.email,
      },
    });
    res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const verify = async (req, res) => {
  try {
    const {
      email,
      code,
    } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user.verified) {
      res.send('user already verified');
    } else if (user.code === code) {
      await User.update({
        verified: true,
      }, {
        where: {
          email,
        },
      });
      res.status(201).send('user verified successfuly');
    } else {
      return res.status(401).send('wrong verification code');
    }
  } catch (error) {
    return res.status(401).send('wrong verification');
  }
};

module.exports = {
  signup,
  signin,
  editProfile,
  verify,
};
