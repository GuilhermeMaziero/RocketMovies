exports.up =   knex => knex.schema.createTable("movie_notes", table => {

    table.increments("id").primary();
    table.text("title");
    table.text("description");
    table.integer("rate").unsigned().notNullable().checkIn([1, 2, 3, 4, 5]);
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());


});

exports.down =  knex => knex.schema.dropTable("movie_notes");