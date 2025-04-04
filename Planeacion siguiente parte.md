# Backlog de Integración FrontendBackend

## Objetivos
Vincular el frontend JavaScript actual con el backend de Express y MySQL, reemplazando el uso de LocalStorage

## Tareas Principales

### 1. Configuración de Comunicación
 [ ] T1.1: Configurar peticiones AJAX/Fetch
   Modificar funciones de JavaScript para usar `fetch()`
   Actualizar URLs de endpoints según configuración del backend
   Manejar promesas y async/await

### 2. Crear Tareas
 [ ] T2.1: Modificar función de creación de tareas
   Enviar datos al endpoint de crear tarea
   Implementar método POST
   Manejar respuesta del servidor
   Mostrar feedback al usuario (éxito/error)

### 3. Listar Tareas
 [ ] T3.1: Actualizar función de listado de tareas
   Implementar método GET para recuperar tareas
   Renderizar tareas desde respuesta del backend
   Manejar estado de carga
   Gestionar errores de conexión

### 4. Actualizar Tareas
 [ ] T4.1: Implementar actualización de tareas
   Modificar función de edición para usar método PUT
   Enviar datos actualizados al endpoint correspondiente
   Validar respuesta del servidor
   Actualizar interfaz

### 5. Eliminar Tareas
 [ ] T5.1: Actualizar función de eliminación
   Implementar método DELETE
   Confirmar eliminación con backend
   Actualizar vista tras eliminación
   Manejar posibles errores

### 6. Manejo de Errores
 [ ] T6.1: Implementar gestión de errores
   Crear mensajes de error personalizados
   Mostrar notificaciones al usuario
   Registrar errores de conexión
   Implementar reintentos para fallos temporales

### 7. Pruebas de Integración
 [ ] T8.1: Realizar pruebas de integración
   Probar cada endpoint (crear, listar, actualizar, eliminar)
   Verificar respuestas del servidor
   Validar flujo completo de datos

## Consideraciones Adicionales
 Mantener la estructura actual del frontend
 Minimizar cambios en la lógica de negocio existente
 Documentar cambios realizados

## Priorización
1. Alta Prioridad: Tareas 1
2. Media Prioridad: Tareas 2, 3, 6
3. Baja Prioridad: Tareas 4, 5, 7

# Tiempo Total Estimado: 26-37 horas