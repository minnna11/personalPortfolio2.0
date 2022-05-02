const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const contactingSchema = new Schema({
    fName:{type:String, required:[true,'nameis required']},
    lName:{type:String, required:[true,'title is required']},
    email:{type:String, required:[true,'email is required']},
    phone:{type:String, required:[true,'phone is required']},
    content:{type:String, required:[true,'content is required'],
    minLength:[10, 'the content should have at least 10 characters']},
    when:{type:String, required:[true,'content is required']}
},
    {timestamp:true}    

);

module.exports = mongoose.model('Contacting',contactingSchema);