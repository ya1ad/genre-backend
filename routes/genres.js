const express = require("express");
const auth = require("../middleware/authorize");
const router = express.Router();
const { genreModel, nameValidate } = require("../model/genre");

router.get("/", async (req, res) => {
  try {
    const get_geners = await genreModel.find().select({ name: 1 });
    res.send(get_geners);
  } catch (err) {
    res.send().status(400);
  }
});

/**
 * GET genre of specific id
 */

router.get("/:id", async (req, res) => {
  const get_genre = await genreModel.findById(req.params.id);
  if (!get_genre) res.status(404).send("Genre not found.");
  res.send(get_genre);
});

/**
 * POST /api/genres/
 */
router.post("/", auth, async (req, res) => {
  const { error } = nameValidate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let data = new genreModel({
    name: req.body.name
  });

  let getResult = await data.save();

  res.send(getResult);
});

router.put("/:id", async (req, res) => {
  const { error } = nameValidate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = await genreModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }``
  );

  if (!genre) res.status(404).send("Genre not found.");

  res.status(200).send("Sucesfully data updated!!");
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await genreModel.findByIdAndRemove(req.params.id);
    res.send(200).message("Deleted!!");
  } catch (err) {
    res.status(400).send("Error!!");
  }
});

module.exports = router;
