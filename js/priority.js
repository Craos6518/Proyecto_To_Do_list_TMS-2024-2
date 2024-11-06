function mostrarTareasPorPrioridad() {
    const tareas = getTasks();
    // Contenedores para cada prioridad
    const criticalTasks = document.getElementById('critical-tasks');
    const urgentTasks = document.getElementById('urgent-tasks');
    const normalTasks = document.getElementById('normal-tasks');
    const lowTasks = document.getElementById('low-tasks');

    // Verificar que los contenedores existan
    if (!criticalTasks || !urgentTasks || !normalTasks || !lowTasks) {
        console.error('Uno o más contenedores de prioridad no se encontraron en el DOM.');
        return;
    }

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

        switch (tarea.priority.toLowerCase()) {
            case 'critico':
                criticalTasks.appendChild(tareaElemento);
                break;
            case 'urgente':
                urgentTasks.appendChild(tareaElemento);
                break;
            case 'normal':
                normalTasks.appendChild(tareaElemento);
                break;
            case 'baja':
                lowTasks.appendChild(tareaElemento);
                break;
            default:
                console.warn(`Prioridad desconocida: ${tarea.priority}`);
        }
    });
}

// Función para obtener las tareas desde localStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Mostrar tareas por prioridad al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarTareasPorPrioridad();
});

// Cargar la barra de navegación desde navbar.html y añadir eventos de redirección
fetch('/public/Navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;

        // Añadir manejadores de eventos a los botones de la barra de navegación
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const page = event.target.getAttribute('data-page');
                window.location.href = page;
            });
        });
    })
    .catch(error => {
        console.error('Error al cargar la barra de navegación:', error);
    });
