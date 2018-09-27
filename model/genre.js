const mongoose = require("mongoose");
const Joi = require("joi");
const genre_schema = new mongoose.Schema({
  name: { type: String, required: true }
});

const genreModel = mongoose.model("Genre", genre_schema);

function nameValidate(genre_name) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre_name, schema);
}

module.exports.genreModel = genreModel;
module.exports.nameValidate = nameValidate;
module.exports.genre_schema = genre_schema;
