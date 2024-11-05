document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('config-form');
    const notificacionesCheckbox = document.getElementById('notificaciones');
    const recordatoriosInput = document.getElementById('recordatorios');

    // Cargar configuraciones al inicio
    loadSettings();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveSettings();
    });

    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('settings')) || {};
        notificacionesCheckbox.checked = settings.notificaciones || false;
        recordatoriosInput.value = settings.recordatorios || '';
    }

    function saveSettings() {
        const settings = {
            notificaciones: notificacionesCheckbox.checked,
            recordatorios: recordatoriosInput.value,
        };
        localStorage.setItem('settings', JSON.stringify(settings));
        alert('Configuraciones guardadas con éxito!');
    }
});
