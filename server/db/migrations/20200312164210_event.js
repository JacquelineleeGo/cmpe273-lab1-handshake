// Table event {
//     id integer [primary key, increment]
//     company_id varchar(32) [not null, ref: > company.id]

//     name varchar
//     description varchar
//     time date
//     location varchar
//     eligibility eligibility_status

//     created_at timestamp
//     updated_at timestamp
// }

exports.up = function(knex) {
    return knex.schema.createTable('event', function(table){
        table.increments();
        table
            .integer("company_profile_id")
            .unsigned()
            .references("id")
            .inTable('company_profile');
        table
            .string("event_major")
            .references("major")
            .inTable("event_major");
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.datetime('time').notNullable();
        table.string('location').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('event');
};

