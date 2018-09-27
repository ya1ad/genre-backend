const { movieModel, validate } = require("../model/movies");
const { genreModel } = require("../model/genre");
const express = require("express");
const movieRoute = express.Router();

movieRoute.get("/", async (req, res) => {
  try {
    const get_movies = await movieModel.find();
    res.send(get_movies);
  } catch (err) {
    res.send().status(400);
  }
});

movieRoute.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const get_genre = await genreModel.findById(req.body.genreId);
  if (!get_genre) res.status(400).send("Invalid Genre");
  let input_data = new movieModel({
    title: req.body.title,
    dailyRentalRate: parseInt(req.body.dailyRentalRate),
    numberInStock: parseInt(req.body.numberInStock),
    genre: {
      _id: get_genre._id,
      name: get_genre.name
    }
  });

  try {
    input_data = await input_data.save();
    res.send(input_data);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

movieRoute.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const get_genre = await genreModel.findById(req.body.genreId);
  if (!get_genre) res.status(400).send("Invalid Genre");

  const movie = await movieModel.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

movieRoute.delete("/:id", async (req, res) => {
  const movie = await movieModel.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

module.exports = movieRoute;
