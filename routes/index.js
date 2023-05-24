const loginRouter = require('./login')
const movieRouter = require('./movie')
const registerRouter = require('./register')
const homeRouter = require('./home')
const logoutRouter = require('./logout')

route = (app) => {
    app.use('/login', loginRouter)
    app.use('/movie', movieRouter)
    app.use('/register', registerRouter)
    app.use('/', homeRouter)
    app.use('/logout', logoutRouter)
}

module.exports = route