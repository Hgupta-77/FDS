const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Transaction Service Running");
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Transaction Service running on port ${PORT}`);
});