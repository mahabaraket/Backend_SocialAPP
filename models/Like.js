const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Like = new Schema({
   
    idUser : {
        type : String
    },

    idParent : {
       type : String
   },

},
{
   collection: 'likes'
})
module.exports = mongoose.model('Like', Like);