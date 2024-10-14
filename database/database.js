// database.js - Mock implementation for now
let users = [{ id: 1, email: "test@example.com", pass: "$2b$10$CXSVyLnnQmK8th7/ln6qBOIKfLPW1q.8YBPyKtKxHZiK9.gICXbBm" }]; // Mock in-memory data store

module.exports = {
    getAllUsers: () => {
        return users; // Just for testing
    },

    findUserByEmail: (email) => {
        db = this.getAllUsers();
        return db.find(user => user.email === email);
    },

    createUser: (userData) => {
        db = this.getAllUsers();
        const newUser = {
            id: users.length + 1,
            email: userData.email,
            pass: userData.pass
        };
        users.push(newUser);
        return newUser;
    }
};
