//main.js
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
            ${tarea.status !== 'Completada' ? `<button onclick="editTask('${tarea.id}')">Editar</button>` : ''}
            <button class='delete-button' onclick="deleteTask('${tarea.id}')">Eliminar</button>
            <button class='Complete-button' onclick="toggleTaskStatus('${tarea.id}')">${tarea.status === 'Pendiente' ? '✓Marcar como Completada' : 'Marcar como Pendiente'}</button>
            <button class="btn-aplazar" onclick="toggleMenu()">Aplazar Tarea</button>
            <div class="menu-aplazar" id="menu-aplazar">
                <div onclick="aplazarTarea(1, '${tarea.id}')">1 día</div>
                <div onclick="aplazarTarea(3, '${tarea.id}')">3 días</div>
                <div onclick="aplazarTarea(7, '${tarea.id}')">7 días</div>
                <div onclick="aplazarTarea(14, '${tarea.id}')">14 días</div>
            </div>
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
function aplazarTarea(dias, taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        const dueDate = new Date(task.dueDate);
        dueDate.setDate(dueDate.getDate() + dias);
        task.dueDate = dueDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        task.status = 'Aplazado'; // Cambiar el estado a "Aplazado"
        saveTasks(tasks);
        alert(`La tarea ha sido aplazada ${dias} días.`);
        mostrarTareas();
    }
}

function toggleMenu() {
    const menu = document.getElementById('menu-aplazar');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
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

function deleteTask(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId); // Encuentra la tarea a eliminar
    const updatedTasks = tasks.filter(t => t.id !== taskId); // Filtra la tarea a eliminar
    if (confirm(`¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`)) {
        saveTasks(updatedTasks); // Guarda las tareas actualizadas
        alert('Tarea eliminada con éxito!');
        mostrarTareas(); // Actualiza la vista
    }
}
function editTask(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId); // Encuentra la tarea a editar

    // Verifica si la tarea está completada y no permite la edición
    if (task && task.status === 'Completada') {
        alert('No se puede editar una tarea completada.');
        return; // Sale de la función si la tarea está completada
    }

    if (!task) return; // Si la tarea no existe, salir de la función

    // Crear elementos para edición (o podrías mostrar un modal con un formulario)
    const contenedorTareas = document.getElementById('tareas-container');
    contenedorTareas.innerHTML = `
        <div class="edit-task-form">
            <h3>Editar Tarea</h3>
            <label>Título: <input type="text" id="edit-title" value="${task.title}"></label>
            <label>Descripción: <input type="text" id="edit-description" value="${task.description}"></label>
            <label>Fecha de Vencimiento: <input type="date" id="edit-dueDate" value="${task.dueDate}"></label>
            <button onclick="saveTaskEdit('${taskId}')">Guardar Cambios</button>
            <button onclick="mostrarTareas()">Cancelar</button>
        </div>
    `;
}
function saveTaskEdit(taskId) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId); // Encuentra el índice de la tarea

    if (taskIndex === -1) return; // Si la tarea no existe, salir de la función

    // Actualizar los detalles de la tarea
    tasks[taskIndex].title = document.getElementById('edit-title').value;
    tasks[taskIndex].description = document.getElementById('edit-description').value;
    tasks[taskIndex].dueDate = document.getElementById('edit-dueDate').value;
     
    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Validación de la fecha de vencimiento
    if (tasks[taskIndex].dueDate < currentDate) {
        alert('La fecha de vencimiento no puede ser anterior a la fecha actual.');
        return;
    }

    saveTasks(tasks); // Guarda las tareas actualizadas en LocalStorage
    alert('Tarea actualizada con éxito!');
    showNotification(`La tarea ha sido marcada como ${tasks[taskIndex].status}!`); // Muestra la notificación
    mostrarTareas(); // Refresca la vista de tareas
}
function toggleTaskStatus(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.status = task.status === 'Pendiente' ? 'Completada' : 'Pendiente';
        saveTasks(tasks);
        showNotification(`La tarea ha sido marcada como ${task.status}!`); // Muestra la notificación
        mostrarTareas();
    }
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
    fetch('public/Form/create-task-form.html')
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

            // Obtener la fecha actual en formato YYYY-MM-DD
            const today = new Date();
            const currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            // Validación de la fecha de vencimiento
            if (dueDate < currentDate) {
                alert('La fecha de vencimiento no puede ser anterior a la fecha actual.');
                return;
            }

            const categories = getCategories();
            const category = categories.find(cat => cat.name === categoryName);
            const taskId = `${category?.id || 'default'}${generateRandomId()}`;

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
                category(categoryName);
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
fetch('/public/Navbar/navbar.html')
    .then( response => response.text())
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


function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    notificationMessage.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Ocultar la notificación después de 3 segundos
}

function closeNotification() {
    document.getElementById('notification').style.display = 'none';
}