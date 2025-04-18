"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Eye,
  MessageSquare,
  Shield,
  Wallet,
} from "lucide-react";

const steps = [
  {
    title: "Başla → Elan Yarat",
    description: "İstədiyiniz əşyanı seçin, şəkil və məlumat əlavə edin.",
    icon: Upload,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Görün və Tapıl",
    description:
      "Digər istifadəçilər elanınızı görəcək və sizinlə əlaqə quracaq.",
    icon: Eye,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Əlaqə və Müqavilə",
    description: "Kirayə şərtlərini qarşılıqlı razılaşma ilə təyin edin.",
    icon: MessageSquare,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Güvənli Paylaşım",
    description:
      "Platforma daxilində güvən mexanizmləri: rəy sistemi, test seçimi.",
    icon: Shield,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Qazanc əldə et",
    description: "Əşyalarınız sizə pul qazandırsın.",
    icon: Wallet,
    color: "bg-red-50 text-red-600",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Ana Səhifəyə Qayıt
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-4">Necə işləyir?</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Paylaş.az platformasında əşyalarınızı asanlıqla kirayəyə verə
            bilərsiniz
          </p>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-lg ${step.color}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200"></div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Link
              href="/create-listing"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
            >
              İndi Başla
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
