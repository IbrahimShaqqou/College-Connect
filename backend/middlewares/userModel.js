const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
        maxlength:25,
        required:true,
    },
    fullname:{
        type:String,
        trim:true,
        require:true,
        maxlength:25,

    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        required:true,        
    },
    address:{ // null val if val is not provided
        type:String,
        default:'',
    },
    gender:{
        type:String,
        default:'male',
    },
    website:{
        type:String,
        default:'',
    },
    phone:{
        type:String,
        default:'',
    },
    avatar:{
        type:String,
        default:'',
    },

    story:{
        type:String,
        default:'',
        maxLength:200,
    },
    friends:[{type:mongoose.Types.ObjectId,ref:'user'}],
    following:[{type:mongoose.Types.ObjectId,ref:'user'}],

},{
    timestamps:true
})

module.exports = mongoose.model('user', userSchema)