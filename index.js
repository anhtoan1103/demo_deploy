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

// // app.use('/movies', movies);

// app.get('/id/:id', (req, res) => {
//     const newUser = new User({username: "hehe", password: "hehe"})
//     // Finduser.username = "hehehehhe"
//     // console.log(Finduser.username)
//     //create + update 
//     if(req.params.id) {
//         console.log(req.params.id)
//     }
//     User.findOneAndRemove({username: "heheeh"}).then((find) => {
//         if(!find) {
//             const replace = new User({username: "heheeh", password: "hehe"})
//             replace.username = "heheeh"
//             replace.save()
//             res.send("Hello World" + find)
//         } else {
//             res.send("Cannot find")
//         }
//     })
// })



// app.get('/cookie', function(req, res){
//     res.clearCookie('name')
//     res.cookie( 'cookiename',"12", {expire: 360000 + Date.now()})
//     res.cookie( 'value','calue', {maxAge: 360000})
//     console.log(req.cookies)
//     res.cookie('name', 'express').send('cookie set'); //Sets name = express
// });

// app.get('/session', (req, res) => {
//     if(req.session.count_time) {
//         req.session.count_time++
//         res.send('You visit this page ' + req.session.count_time + 'times')
//     }
//     else {
//         req.session.count_time=1
//         res.send('This is your fisrt time here')
//     }
// })




// app.get('/form', (req, res) => {
//     res.render('form')
// })

// app.post('/', (req, res) => {
//     console.log(req.body)
//     const newUser = new User(req.body)
//     newUser.save()
// })

route(app)
app.use('/login', (req, res, next) => {
    if(req.session.count) {
        req.session.count++
    }
    else
    {
        req.session.count=1
    }
    next()
})

// app.use('/register', (req, res, next) => {
//     next()
// })


app.listen(3000, () => {
    console.log('App is listening at http://localhost:3000')
})