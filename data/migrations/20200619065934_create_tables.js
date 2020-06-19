exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments();
      tbl.text("name", 128).unique().notNullable();
      tbl.text("description", 256);
      tbl.boolean("completed").defaultTo(false);
    })
    .createTable("tasks", (tbl) => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects");
      tbl.text("description", 256);
      tbl.text("notes", 256);
      tbl.boolean("completed").defaultTo(false);
    })
    .createTable("resources", (tbl) => {
      tbl.increments();
      tbl.text("name", 128).unique().notNullable();
      tbl.text("description", 256);
    })
    .createTable("project_resources", (tbl) => {
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources");
      tbl.primary(["project_id", "resource_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("projects")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("project_resources");
};
