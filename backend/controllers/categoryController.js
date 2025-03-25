//!# Controlador de categorías
const Category = require('../models/categoryModel');

const getAllCategories = (req, res) => {
    Category.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getCategoryById = (req, res) => {
    Category.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json(results[0]);
    });
};

const createCategory = (req, res) => {
    const newCategory = req.body;
    Category.create(newCategory, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...newCategory });
    });
};

const updateCategory = (req, res) => {
    const updatedCategory = req.body;
    Category.update(req.params.id, updatedCategory, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Categoría actualizada', updatedCategory });
    });
};

const deleteCategory = (req, res) => {
    Category.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Categoría eliminada' });
    });
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };