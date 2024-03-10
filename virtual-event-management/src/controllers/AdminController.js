const { json } = require('express');
const adminHelper = require('../helpers/AdminHelper');
const userModel = require('../models/User')
const userHelper = require('../helpers/UserHelper')
const validators = require('../helpers/validators')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()
var getOrganizers = async (req, res) => {
  if (req.email) {
    const data = await adminHelper.fetchData();
    const organizers = data.filter(r => r.role === "organizer")
    organizers.forEach(organizer => {
      delete organizer.password;
    });
    if (organizers) {
      return res.status(200).json({ data: organizers });
    } else {
      return res.status(200).send("No data exists for your preferences");
    }
  } else {
    return res.status(401).send(req.message);
  }
};

var addOrganizer = async (req, res) => {
  const user = new userModel.User(req.body.name, req.body.email, req.body.password, "organizer");
  console.log(user);
  if (validators.validateUserDetails(user)) {
    try {
      const users = await userHelper.getUsers();
      if (!validators.userExists(users, user.email)) {

        user.setPassword(user.password);
        adminHelper.addData(user);
        return res.status(200).send("Organizer added successfully");


      } else {
        return res.status(400).send("organizer already exists");
      }
    } catch (error) {
      return res.status(500).send("error while writing");
    }
  } else {
    return res.status(400).send("enter all the details");
  }
}



module.exports = {
  getOrganizers,
  addOrganizer,
  
};