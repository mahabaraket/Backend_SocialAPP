const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
// Define collection and schema
let Chat = new Schema({
   
    senderId: {
        type : String
    },

    secondSenderId : {
       type : String
    },

    currentUserSender : [{
       
        message : { type : String },
        userDistId: {
            type : String
        },
        dateCreation : { type: Date, required: true, default: Date.now },
    }],


},
{
   collection: 'chats'
})
module.exports = mongoose.model('Chat', Chat);