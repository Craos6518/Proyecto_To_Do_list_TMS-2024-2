//!# Servidor con Express y conexión a la base de datos
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(cors());
app.use (express.json());

app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});