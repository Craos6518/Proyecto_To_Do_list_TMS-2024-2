//!# Rutas para CRUD de categorías
const express = require("express");
const router = express.Router();
const categoryController = require("./categoryController");

router.get("/", categoryController.getAllCategories); //obtengo
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.createCategory); //creo
router.delete("/:id", categoryController.deleteCategory); //Elimino

module.exports = router;
