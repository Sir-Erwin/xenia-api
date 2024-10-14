var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");

const db = require("../database/database")

router.use(express.json());


exports.userAuthHome = (req, res, next) => {
  res.status(403).json({message: "This Route Works", users: db.getAllUsers()});
};

exports.login = async (req, res, next) => {
  const user_email = req.body.email;
  const user_pass = req.body.pass;

  try{
    userFromDB = await db.findUserByEmail(user_email);
    if(!userFromDB){ //username does not exist
      res.status(404).json({ message: 'Wrong Username or Password'});
    }

    else if(await (!bcrypt.compare(user_pass, userFromDB.pass))){ // Wrong Password
      res.status(404).json({ message: 'Wrong Username or Password'});
    }

    else{
      res.status(200).json({message: "Login Successfull", user: user_email })
    }

  } catch(error){
    res.status(500).json({ message: 'Error registering user', error });
    console.log(error);
  }
  


};

exports.register = async (req, res, next) => {
  try{
    //console.log(req.body.pass);
    const hashedPass = await bcrypt.hash(req.body.pass, 10);
    db.createUser({email: req.body.email, pass: hashedPass});
    res.status(201).json({ message: 'User registered successfully', user: req.body.email });
  } catch(error){
    res.status(500).json({ message: 'Error registering user', error });
    console.log(error);
  }
};