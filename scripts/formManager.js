import { addTask } from './taskManager.js';
import { populateCategories } from './categoryManager.js';
import { generateRandomId } from './utils.js';

export function openTaskForm() {
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

export function addFormListener() {
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
            const categories = saveCategories();
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
            taskForm.reset();
            alert('Tarea guardada con éxito!');
        });
    }
}
