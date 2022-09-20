require("dotenv").config();
const { SERVER_PORT, CONNECTION_STRING } = process.env;
const express = require("express");
const cors = require("cors");
const app = express();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

app.use(express.json());
app.use(cors());

app.post("/api/instrument", async (req, res) => {
    const { name, family, price, imgURL } = req.body;
    // console.log(name, family, price, imgURL);
    // console.log("endpoint hit");
    await sequelize
        .query(
            `
    INSERT INTO instruments (name, family, price, image_url)
    VALUES ('${name}', ${family}, ${price},'${imgURL}') 
    RETURNING *;`
        )
        .then((dbRes) => res.status(200).send(dbRes))
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
    res.status(200).send("hey front end, it worked");
});

app.listen(SERVER_PORT, () =>
    console.log(`Server is live on port ${SERVER_PORT}.`)
);
