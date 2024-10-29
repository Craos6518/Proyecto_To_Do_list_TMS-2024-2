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
        
        // Crear el encabezado de la categoría
        categoriaElemento.innerHTML = `<h2>${categoria.categoryName}</h2>`;

        // Filtrar las tareas por esta categoría
        const tareasFiltradas = tareas.filter(tarea => tarea.category === categoria.categoryName);
        
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

// Simulación de categorías en localStorage (solo para desarrollo)
if (!localStorage.getItem('categories')) {
    const categoriasSimuladas = Array.from({ length: 5 }, (_, index) => ({
        id: String(index + 1).padStart(4, '0'), // ID de 4 dígitos
        categoryName: `Categoría ${index + 1}`
    }));
    localStorage.setItem('categories', JSON.stringify(categoriasSimuladas));
}

// Simulación de tareas en localStorage (solo para desarrollo)
if (!localStorage.getItem('tasks')) {
    const tareasSimuladas = Array.from({ length: 20 }, (_, index) => ({
        taskId: String(index + 1).padStart(8, '0'), // ID de 8 dígitos
        title: `Tarea ${index + 1}`,
        description: `Descripción de la tarea ${index + 1}`,
        startDate: `2024-10-01`,
        dueDate: `2024-10-31`,
        priority: index % 4 === 0 ? 'Critico' : index % 4 === 1 ? 'Urgente' : index % 4 === 2 ? 'Normal' : 'Baja', // Prioridad
        category: `Categoría ${index % 5 + 1}`, // Aseguramos que las tareas estén asignadas a categorías simuladas
        status: index % 3 === 0 ? 'Completada' : index % 3 === 1 ? 'Pendiente' : 'Aplazado' // Estado
    }));
    localStorage.setItem('tasks', JSON.stringify(tareasSimuladas));
}

// Mostrar categorías al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarCategorias(); // Mostrar categorías después de que la página se haya cargado
});
