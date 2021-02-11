
const configurations = require("../config/config");
const nodemailer = require('nodemailer');

const verifyEmail =  (Email,code)=>{
    const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configurations.email,
      pass: configurations.emailpassword
    },
    
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    },
    });
    
    var mailOptions = {
    from: configurations.email,
    to: Email,
    subject: 'Verification code',
    text: `your verification code is ${code}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('Failed to send Email');
            }
         else {
            console.log('Email sent Successfuly') ;
        }
      });
    }
module.exports = {
        verifyEmail
      };
      