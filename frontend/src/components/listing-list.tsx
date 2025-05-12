"use client";

import api_services from "@/lib/api";
import { ListingCard } from "@/components/listing-card";
import { Listing } from "@/lib/api";
import { useState, useEffect } from "react";
import Link from "next/link";

interface ListingListProps {
  category?: string;
}

function ListingList({ category }: ListingListProps) {
  const [isSwipeMode, setIsSwipeMode] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      setIsLoading(true);
      api_services.getListings(1, 50, category).then((data) => {
        setListings(data.listings);
        setIsLoading(false);
      });
    },
    [category]
  );

  if (isLoading) return <div className="py-12 text-center">Yüklənir...</div>;

  if (!listings || listings.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-semibold mb-2">Elan tapılmadı</h3>
        <p className="text-muted-foreground">
          Bu kateqoriyada hələ elan yerləşdirilməyib.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link
          href="/listings/swipe"
          className="px-4 py-2 rounded-xl bg-green-600 text-white shadow-md text-sm font-medium transition-all hover:bg-green-700"
        >
          Swipe rejimi
        </Link>
      </div>
      {/* Normal grid rejimi */}
      <div
        className={
          isSwipeMode
            ? "hidden sm:grid"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
        }
      >
        {listings.map((listing: Listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export { ListingList };
