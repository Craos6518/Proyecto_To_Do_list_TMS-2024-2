//!# Servidor con Express y conexión a la base de datos
onst express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const taskRoutes = require('./api/tasks/taskRoutes');
const categoryRoutes = require('./api/categories/categoryRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas API
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);

// Servir archivos estáticos desde la raíz del proyecto
const rootPath = path.join(__dirname, '..'); // Subimos un nivel desde /backend

app.use(express.static(path.join(rootPath, 'public'))); // HTMLs secundarios
app.use('/css', express.static(path.join(rootPath, 'css'))); // CSS
app.use('/js', express.static(path.join(rootPath, 'js')));   // JS

// Ruta principal que sirve index.html directamente desde la raíz del proyecto
app.get('/', (req, res) => {
    res.sendFile(path.join(rootPath, 'index.html'));
});

// Iniciar servidor si no estamos testeando
if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
}

module.exports = app;
