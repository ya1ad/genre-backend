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
 * Get all genre
 */

app.get("/api/genres/", (req, res) => {
  res.send(dummy_genre);
});


