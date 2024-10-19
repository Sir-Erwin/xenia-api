// controllers/notificationController.js

const { Event, User } = require('../database/mockDatabase');
const nodemailer = require('nodemailer');

// Create a basic email transporter using nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password', 
  },
});

const sendNotification = (user, event) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: user.email,
    subject: `Event Registration: ${event.title}`,
    text: `Hello ${user.name},\n\nYou have successfully registered for the event: "${event.title}" happening on ${event.date}.\n\nThank you!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const createEvent = (req, res) => {
  const { title, description, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: 'Title and date are required' });
  }

  const newEvent = Event.create({ title, description, date });
  res.status(201).json({ message: 'Event created successfully', event: newEvent });
};

const registerUserToEvent = (req, res) => {
  const { email, name } = req.body;
  const { eventId } = req.params;

  const user = User.findByEmail(email) || User.create({ email, name });

  const event = Event.registerUser(eventId, user);

  if (event) {
    // Send a notification email
    sendNotification(user, event);
    return res.status(200).json({ message: 'User registered successfully', event });
  }

  return res.status(404).json({ message: 'Event not found' });
};

const getAllEvents = (req, res) => {
  const events = Event.findAll();
  res.status(200).json(events);
};

module.exports = {
  createEvent,
  registerUserToEvent,
  getAllEvents,
};

