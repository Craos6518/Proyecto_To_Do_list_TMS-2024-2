//!# Rutas para CRUD de categorías
const express = require("express");
const router = express.Router();
const categoryController = require("./categoryController");

// Obtener todas las categorías
router.get("/", categoryController.getAllCategories);

// Obtener una categoría específica por ID
router.get("/:id", categoryController.getCategoryById);

// Crear una nueva categoría
router.post("/", categoryController.createCategory);

// Eliminar una categoría específica por ID
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;