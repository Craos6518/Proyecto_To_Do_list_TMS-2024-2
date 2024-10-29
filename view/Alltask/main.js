// script.js

const MAX_CATEGORIES = 10;

// Funciones para obtener y guardar tareas y categorías
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || [];
}

function saveCategories(categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Mostrar tareas
function mostrarTareas(maxRows = 3) {
    const tareas = getTasks();
    const contenedorTareas = document.getElementById('tareas-container');
    contenedorTareas.innerHTML = ''; // Limpiar el contenedor

    // Verifica si hay tareas para mostrar
    if (tareas.length === 0) {
        contenedorTareas.innerHTML = '<p>No hay tareas disponibles.</p>';
        return;
    }

    let tareasAMostrar = maxRows * 2; // Cantidad de tareas a mostrar inicialmente
    tareasAMostrar = Math.min(tareasAMostrar, tareas.length); // Limitar si hay menos tareas

    for (let i = 0; i < tareasAMostrar; i++) {
        const tarea = tareas[i];
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('tarea');
        
        // Definir el HTML de cada tarea
        tareaElemento.innerHTML = `
            <h3>${tarea.title}</h3>
            <p><strong>Descripción:</strong> ${tarea.description}</p>
            <p><strong>Fecha de vencimiento:</strong> ${tarea.dueDate}</p>
            <button onclick="openEditTaskForm('${tarea.id}')">Editar</button>
            <button onclick="deleteTask('${tarea.id}')">Eliminar</button>
        `;
        
        contenedorTareas.appendChild(tareaElemento);
    }
}

// Función para abrir el formulario de edición de tareas
function openEditTaskForm(taskId) {
    const task = getTasks().find(t => t.id === taskId);
    if (!task) {
        console.error('Tarea no encontrada');
        return;
    }

    // Crear formulario para editar tarea
    const formHTML = `
        <form id="task-form">
            <input type="text" id="task-title" value="${task.title}" required />
            <input type="date" id="due-date" value="${task.dueDate}" required />
            <select id="priority" required>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>
            <textarea id="task-description">${task.description}</textarea>
            <button type="submit">Actualizar Tarea</button>
            <button type="button" onclick="cancelEdit()">Cancelar</button>
        </form>
    `;
    document.getElementById('main-content').innerHTML = formHTML;

    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateTask(taskId);
    });
}

// Actualizar tarea
function updateTask(taskId) {
    const tasks = getTasks();
    const updatedTask = {
        id: taskId,
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-description').value,
        dueDate: document.getElementById('due-date').value,
        priority: document.getElementById('priority').value
    };

    const updatedTasks = tasks.map(task => task.id === taskId ? updatedTask : task);
    saveTasks(updatedTasks);
    alert('Tarea actualizada con éxito!');
    mostrarTareas(); // Recargar las tareas
}

// Eliminar tarea
function deleteTask(taskId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        const tasks = getTasks().filter(task => task.id !== taskId);
        saveTasks(tasks);
        mostrarTareas(); // Actualizar la lista de tareas
    }
}

// Funciones para categorías
function deleteCategory(categoryId) {
    const categories = getCategories();
    const category = categories.find(cat => cat.id === categoryId);

    // Validar que no haya tareas asociadas
    const tareas = getTasks();
    const hasTasks = tareas.some(t => t.category === category.name);
    if (hasTasks) {
        alert('No puedes eliminar esta categoría porque tiene tareas asociadas.');
        return;
    }

    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    saveCategories(updatedCategories);
    alert('Categoría eliminada con éxito!');
}

// Función para cancelar la edición
function cancelEdit() {
    mostrarTareas(); // Regresar a la lista de tareas
}

// Mostrar tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarTareas(); // Mostrar tareas después de que la página se haya cargado
});
