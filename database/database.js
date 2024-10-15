// database.js - Mock implementation for now
let users = [{ id: 1, email: "test@example.com", pass: "$2b$10$CXSVyLnnQmK8th7/ln6qBOIKfLPW1q.8YBPyKtKxHZiK9.gICXbBm" }]; // Mock in-memory data store


const getAllUsers = () => {
    return users; // Just for testing
};


const findUserByEmail = (email) => {
    db = getAllUsers();
    return db.find(user => user.email === email);
};

const createUser = (userData) => {
    db = getAllUsers();
    const newUser = {
        id: users.length + 1,
        email: userData.email,
        pass: userData.pass
    };
    users.push(newUser);
    return newUser;
};

// Helper function to reset the users for test isolation
const __setMockUsers = (newUsers) => {
    users = [...newUsers]; // Reset users
};

module.exports = { getAllUsers, findUserByEmail, createUser, __setMockUsers };
