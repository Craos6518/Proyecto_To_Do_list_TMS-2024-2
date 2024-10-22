/**
 * Archivos JavaScript
 */

// Función para mostrar la vista seleccionada
function showView(viewId) {
  const views = document.querySelectorAll(".view");

  // Ocultar todas las vistas
  views.forEach((view) => view.classList.remove("active"));

  // Validar si la vista existe antes de mostrarla
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add("active");

    // Actualiza la URL sin recargar la página
    history.pushState(null, "", `#${viewId}`);
  } else {
    console.warn(`Vista con ID '${viewId}' no encontrada.`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Delegación de eventos para manejar el cambio de vista
  document
    .querySelector(".sidebar nav")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        event.preventDefault();
        const targetViewId = event.target.getAttribute("href").substring(1); // Quita el '#'
        showView(targetViewId);
      }
    });

  // Mostrar la vista inicial (Todas las tareas)
  if (document.getElementById("all-ttasks")) {
    showView("all-tasks");
  }
});

function openTaskForm() {
  fetch('task-form.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('task-form').innerHTML = data;
      })
      .catch(error => {
          console.error('Error al cargar el formulario de tarea:', error);
      });
}
function addFormListener() {
  const taskForm = document.getElementById('task-form');

  if (taskForm) { // Verificar si el formulario está presente
      taskForm.addEventListener('submit', (event) => {
          event.preventDefault(); // Evita que el formulario se envíe y recargue la página

          // Validación de campos obligatorios
          const title = document.getElementById('task-title').value;
          const dueDate = document.getElementById('due-date').value;
          const priority = document.getElementById('priority').value;
          const category = document.getElementById('category').value;

          if (!title || !dueDate || !priority || !category) {
              alert('Por favor, completa todos los campos obligatorios.');
              return;
          }

          // Capturar los datos del formulario
          const task = {
              title,
              description: document.getElementById('task-description').value || 'Sin descripción',
              dueDate,
              priority,
              category,
          };

          // Obtener las tareas existentes en localStorage o crear una lista vacía si no hay ninguna
          let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

          // Agregar la nueva tarea a la lista de tareas
          tasks.push(task);

          // Guardar la lista de tareas actualizada en localStorage con manejo de errores
          try {
              localStorage.setItem('tasks', JSON.stringify(tasks));
          } catch (error) {
              console.error('Error guardando en localStorage', error);
          }

          // Limpiar el formulario
          taskForm.reset();

          alert('Tarea guardada con éxito!');
      });
  }
}

// Llamar a la función cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
  // Cargar el formulario por defecto o la página principal
  loadPage('./Alltask/AllTask.html');
});



// Cargar la barra de navegación
fetch("Navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("sidebar-container").innerHTML = data;
  })
  .catch((error) =>
    console.error("Error al cargar la barra de navegación:", error)
  );
  document.getElementById('all-tasks').addEventListener('click', showAllTasks);
  document.getElementById('tasks-category').addEventListener('click', showTasksByCategory);
  document.getElementById('tasks-state').addEventListener('click', showTasksByState);
  document.getElementById('tasks-priority').addEventListener('click', showTasksByPriority);
  
  function showAllTasks() {
    // Fetch and display all tasks from the backend
    document.getElementById('task-container').innerHTML = './all-tasks.html';
  }
  
  function showTasksByCategory() {
    // Fetch and display tasks by category
    document.getElementById('task-container').innerHTML = 'Tasks by Category (example task data here)';
  }
  
  function showTasksByState() {
    // Fetch and display tasks by state
    document.getElementById('task-container').innerHTML = 'Tasks by State (example task data here)';
  }
  
  function showTasksByPriority() {
    // Fetch and display tasks by priority
    document.getElementById('task-container').innerHTML = 'Tasks by Priority (example task data here';
  }

  