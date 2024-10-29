// Función para mostrar tareas desde localStorage en el contenedor 'tareas-container'
function mostrarTareas(maxRows = 3) {
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

    const tasksPerRow = 2; // Número de tareas por fila
    let tareasAMostrar = maxRows * tasksPerRow; // Cantidad de tareas a mostrar inicialmente
    tareasAMostrar = Math.min(tareasAMostrar, tareas.length); // Limitar la cantidad si hay menos tareas

    for (let i = 0; i < tareasAMostrar; i++) {
        const tarea = tareas[i];
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('tarea');
        
        // Definir el HTML de cada tarea
        tareaElemento.innerHTML = `
            <h3>${tarea.title}</h3>
            <p><strong>Descripción:</strong> ${tarea.description}</p>
            <p><strong>Fecha de vencimiento:</strong> ${tarea.dueDate}</p>
        `;
        
        contenedorTareas.appendChild(tareaElemento);
    }

    // Mostrar el botón "Cargar más" si hay tareas adicionales
    loadMoreButton.style.display = tareas.length > tareasAMostrar ? 'block' : 'none';

    // Manejo del evento para cargar más tareas sin redirigir
    loadMoreButton.onclick = () => {
        maxRows += 2; // Incrementa las filas mostradas
        mostrarTareas(maxRows); // Volver a cargar tareas con el nuevo límite
    };
}

// Función para obtener las tareas desde localStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Simulación de tareas en localStorage (solo para desarrollo)
if (!localStorage.getItem('tasks')) {
    const tareasSimuladas = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        title: `Tarea ${index + 1}`,
        description: `Descripción de la tarea ${index + 1}`,
        startDate: `2024-10-01`,
        dueDate: `2024-10-31`,
        priority: index % 3 === 0 ? 'Alta' : index % 3 === 1 ? 'Media' : 'Baja',
        category: `Categoría ${index % 10 + 1}`,
        status: index % 2 === 0 ? 'Completada' : 'Pendiente'
    }));
    localStorage.setItem('tasks', JSON.stringify(tareasSimuladas));
}


// Parte superior: Todo lo relacionado a la barra de navegación

// Función para cargar la barra de navegación
fetch('view/Navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;

        // Añadir manejadores de eventos a los botones de la barra de navegación
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const page = event.target.getAttribute('data-page');
                loadPage(page);
            });
        });
    })
    .catch(error => {
        console.error('Error al cargar la barra de navegación:', error);
    });

// Función para cargar contenido dinámico
function loadPage(page) {
    fetch(`view/${page}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error al cargar la página:', error);
        });
}

// Mostrar tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadPage('./Alltask/AllTaskPrueba.html');
    mostrarTareas(); // Mostrar tareas después de que la página se haya cargado
});
