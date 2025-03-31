//!# Controlador de categorías
const Category = require('./categoryModel');

// Obtener todas las categorías
const getAllCategories = (req, res) => {
    Category.getAll((err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener las categorías' });
        res.json(results);
    });
};

// Obtener una categoría por ID
const getCategoryById = (req, res) => {
    Category.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener la categoría' });
        if (!results) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json(results);
    });
};

// Crear una nueva categoría
const createCategory = (req, res) => {
    const newCategory = req.body;

    Category.create(newCategory, (err, result) => {
        if (err) {
            if (err.message === 'MAX_CATEGORIES_LIMIT') {
                return res.status(403).json({ error: 'No se pueden agregar más de 10 categorías' });
            }
            return res.status(500).json({ error: 'Error al crear la categoría' });
        }
        res.status(201).json({ message: 'Categoría creada con éxito', id: result.insertId, ...newCategory });
    });
};

// Eliminar una categoría por ID
const deleteCategory = (req, res) => {
    Category.delete(req.params.id, (err, result) => {
        if (err) {
            if (err.message === 'CATEGORY_HAS_TASKS') {
                return res.status(400).json({ error: 'No se puede eliminar la categoría porque tiene tareas asociadas' });
            }
            return res.status(500).json({ error: 'Error al eliminar la categoría' });
        }

        // Verificar si realmente se eliminó algo
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json({ message: 'Categoría eliminada con éxito' });
    });
};

module.exports = { getAllCategories, getCategoryById, createCategory, deleteCategory };