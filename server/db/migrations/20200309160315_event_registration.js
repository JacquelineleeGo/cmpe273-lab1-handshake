
// Table event_regisiteration {
//     id integer [primary key, increment]
//     event_id varchar(32) [not null, ref: > event.id]
//     applicant_id varchar(32) [not null, ref: > profile.id]

//     regisitered_at timestamp
// }

exports.up = function (knex) {
    return knex.schema.createTable('event_registration', function (table) {
        table.increments();
        table
            .integer("event_id")
            .unsigned()
            .references("id")
            .inTable('event');
        table
            .integer("student_profile_id")
            .unsigned()
            .references("id")
            .inTable('student_profile');
       table.timestamp('registerted_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('event_registration');
};