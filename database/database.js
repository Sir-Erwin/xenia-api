// database.js - Mock implementation for now
let users = []; // Mock in-memory data store

module.exports = {
    findUserByEmail: (email) => {
        return users.find(user => user.email === email);
    },

    createUser: (userData) => {
        const newUser = {
            id: users.length + 1,
            email: userData.email,
            passwrd: userData.hashedPass
        };
        users.push(newUser);
        return newUser;
    },

    getAllUsers: () => {
        return users; // Just for testing
    }
};
