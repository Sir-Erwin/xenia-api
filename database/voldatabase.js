//mock implementation for volunteers and events
let volunteers = [
    { id: 1, name: "Erwin Puthoor Manoj", skills: ['teaching', 'cooking'], availability: 'weekends' },
    { id: 2, name: "Joshua Rodriguez", skills: ['teaching'], availability: 'weekdays' }
];

let events = [
    { id: 1, name: "School", requiredSkills: ['teaching'], time: 'weekdays' },
    { id: 2, name: "Food Bank", requiredSkills: ['cooking'], time: 'weekends' }
];

// Get all volunteers
const getAllVolunteers = () => {
    return volunteers;
};

// Find a volunteer by their ID
const findVolunteerById = (id) => {
    return volunteers.find(volunteer => volunteer.id === id);
};

// Get all events
const getAllEvents = () => {
    return events;
};

// Find an event by its ID
const findEventById = (id) => {
    return events.find(event => event.id === id);
};

// Match volunteers to an event by required skills and availability
const matchVolunteerToEvent = (eventId) => {
    const event = findEventById(eventId);
    if (!event) return [];

    return volunteers.filter(volunteer => {
        const hasRequiredSkills = event.requiredSkills.every(skill => volunteer.skills.includes(skill));
        const isAvailable = volunteer.availability === event.time;
        return hasRequiredSkills && isAvailable;
    });
};

// Helper function to reset the volunteers for test isolation
const __setMockVolunteers = (newVolunteers) => {
    volunteers = [...newVolunteers];
};

// Helper function to reset the events for test isolation
const __setMockEvents = (newEvents) => {
    events = [...newEvents];
};

// Exporting the functions
module.exports = {
    getAllVolunteers,
    findVolunteerById,
    getAllEvents,
    findEventById,
    matchVolunteerToEvent,
    __setMockVolunteers,
    __setMockEvents
};