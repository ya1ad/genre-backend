const mongoose = require("mongoose");
const Joi = require("joi");
const { genre_schema } = require("./genre");
const movieModel = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true
    },
    numberInStock: {
      type: Number,
      required: true
    },
    dailyRentalRate: {
      type: Number,
      required: true
    },
    genre: { type: genre_schema, required: true }
  })
);

function validate(arg) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    genreId: Joi.string().required()
  };

  return Joi.validate(arg, schema);
}

module.exports.movieModel = movieModel;
module.exports.validate = validate;
