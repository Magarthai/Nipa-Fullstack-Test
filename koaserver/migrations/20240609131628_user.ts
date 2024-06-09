import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const checkExists = await knex.schema.hasTable("user");
    if (!checkExists) {
      return knex.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table.string("fname").notNullable();
        table.string("lname").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("role").defaultTo("admin");
        table.string("refreshToken");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  }
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("user");
  }
  