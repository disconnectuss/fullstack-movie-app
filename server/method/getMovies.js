const fs = require("fs");

const getMovies = (req, res) => {
  // URL'den son "/" işaretine kadar olan kısmı alıyoruz (path için)
  const path = req.url.substring(0, req.url.lastIndexOf("/"));

  // URL'i "/" ile bölerek 4. elemanı alıyoruz (film ID'si için)
  // Örnek: /moviedb/movies/5 → ["", "moviedb", "movies", "5"]
  const id = req.url.split("/")[3];

  // Eğer istek "/moviedb/movies" ise, tüm filmleri döndür
  if (req.url === "/moviedb/movies") {
    // JSON dosyasını senkron olarak okuyoruz
    const movies = fs.readFileSync("./data/movie_data.json", "utf-8");
    // Response'u sonlandırıp JSON verisini gönderiyoruz
    res.end(movies);
    return;
  }

  // Eğer path "/moviedb/movies" ve ID varsa, belirli bir filmi döndür
  if (path === "/moviedb/movies" && id) {
    try {
      // JSON dosyasını okuyup parse ediyoruz
      const data = fs.readFileSync("./data/movie_data.json", "utf-8");
      const moviesData = JSON.parse(data);

      // ID'ye göre filmi buluyoruz (string ID'yi number'a çeviriyoruz)
      const movie = moviesData.movies.find((m) => m.id === parseInt(id));

      // Film bulunamazsa 404 hatası döndür
      if (!movie) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Film bulunamadı" }));
        return;
      }

      // Filmi JSON formatında döndür
      res.statusCode = 200;
      res.end(JSON.stringify(movie));
      return;
    } catch (error) {
      // Hata durumunda 500 hatası döndür
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Sunucu hatası" }));
      return;
    }
  }

  // Yukarıdaki koşulların hiçbiri sağlanmazsa 404 döndür
  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Sayfa bulunamadı" }));
};

// Fonksiyonu dışa aktarıyoruz
module.exports = getMovies;
