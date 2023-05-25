class LogoutController {
    get(req, res) {
        req.session.destroy(() => {
            console.log('user logged out')
        })
        res.redirect('/login')
    }
}

module.exports = new LogoutController
