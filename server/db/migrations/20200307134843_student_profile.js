// id integer [primary key, increment]
// uuid varchar(32)
// user_id varchar(32) [not null, ref: - user.uuid]
// created_at timestamp
// note: 'user profile'

exports.up = function (knex) {
    return knex.schema.createTable("student_profile", function (table) {
        table.increments();
        table
            .integer("student_user_id")
            .unsigned()
            .unique()
            .references("id")
            .inTable('user');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("student_profile");
};