const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizesdRoles } = require("../middleware/auth");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router
  .route("/admin/category/new")
  .post(isAuthenticatedUser, authorizesdRoles("admin"), createCategory);
router
  .route("/admin/categories")
  .get(isAuthenticatedUser, authorizesdRoles("admin"), getAllCategories);
router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizesdRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizesdRoles("admin"), deleteCategory);

module.exports = router;
