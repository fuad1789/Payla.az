import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Necə İşləyir? 🤔</h1>
          <p className="text-xl text-muted-foreground">
            Paylaş platforması ilə əşyalarınızı kirayə vermək çox asandır.
          </p>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-background text-primary shadow-md md:mt-2">
              <span className="text-xl font-bold">1</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">Bizimlə əlaqə saxlayın</h2>
              <p className="text-muted-foreground">
                WhatsApp və ya email vasitəsilə bizə yazın və kirayə vermək
                istədiyiniz əşyanın şəklini və məlumatlarını göndərin.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>Əşyanın şəkli - yüksək keyfiyyətdə və işıqlı</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>Əşyanın adı və təsviri</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>İstədiyiniz günlük qiymət (AZN ilə)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>Əlaqə məlumatlarınız</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-background text-primary shadow-md md:mt-2">
              <span className="text-xl font-bold">2</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">
                Biz yoxlayıb sayta yerləşdiririk
              </h2>
              <p className="text-muted-foreground">
                Komandamız göndərdiyiniz məlumatları yoxlayır və uyğun olduğu
                halda elanı sayta əlavə edir.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>Məlumatların doğruluğu yoxlanılır</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>Şəkillərin keyfiyyəti yoxlanılır</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>Uyğun kateqoriya seçilir</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>Elan sayta əlavə olunur</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-background text-primary shadow-md md:mt-2">
              <span className="text-xl font-bold">3</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">
                Maraqlananlar bizimlə əlaqə saxlayır
              </h2>
              <p className="text-muted-foreground">
                Platformanı ziyarət edən insanlar əşyanızla maraqlanacaq və
                bizimlə əlaqə saxlayacaqlar.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>Əlaqə məlumatlarınız elanda göstərilir</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>
                    Potensial icarəçilər birbaşa sizinlə əlaqə saxlayır
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>Siz kirayə şərtlərini özünüz təyin edirsiniz</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <span>Kirayə müddəti bitdikdə əşyanız geri qaytarılır</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 text-center space-y-4">
          <h2 className="text-xl font-bold">Hazırsınız?</h2>
          <p className="text-muted-foreground">
            İndi bizimlə əlaqə saxlayıb əşyanızı kirayə vermək üçün elan
            yerləşdirin.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/994705157450?text=Salam%2C%20m%C9%99n%20bir%20elan%20yerl%C9%99%C5%9Fdirm%C9%99k%20ist%C9%99yir%C9%99m"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">Əlaqə saxla</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
