var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");

const db = require("../database/database")

router.use(express.json());

validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //console.log(emailRegex.test(email));
  return emailRegex.test(email);
}

exports.getAllUsers = async (req, res, next) => {
  const users = await db.getAllUsers();
  res.status(200).json(users);
}

exports.userAuthHome = (req, res, next) => {
  res.status(403).json({ message: "This Route Works" }); // users: db.getAllUsers() => Only For Debugging
};

exports.login = async (req, res, next) => {
  if (!req || !req.body.email || !req.body.pass) res.status(400).json({ message: "Invalid Request" });
  else if (!validEmail(req.body.email)) res.status(400).json({ message: "Invalid Email" });
  else {
    const user_email = req.body.email;
    const user_pass = req.body.pass;

    try {
      userFromDB = await db.findUserByEmail(user_email);
      if (!userFromDB) { //username does not exist
        res.status(404).json({ message: 'Wrong Username or Password' });
      }

      else if (! await bcrypt.compare(user_pass, userFromDB.pass)) { // Wrong Password
        res.status(404).json({ message: 'Wrong Username or Password' });
      }

      else {
        res.status(200).json({ message: "Login Successfull", user: user_email })
      }

    } catch (error) {
      res.status(500).json({ message: 'Error loging user in', error });
      //console.log(error);
    }
  }
};

exports.register = async (req, res, next) => {
  if (!req || !req.body.email || !req.body.pass) res.status(400).json({ message: "Invalid Request" });
  else if (!validEmail(req.body.email)) res.status(400).json({ message: "Invalid Email" });
  else {
    try {
      userFromDB = await db.findUserByEmail(req.body.email);
      if (userFromDB) { //username exists
        res.status(409).json({ message: 'User Exists Already' });
      }
      else {
        const hashedPass = await bcrypt.hash(req.body.pass, 10);
        db.createUserCred({ email: req.body.email, pass: hashedPass });
        res.status(201).json({ message: 'User registered successfully', user: req.body.email });
      }

    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
      //console.log(error);
    }
  }
};