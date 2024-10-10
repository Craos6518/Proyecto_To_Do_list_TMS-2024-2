const mysql = require('mysql2');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',      // o la dirección de tu servidor MySQL
  user: 'root',
  password: '',
  database: 'login_register_db'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos con ID:', connection.threadId);
});

// Puedes ahora hacer consultas, por ejemplo:
connection.query('SELECT * FROM usuarios', (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
  }
});

// No olvides cerrar la conexión cuando termines
connection.end();