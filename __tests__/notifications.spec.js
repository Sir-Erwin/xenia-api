const { registerUserToEvent, createEvent } = require('../controllers/notificationController');
const { Event, User } = require('../database/mockDatabase');
const nodemailer = require('nodemailer');

// Mock nodemailer
jest.mock('nodemailer');

// Set up the mock database
beforeEach(() => {
  Event.clear(); // Clear mock event data before each test
  User.clear();  // Clear mock user data before each test
});

// Mock the email transporter sendMail function
const sendMailMock = jest.fn((mailOptions, callback) => {
  callback(null, { response: 'Email sent' });
});

// Set up the nodemailer mock to return a fake transport object
nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock,
});

describe('Event Controller', () => {

  describe('registerUserToEvent', () => {
    it('should register a user to an event and send a notification email', async () => {
      // Arrange
      const eventData = { title: 'JavaScript Conference', description: 'A JS event', date: '2024-11-15' };
      const newEvent = Event.create(eventData); // Create a mock event

      const req = {
        params: { eventId: newEvent.id },
        body: {
          email: 'user@example.com',
          name: 'John Doe',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Act
      await registerUserToEvent(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        event: {
          id: newEvent.id,
          title: 'JavaScript Conference',
          description: 'A JS event',
          date: '2024-11-15',
          attendees: [{
            id: 1,
            email: 'user@example.com',
            name: 'John Doe',
          }],
        },
      });

      // Verify that the email was sent
      expect(sendMailMock).toHaveBeenCalledTimes(1);
      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'user@example.com',
          subject: `Event Registration: JavaScript Conference`,
          text: expect.stringContaining('You have successfully registered for the event: "JavaScript Conference"'),
        }),
        expect.any(Function)
      );
    });

    it('should return 404 if event does not exist', async () => {
      // Arrange
      const req = {
        params: { eventId: '999' }, // Non-existing event
        body: {
          email: 'user@example.com',
          name: 'John Doe',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Act
      await registerUserToEvent(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });
  });
});

