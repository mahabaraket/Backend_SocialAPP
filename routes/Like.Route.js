const express = require('express');
const likeRoute = express.Router();
// Like model
let Like = require('../models/Like');

// Add Like
likeRoute.route('/createOrdelete').post((req, res, next) => {

  //check if user already likes object
  Like.findOne({idUser : req.body.idUser,idParent : req.body.idParent}, (error, data) => {
    if(error){
      return next(error)
    }else{

      //if data is null then user didn't like this object
      if(data == null){
        //add like if user didn't like post
        Like.create(req.body, (error, result) => {
          if (error) {
            return next(error);
          } else {
            res.json(result);
            console.log("Like added")
          }
        })
        
      //if data is not null then user likes this object
      }else{
        // remove like if user liked post
        Like.deleteOne({idUser : req.body.idUser,idParent : req.body.idParent}, (error, result) => {
          if(error){
            return next(error)
          }else{
            res.json(result)
            console.log("Like deleted")
          }
        })
      }// end remove like else block
    }// end first else block
  })// end create or delete function body
  
});

// Get like by user and post id
likeRoute.route('/byUserAndParent').get((req, res, next) => {
  Like.find({idUser : req.params.idUser, idParent : req.params.idParent}, (error, data) => {
    if(error){
      return next(error)
    }else{
      res.json(data)
    }
  })
})

// Get likes by userId
likeRoute.route('/byUser/:idUser').get((req, res, next) => {
  Like.find({userId : req.params.idUser}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get likes by parent object id
likeRoute.route('/byParent/:idParent').get((req, res, next) => {
  Like.find({idParent : req.params.idParent}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// Update Like
likeRoute.route('/update/:id').put((req, res, next) => {
  Like.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})


// Delete Like
likeRoute.route('/delete/:id').delete((req, res, next) => {
  Like.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = likeRoute;