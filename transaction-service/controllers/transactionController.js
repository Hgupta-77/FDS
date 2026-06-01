const Transaction = require("../models/transaction");
const axios = require("axios");

// CREATE TRANSACTION
const createTransaction = async (req, res) => {
  try {
    const {
      userId,
      email,
      amount,
      transactionType,
      location,
      ipAddress,
      deviceId,
    } = req.body;

    let fraudScore = 0;
    let fraudReasons = []; // ✅ NEW FIELD

    // RULE 1
    if (amount > 50000) {
      fraudScore += 40;
      fraudReasons.push("High amount transaction (> 50,000)");
    }

    // RULE 2
    if (location !== "Bhopal") {
      fraudScore += 30;
      fraudReasons.push("Transaction from non-allowed location");
    }

    // RULE 3
    if (transactionType === "debit" && amount > 100000) {
      fraudScore += 30;
      fraudReasons.push("High debit transaction (> 1,00,000)");
    }

    // FINAL DECISION
    let isFraud = false;
    let status = "completed";

    if (fraudScore >= 70) {
      isFraud = true;
      status = "blocked";
    }

    // SAVE TRANSACTION
    const transaction = await Transaction.create({
      userId,
      email,
      amount,
      transactionType,
      location,
      ipAddress,
      deviceId,
      fraudScore,
      fraudReasons, // ✅ ADD THIS
      isFraud,
      status,
    });

    // LOGGING SERVICE
    try {
      await axios.post("http://localhost:5004/api/logs", {
        message: `
Transaction Created

User: ${userId}
Amount: ${amount}
Status: ${status}
Fraud: ${isFraud}
Reasons: ${fraudReasons.join(", ")}
        `,
      });
    } catch (error) {
      console.log("Logging Service Error");
    }

    // NOTIFICATION SERVICE
    if (isFraud) {
      try {
        await axios.post("http://localhost:5003/send-alert", {
          email,
          message: `
🚨 Fraud Transaction Detected

User: ${userId}
Amount: ${amount}
Location: ${location}
Status: ${status}
Reasons: ${fraudReasons.join(", ")}
          `,
        });
      } catch (error) {
        console.log("Notification Service Error");
      }
    }

    res.status(201).json({
      success: true,
      message: "Transaction Created",
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL TRANSACTIONS
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
};