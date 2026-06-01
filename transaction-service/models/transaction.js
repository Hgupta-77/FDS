const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    transactionType: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    ipAddress: {
      type: String,
      required: true,
    },

    deviceId: {
      type: String,
      required: true,
    },

    fraudScore: {
      type: Number,
      default: 0,
    },

    isFraud: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "completed",
    },

    // ✅ NEW FIELD (IMPORTANT)
    fraudReasons: {
      type: [String],   // array of strings
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);