const express = require('express');
const router = express.Router();
const {manage} = require ('../controllers/eventManagementController');

//Route to create Event or update existing Event
router.post('/event_mgmt_form', manage);

module.exports = router;