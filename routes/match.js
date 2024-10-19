const express = require('express');
const VolunteerMatchController = require('../controllers/matchController');

const router = express.Router();

// Route to get all volunteers
router.get('/volunteers', VolunteerMatchController.getAllVolunteers);

// Route to get all events
router.get('/events', VolunteerMatchController.getAllEvents);

// Route to match volunteers to a specific event
router.get('/events/:eventId/match', VolunteerMatchController.matchVolunteerToEvent);

module.exports = router;