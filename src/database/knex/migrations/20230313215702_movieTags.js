exports.up = knex => knex.schema.createTable("movieTags", table => {
    table.increments("id");
    table.text("name");
    table.integer("note_id").references("id").inTable("movieNotes");
    table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("movieTags")