import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Logo.svg"
                alt="Paylaş"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-600 mb-4">
              Paylaş - Əşyalarınızı icma ilə bölüşün və qazanc əldə edin.
              Paylaşmağın ən asan və təhlükəsiz yolu.
            </p>
          </div>

          {/* Məlumat */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Məlumat
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600">
                  Ana Səhifə
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Necə İşləyir?
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Tez-tez verilən suallar
                </Link>
              </li>
            </ul>
          </div>

          {/* Əlaqə */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Əlaqə</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@paylas.az</li>
              <li className="text-gray-600">Tel: +994 70 515 74 50</li>
              <li className="text-gray-600">Bakı, Azərbaycan</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Paylaş. Bütün hüquqlar qorunur.
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

export { Footer };
