const express = require('express');
const router = express.Router();
const taskController = require('./taskController');

// Obtener todas las tareas
router.get('/', taskController.getAllTasks);

// Obtener una tarea específica por ID
router.get('/:id', taskController.getTaskById);

// Crear una nueva tarea
router.post('/', taskController.createTask);

// Actualizar una tarea específica por ID
router.put('/:id', taskController.updateTask);

// Eliminar una tarea específica por ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;