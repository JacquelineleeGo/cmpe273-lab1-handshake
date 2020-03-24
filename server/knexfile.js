// Update with your config settings.
require("dotenv").config();

// module.exports = {
//   development: {
//     client: 'mysql',
//     connection: {
//       host: '127.0.0.1',
//       port: 3306,
//       database: 'handshake',
//       user: 'root',
//       password: 'root1989',
//       },
//     migrations: {
//       directory: "./db/migrations"
//     },
//     seeds: {
//       directory: "./db/seeds"
//     }
//   },

//   production: {
//     client: 'mysql',
//     connection: {
//       host: 'db-handshake.c6mz8v5yhczh.us-east-1.rds.amazonaws.com',
//       port: 3306,
//       database: 'handshake',
//       user: 'admin',
//       password: 'admin1989',
//       filename: './dev.sqlite3'
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

// };

module.exports = {
  client: "mysql",
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 7 },
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

