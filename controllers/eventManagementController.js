const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../database/database")

router.use(express.json());

/*
validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //console.log(emailRegex.test(email));
  return emailRegex.test(email);
};*/

//either creates new event or updates existing one if Entered event already exists
exports.manage = async (req, res) => {
    const { eventName, eventDescrip, eventLoc, reqSkills, urg, date } = req.body;

    //looks if same event is already created
    const event_curr = db.findEventByNameAndDate();

    try {
        //Given event does not already exist, so we create it
        if(!event_curr){
            db.createEvent({id: events.length+1,
                eventName: eventData.eventName,
                eventDescrip: eventData.eventDescrip,
                eventLoc: eventData.eventLoc,
                reqSkills: eventData.reqSkills,
                urg: eventData.urg,
                date: eventData.date});
            res.status(200).json({ message: 'New event created successfully', Event: eventName });
        }
        else{   //update existing event
            event_curr.eventName = eventName;
            event_curr.eventDescrip = eventDescrip;
            event_curr.eventLoc = eventLoc;
            event_curr.reqSkills = reqSkills;
            event_curr.urg = urg;
            event_curr.date = date;
        }
    } catch(error) {
        res.status(500).json({ message: 'Error Creating/Updating Event', error})
    }
      
};
