const db = require('../database/match_database'); // Adjust path to your database module

module.exports = {
    getAllVolunteers: (req, res) => {
        try {
            const volunteers = db.getAllVolunteers();
            res.status(200).json(volunteers);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching volunteers', error });
        }
    },

    getAllEvents: (req, res) => {
        try {
            const events = db.getAllEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching events', error });
        }
    },

    matchVolunteerToEvent: (req, res) => {
        const eventId = parseInt(req.params.eventId, 10); // Get eventId from request params
        try {
            const matchedVolunteers = db.matchVolunteerToEvent(eventId);
            if (matchedVolunteers.length === 0) {
                res.status(404).json({ message: 'No volunteers matched for this event' });
            } else {
                res.status(200).json(matchedVolunteers);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error matching volunteers to event', error });
        }
    }
};