import { Suspense } from "react";
import { EditListingContent } from "./edit-listing-content";

// Next.js'in beklediği params tipini kullanıyoruz
interface EditListingPageProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default function EditListingPage({ params }: EditListingPageProps) {
  return (
    <Suspense
      fallback={<div className="container py-8 text-center">Yüklənir...</div>}
    >
      <EditListingContent id={params.id} />
    </Suspense>
  );
}
