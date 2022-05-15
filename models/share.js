const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Share = new Schema({
   
    userId : {
        type : String
    },

    postId : {
       type : String
    },

},
{
   collection: 'shares'
})
module.exports = mongoose.model('Share', Share);