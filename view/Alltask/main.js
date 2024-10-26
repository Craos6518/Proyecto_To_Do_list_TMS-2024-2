//view/ALLtask/main.js
// Función para mostrar tareas desde localStorage en el contenedor 'tareas-container'
function mostrarTareas() {
    const tareas = getTasks();
    const contenedorTareas = document.getElementById('tareas-container');
    const loadMoreButton = document.getElementById('load-more-button');
    contenedorTareas.innerHTML = ''; // Limpiar el contenedor

    // Verifica si hay tareas para mostrar
    if (tareas.length === 0) {
        contenedorTareas.innerHTML = '<p>No hay tareas disponibles.</p>';
        loadMoreButton.style.display = 'none';
        return;
    }

    const maxRows = 6; // Número máximo de filas a mostrar
    const tasksPerRow = 2; // Número de tareas por fila
    const totalRows = Math.ceil(tareas.length / tasksPerRow); // Calcular total de filas

    // Mostrar solo las primeras 4 filas
    const tareasAMostrar = Math.min(maxRows * tasksPerRow, tareas.length);
    for (let i = 0; i < tareasAMostrar; i++) {
        const tarea = tareas[i];
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('tarea');
        
        // Usar un template literal para definir el HTML de la tarea
        tareaElemento.innerHTML = `
            <h3>${tarea.title}</h3>
            <p><strong>Descripción:</strong> ${tarea.description}</p>
            <p><strong>Fecha de vencimiento:</strong> ${tarea.dueDate}</p>
        `;
        
        contenedorTareas.appendChild(tareaElemento);
    }

    // Mostrar el botón si hay más tareas
    if (tareas.length > tareasAMostrar) {
        loadMoreButton.style.display = 'block';
    } else {
        loadMoreButton.style.display = 'none';
    }

    // Manejo del evento para cargar más tareas
    loadMoreButton.onclick = () => {
        // Aquí puedes redirigir a otra página o mostrar más tareas
        window.location.href = './path-to-more-tasks.html'; // Cambia esto a la URL deseada
    };
}
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}



// Simular tareas
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

// Mostrar tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarTareas(); // Mostrar tareas después de que la página se haya cargado
});

