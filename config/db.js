const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: DB_HOST, 
    user:  DB_USER,
    password: DB_PASSWORD,
    port: 3306,
    database: DB_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;
