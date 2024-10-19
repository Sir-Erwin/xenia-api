//eventManagementController.js
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../database/database")

router.use(express.json());


//either creates new event or updates existing one if Entered event already exists
exports.manage = async (req, res) => {
    // res.status(200).json({message: 'Accessing the funciton - correct pathing'});
    const { eventName, eventDescrip, eventLoc, reqSkills, urg, date } = req.body;

    //looks if same event is already created
    const event_curr = db.findEventByNameAndDate(eventName);

    try {
        //Given event does not already exist, so we create it
        if(!event_curr){
            db.createEvent({id: events.length+1,
                eventName: eventName,
                eventDescrip: eventDescrip,
                eventLoc: eventLoc,
                reqSkills: reqSkills,
                urg: urg,
                date: date});
            res.status(200).json({ message: 'New event created successfully', Event: eventName });
        }
        else{   //update existing event
            event_curr.eventName = eventName;
            event_curr.eventDescrip = eventDescrip;
            event_curr.eventLoc = eventLoc;
            event_curr.reqSkills = reqSkills;
            event_curr.urg = urg;
            event_curr.date = date;
            res.status(201).json({ message: 'Existing event updated successfully'});
        }
    } catch(error) {
        res.status(500).json({ message: 'Error Creating/Updating Event', error})
    }
      
};