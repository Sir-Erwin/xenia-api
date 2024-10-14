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
