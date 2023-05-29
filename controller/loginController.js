const express =require('express')
const session = require('express-session')
app = express()
app.use(session({secret: 'oh shit, this is a secret'}))
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const token = jwt.sign({foo: 'bar'}, 'sshhhhhhhh')
const randToken = require('rand-token')

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
            User.findOne({username: req.body.username}).then((user) => {
                //check if user exist
                if(user) {
                    bcrypt.compare(req.body.password, user.password, function(err, result) {
                        
                        //right username and password
                        if(result) {
                            // check for access_token and refresh_token
                            const access_token_life = process.env.ACCESS_TOKEN_LIFE
                            const access_token_secret = process.env.ACCESS_TOKEN_SECRET
                            const dataForAccessToken = {
                                user: user.username
                            }

                            const access_token = jwt.sign(dataForAccessToken, access_token_secret, {})
                            let refresh_token = randToken.generate(16)
                            if(!user.refresh_token) {
                                // lưu fresh_token vào database
                                User.findOneAndUpdate({username: req.body.username}, {refresh_token: refresh_token}).then((err, user) => {
                                    if(err) {
                                        console.log(err)
                                    } else {
                                        console.log('updated')
                                    }
                                }) 
                            } else {
                                refresh_token = user.refresh_token
                            }

                            req.session.user = user
                            //res.redirect('/')
                            res.json({
                                msg: "Login successfully",
                                access_token,
                                refresh_token,
                                user
                            })
                        }
                    });                    
                } else {
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

    refreshToken(req, res) {
        // get access_token from header
        const accessTokenFromHeader = req.headers.x_authorization
        if(!accessTokenFromHeader) {
            return res.status(400).send('Không tìm thấy access token')
        }

        // get refresh_token from body
        const refreshTokenFromHeader = req.body.refreshToken
        if(!refreshTokenFromHeader) {
            return res.status(400).send('Không tìm thấy refresh token')
        }

        // access token secret and life
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE

        // decode access_token
        const decode = jwt.verify(accessTokenFromHeader, accessTokenSecret, {
			ignoreExpiration: true,
		})
        if(!decode) {
            return res.status(400).send('Access token k hop le')
        }
        // get username from payload
        const username = decode.user
        

        // check user exist in database
        User.findOne({username: username}).then((user) => {
            if(!user) {
                return res.status(400).send('User khong ton tai')
            }
            if(refreshTokenFromHeader!=user.refresh_token) {
                return res.status(400).send('Refresh token khong hop le')
            }
        })
        const dataForAccessToken = {username: username}
        const accessToken = jwt.sign(dataForAccessToken, accessTokenSecret, {})
        if(!accessToken) {
            res.status(400).send('Tao token khong thanh cong, vui long thu lai')
        }
        res.json(accessToken)


    }

    isAuth(req, res, next) {
        // check if access token exist in header
        const accessToken = req.headers.x_authorization
        if(!accessToken) {
            res.status(401).send('unauthorize!')
        }

        const access_token_secret = process.env.ACCESS_TOKEN_SECRET
        let verify = true
        try {

            verify = jwt.verify(accessToken, access_token_secret)
            
        } catch(err) {
            console.log(err)
            verify = false
        }
        if(!verify) {
            res.status(401).send('permission denied')
        }
        User.findOne({username: verify.username}).then(user => {
            req.user = user
            return next()
        })
    }
}

module.exports = new LoginController
