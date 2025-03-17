const fs = require("fs");
const getMovies = (req, res) => {
  const path = req.url.substring(0, req.url.lastIndexOf("/"));
  const id = req.url.split("/")[3];
  if (req.url === "/moviedb/movies") {
    const movies = fs.readFileSync("./data/movie_data.json", "utf-8");
    res.end(movies);
    return;
  }
  if (path === "/moviedb/movies" && id) {
    res.end("Details");
    return;
  }
  res.end("not found!");
};

module.exports = getMovies;
