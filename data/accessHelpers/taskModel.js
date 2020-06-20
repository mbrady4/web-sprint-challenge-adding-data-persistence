const knex = require("knex");
const config = require("../../knexfile");

const db = knex(config.development);

module.exports = {
  getAllTasks,
  addTask,
};

function getAllTasks() {
  return db("tasks")
    .join("projects", "projects.id", "tasks.project_id")
    .select(
      "projects.name as project_name",
      "projects.description as project_description",
      "tasks.description as task_description",
      "tasks.notes as task_notes",
      "tasks.completed as task_status"
    );
}

function findByIds(id) {
  return db("tasks").where({ id }).first();
}

function addTask(task) {
  return db("tasks")
    .insert(task)
    .then((ids) => {
      return findByIds(ids[0]);
    });
}
