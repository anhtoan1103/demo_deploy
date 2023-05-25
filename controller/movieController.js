movies = [
    {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
    {id: 102, name: "Inception", year: 2010, rating: 8.7},
    {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
    {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
]
class MovieController {

    movies = [
        {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
        {id: 102, name: "Inception", year: 2010, rating: 8.7},
        {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
        {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
    ]
    getAll(req, res, next) {
        res.json(movies)
    }

    getById(req, res) {

        let movie = movies.filter((movie) => {
            if(movie.id == req.params.id)
                return movie.id
        })
        if(movie.length)
            res.json(movie)
        else {
            res.status(404)
            res.json({message: "Error: Not found"})
        }
    }

    post(req, res) {
        if(!(req.body.name && req.body.year && req.body.rating)) {
            res.status(404)
            res.json({message: "Bad request"})
        } else {
            let newId = movies[movies.length-1].id + 1
            movies.push({
                id: newId,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            })
            res.json({message: "Movie created", location: "/movies/" + newId})
        }
    }

    put(req, res) {
        if(!(req.body.name && req.body.year && req.body.rating)) {
            res.status(404)
            res.json({message: "Bad request"})
        } else {
            // If not exist, create a new one
            index = movies.map((movie) => {
                return movie.id
            }).indexOf(parseInt(req.params.id))
            if(index===-1) {
                movies.push({
                    id: req.params.id,
                    name: req.body.name,
                    year: req.body.year,
                    rating: req.body.rating
                })
                res.json({message: "Movie created ", location: "/movies/" + req.params.id})
            } else {
                movies[index] = {
                    id: req.params.id,
                    name: req.body.name,
                    year: req.body.year,
                    rating: req.body.rating
                }
                res.json({message: "Movie " + req.params.id + "updated ", location: "/movies/" + req.params.id})
            }
        }
    }

    delete(req, res) {
        index = movies.map(movie => {
            return movie.id
        }).indexOf(req.params.id)
    
        if(index===-1) {
            res.status(400)
            res.json({message: "Id not found"})
        } else {
            movies.splice(index, 1)
            res.json({message: "Movie at id" + req.params.id + "deleted"})
    
        }
    }
}

module.exports = new MovieController
