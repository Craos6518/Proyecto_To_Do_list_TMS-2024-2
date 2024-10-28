import { getTasks, saveTasks } from './localStorage.js';

export function mostrarTareas() {
    const tareas = getTasks();
    const contenedorTareas = document.getElementById('tareas-container');
    contenedorTareas.innerHTML = tareas.length 
        ? tareas.map(tarea => `<div class="tarea"><h3>${tarea.title}</h3><p><strong>Descripción:</strong> ${tarea.description}</p><p><strong>Fecha de vencimiento:</strong> ${tarea.dueDate}</p></div>`).join('')
        : '<p>No hay tareas disponibles.</p>';
}

export function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}
