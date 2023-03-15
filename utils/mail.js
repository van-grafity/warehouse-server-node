const nodemailer = require('nodemailer');
require('dotenv').config();  //import and config dotenv to use .env file for secrets

const serverSupportMail = process.env.EMAIL
const serverSupportPassword = process.env.PASSWORD

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: serverSupportMail,
    pass: serverSupportPassword
  }
});

function sendOtpMail(email, otpCode) {

  var mailOptions = {
    from: 'vanlaserblack@gmail.com',
    to: email,
    subject: 'Souq password assistance',
    text: 'To authenticate, please use the following One Time Password (OTP): \n' + otpCode + '\nDo not share this OTP with anyone.\n Souq takes your account security very seriously.' +
      '\nSouq will never ask you to disclose or varify your Souq password, OTP, credit card, or banking account number'
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


module.exports.sendOtpMail = sendOtpMail;
module.exports.getRandomInt = getRandomInt;



