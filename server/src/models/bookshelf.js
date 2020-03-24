// 1. Setting up the database connection
// knexConfig is where the connection set up lives -- living in db index.js
// 2. Defining models
// we define it in the models folder

const Bookshelf = require('bookshelf');
const db = require("../../db");

const bookshelf = Bookshelf(db);

var cascadeDelete = require('bookshelf-cascade-delete');

bookshelf.plugin(cascadeDelete);

module.exports = bookshelf;

