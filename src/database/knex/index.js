const path = require("path")
const knex = require('knex')

knex({
  client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    pool:{
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    useNullAsDefault: true,
    migrations:{
      directory : path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    }
});

module.exports = knex