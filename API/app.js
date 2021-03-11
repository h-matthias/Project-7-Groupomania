const express = require ( "express");
const cors = require ( "cors");

const db = require("./entity/models");
db.sequelize.sync({force: true}).then( () => {
    console.log("Drop and re-Sync");
})

//Routes
const userRoutes = require("./entity/user/user.routes");
const postRoutes = require("./entity/post/post.routes");


const app = express();
app.use(cors());

//remplace bodyParser.json()
app.use(express.json());

app.get("/", (req, res ) => res.json({message : "Bienvenue sur le réseau groupomania"}))

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes),









module.exports = app