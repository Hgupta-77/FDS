const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Transaction Service Running 🚀");
});


// ROUTES
app.use("/api/transactions", transactionRoutes);


// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Transaction Service Running On Port ${PORT}`);
});