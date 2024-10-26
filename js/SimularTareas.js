
const tareasSimuladas = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1, // Asignar un ID único
    title: `Tarea ${index + 1}`, // Títulos de Tarea
    description: `Descripción de la tarea ${index + 1}`, // Descripción
    startDate: `2024-10-01`, // Fecha de inicio
    dueDate: `2024-10-31`, // Fecha de vencimiento
    priority: index % 3 === 0 ? 'Alta' : index % 3 === 1 ? 'Media' : 'Baja', // Prioridad
    category: `Categoría ${index % 5 + 1}`, // Categoría
    status: index % 2 === 0 ? 'Completada' : 'Pendiente' // Estado
}));

// Guardar tareas simuladas en localStorage
localStorage.setItem('tasks', JSON.stringify(tareasSimuladas));