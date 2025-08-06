import nodemailer from 'nodemailer';
import config from '../config/config';

type EmailData = {
  subject: string;
  message: string;
};

const sendEmail = (emailAddress: string, emailData: EmailData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: config.transporterEmail, // generated ethereal user
      pass: config.transporterPass, // generated ethereal password
    },
  });

  // verify connection configuration
  transporter.verify(function (error) {
    if (error) {
      console.error(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  const mailBody = {
    from: `"TechInsights" <${config.transporterEmail}>`, // sender address
    to: emailAddress, // list of receivers
    subject: emailData.subject, // Subject line
    html: emailData.message, // html body
  };

  const info = transporter.sendMail(mailBody, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email Sent ' + info.response);
    }
  });
  console.log('Message sent: %s', info);
};

export default sendEmail;
