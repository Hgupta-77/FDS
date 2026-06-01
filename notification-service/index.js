const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();

app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Notification Service Running...");
});

// Create reusable transporter (BEST PRACTICE)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Connection Failed ❌", error);
  } else {
    console.log("SMTP Connected Successfully ✅");
  }
});

// Send alert email
app.post("/send-alert", async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        success: false,
        error: "Email and message are required",
      });
    }

    console.log("EMAIL RECEIVED:", email);

    const info = await transporter.sendMail({
      from: `"Fraud Alert System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Fraud Alert 🚨",
      text: message,
    });

    console.log("EMAIL SENT:", info.response);

    res.status(200).json({
      success: true,
      message: "Fraud Alert Sent Successfully",
      messageId: info.messageId,
    });

  } catch (error) {
    console.log("ERROR SENDING EMAIL:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Notification Service Running On Port ${PORT}`);
});