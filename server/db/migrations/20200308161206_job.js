// Table job {
//     id integer [primary key, increment]
//     uuid varchar(32)
//     company_id varchar(32) [unique, not null, ref: > company.uuid]

//     title varchar
//     created_at timestamp
//     application_deadline timestamp
//     location varchar
//     salary float
//     desc text
//     category job_category

//     note: 'job posts'
// }

exports.up = function(knex) {
    return knex.schema.createTable('job', function(table){
        table.increments();
        table
            .integer("company_profile_id")
            .unsigned()
            .references("id")
            .inTable('company_profile');
        table.string('title').notNullable().unique();
        table.string('location').notNullable();
        table.float('salary').notNullable();
        table.text('job_description').notNullable();
        table.timestamp('application_deadline').notNullable();
        table.enu('category', ["full_time", "part_time", "intern", "on_campus"]).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('job');
};
