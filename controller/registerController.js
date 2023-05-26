const User = require('../models/user')

const bcrypt =  require('bcrypt')
const saltRounds = 10
class RegisterController {
    get(req, res) {
        //check if login?
        if(req.session.user) {
            res.redirect('/')
        } else {
            res.render('register')
        }
    }

    post(req, res) {
        //check username and password
        if(req.body.username && req.body.password) {
            //check if user exist
            User.exists({username: req.body.username}).then((user) => {
                if(user) {
                    res.render('register', {message: 'User existed'})
                }
                else {
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            const newUser = new User({username: req.body.username, password: hash})
                            newUser.save()
                            req.session.message = 'sign up success'
                            // render login
                            res.redirect('login')
                        })
                    })
                }
            })}
        else {
            res.status(400)
            res.send("Invailed feild input")
        }
    }

}

module.exports = new RegisterController
