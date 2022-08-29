const mongoose = require('mongoose')
async function connectDB() {
    try {
        const url = 'mongodb://localhost:27017/todo'
        mongoose.connect(url)
        console.log('connected successfully');
    } catch (error) {
        console.log('connection not done');
    }
}
module.exports = connectDB;