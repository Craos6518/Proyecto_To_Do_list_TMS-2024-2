//!# Modelo para categorías
const db = require('../config/database');
const Category = {
    getAll: (callback) => {
        db.query('SELECT * FROM categories', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM categories WHERE id = ?', [id], callback);
    },
    create: (category, callback) => {
        db.query('INSERT INTO categories (name) VALUES (?)', [category.name], callback);
    },
    update: (id, category, callback) => {
        db.query('UPDATE categories SET name=? WHERE id=?', [category.name, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM categories WHERE id = ?', [id], callback);
    }
};

module.exports = Category;