//!# Modelo para categorías
const db = require('../../config/database');

const Category = {
    // Obtener todas las categorías
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Obtener una categoría por ID
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Devolver solo el primer resultado
            });
        });
    },

    // Crear una nueva categoría
    create: (category) => {
        return new Promise((resolve, reject) => {
            // Verificar el límite de categorías antes de insertar
            db.query('SELECT COUNT(*) AS total FROM categories', (err, results) => {
                if (err) return reject(err);

                if (results[0].total >= 10) {
                    return reject(new Error('MAX_CATEGORIES_LIMIT')); // Código de error específico
                }

                // Insertar nueva categoría
                db.query('INSERT INTO categories (name) VALUES (?)', [category.name], (err, result) => {
                    if (err) return reject(err);
                    resolve(result); // Devolver el resultado de la inserción
                });
            });
        });
    },

    // Eliminar una categoría por ID
    delete: (id) => {
        return new Promise((resolve, reject) => {
            // Verificar si la categoría tiene tareas asociadas
            db.query('SELECT COUNT(*) AS total FROM tasks WHERE category_id = ?', [id], (err, results) => {
                if (err) return reject(err);

                if (results[0].total > 0) {
                    return reject(new Error('CATEGORY_HAS_TASKS')); // Código de error específico
                }

                // Eliminar la categoría si no tiene tareas asociadas
                db.query('DELETE FROM categories WHERE id = ?', [id], (err, result) => {
                    if (err) return reject(err);
                    resolve(result); // Devolver el resultado de la eliminación
                });
            });
        });
    }
};

module.exports = Category;