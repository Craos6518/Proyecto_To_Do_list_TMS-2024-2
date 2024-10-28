export function initNavigation() {
    fetch('view/Navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
            document.querySelectorAll('.nav-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const page = event.target.getAttribute('data-page');
                    loadPage(page);
                });
            });
        })
        .catch(error => console.error('Error al cargar la barra de navegación:', error));
}

export function loadPage(page) {
    fetch(`view/${page}`)
        .then(response => response.text())
        .then(data => document.getElementById('main-content').innerHTML = data)
        .catch(error => console.error('Error al cargar la página:', error));
}
