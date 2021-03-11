const express = require ( "express");
const cors = require ( "cors");
const bodyParser = require ( "body-parser");

const db = require("./entity/models");
db.sequelize.sync({force: true}).then( () => {
    console.log("Drop and re-Sync");
})

//Routes
const userRoutes = require("./entity/user/user.routes");


const app = express();
app.use(cors());


app.use(bodyParser.json());

app.get("/", (req, res ) => res.json({message : "Bienvenue sur le réseau groupomania"}))

app.use("/api/auth", userRoutes);









module.exports = app