const express = require('express');
const cors = require('cors');
const connectDB = require('./database/index');
const { registerUser, login, addTask, getTasks, deleteTask, updateTask } = require('./handlers/handler');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json())


app.post('/register',registerUser)
app.post('/login',login)
app.post('/addTask',addTask)
app.get('/task',getTasks)
app.delete('/task/:id',deleteTask)
app.patch('/task/:id',updateTask)
connectDB()
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})


