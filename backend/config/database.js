const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de entorno

// Detectar si estamos en entorno de prueba
const isTest = process.env.NODE_ENV === 'test';

const db = mysql.createConnection({
    host: isTest ? process.env.TEST_DB_HOST : process.env.DB_HOST,
    user: isTest ? process.env.TEST_DB_USER : process.env.DB_USER,
    password: isTest ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD,
    database: isTest ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    charset: 'utf8mb4', // Soporte para caracteres especiales
});

db.connect(err => {
    if (err) {
        console.error('❌ Error al conectar con la base de datos:', err.message);
        return;
    }
    console.log(`✅ Conectado a la base de datos MySQL (${isTest ? 'PRUEBAS' : 'DESARROLLO'})`);
});

module.exports = db;
