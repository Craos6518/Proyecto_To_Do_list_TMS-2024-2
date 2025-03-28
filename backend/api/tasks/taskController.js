const Task = require('./taskModel');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.getAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.getById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.update(req.params.id, req.body);
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const message = await Task.delete(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
