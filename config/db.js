const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost', 
    user:  'root',
    password: '',
    port: 3306,
    database: 'ecokids'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;
