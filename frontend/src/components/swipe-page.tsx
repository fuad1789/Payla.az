"use client";

import { useEffect, useState, useRef } from "react";
import { Listing, categories, api_services } from "@/lib/api";
import { addToFavorites } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";

interface SwipeCardProps {
  listing: Listing;
  onSwipe: (liked: boolean, id: string) => void;
  showOverlay: "like" | "dislike" | null;
  onDragX?: (x: number) => void;
}

function SwipeCard({ listing, onSwipe, showOverlay, onDragX }: SwipeCardProps) {
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const category = categories.find((cat) => cat.id === listing.category);
  const imageSrc =
    listing.images && listing.images.length > 0
      ? listing.images[0]
      : "/placeholder-image.svg";

  function handleDrag(event: any, info: any) {
    setDrag({ x: info.offset.x, y: info.offset.y });
    setIsDragging(true);
    if (onDragX) onDragX(info.offset.x);
  }

  function handleDragEnd(event: any, info: any) {
    setIsDragging(false);
    if (info.offset.x > 120) onSwipe(true, listing._id);
    else if (info.offset.x < -120) onSwipe(false, listing._id);
    else setDrag({ x: 0, y: 0 });
    if (onDragX) onDragX(0);
  }

  useEffect(() => {
    if (!isDragging && drag.x !== 0) {
      const timeout = setTimeout(() => setDrag({ x: 0, y: 0 }), 180);
      return () => clearTimeout(timeout);
    }
  }, [isDragging, drag.x]);

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full h-full flex flex-col items-center justify-center"
      style={{
        touchAction: "pan-y",
        background:
          drag.x > 30
            ? "rgba(34,197,94,0.32)" // yaşıl
            : drag.x < -30
            ? "rgba(239,68,68,0.32)" // qırmızı
            : undefined,
      }}
      drag="x"
      dragElastic={0.5}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={{ x: drag.x, y: drag.y, rotate: drag.x / 20 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      initial={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
    >
      <div className="relative w-full max-w-sm h-[520px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="relative w-full h-72">
          <Image
            src={imageSrc}
            alt={listing.title}
            fill
            className="object-cover pointer-events-none"
            quality={85}
            sizes="100vw"
            loading="lazy"
          />
          {showOverlay === "like" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-6 left-6 z-10 pointer-events-none"
            >
              <span className="text-3xl font-bold text-green-500 bg-white/80 px-4 py-2 rounded-xl border-4 border-green-500 rotate-[-12deg] shadow-lg">
                Bəyəndim
              </span>
            </motion.div>
          )}
          {showOverlay === "dislike" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-6 right-6 z-10 pointer-events-none"
            >
              <span className="text-3xl font-bold text-red-500 bg-white/80 px-4 py-2 rounded-xl border-4 border-red-500 rotate-[12deg] shadow-lg">
                Bəyənmədim
              </span>
            </motion.div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{category?.emoji}</span>
            <span className="text-base font-medium text-gray-600">
              {category?.name}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
            {listing.title}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary text-lg font-bold">
              {listing.price} ₼<span className="text-xs font-normal">/gün</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center text-gray-500 text-sm">
                <span className="mr-1">👁</span>
                {listing.views}
              </span>
              <span className="flex items-center text-gray-500 text-sm">
                <span className="mr-1">❤️</span>
                {listing.contacts}
              </span>
            </div>
          </div>
          <div className="mt-auto flex justify-center gap-8">
            <button
              className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl text-red-500 shadow-md hover:bg-red-200 transition-all"
              onClick={() => onSwipe(false, listing._id)}
              aria-label="Bəyənmədim"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl text-green-500 shadow-md hover:bg-green-200 transition-all"
              onClick={() => onSwipe(true, listing._id)}
              aria-label="Bəyəndim"
            >
              <Heart className="w-8 h-8 fill-green-500 text-green-500" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SwipePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [current, setCurrent] = useState(0);
  const [overlay, setOverlay] = useState<"like" | "dislike" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [dragX, setDragX] = useState(0);

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

  function handleDragX(x: number) {
    setDragX(x);
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
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-8 overflow-hidden"
      style={{
        background:
          dragX > 30
            ? "rgba(34,197,94,0.32)"
            : dragX < -30
            ? "rgba(239,68,68,0.32)"
            : "#f7f8fa",
      }}
    >
      <div className="relative w-full max-w-sm h-[520px]">
        <AnimatePresence mode="sync">
          <SwipeCard
            key={listings[current]._id}
            listing={listings[current]}
            onSwipe={handleSwipe}
            showOverlay={overlay}
            onDragX={handleDragX}
          />
        </AnimatePresence>
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
