const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Gateway Running...");
});


// TRANSACTION ROUTE
app.post("/api/transactions", async (req, res) => {
  try {

    console.log("Incoming Request:", req.body);

    // FORWARD REQUEST TO TRANSACTION SERVICE
    const response = await axios.post(
      "http://localhost:5001/api/transactions",
      req.body
    );

    // SEND RESPONSE BACK
    res.status(response.status).json(response.data);

  } catch (error) {

    console.log("Gateway Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway Running On Port ${PORT}`);
});