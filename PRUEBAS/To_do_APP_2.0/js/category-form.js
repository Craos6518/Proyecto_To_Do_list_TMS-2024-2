// Función para generar un ID alfanumérico de 4 caracteres
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

// Función para guardar una nueva categoría
function saveCategory(category) {
    const categories = getCategories();
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
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

// Llamar a la función cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    addCategoryListener();
});
