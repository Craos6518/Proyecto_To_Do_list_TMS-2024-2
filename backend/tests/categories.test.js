// categories.test.js
const { getTasks, getCategories, saveCategory, eliminarCategoria } = require('../../js/categories');

describe('Verificación de eliminación de código obsoleto', () => {
    let localStorageSpy;

    beforeAll(() => {
        // Mockear fetch para simular respuestas del backend
        global.fetch = jest.fn((url) => {
            if (url === '/api/tasks') {
                return Promise.resolve({
                    json: () => Promise.resolve([]),
                    ok: true,
                });
            }
            if (url === '/api/categories') {
                return Promise.resolve({
                    json: () => Promise.resolve([]),
                    ok: true,
                });
            }
            return Promise.resolve({
                json: () => Promise.resolve({}),
                ok: true,
            });
        });

        // Mockear el evento DOMContentLoaded
        document.addEventListener = jest.fn((event, callback) => {
            if (event === 'DOMContentLoaded') {
                callback();
            }
        });
    });

    beforeEach(() => {
        // Espiar todas las llamadas a localStorage
        localStorageSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
        localStorageSpy.mockImplementation(() => {
            throw new Error('Acceso a localStorage detectado. Código obsoleto no eliminado.');
        });

        jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
            throw new Error('Acceso a localStorage detectado. Código obsoleto no eliminado.');
        });

        jest.spyOn(window.localStorage.__proto__, 'removeItem').mockImplementation(() => {
            throw new Error('Acceso a localStorage detectado. Código obsoleto no eliminado.');
        });
    });

    afterEach(() => {
        // Restaurar el comportamiento original de localStorage
        localStorageSpy.mockRestore();
        jest.restoreAllMocks();
    });

    test('getTasks no debe usar localStorage', async () => {
        await expect(getTasks()).resolves.not.toThrow();
    });

    test('getCategories no debe usar localStorage', async () => {
        await expect(getCategories()).resolves.not.toThrow();
    });

    test('saveCategory no debe usar localStorage', async () => {
        const mockCategory = { id: '123', name: 'Test Category' };
        await expect(saveCategory(mockCategory)).resolves.not.toThrow();
    });

    test('eliminarCategoria no debe usar localStorage', async () => {
        await expect(eliminarCategoria('Test Category')).resolves.not.toThrow();
    });
});