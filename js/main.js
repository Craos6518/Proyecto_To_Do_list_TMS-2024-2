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
async function aplazarTarea(dias, taskId) {
    try {
        const response = await fetch(`/api/tasks/${taskId}/aplazar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dias })
        });
        if (!response.ok) throw new Error('Error al aplazar la tarea');
        alert(`La tarea ha sido aplazada ${dias} días.`);
        mostrarTareas(); // Refrescar la vista de tareas
    } catch (error) {
        console.error('Error al aplazar la tarea:', error);
    }
}

function toggleMenu() {
    const menu = document.getElementById('menu-aplazar');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Función para obtener las tareas desde localStorage
async function getTasks() {
    try {
        const response = await fetch('/api/tasks');
        if (!response.ok) throw new Error('Error al obtener las tareas');
        return await response.json();
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        return [];
    }
}

// Función para agregar una tarea
async function addTask(task) {
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
        if (!response.ok) throw new Error('Error al agregar la tarea');
        mostrarTareas(); // Refrescar la vista de tareas
    } catch (error) {
        console.error('Error al agregar la tarea:', error);
    }
}

// Función para guardar tareas en LocalStorage
async function saveTasks(tasks) {
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tasks)
        });
        if (!response.ok) throw new Error('Error al guardar las tareas');
        return await response.json();
    } catch (error) {
        console.error('Error al guardar las tareas:', error);
        alert('No se pudieron guardar las tareas. Por favor, inténtalo de nuevo.');
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar la tarea');
        alert('Tarea eliminada con éxito!');
        mostrarTareas(); // Refrescar la vista de tareas
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
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
async function saveTaskEdit(taskId) {
    const updatedTask = {
        title: document.getElementById('edit-title').value,
        description: document.getElementById('edit-description').value,
        dueDate: document.getElementById('edit-dueDate').value
    };

    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        });
        if (!response.ok) throw new Error('Error al actualizar la tarea');
        alert('Tarea actualizada con éxito!');
        mostrarTareas(); // Refrescar la vista de tareas
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
    }
}

async function toggleTaskStatus(taskId) {
    try {
        const response = await fetch(`/api/tasks/${taskId}/status`, {
            method: 'PUT'
        });
        if (!response.ok) throw new Error('Error al cambiar el estado de la tarea');
        mostrarTareas(); // Refrescar la vista de tareas
    } catch (error) {
        console.error('Error al cambiar el estado de la tarea:', error);
    }
}
// Funciones de Categorías
// =======================

// Función para obtener categorías desde LocalStorage
async function getCategories() {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Error al obtener las categorías');
        return await response.json();
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        return [];
    }
}

// Función para guardar categorías en LocalStorage
async function saveCategory(category) {
    try {
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        });
        if (!response.ok) throw new Error('Error al guardar la categoría');
        return await response.json();
    } catch (error) {
        console.error('Error al guardar la categoría:', error);
    }
}

// Funciones de Formularios
// ========================

// Función para abrir el formulario de tareas
function openTaskForm() {
    fetch('/Proyecto_To_Do_list_TMS-2024-2/public/Form/create-task-form.html')
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
async function populateCategories() {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Error al obtener las categorías');
        const categories = await response.json();

        const categorySelect = document.getElementById('category');
        if (!categorySelect) return; // Asegurarse de que el elemento exista

        // Limpiar y agregar la opción predeterminada
        categorySelect.innerHTML = '<option value="">Seleccione una categoría</option>';

        // Agregar opciones para cada categoría
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
        alert('No se pudieron cargar las categorías. Por favor, inténtalo de nuevo.');
    }
}

// Función para agregar la lógica del formulario de tareas
function addFormListener() {
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const title = document.getElementById('task-title').value;
            const dueDate = document.getElementById('due-date').value;
            const priority = document.getElementById('priority').value;
            const categoryName = document.getElementById('category').value;

            if (!title || !dueDate || !priority || !categoryName) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            // Validación de la fecha de vencimiento
            const today = new Date();
            const currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            if (dueDate < currentDate) {
                alert('La fecha de vencimiento no puede ser anterior a la fecha actual.');
                return;
            }

            // Crear una nueva categoría si no existe
            const categories = await getCategories();
            const categoryExists = categories.some(cat => cat.name === categoryName);
            if (!categoryExists) {
                await saveCategory(categoryName); // Guardar la categoría en el backend
            }

            // Crear la tarea
            const task = {
                title,
                description: document.getElementById('task-description').value || 'Sin descripción',
                dueDate,
                priority,
                category: categoryName,
                startDate: currentDate,
                status: 'Pendiente'
            };
            await addTask(task);

            taskForm.reset();
            alert('Tarea guardada con éxito!');
            mostrarTareas();
        });
    }
}



// Funciones Utilitarias
// =====================

// Cargar la barra de navegación desde navbar.html y añadir eventos de redirección
fetch('/Proyecto_To_Do_list_TMS-2024-2/public/Navbar/navbar.html')
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