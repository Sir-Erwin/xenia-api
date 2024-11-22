//eventManagementController.js
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../database/database")

router.use(express.json());


//either creates new event or updates existing one if Entered event already exists
exports.addEvent = async (req, res) => {
    // res.status(200).json({message: 'Accessing the funciton - correct pathing'});
    const { eventName, eventDescrip, eventLoc, reqSkills, urg, date } = req.body;

    try {
        //looks if same event is already created
        event_curr = await db.findEventByNameAndDate(eventName, date);

        //Given event does not already exist, so we create it
        if(!event_curr){
            await db.createEvent(req.body);
            res.status(201).json({ message: 'New event created successfully'});
        }
        else{   //update existing event
            res.status(400).json({ message: 'Bad Request: Event already exists and cannot be updated' });
        }
    } catch(error) {
        res.status(500).json({ message: 'Error Creating/Updating Event', error})
    }
      
};

exports.getAllEvents = async (req, res) => {
    const events = await db.getAllEvents();
    res.status(200).json(events);
};
