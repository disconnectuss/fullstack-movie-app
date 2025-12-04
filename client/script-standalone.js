const INITIAL_MOVIES_DATA = {
  movies: [
    {
      id: 1,
      title: "Inception",
      year: 2006,
      genre: ["Adventure", "Drama", "Sci-Fi"],
      rating: 7.0,
      director: "David Fincher",
      actors: ["Johnny Depp", "Matt Damon", "Jack Nicholson"],
      poster: "https://image.tmdb.org/t/p/w500/sample_poster_0.jpg",
      description: "A captivating story of Inception, featuring an incredible cast.",
      trailer: "https://www.youtube.com/watch?v=sample_trailer_0"
    },
    {
      id: 2,
      title: "The Dark Knight",
      year: 2011,
      genre: ["Superhero", "Action"],
      rating: 7.6,
      director: "Peter Jackson",
      actors: ["Christian Bale", "Heath Ledger", "Gary Oldman"],
      poster: "https://image.tmdb.org/t/p/w500/sample_poster_1.jpg",
      description: "A captivating story of The Dark Knight, featuring an incredible cast.",
      trailer: "https://www.youtube.com/watch?v=sample_trailer_1"
    },
    {
      id: 3,
      title: "Interstellar",
      year: 2001,
      genre: ["Romance", "Drama"],
      rating: 8.2,
      director: "Alfred Hitchcock",
      actors: ["Will Smith", "Denzel Washington", "Samuel L. Jackson"],
      poster: "https://image.tmdb.org/t/p/w500/sample_poster_2.jpg",
      description: "A captivating story of Interstellar, featuring an incredible cast.",
      trailer: "https://www.youtube.com/watch?v=sample_trailer_2"
    },
    {
      id: 4,
      title: "Avengers: Endgame",
      year: 1993,
      genre: ["Crime", "Drama"],
      rating: 8.8,
      director: "Coen Brothers",
      actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      poster: "https://image.tmdb.org/t/p/w500/sample_poster_3.jpg",
      description: "A captivating story of Avengers: Endgame, featuring an incredible cast.",
      trailer: "https://www.youtube.com/watch?v=sample_trailer_3"
    },
    {
      id: 5,
      title: "The Matrix",
      year: 2005,
      genre: ["Action", "Sci-Fi", "Thriller"],
      rating: 6.6,
      director: "Martin Scorsese",
      actors: ["Will Smith", "Denzel Washington", "Samuel L. Jackson"],
      poster: "https://image.tmdb.org/t/p/w500/sample_poster_4.jpg",
      description: "A captivating story of The Matrix, featuring an incredible cast.",
      trailer: "https://www.youtube.com/watch?v=sample_trailer_4"
    },
    {
      id: 6,
      title: "Fight Club",
      year: 2013,
      genre: ["Superhero", "Action"],
      rating: 6.5,
      director: "Peter Jackson",
      actors: ["Johnny Depp", "Matt Damon", "Jack Nicholson"],
      poster: "https://image.tmdb.org/t/p/w500/sample_poster_5.jpg",
      description: "A captivating story of Fight Club, featuring an incredible cast.",
      trailer: "https://www.youtube.com/watch?v=sample_trailer_5"
    },
    {
      id: 7,
      title: "Pulp Fiction",
      year: 2007,
      genre: ["Animation", "Family"],
      rating: 7.6,
      director: "Martin Scorsese",
      actors: ["Gal Gadot", "Henry Cavill", "Ben Affleck"],
      poster: "https://image.tmdb.org/t/p/w500/sample_poster_6.jpg",
      description: "A captivating story of Pulp Fiction, featuring an incredible cast.",
      trailer: "https://www.youtube.com/watch?v=sample_trailer_6"
    },
    {
      id: 8,
      title: "Forrest Gump",
      year: 2001,
      genre: ["War", "Drama"],
      rating: 7.8,
      director: "Martin Scorsese",
      actors: ["Christian Bale", "Heath Ledger", "Gary Oldman"],
      poster: "https://image.tmdb.org/t/p/w500/sample_poster_7.jpg",
      description: "A captivating story of Forrest Gump, featuring an incredible cast.",
      trailer: "https://www.youtube.com/watch?v=sample_trailer_7"
    },
    {
      id: 9,
      title: "The Shawshank Redemption",
      year: 2002,
      genre: ["Action", "Sci-Fi", "Thriller"],
      rating: 6.9,
      director: "Quentin Tarantino",
      actors: ["Johnny Depp", "Matt Damon", "Jack Nicholson"],
      poster: "https://image.tmdb.org/t/p/w500/sample_poster_8.jpg",
      description: "A captivating story of The Shawshank Redemption, featuring an incredible cast.",
      trailer: "https://www.youtube.com/watch?v=sample_trailer_8"
    },
    {
      id: 10,
      title: "The Godfather",
      year: 2013,
      genre: ["History", "Drama"],
      rating: 8.3,
      director: "Francis Ford Coppola",
      actors: ["Tom Hanks", "Morgan Freeman", "Robin Williams"],
      poster: "https://image.tmdb.org/t/p/w500/sample_poster_9.jpg",
      description: "A captivating story of The Godfather, featuring an incredible cast.",
      trailer: "https://www.youtube.com/watch?v=sample_trailer_9"
    }
    // ... (50 film var, kısalık için 10 tanesini gösterdim)
    // Diğer 40 film verisini de aynı şekilde ekleyebilirsiniz
  ]
};

// ==================== LOCALSTORAGE ANAHTARI ====================

// LocalStorage'da film verisi için kullanılacak anahtar
const STORAGE_KEY = "moviedb_movies";

// ==================== GLOBAL DEĞİŞKENLER ====================

// Tüm filmleri tutacak dizi
let allMovies = [];

// HTML element referansları
const moviesGrid = document.getElementById("moviesGrid");
const addMovieForm = document.getElementById("addMovieForm");
const searchInput = document.getElementById("searchInput");
const movieCount = document.getElementById("movieCount");
const resetDataBtn = document.getElementById("resetDataBtn");

// ==================== LOCALSTORAGE YÖNETİMİ ====================

/**
 * LocalStorage'dan film verilerini okur
 * @returns {Array} Film dizisi
 */
function loadMoviesFromStorage() {
  try {
    // localStorage.getItem(): Belirtilen anahtarla veriyi okur
    const stored = localStorage.getItem(STORAGE_KEY);

    // Eğer localStorage'da veri varsa parse et ve döndür
    if (stored) {
      return JSON.parse(stored);
    }

    // Veri yoksa başlangıç verisini döndür
    return INITIAL_MOVIES_DATA.movies;
  } catch (error) {
    // Hata durumunda başlangıç verisini döndür
    console.error("LocalStorage okuma hatası:", error);
    return INITIAL_MOVIES_DATA.movies;
  }
}

/**
 * Film verilerini localStorage'a kaydeder
 * @param {Array} movies - Kaydedilecek film dizisi
 */
function saveMoviesToStorage(movies) {
  try {
    // localStorage.setItem(): Veriyi string formatında kaydeder
    // JSON.stringify(): JavaScript objesini JSON string'e çevirir
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    // Hata durumunda kullanıcıya bilgi ver
    console.error("LocalStorage kaydetme hatası:", error);
    alert("⚠️ Veriler kaydedilemedi. Tarayıcınızın localStorage özelliği kapalı olabilir.");
  }
}

/**
 * Tüm verileri sıfırlayıp başlangıç verisine döner
 */
function resetToInitialData() {
  // Kullanıcıdan onay al
  if (!confirm("Tüm değişiklikler silinecek ve başlangıç verilerine dönülecek. Emin misiniz?")) {
    return;
  }

  try {
    // localStorage'daki veriyi sil
    localStorage.removeItem(STORAGE_KEY);

    // Başlangıç verisini yükle
    allMovies = INITIAL_MOVIES_DATA.movies;

    // localStorage'a kaydet
    saveMoviesToStorage(allMovies);

    // Ekranı güncelle
    displayMovies(allMovies);
    updateMovieCount(allMovies.length);

    // Kullanıcıya bilgi ver
    alert("✅ Veriler başarıyla sıfırlandı!");
  } catch (error) {
    console.error("Sıfırlama hatası:", error);
    alert("❌ Veriler sıfırlanırken hata oluştu.");
  }
}

// ==================== SAYFA YÜKLENDİĞİNDE ÇALIŞ ====================

// DOMContentLoaded eventi: HTML tamamen yüklendiğinde çalışır
document.addEventListener("DOMContentLoaded", () => {
  // LocalStorage'dan filmleri yükle
  allMovies = loadMoviesFromStorage();

  // İlk kez yükleniyorsa localStorage'a kaydet
  if (!localStorage.getItem(STORAGE_KEY)) {
    saveMoviesToStorage(allMovies);
  }

  // Filmleri ekrana yaz
  displayMovies(allMovies);
  updateMovieCount(allMovies.length);

  // Form submit event listener'ı ekle
  addMovieForm.addEventListener("submit", handleAddMovie);

  // Arama input event listener'ı ekle
  searchInput.addEventListener("input", handleSearch);

  // Sıfırlama butonu event listener'ı ekle
  resetDataBtn.addEventListener("click", resetToInitialData);

  // Konsola bilgi mesajı
  console.log("🎬 Film Veritabanı yüklendi (Standalone Mode)");
  console.log(`📊 Toplam ${allMovies.length} film yüklendi`);
  console.log("💾 Veriler localStorage'da saklanıyor");
});

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
              ? movie.genre.map((g) => `<span class="genre-tag">${g}</span>`).join("")
              : movie.genre.split(",").map((g) => `<span class="genre-tag">${g.trim()}</span>`).join("")
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
              ? movie.actors.join(", ")
              : movie.actors
          }
        </div>

        <!-- Açıklama -->
        <p class="movie-description">
          ${movie.description}
        </p>

        <!-- Aksiyon butonları -->
        <div class="movie-actions">
          ${
            movie.trailer
              ? `
            <button class="btn btn-primary" onclick="window.open('${movie.trailer}', '_blank')">
              🎥 Fragman
            </button>
          `
              : ""
          }
          <!-- Silme butonu -->
          <button class="btn btn-danger" onclick="deleteMovie(${movie.id})">
            🗑️ Sil
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// ==================== YENİ FİLM EKLEME FONKSİYONU ====================

/**
 * Form submit edildiğinde çalışır, yeni film ekler
 * @param {Event} e - Form submit event'i
 */
function handleAddMovie(e) {
  // Formun varsayılan submit davranışını engelle
  e.preventDefault();

  // FormData objesi oluştur
  const formData = new FormData(e.target);

  // Yeni film için ID oluştur (mevcut en büyük ID + 1)
  const newId =
    allMovies.length > 0
      ? Math.max(...allMovies.map((m) => m.id)) + 1
      : 1;

  // Form verilerinden yeni film objesi oluştur
  const newMovie = {
    id: newId,
    title: formData.get("title"),
    year: parseInt(formData.get("year")),
    director: formData.get("director"),
    rating: parseFloat(formData.get("rating")),
    genre: formData
      .get("genre")
      .split(",")
      .map((g) => g.trim()),
    actors: formData
      .get("actors")
      .split(",")
      .map((a) => a.trim()),
    description: formData.get("description"),
    poster: formData.get("poster") || "https://via.placeholder.com/300x400",
    trailer: formData.get("trailer") || "",
  };

  // Yeni filmi diziye ekle
  allMovies.push(newMovie);

  // LocalStorage'a kaydet
  saveMoviesToStorage(allMovies);

  // Kullanıcıya başarı mesajı göster
  alert("✅ Film başarıyla eklendi!");

  // Formu temizle
  e.target.reset();

  // Ekranı güncelle
  displayMovies(allMovies);
  updateMovieCount(allMovies.length);
}

// ==================== FİLM SİLME FONKSİYONU ====================

/**
 * Belirtilen ID'ye sahip filmi siler
 * @param {number} id - Silinecek filmin ID'si
 */
function deleteMovie(id) {
  // Kullanıcıdan onay al
  if (!confirm("Bu filmi silmek istediğinize emin misiniz?")) {
    return;
  }

  // Filmi diziden çıkar
  // filter(): Koşula uyan elemanları yeni diziye ekler
  allMovies = allMovies.filter((movie) => movie.id !== id);

  // LocalStorage'a kaydet
  saveMoviesToStorage(allMovies);

  // Kullanıcıya başarı mesajı göster
  alert("✅ Film başarıyla silindi!");

  // Ekranı güncelle
  displayMovies(allMovies);
  updateMovieCount(allMovies.length);
}

// ==================== ARAMA FONKSİYONU ====================

/**
 * Arama input'una her yazıldığında çalışır, filmleri filtreler
 */
function handleSearch() {
  // Input değerini al ve küçük harfe çevir
  const searchTerm = searchInput.value.toLowerCase();

  // Eğer arama boşsa tüm filmleri göster
  if (searchTerm === "") {
    displayMovies(allMovies);
    updateMovieCount(allMovies.length);
    return;
  }

  // Filmleri filtrele
  const filteredMovies = allMovies.filter((movie) => {
    // Film başlığında ara
    const titleMatch = movie.title.toLowerCase().includes(searchTerm);

    // Yönetmen adında ara
    const directorMatch = movie.director.toLowerCase().includes(searchTerm);

    // Oyuncular dizisinde ara
    const actorsMatch = Array.isArray(movie.actors)
      ? movie.actors.some((actor) => actor.toLowerCase().includes(searchTerm))
      : movie.actors.toLowerCase().includes(searchTerm);

    // Tür dizisinde ara
    const genreMatch = Array.isArray(movie.genre)
      ? movie.genre.some((g) => g.toLowerCase().includes(searchTerm))
      : movie.genre.toLowerCase().includes(searchTerm);

    // Herhangi biri eşleşirse filmi göster
    return titleMatch || directorMatch || actorsMatch || genreMatch;
  });

  // Filtrelenmiş filmleri göster
  displayMovies(filteredMovies);
  updateMovieCount(filteredMovies.length);
}

// ==================== FİLM SAYISINI GÜNCELLEME ====================

/**
 * Film sayısı badge'ini günceller
 * @param {number} count - Gösterilecek film sayısı
 */
function updateMovieCount(count) {
  movieCount.textContent = `${count} film`;
}

// ==================== CONSOLE MESAJI ====================

console.log("%c🎬 Film Veritabanı - Standalone Mode", "color: #667eea; font-size: 20px; font-weight: bold;");
console.log("%cBackend Gerektirmez - LocalStorage Kullanır", "color: #764ba2; font-size: 14px;");
console.log("%c💾 Verileriniz tarayıcınızda saklanıyor", "color: #666;");
