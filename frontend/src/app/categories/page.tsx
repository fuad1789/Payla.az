import { Metadata } from "next";
import { getCategories } from "@/lib/api";
import { Category } from "@/types";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories | Payla.az",
  description: "Browse all categories on Payla.az",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: Category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
