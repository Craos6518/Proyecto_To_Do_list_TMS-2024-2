const Task = require("./taskModel");

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

// Obtener una tarea específica por ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    res.status(500).json({ error: "Error al obtener la tarea" });
  }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
  try {
    const { title, dueDate, priority, category } = req.body;

    // Validaciones básicas
    if (!title || !dueDate || !priority || !category) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const newTask = await Task.create(req.body);
    res.status(201).json({ message: "Tarea creada con éxito", task: newTask });
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

// Actualizar una tarea específica por ID
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.update(req.params.id, req.body);

    if (!updatedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea actualizada con éxito", task: updatedTask });
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea específica por ID
const deleteTask = async (req, res) => {
  try {
    const message = await Task.delete(req.params.id);

    if (!message) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};