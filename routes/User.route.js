const express = require('express');
const app = express();
const userRoute = express.Router();
// User model
let User = require('../models/User');

//importing formidable-express middleware for uploading files

// Add User
userRoute.route('/create').post((req, res, next) => {

  User.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
});
// Get All Users
userRoute.route('/').get((req, res, next) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Get single User
userRoute.route('/read/:idUser').get((req, res, next) => {
  User.findById(req.params.idUser, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Get Single User By email
userRoute.route('/readByEmailAndPass/:email/:password').get((req, res, next) => {
  User.findOne({email : req.params.email, password : req.params.password}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update User
userRoute.route('/update/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
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
userRoute.route('/changeAuthState/:id').put((req, res, next)=>{
  User.findByIdAndUpdate(req.params.id, {
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

// Delete User
userRoute.route('/delete/:id').delete((req, res, next) => {
  User.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = userRoute;