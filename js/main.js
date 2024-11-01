// Funciones de Tareas
// ===================

// Función para mostrar tareas desde localStorage en el contenedor 'tareas-container'

function mostrarTareas(maxRows = 3) {
    const tareas = getTasks();
    const contenedorTareas = document.getElementById('tareas-container');
    const loadMoreButton = document.getElementById('load-more-button');
    contenedorTareas.innerHTML = ''; // Limpiar el contenedor

    // Verifica si hay tareas para mostrar
    if (tareas.length === 0) {
        contenedorTareas.innerHTML = '<p>No hay tareas disponibles.</p>';
        loadMoreButton.style.display = 'none';
        return;
    }

    const tasksPerRow = 2; // Número de tareas por fila
    let tareasAMostrar = maxRows * tasksPerRow; // Cantidad de tareas a mostrar inicialmente
    tareasAMostrar = Math.min(tareasAMostrar, tareas.length); // Limitar la cantidad si hay menos tareas

    for (let i = 0; i < tareasAMostrar; i++) {
        const tarea = tareas[i];
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('tarea');
        
        // Definir el HTML de cada tarea
        tareaElemento.innerHTML = `
            <h3>${tarea.title}</h3>
            <p><strong>Descripción:</strong> ${tarea.description}</p>
            <p><strong>Fecha de vencimiento:</strong> ${tarea.dueDate}</p>
        `;
        
        contenedorTareas.appendChild(tareaElemento);
    }

    // Mostrar el botón "Cargar más" si hay tareas adicionales
    loadMoreButton.style.display = tareas.length > tareasAMostrar ? 'block' : 'none';

    // Manejo del evento para cargar más tareas sin redirigir
    loadMoreButton.onclick = () => {
        maxRows += 2; // Incrementa las filas mostradas
        mostrarTareas(maxRows); // Volver a cargar tareas con el nuevo límite
    };
}
// Función para obtener las tareas desde localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Función para agregar una tarea
function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

// Función para guardar tareas en LocalStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Funciones de Categorías
// =======================

// Función para obtener categorías desde LocalStorage
function getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || [];
}

// Función para guardar categorías en LocalStorage
function saveCategory(category) {
    const categories = getCategories();
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Funciones de Formularios
// ========================

// Función para abrir el formulario de tareas
function openTaskForm() {
    fetch('/Form/task-form.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            populateCategories();
            addFormListener();
        })
        .catch(error => {
            console.error('Error al cargar el formulario de tarea:', error);
        });
}


// Función para llenar el select de categorías en el formulario de tareas
function populateCategories() {
    const categories = getCategories();
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '<option value="">Seleccione una categoría</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// Función para agregar la lógica del formulario de tareas
function addFormListener() {
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('task-title').value;
            const dueDate = document.getElementById('due-date').value;
            const priority = document.getElementById('priority').value;
            const categoryName = document.getElementById('category').value;

            if (!title || !dueDate || !priority || !categoryName) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            const today = new Date();
            const currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            const categories = getCategories();
            const category = categories.find(cat => cat.name === categoryName);
            const taskId = `${category.id}${generateRandomId()}`;

            const task = {
                id: taskId,
                title,
                description: document.getElementById('task-description').value || 'Sin descripción',
                dueDate,
                priority,
                category: categoryName,
                startDate: currentDate,
                status: 'Pendiente'
            };

            addTask(task);
            if (!category) {
                addCategory(categoryName);
            }
            taskForm.reset();
            alert('Tarea guardada con éxito!');
            mostrarTareas();
        });
    }
}


// Funciones Utilitarias
// =====================
const MAX_CATEGORIES = 10;
// Generar un ID alfanumérico aleatorio
function generateRandomId(length = 4) {
    const characters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

// Cargar la barra de navegación desde navbar.html y añadir eventos de redirección
fetch('/Navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;

        // Añadir manejadores de eventos a los botones de la barra de navegación
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const page = event.target.getAttribute('data-page');
                window.location.href = page; // Redirige a la página HTML especificada
            });
        });
    })
    .catch(error => {
        console.error('Error al cargar la barra de navegación:', error);
    });

// Mostrar tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    
    mostrarTareas(); // Mostrar tareas después de que la página se haya cargado
});
