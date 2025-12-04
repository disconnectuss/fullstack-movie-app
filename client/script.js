const API_BASE_URL = "http://localhost:5001";
const API_ENDPOINTS = {
  movies: `${API_BASE_URL}/moviedb/movies`, // Tüm filmler
  movieById: (id) => `${API_BASE_URL}/moviedb/movies/${id}`, // ID'ye göre film
};
let allMovies = [];
const moviesGrid = document.getElementById("moviesGrid");
const addMovieForm = document.getElementById("addMovieForm");
const searchInput = document.getElementById("searchInput");
const movieCount = document.getElementById("movieCount");
document.addEventListener("DOMContentLoaded", () => {
  // Filmleri yükle
  fetchMovies();
  // Form submit event listener'ı ekle
  addMovieForm.addEventListener("submit", handleAddMovie);
  // Arama input event listener'ı ekle
  // 'input' eventi: Her karakter yazıldığında tetiklenir
  searchInput.addEventListener("input", handleSearch);
});
// ==================== FİLMLERİ GETİRME FONKSİYONU ====================
/**
 * Backend'den tüm filmleri getirir ve ekrana yazar
 */
async function fetchMovies() {
  try {
    // Yükleniyor mesajı göster
    moviesGrid.innerHTML = '<div class="loading">Filmler yükleniyor...</div>';
    // fetch() ile backend API'ye GET isteği atıyoruz
    // await: Promise'in tamamlanmasını bekler
    const response = await fetch(API_ENDPOINTS.movies);
    // Response başarısız ise (404, 500 vb.) hata fırlat
    if (!response.ok) {
      throw new Error("Filmler yüklenemedi");
    }
    // Response body'sini JSON olarak parse et
    const data = await response.json();
    // Global movies dizisine filmleri kaydet
    allMovies = data.movies;
    // Filmleri ekrana çiz
    displayMovies(allMovies);
    // Film sayısını güncelle
    updateMovieCount(allMovies.length);
  } catch (error) {
    // Hata durumunda kullanıcıya mesaj göster
    console.error("Hata:", error);
    moviesGrid.innerHTML = `
      <div class="loading" style="color: #dc3545;">
        ❌ Filmler yüklenirken hata oluştu: ${error.message}
      </div>
    `;
  }
}
// ==================== FİLMLERİ EKRANA YAZMA FONKSİYONU ====================
/**
 * Film dizisini alıp HTML kartları oluşturur ve ekrana yazar
 * @param {Array} movies - Gösterilecek film dizisi
 */
function displayMovies(movies) {
  // Eğer film yoksa boş mesajı göster
  if (movies.length === 0) {
    moviesGrid.innerHTML = `
      <div class="loading">
        😔 Gösterilecek film bulunamadı.
      </div>
    `;
    return;
  }
  // Her film için HTML kartı oluştur
  // map(): Her elemanı dönüştürüp yeni dizi döndürür
  // join(''): Dizi elemanlarını birleştirip tek string yapar
  moviesGrid.innerHTML = movies
    .map(
      (movie) => `
    <div class="movie-card" data-id="${movie.id}">
      <!-- Film posteri -->
      <img
        src="${movie.poster || "https://via.placeholder.com/300x400?text=No+Poster"}"
        alt="${movie.title}"
        onerror="this.src='https://via.placeholder.com/300x400?text=No+Poster'"
      />
      <!-- Film içeriği -->
      <div class="movie-card-content">
        <!-- Film başlığı -->
        <h3>${movie.title}</h3>
        <!-- Yıl ve yönetmen -->
        <div class="movie-detail">
          <strong>📅 Yıl:</strong> ${movie.year}
        </div>
        <div class="movie-detail">
          <strong>🎬 Yönetmen:</strong> ${movie.director}
        </div>
        <!-- Tür etiketleri -->
        <div class="movie-genres">
          ${
            // Array.isArray(): Değişkenin dizi olup olmadığını kontrol eder
            Array.isArray(movie.genre)
              ? // Eğer dizi ise her türü etiket yap
                movie.genre.map((g) => `<span class="genre-tag">${g}</span>`).join("")
              : // Değilse string'i virgülden böl ve etiket yap
                movie.genre.split(",").map((g) => `<span class="genre-tag">${g.trim()}</span>`).join("")
          }
        </div>
        <!-- Puan -->
        <div class="movie-rating">
          ⭐ ${movie.rating}/10
        </div>
        <!-- Oyuncular -->
        <div class="movie-detail">
          <strong>🎭 Oyuncular:</strong>
          ${
            Array.isArray(movie.actors)
              ? movie.actors.join(", ") // Dizi ise virgülle birleştir
              : movie.actors // String ise olduğu gibi kullan
          }
        </div>
        <!-- Açıklama -->
        <p class="movie-description">
          ${movie.description}
        </p>
        <!-- Aksiyon butonları -->
        <div class="movie-actions">
          ${
            // Eğer trailer URL'i varsa trailer butonunu göster
            movie.trailer
              ? `
            <button class="btn btn-primary" onclick="window.open('${movie.trailer}', '_blank')">
              🎥 Fragman
            </button>
          `
              : ""
          }
          <!-- Silme butonu - onclick ile deleteMovie fonksiyonunu çağır -->
          <button class="btn btn-danger" onclick="deleteMovie(${movie.id})">
            🗑️ Sil
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join(""); // Tüm kartları tek string'e birleştir
}
// ==================== YENİ FİLM EKLEME FONKSİYONU ====================
/**
 * Form submit edildiğinde çalışır, yeni film ekler
 * @param {Event} e - Form submit event'i
 */
async function handleAddMovie(e) {
  // Formun varsayılan submit davranışını engelle (sayfa yenilenmesini önler)
  e.preventDefault();
  // FormData objesi oluştur - form verilerini otomatik toplar
  const formData = new FormData(e.target);
  // Form verilerinden yeni film objesi oluştur
  const newMovie = {
    title: formData.get("title"), // Film adı
    year: parseInt(formData.get("year")), // Yıl (string'den number'a çevir)
    director: formData.get("director"), // Yönetmen
    rating: parseFloat(formData.get("rating")), // Puan (float'a çevir)
    // Genre ve actors string'leri virgülden böl, trim ile boşlukları temizle
    genre: formData
      .get("genre")
      .split(",")
      .map((g) => g.trim()),
    actors: formData
      .get("actors")
      .split(",")
      .map((a) => a.trim()),
    description: formData.get("description"), // Açıklama
    poster: formData.get("poster") || "https://via.placeholder.com/300x400", // Poster URL (yoksa placeholder)
    trailer: formData.get("trailer") || "", // Trailer URL (opsiyonel)
  };
  try {
    // Backend'e POST isteği at
    const response = await fetch(API_ENDPOINTS.movies, {
      method: "POST", // HTTP metodu
      headers: {
        "Content-Type": "application/json", // JSON gönderiyoruz
      },
      body: JSON.stringify(newMovie), // JavaScript objesini JSON string'e çevir
    });
    // Response kontrolü
    if (!response.ok) {
      throw new Error("Film eklenemedi");
    }
    // Başarılı response'u parse et
    const data = await response.json();
    // Kullanıcıya başarı mesajı göster
    alert("✅ Film başarıyla eklendi!");
    // Formu temizle
    e.target.reset();
    // Film listesini yeniden yükle
    fetchMovies();
  } catch (error) {
    // Hata durumunda kullanıcıya mesaj göster
    console.error("Hata:", error);
    alert("❌ Film eklenirken hata oluştu: " + error.message);
  }
}
// ==================== FİLM SİLME FONKSİYONU ====================
/**
 * Belirtilen ID'ye sahip filmi siler
 * @param {number} id - Silinecek filmin ID'si
 */
async function deleteMovie(id) {
  // Kullanıcıdan onay al
  // confirm(): Tarayıcı popup'ı gösterir, OK=true, Cancel=false döner
  if (!confirm("Bu filmi silmek istediğinize emin misiniz?")) {
    return; // İptal edilirse fonksiyondan çık
  }
  try {
    // Backend'e DELETE isteği at
    const response = await fetch(API_ENDPOINTS.movieById(id), {
      method: "DELETE", // HTTP metodu
    });
    // Response kontrolü
    if (!response.ok) {
      throw new Error("Film silinemedi");
    }
    // Başarılı response'u parse et
    const data = await response.json();
    // Kullanıcıya başarı mesajı göster
    alert("✅ Film başarıyla silindi!");
    // Film listesini yeniden yükle
    fetchMovies();
  } catch (error) {
    // Hata durumunda kullanıcıya mesaj göster
    console.error("Hata:", error);
    alert("❌ Film silinirken hata oluştu: " + error.message);
  }
}
// ==================== ARAMA FONKSİYONU ====================
/**
 * Arama input'una her yazıldığında çalışır, filmleri filtreler
 */
function handleSearch() {
  // Input değerini al ve küçük harfe çevir (case-insensitive arama için)
  const searchTerm = searchInput.value.toLowerCase();
  // Eğer arama boşsa tüm filmleri göster
  if (searchTerm === "") {
    displayMovies(allMovies);
    updateMovieCount(allMovies.length);
    return;
  }
  // Filmleri filtrele
  // filter(): Koşula uyan elemanları yeni diziye ekler
  const filteredMovies = allMovies.filter((movie) => {
    // Film başlığında ara
    const titleMatch = movie.title.toLowerCase().includes(searchTerm);
    // Yönetmen adında ara
    const directorMatch = movie.director.toLowerCase().includes(searchTerm);
    // Oyuncular dizisinde ara
    const actorsMatch = Array.isArray(movie.actors)
      ? movie.actors.some(
          (actor) => actor.toLowerCase().includes(searchTerm) // some(): En az bir eleman koşulu sağlarsa true
        )
      : movie.actors.toLowerCase().includes(searchTerm);
    // Tür dizisinde ara
    const genreMatch = Array.isArray(movie.genre)
      ? movie.genre.some((g) => g.toLowerCase().includes(searchTerm))
      : movie.genre.toLowerCase().includes(searchTerm);
    // Herhangi biri eşleşirse filmi göster
    // ||: VEYA operatörü - herhangi biri true ise true döner
    return titleMatch || directorMatch || actorsMatch || genreMatch;
  });
  // Filtrelenmiş filmleri göster
  displayMovies(filteredMovies);
  // Film sayısını güncelle
  updateMovieCount(filteredMovies.length);
}
// ==================== FİLM SAYISINI GÜNCELLEME ====================
/**
 * Film sayısı badge'ini günceller
 * @param {number} count - Gösterilecek film sayısı
 */
function updateMovieCount(count) {
  // Template literal kullanarak string oluştur
  // Tekil/çoğul kontrolü yap
  movieCount.textContent = `${count} ${count === 1 ? "film" : "film"}`;
}
// ==================== YARDIMCI FONKSİYONLAR ====================
/**
 * Belirli bir ID'ye sahip filmi getirir (kullanılmıyor ama örnek olarak ekledim)
 * @param {number} id - Film ID'si
 * @returns {Promise<Object>} Film objesi
 */
async function getMovieById(id) {
  try {
    const response = await fetch(API_ENDPOINTS.movieById(id));
    if (!response.ok) {
      throw new Error("Film bulunamadı");
    }
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
}
// ==================== CONSOLE MESAJI ====================
// Geliştirici konsolu için bilgi mesajı
console.log("%c🎬 Film Veritabanı Uygulaması", "color: #667eea; font-size: 20px; font-weight: bold;");
console.log("%cNode.js Fullstack Practice Project", "color: #764ba2; font-size: 14px;");
console.log("%cAPI Endpoint: " + API_BASE_URL, "color: #666;");
