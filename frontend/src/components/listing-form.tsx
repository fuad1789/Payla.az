"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Upload, X, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api_services, { Listing, categories, BusinessProfile } from "@/lib/api";

interface ListingFormProps {
  listing?: Listing;
  mode: "create" | "edit";
}

interface ListingFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  email: string;
  phone: string;
  isActive: boolean;
  businessProfileId?: string | null;
}

function ListingForm({ listing, mode }: ListingFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>(
    listing?.images || []
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [businessProfiles, setBusinessProfiles] = useState<BusinessProfile[]>(
    []
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ListingFormData>({
    defaultValues: {
      title: listing?.title || "",
      description: listing?.description || "",
      price: listing?.price?.toString() || "",
      category: listing?.category || categories[0].id,
      email: listing?.contactInfo?.email || "",
      phone: listing?.contactInfo?.phone || "",
      isActive: listing?.isActive !== undefined ? listing.isActive : true,
      businessProfileId: listing?.businessProfileId || "",
    },
  });

  // Business profilləri yüklə
  useEffect(() => {
    api_services
      .getBusinessProfiles()
      .then(setBusinessProfiles)
      .catch(() => setBusinessProfiles([]));
  }, []);

  const isActiveWatch = watch("isActive");
  const businessProfileIdWatch = watch("businessProfileId");

  // Handle image selection
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const newPreviewUrls: string[] = [];

    // Process each file
    Array.from(files).forEach((file) => {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} - Şəkil həcmi 5MB-dan çox olmamalıdır`);
        return;
      }

      // Check file type
      if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
        toast.error(
          `${file.name} - Yalnız JPEG, JPG, PNG və WebP formatları dəstəklənir`
        );
        return;
      }

      newFiles.push(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        newPreviewUrls.push(reader.result as string);

        // Update state when all files have been processed
        if (newPreviewUrls.length === newFiles.length) {
          setSelectedFiles((prev) => [...prev, ...newFiles]);
          setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Handle removing an image
  function handleRemoveImage(index: number) {
    // If the image is from existing images
    if (index < imagePreviewUrls.length - selectedFiles.length) {
      // For existing images, just remove from preview
      setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      // For newly added files, remove from both selectedFiles and previews
      const adjustedFileIndex =
        index - (imagePreviewUrls.length - selectedFiles.length);

      setSelectedFiles((prev) =>
        prev.filter((_, i) => i !== adjustedFileIndex)
      );
      setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
  }

  // Handle form submission
  async function onSubmit(data: ListingFormData) {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("admin_token");

      if (!token) {
        toast.error("Admin icazəniz yoxdur");
        router.push("/admin");
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append(
        "contactInfo",
        JSON.stringify({
          email: data.email,
          phone: data.phone,
        })
      );
      formData.append("isActive", data.isActive.toString());
      formData.append("businessProfileId", data.businessProfileId || "");

      // Append selected files with the field name "images"
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      if (mode === "create") {
        // Create new listing
        if (selectedFiles.length === 0) {
          toast.error("Ən azı bir şəkil əlavə etmək mütləqdir");
          setIsLoading(false);
          return;
        }

        await api_services.createListing(formData, token);
        toast.success("Elan uğurla yaradıldı");
      } else if (mode === "edit" && listing) {
        // For edit mode, check if we need to keep existing images
        if (imagePreviewUrls.length > selectedFiles.length) {
          formData.append("keepImages", "true");
        }

        // Update existing listing
        await api_services.updateListing(listing._id, formData, token);
        toast.success("Elan uğurla yeniləndi");
      }

      // Redirect to admin dashboard
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Elanı yadda saxlamaq mümkün olmadı");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Başlıq
            </label>
            <Input
              id="title"
              placeholder="Elan başlığını daxil edin"
              {...register("title", { required: "Başlıq tələb olunur" })}
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Təsvir
            </label>
            <Textarea
              id="description"
              placeholder="Elanın təsvirini daxil edin"
              className="min-h-[120px]"
              {...register("description", { required: "Təsvir tələb olunur" })}
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Qiymət (AZN/Gün)
            </label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Günlük qiyməti daxil edin"
              {...register("price", {
                required: "Qiymət tələb olunur",
                min: { value: 0, message: "Qiymət 0-dan böyük olmalıdır" },
              })}
              disabled={isLoading}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Kateqoriya
            </label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              {...register("category", { required: "Kateqoriya tələb olunur" })}
              disabled={isLoading}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Business Profile seçimi */}
          <div className="space-y-2">
            <label htmlFor="businessProfileId" className="text-sm font-medium">
              Biznes profili seçin
            </label>
            <select
              id="businessProfileId"
              className="w-full border rounded px-3 py-2 text-sm"
              {...register("businessProfileId")}
              disabled={isLoading || businessProfiles.length === 0}
              defaultValue={businessProfileIdWatch || ""}
            >
              <option value="">Profil seçilməyib</option>
              {businessProfiles.map((profile) => (
                <option key={profile._id} value={profile._id}>
                  {profile.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {/* Images upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Şəkillər</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {imagePreviewUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square w-full border rounded-lg overflow-hidden group"
                >
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {/* Add image button */}
              <div
                className="border-2 border-dashed rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mb-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Şəkil əlavə et
                </span>
                <p className="text-xs mt-1 text-muted-foreground">
                  JPEG, PNG, WebP • Maks 5MB
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleImageChange}
              disabled={isLoading}
              multiple
            />
            {mode === "create" && imagePreviewUrls.length === 0 && (
              <p className="text-sm text-red-500">
                Ən azı bir şəkil tələb olunur
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-medium">Əlaqə məlumatları</h3>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email ünvanı daxil edin"
                {...register("email", {
                  required: "Email tələb olunur",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Düzgün email formatı deyil",
                  },
                })}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Telefon
              </label>
              <Input
                id="phone"
                placeholder="Telefon nömrəsi daxil edin"
                {...register("phone", { required: "Telefon tələb olunur" })}
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="font-medium">Status</h3>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register("isActive")}
                disabled={isLoading}
              />
              <label
                htmlFor="isActive"
                className={`text-sm ${
                  isActiveWatch ? "text-green-600 font-medium" : "text-red-600"
                }`}
              >
                {isActiveWatch ? "Aktiv" : "Deaktiv"}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/dashboard")}
          disabled={isLoading}
        >
          Ləğv et
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? mode === "create"
              ? "Yaradılır..."
              : "Yenilənir..."
            : mode === "create"
            ? "Yarat"
            : "Yenilə"}
        </Button>
      </div>
    </form>
  );
}

export { ListingForm };
