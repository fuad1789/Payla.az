"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // TODO: Implement newsletter subscription API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Yeniliklərdən xəbərdar olmaq üçün qeydiyyatdan keçin
          </h2>
          <p className="text-gray-600 mb-8">
            Ən yeni elanlar və xüsusi təkliflər haqqında məlumat almaq üçün
            email ünvanınızı daxil edin
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ünvanınız"
              required
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-300 disabled:opacity-50"
            >
              {status === "loading" ? "Göndərilir..." : "Abunə ol"}
            </button>
          </form>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-green-600"
            >
              Təşəkkür edirik! Uğurla abunə oldunuz.
            </motion.p>
          )}

          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-600"
            >
              Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
