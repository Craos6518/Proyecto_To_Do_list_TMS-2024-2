document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value;

    if (title && dueDate && priority && category) {
        // Aquí puedes agregar la lógica para guardar la tarea en la base de datos
        console.log('Tarea creada:', {
            title,
            description,
            dueDate,
            priority,
            category
        });

        // Limpiar el formulario después de crear la tarea
        document.getElementById('task-form').reset();
        alert('Tarea creada exitosamente!');
    } else {
        alert('Por favor, completa todos los campos requeridos.');
    }
});

// Función para cancelar la creación de tarea
function cancelTaskCreation() {
    if (confirm("¿Estás seguro de que deseas cancelar la creación de la tarea?")) {
        // Redirigir a la vista principal o simplemente cerrar el formulario
        window.location.href = 'index.html'; // Cambia esta URL a la vista que desees
    }
}
