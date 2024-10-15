const request = require('supertest');
const express = require('express');
const authController = require('../controllers/userController');
const db = require('../database/database');

const app = express();
app.use(express.json());
const route = "/users/register";
app.post('/users/register', authController.register);

// Mocking the database
jest.mock('../database/database');


describe("Registration Functionalities", () => {
    const oldMockUser = { email: "test@example.com", pass: "$2b$10$CXSVyLnnQmK8th7/ln6qBOIKfLPW1q.8YBPyKtKxHZiK9.gICXbBm" };
    const newMockUser = { email: "test2@example.com", pass: "password123" }; // client side
    beforeEach(() => {
        db.findUserByEmail.mockResolvedValue(oldMockUser); //mockUser is in the db already
        db.createUser.mockResolvedValue({ email: newMockUser.email, pass: oldMockUser.pass }); //this will be put it
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Missing Req Body args", () => {
        test("No Email", async () => {
            const res = await request(app)
                .post(route)
                .send({ data: "invalid" })
            expect(res.status).toBe(400);
        });
    })

    describe("Email Formatting", () => {
        test("Checks if @ sign exists", async () => {
            const response = await request(app)
                .post(route)
                .send({ email: "invalid_email.com", pass: "passwrd" });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid Email');
        });

        test("Checks for valid mail server domain name", async () => {
            const response = await request(app)
                .post(route)
                .send({ email: "invalid_email@mailserver", pass: "passwrd" });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid Email');
        });

    });

    describe("Registration Process", () => {
        test("Check if Existing Email is rejected", async () => {
            res = await request(app)
                .post(route)
                .send({ email: oldMockUser.email, pass: "randomPassword" });

            expect(res.status).toBe(409);
            expect(res.body.message).toBe("User Exists Already");
        });

        test("Check Status Code for Successful Registration", async () => {
            db.findUserByEmail.mockResolvedValue(null);
            res = await request(app)
                .post(route)
                .send(newMockUser);

            expect(res.status).toBe(201);
        });

        test("Register and Check if email exist", async () => {
            res = await request(app)
                .post(route)
                .send(oldMockUser);

            expect(res.status).toBe(409);
            expect(res.body.message).toBe("User Exists Already");
        });
    });

    describe("Server Error Catching Mechanism", () => {
        test('should return 500 if there is a server error', async () => {
            db.findUserByEmail.mockRejectedValue(new Error('Database error')); // Simulate a DB error

            const response = await request(app)
                .post('/users/register')
                .send(newMockUser);

            expect(response.status).toBe(500);
        });
    })

});

