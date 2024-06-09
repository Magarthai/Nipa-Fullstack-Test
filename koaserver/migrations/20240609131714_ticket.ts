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
        table.string("img");
        table.string("status").defaultTo("pending");
        table.string("solve");
        table.string("recipient");
        table.string("recipient_name");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  }
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("ticket");
  }
  