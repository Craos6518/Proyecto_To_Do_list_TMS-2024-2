// Datos de ejemplo para gráficos y tareas aplazadas
const tareasCompletadasPorDia = [5, 8, 6, 9, 4, 7, 10];
const promedioTiempoCompletar = [2, 3, 1.5, 2.5, 3, 1, 4];
const tareasAplazadas = [
  'Tarea 1: Redactar informe mensual',
  'Tarea 2: Revisar presupuesto anual',
  'Tarea 3: Preparar presentación de proyecto',
];

// Gráfico de Barras (Tareas Completadas)
const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{
      label: 'Tareas Completadas',
      data: tareasCompletadasPorDia,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Gráfico de Líneas (Promedio de Tiempo en Completar Tareas)
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{
      label: 'Promedio de Tiempo (días)',
      data: promedioTiempoCompletar,
      fill: false,
      borderColor: 'rgba(255, 99, 132, 1)',
      tension: 0.1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Listado de Tareas Aplazadas Más de Una Vez
const delayedTasksList = document.getElementById('delayedTasks');
tareasAplazadas.forEach(tarea => {
  const li = document.createElement('li');
  li.textContent = tarea;
  delayedTasksList.appendChild(li);
});
