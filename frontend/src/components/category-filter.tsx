"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/lib/api";

interface CategoryFilterProps {
  className?: string;
}

function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentCategory = searchParams.get("category");

  // Create a new URLSearchParams with the current query parameters
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  // Handle category selection
  function handleCategorySelect(categoryId: string) {
    // If same category is clicked, remove filter
    if (currentCategory === categoryId) {
      router.push(pathname);
    } else {
      router.push(`${pathname}?${createQueryString("category", categoryId)}`);
    }
    setIsOpen(false);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pb-6">
      {/* Mobile Categories Header */}
      <div className="lg:hidden">
        <div
          className={`flex items-center justify-between bg-white ${
            isOpen ? "rounded-t-2xl" : "rounded-2xl"
          } px-4 py-4 border-b`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-blue-600"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Kateqoriyalar
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center transition-colors hover:bg-gray-100"
          >
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Categories Grid */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out bg-white rounded-b-2xl shadow-sm ${
            isOpen
              ? "max-h-[1000px] opacity-100 border-t"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="grid grid-cols-3 gap-0.5 px-1 py-2">
            <button
              onClick={() => {
                router.push(pathname);
                setIsOpen(false);
              }}
              className="flex flex-col items-center justify-center text-center group p-2 rounded-xl hover:bg-gray-50"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl 
                ${
                  !currentCategory
                    ? "bg-blue-100"
                    : "bg-blue-50 group-hover:bg-blue-100"
                } 
                transition-colors`}
              >
                <span
                  className={`text-2xl transition-transform duration-300 ${
                    !currentCategory ? "scale-110" : "group-hover:scale-110"
                  }`}
                  style={{ lineHeight: 1 }}
                >
                  🏠
                </span>
              </div>
              <span
                className={`text-sm font-medium mt-2 
                ${
                  !currentCategory
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 group-hover:text-blue-600"
                }`}
              >
                Hamısı
              </span>
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="flex flex-col items-center justify-center text-center group p-2 rounded-xl hover:bg-gray-50"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl 
                  ${
                    currentCategory === category.id
                      ? "bg-blue-100"
                      : "bg-blue-50 group-hover:bg-blue-100"
                  } 
                  transition-colors`}
                >
                  <span
                    className={`text-2xl transition-transform duration-300 ${
                      currentCategory === category.id
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                    style={{ lineHeight: 1 }}
                  >
                    {category.emoji}
                  </span>
                </div>
                <span
                  className={`text-sm font-medium mt-2 truncate w-full px-1
                  ${
                    currentCategory === category.id
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 group-hover:text-blue-600"
                  }`}
                >
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:grid grid-cols-9 gap-4 justify-items-center max-w-6xl mx-auto">
        <button
          onClick={() => router.push(pathname)}
          className={`flex flex-col items-center justify-center text-center group h-[110px] w-full`}
        >
          <div
            className={`w-[60px] h-[60px] relative flex items-center justify-center rounded-xl bg-white 
            transition-all duration-300 
            ${
              !currentCategory
                ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] -translate-y-1 bg-blue-50"
                : "group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:-translate-y-1"
            }`}
          >
            <div className="w-[37px] h-[37px] flex items-center justify-center">
              <span
                className={`text-3xl transition-transform duration-300 ${
                  !currentCategory ? "scale-110" : ""
                }`}
                style={{ lineHeight: 1 }}
              >
                🏠
              </span>
            </div>
          </div>
          <div className="h-[32px] mt-2 flex items-center justify-center">
            <span
              className={`text-sm font-medium transition-colors duration-300 leading-tight 
              ${
                !currentCategory
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 group-hover:text-blue-600"
              }`}
            >
              Hamısı
            </span>
          </div>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`flex flex-col items-center justify-center text-center group h-[110px] w-full`}
          >
            <div
              className={`w-[60px] h-[60px] relative flex items-center justify-center rounded-xl bg-white 
              transition-all duration-300 
              ${
                currentCategory === category.id
                  ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] -translate-y-1 bg-blue-50"
                  : "group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:-translate-y-1"
              }`}
            >
              <div className="w-[37px] h-[37px] flex items-center justify-center">
                <span
                  className={`text-3xl transition-transform duration-300 ${
                    currentCategory === category.id ? "scale-110" : ""
                  }`}
                  style={{ lineHeight: 1 }}
                >
                  {category.emoji}
                </span>
              </div>
            </div>
            <div className="h-[32px] mt-2 flex items-center justify-center">
              <span
                className={`text-sm font-medium transition-colors duration-300 leading-tight 
                ${
                  currentCategory === category.id
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 group-hover:text-blue-600"
                }`}
              >
                {category.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export { CategoryFilter };
