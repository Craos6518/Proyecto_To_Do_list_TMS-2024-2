// Función para mostrar tareas desde localStorage en el contenedor 'tareas-container'
function mostrarTareas() {
    const tareas = getTasks();
    const contenedorTareas = document.getElementById('tareas-container');
    contenedorTareas.innerHTML = ''; // Limpiar el contenedor

    // Verifica si hay tareas para mostrar
    if (tareas.length === 0) {
        contenedorTareas.innerHTML = '<p>No hay tareas disponibles.</p>';
        return;
    }

    tareas.forEach(tarea => {
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('tarea');
        
        // Usar un template literal para definir el HTML de la tarea
        tareaElemento.innerHTML = `
            <h3>${tarea.title}</h3>
            <p><strong>Descripción:</strong> ${tarea.description}</p>
            <p><strong>Fecha de inicio:</strong> ${tarea.startDate}</p>
            <p><strong>Fecha de vencimiento:</strong> ${tarea.dueDate}</p>
            <p><strong>Prioridad:</strong> ${tarea.priority}</p>
            <p><strong>Categoría:</strong> ${tarea.category}</p>
            <p><strong>Estado:</strong> ${tarea.status || 'Pendiente'}</p>
        `;
        
        contenedorTareas.appendChild(tareaElemento);
    });
}
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}
// Llamar a mostrarTareas cuando se carga la página 'Todas las tareas'
document.addEventListener('DOMContentLoaded', () => {
    //loadPage('./Alltask/AllTask.html'); // Cargar la página principal por defecto
    mostrarTareas(); // Mostrar tareas después de que la página se haya cargado
});
