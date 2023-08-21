const { AuthenticationError } = require('apollo-server-express')
const imdbModel = require('./imdb.model')

module.exports={
    Query: {
        getAllMovie: async ()=>{
            console.log('Get all Movies')
            await imdbModel.getAllMovies()
        },
        // getMovieReview: async (_,args)=>{
        //     const movie = await imdbModel.getMovieById(args.MovieID)

        // },
        getGenreById: async (_,args)=>{
            return await imdbModel.getGenreById(args.GenreID)
        }

    },
    Mutation: {
        addMovie: async (_,args)=>{
            console.log("Adding new Movie")
            const genre=getGenreById(args.GenreID)
            return imdbModel.addMovie(args.MovieName,args.Description,genre.GenreName,args.ReleaseDate)
        },
        signUpUser: async (_,{newUser},)=>{
            const check=imdbModel.getUserByEmail(newUser.Email)
            if (check){
                throw new AuthenticationError(`User already exists with email ${newUser.Email}`)
            }
            const createdUser=await imdbModel.createdUser(newUser)
            return createdUser
        },
        loginUser: async (_,args)=>{
            const check=imdbModel.getUserByEmail(newUser.Email)
            if (check){
                throw new AuthenticationError(`User already exists with email ${newUser.Email}`)
            }
        }

    }
}