"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";

interface Listing {
  _id: string;
  title: string;
  description: string;
  image: string;
  pricePerDay: number;
  category: {
    _id: string;
    name: string;
    slug: string;
    icon: string;
  };
  owner: {
    name: string;
    email: string;
  };
}

// Create a client-side only component for the navigation
const NavBar = dynamic(() => import("./components/NavBar"), { ssr: false });

// Create a client-side only component for the categories
const Categories = dynamic(() => import("./components/Categories"), {
  ssr: false,
});

// Create a client-side only component for the listings
const ListingsGrid = dynamic(() => import("@/app/components/ListingsGrid"), {
  ssr: false,
});

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        console.log("Current category slug:", category);

        // If category is "all" or null, fetch all listings
        if (!category || category === "all") {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/api/listings`;
          console.log("Fetching all listings from:", url);

          const response = await fetch(url);
          const data = await response.json();
          console.log("Listings API response:", data);

          if (data.status === "success") {
            console.log("Setting all listings:", data.data.listings);
            setListings(data.data.listings);
          }
          return;
        }

        // For specific categories, get the category ID first
        const categoryUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/categories/slug/${category}`;
        console.log("Fetching category from:", categoryUrl);

        const categoryResponse = await fetch(categoryUrl);
        const categoryData = await categoryResponse.json();
        console.log("Category API response:", categoryData);

        if (categoryData.status === "success") {
          const categoryId = categoryData.data.category._id;
          console.log("Found category ID:", categoryId);

          const url = `${process.env.NEXT_PUBLIC_API_URL}/api/listings?category=${categoryId}`;
          console.log("Fetching category listings from:", url);

          const response = await fetch(url);
          const data = await response.json();
          console.log("Listings API response:", data);

          if (data.status === "success") {
            console.log("Setting category listings:", data.data.listings);
            setListings(data.data.listings);
          }
        }
      } catch (error) {
        console.error("Error in fetchListings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    console.log("useEffect triggered with category:", category);
    fetchListings();
  }, [category]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          <p className="text-gray-600">Elanlar yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <main className="section">
        <div className="container">
          <Categories />

          {listings.length > 0 ? (
            <ListingsGrid listings={listings} />
          ) : (
            <div className="text-center py-12">
              <p className="text-body text-gray-600">
                Hazırda mövcud elan yoxdur.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
