// Variables globales (Se pueden conectar a MySQL o Todoist API)
const tasks = [
    { title: "Terminar el proyecto", date: "2024/09/26", priority: "critico" },
    { title: "Revisar correos", date: "2024/09/27", priority: "urgente" },
    { title: "Reunión semanal", date: "2024/09/28", priority: "normal" },
    { title: "Planificación del mes", date: "2024/10/01", priority: "baja" }
];

// Colores según prioridad
const priorityColors = {
    critico: "#E74C3C",
    urgente: "#F39C12",
    normal: "#3498DB",
    baja: "#95A5A6"
};

// Mostrar tareas en vista semanal
function renderWeeklyView() {
    const startOfWeek = getStartOfWeek(new Date());
    const weeklyCalendar = document.querySelector("#weekly-calendar");
    
    // Borrar contenido previo
    weeklyCalendar.innerHTML = "";

    // Crear los 7 días de la semana
    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(dayDate.getDate() + i);
        const dayString = dayDate.toISOString().split('T')[0];

        // Crear un contenedor de día
        const dayElement = document.createElement("div");
        dayElement.classList.add("week-day");
        dayElement.textContent = `${getDayName(dayDate)} (${formatDate(dayDate)})`;

        // Buscar tareas que correspondan a este día
        const dayTasks = tasks.filter(task => task.date === dayString);

        dayTasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.textContent = task.title;
            taskElement.style.color = priorityColors[task.priority];
            dayElement.appendChild(taskElement);
        });

        weeklyCalendar.appendChild(dayElement);
    }
}

// Mostrar tareas en vista mensual
function renderMonthlyView() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const monthlyCalendar = document.querySelector("#monthly-calendar");
    
    // Borrar contenido previo
    monthlyCalendar.innerHTML = "";

    // Crear días del mes
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0);
    const totalDays = lastDayOfMonth.getDate();

    for (let day = 1; day <= totalDays; day++) {
        const dayDate = new Date(currentDate.getFullYear(), currentMonth, day);
        const dayString = dayDate.toISOString().split('T')[0];

        // Crear un contenedor de día
        const dayElement = document.createElement("div");
        dayElement.classList.add("month-day");
        dayElement.textContent = day;

        // Buscar tareas que correspondan a este día
        const dayTasks = tasks.filter(task => task.date === dayString);

        if (dayTasks.length > 0) {
            dayElement.style.backgroundColor = priorityColors[dayTasks[0].priority];
            dayElement.style.color = "#FFF";
        }

        monthlyCalendar.appendChild(dayElement);
    }
}

// Helper functions
function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day; // Restar el día de la semana actual
    return new Date(date.setDate(diff));
}

function getDayName(date) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
}

function formatDate(date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

// Inicializar la vista cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    renderWeeklyView();
    renderMonthlyView();
});
