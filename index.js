const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

/**
 * Creating Dummy genre
 */

const dummy_genre = [
  {
    id: 1,
    name: "fiction"
  },
  {
    id: 2,
    name: "crime"
  }
];

/**
 * PORT
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

/**
 * GET all genre
 */
app.get("/api/genres/", (req, res) => {
  res.send(dummy_genre);
});

/**
 * GET genre of specific id
 */

app.get("/api/genres/:id", (req, res) => {
  const get_genre = find_genre(req.params.id);
  if (!get_genre) res.status(404).send("Genre not found.");
  res.send(get_genre);
});

/**
 * POST /api/genres/
 */
app.post("/api/genres/", (req, res) => {
  const { error } = nameValidate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const temp_genre = {
    id: dummy_genre.length + 1,
    name: req.body.name
  };
  dummy_genre.push(temp_genre);
  res.send(dummy_genre);
});

app.put("/api/genres/:id", (req, res) => {
  const get_genre = find_genre(req.params.id);
  if (!get_genre) res.status(404).send("Genre not found.");

  const { error } = nameValidate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  get_genre.name = req.body.name;
  res.send(dummy_genre);
});

/**
 * Check genre exist or not
 */
function find_genre(id) {
  return dummy_genre.find(g => g.id === parseInt(id));
}

/**
 * Name Validation
 */
function nameValidate(genre_name) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre_name, schema);
}
