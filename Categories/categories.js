function mostrarCategorias(maxRows = 3) {
    const tareas = getTasks();
    const categorias = getCategories();
    const contenedorCategorias = document.getElementById('tareas-container');
    const loadMoreButton = document.getElementById('load-more-button');
    contenedorCategorias.innerHTML = ''; // Limpiar el contenedor

    // Verifica si hay categorías para mostrar
    if (categorias.length === 0) {
        contenedorCategorias.innerHTML = '<p>No hay categorías disponibles.</p>';
        loadMoreButton.style.display = 'none';
        return;
    }

    const tasksPerRow = 2; // Número de tareas por fila
    let categoriasAMostrar = maxRows; // Cantidad de categorías a mostrar inicialmente
    categoriasAMostrar = Math.min(categoriasAMostrar, categorias.length); // Limitar la cantidad si hay menos categorías

    for (let i = 0; i < categoriasAMostrar; i++) {
        const categoria = categorias[i];
        const categoriaElemento = document.createElement('div');
        categoriaElemento.classList.add('categoria');
        
        // Usar la propiedad correcta para el nombre de la categoría
        if (categoria && categoria.name) {
            categoriaElemento.innerHTML = `<h2>${categoria.name}</h2>`;
        } else {
            console.error('Categoría no válida:', categoria);
            continue; // Salir de la iteración si la categoría es inválida
        }
    
        // Filtrar las tareas por esta categoría
        const tareasFiltradas = tareas.filter(tarea => tarea.category === categoria.name);
        
        // Mostrar solo las primeras 10 tareas
        const tareasAMostrar = tareasFiltradas.slice(0, 10);
        
        tareasAMostrar.forEach(tarea => {
            const tareaElemento = document.createElement('div');
            tareaElemento.classList.add('tarea');
    
            // Definir el HTML de cada tarea
            tareaElemento.innerHTML = `
                <h3>${tarea.title}</h3>
                <p><strong>Descripción:</strong> ${tarea.description}</p>
                <p><strong>Fecha de vencimiento:</strong> ${tarea.dueDate}</p>
            `;
    
            categoriaElemento.appendChild(tareaElemento);
        });
    
        contenedorCategorias.appendChild(categoriaElemento);
    }
    

    // Mostrar el botón "Cargar más" si hay categorías adicionales
    loadMoreButton.style.display = categorias.length > categoriasAMostrar ? 'block' : 'none';

    // Manejo del evento para cargar más categorías sin redirigir
    loadMoreButton.onclick = () => {
        maxRows += 1; // Incrementa las categorías mostradas
        mostrarCategorias(maxRows); // Volver a cargar categorías con el nuevo límite
    };
    
}

// Función para obtener las tareas desde localStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Función para obtener las categorías desde localStorage
function getCategories() {
    const categories = localStorage.getItem('categories');
    return categories ? JSON.parse(categories) : [];
}

// Mostrar categorías al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarCategorias(); // Mostrar categorías después de que la página se haya cargado
});

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
    fetch('/form/create-category-form.html')
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
        mostrarCategorias(); // Volver a cargar categorías con el nuevo límite
    });
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