// wrap around the knex config for bookshelf
const knex = require("knex");
const knexConfig = require("../knexfile");

module.exports = knex(knexConfig);