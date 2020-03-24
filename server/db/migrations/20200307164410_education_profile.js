// Table profile_education {
//     id integer [primary key, increment]
//     profile_id varchar(32) [not null, ref: > profile.uuid]

//     college_name varchar
//     location varchar
//     degree varchar
//     major varchar
//     year_of_passing date

//     note: 'student education experience'
// }

exports.up = function(knex) {
    return knex.schema.createTable("education_profile", function(table) {
        table.increments();
        table
            .integer("student_profile_id")
            .unsigned()
            .unique()
            .references("id")
            .inTable('student_profile');
        table.string('college_name').notNullable();
        table.string('location').notNullable();
        table.string('degree').notNullable();
        table.string('major').notNullable();
        table.date('year_of_passing').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("education_profile")
};
