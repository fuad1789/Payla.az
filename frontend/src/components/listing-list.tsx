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
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-lime-400 text-white shadow-xl text-base font-semibold transition-all duration-200 hover:scale-105 hover:from-green-600 hover:to-lime-500 flex items-center gap-2 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2.6"
            className="inline-block transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110"
          >
            <g>
              <path d="M34.43 62.31c-.35 0-.7-.01-1.05-.03-5.21-.35-9.89-3.25-12.51-7.78l-2.95-5.09c-1.82-3.14-.99-7.09 1.79-9.27L9.46 22.44a4.583 4.583 0 0 1-.47-3.51 4.606 4.606 0 0 1 2.15-2.81 4.68 4.68 0 0 1 3.51-.47c1.17.31 2.2 1.1 2.81 2.15l3.74 6.46c.4-.84 1.03-1.54 1.85-2.02a4.59 4.59 0 0 1 5.19.38 4.639 4.639 0 0 1 2.03-2.44 4.68 4.68 0 0 1 3.51-.47c.76.2 1.45.59 2 1.12a4.53 4.53 0 0 1 1.95-2.22c1.07-.62 2.32-.79 3.51-.47s2.19 1.08 2.81 2.15l9.01 15.56c4.33 7.47 1.77 17.07-5.7 21.39l-5.09 2.95a15.51 15.51 0 0 1-7.84 2.12zM20.73 41.9c-1.83 1.6-2.34 4.33-1.07 6.51l2.95 5.09a13.64 13.64 0 0 0 10.91 6.78c2.72.19 5.39-.45 7.75-1.81l5.09-2.95c6.52-3.77 8.75-12.15 4.97-18.66l-6.05-10.45-2.96-5.11c-.35-.61-.92-1.04-1.59-1.22-.68-.18-1.38-.08-1.99.27-.6.35-1.04.91-1.21 1.59-.18.68-.08 1.38.27 1.99l2.96 5.11c.09.16.13.33.13.5 0 .35-.18.68-.5.87-.48.28-1.09.11-1.37-.36l-4.16-7.18c-.35-.6-.91-1.03-1.59-1.21-.67-.18-1.39-.08-1.99.27s-1.04.91-1.22 1.59-.09 1.38.26 1.98l4.16 7.18c.28.48.11 1.09-.36 1.37a.998.998 0 0 1-1.37-.36l-5.11-8.74c-.35-.61-.92-1.04-1.6-1.23a2.62 2.62 0 0 0-3.2 1.86c-.18.68-.09 1.38.26 1.99l5.08 8.76c.09.16.13.33.13.5 0 .35-.18.68-.5.87-.48.28-1.09.11-1.37-.36L15.72 18.81c-.35-.6-.93-1.05-1.59-1.22-.67-.18-1.39-.08-1.99.27s-1.04.91-1.21 1.59c-.18.68-.08 1.38.27 1.99L25.12 45.5c.28.48.11 1.09-.36 1.37-.48.28-1.09.11-1.37-.36zM20.4 10.13c-.38 0-.74-.21-.91-.58-.23-.5-.02-1.1.48-1.33 10.29-4.83 19.7-.31 20.09-.11.5.24.7.84.46 1.34s-.84.7-1.34.46c-.09-.04-8.97-4.28-18.36.13-.14.06-.28.09-.42.09z" />
              <path d="M27.08 12.91c-.13 0-.26-.02-.38-.08l-6.68-2.78c-.29-.12-.51-.37-.58-.67s-.01-.63.18-.87l5.09-6.44c.34-.43.97-.51 1.4-.17s.51.97.17 1.4L22 8.71l5.46 2.27a1.004 1.004 0 0 1-.38 1.93z" />
            </g>
          </svg>
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
