import axios from "axios";

// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Category types
export type Category = {
  id: string;
  name: string;
  emoji: string;
};

// Listing type
export interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  views: number;
  contacts: number;
  contactInfo: {
    email: string;
    phone: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API functions
export const api_services = {
  // Get all listings with optional filter
  async getListings(page = 1, limit = 10, category?: string) {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (category) params.append("category", category);

    const response = await api.get(`/listings?${params.toString()}`);
    return response.data;
  },

  // Get a single listing by ID
  async getListingById(id: string) {
    const response = await api.get(`/listings/${id}`);
    return response.data as Listing;
  },

  // Increment contact count
  async incrementContactCount(id: string) {
    const response = await api.post(`/listings/${id}/contact`);
    return response.data;
  },

  // Admin login
  async adminLogin(username: string, password: string) {
    const response = await api.post("/admin/login", { username, password });
    return response.data;
  },

  // Create a new listing (admin only)
  async createListing(formData: FormData, token: string) {
    const response = await api.post("/listings", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update a listing (admin only)
  async updateListing(id: string, formData: FormData, token: string) {
    const response = await api.put(`/listings/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete a listing (admin only)
  async deleteListing(id: string, token: string) {
    const response = await api.delete(`/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

// Get categories
export const categories: Category[] = [
  {
    id: "wedding-dresses",
    name: "Gəlinliklər",
    emoji: "👰‍♀️",
  },
  {
    id: "men-suits",
    name: "Kişi kostyumları",
    emoji: "🤵",
  },
  {
    id: "women-clothing",
    name: "Qadın geyimləri",
    emoji: "👗",
  },
  {
    id: "shoes",
    name: "Ayaqqabılar",
    emoji: "👠",
  },
  {
    id: "jewelry",
    name: "Zinət əşyaları",
    emoji: "💍",
  },
  {
    id: "bags-accessories",
    name: "Çantalar və aksesuarlar",
    emoji: "👜",
  },
  {
    id: "kids-clothing",
    name: "Uşaq geyimləri",
    emoji: "👶",
  },
  {
    id: "themed-clothing",
    name: "Tematik geyimlər",
    emoji: "🎭",
  },
];

export default api_services;
