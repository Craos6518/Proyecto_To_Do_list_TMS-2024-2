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
            });
        });
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

function openTaskForm() {
    fetch('view/Form/task-form.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('task-form').innerHTML = data;
        })
        .catch(error => {
            console.error('Error al cargar el formulario de tarea:', error);
        });
}
