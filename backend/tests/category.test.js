const request = require('supertest');
const app = require('../server');
const db = require('../config/database');

let createdCategoryId;

beforeAll(async () => {
    // Limpiar la base de datos de prueba
    await db.promise().query('DELETE FROM tareas');
    await db.promise().query('DELETE FROM categories');

    // Insertar datos de prueba
    const [result] = await db.promise().query("INSERT INTO categories (name) VALUES ('Trabajo')");
    createdCategoryId = result.insertId;
});

afterAll(async () => {
    // Limpiar la base de datos después de las pruebas
    await db.promise().query('DELETE FROM tareas');
    await db.promise().query('DELETE FROM categories');
    db.end();
});

describe('API de Categorías', () => {
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
        
        // Si la API devuelve un array, accede al primer elemento
        const category = Array.isArray(response.body) ? response.body[0] : response.body;
    
        expect(category).toHaveProperty('id', createdCategoryId);
    });
    

    test('Debe actualizar una categoría', async () => {
        const updatedCategory = { name: 'Categoría Actualizada' };
        const response = await request(app).put(`/api/categories/${createdCategoryId}`).send(updatedCategory);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Categoría actualizada');
    });

    test('Debe eliminar una categoría', async () => {
        const response = await request(app).delete(`/api/categories/${createdCategoryId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Categoría eliminada');
    });
});