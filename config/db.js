const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost', // Usar variable de entorno o valor por defecto
    user:  'root',
    password: '',
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
