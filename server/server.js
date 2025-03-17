const http = require("http");
const getMovies = require("./method/getMovies");
const postMovies = require("./method/postMovies");
const deleteMovies = require("./method/deleteMovies");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  switch (req.method) {
    case "GET":
      getMovies(req, res);
      break;
    case "POST":
      postMovies(req, res);
      break;
    case "DELETE":
      deleteMovies(req, res);
      break;
    default:
      res.statusCode = 404;
      res.end();
  }
});

const port = 5001;

server.listen(port, () => {
  console.log(`server is working ${port}, hooraaay!`);
});
