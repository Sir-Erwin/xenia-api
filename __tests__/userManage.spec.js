// __tests__/userManage.spec.js

const { User } = require('../database/mockDatabase');
const { updateUser } = require('../controllers/userManagementController');

describe('User Controller', () => {
  beforeEach(() => {
    User.clear(); // Clear the mock user data before each test
  });

  describe('updateUser', () => {
    it('should update user information successfully', async () => {
      // Arrange
      const username = 'johndoe';
      const userData = {
        username: 'johndoe',
        nameofuser: 'John Doe',
        address: '123 Main St',
        city: 'Anytown',
        zipcode: '12345',
        state: 'TX',
        skills: 'Javascript',
        availability: 'Fridays',
      };

      // Simulate user creation
      await User.create(userData);

      const req = {
        params: { username },
        body: {
          username: 'johndoe',
          nameofuser: 'John Doe Updated',
          address: '456 Another St',
          city: 'New City',
          zipcode: '54321',
          state: 'NY',
          skills:'React',
          availability: 'Mondays',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Act
      await updateUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User updated successfully',
        user: {
          username: 'johndoe',
          nameofuser: 'John Doe Updated',
          address: '456 Another St',
          city: 'New City',
          zipcode: '54321',
          state: 'NY',
          skills:'React',
          availability: 'Mondays',
        },
      });
    });

    it('should return 404 if user does not exist', async () => {
      // Arrange
      const req = {
        params: { username: 'nonexistentuser' },
        body: {
          name: 'Nonexistent User',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Act
      await updateUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User not found',
      });
    });
  });
});
