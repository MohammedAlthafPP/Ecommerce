const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizesdRoles } = require("../middleware/auth");
const {
  createWishlist,
  getUserWishlistItems,
  deleteWishlistItem,
} = require("../controllers/wishlistController");

router
  .route("/wishlist/:id")
  .post(isAuthenticatedUser, createWishlist)
  .delete(isAuthenticatedUser, deleteWishlistItem);
router.route("/wishlist/me").get(isAuthenticatedUser, getUserWishlistItems);

module.exports = router;
