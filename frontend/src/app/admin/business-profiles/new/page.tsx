"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewBusinessProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        toast.error("Admin girişi tələb olunur");
        router.push("/admin");
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business-profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          slug: form.slug || undefined,
          description: form.description,
          imageUrl: form.imageUrl || undefined,
        }),
      });
      if (res.ok) {
        toast.success("Biznes profili əlavə olundu");
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        toast.error(data.message || "Xəta baş verdi");
      }
    } catch (error) {
      toast.error("Xəta baş verdi");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container py-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Yeni Biznes Profili Əlavə Et</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Ad *</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Slug (istəyə bağlı)</label>
          <Input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="gunes-geyimleri"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Təsvir *</label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Şəkil linki (istəyə bağlı)
          </label>
          <Input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Yüklənir..." : "Əlavə et"}
        </Button>
      </form>
    </div>
  );
}
