const jwt = require("jsonwebtoken");
require ("dotenv").config();

module.exports = (req, res , next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify( token, process.env.JWT_PASS );
        const userId = decodeToken.userId;
        const userRole = decodeToken.userRole;
        
        if ( req.body.userId && req.body.userId !== userId ){
            throw "utilisateur non identifer";
        } else if( userRole == 1 ) {
            next();
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).json( error )
    }
}