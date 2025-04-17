"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NavBar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/svgs/Logo.svg"
              alt="Payla.az"
              width={180}
              height={48}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* Hamburger menu button for mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {mounted && user ? (
              <>
                <Link
                  href="/create-listing"
                  className="px-6 py-2.5 bg-[#1E3A8A] text-white font-medium rounded-lg hover:bg-[#1E3A8A]/90 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  Paylaş
                </Link>
                <button
                  onClick={logout}
                  className="px-6 py-2.5 bg-white text-[#38BDF8] font-medium rounded-lg border-2 border-[#38BDF8] hover:bg-[#38BDF8]/5 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  Çıxış
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-2.5 bg-[#38BDF8] text-white font-medium rounded-lg hover:bg-[#38BDF8]/90 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  Giriş et
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-white text-[#38BDF8] font-medium rounded-lg border-2 border-[#38BDF8] hover:bg-[#38BDF8]/5 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  Qeydiyyat
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          className={`lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          } pt-4 pb-3 border-t mt-4`}
        >
          <div className="flex flex-col space-y-3">
            {mounted && user ? (
              <>
                <Link
                  href="/create-listing"
                  className="px-6 py-2.5 bg-[#1E3A8A] text-white font-medium rounded-lg hover:bg-[#1E3A8A]/90 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 text-center"
                >
                  Paylaş
                </Link>
                <button
                  onClick={logout}
                  className="px-6 py-2.5 bg-white text-[#38BDF8] font-medium rounded-lg border-2 border-[#38BDF8] hover:bg-[#38BDF8]/5 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  Çıxış
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-2.5 bg-[#38BDF8] text-white font-medium rounded-lg hover:bg-[#38BDF8]/90 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 text-center"
                >
                  Giriş et
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-white text-[#38BDF8] font-medium rounded-lg border-2 border-[#38BDF8] hover:bg-[#38BDF8]/5 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 text-center"
                >
                  Qeydiyyat
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
