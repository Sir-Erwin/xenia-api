// controllers/volmatchController.js

const db = require('../database/voldatabase');

jest.mock('../database/voldatabase');

describe('VolunteerMatchController', () => {
    beforeEach(() => {
        db.getAllVolunteers.mockClear();
        db.getAllEvents.mockClear();
        db.matchVolunteerToEvent.mockClear();
    });

    test('getAllVolunteers should return all volunteers', () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        db.getAllVolunteers.mockReturnValue([{ id: 1, name: 'Erwin Puthoor Manoj' }]);

        VolunteerMatchController.getAllVolunteers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Erwin Puthoor Manoj' }]);
    });

    test('matchVolunteerToEvent should return matched volunteers', () => {
        const req = { params: { eventId: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        db.matchVolunteerToEvent.mockReturnValue([{ id: 1, name: 'Joshua Rodriguez' }]);

        VolunteerMatchController.matchVolunteerToEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Joshua Rodriguez' }]);
    });
});