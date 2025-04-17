import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-4xl font-bold mb-4">Listing Not Found</h2>
      <p className="text-gray-600 mb-8">
        The listing category you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
