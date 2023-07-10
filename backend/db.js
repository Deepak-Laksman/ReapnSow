const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "jsdeveloper",
    port: 5432,
    host: "localhost",
    database: "reapnsow"
});

module.exports = pool;
