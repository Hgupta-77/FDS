const sendFraudAlertEmail = require("../services/emailService");

const sendFraudAlert = async (req, res) => {
  try {

    const {
      email,
      userId,
      amount,
    } = req.body;

    await sendFraudAlertEmail(
      email,
      "Fraud Transaction Alert",
      `
Fraud Transaction Detected

User: ${userId}
Amount: ${amount}

Please verify immediately.
`
    );

    res.status(200).json({
      success: true,
      message: "Fraud Alert Sent",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendFraudAlert,
};