"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing, index) => (
        <motion.div
          key={listing._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={`/listings/${listing._id}`}
            className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
            </div>
            <div className="p-4 flex flex-col h-[calc(100%-75%)]">
              {listing.category && (
                <div className="flex items-center gap-2 mb-2">
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
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-primary-600 transition-colors duration-300">
                {listing.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-1 mt-1 mb-auto">
                {listing.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-medium text-primary-600">
                  {listing.pricePerDay.toFixed(2)} ₺ / Gün
                </span>
                <span className="text-sm text-gray-500">
                  {listing.owner.name}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
