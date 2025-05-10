"use client";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";
import React from "react";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSwipe = pathname.startsWith("/listings/swipe");
  return (
    <div className="relative flex min-h-screen flex-col">
      {!isSwipe && <SiteHeader />}
      <main className="flex-1">{children}</main>
      {!isSwipe && <Footer />}
    </div>
  );
}

export { LayoutContent };
