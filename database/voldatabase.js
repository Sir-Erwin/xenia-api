let events = [
    { id: 1, name: "School", requiredSkills: ['teaching'], time: 'weekdays' },
    { id: 2, name: "Food Bank", requiredSkills: ['cooking'], time: 'weekends' }
  ];
  
  // Get event by ID
  const findEventById = (id) => events.find(event => event.id === id);
  
  // Get event by name and date (additional function based on your setup)
  const findEventByNameAndDate = (name, date) => events.find(event => event.name === name && event.date === date);
  
  // Create a new event
  const createEvent = (eventData) => {
    const newEvent = { id: events.length + 1, ...eventData };
    events.push(newEvent);
    return newEvent;
  };
  
  // Update an event (helper function if needed)
  const updateEvent = (id, updatedData) => {
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex !== -1) {
      events[eventIndex] = { ...events[eventIndex], ...updatedData };
      return events[eventIndex];
    }
    return null;
  };
  
  // Export necessary functions
  module.exports = {
    findEventById,
    findEventByNameAndDate,
    createEvent,
    updateEvent
  };