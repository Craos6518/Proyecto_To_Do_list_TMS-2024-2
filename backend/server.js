//!# Servidor con Express y conexión a la base de datos
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./api/tasks/taskRoutes');
const categoryRoutes = require('./api/categories/categoryRoutes');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use (express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);

// Si no estamos en un entorno de prueba, iniciar el servidor
if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}
module.exports = app;