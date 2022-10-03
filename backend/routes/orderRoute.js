const express = require("express");
const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizesdRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

/*  ------------------------------------ Admin Routes ----------------------------------------   */
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizesdRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .get(isAuthenticatedUser, authorizesdRoles("admin"), getSingleOrder);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizesdRoles("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, authorizesdRoles("admin"), deleteOrder);

module.exports = router;
