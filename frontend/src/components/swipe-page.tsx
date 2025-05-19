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
  onDetail: (listing: Listing) => void;
}

function SwipeCard({
  listing,
  onSwipe,
  showOverlay,
  onDetail,
}: SwipeCardProps) {
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDetailDrag, setIsDetailDrag] = useState(false);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragOverlay, setDragOverlay] = useState<"like" | "dislike" | null>(
    null
  );
  const imageSrc =
    listing.images && listing.images.length > 0
      ? listing.images[0]
      : "/placeholder-image.svg";

  // Animasiya üçün state
  const [animatePulse, setAnimatePulse] = useState(false);

  // Hint animasiyası üçün effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatePulse((prev) => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  function handleMouseDown(e: React.MouseEvent) {
    setIsDragging(true);
    setIsDetailDrag(false);
    startX.current = e.clientX;
    startY.current = e.clientY;
  }

  function handleTouchStart(e: React.TouchEvent) {
    setIsDragging(true);
    setIsDetailDrag(false);
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || startX.current === null || startY.current === null)
        return;
      e.preventDefault();
      const deltaX = e.clientX - startX.current;
      const deltaY = e.clientY - startY.current;
      setDragX(deltaX);
      setDragY(deltaY);
      if (deltaY < -40 && Math.abs(deltaY) > Math.abs(deltaX)) {
        setIsDetailDrag(true);
        setDragOverlay(null);
        return;
      }
      setIsDetailDrag(false);
      if (deltaX > 30) setDragOverlay("like");
      else if (deltaX < -30) setDragOverlay("dislike");
      else setDragOverlay(null);
    },
    [isDragging]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || startX.current === null || startY.current === null)
        return;
      e.preventDefault();
      const deltaX = e.touches[0].clientX - startX.current;
      const deltaY = e.touches[0].clientY - startY.current;
      setDragX(deltaX);
      setDragY(deltaY);
      if (deltaY < -40 && Math.abs(deltaY) > Math.abs(deltaX)) {
        setIsDetailDrag(true);
        setDragOverlay(null);
        return;
      }
      setIsDetailDrag(false);
      if (deltaX > 30) setDragOverlay("like");
      else if (deltaX < -30) setDragOverlay("dislike");
      else setDragOverlay(null);
    },
    [isDragging]
  );

  // Native event handler-lar (yalnız useEffect üçün)
  const handleMouseMoveNative = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || startX.current === null || startY.current === null)
        return;
      const deltaX = e.clientX - startX.current;
      const deltaY = e.clientY - startY.current;
      setDragX(deltaX);
      setDragY(deltaY);
      if (deltaY < -40 && Math.abs(deltaY) > Math.abs(deltaX)) {
        setIsDetailDrag(true);
        setDragOverlay(null);
        return;
      }
      setIsDetailDrag(false);
      if (deltaX > 30) setDragOverlay("like");
      else if (deltaX < -30) setDragOverlay("dislike");
      else setDragOverlay(null);
    },
    [isDragging]
  );

  const handleTouchMoveNative = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || startX.current === null || startY.current === null)
        return;
      const deltaX = e.touches[0].clientX - startX.current;
      const deltaY = e.touches[0].clientY - startY.current;
      setDragX(deltaX);
      setDragY(deltaY);
      if (deltaY < -40 && Math.abs(deltaY) > Math.abs(deltaX)) {
        setIsDetailDrag(true);
        setDragOverlay(null);
        return;
      }
      setIsDetailDrag(false);
      if (deltaX > 30) setDragOverlay("like");
      else if (deltaX < -30) setDragOverlay("dislike");
      else setDragOverlay(null);
    },
    [isDragging]
  );

  function handleMouseUp() {
    setIsDragging(false);
    if (isDetailDrag && dragY < -80) {
      setDragX(0);
      setDragY(0);
      setIsDetailDrag(false);
      setDragOverlay(null);
      onDetail(listing);
      return;
    }
    if (!isDetailDrag && dragX > 30) {
      setDragX(600);
      setTimeout(() => onSwipe(true, listing._id), 350);
    } else if (!isDetailDrag && dragX < -30) {
      setDragX(-600);
      setTimeout(() => onSwipe(false, listing._id), 350);
    } else {
      setDragX(0);
      setDragY(0);
      setIsDetailDrag(false);
      setDragOverlay(null);
    }
  }

  function handleTouchEnd() {
    setIsDragging(false);
    if (isDetailDrag && dragY < -80) {
      setDragX(0);
      setDragY(0);
      setIsDetailDrag(false);
      setDragOverlay(null);
      onDetail(listing);
      return;
    }
    if (!isDetailDrag && dragX > 30) {
      setDragX(600);
      setTimeout(() => onSwipe(true, listing._id), 350);
    } else if (!isDetailDrag && dragX < -30) {
      setDragX(-600);
      setTimeout(() => onSwipe(false, listing._id), 350);
    } else {
      setDragX(0);
      setDragY(0);
      setIsDetailDrag(false);
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
  const rotate = isDetailDrag ? 0 : dragX / 8;
  const scale = isDragging ? 1.03 : dragX !== 0 ? 0.95 : 1;
  const boxShadow =
    isDragging || dragX !== 0
      ? "0 12px 32px 0 rgba(0,0,0,0.18), 0 1.5px 6px 0 rgba(0,0,0,0.10)"
      : "0 4px 16px 0 rgba(0,0,0,0.10)";

  // Yuxarı swipe zamanı kart yuxarıya getsin və opacity azalsın
  const cardTransform = isDetailDrag
    ? `translateY(${dragY}px) scale(${scale})`
    : `translateX(${dragX}px) rotate(${rotate}deg) scale(${scale})`;
  const cardTransition = isDragging
    ? "none"
    : dragX !== 0 || dragY !== 0
    ? "transform 0.5s cubic-bezier(.22,1,.36,1)"
    : "transform 0.3s cubic-bezier(.22,1,.36,1)";
  const cardOpacity = isDetailDrag ? Math.max(1 + dragY / 200, 0.5) : 1;

  return (
    <div
      ref={cardRef}
      className="absolute w-full h-full flex flex-col items-center justify-end cursor-grab overflow-hidden"
      style={{
        transform: cardTransform,
        opacity: cardOpacity,
        transition: cardTransition,
        zIndex: 10,
        background:
          dragX > 30 && !isDetailDrag
            ? "rgba(34,197,94,0.18)"
            : dragX < -30 && !isDetailDrag
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
        {/* Daha görünən və mərkəzdə olan swipe up hint */}
        {!isDragging && !isDetailDrag && (
          <div
            className={`absolute top-6 right-6 z-30 select-none pointer-events-none flex flex-col items-center transition-transform duration-700 ease-in-out ${
              animatePulse ? "translate-y-[-5px]" : "translate-y-[0px]"
            }`}
          >
            <div className="bg-white/90 p-2.5 rounded-full shadow-md flex items-center justify-center mb-1">
              <svg
                width="28"
                height="28"
                viewBox="0 0 30 30"
                className="text-teal-500"
              >
                <g>
                  <path
                    d="M12.13 17.203c-.274 1.33-.13 2.642.589 3.632l.875 1.204c.974 1.34 4.006 2.5 4.545 2.72.88.36 2.272.847 3.36 1.174a.5.5 0 0 0 .283-.96 54.244 54.244 0 0 1-3.272-1.143c-.519-.207-3.336-1.319-4.107-2.379l-.875-1.204c-.528-.726-.635-1.717-.416-2.855.038-.201.118-.517.213-.827l1.81 2.488a.5.5 0 0 0 .698.112c.226-.165.304-.436.112-.7L9.183 9.162A1 1 0 1 1 10.8 7.986l4.998 6.876a.5.5 0 1 0 .809-.588l-1.47-2.022a1 1 0 1 1 1.618-1.176l1.47 2.022a.5.5 0 1 0 .809-.588l-.882-1.213a1 1 0 1 1 1.618-1.176l1.47 2.022a.5.5 0 1 0 .809-.588l-.882-1.213a1 1 0 1 1 1.618-1.176l2.058 2.831c1.925 2.65 2.142 6.35 3.674 8.457a.5.5 0 1 0 .809-.588c-1.32-1.815-1.741-5.797-3.674-8.457l-2.058-2.831a2 2 0 0 0-3.496.485 2.001 2.001 0 0 0-3.015.955 2.001 2.001 0 0 0-2.965.832l-2.51-3.452A2 2 0 1 0 8.375 9.75l4.24 5.833a9.054 9.054 0 0 0-.485 1.62zM6.146 9.854a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 .708.708L4 8.707V17.5a.5.5 0 0 0 1 0V8.704z"
                    fill="#0d9488"
                  />
                </g>
              </svg>
            </div>
          </div>
        )}
        {(dragOverlay === "like" || showOverlay === "like") &&
          !isDetailDrag && (
            <div className="absolute top-6 left-6 z-10 pointer-events-none user-select-none select-none">
              <span className="text-3xl font-bold text-green-500 bg-white/80 px-4 py-2 rounded-xl border-4 border-green-500 rotate-[-12deg] shadow-lg user-select-none select-none">
                Bəyəndim
              </span>
            </div>
          )}
        {(dragOverlay === "dislike" || showOverlay === "dislike") &&
          !isDetailDrag && (
            <div className="absolute top-6 right-6 z-10 pointer-events-none user-select-none select-none">
              <span className="text-3xl font-bold text-red-500 bg-white/80 px-4 py-2 rounded-xl border-4 border-red-500 rotate-[12deg] shadow-lg user-select-none select-none">
                Bəyənmədim
              </span>
            </div>
          )}
        {/* Yuxarı swipe zamanı overlay */}
        {isDetailDrag && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="flex flex-col items-center">
              <span
                className="bg-white/95 border-2 border-green-400 rounded-2xl px-8 py-2 shadow-xl text-3xl font-bold text-green-500 leading-tight text-center select-none"
                style={{ lineHeight: "1.1" }}
              >
                Ətraflı
                <br />
                məlumat
              </span>
            </div>
          </div>
        )}
        {/* Bəyəndim/Bəyənmədim ikonları və ortada qiymət */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center items-center gap-8 w-full z-20">
          <button
            className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl text-red-500 shadow-md hover:bg-red-200 transition-all user-select-none select-none"
            onClick={() => onSwipe(false, listing._id)}
            aria-label="Bəyənmədim"
            disabled={isDetailDrag}
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
            disabled={isDetailDrag}
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
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  useEffect(function () {
    api_services.getListings(1, 100).then((data) => {
      setListings(data.listings);
      setIsLoading(false);
    });
  }, []);

  function handleSwipe(liked: boolean, id: string) {
    setOverlay(null);
    if (current + 1 >= listings.length) setIsFinished(true);
    setCurrent((prev) => prev + 1);
    if (liked) {
      addToLocalStorageArray("likedItems", id);
      addToFavorites(id);
    } else addToLocalStorageArray("skippedItems", id);
  }

  function handleDetail(listing: Listing) {
    setSelectedListing(listing);
    setIsDetailOpen(true);
  }

  function handleCloseDetail() {
    setIsDetailOpen(false);
    setSelectedListing(null);
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
    <div className="fixed inset-0 w-full h-full max-h-screen flex flex-col items-center justify-start py-0 overflow-hidden touch-none bg-[#f7f8fa]">
      <a
        href="/"
        className="fixed top-6 left-6 z-30 p-2 rounded-full bg-white/80 text-primary hover:bg-primary hover:text-white transition-colors shadow"
        aria-label="Ana ekrana qayıt"
      >
        <ArrowLeft className="w-6 h-6" />
      </a>
      <div className="relative w-full max-w-sm h-[520px] mb-16 mt-auto">
        <SwipeCard
          key={listings[current]._id}
          listing={listings[current]}
          onSwipe={handleSwipe}
          showOverlay={overlay && current < listings.length ? overlay : null}
          onDetail={handleDetail}
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
      {isDetailOpen && selectedListing && (
        <DetailModal listing={selectedListing} onClose={handleCloseDetail} />
      )}
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

function DetailModal({
  listing,
  onClose,
}: {
  listing: Listing;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-primary"
          onClick={onClose}
          aria-label="Bağla"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col gap-4">
          <div className="w-full flex gap-2 overflow-x-auto pb-2">
            {listing.images && listing.images.length > 0 ? (
              listing.images.map((img, idx) => (
                <Image
                  key={img + idx}
                  src={img}
                  alt={`listing-image-${idx}`}
                  width={180}
                  height={140}
                  className="rounded-lg object-cover flex-shrink-0"
                />
              ))
            ) : (
              <Image
                src="/placeholder-image.svg"
                alt="placeholder"
                width={180}
                height={140}
                className="rounded-lg object-cover flex-shrink-0"
              />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{listing.title}</h2>
            <div className="text-lg font-semibold text-primary mb-2">
              {listing.price} ₼
            </div>
            <div className="text-gray-700 mb-2">{listing.description}</div>
            <div className="text-sm text-gray-500">
              <div>Email: {listing.contactInfo?.email}</div>
              <div>Telefon: {listing.contactInfo?.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SwipePage };
