"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/favorite-button";
import { formatPrice } from "@/lib/utils";
import { Listing, BusinessProfile } from "@/lib/api";

// Client component props
interface ListingDetailClientProps {
  listing: Listing;
  category: { id: string; name: string; emoji: string } | undefined;
}

// Görsel galerisi component'i - Sadece ana resim
function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState<{ x: number; y: number } | null>(
    null
  );
  const [startOffset, setStartOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [wasDragged, setWasDragged] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sonraki resme git
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Önceki resme git
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Tam ekran galeriyi aç
  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // Tam ekran galeriyi kapat
  const closeGallery = () => {
    setIsOpen(false);
  };

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  const currentImage = imageError[currentIndex]
    ? "/placeholder-image.svg"
    : images[currentIndex];

  const isExternalImage = images[currentIndex]?.startsWith("http");

  // Zoom in/out toggle
  function handleImageClick() {
    if (wasDragged) {
      setWasDragged(false);
      return;
    }
    if (zoom === 1) {
      setZoom(2);
    } else {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    }
  }

  // Clamp funksiyası
  function clamp(value: number, min: number, max: number) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  // Mouse events for pan
  function handleMouseDown(e: React.MouseEvent) {
    if (zoom === 1) return;
    setIsDragging(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
    setStartOffset(offset);
    setWasDragged(false);
  }
  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging || zoom === 1 || !startDrag) return;
    const dx = e.clientX - startDrag.x;
    const dy = e.clientY - startDrag.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) setWasDragged(true);
    let newX = startOffset.x + dx;
    let newY = startOffset.y + dy;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const maxX = ((zoom - 1) * rect.width) / 2;
      const maxY = ((zoom - 1) * rect.height) / 2;
      newX = clamp(newX, -maxX, maxX);
      newY = clamp(newY, -maxY, maxY);
    }
    setOffset({ x: newX, y: newY });
  }
  function handleMouseUp() {
    setIsDragging(false);
    setStartDrag(null);
  }
  // Touch events for mobile pan
  function handleTouchStart(e: React.TouchEvent) {
    if (zoom === 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setStartDrag({ x: touch.clientX, y: touch.clientY });
    setStartOffset(offset);
    setWasDragged(false);
  }
  function handleTouchMove(e: React.TouchEvent) {
    if (!isDragging || zoom === 1 || !startDrag) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startDrag.x;
    const dy = touch.clientY - startDrag.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) setWasDragged(true);
    let newX = startOffset.x + dx;
    let newY = startOffset.y + dy;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const maxX = ((zoom - 1) * rect.width) / 2;
      const maxY = ((zoom - 1) * rect.height) / 2;
      newX = clamp(newX, -maxX, maxX);
      newY = clamp(newY, -maxY, maxY);
    }
    setOffset({ x: newX, y: newY });
  }
  function handleTouchEnd() {
    setIsDragging(false);
    setStartDrag(null);
  }
  // Reset zoom/pan on image change or gallery close
  useEffect(
    function () {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    },
    [currentIndex, isOpen]
  );

  return (
    <>
      {/* Sadece ana resim - küçük resimler kaldırıldı */}
      <div className="relative aspect-[4/3] h-full rounded-lg overflow-hidden w-full">
        <Image
          src={currentImage}
          alt="Məhsul şəkili"
          fill
          sizes="(max-width: 768px) 100vw, 75vw"
          className="object-cover cursor-pointer"
          priority
          onError={() => handleImageError(currentIndex)}
          onClick={() => openGallery(currentIndex)}
          unoptimized={isExternalImage}
          quality={isExternalImage ? undefined : 90}
        />

        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Resim numarası göstergesi */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Tam ekran galeri */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col select-none">
          <div className="flex justify-end p-4">
            <button
              className="text-white hover:text-gray-300 transition"
              onClick={closeGallery}
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            <div
              className="relative h-[80vh] w-full max-w-screen-lg flex items-center justify-center"
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={handleImageClick}
              style={{
                cursor:
                  zoom === 1 ? "zoom-in" : isDragging ? "grabbing" : "grab",
              }}
            >
              <motion.div
                animate={{
                  scale: zoom,
                  x: zoom === 1 ? 0 : offset.x,
                  y: zoom === 1 ? 0 : offset.y,
                  transition: { type: "spring", stiffness: 200, damping: 30 },
                }}
                style={{ width: "100%", height: "100%" }}
              >
                <Image
                  src={
                    imageError[currentIndex]
                      ? "/placeholder-image.svg"
                      : images[currentIndex]
                  }
                  alt={`Şəkil ${currentIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain select-none pointer-events-none"
                  onError={() => handleImageError(currentIndex)}
                  unoptimized={isExternalImage}
                  quality={isExternalImage ? undefined : 100}
                  draggable={false}
                />
              </motion.div>
            </div>

            <button
              className="absolute left-4 text-white hover:text-gray-300 transition"
              onClick={prevImage}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button
              className="absolute right-4 text-white hover:text-gray-300 transition"
              onClick={nextImage}
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </div>

          <div className="p-4 text-center text-white">
            {currentIndex + 1} / {images.length}
            {zoom > 1 && (
              <span className="ml-4 text-xs bg-black/60 px-2 py-1 rounded">
                Böyüdülmüş rejimdə: şəkli sürüşdürmək üçün mouse ilə tutub
                çəkin, yenidən klikləyin kiçilsin
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Ana istemci component'i
export function ListingDetailClient({
  listing,
  category,
}: ListingDetailClientProps) {
  return (
    <div className="container py-8">
      {/* Geri butonu */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground mb-6 hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Bütün elanlara qayıt
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Görsel Galerisi */}
        <ImageGallery images={listing.images} />

        {/* İçerik */}
        <div className="space-y-6 h-full">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            <FavoriteButton listingId={listing._id} />
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="emoji-icon">{category?.emoji}</span>
            <span>{category?.name}</span>
          </div>

          <div className="text-2xl font-bold text-primary">
            {formatPrice(listing.price)}/gün
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold mb-2">Təsvir</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold mb-3">Əlaqə məlumatları</h2>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${listing.contactInfo.phone}`}
                  className="text-primary hover:underline"
                >
                  {listing.contactInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${listing.contactInfo.email}`}
                  className="text-primary hover:underline"
                >
                  {listing.contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
            <span>
              <Eye className="inline h-4 w-4 mr-1" /> {listing.views} baxış
            </span>
            <span>
              <MessageSquare className="inline h-4 w-4 mr-1" />{" "}
              {listing.contacts} müraciət
            </span>
          </div>

          <div className="pt-6">
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                const message = encodeURIComponent(
                  `${window.location.href}\n\nMən bunu kirayələmək istəyirəm`
                );
                window.open(
                  `https://wa.me/994705157450?text=${message}`,
                  "_blank"
                );
              }}
            >
              WhatsApp ilə əlaqə saxla
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
