const express = require("express");
const projectRouter = require("./routers/projectRouter");
const resourceRouter = require("./routers/resourceRouter");
const taskRouter = require("./routers/taskRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  return res.send(`<h1>Welcome to the Project Management API</h1>`);
});

server.use("/projects/", projectRouter);
server.use("/resources/", resourceRouter);
server.use("/tasks/", taskRouter);

module.exports = server;
