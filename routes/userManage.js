//userManage.js

const express = require('express');
const router = express.Router();
const {manage} = require ('../controllers/userManagementController');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const updatedUserProfile = await manage(req.body);
      res.status(201).json({ message: 'Profile updated successfully', data: updatedUserProfile });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
