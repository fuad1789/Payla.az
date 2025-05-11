"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import api_services, { Listing, categories } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if admin is authenticated
  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      router.push("/admin");
      return;
    }

    fetchListings();
  }, [router]);

  // Fetch all listings
  async function fetchListings() {
    try {
      setIsLoading(true);
      const data = await api_services.getListings(1, 100);
      setListings(data.listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Elanları yükləyərkən xəta baş verdi");
    } finally {
      setIsLoading(false);
    }
  }

  // Delete listing
  async function deleteListing(id: string) {
    if (!window.confirm("Bu elanı silmək istədiyinizə əminsiniz?")) {
      return;
    }

    try {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        toast.error("Admin icazəniz yoxdur");
        return;
      }

      await api_services.deleteListing(id, token);

      // Update listings
      setListings(listings.filter((listing) => listing._id !== id));

      toast.success("Elan uğurla silindi");
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Elanı silmək mümkün olmadı");
    }
  }

  // Handle logout
  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.push("/admin");
    toast.success("Uğurla çıxış etdiniz");
  }

  // Get category name
  function getCategoryName(categoryId: string) {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? `${category.emoji} ${category.name}` : categoryId;
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Bütün elanları idarə edin.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/listings/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Elan Əlavə Et
            </Button>
          </Link>
          <Link href="/admin/business-profiles/new">
            <Button variant="secondary">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Biznes Profili
            </Button>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            Çıxış
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center">Yüklənir...</div>
      ) : listings.length === 0 ? (
        <div className="py-12 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Hələ heç bir elan yerləşdirilməyib
          </h3>
          <p className="text-muted-foreground mb-6">
            İlk elanınızı əlavə etmək üçün "Yeni Elan Əlavə Et" düyməsinə
            klikləyin.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Elan
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Kateqoriya
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Qiymət
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Baxış
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Müraciət
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    Əməliyyatlar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {listings.map((listing) => (
                  <tr key={listing._id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm truncate max-w-[200px]">
                      {listing.title}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {getCategoryName(listing.category)}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {formatPrice(listing.price)}/gün
                    </td>
                    <td className="px-4 py-3 text-sm">{listing.views}</td>
                    <td className="px-4 py-3 text-sm">{listing.contacts}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          listing.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {listing.isActive ? "Aktiv" : "Deaktiv"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/listings/${listing._id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/listings/edit/${listing._id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteListing(listing._id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
