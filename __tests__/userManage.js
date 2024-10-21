// __tests__/userManage.spec.js

const request = require('supertest');
const express = require('express');
const app = express();
const db = require('../database/database'); //imports the db module to be mocked
const router = require('../routes/userManage');//imports the user management route
app.use(express.json());
app.use('/userManage', router);  

jest.mock('../database/database'); //mocks the database
jest.mock('../database/database', () => ({ //an additional mock for each db function
  findProfileByEmail: jest.fn(),
  createProfile: jest.fn(),
}));

describe('User Profile Management: Create a new profile is there is not an existing profile with the email, or update the profile if there is an existing profile', () => {
  beforeEach(() => {
      jest.clearAllMocks();  // Clear any preexisting mocks
  });

  test('will create a new profile if there is no existing profile based on the provided email', async () => {
      db.findProfileByEmail.mockResolvedValue(null);  // DB mocks that the profile does not exist
      db.createProfile.mockReturnValue({ //Creates a new profile since no existing profile was found
          id: 2,
          email: 'janedoe@email.com',
          name: 'Jane Doe',
          address : '345 Main St',
          city : 'Austin',
          zipcode : '67890',
          state : 'TX',
          skills : 'Python',
          availability : 'Mondays'
      });

      
      const newProfile = { //creates a const of the profile created above
        email: 'janedoe@email.com',
        name: 'Jane Doe',
        address : '345 Main St',
        city : 'Austin',
        zipcode : '67890',
        state : 'TX',
        skills : 'Python',
        availability : 'Mondays'
      };

      const response = await request(app)
          .post('/userManage/manage')  // POST request to /userManage/manage
          .send({newProfile});

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('New profile created successfully');
  });

  test('Will update the users profile if there is found to be a preexisting profile with the matching email', async () => {
      const existingProfile = { //create a const for the existing profile
          id: 1,
          email: 'johndoe@email.com',
          name: 'John Doe',
          address : '123 Main St',
          city : 'Houston',
          zipcode : '12345',
          state : 'TX',
          skills : 'Javascript',
          availability : 'Fridays'
      };

      db.findProfileByEmail.mockReturnValue(existingProfile); //check to see if the existing profile does indeed exist

      const updatedProfile = { //create a const for the new updated profile
        email: 'johnathandoe@email.com',
        name: 'Johnathan Doe',
        address : '12345 Main St',
        city : 'Spring',
        zipcode : '13579',
        state : 'FL',
        skills : 'C++',
        availability : 'Thursdays'
      };

      const response = await request(app)
          .post('/userManage/manage')  // POST request to /userManage/manage
          .send(updatedProfile);

      expect(response.status).toBe(201);//The following lines test to see if the profile correctly updated
      expect(response.body.message).toBe('Existing profile updated successfully');
      expect(existingProfile.email).toBe(updatedProfile.email);
      expect(existingProfile.name).toBe(updatedProfile.name);
      expect(existingProfile.address).toBe(updatedProfile.address);
      expect(existingProfile.city).toBe(updatedProfile.city);
      expect(existingProfile.zipcode).toBe(updatedProfile.zipcode);
      expect(existingProfile.state).toBe(updatedProfile.state);
      expect(existingProfile.skills).toBe(updatedProfile.skills);
      expect(existingProfile.availability).toBe(updatedProfile.availability);
  });

  test('should return 500 if there is an error during creation or update', async () => {
      db.findProfileByEmail.mockRejectedValueOnce(new Error('Database error'));//Mock database function to give an error
      db.createProfile.mockReturnValue({ //profile created using db functions to test error 
        id: 2,
        email: 'janedoe@email.com',
        name: 'Jane Doe',
        address : '345 Main St',
        city : 'Austin',
        zipcode : '67890',
        state : 'TX',
        skills : 'Python',
        availability : 'Mondays'
      });

      const newProfile = { //const profile created to test error
        id: 2,
        email: 'janedoe@email.com',
        name: 'Jane Doe',
        address : '345 Main St',
        city : 'Austin',
        zipcode : '67890',
        state : 'TX',
        skills : 'Python',
        availability : 'Mondays'
      };

      const response = await request(app)
          .post('/userManage/manage')  // POST request to /userManage/manage
          .send(newProfile); // Sends newProfile to the route

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error Creating/Updating Profile');
  });
});
