"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-8 md:px-16 lg:px-24">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Logo.svg"
              alt="Paylaş"
              width={120}
              height={38}
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/favorites"
            className="flex items-center hover:text-primary transition-colors"
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favoriler</span>
          </Link>
          <Link href="/how-it-works">
            <Button variant="default" size="sm">
              Elan yerləşdir
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
