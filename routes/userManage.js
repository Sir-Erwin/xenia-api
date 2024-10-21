//userManage.js

const express = require('express');
const router = express.Router();
const {manage} = require ('../controllers/userManagementController');

//Route to create new Profile or update existing profile
router.post('/manage', manage);

module.exports = router;
