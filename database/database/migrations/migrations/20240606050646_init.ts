import { table } from "console";
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user", (table) => {
    table.string("fname").notNullable();
    table.string("lname").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("role").defaultTo("admin");
    table.string("refreshToken");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user");
}
