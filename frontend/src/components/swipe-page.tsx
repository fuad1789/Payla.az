"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Listing, categories, api_services } from "@/lib/api";
import { addToFavorites } from "@/lib/utils";
import Image from "next/image";
import { X, Heart, ArrowLeft } from "lucide-react";

interface SwipeCardProps {
  listing: Listing;
  onSwipe: (liked: boolean, id: string) => void;
  showOverlay: "like" | "dislike" | null;
}

function SwipeCard({ listing, onSwipe, showOverlay }: SwipeCardProps) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragOverlay, setDragOverlay] = useState<"like" | "dislike" | null>(
    null
  );
  const imageSrc =
    listing.images && listing.images.length > 0
      ? listing.images[0]
      : "/placeholder-image.svg";

  function handleMouseDown(e: React.MouseEvent) {
    setIsDragging(true);
    startX.current = e.clientX;
  }

  function handleTouchStart(e: React.TouchEvent) {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || startX.current === null) return;
      e.preventDefault();
      const deltaX = e.clientX - startX.current;
      setDragX(deltaX);
      if (deltaX > 30) setDragOverlay("like");
      else if (deltaX < -30) setDragOverlay("dislike");
      else setDragOverlay(null);
    },
    [isDragging]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || startX.current === null) return;
      e.preventDefault();
      const deltaX = e.touches[0].clientX - startX.current;
      setDragX(deltaX);
      if (deltaX > 30) setDragOverlay("like");
      else if (deltaX < -30) setDragOverlay("dislike");
      else setDragOverlay(null);
    },
    [isDragging]
  );

  // Native event handler-lar (yalnız useEffect üçün)
  const handleMouseMoveNative = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || startX.current === null) return;
      const deltaX = e.clientX - startX.current;
      setDragX(deltaX);
      if (deltaX > 30) setDragOverlay("like");
      else if (deltaX < -30) setDragOverlay("dislike");
      else setDragOverlay(null);
    },
    [isDragging]
  );

  const handleTouchMoveNative = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || startX.current === null) return;
      const deltaX = e.touches[0].clientX - startX.current;
      setDragX(deltaX);
      if (deltaX > 30) setDragOverlay("like");
      else if (deltaX < -30) setDragOverlay("dislike");
      else setDragOverlay(null);
    },
    [isDragging]
  );

  function handleMouseUp() {
    setIsDragging(false);
    if (dragX > 120) {
      setDragX(600);
      setTimeout(() => onSwipe(true, listing._id), 350);
    } else if (dragX < -120) {
      setDragX(-600);
      setTimeout(() => onSwipe(false, listing._id), 350);
    } else {
      setDragX(0);
      setDragOverlay(null);
    }
  }

  function handleTouchEnd() {
    setIsDragging(false);
    if (dragX > 120) {
      setDragX(600);
      setTimeout(() => onSwipe(true, listing._id), 350);
    } else if (dragX < -120) {
      setDragX(-600);
      setTimeout(() => onSwipe(false, listing._id), 350);
    } else {
      setDragX(0);
      setDragOverlay(null);
    }
  }

  useEffect(() => {
    if (!isDragging) {
      window.removeEventListener("mousemove", handleMouseMoveNative);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMoveNative);
      window.removeEventListener("touchend", handleTouchEnd);
    }
  }, [
    isDragging,
    handleMouseMoveNative,
    handleMouseUp,
    handleTouchMoveNative,
    handleTouchEnd,
  ]);

  // Yarım dairə effekti üçün rotate dəyəri
  const rotate = dragX / 8;
  const scale = isDragging ? 1.03 : dragX !== 0 ? 0.95 : 1;
  const boxShadow =
    isDragging || dragX !== 0
      ? "0 12px 32px 0 rgba(0,0,0,0.18), 0 1.5px 6px 0 rgba(0,0,0,0.10)"
      : "0 4px 16px 0 rgba(0,0,0,0.10)";

  return (
    <div
      ref={cardRef}
      className="absolute w-full h-full flex flex-col items-center justify-end cursor-grab overflow-hidden"
      style={{
        transform: `translateX(${dragX}px) rotate(${rotate}deg) scale(${scale})`,
        transition: isDragging
          ? "none"
          : dragX !== 0
          ? "transform 0.5s cubic-bezier(.22,1,.36,1)"
          : "transform 0.3s cubic-bezier(.22,1,.36,1)",
        zIndex: 10,
        background:
          dragX > 30
            ? "rgba(34,197,94,0.18)"
            : dragX < -30
            ? "rgba(239,68,68,0.18)"
            : undefined,
        boxShadow,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={isDragging ? handleMouseUp : undefined}
      onMouseLeave={isDragging ? handleMouseUp : undefined}
      onTouchStart={handleTouchStart}
      onTouchMove={isDragging ? handleTouchMove : undefined}
      onTouchEnd={isDragging ? handleTouchEnd : undefined}
    >
      <div className="relative w-full max-w-sm h-[520px] bg-transparent rounded-2xl shadow-xl overflow-hidden flex flex-col user-select-none select-none overflow-hidden">
        <Image
          src={imageSrc}
          alt="listing-image"
          fill
          className="object-cover pointer-events-none user-select-none select-none"
          quality={85}
          sizes="100vw"
          loading="lazy"
        />
        {(dragOverlay === "like" || showOverlay === "like") && (
          <div className="absolute top-6 left-6 z-10 pointer-events-none user-select-none select-none">
            <span className="text-3xl font-bold text-green-500 bg-white/80 px-4 py-2 rounded-xl border-4 border-green-500 rotate-[-12deg] shadow-lg user-select-none select-none">
              Bəyəndim
            </span>
          </div>
        )}
        {(dragOverlay === "dislike" || showOverlay === "dislike") && (
          <div className="absolute top-6 right-6 z-10 pointer-events-none user-select-none select-none">
            <span className="text-3xl font-bold text-red-500 bg-white/80 px-4 py-2 rounded-xl border-4 border-red-500 rotate-[12deg] shadow-lg user-select-none select-none">
              Bəyənmədim
            </span>
          </div>
        )}
        {/* Bəyəndim/Bəyənmədim ikonları və ortada qiymət */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center items-center gap-8 w-full z-20">
          <button
            className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl text-red-500 shadow-md hover:bg-red-200 transition-all user-select-none select-none"
            onClick={() => onSwipe(false, listing._id)}
            aria-label="Bəyənmədim"
          >
            <X className="w-8 h-8 user-select-none select-none" />
          </button>
          <div className="bg-white/80 px-4 py-2 rounded-xl shadow text-lg font-bold text-primary">
            {listing.price} ₼
          </div>
          <button
            className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl text-green-500 shadow-md hover:bg-green-200 transition-all user-select-none select-none"
            onClick={() => onSwipe(true, listing._id)}
            aria-label="Bəyəndim"
          >
            <Heart className="w-8 h-8 fill-green-500 text-green-500 user-select-none select-none" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SwipePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [current, setCurrent] = useState(0);
  const [overlay, setOverlay] = useState<"like" | "dislike" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(function () {
    api_services.getListings(1, 100).then((data) => {
      setListings(data.listings);
      setIsLoading(false);
    });
  }, []);

  function handleSwipe(liked: boolean, id: string) {
    if (current + 1 >= listings.length) setIsFinished(true);
    setCurrent((prev) => prev + 1);
    setOverlay(liked ? "like" : "dislike");
    if (liked) {
      addToLocalStorageArray("likedItems", id);
      addToFavorites(id);
    } else addToLocalStorageArray("skippedItems", id);
    setTimeout(() => {
      setOverlay(null);
    }, 350);
  }

  if (isLoading) return <div className="py-12 text-center">Yüklənir...</div>;

  if (isFinished || listings.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <span className="text-3xl mb-4">🎉</span>
        <h3 className="text-lg font-semibold mb-2">Bütün elanlara baxdınız</h3>
        <button
          className="mt-4 px-4 py-2 rounded-xl bg-primary text-white shadow-md"
          onClick={function () {
            setCurrent(0);
            setIsFinished(false);
          }}
        >
          Yenidən bax
        </button>
      </div>
    );

  return (
    <div className="fixed inset-0 w-full h-full max-h-screen flex flex-col items-center justify-center py-8 overflow-hidden touch-none bg-[#f7f8fa]">
      <a
        href="/"
        className="fixed top-6 left-6 z-30 p-2 rounded-full bg-white/80 text-primary hover:bg-primary hover:text-white transition-colors shadow"
        aria-label="Ana ekrana qayıt"
      >
        <ArrowLeft className="w-6 h-6" />
      </a>
      <div className="relative w-full max-w-sm h-[520px]">
        <SwipeCard
          key={listings[current]._id}
          listing={listings[current]}
          onSwipe={handleSwipe}
          showOverlay={overlay}
        />
        {listings[current + 1] && (
          <Image
            src={
              listings[current + 1].images &&
              listings[current + 1].images.length > 0
                ? listings[current + 1].images[0]
                : "/placeholder-image.svg"
            }
            alt="preload"
            fill
            className="hidden"
            priority={false}
            quality={40}
            sizes="100vw"
          />
        )}
      </div>
      <div className="mt-6 text-sm text-gray-500">
        {current + 1} / {listings.length}
      </div>
    </div>
  );
}

function addToLocalStorageArray(key: string, id: string) {
  if (typeof window === "undefined") return;
  const arr = JSON.parse(localStorage.getItem(key) || "[]");
  if (!arr.includes(id)) {
    arr.push(id);
    localStorage.setItem(key, JSON.stringify(arr));
  }
}

export { SwipePage };
