// routes/userManage.js

//User, UpdateUser, GetUser not functioning as there is no DB connection yet

const express = require('express');
const router = express.Router();
const { updateUser, getUsers } = require('../controllers/userController');

// Route to update user data based on username
router.post('/users', updateUser);

// Route to fetch all users
router.get('/users', getUsers);

module.exports = router;
