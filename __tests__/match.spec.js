const db = require('../database/voldatabase');

describe('Volunteer Matching Module', () => {
    let initialVolunteers, initialEvents;

    beforeEach(() => {
        // Set up mock data for volunteers and events
        initialVolunteers = [
            { id: 1, name: "Erwin Puthoor Manoj", skills: ['teaching', 'cooking'], availability: 'weekends' },
            { id: 2, name: "Joshua Rodriguez", skills: ['teaching'], availability: 'weekdays' }
        ];

        initialEvents = [
            { id: 1, name: "School", requiredSkills: ['teaching'], time: 'weekdays' },
            { id: 2, name: "Food Bank", requiredSkills: ['cooking'], time: 'weekends' }
        ];

        db.__setMockVolunteers(initialVolunteers);
        db.__setMockEvents(initialEvents);
    });

    test('matchVolunteerToEvent - should return matched volunteer based on skills and availability', () => {
        const matchedVolunteers = db.matchVolunteerToEvent(1); // Matching for event "School"
        expect(matchedVolunteers).toHaveLength(1);
        expect(matchedVolunteers[0].name).toBe("Joshua Rodriguez"); // Should match based on skills and availability
    });
    test('getAllVolunteers - should return all volunteers', () => {
        const volunteers = db.getAllVolunteers();

        expect(volunteers).toHaveLength(2);
        expect(volunteers[0].name).toBe('Erwin Puthoor Manoj');
    });

    test('getAllEvents - should return all events', () => {
        const events = db.getAllEvents();

        expect(events).toHaveLength(2);
        expect(events[0].name).toBe('School');
    });
});