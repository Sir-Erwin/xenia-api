//userManage.js
const express = require('express');
const router = express.Router();
const {manage} = require ('../controllers/userManagementController');
router.post('/manage', manage);
module.exports = router;
