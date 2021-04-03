
const db = require("../models/index");
const Comment = db.comment;


exports.createComment = (req, res, next) =>{
    Comment.create({
        ...req.body
    })
    .then( data => res.status(201).json(`commentaire créer : ${data.comment}`))
    .catch( error => res.status(400).json({error}))
};

exports.modifyComment = (req, res, next) => {
    const commentId = req.params.id;
    Comment.update( {...req.body}, {where: {id: commentId}})
    .then( data => res.status(201).json(`commentaire modifier : ${data.comment}`))
    .catch( error => res.status(400).json({error}))
};

exports.deleteComment = (req, res, next) => {
    const commentId = req.params.id;
    Comment.destroy( {where: {id: commentId}})
    .then( data => res.status(201).json(`commentaire supprimer : ${data.comment}`))
    .catch( error => res.status(400).json({error}))
};