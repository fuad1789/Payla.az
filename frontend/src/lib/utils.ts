import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price - use a consistent format to avoid hydration errors
export function formatPrice(price: number) {
  // Use a simple string concatenation instead of Intl.NumberFormat to ensure consistency
  return `${price} ₼`;
}

// Local storage helpers for favorites
export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];

  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

export function addToFavorites(id: string) {
  if (typeof window === "undefined") return;

  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    const newFavorites = [...favorites, id];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    return newFavorites;
  }

  return favorites;
}

export function removeFromFavorites(id: string) {
  if (typeof window === "undefined") return;

  const favorites = getFavorites();
  const newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  return newFavorites;
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}
