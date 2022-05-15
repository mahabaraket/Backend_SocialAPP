const express = require('express');
const profilePicRoute = express.Router();
const multer = require('multer');

// ProfilePicmodel
let ProfilePic = require('../models/ProfilePic');

//multer for pic upload
const uploadMedia = require('../middleware/picUpload');

profilePicRoute.route('/create').post(uploadMedia.uploadPic().array('pfp') , (req, res, next) => {

  let newProfilePic = req.body;

  console.log(newProfilePic)

  if(req.files[0]){
    newProfilePic.idUser = req.body.idUser;
    newProfilePic.pfp = req.files[0];
    newProfilePic.creationDate = new Date(req.body.creationDate);
  }

  ProfilePic.create(newProfilePic, (error, data) => {
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


// Get latest profile pic
profilePicRoute.route('/read/:idUser').get((req, res) => {
  ProfilePic.find({idUser : req.params.idUser}, (error, data) => {
    if (error) {
      return next(error)
    }else{   
      res.json(getLatestDate(data))  
    }
  })
})

// Update ProfilePic
profilePicRoute.route('/update/:id').put((req, res, next) => {
    ProfilePic.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },(error, data) => {
        if (error) {
            return next(error);
        }else {
            res.json(getLatestDate(data))   
        }
    })
})

//getting converting date to measurable
function getLatestDate(data){
    if(data.length === 0){
      return null
    }
    let latestPfp = data[0]
    data.forEach(pfp => {
      if(pfp.creationDate.valueOf() > latestPfp.creationDate.valueOf()){
        latestPfp = pfp  
      }
    });
    return latestPfp
}

module.exports = profilePicRoute;