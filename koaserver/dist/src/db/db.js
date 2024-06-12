"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const knexfile = require("../../knexfile");
const db = knex(knexfile.development);
exports.default = db;
//# sourceMappingURL=db.js.map