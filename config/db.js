const mongoose = require('mongoose')
const mongoUri = 'mongodb://localhost:27017/test'
mongoose.connect(mongoUri).then((data) => {
    console.log('Connected' + data)
}).catch((err) => {
    console.log(err)
})
module.exports = mongoose