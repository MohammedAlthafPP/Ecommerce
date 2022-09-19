const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizesdRoles } = require("../middleware/auth");
const {addToCart, usersCartItems, removeCartItem} = require("../controllers/cartController");
 
router.route("/cart/new").post(isAuthenticatedUser, addToCart);
router.route("/cart/me").get(isAuthenticatedUser, usersCartItems);
router.route("/cart/:id").get(isAuthenticatedUser, removeCartItem);





module.exports = router;