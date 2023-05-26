const express =require('express')
const session = require('express-session')
app = express()
app.use(session({secret: 'oh shit, this is a secret'}))
const User = require('../models/user')
class LoginController {
    get(req, res) {
        if(req.session.user) {
            res.redirect('/')
        } else {
            let message = req.session.message
            res.render('login', {message: message})
        }
    }
    
    post(req, res, next) {
        if(req.body.username && req.body.password) {
            //check if user exist
            User.exists({username: req.body.username, password: req.body.password}).then((user) => {
                if(user) {
                    //login success
                    console.log(user)
                    req.session.user = user
                    res.redirect('/')
                }
                else {
                    res.render('login', {message: 'wrong username or password!', save: req.session.isLogin})
                }
            })
            next()
        }
        else {
            res.status(400)
            res.send("Invailed feild input")
        }   
    }
}

module.exports = new LoginController
