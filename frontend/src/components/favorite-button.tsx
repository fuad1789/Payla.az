"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { isFavorite, addToFavorites, removeFromFavorites } from "@/lib/utils";

interface FavoriteButtonProps {
  listingId: string;
  variant?: "default" | "outline" | "ghost";
}

function FavoriteButton({ listingId, variant = "ghost" }: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);

  // Initialize favorite status
  useEffect(() => {
    setIsFav(isFavorite(listingId));
  }, [listingId]);

  // Toggle favorite status
  function toggleFavorite() {
    if (isFav) {
      removeFromFavorites(listingId);
      setIsFav(false);
    } else {
      addToFavorites(listingId);
      setIsFav(true);
    }
  }

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleFavorite}
      className="rounded-full"
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={isFav ? "fill-red-500 text-red-500" : "text-gray-500"}
        size={20}
      />
    </Button>
  );
}

export { FavoriteButton };
