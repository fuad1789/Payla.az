# Paylaş - İstifadə olunmayan geyim və əşyaların kirayə platforması

**Paylaş** platforması insanların istifadə etmədikləri geyim, aksesuar və digər əşyaları kirayə verə biləcəkləri modern və innovativ bir platformadır.

## 📋 Xüsusiyyətlər

- 🛍️ İstifadə olunmayan əşyaların kirayə verilməsi
- 🏷️ Kateqoriyalar üzrə filtrasiya
- ❤️ Elanları favoriləyə əlavə etmək (localStorage ilə)
- 👨‍💻 Admin paneli ilə elanların idarə edilməsi
- 📱 Tam responsiv dizayn
- 📊 Elanlar üçün baxış və əlaqə sayğacları
- 🆕 **Business Profiles**: Biznes profilləri əlavə etmək və idarə etmək
- 🆕 **Swipe funksionallığı**: Elanlar arasında swipe ilə naviqasiya
- 🆕 **SSR və RSC**: Next.js 14 App Router, React Server Components və SSR dəstəyi
- 🆕 **Yeni UI Kitabxanaları**: Shadcn UI, Radix UI, Tailwind CSS
- 🆕 **Error Handling**: error.tsx, not-found.tsx və global-error.tsx ilə server və client tərəfi xəta idarəetməsi
- 🆕 **Form Validasiyası**: Zod ilə tip təhlükəsiz form validasiyası
- 🆕 **Fayl Yükləmə və Şəkil Optimizasiyası**: WebP, lazy loading, Cloudinary inteqrasiyası
- 🆕 **Optimistik UI və real-time yeniləmələr**
- 🆕 **Supabase və ya digər backend inteqrasiyası üçün hazır struktur**
- 🆕 **Yeni komponentlər və səhifələr**: admin dashboard, business profiles, swipe-page, category-filter, favorite-button, faq, how-it-works və s.

## 🛠️ Texnologiyalar

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication
- Multer (şəkil yükləmək üçün)
- 🆕 Cloudinary (şəkil optimizasiyası üçün)
- 🆕 Supabase (real-time və autentifikasiya üçün hazır struktur)

### Frontend

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Shadcn UI
- Radix UI
- React Hook Form
- Zod (form validasiyası üçün)
- Axios
- LocalStorage favoritlər üçün
- 🆕 React Server Components (RSC)
- 🆕 Error boundary və səhifə səviyyəsində error idarəetməsi
- 🆕 Swipe və favorit funksionallığı
- 🆕 SSR və preload pattern

## 🚀 Başlama

Layihəni öz kompüterinizə klonlayın və aşağıdakı addımları izləyin:

### Backend

```bash
# Backend direktoriyasına keçin
cd backend

# Asılılıqları yükləyin
npm install

# .env faylı yaradın
# Nümunə fayldan istifadə edin
cp .env.example .env

# .env faylını redaktə edin - MongoDB URI, JWT_SECRET və s.

# Serveri başladın
npm run dev
```

### Frontend

```bash
# Frontend direktoriyasına keçin
cd frontend

# Asılılıqları yükləyin
npm install

# .env.local faylı yaradın və API URL-ni təyin edin
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Serveri başladın
npm run dev
```

## 📂 Layihə strukturu

### Backend

```
backend/
├── config/             # Konfiqurasiya faylları
├── controllers/        # Kontrollerlər
│   ├── adminController.js   # Admin əməliyyatları
│   └── listingController.js # Elan əməliyyatları
├── middlewares/        # Middleware-lər
│   ├── adminAuth.js    # Admin autentifikasiya middleware
│   └── uploadMiddleware.js # Şəkil yükləmə middleware
├── models/             # Mongoose modellər
│   └── Listing.js      # Elan modeli
├── routes/             # API route-lar
│   ├── admin.js        # Admin route-ları
│   └── listings.js     # Elan route-ları
├── uploads/            # Yüklənmiş şəkillər üçün qovluq
└── index.js            # Proqramın giriş nöqtəsi
```

### Frontend

```
frontend/
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── admin/     # Admin səhifələri
│   │   ├── listings/  # Elan səhifələri
│   │   ├── favorites/ # Favoritlər səhifəsi
│   │   ├── contact/   # Əlaqə səhifəsi
│   │   ├── how-it-works/ # Necə İşləyir səhifəsi
│   │   ├── page.tsx   # Ana səhifə
│   │   └── layout.tsx # Əsas layout
│   │
│   ├── components/    # React komponentləri
│   │   ├── ui/        # Shadcn UI komponentləri
│   │   ├── listing-card.tsx # Elan kartı komponenti
│   │   ├── listing-list.tsx # Elan siyahısı komponenti
│   │   ├── listing-form.tsx # Elan əlavə/redaktə formu
│   │   ├── category-filter.tsx # Kateqoriya filter komponenti
│   │   ├── favorite-button.tsx # Favorilərə əlavə etmə düyməsi
│   │   ├── site-header.tsx # Sayt başlığı
│   │   └── site-footer.tsx # Sayt ayaqaltısı
│   │
│   └── lib/           # Köməkçi funksiyalar
│       ├── api.ts     # API sorğu funksiyaları
│       └── utils.ts   # Ümumi köməkçi funksiyalar
│
├── public/            # Statik fayllar
└── next.config.mjs    # Next.js konfiqurasiyası
```

## 🔄 Saytın işləyiş axını

1. **İstifadəçi axını:**

   - İstifadəçilər ana səhifədə bütün mövcud elanları görə bilirlər
   - Kateqoriyaya görə filtrasiya edə bilərlər
   - Hər hansı elanı favoritlərə əlavə edə bilərlər (localStorage-də saxlanılır)
   - Elan detallarını görə bilərlər
   - Elan sahibi ilə əlaqə qura bilərlər

2. **Admin axını:**
   - `/admin` ünvanından admin panelə daxil olma
   - JWT token ilə autentifikasiya
   - Elanları əlavə etmə, redaktə etmə və silmə
   - Elanlar üçün şəkil yükləmə (Multer ilə)

## 📱 Responsiv dizayn

Sayt tam responsivdir və müxtəlif ölçülü ekranlarda işləyir:

- Mobil telefon (sx)
- Tablet (md)
- Laptop (lg)
- Desktop (xl)

## 🧩 API Endpoints və funksionallıq

### Elan Endpointləri

| Endpoint                    | Method | Funksionallıq                                           | Autentifikasiya |
| --------------------------- | ------ | ------------------------------------------------------- | --------------- |
| `/api/listings`             | GET    | Bütün elanları əldə etmək, kateqoriyaya görə filtrasiya | Yox             |
| `/api/listings/:id`         | GET    | Bir elanın detallarını əldə etmək                       | Yox             |
| `/api/listings`             | POST   | Yeni elan əlavə etmək                                   | Admin           |
| `/api/listings/:id`         | PUT    | Elanı redaktə etmək                                     | Admin           |
| `/api/listings/:id`         | DELETE | Elanı silmək                                            | Admin           |
| `/api/listings/:id/contact` | POST   | Əlaqə sayğacını artırmaq                                | Yox             |

### Admin Endpointləri

| Endpoint                  | Method | Funksionallıq                    | Autentifikasiya |
| ------------------------- | ------ | -------------------------------- | --------------- |
| `/api/admin/login`        | POST   | Admin autentifikasiyası          | Yox             |
| `/api/admin/verify-token` | POST   | JWT tokenin doğruluğunu yoxlamaq | Yox             |

## 💾 Verilənlər modeli

### Elan (Listing) modeli

```javascript
{
  _id: ObjectId,
  title: String,           // Elanın başlığı
  description: String,     // Elanın təsviri
  price: Number,           // Kirayə qiyməti
  category: String,        // Kateqoriya (enum)
  images: [String],        // Şəkil URL-ləri
  views: Number,           // Baxış sayı
  contacts: Number,        // Əlaqə sayı
  contactInfo: {
    email: String,         // Əlaqə e-poçtu
    phone: String          // Əlaqə telefonu
  },
  isActive: Boolean,       // Elanın aktiv olub-olmaması
  createdAt: Date,         // Yaradılma tarixi
  updatedAt: Date          // Yenilənmə tarixi
}
```

### Kateqoriyalar

- 👰‍♀️ Gəlinliklər (wedding-dresses)
- 🤵 Kişi kostyumları (men-suits)
- 👗 Qadın geyimləri (women-clothing)
- 👠 Ayaqqabılar (shoes)
- 💍 Zinət əşyaları (jewelry)
- 👜 Çantalar və aksesuarlar (bags-accessories)
- 👶 Uşaq geyimləri (kids-clothing)
- 🎭 Tematik geyimlər (themed-clothing)

## 👨‍💻 Lahiyənin texniki xüsusiyyətləri

1. **Server-side rendering:** Next.js App Router və SSR
2. **Statik səhifələr:** Necə işləyir, Əlaqə, FAQ səhifələri
3. **Server komponentləri:** Elan siyahısı, detallı səhifələr, admin dashboard və s.
4. **Client komponentləri:** Favorit düyməsi, Kateqoriya filtri, swipe-page və s.
5. **API sorğuları:** Axios və ya Supabase ilə arxa plan sorğuları
6. **JWT autentifikasiya:** Admin giriş və autentifikasiya
7. **Statik kontentin ön yükləməsi və optimizasiya**
8. **Error Handling:** error.tsx, not-found.tsx, global-error.tsx ilə xəta işləmələri
9. **Optimistik UI və real-time yeniləmələr**
10. **Form validasiyası:** Zod və React Hook Form ilə
11. **Fayl yükləmə və şəkil optimizasiyası:** Cloudinary, WebP, lazy loading
12. **Supabase və ya digər backend inteqrasiyası üçün hazır struktur**
13. **Yeni səhifələr və komponentlər:** admin dashboard, business profiles, swipe, faq və s.

## 📄 Lisenziya

Bu layihə [MIT lisenziyası](LICENSE) altında lisenziyalanıb.

## Əlaqə

Əlavə suallarınız və ya təklifləriniz varsa, bizimlə əlaqə saxlayın:

Email: info@paylas.az
Telefon: +994 55 123 45 67
