import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import { LayoutContent } from "./layout-content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paylaş",
  description: "Paylaşmağın ən asan yolu",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "min-h-screen bg-[#f9fafb] antialiased")}
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
