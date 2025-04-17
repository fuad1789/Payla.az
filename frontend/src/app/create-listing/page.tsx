"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("../components/NavBar"), { ssr: false });

interface Category {
  _id: string;
  name: string;
  icon: string;
  slug: string;
}

export default function CreateListingPage() {
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
        );
        const data = await response.json();
        console.log("Fetched categories:", data); // Debug log
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Error loading categories");
      }
    };

    if (!token) {
      router.push("/login");
    } else {
      fetchCategories();
      setIsLoading(false);
    }
  }, [token, router]);

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
      const response = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
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
        router.push("/");
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
          <p className="text-gray-600">Yüklənir...</p>
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
              <h1 className="heading-2 mb-2">Yeni Elan Yarat</h1>
              <p className="text-body text-gray-600">
                Məhsulunuzu icma ilə bölüşün və qazanc əldə etməyə başlayın
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
                    Kateqoriya
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className={`input ${error ? "input-error" : ""}`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Kateqoriya seçin</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Başlıq
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className={`input ${error ? "input-error" : ""}`}
                    placeholder="Təsvir edici başlıq daxil edin"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Təsvir
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    className={`input ${error ? "input-error" : ""}`}
                    placeholder="Məhsulunuzu ətraflı təsvir edin"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image" className="form-label">
                    Şəkil URL-i
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="url"
                    required
                    className={`input ${error ? "input-error" : ""}`}
                    placeholder="Şəkil URL-i daxil edin"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pricePerDay" className="form-label">
                    Günlük qiymət (₺)
                  </label>
                  <input
                    id="pricePerDay"
                    name="pricePerDay"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className={`input ${error ? "input-error" : ""}`}
                    placeholder="Günlük qiyməti daxil edin"
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
                      Elan yaradılır...
                    </div>
                  ) : (
                    "Elan Yarat"
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
