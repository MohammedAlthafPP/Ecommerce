const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizesdRoles } = require("../middleware/auth");
const {addToCart, usersCartItems, removeCartItem, addShippingDetails, removeShippingAddress, getShippingInfo} = require("../controllers/cartController");
 
router.route("/cart/new").post(isAuthenticatedUser, addToCart);
router.route("/cart/me").get(isAuthenticatedUser, usersCartItems);
router.route("/cart/:id").delete(isAuthenticatedUser, removeCartItem);
router.route("/shipping/new").post(isAuthenticatedUser, addShippingDetails);
router.route("/shipping/:id").delete(isAuthenticatedUser, removeShippingAddress);
router.route("/shipping").get(isAuthenticatedUser, getShippingInfo);





module.exports = router;