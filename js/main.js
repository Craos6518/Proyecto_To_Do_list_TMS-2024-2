// Parte superior: Todo lo relacionado a la barra de navegación

// Función para cargar la barra de navegación
fetch('view/Navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;

        // Añadir manejadores de eventos a los botones de la barra de navegación
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const page = event.target.getAttribute('data-page');
                loadPage(page);
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

//Parte central: Todo lo relacionado con formularios

// Constante para el límite de categorías
const MAX_CATEGORIES = 10;

// Función para generar un ID alfanumérico aleatorio de 4 dígitos
function generateRandomId(length = 4) {
    const characters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}

// Función para obtener las categorías desde LocalStorage
function getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || [];
}

// Función para agregar una nueva tarea
function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

// Función para agregar una nueva categoría con límite
function addCategory(categoryName) {
    const categories = getCategories();
    
    if (categories.length < MAX_CATEGORIES) {
        const newCategory = {
            id: generateRandomId(),
            name: categoryName
        };
        saveCategory(newCategory);
        return newCategory; // Retornar la nueva categoría
    } else {
        alert("No se pueden agregar más de 10 categorías."); // Mensaje de error
        return null; // Retornar null si no se puede agregar
    }
}

// Función para abrir el formulario de tareas
function openTaskForm() {
    fetch('view/Form/task-form.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            populateCategories(); // Llenar el select de categorías
            addFormListener();  // Llamar a la función que maneja el formulario
        })
        .catch(error => {
            console.error('Error al cargar el formulario de tarea:', error);
        });
}

// Función para abrir el formulario de categorías
// Función para abrir el formulario de categorías
function openCategory(){
    fetch('view/Form/create-category.html')
    .then(response => response.text())
    .then(data =>{
        document.getElementById('main-content').innerHTML = data;
        addCategoryListener(); // Añadir el listener del formulario de categorías
    })
    .catch(error => {
        console.error('Error al cargar el formulario de categorías:', error);
    });
}

// Función para llenar el select de categorías
function populateCategories() {
    const categories = getCategories();
    const categorySelect = document.getElementById('category');

    // Limpiar las opciones existentes
    categorySelect.innerHTML = '<option value="">Seleccione una categoría</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name; // Valor de la opción
        option.textContent = category.name; // Texto a mostrar
        categorySelect.appendChild(option);
    });
}

// Función para agregar la lógica del formulario de tareas
function addFormListener() {
    const taskForm = document.getElementById('task-form');

    if (taskForm) { // Verificar si el formulario está presente
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que el formulario se envíe y recargue la página

            // Validación de campos obligatorios
            const title = document.getElementById('task-title').value;
            const dueDate = document.getElementById('due-date').value;
            const priority = document.getElementById('priority').value;
            const categoryName = document.getElementById('category').value;

            if (!title || !dueDate || !priority || !categoryName) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            // Capturar la fecha actual del sistema en formato YYYY-MM-DD
            const today = new Date();
            const currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            // Buscar la categoría existente
            const categories = getCategories();
            const category = categories.find(cat => cat.name === categoryName);

            // Generar el ID único para la tarea basado en el ID de la categoría
            const taskId = `${category.id}${generateRandomId()}`; // ID de tarea = ID de categoría + ID de tarea aleatorio

            // Capturar los datos del formulario
            const task = {
                id: taskId, // Asignar el ID único
                title,
                description: document.getElementById('task-description').value || 'Sin descripción',
                dueDate,
                priority,
                category: categoryName,
                startDate: currentDate // Agregar la fecha actual
            };

            // Agregar la nueva tarea
            addTask(task);

            // Agregar la categoría si no existe
            if (!category) {
                addCategory(categoryName);
            }

            // Limpiar el formulario
            taskForm.reset();

            alert('Tarea guardada con éxito!');
        });
    }
}

// Función para manejar la creación de una nueva categoría
function addCategoryListener() {
    const categoryForm = document.getElementById('category-form');

    categoryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Capturar el nombre de la categoría
        const categoryName = document.getElementById('category-name').value.trim();

        // Validación: Verificar si ya existen 10 categorías
        let categories = getCategories();
        if (categories.length >= 10) {
            alert('No puedes agregar más de 10 categorías.');
            return;
        }

        // Validación: Verificar si la categoría ya existe
        if (categories.some(category => category.name === categoryName)) {
            alert('Esta categoría ya existe.');
            return;
        }

        // Crear un nuevo objeto de categoría con un ID único
        const newCategory = {
            id: generateRandomId(),
            name: categoryName
        };

        // Guardar la nueva categoría en LocalStorage
        saveCategory(newCategory);

        // Mostrar mensaje de éxito
        alert(`Categoría "${categoryName}" creada con éxito.`);

        // Limpiar el formulario
        categoryForm.reset();
    });
}

// Parte inferior: Todo lo relacionado con el almacenamiento localStorage

// Función para guardar tareas en LocalStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para guardar categorías en LocalStorage
function saveCategory(category) {
    const categories = getCategories();
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Función para recuperar tareas desde LocalStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Llamar a la función cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    loadPage('./Alltask/AllTask.html'); // Cargar la página principal por defecto
    addCategoryListener();
    // Manejo del botón flotante
    document.querySelector('.floating-btn').addEventListener('click', function() {
        const currentPage = document.getElementById('main-content').innerHTML;

        if (currentPage.includes('Todas las tareas')) {
            openTaskForm(); // Cargar el formulario de tareas
        } else if (currentPage.includes('Tareas por categoría')) {
            openCategory(); // Cargar el formulario de categorías
        } else {
            alert('Formulario no disponible para esta vista.');
        }
    });
});
