"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const sendEmail = (emailAddress, emailData) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: config_1.default.transporterEmail, // generated ethereal user
            pass: config_1.default.transporterPass, // generated ethereal password
        },
    });
    // verify connection configuration
    transporter.verify(function (error) {
        if (error) {
            console.error(error);
        }
        else {
            console.log('Server is ready to take our messages');
        }
    });
    const mailBody = {
        from: `"TechInsights" <${config_1.default.transporterEmail}>`, // sender address
        to: emailAddress, // list of receivers
        subject: emailData.subject, // Subject line
        html: emailData.message, // html body
    };
    const info = transporter.sendMail(mailBody, (error, info) => {
        if (error) {
            console.error(error);
        }
        else {
            console.log('Email Sent ' + info.response);
        }
    });
    console.log('Message sent: %s', info);
};
exports.default = sendEmail;
