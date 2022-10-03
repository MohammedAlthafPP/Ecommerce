const express = require("express");
const { processPayment, sendStripApikey } = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser, authorizesdRoles } = require("../middleware/auth");


router.route("/payment/process").post(isAuthenticatedUser,processPayment)
router.route("/stripeapikey").get(isAuthenticatedUser,sendStripApikey)

module.exports = router;