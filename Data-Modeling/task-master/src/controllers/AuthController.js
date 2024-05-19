const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const { isFieldValueTaken, saveToDatabase } = require('../config/databaseUtils');

const mongoose = require('mongoose');
require('dotenv').config()


var addUser = async (req, res) => {
 
const {name, email, password} = req.body;

try{
  if(!name || !email || !password){
    return res.status(400).json({error:'Name, email and password are required fields'});
  }

  const emailExists = await isFieldValueTaken(User,'email', email);
  if(emailExists){
    return res.status(400).json({error: 'The email id already exists'});
  }

  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 8) // Hash password before creating user
  });
  console.log(newUser);
  const saveResult = await saveToDatabase(newUser);
    if (!saveResult) {
      throw new Error('Error saving user');
    }

    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating user' });

  }
}

var login1 = async (req, res) => {
   //  var emailPassed = req.body.email;
   //  var passwordPassed = req.body.password;
    try {
        const users = await User.find(); 
        return res.json(users); 
      } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
    
};

var login = async (req, res) => {
  var emailPassed = req.body.email;
  var passwordPassed = req.body.password;

  try {
      const foundUser = await User.findOne({ email: emailPassed });  // More efficient lookup

      if (foundUser) {
          if (bcrypt.compareSync(passwordPassed, foundUser.password)) {
              const token = jwt.sign({
                  id: foundUser._id // Use user ID for authentication
              }, process.env.API_SECRET, {
                  expiresIn: 86400
              });

              return res.status(200).json({
                  message: "Login Successful",
                  token: token
              });
          } else {
              return res.status(401).send("Invalid password");
          }
      } else {
          return res.status(404).send("User not found");
      }
  } catch (err) {
      return res.status(500).send("Error occurred: " + err);
  }
};


module.exports = {
  addUser,
    login,
    
}




