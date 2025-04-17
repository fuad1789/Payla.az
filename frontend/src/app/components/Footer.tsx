import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/svgs/Logo.svg"
                alt="Payla.az"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-600 mb-4">
              Payla.az - Əşyalarınızı icma ilə bölüşün və qazanc əldə edin.
              Kirayə vermə prosesini asan və təhlükəsiz edin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Sürətli Keçidlər
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600">
                  Ana Səhifə
                </Link>
              </li>
              <li>
                <Link
                  href="/create-listing"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Elan Yarat
                </Link>
              </li>
              <li>
                <Link
                  href="/listings/all"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Bütün Elanlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Əlaqə</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@payla.az</li>
              <li className="text-gray-600">Tel: +994 50 123 45 67</li>
              <li className="text-gray-600">Bakı, Azərbaycan</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Payla.az. Bütün hüquqlar qorunur.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-primary-600 text-sm"
              >
                Məxfilik Siyasəti
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-primary-600 text-sm"
              >
                İstifadə Şərtləri
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
