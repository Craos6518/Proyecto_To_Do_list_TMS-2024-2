function mostrarTareasPorPrioridad() {
    const tareas = getTasks();
    
    // Contenedores para cada prioridad
    const criticalTasks = document.getElementById('critical-tasks');
    const urgentTasks = document.getElementById('urgent-tasks');
    const normalTasks = document.getElementById('normal-tasks');
    const lowTasks = document.getElementById('low-tasks');

    // Limpiar los contenedores
    criticalTasks.innerHTML = '';
    urgentTasks.innerHTML = '';
    normalTasks.innerHTML = '';
    lowTasks.innerHTML = '';

    // Filtrar y mostrar tareas según la prioridad
    tareas.forEach(tarea => {
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('task');
        tareaElemento.innerHTML = `
            <h3>${tarea.title}</h3>
            <p>Fecha de vencimiento: ${tarea.dueDate}</p>
        `;

        switch (tarea.priority) {
            case 'Critico':
                criticalTasks.appendChild(tareaElemento);
                break;
            case 'Urgente':
                urgentTasks.appendChild(tareaElemento);
                break;
            case 'Normal':
                normalTasks.appendChild(tareaElemento);
                break;
            case 'Baja':
                lowTasks.appendChild(tareaElemento);
                break;
        }
    });
}

// Función para obtener las tareas desde localStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Simulación de tareas en localStorage (solo para desarrollo)
if (!localStorage.getItem('tasks')) {
    const tareasSimuladas = Array.from({ length: 20 }, (_, index) => ({
        taskId: String(index + 1).padStart(8, '0'), // ID de 8 dígitos
        title: `Tarea ${index + 1}`,
        description: `Descripción de la tarea ${index + 1}`,
        startDate: `2024-10-01`,
        dueDate: `2024-10-31`,
        priority: ['Critico', 'Urgente', 'Normal', 'Baja'][index % 4], // Asignación cíclica de prioridades
        category: `Categoría ${index % 5 + 1}`, // Aseguramos que las tareas estén asignadas a categorías simuladas
        status: index % 3 === 0 ? 'Completada' : index % 3 === 1 ? 'Pendiente' : 'Aplazado' // Estado
    }));
    localStorage.setItem('tasks', JSON.stringify(tareasSimuladas));
}

// Mostrar tareas por prioridad al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarTareasPorPrioridad(); // Mostrar tareas después de que la página se haya cargado
});

// Función para añadir una nueva tarea (ejemplo)
function addTask() {
    // Lógica para añadir una nueva tarea (puedes implementarla según sea necesario)
    alert("Función para agregar tarea no implementada.");
}
