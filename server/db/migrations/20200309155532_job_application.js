// Table job_application {
//     id integer [primary key, increment]
//     job_id varchar(32) [not null, ref: > job.id]

//     applicant_id varchar(32) [not null, ref: > profile.id, note: 'applicant id']
//     resume varchar [note: 'resume local file']
//     status apply_status

//     created_at timestamp
//     updated_at timestamp

//     note: 'application'
// }
exports.up = function (knex) {
    return knex.schema.createTable('job_application', function (table) {
        table.increments();
        table
            .integer("job_id")
            .unsigned()
            .references("id")
            .inTable('job');
        table
            .integer("student_profile_id")
            .unsigned()
            .references("id")
            .inTable('student_profile');

        table.string('resume').notNullable();
        table.enu('status', ['pending', 'reviewed','declined']).defaultTo('pending');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('job_application');
};
