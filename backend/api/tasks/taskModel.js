const db = require('../../config/database');

const Task = {
    // Obtener todas las tareas
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM tasks', (err, results) => {
                if (err) {
                    console.error("❌ Error al obtener las tareas:", err);
                    return reject(new Error("Error al obtener las tareas"));
                }
                resolve(results);
            });
        });
    },

    // Obtener una tarea específica por ID
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
                if (err) {
                    console.error("❌ Error al obtener la tarea:", err);
                    return reject(new Error("Error al obtener la tarea"));
                }
                resolve(results.length ? results[0] : null);
            });
        });
    },

    // Crear una nueva tarea
    create: (task) => {
        return new Promise((resolve, reject) => {
            const { title, description, dueDate, priority, category_id, startDate, status } = task;

            // Validaciones básicas
            if (!title || !priority || !category_id || !status) {
                console.error("❌ Error: Faltan campos obligatorios");
                return reject(new Error("Faltan campos obligatorios"));
            }

            // Validar que `dueDate` sea una fecha válida
            if (dueDate && isNaN(Date.parse(dueDate))) {
                console.error("❌ Error: Fecha de vencimiento inválida");
                return reject(new Error("Fecha de vencimiento inválida"));
            }

            db.query(
                'INSERT INTO tasks (title, description, dueDate, priority, category_id, startDate, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [title, description || null, dueDate || null, priority, category_id, startDate || null, status],
                (err, result) => {
                    if (err) {
                        console.error("❌ Error en la inserción de tarea:", err);
                        return reject(new Error("Error al crear la tarea"));
                    }
                    console.log("✅ Tarea insertada con ID:", result.insertId);
                    resolve({ message: "Tarea creada con éxito", id: result.insertId, ...task });
                }
            );
        });
    },

    // Actualizar una tarea específica por ID
    update: (id, task) => {
        return new Promise((resolve, reject) => {
            const { title, description, dueDate, priority, category_id, startDate, status } = task;

            // Validar que `dueDate` sea una fecha válida
            if (dueDate && isNaN(Date.parse(dueDate))) {
                console.error("❌ Error: Fecha de vencimiento inválida");
                return reject(new Error("Fecha de vencimiento inválida"));
            }

            db.query(
                'UPDATE tasks SET title=?, description=?, dueDate=?, priority=?, category_id=?, startDate=?, status=? WHERE id=?',
                [title, description || null, dueDate || null, priority, category_id, startDate || null, status, id],
                (err, result) => {
                    if (err) {
                        console.error("❌ Error al actualizar la tarea:", err);
                        return reject(new Error("Error al actualizar la tarea"));
                    }
                    console.log("✅ Tarea actualizada con ID:", id);
                    resolve({ message: "Tarea actualizada con éxito", task });
                }
            );
        });
    },

    // Eliminar una tarea específica por ID
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM tasks WHERE id=?', [id], (err, result) => {
                if (err) {
                    console.error("❌ Error al eliminar la tarea:", err);
                    return reject(new Error("Error al eliminar la tarea"));
                }
                console.log("✅ Tarea eliminada con ID:", id);
                resolve({ message: "Tarea eliminada con éxito" });
            });
        });
    }
};

module.exports = Task;