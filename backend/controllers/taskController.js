//!# Controlador de tareas
const Task = require('../models/taskModel');
const getAllTasks = (req, res) => {
    Task.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getTaskById = (req, res) => {
    Task.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(results[0]);
    });
};

const createTask = (req, res) => {
    const newTask = req.body;
    Task.create(newTask, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...newTask });
    });
};

const updateTask = (req, res) => {
    const updatedTask = req.body;
    Task.update(req.params.id, updatedTask, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tarea actualizada', updatedTask });
    });
};

const deleteTask = (req, res) => {
    Task.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tarea eliminada' });
    });
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };