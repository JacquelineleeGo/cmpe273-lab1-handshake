
exports.up = function (knex) {
    return knex.schema.createTable('event_major', function (table) {
        table.increments();
        table.string("major").notNullable().unique();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('event_major');
};

// INSERT INTO event_major(major)
// VALUES ('Software Engineering'),
// ('Electrical Engineering'),
// ('Communications'),
// ('Business'),
// ('Economics'),
// ('Literature'),
// ('Psychology'),
// ('Education'),
// ('Nursing'),
// ('Computer Science'),
// ('All');