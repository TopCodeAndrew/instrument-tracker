require("dotenv").config();
const { SERVER_PORT, CONNECTION_STRING } = process.env;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/instrument", (req, res) => {
    console.log("endpoint hit");
    res.status(200).send("hey front end, it worked");
});

app.listen(SERVER_PORT, () =>
    console.log(`Server is live on port ${SERVER_PORT}.`)
);
