// Función para completar la tarea
function completeTask(task) {
    task.status = 'Completada';
    updateTaskInLocalStorage(task);
    showNotification(`La tarea "${task.title}" ha sido completada.`);
}

// Función para aplazar la tarea
function deferTask(task) {
    task.status = 'Aplazada';
    updateTaskInLocalStorage(task);
    showNotification(`La tarea "${task.title}" ha sido aplazada.`);
}

// Función para actualizar la tarea en localStorage
function updateTaskInLocalStorage(updatedTask) {
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.title === updatedTask.title);
    if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Agregar eventos a los botones
document.addEventListener("DOMContentLoaded", () => {
    const completeBtn = document.getElementById("completeTaskBtn");
    const deferBtn = document.getElementById("deferTaskBtn");

    completeBtn.addEventListener("click", () => {
        completeTask(currentTask); // Usa la variable que contiene la tarea actual
        closeModal();
    });

    deferBtn.addEventListener("click", () => {
        deferTask(currentTask); // Usa la variable que contiene la tarea actual
        closeModal();
    });
});

// Variables globales
let currentTask = {}; // Para almacenar la tarea actualmente mostrada en el modal

// Modificar la función fillModal
function fillModal(task) {
    currentTask = task; // Asignar la tarea actual
    document.getElementById('taskTitle').textContent = task.title;
    document.getElementById('dueDate').textContent = task.dueDate;
    document.getElementById('taskDescription').textContent = task.description || 'Sin descripción disponible.';
    document.getElementById('taskPriority').textContent = task.priority;
    document.getElementById('taskPriority').className = 'priority ' + task.priority.toLowerCase();
    document.getElementById('taskStatus').textContent = task.status;
}
