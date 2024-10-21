// controllers/userController.js

const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../database/database");

//either creates new profile or updates existing profile if one already exists with a matching email
exports.manage = async (req, res) => {
  // res.status(200).json({message: 'Accessing the funciton - correct pathing'});
  const { email, name, address, city, zipcode, state, skills, availability } = req.body;

  try {
      //looks if same event is already created
      existingProfile = await db.findProfileByEmail(email);

      //If this profile does not currently exist we create a new one
      if(!existingProfile){
          // res.status(205).json({ messgae: 'entered if statement properly'});
          db.createProfile({
             email : email,
             name : name,
             address : address,
             city : city,
             zipcode : zipcode,
             state : state,
             skills : skills,
             availability : availability
            });
          res.status(200).json({ message: 'New profile created successfully', Profile: email });
      }
      else{   //update existing profile, if email matches
        existingProfile.email = email;
        existingProfile.name = name;
        existingProfile.address = address;
        existingProfile.city = city;
        existingProfile.zipcode = zipcode;
        existingProfile.state = state;
        existingProfile.skills = skills;
        existingProfile.availability = availability;
        res.status(201).json({ message: 'Existing profile updated successfully'});
      }
  } catch(error) {
      res.status(500).json({ message: 'Error Creating/Updating Profile', error})
  }
    
};
