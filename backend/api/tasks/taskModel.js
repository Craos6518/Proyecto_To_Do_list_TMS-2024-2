const db = require('../../config/database');

const Task = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM tasks', (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
                if (err) reject(err);
                else resolve(results.length ? results[0] : null);
            });
        });
    },

    create: (task) => {
        return new Promise((resolve, reject) => {
            const { title, description, dueDate, priority, category_id, startDate, status } = task;
    
            console.log("📌 Intentando insertar tarea:", task); // Log de depuración
    
            if (!title || !priority || !category_id || !status) {
                console.error("❌ Error: Faltan campos obligatorios");
                return reject(new Error('Faltan campos obligatorios'));
            }
    
            db.query(
                'INSERT INTO tasks (title, description, dueDate, priority, category_id, startDate, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [title, description || null, dueDate || null, priority, category_id, startDate || null, status],
                (err, result) => {
                    if (err) {
                        console.error("❌ Error en la inserción de tarea:", err);
                        return reject(err);
                    }
    
                    console.log("✅ Tarea insertada con ID:", result.insertId);
                    resolve({ id: result.insertId, ...task });
                }
            );
        });
    },    

    update: (id, task) => {
        return new Promise((resolve, reject) => {
            const { title, description, dueDate, priority, category_id, startDate, status } = task;
            db.query(
                'UPDATE tasks SET title=?, description=?, dueDate=?, priority=?, category_id=?, startDate=?, status=? WHERE id=?',
                [title, description || null, dueDate || null, priority, category_id, startDate || null, status, id],
                (err, result) => {
                    if (err) reject(err);
                    else resolve({ message: 'Tarea actualizada', task });
                }
            );
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM tasks WHERE id=?', [id], (err, result) => {
                if (err) reject(err);
                else resolve({ message: 'Tarea eliminada' });
            });
        });
    }
};

module.exports = Task;
