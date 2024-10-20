// routes/notifications.js

const express = require('express');
const { createEvent, registerUserToEvent, getAllEvents } = require('../controllers/notificationController');

const router = express.Router();

// Route to create a new event
router.post('/model/event', createEvent);

// Route to register a user for an event
router.post('/model/event/:eventId/register', registerUserToEvent);

// Route to get all events
router.get('/model/event', getAllEvents);

module.exports = router;
