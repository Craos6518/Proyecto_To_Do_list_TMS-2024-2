const db = require('../../config/database');

const Task = {
    getAll: (callback) => {
        db.query('SELECT * FROM tasks', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM tasks WHERE id = ?', [id], callback);
    },

    create: (task, callback) => {
        const { title, description, dueDate, priority, category_id, startDate, status } = task;
        db.query(
            'INSERT INTO tasks (title, description, dueDate, priority, category_id, startDate, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, description, dueDate, priority, category_id, startDate, status],
            callback
        );
    },

    update: (id, task, callback) => {
        const { title, description, dueDate, priority, category_id, startDate, status } = task;
        db.query(
            'UPDATE tasks SET title=?, description=?, dueDate=?, priority=?, category_id=?, startDate=?, status=? WHERE id=?',
            [title, description, dueDate, priority, category_id, startDate, status, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query('DELETE FROM tasks WHERE id=?', [id], callback);
    }
};

module.exports = Task;
