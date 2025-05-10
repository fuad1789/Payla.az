import Link from "next/link";

function SiteFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Paylaş</h3>
            <p className="text-sm text-muted-foreground">
              İstifadə olunmayan geyim və əşyaların kirayə verilməsi üçün
              platforma.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Menyular</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Ana Səhifə
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Necə İşləyir?
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Favorilər
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Kateqoriyalar</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/?category=wedding-dresses"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  👰‍♀️ Gəlinliklər
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=men-suits"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  🤵 Kişi kostyumları
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=women-clothing"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  👗 Qadın geyimləri
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=shoes"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  👠 Ayaqqabılar
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Əlaqə</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                📱 +994 55 123 45 67
              </li>
              <li className="text-sm text-muted-foreground">
                📧 info@paylas.az
              </li>
              <li className="text-sm text-muted-foreground">
                📍 Bakı, Azərbaycan
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Paylaş. Bütün hüquqlar qorunur.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Gizlilik Siyasəti
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              İstifadə Şərtləri
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
