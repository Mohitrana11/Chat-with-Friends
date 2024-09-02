const mongoose =require('mongoose');
const conversationSchema = new mongoose.Schema({
    chatName:{type:String},
    isGroupChat:{type:Boolean},
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    latestMessage:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'message',
            default:[]
        }
    ],
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }
},{timestamps:true});


const conversation = mongoose.model('conversation',conversationSchema);
module.exports = conversation;