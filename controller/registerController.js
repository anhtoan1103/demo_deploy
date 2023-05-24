const User = require('../models/user')

class RegisterController {
    get(req, res) {
        //check if login?
        if(req.session.user) {
            res.redirect('/')
        } else 
        res.render('register')
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
                    const newUser = new User({username: req.body.username, password: req.body.password})
                    newUser.save()
                    // render login
                    req.session.message = 'sign up success'
                    res.redirect('login')
                }
            })}
        else {
            res.status(400)
            res.send("Invailed feild input")
        }
    }

}

module.exports = new RegisterController 