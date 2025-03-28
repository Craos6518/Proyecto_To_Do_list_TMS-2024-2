const request = require('supertest');
const app = require('../server');
const db = require('../config/database');

let createdCategoryId;
let createdTaskId;

beforeAll(async () => {
    // Limpiar la base de datos de prueba
    await db.promise().query('DELETE FROM tasks');  // Primero borrar tareas (depende de categories)
    await db.promise().query('DELETE FROM categories');

    // 1️⃣ Crear una categoría y almacenar su ID
    const [result] = await db.promise().query("INSERT INTO categories (name) VALUES ('Trabajo')");
    createdCategoryId = result.insertId;
    console.log("CREATED CATEGORY ID:", createdCategoryId);
});

afterAll(async () => {
    // Limpiar la base de datos después de las pruebas
    await db.promise().query('DELETE FROM tasks');
    await db.promise().query('DELETE FROM categories');
    db.end();
});

describe('API de Categorías y Tareas', () => {
    test('Debe obtener todas las categorías', async () => {
        const response = await request(app).get('/api/categories');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Debe crear una nueva categoría', async () => {
        const newCategory = { name: 'Nueva Categoría' };
        const response = await request(app).post('/api/categories').send(newCategory);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        createdCategoryId = response.body.id;
    });

    test('Debe obtener una categoría por ID', async () => {
        const response = await request(app).get(`/api/categories/${createdCategoryId}`);
        expect(response.status).toBe(200);
    
        // 🛠 Si la API devuelve un array, accedemos al primer elemento
        const category = Array.isArray(response.body) ? response.body[0] : response.body;
        
        expect(category).toHaveProperty('id', createdCategoryId);
    });

    test('Debe crear una tarea', async () => {
        const newTask = {
            title: 'Nueva Tarea',
            description: 'Descripción de prueba',
            dueDate: '2025-04-01',
            priority: 'Media',
            category_id: createdCategoryId,  // 🔹 Usamos la categoría creada
            startDate: '2025-03-25',
            status: 'Pendiente'
        };
        console.log("✅ createdTaskId después de crear tarea:", createdTaskId);

        const response = await request(app).post('/api/tasks').send(newTask);

        console.log("RESPONSE BODY:", response.body);
        console.log("RESPONSE STATUS:", response.status);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');

        createdTaskId = response.body.id;  // 🔹 Guardamos para otras pruebas
    });

    test('Debe obtener todas las tareas', async () => {
        const response = await request(app).get('/api/tasks');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Debe obtener una tarea por ID', async () => {
        const response = await request(app).get(`/api/tasks/${createdTaskId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdTaskId);
    });

    test('Debe actualizar una tarea', async () => {
        const updatedTask = { 
            title: 'Nueva Tarea (actualizada)',
            description: 'Descripción actualizada',
            dueDate: '2025-05-01',
            priority: 'Alta',
            category_id: createdCategoryId,  // 🔹 Usamos la categoría creada
            startDate: '2025-03-25',
            status: 'Pendiente'
        };
    
        const response = await request(app).put(`/api/tasks/${createdTaskId}`).send(updatedTask);
    
        console.log("UPDATE RESPONSE BODY:", response.body);
        console.log("UPDATE RESPONSE STATUS:", response.status);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Tarea actualizada');
    });
    
    
    

    test('Debe eliminar una tarea', async () => {
        const response = await request(app).delete(`/api/tasks/${createdTaskId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Tarea eliminada');
    });

    test('Debe eliminar la categoría', async () => {
        const response = await request(app).delete(`/api/categories/${createdCategoryId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Categoría eliminada');
    });
});
