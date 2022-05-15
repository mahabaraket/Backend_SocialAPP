const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let ProfilePic = new Schema({
 
        idUser : {
            type : String
        },
        pfp : {
            fieldname : { type : String },
            originalname : { type : String },
            encoding : { type : String },
            mimetype : { type : String },
            buffer : { type : Buffer }
        },
        creationDate : {
            type : Date
        }
    },
    { collection: 'profilPics'}
)

module.exports = mongoose.model('ProfilePic', ProfilePic);