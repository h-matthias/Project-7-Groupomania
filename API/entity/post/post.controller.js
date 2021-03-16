const db = require("../models/index");
const Post = db.post;

const fs = require("fs");



exports.getAllPost = (req, res, next) => {
    Post.findAll()
    .then( data => {
        if (data.length == 0){
            return res.status(404).json("aucun post n'à été touver")
        }
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json({error}))
};

exports.createPost = (req, res, next) => {
    console.log(req.body);
    const postObject = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/API/images/${req.file.filename}`
    } : { ...req.body } //op ternaire
    Post.create ({
        ...postObject
    })
    .then( data => res.status(201).json(`post créer ${data.contentPost}`))
    .catch( error => res.status(400).json({error}))
};

exports.modifyPost = (req, res, next) => {
    const postId = req.params.id;
    const postObject = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/API/images/${req.file.filename}`
    } : { ...req.body } //op ternaire

    if (req.file) {
        fs.unlink
    }
    Post.update(postObject, { where: { id: postId }})
    .then( upd => {
        if (upd) {
            res.status(200).json("publication modifié avec succées")
        } else {
            res.status(200).json("impossible de modifié cette publication")
        }
    })
    .catch(error => res.status(500).json({error}))
}

exports.deletePost = (req, res, next) => {
    const postId = req.body.postId;
    Post.destroy({ where: { id: postId }})
    .then( del => {
        if (del) {
            res.status(200).json("publication supprimé avec succées")
        } else {
            res.status(200).json("impossible de supprimé cette publication")
        }
    })
    .catch(error => res.status(500).json({error}))
}




