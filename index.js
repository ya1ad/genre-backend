const express = require("express");
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

app.get("/api/genre/:id", (req, res) => {
  const get_genre = find_genre(req.params.id);
  if (!get_genre) res.status(404).send("Genre not found.");
  res.send(get_genre);
});

/**
 *
 */

/**
 * Check genre exist or not
 */
function find_genre(id) {
  return dummy_genre.find(g => g.id === parseInt(id));
}
