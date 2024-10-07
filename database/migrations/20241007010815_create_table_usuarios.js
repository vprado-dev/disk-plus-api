const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("usuarios", (table) => {
    // campos
    table.increments("usuarioId", { primaryKey: false }).notNullable();
    table.text("nome").notNullable();
    table.text("email").notNullable();
    table.text("senha").notNullable();
    table.boolean("root").defaultTo(false);
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());

    // primary key
    table.primary(["usuarioId"]);

    // unique keys
    table.unique(["email"]);
  });

  // triggers
  await knex.schema.raw(`
      create trigger "tr_usuarios_setUpdatedAt"
      before update on usuarios
      for each row
      execute procedure "setUpdatedAt"();
    `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("usuarios");
};
