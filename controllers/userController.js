var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");

const db = require("../database/database")

router.use(express.json());


exports.userAuthHome = (req, res, next) => {
  res.status(400);
  res.send("User Controller Works Fine Can Only Make POST Requests");
};

exports.login = (req, res, next) => {
  user_email = req.body.email;
  user_pass = req.body.pass;

  userFromDB = db.findUserByEmail(user_email);
  if(!userFromDB){
    res.status()
    res.send('Wrong Username or Password');
  }
};

exports.register = (req, res, next) => {
  hashedPass = bcrypt.hash(req.body.pass, 10);
  
};