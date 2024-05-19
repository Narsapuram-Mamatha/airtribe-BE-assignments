const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const updateUser = async (req, res) => {
  if (!req.user) { 
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userEmail = req.user.email; 

  const { name, password } = req.body; 



  const updateObject = {};
  if (name) {
    updateObject.name = name;
  }
  if (password) {
    updateObject.password = bcrypt.hashSync(password, 8); 
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ email: userEmail }, updateObject, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  
  module.exports = {
    updateUser,
    
  };