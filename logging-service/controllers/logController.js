const fs = require("fs");
const path = require("path");

const getLogs = (req, res) => {
  const logFilePath = path.join(__dirname, "../logs/app.log");

  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error reading logs",
      });
    }

    res.status(200).json({
      logs: data,
    });
  });
};


const addLog = (req, res) => {
  const { message } = req.body;

  const logFilePath = path.join(__dirname, "../logs/app.log");

  const logMessage = `
[${new Date().toISOString()}] ${message}
`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error writing log",
      });
    }

    res.status(201).json({
      message: "Log Added Successfully",
    });
  });
};
module.exports = {
  getLogs,
  addLog,
};