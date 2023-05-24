class HomeController {
    get(req, res) {
        console.log("No router for this!")
        let message = ''
        if(req.session.user) {
            message = 'Logged in'
        } else {
            message = 'Not logged in'
        }
    
        res.render('index', {
            name: "toan",
            url: "hehe.com",
            message: message
        })
    }
}

module.exports = new HomeController