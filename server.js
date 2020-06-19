const express = require("express");
const projectRouter = require("./routers/projectRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  return res.send(`<h1>Welcome to the Project Management API</h1>`);
});

server.use("/projects/", projectRouter);

module.exports = server;
