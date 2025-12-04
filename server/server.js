// Node.js'in http modülünü içe aktarıyoruz - HTTP sunucusu oluşturmak için
const http = require("http");

// Method klasöründeki fonksiyonları içe aktarıyoruz
const getMovies = require("./method/getMovies");
const postMovies = require("./method/postMovies");
const deleteMovies = require("./method/deleteMovies");

// HTTP sunucusu oluşturuyoruz
// Her istek geldiğinde bu callback fonksiyon çalışır
const server = http.createServer((req, res) => {
  // CORS (Cross-Origin Resource Sharing) başlıklarını ayarlıyoruz
  // Bu sayede frontend farklı bir portta çalışsa bile backend'e istek atabilir
  res.setHeader("Access-Control-Allow-Origin", "*"); // Tüm domainlerden gelen isteklere izin ver
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS"); // İzin verilen HTTP metodları
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // İzin verilen header'lar

  // Response formatını JSON olarak ayarlıyoruz
  res.setHeader("Content-Type", "application/json");

  // OPTIONS isteği için (Preflight request - tarayıcının güvenlik kontrolü)
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  // HTTP metoduna göre ilgili fonksiyonu çağırıyoruz
  switch (req.method) {
    case "GET":
      // Film listesi veya detay getirme
      getMovies(req, res);
      break;
    case "POST":
      // Yeni film ekleme
      postMovies(req, res);
      break;
    case "DELETE":
      // Film silme
      deleteMovies(req, res);
      break;
    default:
      // Desteklenmeyen metod için 404 döndür
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Metod desteklenmiyor" }));
  }
});

// Sunucunun dinleyeceği port numarası
const port = 5001;

// Sunucuyu başlatıyoruz
server.listen(port, () => {
  console.log(`🎬 Film sunucusu ${port} portunda çalışıyor!`);
  console.log(`📍 http://localhost:${port}/moviedb/movies`);
});
