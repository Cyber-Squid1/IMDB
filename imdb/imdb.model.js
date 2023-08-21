const {User,Genre,Movie,Review} =require('./imdb.mongo')

async function getAllMovies(){
    return await Movie.find({},{}).populate('genre')
}

async function getMovieById(id){
    return await Movie.findById(id)
}

async function addMovie(name,description,genre,releasedate){
    const newMovie={
        name,
        description,
        releasedate,
        genre,
        review: []
    };
    try{
        await Movie.updateOne(
            {MovieName: newMovie.name},
            newMovie,
            {upsert:true}
        ) 
    }
    catch(error){
        console.error(`Could not add movie! Error: ${error}`)
    }
}

async function addReview(id,rating,comment){
    const matchedMovie=getMovieById(id)
    if (matchedMovie){
        Review.insertIOne({
            Rating:rating,
            Comment: comment
        })
    }
}

module.exports={
    getAllMovies,
    addMovie,
    getMovieById,
    addReview
}