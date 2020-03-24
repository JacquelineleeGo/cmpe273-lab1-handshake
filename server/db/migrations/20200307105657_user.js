exports.up = function(knex) {
    return knex.schema.createTable('user', function(table)  {
      table.increments();
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password_digest').notNullable();
      table.string('role').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('update_at').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('user');
  };
  