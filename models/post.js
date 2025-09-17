const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
// mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/uploadProject`)

const postSchema = mongoose.Schema({
    content:String,
    date:{
        type:Date,
        default:Date.now()
    },
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports = mongoose.model("post",postSchema)