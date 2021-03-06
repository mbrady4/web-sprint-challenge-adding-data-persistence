const express = require("express");
const projectDB = require("../data/accessHelpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  projectDB
    .getAllProjects()
    .then((projects) => res.status(200).json(projects))
    .catch(() => res.status(500).json({ message: "An error occurred." }));
});

router.get("/:id/resources", (req, res) => {
  projectDB
    .getAllProjectResources(req.params.id)
    .then((resources) => res.status(200).json(resources))
    .catch(() => res.status(500).json({ message: "bad news" }));
});

router.get("/:id/tasks", (req, res) => {
  projectDB
    .getAllProjectTasks(req.params.id)
    .then((tasks) => res.status(200).json(tasks))
    .catch(() => res.status(500).json({ message: "bad news" }));
});

router.post("/", (req, res) => {
  projectObj = {};
  if (!req.body.name) {
    res.status(400).json({ message: "Name is a required field." });
  }
  if (req.body.description) {
    projectObj.description = req.body.description;
  }
  if (req.body.completed) {
    projectObj.completed = req.body.completed;
  }
  projectObj.name = req.body.name;
  projectDB
    .addProject(projectObj)
    .then((newProject) => res.status(201).json(newProject))
    .catch(() => res.status(500).json({ message: "Error occurred." }));
});

module.exports = router;
