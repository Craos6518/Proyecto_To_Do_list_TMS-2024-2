function mostrarTareasPorEstado() {
    const tareas = getTasks();
    
    // Contenedores para cada estado
    const completedTasks = document.getElementById('completed-tasks');
    const pendingTasks = document.getElementById('pending-tasks');
    const postponedTasks = document.getElementById('postponed-tasks');

    // Limpiar los contenedores
    completedTasks.innerHTML = '';
    pendingTasks.innerHTML = '';
    postponedTasks.innerHTML = '';

    // Filtrar y mostrar tareas según el estado
    const completadas = tareas.filter(tarea => tarea.status === 'Completada').slice(0, 8);
    const pendientes = tareas.filter(tarea => tarea.status === 'Pendiente').slice(0, 8);
    const aplazadas = tareas.filter(tarea => tarea.status === 'Aplazado').slice(0, 8);

    completadas.forEach(tarea => {
        const tareaElemento = crearElementoTarea(tarea);
        completedTasks.appendChild(tareaElemento);
    });

    pendientes.forEach(tarea => {
        const tareaElemento = crearElementoTarea(tarea);
        pendingTasks.appendChild(tareaElemento);
    });

    aplazadas.forEach(tarea => {
        const tareaElemento = crearElementoTarea(tarea);
        postponedTasks.appendChild(tareaElemento);
    });
}

function crearElementoTarea(tarea) {
    const tareaElemento = document.createElement('div');
    tareaElemento.classList.add('task');

    // Aplicar clase de color según la prioridad
    switch (tarea.status) {
        case 'Completada':
            tareaElemento.classList.add('priority-completed');
            break;
        case 'Pendiente':
            tareaElemento.classList.add('priority-pending');
            break;
        case 'Aplazado':
            tareaElemento.classList.add('priority-postponed');
            break;
        default:
            break;
    }

    tareaElemento.innerHTML = `
        <h3>${tarea.title}</h3>
        <p>Fecha de vencimiento: ${tarea.dueDate}</p>
    `;

    // Agregar evento de clic
    tareaElemento.addEventListener('click', () => mostrarDetallesTarea(tarea));
    
    return tareaElemento;
}


// Función para mostrar detalles de la tarea
function mostrarDetallesTarea(tarea) {
    document.getElementById('task-title').innerText = `Título: ${tarea.title}`;
    document.getElementById('task-description').innerText = `Descripción: ${tarea.description}`;
    document.getElementById('task-due-date').innerText = `Fecha de vencimiento: ${tarea.dueDate}`;
    document.getElementById('task-priority').innerText = `Prioridad: ${tarea.priority}`;
    document.getElementById('task-category').innerText = `Categoría: ${tarea.category}`;
    document.getElementById('task-start-date').innerText = `Fecha de inicio: ${tarea.startDate}`;
    
    // Mostrar el contenedor de detalles
    document.getElementById('task-details').style.display = 'block';
}

// Función para ocultar los detalles de la tarea
function hideTaskDetails() {
    document.getElementById('task-details').style.display = 'none';
}

// Función para obtener las tareas desde localStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}


// Mostrar tareas por estado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarTareasPorEstado(); // Mostrar tareas después de que la página se haya cargado
});

// Función para añadir una nueva tarea (ejemplo)
function addTask() {
    alert("Función para agregar tarea no implementada.");
}

// Cargar la barra de navegación desde navbar.html y añadir eventos de redirección
fetch('./public/Navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;

        // Añadir manejadores de eventos a los botones de la barra de navegación
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const page = event.target.getAttribute('data-page');
                window.location.href = page; // Redirige a la página HTML especificada
            });
        });
    })
    .catch(error => {
        console.error('Error al cargar la barra de navegación:', error);
    });