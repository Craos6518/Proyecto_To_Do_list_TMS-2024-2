import { initNavigation, loadPage } from './nav.js';
import { mostrarTareas } from './taskManager.js';
import { openTaskForm } from './formManager.js';
import { openCategory } from './categoryManager.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    loadPage('Alltask/AllTask.html');
    mostrarTareas();

    document.querySelector('.floating-btn').addEventListener('click', () => {
        const currentPage = document.getElementById('main-content').innerHTML;
        if (currentPage.includes('Todas las tareas')) {
            openTaskForm();
        } else if (currentPage.includes('Tareas por categoría')) {
            openCategory();
        } else {
            alert('Formulario no disponible para esta vista.');
        }
    });
});
