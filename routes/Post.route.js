const express = require('express');
const postRoute = express.Router();
var multer = require('multer')


// Postmodel
let Post = require('../models/Post');

//multer for pic upload
const uploadMedia = require('../middleware/picUpload')

//add post
postRoute.route('/create').post(uploadMedia.uploadPic().array('media') ,async (req, res, next) => {

  let newPost = req.body;
  if(req.files[0]){
    newPost.media = req.files[0]
  }

  Post.create(newPost, (error, data) => {
    if (error instanceof multer.MulterError ) {
      error.message += "\nmulter Error";
      return next(error)
    }else if (error){
        return next(error)
      }
      else {
        res.json(data);
      }
  })

});

// Get All Posts
postRoute.route('/').get((req, res) => {
  Post.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get post list by user id
postRoute.route('/byUserId/:idUser').get((req, res, next) => {
  Post.find ({idUser : req.params.idUser},(error, data) => {
    if(error){
      return next(error);
    }else{
      res.json(data)
    }
  })
})

// Get single Post by post id
postRoute.route('/read/:id').get((req, res) => {
  Post.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Post
postRoute.route('/update/:id').put((req, res, next) => {
  console.log( req.body)

  Post.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})
// Delete Post
postRoute.route('/delete/:id').delete((req, res, next) => {
  Post.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = postRoute;