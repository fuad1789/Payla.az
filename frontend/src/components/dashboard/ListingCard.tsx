import { Listing } from "@/types/listing";
import Image from "next/image";

interface ListingCardProps {
  listing: Listing;
  onEdit: () => void;
  onViewStats: () => void;
}

export default function ListingCard({
  listing,
  onEdit,
  onViewStats,
}: ListingCardProps) {
  const priceChange = listing.previousPrice
    ? ((listing.pricePerDay - listing.previousPrice) / listing.previousPrice) *
      100
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>

        <div className="flex items-center mb-2">
          <span className="text-lg font-bold">${listing.pricePerDay}</span>
          {listing.previousPrice && (
            <div className="ml-2 flex items-center">
              <span className="text-sm line-through text-gray-500">
                ${listing.previousPrice}
              </span>
              {priceChange !== 0 && (
                <span
                  className={`ml-2 text-sm ${
                    priceChange > 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {priceChange > 0 ? "🔺" : "🔻"}
                </span>
              )}
            </div>
          )}
          <span className="text-sm text-gray-500 ml-2">/day</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{listing.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={onViewStats}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Stats
            </button>
          </div>
          <div className="text-sm text-gray-500">{listing.viewCount} views</div>
        </div>
      </div>
    </div>
  );
}
