"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ListingCard } from "@/components/listing-card";
import { getFavorites } from "@/lib/utils";
import api_services, { Listing } from "@/lib/api";

export default function FavoritesPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        setIsLoading(true);
        const favoriteIds = getFavorites();

        if (favoriteIds.length === 0) {
          setListings([]);
          setIsLoading(false);
          return;
        }

        // Fetch each listing details
        const favoriteListings = await Promise.all(
          favoriteIds.map(async (id) => {
            try {
              return await api_services.getListingById(id);
            } catch (error) {
              console.error(`Failed to fetch listing with ID ${id}:`, error);
              return null;
            }
          })
        );

        // Filter out any null values from failed fetches
        setListings(favoriteListings.filter(Boolean) as Listing[]);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  return (
    <div className="container py-8">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground mb-6 hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Ana səhifəyə qayıt
      </Link>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Favorilər</h1>
          <p className="text-muted-foreground">
            Bəyəndiyiniz və yadda saxladığınız elanlar.
          </p>
        </div>

        {isLoading ? (
          <div className="py-12 text-center">Yüklənir...</div>
        ) : listings.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="text-lg font-semibold mb-2">
              Favorilərdə heç bir elan yoxdur
            </h3>
            <p className="text-muted-foreground mb-6">
              Bəyəndiyiniz elanları yadda saxlamaq üçün onların üzərindəki ürək
              ikonuna klikləyin.
            </p>
            <Link href="/" className="text-primary hover:underline font-medium">
              Bütün elanlara baxın
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
