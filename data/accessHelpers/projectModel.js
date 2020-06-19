const knex = require("knex");
const config = require("../../knexfile");

const db = knex(config.development);

module.exports = {
  getAllProjects,
  addProject,
};

function getAllProjects() {
  return db("projects");
}

function findByIds(id) {
  return db("projects").where({ id }).first();
}

function addProject(project) {
  return db("projects")
    .insert(project)
    .then((ids) => {
      return findByIds(ids[0]);
    });
}
