module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    connection: {
      filename: './data/zoos.db3',
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    // the following configuration executes the 'PRAGMA foreign_keys = ON'
    // SQL statement as soon as the connection to sqlite is completed.
    //
    // this PRAGMA causes sqlite to enforce foreign key constraints, ensuring
    // that your foreign key values are not fiction.
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  },
};
