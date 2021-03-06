/* eslint-disable linebreak-style */
const nodemailer = require('nodemailer');
const configurations = require('../config/config');

const verifyEmail = async (Email, text, subject) => {
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
    subject,
    text,
  };

  const valid = await transporter.sendMail(mailOptions);
  if (!valid) {
    return 'Failed to send Email';
  }
  return 'Email sent Successfuly';
};
module.exports = {
  verifyEmail,
};
