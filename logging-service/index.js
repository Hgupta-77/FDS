const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// Create logs folder if not exists
const logDirectory = path.join(__dirname, "logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}


// Log file path
const logFilePath = path.join(logDirectory, "app.log");


// Write logs into file
const accessLogStream = fs.createWriteStream(logFilePath, {
  flags: "a",
});


// Morgan middleware
app.use(morgan("combined", { stream: accessLogStream }));


// Routes
const logRoutes = require("./routes/logRoutes");

app.use("/api/logs", logRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("Logging Service Running...");
});


const PORT = process.env.PORT || 5004

app.listen(PORT, () => {
  console.log(`Logging Service Running On Port ${PORT}`);
});