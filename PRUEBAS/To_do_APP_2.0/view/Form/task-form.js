//view/Form/task-form.html
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe y recargue la página

        // Capturar los datos del formulario
        const task = {
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            dueDate: document.getElementById('due-date').value,
            priority: document.getElementById('priority').value,
            category: document.getElementById('category').value,
        };

        // Obtener las tareas existentes en localStorage o crear una lista vacía si no hay ninguna
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Agregar la nueva tarea a la lista de tareas
        tasks.push(task);

        // Guardar la lista de tareas actualizada en localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Limpiar el formulario
        taskForm.reset();

        alert('Tarea guardada con éxito!');
    });
});