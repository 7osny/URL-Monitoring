/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const configurations = require('../config/config');

// eslint-disable-next-line consistent-return
const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      const userdata = jwt.verify(req.token, configurations.secretkey);
      const user = await User.findOne({ where: { userId: userdata.userId } });
      if (!user) {
        res.status(401);
        next();
      } else {
        req.user = user;
        res.status(202).send(userdata);
        next();
      }
    } else {
      res.sendStatus(403);
      next();
    }
  } catch (err) {
    return res.status(500);
  }
};

const verifyemail = (Email, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configurations.email,
      pass: configurations.emailpassword,
    },

    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: configurations.email,
    to: Email,
    subject: 'Verification code',
    text: `your verification code is ${code}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error.message;
    }
    return `Email sent: ${info.response}`;
  });
};
module.exports = {
  verifyToken,
  verifyemail,
};
