"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

import { ListingForm } from "@/components/listing-form";
import api_services, { Listing } from "@/lib/api";

interface EditListingContentProps {
  id: string;
}

export function EditListingContent({ id }: EditListingContentProps) {
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch listing details
  const fetchListing = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api_services.getListingById(id);
      setListing(data);
    } catch (error) {
      console.error("Error fetching listing:", error);
      toast.error("Elanı yükləmək mümkün olmadı");
      router.push("/admin/dashboard");
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  // Check if admin is authenticated and fetch listing
  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      router.push("/admin");
      return;
    }

    // Fetch listing
    fetchListing();
  }, [router, fetchListing]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">Yüklənir...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Elan tapılmadı</h3>
          <p className="text-muted-foreground mb-6">
            İstədiyiniz elan mövcud deyil və ya silinib.
          </p>
          <Link
            href="/admin/dashboard"
            className="text-primary hover:underline font-medium"
          >
            Admin panelə qayıt
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center text-sm text-muted-foreground mb-6 hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Admin panelə qayıt
      </Link>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Elanı Redaktə Et</h1>
          <p className="text-muted-foreground">
            Mövcud elanı redaktə edin və məlumatları yeniləyin.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <ListingForm mode="edit" listing={listing} />
        </div>
      </div>
    </div>
  );
}
