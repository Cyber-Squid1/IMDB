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

async function getReviewByID(id){
    return await Review.findById(id)
}

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
    try{
        return await Movie.updateOne(
            {_id: data.MovieID},
            ...data,
            {upsert:true}
        ) 
    }
    catch(error){
        console.error(`Could not add movie! Error: ${error}`)
    }
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
        await Review.create({
            Rating:rating,
            Comment: comment
        })
        .then(async (result) => {
            // Update the review array in Movies schema by adding the new Review objectID in the array
            try{
                await Movie.updateOne(
                    {_id: id},
                    { $push: { Review: [result._id] } },
                    {upsert:true}
                ) 
            }
            catch(error){
                console.error(`Could not add movie! Error: ${error}`)
            }
        }).catch((err) => {
            console.error(err)
        });
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
    addMovieReview,
    getReviewByID,
    upadteMovieDetails
}