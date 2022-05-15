const express = require('express');
const coverPicRoute = express.Router();
const multer = require('multer');

// CoverPicmodel
let CoverPic = require('../models/CoverPic');

//multer for pic upload
const uploadMedia = require('../middleware/picUpload');

coverPicRoute.route('/create').post(uploadMedia.uploadPic().array('cover') , (req, res, next) => {

  let newCoverPic = req.body;

  console.log(newCoverPic)

  if(req.files[0]){
    newCoverPic.idUser = req.body.idUser;
    newCoverPic.cover = req.files[0];
    newCoverPic.creationDate = new Date(req.body.creationDate);
  }

  CoverPic.create(newCoverPic, (error, data) => {
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


// Get latest cover pic
coverPicRoute.route('/read/:idUser').get((req, res) => {
  CoverPic.find({idUser : req.params.idUser}, (error, data) => {
    if (error) {
      return next(error)
    }else{   
      res.json(getLatestDate(data))  
    }
  })
})

// Update CoverPic
coverPicRoute.route('/update/:id').put((req, res, next) => {
    CoverPic.findByIdAndUpdate(req.params.id, {
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
    let latestCover = data[0]
    data.forEach(cover => {
      if(cover.creationDate.valueOf() > latestCover.creationDate.valueOf()){
        latestCover = cover  
      }
    });
    return latestCover
}

module.exports = coverPicRoute;