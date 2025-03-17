const fs = require("fs");
const deleteMovies = (req, res) => {
  // Don't end the response immediately
  
  const id = req.url.split("/")[3];
  if (!id) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Movie ID is required" }));
    return; // Return after ending the response
  }
  
  try {
    // Your deletion logic here
    
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Movie deleted successfully" }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Failed to delete movie" }));
  }
};

module.exports = deleteMovies;