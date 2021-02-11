const { Pool } = require('pg')

// Create a Connection Pool, with which you can use pool.query to run queries
// Please note that PORT is not speicifed because it should be using a remote db or the default
// postgres port which is 5432
const ConnectionPool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
})

module.exports = ConnectionPool