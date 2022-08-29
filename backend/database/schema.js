const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password :String,
    verifiedEmail: Boolean
},{
    timestamps: true
})

const taskSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    title: String,
    status:String,
    tag:String
},{
    timestamps:true
})


const User = mongoose.model('User' , userSchema)
const Task = mongoose.model('Task',taskSchema)
module.exports = {User,Task};