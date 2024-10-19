// mockDatabase.js

let users = [];
let events = [];

const User = {
  findOne: jest.fn(email => Promise.resolve(users.find(user => user.email === email))),
  create: jest.fn(data => {
    const newUser = { ...data, events: [] };
    users.push(newUser);
    return Promise.resolve(newUser);
  }),
  find: jest.fn(() => Promise.resolve(users)),
  findById: jest.fn(id => Promise.resolve(users.find(user => user._id === id))),
  update: jest.fn((id, data) => {
    const user = users.find(user => user._id === id);
    if (user) {
      Object.assign(user, data);
      return Promise.resolve(user);
    }
    return Promise.reject(new Error('User not found'));
  }),
  clear: () => {
    users = [];
  },
};

const Event = {
  findById: jest.fn(id => Promise.resolve(events.find(event => event._id === id))),
  create: jest.fn(data => {
    const newEvent = { ...data };
    events.push(newEvent);
    return Promise.resolve(newEvent);
  }),
  clear: () => {
    events = [];
  },
};

module.exports = { User, Event };
