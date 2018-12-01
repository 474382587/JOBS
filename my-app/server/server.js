const express = require('express')

// Mongoose
const mongoose = require('mongoose')
// mongodb
const DB_URL = 'mongodb+srv://jerkjoe:jinyuhui1994@jobs-5edzn.gcp.mongodb.net/test?retryWrites=true'

mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
    console.log('MongoDB connect SUCCESS')
})

const User = mongoose.model('user', new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}))
// add data to database
// User.create({
//     user: 'Joseph',
//     age: 18
// }, function (err, doc) {
//     if (!err) {
//         console.log(doc)
//     }
//     else {
//         console.log(err)
//     }
// })
// User.remove({user:'Joseph'}, function(err, doc) {
//     console.log(doc)
// })


const app = express()

//  Cross Origin
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get('/', function (req, res) {
    res.send('<h1>Hello!</h1>')
})
app.get('/data', function (req, res) {
    User.find({}, function (err, doc) {
        res.json(doc)
    })
})

app.listen(9093, function () {
    console.log('Node app start at port 9093...')
})

// Cloud mongodb+srv://jerkjoe:jinyuhui1994@jobs-5edzn.gcp.mongodb.net/test?retryWrites=true