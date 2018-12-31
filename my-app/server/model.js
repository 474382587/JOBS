// Mongoose
const mongoose = require('mongoose')
// mongodb
const DB_URL =
    'mongodb+srv://jerkjoe:jinyuhui1994@jobs-5edzn.gcp.mongodb.net/test?retryWrites=true'
mongoose.connect(
    DB_URL,
    { useNewUrlParser: true, useFindAndModify: false }
)
mongoose.connection.on('connected', function() {
    console.log('MongoDB connect SUCCESS')
})

const models = {
    user: {
        user: { type: String, require: true },
        pwd: { type: String, require: true },
        type: { type: String, require: true },
        avatar: { type: String, require: true },
        // 'user': {type: String},
        // Your Job description or Personal information
        desc: { type: String },
        title: { type: String },
        company: { type: String },
        salary: { type: String }
    },
    chat: {
        read: {
            type: Boolean,
            default: false
        },
        chatid: {
            type: String,
            require: true
        },
        from: {
            type: String,
            require: true
        },
        to: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true,
            default: ''
        },
        create_time: {
            type: Number,
            require: true,
            default: new Date().getTime()
        }
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}
