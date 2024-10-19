//eventManagement.js
const express = require('express');
const router = express.Router();
const {manage} = require ('../controllers/eventManagementController');

//Route to create Event or update existing Event
router.post('/manage', manage);

module.exports = router;