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

// Parte central: Todo lo relacionado con formularios y categorías

const MAX_CATEGORIES = 10;

// Generar un ID alfanumérico aleatorio
function generateRandomId(length = 4) {
    const characters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

// Obtener categorías desde LocalStorage
function getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || [];
}

// Guardar categorías en LocalStorage
function saveCategory(category) {
    const categories = getCategories();
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Función para abrir el formulario de categorías
function openCategory(){
    fetch('view/Form/create-category.html')
    .then(response => response.text())
    .then(data =>{
        document.getElementById('main-content').innerHTML = data;
        addCategoryListener();
    })
    .catch(error => {
        console.error('Error al cargar el formulario de categorías:', error);
    });
}

// Función para agregar lógica del formulario de categorías
function addCategoryListener() {
    const categoryForm = document.getElementById('category-form');
    categoryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const categoryName = document.getElementById('category-name').value.trim();
        let categories = getCategories();
        
        if (categories.length >= MAX_CATEGORIES) {
            alert('No puedes agregar más de 10 categorías.');
            return;
        }

        if (categories.some(category => category.name === categoryName)) {
            alert('Esta categoría ya existe.');
            return;
        }

        const newCategory = { id: generateRandomId(), name: categoryName };
        saveCategory(newCategory);
        alert(`Categoría "${categoryName}" creada con éxito.`);
        categoryForm.reset();
    });
}

// Función para abrir el formulario de tareas
function openTaskForm() {
    fetch('view/Form/task-form.html')
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
                startDate: currentDate
            };

            addTask(task);
            if (!category) {
                addCategory(categoryName);
            }
            taskForm.reset();
            alert('Tarea guardada con éxito!');
        });
    }
}

// Función para guardar tareas en LocalStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para recuperar tareas desde LocalStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Función para agregar una nueva tarea
function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

// Mostrar tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadPage('./Alltask/AllTask.html');
    addCategoryListener();
    document.querySelector('.floating-btn').addEventListener('click', () => {
        const currentPage = document.getElementById('main-content').innerHTML;
        if (currentPage.includes('Todas las tareas')) openTaskForm();
        else if (currentPage.includes('Tareas por categoría')) openCategory();
        else alert('Formulario no disponible para esta vista.');
    });
});
