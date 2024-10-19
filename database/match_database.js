let volunteers = [];
let events = [];

module.exports = {
    __setMockVolunteers: (mockVolunteers) => {
        volunteers = mockVolunteers;
    },
    __setMockEvents: (mockEvents) => {
        events = mockEvents;
    },

    getAllVolunteers: () => {
        return volunteers;
    },

    getAllEvents: () => {
        return events;
    },

    matchVolunteerToEvent: (eventId) => {
        const event = events.find(ev => ev.id === eventId);
        if (!event) return [];

        return volunteers.filter(volunteer => {
            const hasRequiredSkills = event.requiredSkills.every(skill => volunteer.skills.includes(skill));
            const isAvailable = volunteer.availability === event.time;
            return hasRequiredSkills && isAvailable;
        });
    }
};