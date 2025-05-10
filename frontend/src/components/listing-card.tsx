"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

import { Listing, categories } from "@/lib/api";
import {
  formatPrice,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
} from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const [favorite, setFavorite] = useState(isFavorite(listing._id));
  const [imageError, setImageError] = useState(false);

  // Get category name and emoji
  const category = categories.find((cat) => cat.id === listing.category);

  // Get primary image (first one or fallback)
  const primaryImage =
    listing.images && listing.images.length > 0
      ? listing.images[0]
      : "/placeholder-image.svg";

  // Toggle favorite status
  function toggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFromFavorites(listing._id);
      setFavorite(false);
    } else {
      addToFavorites(listing._id);
      setFavorite(true);
    }
  }

  // Extract username from title or use a placeholder
  const userName = listing.title.split(" ")[0];
  const isTitleSameAsUserName = listing.title.trim() === userName.trim();

  const imageSrc = imageError ? "/placeholder-image.svg" : primaryImage;
  const isExternalImage = primaryImage.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <Link
        href={`/listings/${listing._id}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
            onError={() => setImageError(true)}
            loading="lazy"
            unoptimized={isExternalImage}
            quality={isExternalImage ? undefined : 85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          <button
            onClick={toggleFavorite}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow"
            aria-label={
              favorite ? "Seçilmişlərdən çıxar" : "Seçilmişlərə əlavə et"
            }
          >
            <Heart
              className={
                favorite ? "fill-red-500 text-red-500" : "text-gray-500"
              }
              size={18}
            />
          </button>

          {listing.images && listing.images.length > 1 && (
            <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
              {listing.images.length} şəkil
            </div>
          )}
        </div>

        <div className="flex flex-grow flex-col p-3 pb-2.5">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="text-lg leading-none">{category?.emoji}</span>
            <span className="text-sm font-medium text-gray-600">
              {category?.name}
            </span>
          </div>

          <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary">
            {listing.title}
          </h3>

          <div className="mt-auto flex flex-col">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between">
              <div className="flex items-center gap-2.5 mb-1 sm:mb-0">
                <div className="flex items-center rounded-full bg-gray-50 px-2 py-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-3.5 w-3.5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="text-xs font-medium">{listing.views}</span>
                </div>
                <div className="flex items-center rounded-full bg-gray-50 px-2 py-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-3.5 w-3.5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-xs font-medium">
                    {listing.contacts}
                  </span>
                </div>
              </div>
              <div className="rounded-full bg-primary/10 px-2.5 py-1">
                <span className="whitespace-nowrap text-base font-medium text-primary">
                  {formatPrice(listing.price)}
                  <span className="text-xs font-normal">/gün</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export { ListingCard };
