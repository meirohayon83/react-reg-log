const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for router model

const user = new Schema({


email:String,

nickName:String,

city:String,

neighborhood:String,

phone:String,

password:String,

confirmPassword: String,

activeToken:String,
  
active: {
    type: Boolean,
    default: false
},
 date:{
     type:Date,
     default:Date.now
 }

})

module.exports = mongoose.model('users', user)