const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const app = express();

const genres = require("./routes/genres");
const customer = require("./routes/customers");
const movie = require("./routes/movies");
const rentals = require("./routes/rentals");
const user = require("./routes/users");
const auth = require("./routes/auth");

app.use(express.json());
app.use("/api/rentals", rentals);
app.use("/api/genres", genres);
app.use("/api/customers", customer);
app.use("/api/movies", movie);
app.use("/api/users", user);
app.use("/api/auth", auth);
console.log(config.get("jwtPrivateKey"));
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwt private key not defined");
  process.exit(1);
}
/**
 * Database Connection
 */
mongoose
  .connect("mongodb://localhost/movie")
  .then(() => console.log("Connected!!"))
  .catch(err => console.log("Error-----------", err));

/**
 * PORT
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
