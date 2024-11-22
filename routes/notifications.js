// routes/notifications.js

const express = require('express');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

// Route to signup for an event
router.post('/signup', notificationController.eventSignUp);


module.exports = router;
