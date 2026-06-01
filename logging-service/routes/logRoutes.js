const express = require("express");

const router = express.Router();

const {
  getLogs,
  addLog,
} = require("../controllers/logController");


// GET logs
router.get("/", getLogs);


// ADD log
router.post("/", addLog);

module.exports = router;