const express = require ( "express");
const path = require("path")
const cors = require ( "cors");

const db = require("./entity/models");


// db.sequelize.sync({force: true}).then( () => {
//     console.log("Drop and re-Sync");
// })

db.sequelize.sync();

//Routes
const userRoutes = require("./entity/user/user.routes");
const postRoutes = require("./entity/post/post.routes");
const commentRoutes = require("./entity/comment/comment.routes")

const app = express();
app.use(cors());

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res ) => res.json({message : "Bienvenue sur le réseau groupomania"}))

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app