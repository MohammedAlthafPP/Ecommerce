const express = require("express");
const {
  getAllproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createPruductReview,
  getPruductReviews,
  deletePruductReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizesdRoles } = require("../middleware/auth");



const router = express.Router();

router.route("/products").get(getAllproducts);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizesdRoles("admin"),createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser,authorizesdRoles("admin"),updateProduct)
  .delete(isAuthenticatedUser,authorizesdRoles("admin"),deleteProduct)

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createPruductReview);
router.route("/reviews").get(getPruductReviews).delete(isAuthenticatedUser,deletePruductReview)
  

module.exports = router;
