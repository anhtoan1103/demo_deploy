const express =require('express')

const multer = require('multer')
const upload = multer();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')

const user = new mongoose.Schema({

    username: {type:String},
    password: {type:String}
}
)

const User = mongoose.model('user', user)

app = express()
const router = express.Router()
const mongoUri = 'mongodb://localhost:27017/test'
mongoose.connect(mongoUri).then((data) => {
    console.log('Connected' + data)
}).catch((err) => {
    console.log(err)
})
async function find() {
    const Finduser = await User.findOneAndUpdate({username: "hehe"}, {password:"heddhe"})
    return Finduser
}
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

//set static file
app.use(express.static('images'))
app.use(express.static('public'))

// fix favicon.ico router
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/id/:id', (req, res) => {
    const newUser = new User({username: "hehe", password: "hehe"})
    // Finduser.username = "hehehehhe"
    // console.log(Finduser.username)
    //create + update 
    if(req.params.id) {
        console.log(req.params.id)
    }
    User.findOneAndRemove({username: "heheeh"}).then((find) => {
        if(!find) {
            const replace = new User({username: "heheeh", password: "hehe"})
            replace.username = "heheeh"
            replace.save()
            res.send("Hello World" + find)
        } else {
            res.send("Cannot find")
        }
    })
})
    // app.use((req, res, next) => {
    //     console.log('begin')
    //     next()
    // })

app.get('/', (req, res, next) => {
    console.log("No router for this!")
    res.render('index', {
        name: "toan",
        url: "hehe.com"
    })
    next()
})

app.get('/cookie', function(req, res){
    res.cookie('name', 'express').send('cookie set'); //Sets name = express
 });

app.get('/form', (req, res) => {
    res.render('form')
})

app.post('/', (req, res) => {
    console.log(req.body)
    const newUser = new User(req.body)
    newUser.save()
})


app.use('/', (req, res, next) => {
    console.log('end')
})


app.listen(3000, () => {
    console.log('App is listening at http://localhost:3000')
})