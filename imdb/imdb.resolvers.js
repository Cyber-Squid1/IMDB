const imdbModel = require('./imdb.model')

module.exports={
    Query: {
        getAllMovie: async ()=>{
            console.log('Get all Movies')
            await imdbModel.getAllMovies()
        },
        getMovieReview: async (_,args,)=>{

        }

    },
    Mutation: {
        addMovie: async (_,args)=>{
            console.log("Adding new Movie")
            return imdbModel.addMovie(args.MovieName,args.Description,args.Genre,args.ReleaseDate)
        },
        signInUser: async (_,)=>{

        },
        addReview

    }
}