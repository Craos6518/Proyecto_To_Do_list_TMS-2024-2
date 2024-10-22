// Datos de ejemplo de la tarea
var taskData = {
    title: "Finalizar proyecto de To Do List",
    dueDate: "2024-10-25",
    description: "Desarrollar la funcionalidad de base de datos para almacenar las tareas.",
    priority: "Alta",  // Opciones: "Crítica", "Alta", "Normal", "Baja"
    status: "En progreso"  // Opciones: "En progreso", "Aplazada"
};

// Función para llenar el modal con la información de la tarea
function fillModal(task) {
    document.getElementById('taskTitle').textContent = task.title;
    document.getElementById('dueDate').textContent = task.dueDate;
    document.getElementById('taskDescription').textContent = task.description || 'Sin descripción disponible.';
    document.getElementById('taskPriority').textContent = task.priority;
    document.getElementById('taskPriority').className = 'priority ' + task.priority.toLowerCase(); // Asigna clase según la prioridad
    document.getElementById('taskStatus').textContent = task.status;
}

// Selección de los elementos
var modal = document.getElementById("taskModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

// Llenar el modal con los datos de la tarea
fillModal(taskData);

// Cuando el usuario hace clic en el botón, se muestra el modal
btn.onclick = function() {
    modal.style.display = "block";
}

// Cuando el usuario hace clic en (x), se cierra el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, se cierra el modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}