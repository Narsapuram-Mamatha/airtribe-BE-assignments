const Team = require("../models/Team");
const User = require("../models/User");
const { saveToDatabase } = require("../config/databaseUtils");
const createTeam = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const membersId = await User.find({
      email: { $in: req.body.members },
    }).select("_id");
    if (req.body.members.length !== membersId.length) {
      return res.status(400).json({ message: "Not all email addresses found" });
    }
    const newTeamData = {
      name: req.body.name,
      description: req.body.description,
      owner: req.user._id,
      members: membersId,
    };
    const newteam = new Team(newTeamData);
    const saveResult = await newteam.save();
    if (!saveResult) {
      throw new Error("Error saving user");
    }

    return res.status(201).send("Team created");
  } catch (error) {
    console.error("Error creating team:", error.message);
    return res.status(500).json({ message: "Error creating team" });
  }
};

const updateTeam = async (req, res) => {};

module.exports = {
  createTeam,
  updateTeam,
};
