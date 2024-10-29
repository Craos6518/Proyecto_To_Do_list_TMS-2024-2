// Función para obtener las tareas desde localStorage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks"); // Cambiado a "tasks"
    return tasks ? JSON.parse(tasks) : []; // Retorna un array vacío si no hay tareas
}

// Función para verificar si una tarea está próxima a vencer
function isDueSoon(dueDate) {
    const today = new Date();
    const taskDueDate = new Date(dueDate);
    
    // Comprobar si la tarea vence hoy o en los próximos 3 días
    const timeDifference = taskDueDate - today; // Diferencia en milisegundos
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convertir a días

    return daysDifference >= 0 && daysDifference <= 3; // Tarea vence hoy o en 3 días
}

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

// Obtener tareas desde localStorage
var tasks = getTasksFromLocalStorage();

// Filtrar tareas que están próximas a vencer
var dueSoonTasks = tasks.filter(task => isDueSoon(task.dueDate));

// Verifica si hay tareas que están próximas a vencer y llena el modal con la primera
if (dueSoonTasks.length > 0) {
    fillModal(dueSoonTasks[0]); // Llenar el modal con la primera tarea que está próxima a vencer
} else {
    fillModal({
        title: "No hay tareas próximas a vencer",
        dueDate: "",
        description: "No hay tareas que venzan en los próximos días.",
        priority: "",
        status: ""
    }); // Mensaje cuando no hay tareas próximas a vencer
}

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
