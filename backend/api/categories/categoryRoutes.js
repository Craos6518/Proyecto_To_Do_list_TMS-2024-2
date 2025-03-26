//!# Rutas para CRUD de categorías
const express = require("express");
const router = express.Router();
const categoryController = require("./categoryController");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
