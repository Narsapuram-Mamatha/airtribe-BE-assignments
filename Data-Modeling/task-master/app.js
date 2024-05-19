const express = require("express");
const multer = require('multer');

const { connectDB } = require("../task-master/src/config/db");
const authController = require("../task-master/src/controllers/AuthController");
const userController = require("../task-master/src/controllers/UserController");
const teamController = require("../task-master/src/controllers/TeamController");
const taskController = require("../task-master/src/controllers/TaskController");
require("dotenv").config();

const app = express();
const port = 3000;
const verifyToken = require("./src/authJWT");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

//Authentication Endpoint
app.post("/signup", authController.addUser);
app.get("/login", authController.login);
app.patch("/users/update", verifyToken.verifyUser, userController.updateUser);
app.post("/logout", verifyToken.verifyUser, verifyToken.logout);

//Task
app.post("/users/tasks", verifyToken.verifyUser, taskController.createTask);
app.get("/users/tasks", verifyToken.verifyUser, taskController.getAllTask);
app.get("/users/tasks/:id", verifyToken.verifyUser, taskController.getTaskById);
app.patch("/users/tasks/:id", verifyToken.verifyUser, taskController.updateTaskById);
app.patch("/users/tasks/:id/completed", verifyToken.verifyUser,taskController.markTaskCompleted);
app.patch("/users/tasks/:id/uploads", verifyToken.verifyUser,upload.any(),taskController.uploadAttachments);

//Team
app.post("/users/teams", verifyToken.verifyUser, teamController.createTeam);


app.get("/", (req, res) => {
  return res.status(200).send("Task Master Collaborative project");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
