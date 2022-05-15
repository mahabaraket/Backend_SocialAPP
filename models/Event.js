const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Event = new Schema({
        
        idUser : {
            type : String
        },
        title : {
            type : String
        },
        notinterested: [{
            userId: String
        }],
        interested: [{
            userId: String
        }],
        going: [{
            userId: String
        }],
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
    { collection: 'events'}
)

module.exports = mongoose.model('Event', Event);