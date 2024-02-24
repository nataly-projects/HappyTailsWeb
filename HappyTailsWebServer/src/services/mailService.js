const nodemailer = require('nodemailer');
const { HT_EMAIL, EMAIL_PASSWORD, EMAIL_SUBJECTS } = require('../utils/config');

  // create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: HT_EMAIL, 
      pass: EMAIL_PASSWORD, 
    },
  });

  async function sendContactEmail(fullName, userEmail, message) {
    
    // email options
    const mailOptions = {
      from: userEmail,
      to: HT_EMAIL, 
      subject: EMAIL_SUBJECTS.CONTACT_US,
      html: `
        <p>New message from: ${fullName}</p>
        <p>Email: ${userEmail}</p>
        <p>The message: ${message}</p>
      `,
    };
  
    // send the email
    await transporter.sendMail(mailOptions);
  }

  async function sendVerificationCodeEmail(email, verificationCode) {
    const mailOptions = {
      from: HT_EMAIL,
      to: email,
      subject: EMAIL_SUBJECTS.PASSWORD_RESET,
      text: `Your verification code is: ${verificationCode}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

  async function sendAdoptRequestEmail(toEmail, message, pet, userReq) {
    const mailOptions = {
      from: HT_EMAIL,
      to: toEmail,
      subject: `${EMAIL_SUBJECTS.ADOPTION_REQUEST} for ${pet}`,
      text: `You've got a new request for adopting ${pet}.\n\nDetails of the requester:\n
      Name: ${userReq.fullName}\n
      Email: ${userReq.email}\n
      Phone: ${userReq.phone}\n\n
      Attached message: ${message}\n\n
      You can review and respond to the request on the website under "Requests."\n
      You have the option to deny or accept the request.\n
      For more details, you can contact the requester at ${userReq.email} or ${userReq.phone}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

  module.exports = { 
    sendContactEmail,
    sendVerificationCodeEmail,
    sendAdoptRequestEmail
};
