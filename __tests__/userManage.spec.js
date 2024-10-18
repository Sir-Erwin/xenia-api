// __tests__/userManage.spec.js

const request = require('supertest');
const express = require('express');
const app = require('../server');  // Import your Express app
const User = require('../database/database');  // The DB User model

// Mock the User model
jest.mock('../database/database');

//Mock DB will be replaced with the real DB once implemented

describe('User API with jest.mock for database', () => {
  beforeEach(() => {
    // Clear mock DBs before each test
    jest.clearAllMocks();
  });

  describe('Update user based on username', async () => {
    // Mock findOne mongoose function to return a user
    User.findOne.mockResolvedValue({
      username: 'john_doe',
      name: 'John Doe',
      address: '123 Old Address',
      city: 'Old City',
      zipcode: '00001',
      state: 'Old State',
      skills: ['Node.js'],
      availability: 'Thursdays',
      save: jest.fn().mockResolvedValue(true), // Mock save method
    });

    // Make a POST request to update the user
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'john_doe',
        name: 'John Doe',
        address: '456 New Address',
        city: 'Houston',
        zipcode: '77005',
        state: 'TX',
        skills: ['JavaScript', 'Node.js'],
        availability: 'Fridays',
      });

    // Check response status and body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated successfully');
    expect(response.body.user.address).toBe('456 New Address');
    expect(response.body.user.skills).toContain('JavaScript');
  });

  describe('Return 404 if user not found', async () => {
    // Mock findOne to return null (user not found)
    User.findOne.mockResolvedValue(null);

    // Make a POST request for a non-existing user
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'unknown_user',
        name: 'Unknown User',
      });

    // Check response status and body
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  describe('Fetch all users', async () => {
    // Mock find to return a list of users
    User.find.mockResolvedValue([
      {
        username: 'john_doe',
        name: 'John Doe',
        address: '456 New Address',
        city: 'Houston',
        zipcode: '77005',
        state: 'TX',
        skills: ['JavaScript', 'Node.js'],
        availability: 'Fridays',
      },
      {
        username: 'jane_doe',
        name: 'Jane Doe',
        address: '789 Old Address',
        city: 'Kingwood',
        zipcode: '77345',
        state: 'TX',
        skills: ['Python', 'Django'],
        availability: 'Mondays',
      },
    ]);

    // Make a GET request to fetch all users
    const response = await request(app).get('/api/users');

    // Check response status and body
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].username).toBe('john_doe');
    expect(response.body[1].username).toBe('jane_doe');
  });
});
