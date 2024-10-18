const nodemailer = require('nodemailer');
const User = require('../models/User');
const Event = require('../models/Event');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail as the email service 
  auth: {
    user: process.env.EMAIL_USER,  // Your email
    pass: process.env.EMAIL_PASS,   // Your email password or app-specific password
  },
});

// Register user for an event
const registerUserForEvent = async (req, res) => {
  const { email, eventId } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, events: [eventId] });
    } else {
      if (!user.events.includes(eventId)) {
        user.events.push(eventId);
        await user.save();
      }
    }

    return res.status(200).json({ message: 'User registered for event', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error });
  }
};

// Notify users about an event
const notifyUsersAboutEvent = async (req, res) => {
  const { eventId } = req.body;

  try {
    const event = await Event.findById(eventId);
    const users = await User.find({ events: eventId });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    users.forEach(user => {
      // Send notification email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Notification for ${event.name}`,
        text: `You are registered for the event: ${event.name} on ${event.date}.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    });

    return res.status(200).json({ message: 'Notifications sent' });
  } catch (error) {
    return res.status(500).json({ message: 'Error sending notifications', error });
  }
};

module.exports = {
  registerUserForEvent,
  notifyUsersAboutEvent,
};
