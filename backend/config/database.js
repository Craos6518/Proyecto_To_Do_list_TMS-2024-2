const mysql = require('mysql2');
require('dotenv').config(); // Asegúrate de cargar dotenv antes de usar process.env

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

connection.connect(err => {
    if (err) {
        console.error('❌ Error de conexión a MySQL:', err.message);
        return;
    }
    console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;
