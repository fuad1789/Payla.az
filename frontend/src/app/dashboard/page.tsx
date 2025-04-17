"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ListingCard from "@/components/dashboard/ListingCard";
import EditListingModal from "@/components/dashboard/EditListingModal";
import StatsModal from "@/components/dashboard/StatsModal";
import { Listing } from "@/types/listing";
import axiosInstance from "@/lib/axios";

export default function DashboardPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      fetchUserListings();
    }
  }, [authLoading]);

  const fetchUserListings = async () => {
    try {
      setError(null);
      const response = await axiosInstance.get("/api/dashboard/listings");
      if (response.data.success) {
        setListings(response.data.data);
      } else {
        setError("Failed to fetch listings");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Error fetching listings");
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (listing: Listing) => {
    setSelectedListing(listing);
    setIsEditModalOpen(true);
  };

  const handleViewStats = (listing: Listing) => {
    setSelectedListing(listing);
    setIsStatsModalOpen(true);
  };

  const handleListingUpdate = async (updatedListing: Listing) => {
    try {
      setError(null);
      const response = await axiosInstance.put(
        `/api/listings/${updatedListing._id}`,
        updatedListing
      );

      if (response.data.success || response.status === 200) {
        setListings(
          listings.map((listing) =>
            listing._id === updatedListing._id ? updatedListing : listing
          )
        );
        setIsEditModalOpen(false);
      } else {
        setError(response.data.message || "Failed to update listing");
      }
    } catch (error: any) {
      if (error.response?.status !== 200) {
        setError(error.response?.data?.message || "Error updating listing");
        console.error("Error updating listing:", error);
      } else {
        setListings(
          listings.map((listing) =>
            listing._id === updatedListing._id ? updatedListing : listing
          )
        );
        setIsEditModalOpen(false);
      }
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Listings Dashboard</h1>

      {listings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't created any listings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              onEdit={() => handleEdit(listing)}
              onViewStats={() => handleViewStats(listing)}
            />
          ))}
        </div>
      )}

      {isEditModalOpen && selectedListing && (
        <EditListingModal
          listing={selectedListing}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleListingUpdate}
        />
      )}

      {isStatsModalOpen && selectedListing && (
        <StatsModal
          listing={selectedListing}
          isOpen={isStatsModalOpen}
          onClose={() => setIsStatsModalOpen(false)}
        />
      )}
    </div>
  );
}
