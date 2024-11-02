// src/database/database.js
const neo4j = require('neo4j-driver');
require('dotenv').config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const session = driver.session();

// Mock users data
let mockUsers = [];

// Function to set mock users for testing
const __setMockUsers = (users) => {
  mockUsers = users;
};

// Fetch all users
const getAllUsers = async () => {
  // In a real implementation, fetch from Neo4j
  return mockUsers; // Replace this with the actual DB query
};

// Find a user by email
const findUserByEmail = async (email) => {
  // In a real implementation, query Neo4j
  return mockUsers.find(user => user.email === email); // Replace this with actual DB query
};

// Create a new user
const createUser = async (userData) => {
  // In a real implementation, add to Neo4j and return the new user
  const newUser = { id: mockUsers.length + 1, ...userData }; // Generate an ID and return
  mockUsers.push(newUser);
  return newUser; // Replace this with actual DB query
};

// Close the session and driver on application exit
const closeConnection = async () => {
  await session.close();
  await driver.close();
};

module.exports = {
  __setMockUsers,
  getAllUsers,
  findUserByEmail,
  createUser,
  closeConnection,
};