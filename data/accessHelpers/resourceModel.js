const knex = require("knex");
const config = require("../../knexfile");

const db = knex(config.development);

module.exports = {
  getAllResources,
  addResource,
  addProjectToResource,
};

function getAllResources() {
  return db("resources");
}

function findByIds(id) {
  return db("resources").where({ id }).first();
}

function addResource(resource) {
  return db("resources")
    .insert(resource)
    .then((ids) => {
      return findByIds(ids[0]);
    });
}

function addProjectToResource(resource_id, project_id) {
  const obj = {
    project_id,
    resource_id,
  };
  console.log(obj);
  return db("project_resources")
    .insert(obj)
    .then((ids) => {
      console.log(ids);
      return ids;
    })
    .catch((error) => console.log("error.", error));
}
