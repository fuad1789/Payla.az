"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("../../components/NavBar"), { ssr: false });

interface Listing {
  _id: string;
  title: string;
  description: string;
  image: string;
  pricePerDay: number;
  owner: {
    name: string;
    email: string;
  };
}

export default function ListingDetailPage() {
  const [listing, setListing] = useState<Listing | null>(null);
  const [ownerEmail, setOwnerEmail] = useState<string | null>(null);
  const [showEmail, setShowEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContacting, setIsContacting] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/listings/${id}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setListing(data.data.listing);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleContactOwner = async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    setIsContacting(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/listings/${id}/owner-email`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setOwnerEmail(data.data.email);
        setShowEmail(true);
      }
    } catch (error) {
      console.error("Error fetching owner email:", error);
    } finally {
      setIsContacting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          <p className="text-gray-600">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-2 mb-4">Listing Not Found</h1>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="card overflow-hidden">
                <div className="relative h-96 w-full">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="heading-2 mb-2">{listing.title}</h1>
                  <p className="text-body text-gray-600">
                    {listing.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-small text-gray-500">Price per day</p>
                    <p className="text-2xl font-bold text-primary-600">
                      ${listing.pricePerDay}
                    </p>
                  </div>
                  <div>
                    <p className="text-small text-gray-500">Owner</p>
                    <p className="text-body font-medium">
                      {listing.owner.name}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  {showEmail ? (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-small text-gray-500 mb-1">
                          Owner's Email
                        </p>
                        <p className="text-body font-medium">{ownerEmail}</p>
                      </div>
                      <Link
                        href={`mailto:${ownerEmail}`}
                        className="btn btn-primary w-full"
                      >
                        Send Email
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleContactOwner}
                      className="btn btn-primary w-full"
                      disabled={isContacting}
                    >
                      {isContacting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                          Contacting...
                        </div>
                      ) : (
                        "Contact Owner"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
