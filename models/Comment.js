const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Comment = new Schema({
   
    idUser: {
        type : String
    },

    idParent : {
       type : String
    },

    text : {
        type : String
    },

    media : {
        fieldname : { type : String },
        originalname : { type : String },
        encoding : { type : String },
        mimetype : { type : String },
        buffer : { type : Buffer },
    },

    creationDate : {
        type : Date
    }

},
{
   collection: 'comments'
})
module.exports = mongoose.model('Comment', Comment);