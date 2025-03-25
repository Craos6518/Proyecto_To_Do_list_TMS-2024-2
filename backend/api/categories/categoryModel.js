//!# Modelo para categorías
const db = require('../../config/database');
const Category = {
    getAll: (callback) => {
        db.query('SELECT * FROM categories', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM categories WHERE id = ?', [id], callback);
    },
    create: (category, callback) => {
        // Verificar el límite de categorías antes de insertar
        db.query('SELECT COUNT(*) AS total FROM categories', (err, results) => {
            if (err) return callback(err, null);

            if (results[0].total >= 10) {
                return callback(new Error('No se pueden agregar más de 10 categorías.'), null);
            }

            // Insertar nueva categoría
            db.query('INSERT INTO categories (name) VALUES (?)', [category.name], callback);
        });
    },
    update: (id, category, callback) => {
        db.query('UPDATE categories SET name=? WHERE id=?', [category.name, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM categories WHERE id = ?', [id], callback);
    }
};

module.exports = Category;