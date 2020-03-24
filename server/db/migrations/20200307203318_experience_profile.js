// Table profile_experience {
//     id integer [primary key, increment]
//     profile_id varchar(32) [not null, ref: > profile.uuid]

//     company_name varchar
//     title varchar
//     location varchar
//     start_date date
//     end_date date
//     work_description text

//     note: 'student work experience'
// }

exports.up = function(knex) {
    return knex.schema.createTable("experience_profile", function(table) {
        table.increments();
        table
            .integer("student_profile_id")
            .unsigned()
            .references("id")
            .inTable('student_profile');
        table.string('company_name').notNullable();
        table.string('title').notNullable();
        table.string('location').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.string('work_description');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable("experience_profile");
};
