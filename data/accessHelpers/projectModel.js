const knex = require("knex");
const config = require("../../knexfile");

const db = knex(config.development);

module.exports = {
  getAllProjects,
  addProject,
  getAllProjectResources,
  getAllProjectTasks,
};

function getAllProjects() {
  return db("projects");
}

function getAllProjectResources(id) {
  return db("project_resources")
    .join("resources", "resources.id", "project_resources.resource_id")
    .select("resources.name")
    .where({ "project_resources.project_id": id });
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

function getAllProjectTasks(id) {
  return db("tasks").where({ project_id: id });
}
