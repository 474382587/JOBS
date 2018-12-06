// Mongoose
const mongoose = require('mongoose')
// mongodb
const DB_URL = 'mongodb+srv://jerkjoe:jinyuhui1994@jobs-5edzn.gcp.mongodb.net/test?retryWrites=true'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
    console.log('MongoDB connect SUCCESS')
})