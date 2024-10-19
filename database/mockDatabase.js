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
