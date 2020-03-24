// Table profile_basic {
//     id integer [primary key, increment]
//     uuid varchar(32)
//     profile_id varchar(32) [unique, not null, ref: - profile.uuid]

//     avatar blob
//     name varchar [not null]
//     birth date [not null]
//     city varchar
//     state varchar
//     country varchar
//     skillset varchar
//     career_objective text

//     note: 'student basic information'
// }


exports.up = function(knex) {
    return knex.schema.createTable("basic_profile", function(table) {
        table.increments();
        table
            .integer("student_profile_id")
            .unsigned()
            .unique()
            .references("id")
            .inTable('student_profile');
        table.binary('avatar');
        table.string('name').notNullable();
        table.date('birth_date').notNullable();
        table.string('city');
        table.string('state');
        table.string('country');
        table.string('skillset');
        table.string('career_objective');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("basic_profile");
};
