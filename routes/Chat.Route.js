const express = require('express');
const app = express();
const chatRoute = express.Router();
// Chat model
let Chat = require('../models/chat');

//importing formidable-express middleware for uploading files

// Add Chat
chatRoute.route('/create/:senderId/:reciverId').post((req, res, next) => {
    console.log("test")
    Chat.find({
        $or: [{ senderId: req.params.senderId, secondSenderId: req.params.reciverId },
        { senderId: req.params.reciverId, secondSenderId: req.params.senderId }]
    },
        (error, data) => {
            if (error) {

                return next(error)
            } else {
                if (data.length == 0) {
                    Chat.create(req.body, (error, data) => {
                        if (error) {
                            return next(error);
                        } else {
                            res.json(data);
                        }
                    })

                } else {
                    console.log(req.body)
                    var chat={message:req.body.currentUserSender.message,userDistId:req.params.senderId,dateCreation:req.body.currentUserSender.dateCreation}
                    console.log(chat)

                    Chat.findOneAndUpdate({
                        $or: [{ senderId: req.params.senderId, secondSenderId: req.params.reciverId },
                        { senderId: req.params.reciverId, secondSenderId: req.params.senderId }]}, 
                        {$push:{currentUserSender:chat}},
                        
                        (error, data) => {
                            res.json(data)

                        })

                }


            }
        })

});




// Get All Chats
chatRoute.route('/').get((req, res, next) => {
    Chat.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
// Get single Chat
chatRoute.route('/read/:senderId/:reciverId').get((req, res, next) => {
    Chat.find({ $or: [{ senderId: req.params.senderId, secondSenderId: req.params.reciverId }, { senderId: req.params.reciverId, secondSenderId: req.params.senderId }] }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    }).sort({dateCreation: 'desc'})
})



// Update Chat
chatRoute.route('/update/:id').put((req, res, next) => {
    Chat.findByIdAndUpdate(req.params.id, {
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


// Delete Chat
chatRoute.route('/delete/:id').delete((req, res, next) => {
    Chat.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
module.exports = chatRoute;