const express = require("express");

const router = express.Router();

const {
  sendFraudAlert,
} = require("../controllers/notificationController");


// Send Fraud Alert
router.post(
  "/fraud-alert",
  sendFraudAlert
);

module.exports = router;