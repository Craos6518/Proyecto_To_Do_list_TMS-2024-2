//!# Modelo para tareas
const db = require('../../config/database');
const Task = {
    getAll: function (callback) {
        return db.query('SELECT * FROM tasks', callback);
    },
    getById: function (id, callback) {
        return db.query('SELECT * FROM tasks WHERE id = ?', [id], callback);
    },
    create: (task, callback) => {
        db.query('INSERT INTO tasks (title, description, status, priority, category_id) VALUES (?, ?, ?, ?, ?)',
            [task.title, task.description, task.status, task.priority, task.category_id], callback);
    },
    update: (id, task, callback) => {
        db.query('UPDATE tasks SET title=?, description=?, status=?, priority=?, category_id=? WHERE id=?',
            [task.title, task.description, task.status, task.priority, task.category_id, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
    }
};
module.exports = Task;