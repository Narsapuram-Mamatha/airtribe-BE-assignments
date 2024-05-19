const Task = require("../models/Task");
const Team = require("../models/Team");
const User = require("../models/User");
const {
  getAll,
  saveToDatabase,
  isFieldValueTaken,
  getById,
  updateDataToDB,
} = require("../config/databaseUtils");
const mongoose = require("mongoose");
const createTask = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const title = req.body.title;
    const description = req.body.description;
    const dueDate = req.body.dueDate;

    const dateObject = new Date(dueDate);

    const mongoDate = new Date(dateObject.getTime()).toISOString();

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        message: "Title description and Due Date are required fields",
      });
    }

    const newTask = new Task({
      title,
      description,
      completed: false,
      dueDate: mongoDate,
    });
    const saveResult = await saveToDatabase(newTask);
    if (!saveResult) {
      throw new Error("Error saving user");
    }

    return res.status(201).send("Task created");
  } catch (error) {
    console.error("Error creating Task:", error.message);
    return res.status(500).json({ message: "Error creating Task" });
  }
};
const getAllTask = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { title, description, completed } = req.query;

    const query = {};
    if (title) query.title = { $regex: new RegExp(title, "i") };
    if (description)
      query.description = { $regex: new RegExp(description, "i") };
    if (completed !== undefined)
      query.completed = completed === "true" ? true : false;

    const tasks = await Task.find(query);
    return res.status(200).json({ tasksList: tasks });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error while fetching all tasks" });
  }
};
const getTaskById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const taskId = req.params.id;
    const task = await getById(Task, taskId);

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error while fetching the task" });
  }
};
const updateTaskById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const taskId = req.params.id;
    const updateData = req.body;
    if (updateData.comments) {
      if (!updateData.comments.every((comment) => comment.content)) {
        return res
          .status(400)
          .json({ message: "Comment is missing required 'content' field" });
      }
      const task = await getById(Task, taskId);
      const existingComments = task.comments;

      updateData.comments.forEach((newComment) =>
        existingComments.push(newComment)
      );
      updateData.comments = existingComments;
    }
    if (updateData.files) {
      res
        .status(400)
        .json({ message: "Files should npt be uploaded via this api call" });
    }
    if (updateData.teamId) {
      const team = await getById(Team, updateData.teamId);

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
    }
    if (updateData.assignedUsers) {
      for (i in updateData.assignedUsers) {
        const member = await getById(User, updateData.assignedUsers[i]);
        if (!member) {
          return res.status(404).json({message: updateData.assignedUsers[i] + `User Id not found`});
        }
      }
    }
    const updatedTask = await updateDataToDB(Task, taskId, updateData);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ updatedTask });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error while fetching the task" });
  }
};
const markTaskCompleted = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const taskId = req.params.id;
    const updateData = { completed: true };
    const updatedTask = await updateDataToDB(Task, taskId, updateData);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json(updatedTask);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error while fetching the task" });
  }
};

const uploadAttachments = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send("Task not found.");
    }

    files.forEach((file) => {
      const fileUrl = `/uploads/${file.filename}`;
      task.files.push({ fileName: file.filename, url: fileUrl });
    });

    await task.save();
    return res.status(200).send("Files uploaded and task updated.");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createTask,
  getAllTask,
  getTaskById,
  updateTaskById,
  markTaskCompleted,
  uploadAttachments,
};
