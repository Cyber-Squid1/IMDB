const mongoose=require('mongoose')
const {Schema} =require('mongoose')

const userSchema= Schema({
    _id: Schema.Types.ObjectId,
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    }
})

const movieSchema = Schema({
    _id: Schema.Types.ObjectId,
    MovieName: {
        type: String,
        required: true,
        max: 100
    },
    Description: {
        type: String,
        required: true
    },
    GenreName: {
        type: String,
        
        ref: 'genres',
        required: true
    },
    Review: [{
        type: Schema.Types.ObjectId,
        ref: 'reviews', // ref is for refrence from that schema
        required: false
    }],
    ReleaseDate: {
        type: Date,
        required: true
    }
});

const genreSchema= Schema({
    _id: Schema.Types.ObjectId,
    Genre: {
        type: String,
        required: true,
    },
})

const reviewSchema = Schema({
    Rating: {
        type: Number,
        required: true
    },
    Comment: {
        type: String,
        required: false
    }
})

const User=mongoose.model('user',userSchema)
const Movie=mongoose.model('movie',movieSchema)
const Genre=mongoose.model('genre',genreSchema)
const Review=mongoose.model('review',reviewSchema)

module.exports={
    User,Movie,Genre,Review
}
