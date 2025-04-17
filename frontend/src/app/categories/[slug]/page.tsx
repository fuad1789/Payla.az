import { Metadata } from "next";
import { getCategoryBySlug, getPostsByCategory } from "@/lib/api";
import { Post } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return {
      title: "Category Not Found | Payla.az",
      description: "The requested category could not be found.",
    };
  }
  return {
    title: `${category.name} | Payla.az`,
    description: category.description || "",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log("Fetching category with slug:", params.slug);
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    console.log("Category not found");
    notFound();
  }

  console.log("Category found:", category);
  const posts = await getPostsByCategory(category._id);
  console.log("Posts found:", posts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category.name}</h1>
      {category.description && (
        <p className="text-gray-600 mb-8">{category.description}</p>
      )}

      {!posts || posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No listings found in this category.
          </p>
          <Link
            href="/create-listing"
            className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Create First Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: Post) => (
            <Link
              key={post._id}
              href={`/posts/${post.slug}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              {post.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
