"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ListingForm } from "@/components/listing-form";

export default function NewListingPage() {
  const router = useRouter();

  // Check if admin is authenticated
  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      router.push("/admin");
    }
  }, [router]);

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
          <h1 className="text-3xl font-bold">Yeni Elan Əlavə Et</h1>
          <p className="text-muted-foreground">
            Yeni bir elan əlavə edin və anında saytda göstərin.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <ListingForm mode="create" />
        </div>
      </div>
    </div>
  );
}
