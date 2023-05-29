const mongoose = require('mongoose')
const user = new mongoose.Schema(
{
    username: {type:String},
    password: {type:String},
    access_token: {type: String},
    refresh_token: {type: String}
}
)
module.exports = mongoose.model('user', user)
