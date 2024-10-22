// Cargar la barra de navegación
fetch('view/Navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;

        // Añadir manejadores de eventos a los botones de la barra de navegación
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (event) => {
                // Obtener el archivo que se quiere cargar (por ejemplo, main.html)
                const page = event.target.getAttribute('data-page');
                loadPage(page);

                // Cambiar el estilo del botón activo
               /* document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');*/
            });
        });
    })
    .catch(error => {
        console.error('Error al cargar la barra de navegación:', error);
    });

// Función para cargar contenido dinámico
function loadPage(page) {
    fetch(`view/${page}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error al cargar la página:', error);
        });
}

// Función para abrir el formulario de tareas
function openTaskForm() {
    fetch('view/Form/task-form.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            addFormListener();  // Llamar a la función que maneja el formulario
        })
        .catch(error => {
            console.error('Error al cargar el formulario de tarea:', error);
        });
}

// Función para agregar la lógica del formulario
function addFormListener() {
    const taskForm = document.getElementById('task-form');

    if (taskForm) { // Verificar si el formulario está presente
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que el formulario se envíe y recargue la página

            // Validación de campos obligatorios
            const title = document.getElementById('task-title').value;
            const dueDate = document.getElementById('due-date').value;
            const priority = document.getElementById('priority').value;
            const category = document.getElementById('category').value;

            if (!title || !dueDate || !priority || !category) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            // Capturar los datos del formulario
            const task = {
                title,
                description: document.getElementById('task-description').value || 'Sin descripción',
                dueDate,
                priority,
                category,
            };

            // Obtener las tareas existentes en localStorage o crear una lista vacía si no hay ninguna
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            // Agregar la nueva tarea a la lista de tareas
            tasks.push(task);

            // Guardar la lista de tareas actualizada en localStorage con manejo de errores
            try {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } catch (error) {
                console.error('Error guardando en localStorage', error);
            }

            // Limpiar el formulario
            taskForm.reset();

            alert('Tarea guardada con éxito!');
        });
    }
}

// Llamar a la función cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    // Cargar el formulario por defecto o la página principal
    loadPage('./Alltask/AllTask.html');
});
