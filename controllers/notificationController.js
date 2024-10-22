// controllers/notificationController.js

const db = require('../database/database');
const mailService = require('../database/sendMail');

const eventSignUp = async (req, res) => {
  const{nameOfUser, email, eventName} = req.body;

  const eventDetails = db.findEventByNameAndDate(eventName);

  if(!eventDetails){
    return res.status(404).send('Event not found');
  }

  try{
    await mailService.sendEmailNotif(email, nameOfUser, eventName);
    res.status(200).send('Thank you for signing up for the event! \nA confirmation email has been sent');
  }catch (error){
    console.error('Error sending email.', error);
    res.status(500).send('There was an error sending the confirmation email.');
  }
};

module.exports = {
  eventSignUp,
};
