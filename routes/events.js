//eventManagement.js
const express = require('express');
const router = express.Router();
const {addEvent, getAllEvents} = require ('../controllers/eventManagementController');

//Route to create Event or update existing Event
router.post('/addEvent', addEvent);

router.get('/allevents', getAllEvents);
module.exports = router;