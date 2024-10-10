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
  window.location.href = "task-form.html";
}

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
    document.getElementById('task-container').innerHTML = 'All Tasks (example task data here)';
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
    document.getElementById('task-container').innerHTML = 'Tasks by Priority (example task data here)';
  }
  