const cleaner = require('knex-cleaner');


// note: knex-cleaner doesn't seem to do anything for sqlite databases.
// In looking at it's code, it simply retrieves a list of tables,
// and tries to truncate them in order. If the "forein_key = on" PRAGMA
// has been executed in the table connection, then the tables must
// be truncated in the right order, or you will get a foreign key constraint
// violation.
//
// so, short story = "knex-cleaner doesn't work (at least for sqlite)"
//
// the code below *does* work... simply truncate each of the tables.
// remember that "truncate() resets the primary key value, which is important,
// otherwise .insert()'s in the child tables in other seed files will reference
// invalid primary keys in their foreign key fields.
//
// for example, "delete()"ing the zoos records, rather than "truncate()"ing them
// will keep the "next" primary key, so that the next insert will have
// a primary key value of "3" and "4" (since there were 2 zoos to begin with).
// 
// but the 04-zoo-animals.js seed file has insesrts where the zoo_id field
// is "1" and "2"... which won't match the actual primary id's in zoos.
//
// so be sure to truncate().

exports.seed = async function(knex) {
  // return cleaner.clean(knex, {
  //   mode: 'truncate',
  //   ignoreTables: ['knex_migrations', 'knex_migrations_lock'], // don't empty migration tables
  // });
  
  try {
    await knex.truncate('zoo_animals');
    await knex.truncate('animals');
    await knex.truncate('species');
    await knex.truncate('zoos');

  } catch (err) {
    console.log(err);
  }
  
};