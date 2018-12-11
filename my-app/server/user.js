const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')

Router.get('/list', function(req, res) {
    const type = req.query.type
    console.log(type)
    User.find({ type }, { pwd: 0 }, function(err, doc) {
        console.log(doc)
        return res.json({
            code: 0,
            data: doc
        })
    })
})

Router.get('/getmsglist', function(req, res) {
    const user = req.cookies.user
    Chat.find({'$or': [{from: user, to: user}]}, function(err, doc) {
        if(!err) {
            return res.json({code: 0, msgs: doc})
        }
    })
})

Router.post('/update', function(req, res) {
    const userid = req.cookies.userid
    console.log(userid)

    if (!userid) {
        return res.json({
            code: 1
        })
    }
    const body = req.body
    // User.findOne({_id: userid}, function(err, doc) {
    //     console.log('找到了 ', doc)
    // })
    User.findOneAndUpdate({ _id: userid }, body, function(err, doc) {
        const data = Object.assign(
            {},
            {
                user: doc.user,
                type: doc.type
            },
            body
        )
        // console.log(data)
        return res.json({
            code: 0,
            data
        })
    })
})
Router.post('/login', function(req, res) {
    const { user, pwd } = req.body
    User.findOne({ user, pwd }, { pwd: 0 }, function(err, doc) {
        if (doc) {
            res.cookie('userid', doc._id.toString())
            return res.json({ code: 0, data: doc })
        } else {
            return res.json({ code: 1, msg: 'does not match' })
        }
    })
})
Router.post('/register', function(req, res) {
    const { user, pwd, type } = req.body
    User.findOne({ user: user }, function(err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: 'Username has been taken' })
        } else {
            const userModel = new User({ user, type, pwd })
            userModel.save(function(e, d) {
                if (e) {
                    return res.json({ code: 1, msg: 'error occur' })
                }
                const { user, type, _id } = d
                res.cookie('userid', _id.toString())
                return res.json({ code: 0, data: { user, type, _id } })
            })
            // User.create({ user, pwd: pwd, type }, function(
            //     err,
            //     doc
            // ) {
            //     if (err) {
            //         return res.json({ code: 1, msg: 'error occur' })
            //     } else {
            //         return res.json({ code: 0 })
            //     }
            // })
        }
    })
})
Router.get('/info', function(req, res) {
    //cookie?
    const { userid } = req.cookies
    if (!userid) {
        return res.json({
            code: 1
        })
    }
    User.findOne({ _id: userid }, { pwd: 0 }, function(err, doc) {
        if (err) {
            return res.json({
                code: 1,
                msg: 'Server Error'
            })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
    })
})

function md5Pwd(pwd) {
    const salt = 'joseph@dsaas531234^*&^$%gcddasda'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
