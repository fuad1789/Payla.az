import api_services from "@/lib/api";
import { ListingCard } from "@/components/listing-card";
import { Listing } from "@/lib/api";

interface ListingListProps {
  category?: string;
}

async function ListingList({ category }: ListingListProps) {
  // Fetch listings from API
  const data = await api_services.getListings(1, 50, category);
  const listings = data.listings;

  // If no listings, show message
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
      {listings.map((listing: Listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
}

export { ListingList };
