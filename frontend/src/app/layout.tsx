import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import dynamic from "next/dynamic";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Payla.az - Əşyalarınızı Kirayə Verin",
  description: "Əşyalarınızı icma ilə bölüşün və qazanc əldə edin",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png" }],
    shortcut: [{ url: "/favicon.png" }],
  },
};

// Create a client-side only component for the footer
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className="h-full">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`${inter.className} min-h-full bg-gray-50`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
