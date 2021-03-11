const jwt = require("jsonwebtoken");
require ("dotenv").config();

module.exports = (req, res , next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify( token, process.env.JWT_PASS );
        const userEmail = decodeToken.userEmail;
        const userRole = decodeToken.userRole;

        if ( req.body.userEmail && req.body.userEmail === userEmail ){
            next()
        } else {
            throw "Utilisateur non identifer";
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non autentifiée" })
    }
}