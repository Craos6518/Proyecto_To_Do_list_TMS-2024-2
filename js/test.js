// Muestra la notificación para las pruebas
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    notificationMessage.textContent = message;
    notification.classList.remove('hidden');
    console.log("Notificación mostrada:", message);
}

// Función simulada para obtener tareas
function getTasks() {
    const currentTime = new Date().getTime();

    // Crea tareas simuladas con diferentes tiempos de vencimiento
    return [
        { title: "Tarea vencida", dueDate: currentTime - 10000, notified: false },  // Ya vencida
        { title: "Tarea a punto de vencerse", dueDate: currentTime + 10000, notified: false },  // Se vence pronto
        { title: "Tarea a largo plazo", dueDate: currentTime + 48 * 60 * 60 * 1000, notified: false }  // Falta mucho tiempo
    ];
}

// Lógica de prueba para verificar el sistema de notificación
function testNotificationSystem() {
    console.log("Iniciando pruebas de notificación...");

    // Llamamos a la función que verifica y muestra notificaciones
    checkTasks();

    // Verificamos si la notificación se muestra correctamente
    const notification = document.getElementById('notification');
    if (!notification.classList.contains('hidden')) {
        console.log("Prueba exitosa: se mostró una notificación para una tarea a punto de vencerse.");
    } else {
        console.error("Prueba fallida: no se mostró una notificación cuando debería.");
    }
}

// Ejecuta la prueba después de que el documento esté listo
window.onload = function() {
    testNotificationSystem();
};
