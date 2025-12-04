# 🎬 Film Veritabanı - Fullstack Movie App

Node.js ile yapılmış basit bir fullstack film yönetim uygulaması. Bu proje Node.js pratik yapmak için hazırlanmıştır ve iki farklı şekilde çalıştırılabilir.

## 📁 Proje Yapısı

```
fullstack-movie-app/
├── server/
│   ├── method/
│   │   ├── getMovies.js      # Film getirme işlemleri
│   │   ├── postMovies.js     # Film ekleme işlemleri
│   │   └── deleteMovies.js   # Film silme işlemleri
│   ├── data/
│   │   └── movie_data.json   # 50 film verisi
│   ├── server.js             # HTTP sunucusu
│   └── package.json
└── client/
    ├── index.html                  # Backend'li versiyon HTML
    ├── index-standalone.html       # Standalone versiyon HTML
    ├── script.js                   # Backend'li versiyon JS
    ├── script-standalone.js        # Standalone versiyon JS (LocalStorage)
    ├── style.css                   # Ortak CSS dosyası
    └── movie_data.json             # Film verileri
```

## 🚀 Kullanım Seçenekleri

### Seçenek 1: Backend'li Versiyon (Fullstack)

Backend sunucusu çalıştırarak API ile haberleşir.

**Avantajları:**
- ✅ Gerçek bir fullstack deneyim
- ✅ Veriler sunucuda (JSON dosyasında) saklanır
- ✅ API endpoint'leri öğrenirsiniz
- ✅ HTTP metodları (GET, POST, DELETE) pratiği

**Nasıl Çalıştırılır:**

1. **Backend'i Başlat:**
   ```bash
   cd server
   npm start
   ```
   Sunucu `http://localhost:5001` adresinde çalışmaya başlayacak.

2. **Frontend'i Aç:**
   - `client/index.html` dosyasını tarayıcınızda açın
   - Veya VS Code Live Server kullanın

**API Endpoint'leri:**
- `GET /moviedb/movies` - Tüm filmleri listele
- `GET /moviedb/movies/:id` - ID'ye göre film detayı
- `POST /moviedb/movies` - Yeni film ekle
- `DELETE /moviedb/movies/:id` - Film sil

---

### Seçenek 2: Standalone Versiyon (Sadece Frontend)

Backend'e ihtiyaç duymaz, tarayıcının localStorage'ını kullanır.

**Avantajları:**
- ✅ Backend gerektirmez
- ✅ Sunucu kurulumuna gerek yok
- ✅ Doğrudan HTML dosyasını açarak çalışır
- ✅ Veriler tarayıcıda saklanır (localStorage)

**Nasıl Çalıştırılır:**

1. **Doğrudan Aç:**
   - `client/index-standalone.html` dosyasına çift tıklayın
   - Veya tarayıcıya sürükleyip bırakın

2. **Veriler Nasıl Saklanır:**
   - İlk açılışta 50 film verisi otomatik yüklenir
   - Eklediğiniz veya sildiğiniz filmler tarayıcınızda (localStorage) saklanır
   - Tarayıcı verilerini temizlerseniz, veriler sıfırlanır
   - "Verileri Sıfırla" butonuyla başlangıç verilerine dönebilirsiniz

---

## ✨ Özellikler

### 🎯 Film İşlemleri
- ✅ Film listeleme (grid görünüm)
- ✅ Yeni film ekleme
- ✅ Film silme
- ✅ Film detayları görüntüleme

### 🔍 Arama ve Filtreleme
- ✅ Canlı arama (başlık, yönetmen, oyuncu, tür)
- ✅ Anlık sonuç gösterimi
- ✅ Film sayısı göstergesi

### 🎨 Arayüz
- ✅ Modern ve şık tasarım
- ✅ Responsive (mobil uyumlu)
- ✅ Gradient renkler
- ✅ Hover efektleri
- ✅ Film kartları
- ✅ Poster görselleri

### 📊 Veri Yönetimi
- **Backend'li:** JSON dosyasında kalıcı depolama
- **Standalone:** LocalStorage ile tarayıcıda depolama

---

## 🛠️ Teknolojiler

### Backend (Seçenek 1)
- **Node.js** - Runtime environment
- **http** modülü - HTTP sunucusu
- **fs** modülü - Dosya okuma/yazma
- **nodemon** - Otomatik sunucu yeniden başlatma

### Frontend (Her İki Seçenek)
- **HTML5** - Yapı
- **CSS3** - Stil (Grid, Flexbox, Responsive)
- **Vanilla JavaScript** - İşlevsellik
- **LocalStorage API** - Standalone versiyonda veri saklama
- **Fetch API** - Backend'li versiyonda API istekleri

---

## 📚 Öğrenilen Konular

### Backend
- ✅ HTTP sunucusu oluşturma
- ✅ REST API endpoint'leri
- ✅ HTTP metodları (GET, POST, DELETE)
- ✅ CORS yapılandırması
- ✅ JSON parse/stringify
- ✅ Dosya okuma/yazma (fs modülü)
- ✅ Request/Response döngüsü
- ✅ Event-driven programming

### Frontend
- ✅ DOM manipülasyonu
- ✅ Event listeners
- ✅ Fetch API / Asenkron işlemler
- ✅ async/await
- ✅ LocalStorage kullanımı
- ✅ Array metodları (map, filter, find, some)
- ✅ Template literals
- ✅ FormData API
- ✅ Responsive CSS
- ✅ CSS Grid ve Flexbox

---

## 🎓 Hangi Versiyonu Kullanmalıyım?

### Backend'li Versiyon Kullan Eğer:
- ✅ Fullstack geliştirme öğrenmek istiyorsanız
- ✅ API ve HTTP metodları pratiği yapmak istiyorsanız
- ✅ Sunucu tarafı programlama öğrenmek istiyorsanız
- ✅ Gerçek bir web uygulaması yapıyorsanız

### Standalone Versiyon Kullan Eğer:
- ✅ Sadece frontend pratiği yapmak istiyorsanız
- ✅ Sunucu kurmak istemiyorsanız
- ✅ Hızlıca bir şeyler denemek istiyorsanız
- ✅ LocalStorage kullanımını öğrenmek istiyorsanız

---

## 🐛 Yaygın Sorunlar ve Çözümler

### Backend'li Versiyon

**Sorun:** Filmler yüklenmiyor
- ✅ Sunucunun çalıştığından emin olun (`npm start`)
- ✅ Konsolda hata mesajlarını kontrol edin
- ✅ CORS hatası varsa server.js'deki CORS ayarlarını kontrol edin

**Sorun:** Port zaten kullanımda
- ✅ `server.js` dosyasındaki port numarasını değiştirin (örn: 5001 → 5002)
- ✅ Diğer Node.js süreçlerini kapatın

### Standalone Versiyon

**Sorun:** Eklediğim filmler kayboldu
- ✅ Tarayıcı verilerini temizlediyseniz localStorage da silinir
- ✅ "Verileri Sıfırla" butonuna basmış olabilirsiniz
- ✅ Gizli modda tarayıcı kullanıyorsanız veriler kalıcı olmaz

**Sorun:** LocalStorage çalışmıyor
- ✅ Tarayıcınızın localStorage'ı desteklediğinden emin olun
- ✅ Tarayıcı ayarlarından localStorage'ın kapalı olup olmadığını kontrol edin

---

## 📝 Notlar

- Tüm kodlar detaylı Türkçe yorumlarla açıklanmıştır
- Başlangıçta 50 örnek film verisi mevcuttur
- Film posterleri placeholder görsellerdir
- Trailer linkleri örnek URL'lerdir
- Gerçek bir projede veritabanı (MongoDB, PostgreSQL vb.) kullanılmalıdır

---

## 🎯 Proje Geliştirme Önerileri

Projeyi geliştirmek isterseniz şunları ekleyebilirsiniz:

1. **Film Güncelleme (PUT/PATCH)** - Var olan filmleri düzenleme
2. **Sıralama** - Puana, yıla göre sıralama
3. **Filtreleme** - Türe, yıla göre filtreleme
4. **Sayfalama** - Çok sayıda film için pagination
5. **Favoriler** - Favori filmler listesi
6. **Detay Sayfası** - Filmlerin ayrı detay sayfası
7. **Veritabanı** - MongoDB veya PostgreSQL entegrasyonu
8. **Kimlik Doğrulama** - Kullanıcı girişi
9. **Gerçek API** - TMDb veya OMDb API entegrasyonu
10. **Upload** - Kendi poster görseli yükleme

---

## 📞 İletişim

Bu proje Node.js pratik yapmak için hazırlanmıştır.

**İyi Kodlamalar! 🚀**
