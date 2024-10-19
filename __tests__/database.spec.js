const db = require('../database/database'); // Adjust the path as per your project

describe('Database Module', () => {
    let initialUsers;

    beforeEach(() => {
        // Reset the users array before each test to ensure isolation
        initialUsers = [
            { id: 1, email: "test@example.com", pass: "$2b$10$CXSVyLnnQmK8th7/ln6qBOIKfLPW1q.8YBPyKtKxHZiK9.gICXbBm" }
        ];
        db.__setMockUsers(initialUsers); // Using a helper to reset mock data in the db
    });

    test('getAllUsers - should return all users', () => {
        const users = db.getAllUsers();

        expect(users).toHaveLength(1);
        expect(users[0].email).toBe('test@example.com');
    });

    test('findUserByEmail - should return a user by email', () => {
        const user = db.findUserByEmail('test@example.com');

        expect(user).toBeDefined();
        expect(user.email).toBe('test@example.com');
    });

    test('findUserByEmail - should return undefined if user does not exist', () => {
        const user = db.findUserByEmail('nonexistent@example.com');

        expect(user).toBeUndefined();
    });

    test('createUser - should add a new user', () => {
        const newUser = { email: 'new@example.com', pass: 'hashedpass123' };

        const createdUser = db.createUser(newUser);
        const allUsers = db.getAllUsers();

        // Check that a new user is created
        expect(createdUser).toBeDefined();
        expect(createdUser.email).toBe('new@example.com');
        expect(createdUser.id).toBe(2);

        // Check that the user count increased
        expect(allUsers).toHaveLength(2);
        expect(allUsers[1].email).toBe('new@example.com');
    });
});

//Tests for Event related functions
describe('Database Tests - Events', () => {
    beforeEach(() => {
        // Reset mock events before each test
        events = [{
            id: 1,
            eventName: "Event 1",
            eventDescrip: "Description of Event 1",
            eventLoc: "Location of Event 1",
            reqSkills: ["Skill 1"],
            urg: "High",
            date: "2024-10-18"
        }];
    });

    test('getAllEvents should return all events', () => {
        const allEvents = db.getAllEvents();
        expect(allEvents.length).toBe(1);
        expect(allEvents[0].eventName).toBe("Event 1");
    });

    test('findEventByNameAndDate should return event if it matches name and date', () => {
        const event = db.findEventByNameAndDate("Event 1", "2024-10-18");
        expect(event).toBeDefined();
        expect(event.eventName).toBe("Event 1");
    });

    test('findEventByNameAndDate should return undefined if no event matches', () => {
        const event = db.findEventByNameAndDate("Nonexistent Event", "2024-10-18");
        expect(event).toBeUndefined();
    });

    test('createEvent should add a new event', () => {
        const newEvent = {
            eventName: "Event 2",
            eventDescrip: "Description of Event 2",
            eventLoc: "Location of Event 2",
            reqSkills: ["Skill 2"],
            urg: "Medium",
            date: "2024-11-01"
        };
        const createdEvent = db.createEvent(newEvent);

        expect(createdEvent).toBeDefined();
        expect(createdEvent.id).toBe(2);
        expect(createdEvent.eventName).toBe("Event 2");

        const allEvents = db.getAllEvents();
        expect(allEvents.length).toBe(2);
    });
});