const jwt = require("jsonwebtoken");
require ("dotenv").config();

module.exports = (req, res , next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify( token, process.env.JWT_PASS );
        const userId = parseInt(decodeToken.userId);
        const userRole = parseInt(decodeToken.userRole);
        
        if (( req.body.userId && req.body.userId === userId ) 
            || ( req.body.userRole && req.body.userRole === userRole )){
            next()
        } else {
            throw "utilisateur non identifer";
        }
    } catch (error) {
        console.log(error);
        res.status(401).json( error )
    }
}