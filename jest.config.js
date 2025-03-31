module.exports = {
    testEnvironment: 'jsdom', // Simula un entorno de navegador
    roots: ['<rootDir>/backend/tests'], // Ubicación de tus pruebas
    modulePaths: ['<rootDir>'], // Raíz del proyecto
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1', // Mapeo personalizado (opcional)
    },
};