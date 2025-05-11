# Payla.az v5 Backend

Bu layihə Express.js, Node.js və MongoDB istifadə edilərək hazırlanıb. REST API arxitekturası və modul əsaslı strukturdan istifadə olunur.

## Qovluq Strukturu

- **routes/** – API endpoint-ləri (businessProfiles, listings, admin)
- **controllers/** – Əməliyyat məntiqi (listingController, businessProfileController, adminController)
- **models/** – Mongoose modelləri (Listing, BusinessProfile)
- **middlewares/** – Middleware-lər (uploadMiddleware, adminAuth)
- **config/** – Konfiqurasiya faylları (cloudinary, categories)
- **uploads/** – Yüklənmiş fayllar üçün qovluq

## Əsas Xüsusiyyətlər

- **Listings və Business Profiles:** CRUD əməliyyatları üçün tam API
- **Admin Panel:** Admin autentifikasiyası və idarəetmə
- **Fayl Yükləmə:** Cloudinary inteqrasiyası və uploads qovluğu
- **Middleware:** Auth və fayl yükləmə üçün xüsusi middleware-lər
- **Konfiqurasiya:** Kategoriya və Cloudinary üçün ayrıca config
- **Error Handling:** İstifadəçi dostu error mesajları və status kodları

## Quraşdırma və İşə Salma

```bash
npm install
npm run dev
```

Server [http://localhost:5000](http://localhost:5000) ünvanında işləyəcək.

## API Sənədləşdirmə

Bütün endpoint-lər üçün Postman və ya Swagger istifadə etməyiniz tövsiyə olunur.

## Əlaqə və Dəstək

Əlavə suallar üçün admin və ya contact endpoint-lərindən istifadə edin.
