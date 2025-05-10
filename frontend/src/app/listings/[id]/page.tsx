// Server component - async olabilir (use client direktifi yok)
import { notFound } from "next/navigation";
import { ListingDetailClient } from "./listing-detail-client";
import api_services, { categories } from "@/lib/api";
import { Listing } from "@/lib/api";

interface ListingDetailPageProps {
  params: {
    id: string;
  };
}

// Veri getirme işlevini yapan server component
async function fetchListing(id: string): Promise<Listing | null> {
  try {
    return await api_services.getListingById(id);
  } catch {
    return null;
  }
}

// Ana sayfa bileşeni (Server Component)
export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  // Veri çekme
  const listing = await fetchListing(params.id);

  if (!listing) {
    return notFound();
  }

  // Kategori detaylarını bulma
  const category = categories.find((cat) => cat.id === listing.category);

  // Client component'e veriyi props olarak geçiriyoruz
  return <ListingDetailClient listing={listing} category={category} />;
}
