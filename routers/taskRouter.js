const express = require("express");
const taskDB = require("../data/accessHelpers/taskModel");

const router = express.Router();

router.get("/", (req, res) => {
  taskDB
    .getAllTasks()
    .then((tasks) => res.status(200).json(tasks))
    .catch(() => res.status(500).json({ message: "An error occurred." }));
});

router.post("/", (req, res) => {
  taskObj = {};
  if (!req.body.project_id) {
    res.status(400).json({ message: "Name is a required field." });
  }
  if (req.body.description) {
    taskObj.description = req.body.description;
  }
  if (req.body.notes) {
    taskObj.notes = req.body.notes;
  }
  if (req.body.completed) {
    taskObj.completed = req.body.completed;
  }
  taskObj.project_id = req.body.project_id;
  console.log(taskObj);
  taskDB
    .addTask(taskObj)
    .then((newTask) => res.status(201).json(newTask))
    .catch(() => res.status(500).json({ message: "Error occurred." }));
});

module.exports = router;
