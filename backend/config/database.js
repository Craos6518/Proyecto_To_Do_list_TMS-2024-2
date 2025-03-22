//!# Configuración de conexión a MySQL

const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conection.connect((error) => {
    if (error) {
        console.error('Error de conexión a MySQL: ' + error);
        return;
    }
    console.log('Conexión a MySQL exitosa');
});

module.exports = conection;