const request = require('supertest');
const express = require('express');
const app = express();
const db = require('../database/database');
const router = require('../routes/eventManagement'); // Replace 'yourRouterFile' with the actual file path

app.use(express.json());
app.use('/events', router);  // Assuming '/events' is the route

jest.mock('../database/database');  // Mock the database module

describe('Event Management - manage function', () => {
    beforeEach(() => {
        jest.clearAllMocks();  // Clear previous mocks
    });

    test('should create a new event when event does not exist', async () => {
        // Mocking the database functions
        db.findEventByNameAndDate.mockReturnValue(undefined);  // Event does not exist
        db.createEvent.mockReturnValue({
            id: 2,
            eventName: 'New Event',
            eventDescrip: 'Description of New Event',
            eventLoc: 'Location of New Event',
            reqSkills: ['Skill A'],
            urg: 'Medium',
            date: '2024-11-01'
        });

        const newEvent = {
            eventName: 'New Event',
            eventDescrip: 'Description of New Event',
            eventLoc: 'Location of New Event',
            reqSkills: ['Skill A'],
            urg: 'Medium',
            date: '2024-11-01'
        };

        const response = await request(app)
            .post('/events/manage')  // POST request to /events/manage
            .send(newEvent);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('New event created successfully');
        expect(db.createEvent).toHaveBeenCalledWith(newEvent);
    });

    test('should update an existing event when event already exists', async () => {
        // Mocking the database functions
        const existingEvent = {
            id: 1,
            eventName: 'Existing Event',
            eventDescrip: 'Old Description',
            eventLoc: 'Old Location',
            reqSkills: ['Skill X'],
            urg: 'Low',
            date: '2024-10-01'
        };

        db.findEventByNameAndDate.mockReturnValue(existingEvent);

        const updatedEvent = {
            eventName: 'Updated Event',
            eventDescrip: 'Updated Description',
            eventLoc: 'Updated Location',
            reqSkills: ['Skill Y'],
            urg: 'High',
            date: '2024-10-01'
        };

        const response = await request(app)
            .post('/events/manage')  // POST request to /events/manage
            .send(updatedEvent);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Existing event updated successfully');
        expect(existingEvent.eventName).toBe(updatedEvent.eventName);
        expect(existingEvent.eventDescrip).toBe(updatedEvent.eventDescrip);
        expect(existingEvent.eventLoc).toBe(updatedEvent.eventLoc);
        expect(existingEvent.reqSkills).toEqual(updatedEvent.reqSkills);
        expect(existingEvent.urg).toBe(updatedEvent.urg);
        expect(existingEvent.date).toBe(updatedEvent.date);
    });

    test('should return 500 if there is an error during creation or update', async () => {
        // Mocking the database functions to throw an error
        db.findEventByNameAndDate.mockImplementation(() => { throw new Error('Database error'); });

        const newEvent = {
            eventName: 'New Event',
            eventDescrip: 'Description of New Event',
            eventLoc: 'Location of New Event',
            reqSkills: ['Skill A'],
            urg: 'Medium',
            date: '2024-11-01'
        };

        const response = await request(app)
            .post('/events/manage')  // POST request to /events/manage
            .send(newEvent);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error Creating/Updating Event');
    });
});
