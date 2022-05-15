const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Post = new Schema({
        
        idUser : {
            type : String
        },
        text: {
            type: String
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
        },
    },
    { collection: 'posts'}
)

module.exports = mongoose.model('Post', Post);