
const tareasSimuladas = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1, // Asignar un ID único
    title: `Tarea ${index + 1}`, // Títulos de Tarea
    description: `Descripción de la tarea ${index + 1}`, // Descripción
    startDate: `2024-10-01`, // Fecha de inicio
    // Fecha de vencimiento
    priority: index % 4 === 0 ? 'Critico' : index % 4 === 1 ? 'Urgente' : index % 4 === 2 ? 'Normal' : 'Baja', // Prioridad
    // Categoría
    status: index % 3 === 0 ? 'Completada' : index % 3 === 1 ? 'Pendiente' : 'Aplazado' // Estado
}));

// Guardar tareas simuladas en localStorage
localStorage.setItem('tasks', JSON.stringify(tareasSimuladas));