
// 
// note the .notNullable() and .unique() chainable
// methods in the knex Schema Builder... these allow us
// to specify a column as unique and not-nullable (duh).
//
// Also note the 2 different syntaxes for specifying what a
// foreign key field references in another table:
//
//    .references('primary_key').inTable('parent_table_name')
//    .references('parent_table_name.primary_key')
//
// Also note that there is a knex Schema Builder method called
// "foreign()" that supports a completely different syntax:
//
//     tbl.foreign('column_name').references('parent_table_name.primary_key')
//
// Note that you need to create the tables in the rigth order...
// parent tables must be created before child tables can create foreign_key
// columns that reference them.
//

exports.up = function(knex) {
  return (knex.schema
        .createTable('zoos', tbl => {
            tbl.increments();
            tbl.string('zoo_name', 128)
                .notNullable()
                .unique();
            tbl.string('address', 128)
                .notNullable()
                .unique();
        })
        .createTable('species', tbl=> {
            tbl.increments();
            tbl.string('species_name', 128)
                .notNullable()
                .unique();
        })
        .createTable('animals', tbl=> {
            tbl.increments();
            tbl.string('animal_name', 128);
            tbl.integer('species_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('species');
        })
        .createTable('zoo_animals', tbl => {
            tbl.integer('animal_id')
                .unsigned()
                .notNullable()
                .references('animals.id');
            tbl.integer('zoo_id')
                .unsigned()
                .notNullable()
                .references('zoos.id');
            tbl.primary(['zoo_id', 'animal_id']);
        })
    );
};

//
// it is critical to dropTable() in the correct order!
// it doesn't have to be in the exact reverse order from how
// they were created... you just have to take care not to drop
// parent tables before you drop child tables that have foreign
// key columns that reference them.
//
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('zoo_animals')
    .dropTableIfExists('animals')
    .dropTableIfExists('species')
    .dropTableIfExists('zoos');
};
