
// note that the foreign key values are hard-coded...
// you have to make sure that the records in the related tables
// have these id's, or this insert() will fail!

exports.seed = function(knex, Promise) {
  return knex('animals').insert([
    // species_id must match valid species
    { animal_name: "Snuffles", species_id: 1 },
    { animal_name: "Cornelius", species_id: 2 },
    { animal_name: "Athena", species_id: 3 },
    { animal_name: "Ares", species_id: 3 },
    { animal_name: "Snelby", species_id: 4 },
    { animal_name: "Gwendolyn", species_id: 5 },
    { animal_name: "Archebald", species_id: 6 },
    { animal_name: "Polonius", species_id: 1 },
    { animal_name: "Augusta", species_id: 4 },
    { animal_name: "Stephen", species_id: 7 },
    { animal_name: "Rocky", species_id: 8 }
  ]);
};
