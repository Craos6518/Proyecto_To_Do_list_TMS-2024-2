
# To-Do List Project
![wakatime](https://wakatime.com/badge/user/018e3e70-a193-4cb2-9e69-1ab76073c1ea/project/b9b93716-4353-4432-b8b0-e1c166fe82ec.svg)
## Descripción
Una aplicación de To-Do List para gestionar tareas personales, con opciones para crear, editar y categorizar tareas, asignar estados, y añadir subtareas. La aplicación es responsive, diseñada para adaptarse a portátiles, móviles y tablets, utilizando tecnologías como **HTML**, **CSS**, y **JavaScript**.  

## Características Principales Gestión de Tareas

Los usuarios pueden añadir nuevas tareas con un título, descripción, subtareas, categoría, y fecha de finalización.

Cada tarea tiene un estado que indica su progreso: 

- **comenzada**
- **culminada**
- **aplazada**

Las tareas pueden ser editadas en cualquier momento, excepto cuando estén en el estado "culminada".
Marcar tareas como completadas para ayudar a los usuarios a mantenerse organizados.

## Categorías Personalizadas

Los usuarios pueden crear y gestionar categorías personalizadas para clasificar las tareas.

Se permite un máximo de 10 categorías para una mejor organización.


## Diseño Responsive

La aplicación se adaptará a diferentes dispositivos, incluyendo portátiles `(14 a 15 pulgadas)`, teléfonos móviles `(1080x2460)`, y tablets `(10 a 12 pulgadas)`.

## Interfaz de Usuario Amigable

Una interfaz limpia y sencilla para facilitar la adición, edición, y visualización de tareas.

## Requisitos del Sistema

Navegador Web moderno y actualizado.

## Objetivo del Proyecto

El objetivo de la aplicación es proporcionar una herramienta fácil de usar y accesible para que los usuarios puedan organizar sus tareas diarias, aumentando la productividad y facilitando la gestión del tiempo. Contribución

## Estructura de Carpetas y Archivos

```
Proyecto_To_Do_list_TMS-2024-2
├── css/
│   ├── styles.css           # Estilos generales de la aplicación
│   ├── status.css           # Estilos específicos para el estado de las tareas
│   └── priority.css         # Estilos específicos para la prioridad de las tareas
├── js/
│   ├── main.js              # Lógica principal de la aplicación
│   ├── categories.js        # Funciones relacionadas con las categorías de tareas
│   ├── priority.js          # Funciones para gestionar prioridades
│   ├── SimularTareas.js     # Script de desarrollo para simular tareas
│   └── status.js            # Script para gestionar el estado de las tareas
├── public/
│   ├── Categories/
│   │   └── category-tasks.html  # Página de tareas por categorías
│   ├── Form/
│   │   ├── create-category-form.html  # Formulario de creación de categorías
│   │   └── create-task-form.html      # Formulario de creación de tareas
│   ├── Navbar/
│   │   └── navbar.html               # Barra de navegación principal
│   ├── Priority/
│   │   └── priority-tasks.html       # Página de tareas con prioridad
│   └── Status/
│       └── status-tasks.html         # Página de tareas por estado
└── index.html                        # Página principal de AllTaskista
```

## Funcionalidades

- **Gestión de tareas**: Crear, editar y eliminar tareas.
- **Clasificación de tareas**: Organizar tareas por categorías.
- **Asignación de prioridad**: Definir prioridades para cada tarea.
- **Estado de tareas**: Cambiar y visualizar el estado actual de las tareas (pendiente, en progreso, completada).
- **Navegación fácil**: Barra de navegación en la parte superior de la página para acceder a diferentes secciones.
- **Responsividad**: Interfaz diseñada para adaptarse a dispositivos de diferentes tamaños.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu_usuario/Proyecto_To_Do_list_TMS-2024-2.git
   ```
2. Abre el archivo `index.html` en tu navegador para iniciar la aplicación.

## Uso

1. **Inicio**: La página principal (`index.html`) muestra todas las tareas pendientes.
2. **Categorías**: Navega a `category-tasks.html` para ver las tareas organizadas por categorías.
3. **Prioridades**: Accede a `priority-tasks.html` para ver las tareas por nivel de prioridad.
4. **Estado**: Accede a `status-tasks.html` para gestionar las tareas según su estado actual.

> **Nota**: Si encuentras un error 404 al intentar acceder a una página que no existe en una ubicación específica, verifica la estructura de carpetas y asegúrate de que el archivo correcto esté en la ruta correspondiente.

> **Nota 2**: Si encuentras un error 404 al intentar acceder a una página que no existe en una ubicación específica, verifica la estructura de carpetas y trata de revisar las rutas, ya sean rutas Rutas **Absolutas, Rutas Relativas,  Relativas al Proyecto.

## Tecnologías Utilizadas

- **HTML** y **CSS**: Estructura y estilos básicos del proyecto.
- **JavaScript**: Lógica para gestionar las tareas, categorías, prioridades y estados.
- **Arquitectura de Carpetas**: Organización clara para mantener el código estructurado y modular.

## Contribución

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Agregar nueva funcionalidad'`).
4. Haz push de la rama (`git push origin nueva-funcionalidad`).
5. Abre un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT. Puedes ver más detalles en el archivo [LICENSE](LICENSE).
Para cualquier pregunta o comentario, por favor contacta a f.martinez5@utp.edu.co 
