// mockDatabase.js

let users = [];
let events = [];


const User = {
  create: jest.fn(data => {
    const newUser = { id: users.length + 1, ...data };
    users.push(newUser);
    return Promise.resolve(newUser);
  }),
  findByUsername: jest.fn(username => Promise.resolve(users.find(user => user.username === username))),
  update: jest.fn((username, data) => {
    const user = users.find(user => user.username === username);
    if (user) {
      Object.assign(user, data);
      return Promise.resolve(user);
    }
    return Promise.reject(new Error('User not found'));
  }),
  findAll: jest.fn(() => Promise.resolve(users)),
  clear: () => {
    users = [];
  },
};

const Event = {
  create: (data) => {
    const newEvent = { id: events.length + 1, ...data };
    events.push(newEvent);
    return newEvent;
  },
  registerUser: (eventId, user) => {
    const event = events.find(event => event.id === parseInt(eventId));
    if (event) {
      event.attendees = event.attendees || [];
      event.attendees.push(user);
      return event;
    }
    return null;
  },
  findById: (id) => events.find(event => event.id === parseInt(id)),
  findAll: () => events,
};

module.exports = { User, Event };
