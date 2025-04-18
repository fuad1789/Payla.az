"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Elan yarat",
    description:
      "Kirayə vermək istədiyiniz əşyanın şəklini və məlumatlarını əlavə edin",
    icon: "📝",
  },
  {
    title: "İnsanlar baxır və əlaqə qurur",
    description:
      "İstifadəçilər sizin elanınızı görəcək və sizinlə əlaqə saxlayacaq",
    icon: "👥",
  },
  {
    title: "Qazanc əldə et",
    description: "Kirayə müqaviləsi bağlayın və qazancınızı əldə edin",
    icon: "💰",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Necə işləyir?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
