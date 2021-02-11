const User = require("../models/user");
const db = require("../database/init");
const bcrypt = require("bcrypt");
const configurations = require("../config/config");
const jwt = require("jsonwebtoken");
const helper = require('../helpers/verifyemail');

const signup = async (req, res, next) => {

  try {
    let {
      id,
      firstName,
      secondName,
      email,
      password
    } = req.body;
    const userdata = await User.findOne({
      where: {
        email,
      },
    });
    if (userdata) {
      res.status(409).send("Your Email is exist");
    } else {
      const hash = await bcrypt.hash(password, 5);
      password = hash.toString();
      const code = Math.ceil((Math.random() * (999999 - 100000) + 100000));
      await User.create({
        firstName,
        secondName,
        email,
        password,
        code
      });
      const message = helper.verifyEmail(email, code);
      res.status(200).send(`user created successfuly ${message}`);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const signin = async (req, res, next) => {
  try {
    let {
      email,
      password
    } = req.body;
    const userdata = await User.findOne({
      where: {
        email
      }
    });
    const token = jwt.sign({
        id: userdata.id,
        email: userdata.email,
      },
      configurations.secretkey, {
        expiresIn: "2 days",
      }
    );
    console.log(token);

    if (userdata) {
      const match = await bcrypt.compare(password, userdata.password);
      if (match) {
        res.status(200).send("login successfuly");
      } else {
        res.status(401).send("invaild password");
      }
    } else {
      res.status(401).send("invaild email");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const editProfile = async (req, res, next) => {
  try {
    let {
      firstName,
      secondName,
      password
    } = req.body;
    console.log(req.user);
    const hash = await bcrypt.hash(password, 5);
    password = hash.toString();
    const result = await User.update({
      firstName: firstName,
      secondName: secondName,
      password: password
    }, {
      where: {
        email: req.user.email
      }
    });
    res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const verify = async (req, res, next) => {
  try {
    let {
      email,
      code
    } = req.body;
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (user.verified) {
      res.send('user already verified');
    } else {
      if (user.code === code) {
        const newUser = await User.update({
          verified: true
        }, {
          where: {
            email
          }
        });
        res.status(201).send('user verified successfuly');
      } else {
        return res.status(401).send('wrong verification code');
      }
    }
    1
  } catch (error) {
    return res.status(401).send('wrong verification');
  }
}

module.exports = {
  signup,
  signin,
  editProfile,
  verify
};