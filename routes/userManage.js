// routes/userManage.js

const express = require('express');
const { updateUser, getUsers } = require('../controllers/userManagementController');

const router = express.Router();

// Route to update a user by username
router.put('/models/users/:username', updateUser);

// Route to get all users
router.get('/models/users', getUsers);

module.exports = router;
