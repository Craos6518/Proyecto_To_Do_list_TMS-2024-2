import { getCategories, saveCategory } from './localStorage.js';
import { generateRandomId } from './utils.js';

export function populateCategories() {
    const categories = getCategories();
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '<option value="">Seleccione una categoría</option>' +
        categories.map(cat => `<option value="${cat.name}">${cat.name}</option>`).join('');
}

export function addCategory(categoryName) {
    const categories = getCategories();
    if (categories.length < 10 && !categories.some(c => c.name === categoryName)) {
        const newCategory = { id: generateRandomId(), name: categoryName };
        saveCategory(newCategory);
        populateCategories();
    } else {
        alert("No se pueden agregar más categorías o la categoría ya existe.");
    }
}

export function openCategory() {
    fetch('view/Form/create-category.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            addCategoryListener();
        })
        .catch(error => console.error('Error al cargar el formulario de categorías:', error));
}

export function addCategoryListener() {
    const categoryForm = document.getElementById('category-form');
    categoryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const categoryName = document.getElementById('category-name').value.trim();
        addCategory(categoryName);
        categoryForm.reset();
    });
}
