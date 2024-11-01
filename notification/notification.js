// Función para obtener las tareas desde localStorage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks"); 
    return tasks ? JSON.parse(tasks) : []; 
}

// Función para verificar si una tarea está próxima a vencer
function isDueSoon(dueDate) {
    const today = new Date();
    const taskDueDate = new Date(dueDate);

    // Restablecer las horas para comparar solo la fecha
    today.setHours(0, 0, 0, 0);
    taskDueDate.setHours(0, 0, 0, 0);

    // Diferencia de días redondeada
    const timeDifference = taskDueDate - today; 
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); 

    console.log(`Due date: ${dueDate}, Today's date: ${today.toDateString()}, Days difference: ${daysDifference}`);

    return daysDifference >= 0 && daysDifference <= 3; 
}

// Función para llenar el modal con la información de la tarea
function fillModal(task) {
    document.getElementById('taskTitle').textContent = task.title;
    document.getElementById('dueDate').textContent = task.dueDate;
    document.getElementById('taskDescription').textContent = task.description || 'Sin descripción disponible.';
    document.getElementById('taskPriority').textContent = task.priority;
    document.getElementById('taskPriority').className = 'priority ' + task.priority.toLowerCase();
    document.getElementById('taskStatus').textContent = task.status;
}

// Función para mostrar el modal
function showModal() {
    const modal = document.getElementById("taskModal");
    modal.style.display = "block";
}

// Función para mostrar una notificación en pantalla
function showNotification(message) {
    const notificationContainer = document.createElement("div");
    notificationContainer.className = "notification";
    notificationContainer.innerText = message;

    document.body.appendChild(notificationContainer);

    setTimeout(() => {
        notificationContainer.remove();
    }, 5000);
}

// Función principal para verificar y notificar sobre las tareas próximas a vencer
function checkTaskDeadlines() {
    const tasks = getTasksFromLocalStorage();
    const dueSoonTasks = tasks.filter(task => isDueSoon(task.dueDate));

    if (dueSoonTasks.length > 0) {
        fillModal(dueSoonTasks[0]); 
        showModal(); // Muestra el modal automáticamente
       // showNotification(`La tarea "${dueSoonTasks[0].title}" está próxima a vencer.`);
    } else {
        console.log("No hay tareas próximas a vencer");
    }
}

// Inicializar y ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    checkTaskDeadlines();

    // Configura la verificación de recordatorios cada hora
    setInterval(checkTaskDeadlines, 60 * 60 * 1000);
});

// Configura el cierre del modal
document.addEventListener("click", (event) => {
    const modal = document.getElementById("taskModal");
    const closeBtn = document.getElementsByClassName("close")[0];
    
    if (event.target == modal || event.target == closeBtn) {
        modal.style.display = "none";
    }
});
