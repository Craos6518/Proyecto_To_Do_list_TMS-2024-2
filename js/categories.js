// Función para mostrar las categorías
async function mostrarCategorias(maxRows = 3) {
    try {
        const tareas = await getTasks(); // Obtener tareas del backend
        const categorias = await getCategories(); // Obtener categorías del backend
        const contenedorCategorias = document.getElementById('tareas-container');
        const loadMoreButton = document.getElementById('load-more-button');
        contenedorCategorias.innerHTML = ''; // Limpiar el contenedor

        // Verifica si hay categorías para mostrar
        if (categorias.length === 0) {
            contenedorCategorias.innerHTML = '<p>No hay categorías disponibles.</p>';
            loadMoreButton.style.display = 'none';
            return;
        }

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

            // Botón para eliminar la categoría
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar Categoría';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = () => eliminarCategoria(categoria.name);
            categoriaElemento.appendChild(deleteButton);

            // Filtrar las tareas por esta categoría
            const tareasFiltradas = tareas.filter(tarea => tarea.category === categoria.name);

            // Mostrar solo las primeras 10 tareas
            const tareasAMostrar = tareasFiltradas.slice(0, 10);

            tareasAMostrar.forEach(tarea => {
                const tareaElemento = document.createElement('div');
                tareaElemento.classList.add('tarea');

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
    } catch (error) {
        console.error('Error al mostrar las categorías:', error);
    }
}

// Función para eliminar una categoría
async function eliminarCategoria(nombreCategoria) {
    try {
        const response = await fetch(`/api/categories/${nombreCategoria}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar la categoría');
        alert(`Categoría "${nombreCategoria}" eliminada con éxito.`);
        mostrarCategorias(); // Actualizar la visualización de categorías
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
    }
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

// Función para obtener las categorías desde localStorage
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

// Función para guardar una nueva categoría en localStorage
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

// Mostrar categorías al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarCategorias(); // Mostrar categorías después de que la página se haya cargado
});

const MAX_CATEGORIES = 10;


// Función para abrir el formulario de categorías
function openCategory(){
    fetch('/Proyecto_To_Do_list_TMS-2024-2/public/Form/create-category-form.html')
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
    categoryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const categoryName = document.getElementById('category-name').value.trim();
        const categories = await getCategories();

        if (categories.length >= MAX_CATEGORIES) {
            alert('No puedes agregar más de 10 categorías.');
            return;
        }

        if (categories.some(category => category.name === categoryName)) {
            alert('Esta categoría ya existe.');
            return;
        }

        const newCategory = { name: categoryName }; // El backend generará el ID
        await saveCategory(newCategory);
        alert(`Categoría "${categoryName}" creada con éxito.`);
        categoryForm.reset();
        mostrarCategorias(); // Volver a cargar categorías con el nuevo límite
    });
}
// Cargar la barra de navegación desde navbar.html y añadir eventos de redirección
// Ruta relativa a navbar.html desde el archivo main.js
fetch('/Proyecto_To_Do_list_TMS-2024-2/public/Navbar/navbar.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar navbar.html');
        }
        return response.text();
    })
    .then(data => {
        // Inserta el contenido de navbar.html en el div con id 'navbar-container'
        document.getElementById('sidebar-container').innerHTML = data;

        // Añadir manejadores de eventos si es necesario
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const page = event.target.getAttribute('data-page');
                window.location.href = page; // Redirige directamente a la página
            });
        });      
    }  
    )
    
