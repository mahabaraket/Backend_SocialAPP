const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let CoverPic = new Schema({
 
        idUser : {
            type : String
        },
        cover : {
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
    { collection: 'coverPics'}
)

module.exports = mongoose.model('CoverPic', CoverPic);