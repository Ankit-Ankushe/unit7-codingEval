const { User, Task } = require('../database/schema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const SECRET_KEY = 'akhdy123wedje12hwy'


// Regitser User
async function registerUser(req,res){
    let {name,email,password} = req.body;
    const user = await User.findOne({ email, })
    if (user) {
        return res.send({
            response: 'error',
            message: 'User Registed Already'
        })
    }else{
        password = bcrypt.hashSync(password, 10)
        await User.create({
            name,
            email,
            password,
            verifyEmailOtp: crypto.randomInt(1000, 9999),
            verifiedEmail: false
        })
        return res.send({
            response: 'success',
            message: 'User Registed Successfully'
        })
    }
}

// Login User
async function login(req,res){
    const {email,password}  = req.body;
    console.log(email,password)
    const userFound = await User.findOne({
        email,
     })
    if(!userFound){
        res.status(400).send({
            response:'error',
            message:'email not found'
        })
    }else{
        console.log(password,userFound.password)
        let matched = bcrypt.compareSync(password,userFound.password)
        if(matched){
            let {name ,email,verifiedEmail} = userFound
            const token = jwt.sign({name, email, verifiedEmail }, SECRET_KEY)
            res.send({
                response:'success',
                message:'successfully loged in',
                token,
                user:{
                    name,
                    email,
                    verifiedEmail
                }
            })
        }else{
            res.status(400).send({
                response:'error',
                message:'Invalid Password'
            })
        }
    }
}
// Add Task
async function addTask(req, res) {
    let { title,status,tag } = req.body
    let userId = User.id
    console.log("user id" , userId)
    console.log(title)
    if (!title) {
        return res.send({
            response: 'error',
            message: 'Add Some Task Title'
        })
    } else {
        await Task.create({
            userId,
            title,
            status,
            tag
        })
        return res.send({
            response: 'success',
            message: 'Task Added Successfully'
        })
    }
}

// Get all Tasks
async function getTasks(req,res){
    const query = req.query
    console.log(query)
    let data
    
    if(query.status && query.tag){
        console.log(query.status)
        data = await Task.find({status: query.status,tag: query.tag})
    }
    else if(query.tag){
        data = await Task.find({tag: query.tag})
    }
    else if(query.status){
        data = await Task.find({status: query.status})
    }
    else if(!query.status && !query.tag){
        data = await Task.find({})
    }
    // const data =await Task.find({})
    return res.send(JSON.stringify(data))
}

// Delete Task
async function deleteTask(req,res){
    const {id} = req.params;
    console.log(id);
    const deleted = await Task.deleteOne({_id:id})
    if(deleted){
        res.send({
            response: 'success',
            message: 'Task Deleted Successfully'
        })
    }else{
        res.status(404).send({
            response: 'err',
            message: 'Task not found'
        })
    }
}
// update todo
async function updateTask(req,res){
    const {id} = req.params;
    let {title,status,tag} = req.body
    console.log(status)
    const updated  = await Task.findByIdAndUpdate(id,{title: title,status: status,tag: tag})
    if(!updated){
        res.status(404).send({
            response: 'err',
            message: 'Task not found'
        })
    }else{
        res.send({
            response: 'success',
            message: 'Task updated Successfully'
        })
    }
}



module.exports = {
    registerUser,
    login,
    addTask,
    getTasks,
    deleteTask,
    updateTask
}