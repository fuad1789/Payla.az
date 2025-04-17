"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("../../../components/NavBar"), {
  ssr: false,
});

interface Category {
  _id: string;
  name: string;
  icon: string;
  slug: string;
}

interface Listing {
  _id: string;
  title: string;
  description: string;
  image: string;
  pricePerDay: number;
  category: Category;
}

export default function EditListingPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { token } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Fetch listing data
        const listingResponse = await fetch(
          `http://localhost:5000/api/listings/${id}`
        );
        const listingData = await listingResponse.json();

        if (listingData.status === "success") {
          const listing = listingData.data.listing;
          setTitle(listing.title);
          setDescription(listing.description);
          setImage(listing.image);
          setPricePerDay(listing.pricePerDay.toString());
          setCategory(listing.category._id);
        }

        // Fetch categories
        const categoriesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error loading data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, router, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      router.push("/login");
      return;
    }

    if (!category) {
      setError("Please select a category");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          image,
          category,
          pricePerDay: Number(pricePerDay),
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        router.push(`/listings/${id}`);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="heading-2 mb-2">Edit Listing</h1>
              <p className="text-body text-gray-600">
                Update your listing information
              </p>
            </div>

            <div className="card">
              <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className={`input ${error ? "input-error" : ""}`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className={`input ${error ? "input-error" : ""}`}
                    placeholder="Enter a descriptive title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    className={`input ${error ? "input-error" : ""}`}
                    placeholder="Describe your item in detail"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image" className="form-label">
                    Image URL
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="url"
                    required
                    className={`input ${error ? "input-error" : ""}`}
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pricePerDay" className="form-label">
                    Price per day (₺)
                  </label>
                  <input
                    id="pricePerDay"
                    name="pricePerDay"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className={`input ${error ? "input-error" : ""}`}
                    placeholder="Enter daily price"
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    "Update Listing"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
