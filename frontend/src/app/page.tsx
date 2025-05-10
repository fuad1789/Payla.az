import { Suspense } from "react";

import { CategoryFilter } from "@/components/category-filter";
import { ListingList } from "@/components/listing-list";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;

  return (
    <div>
      {/* Listings section */}
      <section className="container py-8 space-y-6 px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Bütün Elanlar
            </h2>
            <p className="text-muted-foreground">
              Ən son əlavə olunan elanlar burada.
            </p>
          </div>
        </div>

        <CategoryFilter />

        <Suspense fallback={<p className="text-center py-12">Yüklənir...</p>}>
          <ListingList category={category} />
        </Suspense>
      </section>
    </div>
  );
}
