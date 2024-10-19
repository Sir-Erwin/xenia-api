const express = require('express');
const VolunteerMatchController = require('../controllers/VolunteerMatchController');

const router = express.Router();

// Route to match volunteers to a specific event
router.get('/events/:eventId/match', VolunteerMatchController.matchVolunteerToEvent);

module.exports = router;