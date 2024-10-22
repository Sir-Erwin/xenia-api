//database/sendMail.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', //using gmail as it is the most common email service
    auth: {
        user: process.env.email_user, 
        pass: process.env.email_pass,
    }
})

async function sendEmailNotif(nameOfUser,email,event) {
    const emailContents = {
        from: process.env.email_user,
        to: email, 
        subject: 'Thank you for registering for ${event.name}',
        text: 'Hello ${nameOfUser}, You have been successfully registered for ${event.name}, which will be held on ${event.date}',
    };
}

try{
    await transporter.sendMail(emailContents);
    console.log('Email sent to ${email}');
}   catch(error){
    console.error('Error sending the email \nError: ', error);
    throw error;
}

module.exports = {
    sendEmailNotif,
};
