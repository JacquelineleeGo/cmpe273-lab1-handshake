// Table company {
//     id integer [primary key, increment]
//     uuid varchar(32)
//     company_id varchar(32) [unique, not null, ref: - user.uuid]

//     avatar blob
//     name varchar
//     location varchar
//     description varchar
//     contract_email varchar
//     contract_phone varchar

//     note: 'company basic information'
// }
exports.up = function(knex) {
    return knex.schema.createTable("company_profile", function(table) {
        table.increments();
        table
            .integer("company_user_id")
            .unsigned()
            .unique()
            .references("id")
            .inTable('user');
        table.string('name').notNullable();
        table.string('location').notNullable();
        table.string('description').notNullable();
        table.string('contact_email').notNullable();
        table.string('contact_phone').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("company_profile");
};

