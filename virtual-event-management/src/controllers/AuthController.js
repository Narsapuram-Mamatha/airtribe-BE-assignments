const userHelper = require('../helpers/UserHelper')
const validators = require('../helpers/validators')
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()
var signup = async (req, res) => {

    const users = await userHelper.getUsers();
    const idNum = users.length + 1;
    const user = new userModel.User(idNum,req.body.name, req.body.email, req.body.password, "user");


    if (validators.validateUserDetails(user)) {
        try {
            
            if (!validators.userExists(users, user.email)) {

                user.setPassword(user.password);
                userHelper.addUser(user);
                return res.status(200).send("Registration successful");


            } else {
                return res.status(400).send("User already exists");
            }
        } catch (error) {
            return res.status(500).send("error while writing");
        }
    } else {
        return res.status(400).send("enter all the details");
    }


}

var login = async (req, res) => {
    var emailPassed = req.body.email;
    var passwordPassed = req.body.password;

    try {
        const users = await userHelper.getUsers();
        const foundUser = users.find(user => user.email === emailPassed);

        if (foundUser) {
            if (bcrypt.compareSync(passwordPassed, foundUser.password))  {
                var token = jwt.sign({
                    id: foundUser.email
                }, process.env.API_SECRET, {
                    expiresIn: 86400
                });

                return res.status(200).json({
                    message: "Login Successful",
                    token: token,
                    email: foundUser.email,
                    role: foundUser.role
                    
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
    signup,
    login,
}




