const path = require("path")
const knex = require('knex')

const conn = knex({
  client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '..', 'database.db')
    },
    useNullAsDefault: true,
    pool:{
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations:{
      directory : path.resolve(__dirname, 'migrations')
    },
  });

module.exports = conn