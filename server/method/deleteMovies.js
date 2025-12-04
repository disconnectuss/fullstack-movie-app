// fs modülünü içe aktarıyoruz - dosya okuma/yazma işlemleri için gerekli
const fs = require("fs");

// Film silme fonksiyonunu tanımlıyoruz
const deleteMovies = (req, res) => {
  // URL'den film ID'sini alıyoruz
  // Örnek: /moviedb/movies/5 → ["", "moviedb", "movies", "5"]
  const id = req.url.split("/")[3];

  // ID kontrolü - ID yoksa hata döndür
  if (!id) {
    res.statusCode = 400; // Bad Request
    res.end(JSON.stringify({ error: "Film ID'si gereklidir" }));
    return; // Fonksiyondan çık
  }

  try {
    // Mevcut film verisini okuyup parse ediyoruz
    const data = fs.readFileSync("./data/movie_data.json", "utf-8");
    const moviesData = JSON.parse(data);

    // Silinecek filmin index'ini buluyoruz
    // findIndex(): Koşula uyan ilk elemanın index'ini döndürür
    const movieIndex = moviesData.movies.findIndex(
      (m) => m.id === parseInt(id) // String ID'yi number'a çevirip karşılaştır
    );

    // Film bulunamadıysa 404 hatası döndür
    if (movieIndex === -1) {
      res.statusCode = 404; // Not Found
      res.end(JSON.stringify({ error: "Silinecek film bulunamadı" }));
      return;
    }

    // Silinen filmin bilgisini saklıyoruz (response'da göndermek için)
    const deletedMovie = moviesData.movies[movieIndex];

    // splice metodu ile filmi diziden çıkarıyoruz
    // splice(başlangıç_index, kaç_tane_silinecek)
    moviesData.movies.splice(movieIndex, 1);

    // Güncellenmiş veriyi JSON dosyasına yazıyoruz
    // JSON.stringify(data, replacer, space)
    // - data: Yazılacak veri
    // - null: Replacer yok
    // - 2: Her seviye için 2 boşluk girinti (güzel formatlanmış görünüm)
    fs.writeFileSync(
      "./data/movie_data.json",
      JSON.stringify(moviesData, null, 2)
    );

    // Başarılı response döndürüyoruz
    res.statusCode = 200; // OK
    res.end(
      JSON.stringify({
        message: "Film başarıyla silindi",
        deletedMovie: deletedMovie, // Silinen filmin bilgilerini de gönderiyoruz
      })
    );
  } catch (error) {
    // Hata durumunda (dosya okuma hatası, JSON parse hatası vb.) 500 hatası döndürüyoruz
    res.statusCode = 500; // Internal Server Error
    res.end(
      JSON.stringify({
        error: "Film silinirken hata oluştu",
        details: error.message, // Hata detayını gönderiyoruz
      })
    );
  }
};

// Fonksiyonu dışa aktarıyoruz - başka dosyalarda kullanabilmek için
module.exports = deleteMovies;