import { getTasks, saveTasks } from './localStorage.js';

// Función para mostrar tareas desde localStorage en el contenedor 'tareas-container'
export function mostrarTareas(maxRows = 3) {
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
     }
}
export function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}
