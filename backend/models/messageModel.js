const mongoose =require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    message:{
        type:String,
        required:true
    },
    // conversationId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'conversation',
    //     default:[]
    // }
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'conversation',
    }
},{timestamps:true});
const message = mongoose.model('message',messageSchema);
module.exports = message;