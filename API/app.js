const express = require ( "express");
const cors = require ( "cors");
const bodyParser = require ( "body-parser");


const app = express();
app.use(cors());


app.use(bodyParser.json());

app.get("/", (req, res ) => res.json({message : "Bienvenue sur le réseau groupomania"}))









module.exports = app