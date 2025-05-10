"use client";

import { useState, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Image from "next/image";
import { categories, Listing } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

interface SwipeListingCardProps {
  listings: Listing[];
}

function SwipeListingCard({ listings }: SwipeListingCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRefs = useRef<(TinderCard | null)[]>([]);

  useEffect(
    function () {
      if (currentIndex >= listings.length) setIsFinished(true);
      else setIsFinished(false);
    },
    [currentIndex, listings.length]
  );

  function handleSwipe(direction: string, id: string) {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);

    if (direction === "right") {
      addToLocalStorageArray("likedItems", id);
    } else if (direction === "left") {
      addToLocalStorageArray("skippedItems", id);
    }
    setHistory((prev) => [...prev, currentIndex]);
    setCurrentIndex((prev) => prev + 1);
  }

  function handleBack() {
    if (history.length === 0) return;
    setCurrentIndex(history[history.length - 1]);
    setHistory((prev) => prev.slice(0, -1));
  }

  if (!listings || listings.length === 0)
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-semibold mb-2">Elan tapılmadı</h3>
        <p className="text-muted-foreground">Bu kateqoriyada elan yoxdur.</p>
      </div>
    );

  if (isFinished)
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <span className="text-3xl mb-4">🎉</span>
        <h3 className="text-lg font-semibold mb-2">Bütün elanlara baxdınız</h3>
        <button
          className="mt-4 px-4 py-2 rounded-xl bg-primary text-white shadow-md"
          onClick={function () {
            setCurrentIndex(0);
            setHistory([]);
          }}
        >
          Yenidən bax
        </button>
      </div>
    );

  const listing = listings[currentIndex];
  const category = categories.find((cat) => cat.id === listing.category);
  const imageSrc =
    listing.images && listing.images.length > 0
      ? listing.images[0]
      : "/placeholder-image.svg";

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center">
      <div className="relative w-full h-[420px]">
        <TinderCard
          ref={(el) => (cardRefs.current[currentIndex] = el)}
          key={listing._id}
          onSwipe={(dir) => handleSwipe(dir, listing._id)}
          preventSwipe={["up", "down"]}
          className="absolute w-full h-full"
        >
          <div className="rounded-xl shadow-md bg-white p-4 w-full h-full flex flex-col transition-all duration-300">
            <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4">
              <Image
                src={imageSrc}
                alt={listing.title}
                fill
                className="object-cover rounded-xl"
                loading="lazy"
                quality={85}
                sizes="100vw"
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{category?.emoji}</span>
              <span className="text-base font-medium text-gray-600">
                {category?.name}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {listing.title}
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary text-lg font-bold">
                {formatPrice(listing.price)}
                <span className="text-xs font-normal">/gün</span>
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
          </div>
        </TinderCard>
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md text-xl z-10 transition-all hover:bg-white"
          onClick={handleBack}
          aria-label="Geri qayıt"
          disabled={history.length === 0 || isAnimating}
        >
          ←
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        {currentIndex + 1} / {listings.length}
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

export { SwipeListingCard };
