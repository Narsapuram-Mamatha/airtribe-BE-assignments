const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const revokedTokens = new Set(); 

const verifyUser = async (req, res, next) => {
    
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization;
        
        try {
            if(revokedTokens.has(token)){
                return res.status(400).json({ error: 'Login expired, Login again' });
            }
            const decode = jwt.verify(token, process.env.API_SECRET);
           
            const users = await User.find(); 
            const foundUser = users.find(user => new mongoose.Types.ObjectId(decode.id).equals(user._id));
         
            if (foundUser) {
                req.user = foundUser; 
              
                req.message = `Found user successfully`;
            } else {
                req.user = undefined;
                req.message = `User not found or not authorized`;
            }
        } catch (error) {
            console.error('Error during verification:', error);
            req.user = undefined;
            req.message = `Error during verification: ${error.message}`;
        }

        next();
    } else {
        req.user = undefined;
        req.message = 'Authorization header not found';
        next();
    }
};

var logout = (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader;
    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }
    revokedTokens.add(token);
    res.status(200).json({ message: 'Logout successful' });
  };

module.exports = {
    verifyUser,
    logout,
};