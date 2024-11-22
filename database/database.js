const neo4j = require('neo4j-driver');

// database.js - Mock implementation for now
let users = [{ id: 1, email: "test@example.com", pass: "$2b$10$CXSVyLnnQmK8th7/ln6qBOIKfLPW1q.8YBPyKtKxHZiK9.gICXbBm" }]; // Mock in-memory data store
let events = [{ id: 1, eventName: "Event 1", eventDescrip: "Decription of Event 1", 
    eventLoc: "Location of Event 1", reqSkills: ["Skill 1"], urg: "High", date: "2024-10-18"}];
let profiles = [{id: 1,email:'johndoe@email.com', name: "John Doe", address : "123 Main St.",
                 city: "Houston", zipcode: "12345", state: "TX", skills: "Javascript", availability: "Fridays"}];

const driver = neo4j.driver(
  'neo4j+s://af5f90e0.databases.neo4j.io', 
  neo4j.auth.basic('neo4j', 'hha9PPEvbT4CbXqHA4yYB1CB-zB6XI1dPaVsU9hzb8k')
);


const getAllUsers = async () => {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (u:User) RETURN u');
        const users = result.records.map((record) => record.get('u').properties);
        return (users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }finally {
        await session.close();
    }
};


const findUserByEmail = async (email) => {
    db = await getAllUsers();
    return db.find(user => user.email === email);
};

const createUserCred = async(userData) => {
    const newUser = {
        email: userData.email,
        pass: userData.pass
    };
    
    const session = driver.session();
    try {
        const result = await session.run('CREATE (u:UserCred {email: $email, pass: $pass}) RETURN u', {email: newUser.email, pass: newUser.pass});
        return (result);
    } catch (error) {
        console.error('Error fetching users:', error);
    }finally {
        await session.close();
    }

    return newUser;
};

const getAllEvents = async() => {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (e:Event) RETURN e');
        const events = result.records.map((record) => record.get('e').properties);
        return (events);
    } catch (error) {
        console.error('Error fetching users:', error);
    }finally {
        await session.close();
    }
};

const findEventByNameAndDate = async (eventName, eventDate) => {
    db = await getAllEvents();
    return db.find(event => {event.name === eventName && event.date === eventDate});
};


const createEvent = async (eventData) => {

    const newEvent = {
        skills: eventData.reqSkills, 
        date: eventData.date, 
        urgency: eventData.urg, 
        name: eventData.eventName, 
        desc: eventData.eventDescrip,
        location: eventData.eventLoc
    }
    const session = driver.session();
    try {
        const result = await driver.session().run('CREATE (e:Event {name: $name, desc: $desc, location: $location, skills: $skills, date: $date, urgency: $urgency}) RETURN e', {
            name: newEvent.name,
            desc: newEvent.desc,
            location: newEvent.location,
            skills: newEvent.skills,
            date: newEvent.date,
            urgency: newEvent.urgency
        });
        return (users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }finally {
        await session.close();
    }
};

const updateEvent = async (eventData) => {
    const session = driver.session();
    const newEvent = {
        skills: eventData.reqSkills, 
        date: eventData.date, 
        urgency: eventData.urg, 
        name: eventData.eventName, 
        desc: eventData.eventDescrip,
        location: eventData.eventLoc
    }
    try {
        const result = await session.run('MATCH (e:Event {name: $name, date: $date}) SET e = $eventData RETURN e', {name: newEvent.name, date: newEvent.date, eventData: newEvent});
        return (result);
    } catch (error) {
        console.error('Error fetching users:', error);
    }finally {
        await session.close();
    }
};

// Helper function to reset the users for test isolation
const __setMockUsers = (newUsers) => {
    users = [...newUsers]; // Reset users
};

const createProfile = (profileData) =>{ //creates a profile if there is not one already registered to the entered email
    db = getAllUsers();
    const newProfile = {
        id: users.length + 1,
        email: profileData.email,
        name: profileData.name,
        address : profileData.address,
        city : profileData.city,
        zipcode : profileData.zipcode,
        state : profileData.state,
        skills : profileData.skills,
        availability : profileData.availability
    };
    profiles.push(newProfile);
    return newProfile;
}

const updateProfile = (profileData) => {
  const index = profiles.findIndex((profile) => profile.email === profileData.email);
  if (index !== -1) {
    profiles[index] = { ...profiles[index], ...profileData };
    return profiles[index];
  }
  return null;
};

const findProfileByEmail = (email) => { //checks to see if there is a profile matching the given email
    db = getAllUsers();
    return db.find(profile => profile.email === email);
};

module.exports = { getAllUsers, findUserByEmail, createUserCred, __setMockUsers, findEventByNameAndDate, createEvent, updateEvent, getAllEvents, createProfile, findProfileByEmail, updateProfile };
