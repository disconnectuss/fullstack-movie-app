// fs modülünü içe aktarıyoruz - dosya okuma/yazma işlemleri için gerekli
const fs = require("fs");

// Film ekleme fonksiyonunu tanımlıyoruz
const postMovies = (req, res) => {
  // POST isteğindeki veriyi tutacak değişken
  let body = "";

  // 'data' eventi: Request'ten gelen her veri parçasını (chunk) dinliyoruz
  // Veri büyük olabilir, bu yüzden parça parça gelir
  req.on("data", (chunk) => {
    // Gelen binary veriyi string'e çevirip body'e ekliyoruz
    body += chunk.toString();
  });

  // 'end' eventi: Tüm veri parçaları geldikten sonra çalışır
  req.on("end", () => {
    try {
      // Gelen JSON verisini JavaScript objesine çeviriyoruz
      const newMovie = JSON.parse(body);

      // Mevcut film verisini okuyoruz
      const data = fs.readFileSync("./data/movie_data.json", "utf-8");
      const moviesData = JSON.parse(data);

      // Yeni film için ID oluşturuyoruz (mevcut en büyük ID + 1)
      const newId =
        moviesData.movies.length > 0
          ? Math.max(...moviesData.movies.map((m) => m.id)) + 1
          : 1;

      // Yeni filme ID atıyoruz
      newMovie.id = newId;

      // Yeni filmi movies dizisine ekliyoruz
      moviesData.movies.push(newMovie);

      // Güncellenmiş veriyi JSON dosyasına yazıyoruz
      // JSON.stringify'ın 3. parametresi (2) güzel formatlanmış görünüm için
      fs.writeFileSync(
        "./data/movie_data.json",
        JSON.stringify(moviesData, null, 2)
      );

      // Başarılı response döndürüyoruz (201 = Created)
      res.statusCode = 201;
      res.end(
        JSON.stringify({
          message: "Film başarıyla eklendi",
          movie: newMovie,
        })
      );
    } catch (error) {
      // Hata durumunda (geçersiz JSON vb.) 400 hatası döndürüyoruz
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          error: "Geçersiz veri formatı",
          details: error.message,
        })
      );
    }
  });
};

// Fonksiyonu dışa aktarıyoruz
module.exports = postMovies;