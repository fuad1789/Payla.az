"use client";

import Link from "next/link";
import Image from "next/image";

interface Listing {
  _id: string;
  title: string;
  description: string;
  image: string;
  pricePerDay: number;
  category?: {
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

interface ListingsGridProps {
  listings: Listing[];
}

export default function ListingsGrid({ listings }: ListingsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {listings.map((listing) => (
        <Link
          key={listing._id}
          href={`/listings/${listing._id}`}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-4 flex flex-col gap-2">
            {listing.category && (
              <div className="flex items-center gap-2 mb-1">
                <Image
                  src={listing.category.icon}
                  alt={listing.category.name}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600">
                  {listing.category.name}
                </span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {listing.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {listing.description}
            </p>
            <div className="mt-auto pt-2">
              <span className="text-lg font-medium text-gray-900">
                {listing.pricePerDay.toFixed(2)} ₺ / Gün
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
