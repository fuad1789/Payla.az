import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  icon: string;
  slug: string;
}

export default function Categories() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log(
          "Fetching categories from:",
          process.env.NEXT_PUBLIC_API_URL
        );
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add CORS headers
              Accept: "application/json",
            },
            // Add CORS mode
            mode: "cors",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Categories data:", data);
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching categories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Default categories if API fails
  const defaultCategories = [
    {
      _id: "1",
      name: "Bütün məhsullar",
      icon: "/svgs/all_items.svg",
      slug: "all",
    },
    {
      _id: "2",
      name: "Gözəllik və Sağlamlıq",
      icon: "/svgs/Health.svg",
      slug: "health",
    },
    {
      _id: "3",
      name: "Oyun konsolları",
      icon: "/svgs/game_consoles.svg",
      slug: "gaming",
    },
    {
      _id: "4",
      name: "Uşaq məhsulları",
      icon: "/svgs/child.svg",
      slug: "kids",
    },
    {
      _id: "5",
      name: "Telefon və aksesuarlar",
      icon: "/svgs/phone.svg",
      slug: "phones",
    },
    {
      _id: "6",
      name: "Kompüter və aksesuarları",
      icon: "/svgs/computer.svg",
      slug: "computers",
    },
    {
      _id: "7",
      name: "Aksesuarlar",
      icon: "/svgs/acsessuars.svg",
      slug: "accessories",
    },
    {
      _id: "8",
      name: "Kampaniyalar",
      icon: "/svgs/kampanya.svg",
      slug: "campaigns",
    },
  ];

  // Use default categories if there's an error or no categories from API
  const displayCategories =
    categories.length > 0 ? categories : defaultCategories;

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="w-[60px] h-[60px] bg-gray-200 rounded-xl mx-auto" />
              <div className="h-4 bg-gray-200 rounded mt-3 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="text-center text-red-500">
          Error loading categories: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
      {/* Mobile Categories Header */}
      <div className="lg:hidden">
        <div
          className={`flex items-center justify-between bg-white ${
            isOpen ? "rounded-t-2xl" : "rounded-2xl"
          } px-5 py-4 border-b`}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5 p-4">
            {displayCategories.map((category) => (
              <Link
                key={category._id}
                href={`/?category=${category.slug}`}
                className={`flex flex-col items-center justify-center text-center group p-4 rounded-xl hover:bg-gray-50 
                  ${
                    activeCategory === category.slug
                      ? "bg-blue-50 shadow-lg"
                      : ""
                  }`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl 
                  ${
                    activeCategory === category.slug
                      ? "bg-blue-100 shadow-md"
                      : "bg-blue-50 group-hover:bg-blue-100"
                  } 
                  transition-colors`}
                >
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={28}
                    height={28}
                    className={`transition-transform duration-300 
                      ${
                        activeCategory === category.slug
                          ? "scale-110"
                          : "group-hover:scale-110"
                      }`}
                    style={{
                      width: "28px",
                      height: "28px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <span
                  className={`text-sm font-medium mt-3 
                  ${
                    activeCategory === category.slug
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 group-hover:text-blue-600"
                  }`}
                >
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:grid grid-cols-8 gap-4 justify-items-center max-w-6xl mx-auto">
        {displayCategories.map((category) => (
          <Link
            key={category._id}
            href={`/?category=${category.slug}`}
            className={`flex flex-col items-center justify-center text-center group h-[110px] w-full`}
          >
            <div
              className={`w-[60px] h-[60px] relative flex items-center justify-center rounded-xl bg-white 
              transition-all duration-300 
              ${
                activeCategory === category.slug
                  ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] -translate-y-1 bg-blue-50"
                  : "group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:-translate-y-1"
              }`}
            >
              <div className="w-[37px] h-[37px] flex items-center justify-center">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={40}
                  height={40}
                  className={`transition-transform duration-300 
                    ${activeCategory === category.slug ? "scale-110" : ""}`}
                  style={{
                    width: "35px",
                    height: "35px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div className="h-[32px] mt-2 flex items-center justify-center">
              <span
                className={`text-sm font-medium transition-colors duration-300 leading-tight 
                ${
                  activeCategory === category.slug
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 group-hover:text-blue-600"
                }`}
              >
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
