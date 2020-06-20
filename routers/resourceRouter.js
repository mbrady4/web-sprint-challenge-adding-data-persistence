const express = require("express");
const resourceDB = require("../data/accessHelpers/resourceModel");

const router = express.Router();

router.get("/", (req, res) => {
  resourceDB
    .getAllResources()
    .then((resources) => res.status(200).json(resources))
    .catch(() => res.status(500).json({ message: "Server Error Occurred." }));
});

router.post("/", (req, res) => {
  resourceObj = {};
  if (!req.body.name) {
    res.status(400).json({ message: "Name is a required field." });
  }
  if (req.body.description) {
    resourceObj.description = req.body.description;
  }
  resourceObj.name = req.body.name;
  resourceDB
    .addResource(resourceObj)
    .then((newProject) => res.status(201).json(newProject))
    .catch(() => res.status(500).json({ message: "Error occurred." }));
});

router.post("/:resource_id/addproject/:project_id", (req, res) => {
  resourceDB
    .addProjectToResource(
      parseInt(req.params.resource_id),
      parseInt(req.params.project_id)
    )
    .then((_) =>
      res.status(201).json({
        message: `Task ${req.params.resource_id} added to project ${req.params.project_id}`,
      })
    )
    .catch(() => res.status(400).json({ message: "bad request." }));
});

module.exports = router;
