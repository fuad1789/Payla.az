import { useState, useEffect } from "react";
import { Listing } from "@/types/listing";

interface StatsModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

interface ContactClick {
  user: {
    name: string;
    email: string;
  };
  timestamp: string;
}

interface Stats {
  viewCount: number;
  contactClicks: ContactClick[];
}

export default function StatsModal({
  listing,
  isOpen,
  onClose,
}: StatsModalProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchStats();
    }
  }, [isOpen, listing._id]);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/listings/${listing._id}/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.error || "Failed to fetch stats");
      }
    } catch (err) {
      setError("An error occurred while fetching stats");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Listing Statistics</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : stats ? (
          <div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Views</h3>
                <p className="text-3xl font-bold text-blue-500">
                  {stats.viewCount}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Contact Clicks</h3>
                <p className="text-3xl font-bold text-green-500">
                  {stats.contactClicks.length}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Contact Click History
              </h3>
              <div className="max-h-64 overflow-y-auto">
                {stats.contactClicks.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-2">User</th>
                        <th className="pb-2">Email</th>
                        <th className="pb-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.contactClicks.map((click, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{click.user.name}</td>
                          <td className="py-2">{click.user.email}</td>
                          <td className="py-2">
                            {new Date(click.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No contact clicks yet
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
