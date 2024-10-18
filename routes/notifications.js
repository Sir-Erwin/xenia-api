const express = require('express');
const {
  registerUserForEvent,
  notifyUsersAboutEvent,
} = require('../controllers/notificationController');

const router = express.Router();

// Route to register user for an event
router.post('/register', registerUserForEvent);

// Route to notify users about an event
router.post('/notify', notifyUsersAboutEvent);

module.exports = router;
