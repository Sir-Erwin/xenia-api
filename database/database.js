// database.js - Mock implementation for now
let users = [{ id: 1, email: "test@example.com", pass: "$2b$10$CXSVyLnnQmK8th7/ln6qBOIKfLPW1q.8YBPyKtKxHZiK9.gICXbBm" }]; // Mock in-memory data store
let events = [{ id: 1, eventName: "Event 1", eventDescrip: "Decription of Event 1", 
    eventLoc: "Location of Event 1", reqSkills: ["Skill 1"], urg: "High", date: "2024-10-18"}]

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

const getAllEvents = () => {
    return events;  //also only for testing; substituting for database information
};

const findEventByNameAndDate = (eventName, date) => {
    db = getAllEvents();
    return db.find(event => event.eventName === eventName && event.date === date);
};


const createEvent = (eventData) => {
    db = getAllEvents();
    const newEvent = {
        id: events.length+1,
        eventName: eventData.eventName,
        eventDescrip: eventData.eventDescrip,
        eventLoc: eventData.eventLoc,
        reqSkills: eventData.reqSkills,
        urg: eventData.urg,
        date: eventData.date
    }
    events.push(newEvent);
    return newEvent;
};

// Helper function to reset the users for test isolation
const __setMockUsers = (newUsers) => {
    users = [...newUsers]; // Reset users
};

module.exports = { getAllUsers, findUserByEmail, createUser, __setMockUsers, findEventByNameAndDate, createEvent };
