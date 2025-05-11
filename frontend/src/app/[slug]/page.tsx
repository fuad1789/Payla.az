import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/listing-card";

interface BusinessProfile {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface PageProps {
  params: { slug: string };
}

async function getBusinessProfileAndListings(
  slug: string
): Promise<{ profile: BusinessProfile; listings: Listing[] } | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/business-profiles/slug/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const listings = (data.listings || []).map((l: any) => ({
    _id: l._id,
    title: l.title,
    description: l.description,
    price: l.price,
    category: l.category || "wedding-dresses",
    images: l.images || [],
    views: l.views ?? 0,
    contacts: l.contacts ?? 0,
    contactInfo: l.contactInfo || { email: "", phone: "" },
    isActive: l.isActive ?? true,
    createdAt: l.createdAt || "",
    updatedAt: l.updatedAt || "",
  }));
  return {
    profile: {
      _id: data.profile._id,
      name: data.profile.name,
      slug: data.profile.slug,
      description: data.profile.description,
      imageUrl: data.profile.imageUrl || null,
      createdAt: data.profile.createdAt || "",
      updatedAt: data.profile.updatedAt || "",
    },
    listings,
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getBusinessProfileAndListings(params.slug);
  if (!data) return { title: "Biznes tapılmadı | Paylaş" };
  return {
    title: `${data.profile.name} | Paylaş`,
    description: data.profile.description,
  };
}

export default async function Page({ params }: PageProps) {
  const data = await getBusinessProfileAndListings(params.slug);
  if (!data) notFound();
  const { profile, listings } = data;
  const typedListings = listings as import("@/lib/api").Listing[];

  return (
    <section className="container py-8 space-y-6 px-8 md:px-16 lg:px-24">
      <div className="flex flex-col items-center text-center mb-8">
        {profile.imageUrl && (
          <Image
            src={profile.imageUrl}
            alt={profile.name}
            width={160}
            height={160}
            className="rounded-full object-cover mb-4"
            priority
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
        <p className="text-gray-600 mb-2">{profile.description}</p>
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Elanlar</h2>
        </div>
        {typedListings.length === 0 ? (
          <p>Bu biznes üçün elan yoxdur.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {typedListings.map((listing, idx) => (
              <ListingCard key={listing._id} listing={listing} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
