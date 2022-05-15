const express = require('express');
const eventEventCommentRoute = express.Router();

// EventComment model
let EventComment = require('../models/EventComment');

//multer for pic upload
const uploadMedia = require('../middleware/picUpload');

// Add EventComment
eventEventCommentRoute.route('/create').post((req, res, next) => {

    // if(req?.files[0]){
    //   newEventComment.media = req?.files[0]
    // }

    let newEventComment = req.body;
    newEventComment.creationDate = new Date(req.body.creationDate)

    EventComment.create(newEventComment, (error, data) => {

        // if (error instanceof multer.MulterError ) {
        //   error.message += "\nmulter Error";
        //   return next(error)
        // }else

        if (error){
            return next(error)
        }
        else {
            res.json(data);
        }
    })

});

eventEventCommentRoute.route('/read/byParentId/:idParent').get((req, res, next) => {
    EventComment.find({idParent : req.params.idParent}, (error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data).status(200)
        }
    })
})



module.exports = eventEventCommentRoute;