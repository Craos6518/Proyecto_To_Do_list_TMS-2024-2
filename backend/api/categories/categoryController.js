//!# Controlador de categorías
const Category = require('./categoryModel');

const getAllCategories = (req, res) => {
    Category.getAll((err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener categorías' });
        res.json(results);
    });
};

const getCategoryById = (req, res) => {
    Category.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener la categoría' });
        if (!results) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json(results);
    });
};

const createCategory = (req, res) => {
    const newCategory = req.body;

    Category.create(newCategory, (err, result) => {
        if (err) {
            if (err.message.includes('No se pueden agregar más de 10 categorías')) {
                return res.status(403).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Error al crear la categoría' });
        }
        res.status(201).json({ id: result.insertId, ...newCategory });
    });
};

const updateCategory = (req, res) => {
    const updatedCategory = req.body;

    Category.update(req.params.id, updatedCategory, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar la categoría' });

        // Verificar si realmente se actualizó algo
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json({ message: 'Categoría actualizada', updatedCategory });
    });
};

const deleteCategory = (req, res) => {
    Category.delete(req.params.id, (err, result) => {
        if (err) {
            if (err.message.includes('No se puede eliminar la categoría porque tiene tareas asociadas')) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Error al eliminar la categoría' });
        }

        // Verificar si realmente se eliminó algo
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json({ message: 'Categoría eliminada' });
    });
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
