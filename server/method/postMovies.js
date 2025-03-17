
// Modify your postMovies.js to look like this:
const fs = require("fs");
const postMovies = (req, res) => {
  // Don't call res.end() right at the beginning
  
  // Handle your POST logic here
  
  // Only call res.end() once when you're ready to send the response
  let body = '';
  
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // Process your data...
      
      // Write to the file or whatever you need to do
      
      // Then end the response ONCE
      res.statusCode = 201;
      res.end(JSON.stringify({ message: 'Movie added successfully' }));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON data' }));
    }
  });
  
  // Don't call res.end() here at the end of the function
};

module.exports = postMovies;