const express =require('express')
const multer = require('multer')
const upload = multer();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const route = require('./routes')

const User = require('./models/user')

app = express()

const port = 3000
// set view engine
app.set('view engine', 'pug')
app.set('views', './views')
//set virtual path preflix
app.use('/static', express.static('public'));
//for parsing body application/json 
app.use(bodyParser.json())
// for parsing application/xwww
app.use(bodyParser.urlencoded({extended: true}))

// for parsing multi-part/form-data
app.use(upload.array())

// for using cookie parser
app.use(cookieParser())
const mongoose = require('./config/db')

// for using session
app.use(session({secret: 'oh shit, this is a secret'}))

//set static file
app.use(express.static('images'))
app.use(express.static('public'))

// fix favicon.ico router
app.get('/favicon.ico', (req, res) => res.status(204).end());

route(app)
app.use('/login', (req, res, next) => {
    if(req.session.count) {
        req.session.count++
    }
    else {
        req.session.count=1
    }
    console.log(req.session.count)
})

app.listen(3000, () => {
    console.log('App is listening at http://localhost:3000')
})
