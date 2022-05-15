const express = require('express');
const shareRoute = express.Router();
// Share model
let Share = require('../models/Share');

// Add Share
shareRoute.route('/create').post((req, res, next) => {

  Share.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
});

// Get All Shares
shareRoute.route('/').get((req, res, next) => {
  Share.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Share by userId
shareRoute.route('/read/:userId').get((req, res, next) => {
  Share.findById(req.params.userId, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Share
shareRoute.route('/update/:id').put((req, res, next) => {
  Share.findByIdAndUpdate(req.params.id, {
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

// Change Auth State
shareRoute.route('/changeAuthState/:id').put((req, res, next)=>{
  Share.findByIdAndUpdate(req.params.id, {
    $set : {authenticated : true}
  },{new : true}, (error, data)=>{
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Share
shareRoute.route('/delete/:id').delete((req, res, next) => {
  Share.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = shareRoute;