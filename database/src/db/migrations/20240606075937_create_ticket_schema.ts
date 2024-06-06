import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const checkExists = await knex.schema.hasTable("ticket");
  if (!checkExists) {
    return knex.schema.createTable("ticket", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("detail").notNullable();
      table.string("selectTopic").notNullable();
      table.string("img").notNullable();
      table.string("status").notNullable();
      table.string("solve").notNullable();
      table.string("recipient").notNullable();
      table.string("recipient_name").notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("ticket");
}
