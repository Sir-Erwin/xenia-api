const request = require('supertest');
const express = require('express');
const notificationRoutes = require('../routes/notificationRoutes');
const { User, Event } = require('../database');

const app = express();
app.use(express.json());
app.use('/api', notificationRoutes);

describe('Notification Controller with Mock DB', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
    User.clear(); // Clear the mock user data
    Event.clear(); // Clear the mock event data
  });

  describe('POST /api/register', () => {
    it('should register a new user for an event', async () => {
      const mockEventId = '605c72ef1e8a2e45a01e0f69'; // Example event ID
      Event.create({ _id: mockEventId, name: 'Sample Event', date: '2024-01-01' }); // Create a mock event

      const response = await request(app)
        .post('/api/register')
        .send({ email: 'user@example.com', eventId: mockEventId });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User registered for event');
      expect(User.create).toHaveBeenCalledWith({ email: 'user@example.com', events: [mockEventId] });
    });

    it('should add an existing user to an event', async () => {
      const mockEventId = '605c72ef1e8a2e45a01e0f69'; // Example event ID
      Event.create({ _id: mockEventId, name: 'Sample Event', date: '2024-01-01' }); // Create a mock event
      User.create({ email: 'user@example.com', events: [] }); // Create a mock user

      const response = await request(app)
        .post('/api/register')
        .send({ email: 'user@example.com', eventId: mockEventId });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User registered for event');
      expect(User.findOne).toHaveBeenCalled(); // Ensure findOne was called
    });

    it('should return 500 on error', async () => {
      User.findOne.mockImplementationOnce(() => Promise.reject(new Error('Database error')));

      const response = await request(app)
        .post('/api/register')
        .send({ email: 'user@example.com', eventId: 'some_event_id' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error registering user');
    });
  });

  describe('POST /api/notify', () => {
    it('should notify users about an event', async () => {
      const mockEventId = '605c72ef1e8a2e45a01e0f69'; // Example event ID
      const event = await Event.create({ _id: mockEventId, name: 'Sample Event', date: '2024-01-01' });
      await User.create({ email: 'user@example.com', events: [mockEventId] }); // Register user for the event

      const nodemailer = require('nodemailer');
      const sendMailMock = jest.fn();
      nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: sendMailMock,
      });

      const response = await request(app)
        .post('/api/notify')
        .send({ eventId: mockEventId });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Notifications sent');
      expect(sendMailMock).toHaveBeenCalledTimes(1); // Ensure sendMail was called once
    });

    it('should return 404 if the event is not found', async () => {
      const response = await request(app)
        .post('/api/notify')
        .send({ eventId: 'invalid_event_id' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Event not found');
    });

    it('should return 500 on error', async () => {
      Event.findById.mockImplementationOnce(() => Promise.reject(new Error('Database error')));

      const response = await request(app)
        .post('/api/notify')
        .send({ eventId: 'some_event_id' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error sending notifications');
    });
  });
});
