const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  ressetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUserDetails,
  updateUserRole,
  deleteUser,
  verifyRegisterOtp,
  resendOtp,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizesdRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/verify/phone").post(isAuthenticatedUser,verifyRegisterOtp);
router.route("/resendotp/:id").get(isAuthenticatedUser,resendOtp);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(ressetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/logout").get(logout);

/*                ----- Admin Routes -----                                                                */
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizesdRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizesdRoles("admin"), getSingleUserDetails)
  .put(isAuthenticatedUser, authorizesdRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizesdRoles("admin"), deleteUser);

module.exports = router;
