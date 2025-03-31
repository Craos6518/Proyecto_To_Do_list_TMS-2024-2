//!# Controlador de categorías
const Category = require('./categoryModel');

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json(categories);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.getById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json(category);
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'El nombre de la categoría es obligatorio.' });
    }

    try {
        const result = await Category.create({ name });
        res.status(201).json({ message: 'Categoría creada con éxito', id: result.insertId, name });
    } catch (error) {
        if (error.message === 'MAX_CATEGORIES_LIMIT') {
            return res.status(403).json({ error: 'No se pueden agregar más de 10 categorías.' });
        }
        console.error('Error al crear la categoría:', error);
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

// Eliminar una categoría por ID
const deleteCategory = async (req, res) => {
    try {
        const result = await Category.delete(req.params.id);

        // Verificar si realmente se eliminó algo
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json({ message: 'Categoría eliminada con éxito' });
    } catch (error) {
        if (error.message === 'CATEGORY_HAS_TASKS') {
            return res.status(400).json({ error: 'No se puede eliminar la categoría porque tiene tareas asociadas.' });
        }
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};

module.exports = { getAllCategories, getCategoryById, createCategory, deleteCategory };