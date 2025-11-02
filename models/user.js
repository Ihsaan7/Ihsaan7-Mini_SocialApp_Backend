const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
// mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/uploadProject`)

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number,
    city:String,
    profilePic:{
        type:String,
        default: "default.svg"
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }]
})

module.exports = mongoose.model("user",userSchema)