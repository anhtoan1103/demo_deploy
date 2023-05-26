const mongoose = require('mongoose')

const mongoUri = "mongodb+srv://toanta:" + process.env.password + "@cluster0.wbszohr.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri).then((data) => {
    console.log('Connected' + data)
}).catch((err) => {
    console.log(err)
})
module.exports = mongoose
