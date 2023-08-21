const {User,Genre,Movie,Review} =require('./imdb.mongo')

async function getAllMovies(){
    return await Movie.find({})//.populate('Genre')
}

async function getMovieById(id){
    return await Movie.findById(id)
}

async function getGenreId(id){
    return await Genre.findOne({_id:id})
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

// async function getMovieReviews(id){
//     const reviews= await getMovieById(id)
//     reviews.array.forEach((reviews.Review._id) => {
//         return
//     });
// }

async function addMovieReview(id,reviewData){
    await Review.create({
        Rating: reviewData.Rating,
        Comment: reviewData.Comment
    })
    .then((result) => {
        return result
    }).catch((err) => {
        console.error(err)
    });
}

async function getUserByEmail(email){
    return await User.findOne({Email:email})
}

async function upadteMovieDetails(data){

}

async function createUser(userData){
    await User.create({
        Email: userData.Email,
        Password: userData.Password
    })
    .then((result) => {
        return result
    }).catch((err) => {
        console.error(err)
    });
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

async function checkPassword(userData){
    const dbPassword=await getUserByEmail(userData.Email)
    if (dbPassword.Password == userData.Password){
        return true
    }
    return false
}

module.exports={
    getAllMovies,
    addMovie,
    getMovieById,
    addReview,
    getUserByEmail,
    checkPassword,
    getGenreId,
    createUser,
    addMovieReview
}