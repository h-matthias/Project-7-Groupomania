require ("dotenv").config();

const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

const db = require ("../models/index");
const User = db.user;


exports.signup = (req, res, next) => {
    User.findOne({ where: {email: req.body.email}})
    .then(user => {
        if(user){
            res.status(400).json({error : "Compte utilisateur déjà inscris"})
        }else {
            bcrypt.hash(req.body.password, 10)
            .then(hash => { User.create ({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            })
                .then(data => res.status(201).json(`compte créer ${data.pseudo}`))
                .catch(error => res.status(400).json( {msg :"error " + error }))
            })
            .catch(error => res.status(500).json(error))
        }
    })
    .catch(error => res.status(500).json(error))
}

exports.login = ( req, res, next ) => {
    User.findOne({ where: { email: req.body.email }})
    .then(user => {
        if ( user ) {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (valid){
                    res.status(200).json({ 
                        userEmail : user.email,
                        userRole: user.role,
                        token: jwt.sign(
                        { userEmail: user.email, userRole: user.role},
                        process.env.JWT_PASS,
                        { expiresIn: "24h" }                        
                        )
                    })
                }else {
                    return res.status(401).json({ error : "mot de passe incorrect"})
                }
            })
            .catch(error => {
                console.log(error);
                res.status(502).json({error})
            })
        }else {
            return res.status(404).json( {error : "Utilisateur non trouvé"})
        }
    })
    .catch( error => {
        console.log(error);
        res.status(501).json({error})})
}
        