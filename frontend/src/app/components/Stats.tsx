"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Statistics {
  totalListings: number;
  totalUsers: number;
  totalViews: number;
}

export default function Stats() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("Fetching stats...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/listings/stats`
        );
        const data = await response.json();
        console.log("Received stats:", data);

        if (data.status === "success") {
          setStats(data.data);
        } else {
          setError("Failed to fetch statistics");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Error loading statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      value: loading
        ? "..."
        : error
        ? "Error"
        : `${stats?.totalListings || 0}+`,
      label: "məhsul artıq kirayədə",
      icon: "📦",
    },
    {
      value: loading ? "..." : error ? "Error" : `${stats?.totalUsers || 0}+`,
      label: "aktiv istifadəçi",
      icon: "👥",
    },
    {
      value: loading
        ? "..."
        : error
        ? "Error"
        : typeof stats?.totalViews === "number"
        ? stats.totalViews.toLocaleString()
        : "0",
      label: "dəfə baxılıb (ümumi)",
      icon: "👀",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                className="text-3xl font-bold text-primary-600 mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
