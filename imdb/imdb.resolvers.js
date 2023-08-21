const { AuthenticationError } = require("apollo-server-express");
const imdbModel = require("./imdb.model");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    getAllMovie: async () => {
      console.log("Get all Movies");
      return await imdbModel.getAllMovies();
    },
    getMovieReview: async (_, args) => {
      let allreviews = [];
      const movie = await imdbModel.getMovieById(args.MovieID);
      const reviews = movie.Review;
      reviews.array.forEach(async (element) => {
        const item = await imdbModel.getReviewByID(element);
        allreviews.push(item);
      });
      return allreviews;
    },
    getGenreById: async (_, args) => {
      return await imdbModel.getGenreId(args.GenreID);
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      console.log("Adding new Movie");
      const genre = getGenreById(args.GenreID);
      return imdbModel.addMovie(
        args.MovieName,
        args.Description,
        genre.GenreName,
        args.ReleaseDate
      );
    },
    signUpUser: async (_, { newUser }) => {
      const check = imdbModel.getUserByEmail(newUser.Email);
      if (check) {
        throw new AuthenticationError(
          `User already exists with email ${newUser.Email}`
        );
      }
      const createdUser = await imdbModel.createUser(newUser);
      return createdUser;
    },
    loginUser: async (_, { userData }) => {
      const check = imdbModel.getUserByEmail(userData.Email);
      if (!check) {
        throw new AuthenticationError(
          `User does not exist with email ${userData.Email}`
        );
      }
      const matchPassword = imdbModel.checkPassword(userData);
      if (!matchPassword) {
        throw new AuthenticationError("Please Enter correct login Credentials");
      }
      // JWT_SECRET is stored in and enviornment file (.env) and is not pushed to github during real world production
      // This being a test the .env file is also pushed to github
      const token = jwt.sign({ userID: check.Email }, process.env.JWT_SECRET);
      return { token };
    },
    addReview: async (_, args) => {
      return await imdbModel.addMovieReview(
        args.MovieID,
        args.Rating,
        args.Comment
      );
    },
    updateMovie: async (_, args) => {
      return await imdbModel.upadteMovieDetails(args);
    },
    addGenre: async(_, {GenreName}) => {
		return await imdbModel.addGenre(GenreName)
	},
  },
};
