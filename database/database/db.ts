const knex = require("knex");
const knexfile = require("./knexfile");

export const db = knex(knexfile.development);
