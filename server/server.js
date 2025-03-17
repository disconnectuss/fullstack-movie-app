const http = require("http");
const getMovies = require("./method/getMovies");
const postMovies = require("./method/postMovies");
const deleteMovies = require("./method/deleteMovies");

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      return res.end(getMovies(req, res));
    case "POST":
      return res.end(postMovies(req, res));
    case "DELETE":
      return res.end(deleteMovies(req, res));
    default:
      res.statusCode = 404;

      res.setHeader("Content-Type", "application/json");

      res.write(JSON.stringify({ messsage: "not found" }));
      return res.end();
  }
});

const port = 5001;

server.listen(port, () => {
  console.log(`server is working ${port}, hooraaay!`);
});
