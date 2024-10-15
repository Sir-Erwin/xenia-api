const request = require('supertest');
const express = require('express');
const authController = require('../controllers/userController');
const db = require('../database/database');

const app = express();
app.use(express.json());
app.post('/users/login', authController.login);

// Mocking the database
jest.mock('../database/database');

describe("Login Page Functionalities", () => {
    const mockUser = { email: "test@example.com", pass: "password123" };
    const mockHashPass = "$2b$10$CXSVyLnnQmK8th7/ln6qBOIKfLPW1q.8YBPyKtKxHZiK9.gICXbBm";
    beforeEach(() => {
        db.findUserByEmail.mockResolvedValue({ email: mockUser.email, pass: mockHashPass });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Missing Req Body args", () => {
        test("No Email", async () => {
            const res = await request(app)
                .post("/users/login")
                .send({ data: "invalid" })
            expect(res.status).toBe(400);
        });
    })

    describe("Email Formatting", () => {
        test("Checks if @ sign exists", async () => {
            const response = await request(app)
                .post("/users/login")
                .send({ email: "invalid_email.com", pass: "will not check for passwrd" });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid Email');
        });

        test("Checks for valid mail server domain name", async () => {
            const response = await request(app)
                .post("/users/login")
                .send({ email: "invalid_email@mailserver", pass: "will not check for passwrd" });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid Email');
        });

    });

    describe("DB Authentication", () => {
        test("New User, Does Not Exists", async () => {
            db.findUserByEmail.mockResolvedValue(null);
            const response = await request(app)
                .post("/users/login")
                .send({ email: "erwin@jk.com", pass: "random password" });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Wrong Username or Password");
        });

        test("Wrong Password, 404", async () => {
            const response = await request(app)
                .post("/users/login")
                .send({ email: mockUser.email, pass: "random password" });

            expect(response.status).toBe(404);
        });

        test("Sends 400 OK if Email and Password is Correct", async () => {
            const response = await request(app)
                .post("/users/login")
                .send(mockUser);

            expect(response.status).toBe(200);
            expect(response.body.user).toBe(mockUser.email);
        });
    })

    describe("Server Error Catching Mechanism", () => {
        test('should return 500 if there is a server error', async () => {
            db.findUserByEmail.mockRejectedValue(new Error('Database error')); // Simulate a DB error

            const response = await request(app)
                .post('/users/login')
                .send(mockUser);

            expect(response.status).toBe(500);
        });
    })
});

app.get('/users', authController.userAuthHome);
describe("GET Request of /users", () => {
    test("Returning Status 403", async () => {
        const res = await request(app)
            .get("/users")
        expect(res.status).toBe(403);
    });
})

