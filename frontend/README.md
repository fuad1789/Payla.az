# Payla.az v5 Frontend

Bu layihə Next.js 14 App Router, TypeScript, Tailwind CSS, Shadcn UI və Radix UI istifadə edilərək hazırlanıb. SSR və React Server Components əsaslı arxitekturaya malikdir.

## Qovluq Strukturu

- **src/app/** – Səhifələr və route-lar (admin, listings, favorites, contact, faq, how-it-works və s.)
- **src/components/** – Yenilənmiş və yeni komponentlər (listing-form, swipe-page, category-filter, favorite-button və s.)
- **src/components/ui/** – UI komponentləri (button, input, card və s.)
- **src/lib/** – API və util funksiyaları (api.ts, utils.ts)

## Əsas Xüsusiyyətlər

- **Admin Panel:** CRUD əməliyyatları üçün admin dashboard, listings və business profiles idarəetməsi
- **SSR və RSC:** React Server Components və SSR ilə performanslı data fetching
- **Mobil və Responsiv Dizayn:** Tailwind CSS ilə tam mobil uyğunluq
- **Form Validasiyası:** Zod ilə tip təhlükəsiz form validasiyası
- **Error Handling:** error.tsx və not-found.tsx ilə səhv idarəetməsi
- **Fayl Yükləmə və Şəkil Optimizasiyası:** WebP, lazy loading və s.
- **Favoritlər və Swipe:** İstifadəçi favoritləri və swipe funksionallığı
- **Supabase və ya digər backend inteqrasiyası üçün hazır struktur**

## Quraşdırma və İşə Salma

```bash
npm install
npm run dev
```

Brauzerdə [http://localhost:3000](http://localhost:3000) ünvanına daxil olun.

## Backend

Backend Express.js ilə hazırlanıb və ayrıca `backend/README.md` faylında izah olunub.

## Əlaqə və Dəstək

Əlavə suallar üçün admin panel və ya contact səhifəsindən istifadə edin.
