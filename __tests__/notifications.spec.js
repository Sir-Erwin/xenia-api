//__tests__/notifications.spec.js

const request = require('supertest');
const express = require('express');
const app = express();
const db = require('../database/database'); //imports the db module to be mocked
const router = require('../routes/notifications');//imports the user management route
const emailService = require('../database/sendMail');
app.use(express.json());
app.use('/notifications', router);  

jest.mock('../database/database'); //mocks the database
jest.mock('../database/database', () => ({ //an additional mock for each db function
  findProfileByEmail: jest.fn(),
  findEventByNameAndDate: jest.fn(),
}));
jest.mock('../database/sendMail', () => ({
  sendEmailNotif: jest.fn(),
}));
jest.mock;

describe('Event Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
});

it('Should successfully sign the user up for an event and send a notification email when they sign up', async () =>{
  //mock db function of finding the event
  db.findEventByNameAndDate.mockReturnValue({
    name: 'Event 1',
    date: '2024-10-18',
  });
  //mock the sending of an email
  emailService.sendEmailNotif.mockResolvedValueOnce();

  const response = await request(app)
  .post('/notifications/signup')
  .send({
    nameOfUser: 'John Doe',
    email: 'johndoe@gmail.com',
    eventName: 'Event 1',
  });

  expect(emailService.sendEmailNotif).toHaveBeenCalledWith('johndoe@gmail.com','John Doe', 'Event 1');

  expect(response.statusCode).toBe(200);
  expect(response.text).toBe('Thank you for signing up for the event! \nA confirmation email has been sent');
});

it('Should return a 500 error when email fails to send', async () => {
  // Simulate an error when sending the email
  emailService.sendEmailNotif.mockRejectedValueOnce(new Error('Email failed'));

  const response = await request(app)
    .post('/notifications/signup')
    .send({
      nameOfUser: 'John Doe',
      email: 'johndoe@gmail.com',
      eventName: 'Event 1',
    });

  // Check if the email service was called
  expect(emailService.sendEmailNotif).toHaveBeenCalledWith('johndoe@gmail.com','John Doe', 'Event 1');

  // Assert the correct response
  expect(response.statusCode).toBe(500);
  expect(response.text).toBe('There was an error sending the confirmation email.');
});
});
