const express = require('express');
const eventRoute = express.Router();
var multer = require('multer')


// Eventmodel
let Event = require('../models/Event');

//multer for pic upload
const uploadMedia = require('../middleware/picUpload')

//add event
eventRoute.route('/create').post(uploadMedia.uploadPic().array('media') ,async (req, res, next) => {

  let newEvent = req.body;
  if(req.files[0]){
    newEvent.media = req.files[0]
  }

  Event.create(newEvent, (error, data) => {
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

// Get All Events
eventRoute.route('/').get((req, res) => {
  Event.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get event list by user id
eventRoute.route('/byUserId/:idUser').get((req, res, next) => {
  Event.find ({idUser : req.params.idUser},(error, data) => {
    if(error){
      return next(error);
    }else{
      res.json(data)
    }
  })
})

// Get single Event by event id
eventRoute.route('/read/:id').get((req, res) => {
  Event.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Event
eventRoute.route('/update/:id').put((req, res, next) => {
  console.log( req.body)

  Event.findByIdAndUpdate(req.params.id, {
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

// add interraction  Event
eventRoute.route('/create/:id/:type').post((req, res, next) => {
    console.log( req.params.type)
    var type=req.params.type;

    if(type=="going")
    {
        Event.findOneAndUpdate(req.params.id, {
            $push:{going:{userId:req.body.userId}},
            


      
        
          }, (error, data) => {
            if (error) {
              return next(error);
            } else {
              res.json(data)
              console.log('interaction updated successfully')
            }
          })

    }

    if(type=="interested")
    {
        Event.findOneAndUpdate(req.params.id, {
            $push:{interested:{userId:req.body.userId}},
             
          }, (error, data) => {
            if (error) {
              return next(error);
            } else {
              res.json(data)
              console.log('interaction updated successfully')
            }
          })
          
    }

    if(type=="notInterested")
    {
        Event.findOneAndUpdate(req.params.id, {
            $push:{notinterested:{userId:req.body.userId}},
           
        
          }, (error, data) => {
            if (error) {
              return next(error);
            } else {
              res.json(data)
              console.log('interaction updated successfully')
            }
          })
          
    }


 
})


// delete interraction  Event
eventRoute.route('/delete/:id/:type').post((req, res, next) => {
    console.log( req.params.type)
    var type=req.params.type;

    if(type=="going")
    {
        Event.findOneAndUpdate(req.params.id, {
            $pull:{going:{userId:req.body.userId},multer:true}        
        
          }, (error, data) => {
            if (error) {
              return next(error);
            } else {
              res.json(data)
              console.log('interaction deleted successfully')
            }
          })

    }

    if(type=="interested")
    {
        Event.findOneAndUpdate(req.params.id, {
            $pull:{interested:{userId:req.body.userId},multer:true}        
          }, (error, data) => {
            if (error) {
              return next(error);
            } else {
              res.json(data)
              console.log('interaction deleted successfully')
            }
          })
          
    }

    if(type=="notInterested")
    {
        Event.findOneAndUpdate(req.params.id, {
            $pull:{notinterested:{userId:req.body.userId},multer:true}
            
        
          }, (error, data) => {
            if (error) {
              return next(error);
            } else {
              res.json(data)
              console.log('interaction deleted successfully')
            }
          })
          
    }


 
})
   


// Delete Event
eventRoute.route('/delete/:id').delete((req, res, next) => {
  Event.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = eventRoute;