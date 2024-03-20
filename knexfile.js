const PATH = require('path');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: PATH.resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations:  {
      directory: PATH.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },
};
